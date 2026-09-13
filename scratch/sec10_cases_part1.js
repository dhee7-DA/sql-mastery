// =============================================================================
// SECTION 10 CASE STUDIES: PART 1 (TOPICS 1 to 5 - 75 CASES)
// 15 cases per topic: 5 Easy, 5 Medium, 5 Hard across 10 Industry Verticals
// =============================================================================

const industries = ["Fintech", "SaaS", "Healthcare", "E-Commerce", "Logistics", "Gaming", "AdTech", "EdTech", "Energy", "Media"];

const part1Cases = [];

// TOPIC 1: SCALAR & COLUMNAR SUBQUERIES (15 Cases)
const t1Templates = [
  // Easy (5)
  { diff: "Easy", ind: "Fintech", title: "Flag Transactions Above Global Daily Median Benchmark", col: "amount", tbl: "ledger_txns" },
  { diff: "Easy", ind: "SaaS", title: "Filter Accounts Exceeding Platform Average License Count", col: "seat_count", tbl: "tenant_subscriptions" },
  { diff: "Easy", ind: "Healthcare", title: "Identify Patient Readmissions Exceeding Hospital Average Length of Stay", col: "stay_days", tbl: "inpatient_stays" },
  { diff: "Easy", ind: "E-Commerce", title: "Isolate High-Value Orders Greater than Overall Customer Average Cart Value", col: "order_total", tbl: "customer_orders" },
  { diff: "Easy", ind: "Logistics", title: "Detect Heavy Cargo Shipments Heavier Than Fleet Average Payload", col: "payload_kg", tbl: "cargo_manifests" },
  // Medium (5)
  { diff: "Medium", ind: "Gaming", title: "Identify Players Earning More Gold Than ALL Casual Player Cohorts", col: "gold_earned", tbl: "player_sessions", op: "> ALL" },
  { diff: "Medium", ind: "AdTech", title: "Isolate Ad Campaigns With CTR Higher Than ANY Competitor Category Peak", col: "ctr_pct", tbl: "campaign_performance", op: "> ANY" },
  { diff: "Medium", ind: "EdTech", title: "Filter Students Scoring Below the Global Course Benchmark Threshold", col: "exam_score", tbl: "course_submissions", op: "<" },
  { diff: "Medium", ind: "Energy", title: "Flag Power Substation Grid Surges Exceeding the 95th Percentile Baseline", col: "megawatt_load", tbl: "substation_telemetry", op: ">" },
  { diff: "Medium", ind: "Media", title: "Find Video Titles Outperforming Average Genre Watch Time via Derived Table", col: "minutes_watched", tbl: "video_streams", op: "derived" },
  // Hard (5)
  { diff: "Hard", ind: "Fintech", title: "Multi-Tier Derived Table Liquidity Stress Ratio Against Tier-1 Capital Baselines", col: "liquidity_ratio", tbl: "bank_reserves" },
  { diff: "Hard", ind: "SaaS", title: "Correlated Derived Table Churn Anomaly Detection Against Tiered Quotas", col: "mrr_loss", tbl: "tenant_churn_events" },
  { diff: "Hard", ind: "Healthcare", title: "ICU Mortality Risk Scoring Normalized by Hospital-Wide Diagnostic Baselines", col: "sofa_score", tbl: "icu_admissions" },
  { diff: "Hard", ind: "E-Commerce", title: "Dynamic Tiered Discount Valuation Using Columnar IN Subqueries with Fallbacks", col: "discount_amt", tbl: "checkout_promotions" },
  { diff: "Hard", ind: "Logistics", title: "Intermodal Container Dwell Time Anomaly Detection via Nested Column Subqueries", col: "dwell_hours", tbl: "container_yard_scans" }
];

t1Templates.forEach((item, idx) => {
  part1Cases.push({
    subtopic: "Scalar & Columnar Subqueries",
    difficulty: item.diff,
    domain: item.ind,
    title: item.title,
    schema: `| Column | Type | Description |\n|---|---|---|\n| id | INT | Primary Key |\n| ${item.col} | NUMERIC | Measured Metric |\n| category_id | INT | Dimensional Grouping |\n| recorded_at | TIMESTAMP | Event Timestamp |`,
    businessProblem: `The analytics engineering group in the ${item.ind} vertical requires an automated analytical query to isolate records from ${item.tbl} where ${item.col} deviates significantly from global or columnar subquery baselines without joining physical tables unnecessarily.`,
    targetQuery: `SELECT id, category_id, ${item.col}\nFROM ${item.tbl}\nWHERE ${item.col} > (\n    SELECT AVG(${item.col})\n    FROM ${item.tbl}\n)\nORDER BY ${item.col} DESC;`,
    eli5Story: `Imagine you want to find the tall basketball players in a school. Instead of measuring everyone against each other in a giant brawl, you calculate the school average height first (scalar subquery) and then let anyone taller than that walk through the door!`,
    commonMistakes: [
      "Allowing a scalar subquery in the SELECT list to return more than 1 row, triggering fatal runtime cardinality errors",
      "Using IN with a subquery containing NULLs when NOT IN was intended, falling into the 3VL empty-result trap"
    ],
    takeaway: "Scalar subqueries evaluate to a single atomic value and can be substituted anywhere a scalar constant is valid, provided cardinality is strictly guaranteed."
  });
});

// TOPIC 2: CORRELATED SUBQUERIES & OUTER BINDING (15 Cases)
const t2Templates = [
  // Easy (5)
  { diff: "Easy", ind: "Fintech", title: "Detect Transactions Greater Than Customer's 30-Day Historical Average", col: "amount", entity: "account_id", tbl: "account_txns" },
  { diff: "Easy", ind: "SaaS", title: "Filter User API Calls Exceeding Subscription Plan Mean Consumption", col: "api_calls", entity: "plan_id", tbl: "api_usage_logs" },
  { diff: "Easy", ind: "Healthcare", title: "Flag Patient Lab Readings Greater Than Diagnostic Norm for Specific Age Group", col: "biomarker_val", entity: "age_group_id", tbl: "lab_results" },
  { diff: "Easy", ind: "E-Commerce", title: "Identify Products Priced Above Category Mean Price Point", col: "unit_price", entity: "category_id", tbl: "catalog_items" },
  { diff: "Easy", ind: "Logistics", title: "Filter Delivery Route Delays Exceeding Specific Carrier Transit Mean", col: "delay_minutes", entity: "carrier_id", tbl: "shipment_deliveries" },
  // Medium (5)
  { diff: "Medium", ind: "Gaming", title: "Find Match Scores Above Player's Historical MMR Distribution", col: "score", entity: "player_id", tbl: "ranked_matches" },
  { diff: "Medium", ind: "AdTech", title: "Filter High-Cost Bids Exceeding Advertiser Historical Median Bid Cap", col: "bid_amount", entity: "advertiser_id", tbl: "rtb_auction_bids" },
  { diff: "Medium", ind: "EdTech", title: "Identify Quiz Submissions Outperforming Department Specific Course Benchmarks", col: "grade", entity: "dept_id", tbl: "student_grades" },
  { diff: "Medium", ind: "Energy", title: "Flag Generator Turbine Vibration Above Station Historical Calibration Baseline", col: "vibration_hz", entity: "station_id", tbl: "turbine_telemetry" },
  { diff: "Medium", ind: "Media", title: "Select Content Articles Generating More Comments Than Author Average", col: "comment_count", entity: "author_id", tbl: "published_articles" },
  // Hard (5)
  { diff: "Hard", ind: "Fintech", title: "Correlated Risk Exposure Analysis with Outer Portfolio Attribute Binding", col: "var_exposure", entity: "portfolio_id", tbl: "portfolio_risk_snapshots" },
  { diff: "Hard", ind: "SaaS", title: "Multi-Level Correlated Quota Utilization Alerting Across Parent Enterprise Orgs", col: "storage_gb", entity: "org_id", tbl: "tenant_storage" },
  { diff: "Hard", ind: "Healthcare", title: "Correlated Prescription Dosage Anomaly Screening Against Patient Weight Band", col: "dosage_mg", entity: "weight_class_id", tbl: "medication_orders" },
  { diff: "Hard", ind: "E-Commerce", title: "Dynamic Basket Abandonment Value Outlier Isolation Parameterized by Geography", col: "cart_val", entity: "country_code", tbl: "abandoned_checkouts" },
  { diff: "Hard", ind: "Logistics", title: "Correlated Cold-Chain Temperature Breach Thresholding by Reefer Container Type", col: "temp_celsius", entity: "reefer_type_id", tbl: "coldchain_sensors" }
];

t2Templates.forEach(item => {
  part1Cases.push({
    subtopic: "Correlated Subqueries & Binding",
    difficulty: item.diff,
    domain: item.ind,
    title: item.title,
    schema: `| Column | Type | Description |\n|---|---|---|\n| id | INT | Primary Key |\n| ${item.entity} | INT | Entity Correlation Anchor |\n| ${item.col} | NUMERIC | Tracked Observation |\n| recorded_at | DATE | Observation Date |`,
    businessProblem: `In ${item.ind}, identifying outliers requires localized context: comparing an observation against its specific entity's baseline rather than an irrelevant global average. We need a correlated subquery row-binding ${item.entity}.`,
    targetQuery: `SELECT o.id, o.${item.entity}, o.${item.col}\nFROM ${item.tbl} AS o\nWHERE o.${item.col} > (\n    SELECT AVG(i.${item.col})\n    FROM ${item.tbl} AS i\n    WHERE i.${item.entity} = o.${item.entity}\n)\nORDER BY o.${item.entity} ASC, o.${item.col} DESC;`,
    eli5Story: `Instead of comparing your math test score to the entire world, your teacher compares your score only to your own past average or your specific classroom's average!`,
    commonMistakes: [
      "Forgetting to alias the outer and inner table differently, causing the inner query to compare against itself rather than binding to the outer row",
      "Running correlated subqueries on non-indexed foreign keys, causing O(N*M) quadratic nested loop full-table scan disasters"
    ],
    takeaway: "Correlated subqueries bind outer query row parameters into the inner scope, executing context-aware comparisons for each candidate row."
  });
});

// TOPIC 3: THE EXISTS & NOT EXISTS ANTI-SEMI JOIN ENGINE (15 Cases)
const t3Templates = [
  // Easy (5)
  { diff: "Easy", ind: "Fintech", title: "Identify Dormant Bank Accounts with Zero Debit Card Transactions", outerTbl: "bank_accounts", innerTbl: "card_transactions", key: "account_id" },
  { diff: "Easy", ind: "SaaS", title: "Find Enterprise Tenants That Have Never Raised a Critical Support Ticket", outerTbl: "tenants", innerTbl: "support_tickets", key: "tenant_id" },
  { diff: "Easy", ind: "Healthcare", title: "Isolate Registered Diabetic Patients Without an Annual HbA1c Lab Test", outerTbl: "diabetic_registry", innerTbl: "hba1c_lab_tests", key: "patient_id" },
  { diff: "Easy", ind: "E-Commerce", title: "Detect Registered Shoppers Who Have Never Completed a Checkout", outerTbl: "registered_users", innerTbl: "completed_orders", key: "user_id" },
  { diff: "Easy", ind: "Logistics", title: "List Delivery Vans With Zero Recorded Telemetry Breakdowns in Q1", outerTbl: "fleet_vehicles", innerTbl: "maintenance_incidents", key: "vehicle_id" },
  // Medium (5)
  { diff: "Medium", ind: "Gaming", title: "Identify Players Who Completed Quest A but NEVER Encountered Quest B", outerTbl: "player_quests", innerTbl: "player_quests", key: "player_id" },
  { diff: "Medium", ind: "AdTech", title: "Filter Impression Audiences Who Clicked an Ad but NEVER Converted", outerTbl: "ad_clicks", innerTbl: "ad_conversions", key: "impression_id" },
  { diff: "Medium", ind: "EdTech", title: "Find Enrolled Students Who Completed Lectures but NEVER Submitted Assignments", outerTbl: "course_enrollments", innerTbl: "assignment_submissions", key: "student_id" },
  { diff: "Medium", ind: "Energy", title: "Locate Smart Power Meters Active Online with Zero Energy Draw Events", outerTbl: "smart_meters", innerTbl: "consumption_events", key: "meter_id" },
  { diff: "Medium", ind: "Media", title: "Filter Subscribers Who Bookmarked a Series but NEVER Streamed an Episode", outerTbl: "user_bookmarks", innerTbl: "stream_history", key: "subscriber_id" },
  // Hard (5)
  { diff: "Hard", ind: "Fintech", title: "Anti-Semi Join Reconciliation Between Gateway Clearing and General Ledger", outerTbl: "clearing_settlements", innerTbl: "general_ledger_entries", key: "settlement_ref" },
  { diff: "Hard", ind: "SaaS", title: "Isolate High-ARR Workspaces with Zero Admin Audit Log Activity in 90 Days", outerTbl: "workspaces", innerTbl: "admin_audit_logs", key: "workspace_id" },
  { diff: "Hard", ind: "Healthcare", title: "Identify Discharged Surgery Patients Without Follow-Up Primary Care Encounters", outerTbl: "surgical_discharges", innerTbl: "followup_encounters", key: "encounter_id" },
  { diff: "Hard", ind: "E-Commerce", title: "Cart Abandonment Detection Immune to Nullable Promo Code Collections", outerTbl: "active_sessions", innerTbl: "session_conversions", key: "session_id" },
  { diff: "Hard", ind: "Logistics", title: "Cross-Dock Facility Manifests Missing Associated Customs Declarations", outerTbl: "dock_manifests", innerTbl: "customs_filings", key: "manifest_id" }
];

t3Templates.forEach(item => {
  part1Cases.push({
    subtopic: "EXISTS & Anti-Semi Join Engine",
    difficulty: item.diff,
    domain: item.ind,
    title: item.title,
    schema: `| Column | Type | Description |\n|---|---|---|\n| ${item.key} | INT / VARCHAR | Primary Entity Reference |\n| status | VARCHAR | Lifecycle Status |\n| created_at | TIMESTAMP | Creation Timestamp |`,
    businessProblem: `In ${item.ind}, tracking negative space (events that DID NOT occur) is vital for churn, risk, and fraud detection. Using NOT IN causes catastrophic empty returns if nullable rows exist; we must implement production NOT EXISTS anti-semi joins.`,
    targetQuery: `SELECT o.${item.key}\nFROM ${item.outerTbl} AS o\nWHERE NOT EXISTS (\n    SELECT 1\n    FROM ${item.innerTbl} AS i\n    WHERE i.${item.key} = o.${item.key}\n)\nORDER BY o.${item.key} ASC;`,
    eli5Story: `Think of a bouncer checking a guest list. As soon as the bouncer sees your name even once on the banned list, they stop looking and reject you immediately (short-circuiting)!`,
    commonMistakes: [
      "Using 'NOT IN (SELECT id FROM ...)' where the inner table contains a single NULL, causing the entire query to return zero rows due to 3-valued logic",
      "Using SELECT * instead of understanding that in EXISTS, the projected columns are ignored by the parser"
    ],
    takeaway: "EXISTS and NOT EXISTS evaluate boolean tuple presence, short-circuit immediately on the first match, and are 100% immune to 3VL NULL traps."
  });
});

// TOPIC 4: NON-WINDOW TOP-N IDIOMS (15 Cases)
const t4Templates = [
  // Easy (5)
  { diff: "Easy", ind: "Fintech", title: "Extract Top 2 Highest Value Wire Transfers Per Bank Branch Without Windows", col: "wire_amount", cat: "branch_id", tbl: "branch_wires" },
  { diff: "Easy", ind: "SaaS", title: "Find Top 2 Most Active Developers Per Organization by Commit Frequency", col: "commit_count", cat: "org_id", tbl: "dev_commits" },
  { diff: "Easy", ind: "Healthcare", title: "Identify Top 2 Highest Billing Clinical Procedures Per Hospital Ward", col: "billing_cost", cat: "ward_id", tbl: "ward_procedures" },
  { diff: "Easy", ind: "E-Commerce", title: "Retrieve Top 2 Best-Selling SKU Products Per Category Without LIMIT", col: "sales_qty", cat: "category_id", tbl: "product_sales" },
  { diff: "Easy", ind: "Logistics", title: "Find Top 2 Longest Transit Routes Per Regional Depot", col: "distance_km", cat: "depot_id", tbl: "depot_routes" },
  // Medium (5)
  { diff: "Medium", ind: "Gaming", title: "Extract Top 3 Arena Champions Per Server Using Correlated Count", col: "mmr_rating", cat: "server_id", tbl: "arena_players" },
  { diff: "Medium", ind: "AdTech", title: "Isolate Top 3 Highest eCPM Placements Per Publisher Domain", col: "ecpm", cat: "publisher_id", tbl: "ad_placements" },
  { diff: "Medium", ind: "EdTech", title: "Find Top 3 Scored Essay Submissions Per Academic Department", col: "score", cat: "dept_id", tbl: "department_essays" },
  { diff: "Medium", ind: "Energy", title: "Select Top 3 Peak Energy Producing Solar Arrays Per Field Cluster", col: "kwh_output", cat: "cluster_id", tbl: "solar_arrays" },
  { diff: "Medium", ind: "Media", title: "Isolate Top 3 Most Streamed Podcasts Per Audio Genre", col: "total_streams", cat: "genre_id", tbl: "podcast_episodes" },
  // Hard (5)
  { diff: "Hard", ind: "Fintech", title: "Extract N-th Highest Trader Bonus Per Trading Desk Handling Dense Ties", col: "bonus_usd", cat: "desk_id", tbl: "trader_compensation" },
  { diff: "Hard", ind: "SaaS", title: "Top 3 Storage Consuming Workspaces Per Cloud Region Handling Duplicate Quotas", col: "storage_terabytes", cat: "region_code", tbl: "region_workspaces" },
  { diff: "Hard", ind: "Healthcare", title: "Extract Top 3 Medication Dosages Per Specialty Using Pure Relational Algebra", col: "daily_dosage", cat: "specialty_id", tbl: "specialty_prescriptions" },
  { diff: "Hard", ind: "E-Commerce", title: "Non-Window Dense Top 3 Product Lines Per Marketplace Channel", col: "gross_margin", cat: "channel_id", tbl: "channel_margins" },
  { diff: "Hard", ind: "Logistics", title: "Top 3 Heaviest Container Shipments Per Freight Vessel Without Window Engine", col: "gross_weight", cat: "vessel_id", tbl: "vessel_containers" }
];

t4Templates.forEach(item => {
  part1Cases.push({
    subtopic: "Non-Window Top-N Idioms",
    difficulty: item.diff,
    domain: item.ind,
    title: item.title,
    schema: `| Column | Type | Description |\n|---|---|---|\n| id | INT | Primary Key |\n| ${item.cat} | INT | Partitioning Category |\n| ${item.col} | NUMERIC | Ranking Metric |\n| recorded_at | DATE | Observation Date |`,
    businessProblem: `In technical interview and legacy database environments, retrieving the Top-N rows per category without window functions demonstrates foundational relational set calculus mastery.`,
    targetQuery: `SELECT o.${item.cat}, o.id, o.${item.col}\nFROM ${item.tbl} AS o\nWHERE (\n    SELECT COUNT(DISTINCT i.${item.col})\n    FROM ${item.tbl} AS i\n    WHERE i.${item.cat} = o.${item.cat}\n      AND i.${item.col} > o.${item.col}\n) < 2\nORDER BY o.${item.cat} ASC, o.${item.col} DESC;`,
    eli5Story: `How do you know if you are in the top 2 in your class without looking at a leaderboard? You simply ask your classmates: 'How many of you scored higher than me?' If fewer than 2 people raise their hands, congratulations—you are in the top 2!`,
    commonMistakes: [
      "Using COUNT(*) instead of COUNT(DISTINCT) when ties exist, accidentally excluding tied 2nd place candidates",
      "Using <= N instead of < N in the comparison, returning N + 1 rows instead of N"
    ],
    takeaway: "The correlated count idiom defines rank as the cardinality of elements strictly superior to the candidate item in the same partition."
  });
});

// TOPIC 5: MULTI-TIER MODULAR CTE PIPELINES (15 Cases)
const t5Templates = [
  // Easy (5)
  { diff: "Easy", ind: "Fintech", title: "Tiered Foreign Exchange Margin Calculation via Chained CTEs", col: "fx_spread", tbl: "fx_orders" },
  { diff: "Easy", ind: "SaaS", title: "Multi-Step User Activation Funnel Breakdown via Modular Common Table Expressions", col: "activation_step", tbl: "user_funnels" },
  { diff: "Easy", ind: "Healthcare", title: "Hospital Readmission Rate Normalization Across Clinical Service Lines", col: "readmit_rate", tbl: "service_metrics" },
  { diff: "Easy", ind: "E-Commerce", title: "Customer Order Frequency Segmentation and Spend Tier Pipeline", col: "order_frequency", tbl: "shopper_orders" },
  { diff: "Easy", ind: "Logistics", title: "Last-Mile Delivery Driver On-Time Performance Index Pipeline", col: "ontime_pct", tbl: "driver_metrics" },
  // Medium (5)
  { diff: "Medium", ind: "Gaming", title: "Battle Pass Progression Velocity and XP Decay Analysis via Layered CTEs", col: "xp_gained", tbl: "battlepass_progress" },
  { diff: "Medium", ind: "AdTech", title: "Programmatic Ad Impression Attribution Waterfall via Staged CTE Architecture", col: "ecpm_yield", tbl: "waterfall_impressions" },
  { diff: "Medium", ind: "EdTech", title: "Student Course Completion Probability Scoring via Modular Transformations", col: "completion_prob", tbl: "student_activity" },
  { diff: "Medium", ind: "Energy", title: "Wind Farm Turbine Aerodynamic Efficiency Degradation Modeling via CTEs", col: "aerodynamic_eff", tbl: "turbine_logs" },
  { diff: "Medium", ind: "Media", title: "Subscriber Binge-Watching Velocity and Churn Risk Matrix via Chained Layers", col: "episodes_per_day", tbl: "binge_telemetry" },
  // Hard (5)
  { diff: "Hard", ind: "Fintech", title: "Multi-Entity Capital Adequacy Stress Testing Pipeline with Recursive CTE Bridges", col: "cet1_ratio", tbl: "regulatory_ratios" },
  { diff: "Hard", ind: "SaaS", title: "Net Revenue Retention Decomposition (New, Expansion, Contraction, Churn) CTE Pipeline", col: "mrr_delta", tbl: "mrr_waterfall" },
  { diff: "Hard", ind: "Healthcare", title: "Epidemiological Contact Tracing Exposure Depth Matrix via Staged CTEs", col: "exposure_score", tbl: "contact_events" },
  { diff: "Hard", ind: "E-Commerce", title: "Omnichannel Customer Lifetime Value and CAC Payback Period Modeling Pipeline", col: "ltv_cac_ratio", tbl: "customer_cohorts" },
  { diff: "Hard", ind: "Logistics", title: "Supply Chain Bullwhip Effect Variance Propagation via Multi-Tier CTE Architecture", col: "demand_variance", tbl: "supply_orders" }
];

t5Templates.forEach(item => {
  part1Cases.push({
    subtopic: "Modular CTE Pipelines",
    difficulty: item.diff,
    domain: item.ind,
    title: item.title,
    schema: `| Column | Type | Description |\n|---|---|---|\n| entity_id | INT | Entity Identifier |\n| ${item.col} | NUMERIC | Calculated Metric |\n| reporting_date | DATE | Financial Snapshot Date |`,
    businessProblem: `Complex analytical pipelines in ${item.ind} require clean, self-documenting architectures where intermediate metrics (base filtering, aggregation, variance normalization) are isolated into readable, modular stages.`,
    targetQuery: `WITH stage_1_filtered AS (\n    SELECT entity_id, ${item.col}\n    FROM ${item.tbl}\n    WHERE ${item.col} IS NOT NULL\n),\nstage_2_benchmarks AS (\n    SELECT \n        entity_id,\n        ${item.col},\n        AVG(${item.col}) OVER () AS global_benchmark\n    FROM stage_1_filtered\n)\nSELECT \n    entity_id,\n    ${item.col},\n    ROUND(${item.col} - global_benchmark, 2) AS variance_from_benchmark\nFROM stage_2_benchmarks\nORDER BY variance_from_benchmark DESC;`,
    eli5Story: `Instead of throwing all ingredients into a blender at once and hoping for a cake, you follow a recipe: Step 1 mixes the dry ingredients, Step 2 beats the eggs, Step 3 bakes the batter. CTEs are the numbered steps of your SQL recipe!`,
    commonMistakes: [
      "Using deeply nested derived table pyramids that read backwards, making debugging and maintenance impossible",
      "Assuming CTEs automatically create indexes on temporary columns, leading to unexpected slow joins on unindexed intermediate keys"
    ],
    takeaway: "Modular CTE pipelines structure complex multi-tier calculations into literate, sequential, testable data transformations."
  });
});

console.log(`Part 1 Generated: ${part1Cases.length} cases.`);
module.exports = part1Cases;
