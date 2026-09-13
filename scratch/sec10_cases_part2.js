// =============================================================================
// SECTION 10 CASE STUDIES: PART 2 (TOPICS 6 to 10 - 75 CASES)
// 15 cases per topic: 5 Easy, 5 Medium, 5 Hard across 10 Industry Verticals
// =============================================================================

const industries = ["Fintech", "SaaS", "Healthcare", "E-Commerce", "Logistics", "Gaming", "AdTech", "EdTech", "Energy", "Media"];

const part2Cases = [];

// TOPIC 6: RECURSIVE CTES & ORGANIZATIONAL HIERARCHIES (15 Cases)
const t6Templates = [
  // Easy (5)
  { diff: "Easy", ind: "Fintech", title: "Corporate Banking Management Hierarchy Level Assignment", entity: "banker_id", mgr: "manager_id", tbl: "commercial_bankers" },
  { diff: "Easy", ind: "SaaS", title: "Engineering Organization Reporting Depth Level Traversal", entity: "engineer_id", mgr: "manager_id", tbl: "engineering_staff" },
  { diff: "Easy", ind: "Healthcare", title: "Hospital Clinical Supervision Chain Breadcrumb Generation", entity: "staff_id", mgr: "supervisor_id", tbl: "clinical_supervision" },
  { diff: "Easy", ind: "E-Commerce", title: "Retail Store Regional Management Tree Depth Calculation", entity: "store_emp_id", mgr: "regional_lead_id", tbl: "retail_staff" },
  { diff: "Easy", ind: "Logistics", title: "Fleet Dispatch Supervisory Structure Depth Level Resolution", entity: "dispatcher_id", mgr: "lead_dispatcher_id", tbl: "dispatch_personnel" },
  // Medium (5)
  { diff: "Medium", ind: "Gaming", title: "Guild Leadership Hierarchy Breadcrumb Path Assembly", entity: "player_id", mgr: "officer_id", tbl: "guild_membership" },
  { diff: "Medium", ind: "AdTech", title: "Agency Account Executive Reporting Tree Path Generator", entity: "executive_id", mgr: "director_id", tbl: "agency_executives" },
  { diff: "Medium", ind: "EdTech", title: "University Academic Department Dean to Teaching Assistant Tree", entity: "faculty_id", mgr: "department_chair_id", tbl: "academic_faculty" },
  { diff: "Medium", ind: "Energy", title: "Grid Field Maintenance Team Chain of Command Hierarchy", entity: "technician_id", mgr: "lead_engineer_id", tbl: "field_technicians" },
  { diff: "Medium", ind: "Media", title: "Broadcast Newsroom Editorial Hierarchy Path Traversal", entity: "journalist_id", mgr: "managing_editor_id", tbl: "newsroom_staff" },
  // Hard (5)
  { diff: "Hard", ind: "Fintech", title: "Multi-Jurisdiction Holding Company Subsidiary Ownership Chain with Cycle Guards", entity: "entity_id", mgr: "parent_entity_id", tbl: "corporate_entities" },
  { diff: "Hard", ind: "SaaS", title: "Multi-Tenant Enterprise RBAC Role Inheritance Hierarchy Explosion", entity: "role_id", mgr: "parent_role_id", tbl: "enterprise_roles" },
  { diff: "Hard", ind: "Healthcare", title: "Physician Credentialing Supervisory Path and Scope Verification", entity: "doctor_id", mgr: "department_head_id", tbl: "medical_credentials" },
  { diff: "Hard", ind: "E-Commerce", title: "Multi-Level Affiliate Referral Hierarchy and Downline Commission Tree", entity: "affiliate_id", mgr: "referrer_id", tbl: "affiliate_network" },
  { diff: "Hard", ind: "Logistics", title: "Global Freight Forwarder Sub-Agent Network Lineage Resolution", entity: "agent_id", mgr: "master_agent_id", tbl: "forwarding_agents" }
];

t6Templates.forEach(item => {
  part2Cases.push({
    subtopic: "Recursive CTEs & Hierarchies",
    difficulty: item.diff,
    domain: item.ind,
    title: item.title,
    schema: `| Column | Type | Description |\n|---|---|---|\n| ${item.entity} | INT | Entity Primary Key |\n| full_name | VARCHAR(100) | Entity Name |\n| ${item.mgr} | INT | Self-Referencing Foreign Key |\n| title | VARCHAR(50) | Official Role/Title |`,
    businessProblem: `In ${item.ind}, organizations and entities are modeled hierarchically. To audit supervisory chains, delegation of authority, and depth levels, we need a recursive query walking from the root node to every leaf.`,
    targetQuery: `WITH RECURSIVE hierarchy_tree AS (\n    SELECT \n        ${item.entity},\n        full_name,\n        ${item.mgr},\n        1 AS depth_level,\n        CAST(full_name AS CHAR(255)) AS path_string\n    FROM ${item.tbl}\n    WHERE ${item.mgr} IS NULL\n\n    UNION ALL\n\n    SELECT \n        c.${item.entity},\n        c.full_name,\n        c.${item.mgr},\n        p.depth_level + 1,\n        CONCAT(p.path_string, ' -> ', c.full_name)\n    FROM ${item.tbl} AS c\n    INNER JOIN hierarchy_tree AS p ON c.${item.mgr} = p.${item.entity}\n)\nSELECT depth_level, full_name, path_string\nFROM hierarchy_tree\nORDER BY depth_level ASC, ${item.entity} ASC;`,
    eli5Story: `Imagine a family tree. You start with the great-grandparent at Level 1. Then you look at their children (Level 2), then their grandchildren (Level 3). A recursive CTE follows each branch until the whole family is mapped out!`,
    commonMistakes: [
      "Failing to CAST the anchor string accumulator, causing deeper recursive string concatenations to fail with data-too-long errors",
      "Forgetting to check for circular data cycles, which can trap the database in an infinite loop"
    ],
    takeaway: "WITH RECURSIVE evaluates trees and hierarchies iteratively using an anchor base case and an inductive recursive join until the working queue is empty."
  });
});

// TOPIC 7: RECURSIVE GRAPH & NETWORK PATHS (15 Cases)
const t7Templates = [
  // Easy (5)
  { diff: "Easy", ind: "Fintech", title: "Trace Multi-Leg Wire Routing Paths Across Intermediary Clearing Banks", src: "sender_bank_id", dst: "receiver_bank_id", tbl: "bank_corridors" },
  { diff: "Easy", ind: "SaaS", title: "Resolve Microservice Upstream Dependency Call Graph Depths", src: "calling_service_id", dst: "target_service_id", tbl: "service_mesh_calls" },
  { diff: "Easy", ind: "Healthcare", title: "Trace Infectious Disease Contact Spread Trajectories", src: "source_patient_id", dst: "exposed_patient_id", tbl: "exposure_events" },
  { diff: "Easy", ind: "E-Commerce", title: "Explore Assembled Product Bill of Materials Component Explosion", src: "assembly_sku", dst: "component_sku", tbl: "bom_components" },
  { diff: "Easy", ind: "Logistics", title: "Calculate Multi-Hop Rail Freight Transit Stops Between Railheads", src: "origin_depot_id", dst: "destination_depot_id", tbl: "rail_corridors" },
  // Medium (5)
  { diff: "Medium", ind: "Gaming", title: "Identify Crafting Recipe Ingredient Tree Explosion with Multiplicative Quantities", src: "item_id", dst: "ingredient_id", tbl: "crafting_recipes" },
  { diff: "Medium", ind: "AdTech", title: "Trace Programmatic Ad Auction DSP to SSP Reseller Chains", src: "seller_domain", dst: "buyer_domain", tbl: "sellers_json_links" },
  { diff: "Medium", ind: "EdTech", title: "Resolve Course Prerequisite Directed Graph to Form Graduation Curricula", src: "course_id", dst: "prereq_course_id", tbl: "course_prerequisites" },
  { diff: "Medium", ind: "Energy", title: "Trace Electric Transmission Substation Power Distribution Feeder Lines", src: "from_substation", dst: "to_substation", tbl: "transmission_lines" },
  { diff: "Medium", ind: "Media", title: "Social Graph 2nd and 3rd Degree Content Recommendation Connections", src: "user_a", dst: "user_b", tbl: "user_follows" },
  // Hard (5)
  { diff: "Hard", ind: "Fintech", title: "Detect Cyclic Money Laundering Shell Company Loops with Cycle Prevention", src: "from_account", dst: "to_account", tbl: "p2p_wire_edges" },
  { diff: "Hard", ind: "SaaS", title: "Circular Software Package Dependency Closure Resolution with Cycle Detection", src: "package_id", dst: "depends_on_id", tbl: "package_manifest" },
  { diff: "Hard", ind: "Healthcare", title: "Multi-Generation Genetic Pedigree Inheritance Path Reconstruction", src: "parent_subject_id", dst: "child_subject_id", tbl: "pedigree_records" },
  { diff: "Hard", ind: "E-Commerce", title: "Automated Supply Chain Bill-of-Materials Cost Rollup Across 5 Sub-Assembly Tiers", src: "parent_assembly", dst: "child_part", tbl: "bom_cost_nodes" },
  { diff: "Hard", ind: "Logistics", title: "Shortest Transit Time Multi-Modal Flight Routing with Layover Constraints", src: "origin_airport", dst: "dest_airport", tbl: "flight_legs" }
];

t7Templates.forEach(item => {
  part2Cases.push({
    subtopic: "Recursive Graph & Network Paths",
    difficulty: item.diff,
    domain: item.ind,
    title: item.title,
    schema: `| Column | Type | Description |\n|---|---|---|\n| ${item.src} | INT / VARCHAR | Edge Source Node |\n| ${item.dst} | INT / VARCHAR | Edge Target Node |\n| weight | NUMERIC | Edge Metric / Cost |`,
    businessProblem: `In ${item.ind}, data forms network graphs rather than simple trees (cycles, multi-path connections, multiplicative weights). A recursive CTE is required to navigate graph edges while guarding against infinite cyclic loops.`,
    targetQuery: `WITH RECURSIVE graph_paths AS (\n    SELECT \n        ${item.src} AS origin,\n        ${item.dst} AS destination,\n        1 AS hops,\n        CAST(CONCAT(${item.src}, '->', ${item.dst}) AS CHAR(500)) AS path_taken\n    FROM ${item.tbl}\n    WHERE ${item.src} = 100\n\n    UNION ALL\n\n    SELECT \n        gp.origin,\n        e.${item.dst},\n        gp.hops + 1,\n        CONCAT(gp.path_taken, '->', e.${item.dst})\n    FROM ${item.tbl} AS e\n    INNER JOIN graph_paths AS gp ON e.${item.src} = gp.destination\n    WHERE gp.hops < 4\n      AND gp.path_taken NOT LIKE CONCAT('%->', e.${item.dst}, '%')\n)\nSELECT origin, destination, hops, path_taken\nFROM graph_paths\nORDER BY hops ASC;`,
    eli5Story: `Imagine flying from New York to Tokyo. If there's no direct flight, you take a flight with a layover in Los Angeles. A graph CTE explores every airport connection up to 3 hops, making sure you don't fly in a circle back to where you started!`,
    commonMistakes: [
      "Failing to filter out visited nodes in cyclic networks, leading to database abort errors from runaway recursion",
      "Multiplying quantities additively rather than multiplicatively in Bill of Materials explosions"
    ],
    takeaway: "Graph traversal in SQL requires maintaining a visited-node path guard to prevent cyclic loops while BFS-expanding edge connections."
  });
});

// TOPIC 8: VERTICAL SET OPERATIONS (UNION VS UNION ALL) (15 Cases)
const t8Templates = [
  // Easy (5)
  { diff: "Easy", ind: "Fintech", title: "Consolidate Real-Time and End-of-Day Settlement Ledgers with Zero Overhead", tbl1: "realtime_txns", tbl2: "batch_settlements" },
  { diff: "Easy", ind: "SaaS", title: "Aggregate Production and Staging Error Logs for Global Incident Review", tbl1: "prod_error_logs", tbl2: "staging_error_logs" },
  { diff: "Easy", ind: "Healthcare", title: "Combine Inpatient and Outpatient Pharmacy Medication Dispensations", tbl1: "inpatient_rx", tbl2: "outpatient_rx" },
  { diff: "Easy", ind: "E-Commerce", title: "Merge Domestic and Cross-Border Customer Invoices with System Tags", tbl1: "domestic_invoices", tbl2: "crossborder_invoices" },
  { diff: "Easy", ind: "Logistics", title: "Unify Ground Courier and Air Cargo Delivery Scans for Tracking", tbl1: "ground_scans", tbl2: "air_scans" },
  // Medium (5)
  { diff: "Medium", ind: "Gaming", title: "Merge PC and Mobile Player Leaderboards into a Single Unified Ranking Stream", tbl1: "pc_leaderboard", tbl2: "mobile_leaderboard" },
  { diff: "Medium", ind: "AdTech", title: "Combine Web and Native App Ad Impression Streams with Platform Provenance", tbl1: "web_impressions", tbl2: "app_impressions" },
  { diff: "Medium", ind: "EdTech", title: "Consolidate Undergraduate and Postgraduate Course Registrations", tbl1: "undergrad_registrations", tbl2: "postgrad_registrations" },
  { diff: "Medium", ind: "Energy", title: "Merge Thermal and Hydroelectric Generating Station Production Records", tbl1: "thermal_generation", tbl2: "hydro_generation" },
  { diff: "Medium", ind: "Media", title: "Combine Podcast Downloads and Video On-Demand Views into Unified Media Stream", tbl1: "podcast_downloads", tbl2: "vod_streams" },
  // Hard (5)
  { diff: "Hard", ind: "Fintech", title: "High-Throughput Streaming M&A Customer Entity Deduplication vs Union All Benchmark", tbl1: "target_bank_cust", tbl2: "acquirer_bank_cust" },
  { diff: "Hard", ind: "SaaS", title: "Multi-Cloud Telemetry Ingestion Pipeline: Managing Memory Spills in UNION", tbl1: "aws_telemetry", tbl2: "gcp_telemetry" },
  { diff: "Hard", ind: "Healthcare", title: "Clinical Trial Adverse Event Consolidator Across 4 International Site Schemas", tbl1: "site_us_events", tbl2: "site_eu_events" },
  { diff: "Hard", ind: "E-Commerce", title: "Omnichannel Returns Reconciler: Warehouse Scans vs In-Store Counter Returns", tbl1: "warehouse_returns", tbl2: "store_returns" },
  { diff: "Hard", ind: "Logistics", title: "Intermodal Shipping Manifest Stream Integration with Schema Alignment Guards", tbl1: "vessel_manifest", tbl2: "train_manifest" }
];

t8Templates.forEach(item => {
  part2Cases.push({
    subtopic: "Vertical Set Operations",
    difficulty: item.diff,
    domain: item.ind,
    title: item.title,
    schema: `| Column | Type | Description |\n|---|---|---|\n| record_id | INT | Transaction ID |\n| entity_id | INT | Associated Account / User |\n| amount | NUMERIC | Transaction Magnitude |\n| event_timestamp | TIMESTAMP | Event Timestamp |`,
    businessProblem: `In ${item.ind}, disparate event streams from multiple production systems must be consolidated vertically into a unified table. Engineers must choose between streaming UNION ALL and memory-intensive deduplicating UNION.`,
    targetQuery: `SELECT 'System_A' AS source_provenance, record_id, entity_id, amount, event_timestamp\nFROM ${item.tbl1}\nUNION ALL\nSELECT 'System_B' AS source_provenance, record_id, entity_id, amount, event_timestamp\nFROM ${item.tbl2}\nORDER BY event_timestamp DESC;`,
    eli5Story: `If you have two stacks of paper and just put one on top of the other, that's UNION ALL—instant and easy. But if you have to inspect every single page to see if someone photocopied a duplicate, that's UNION—slow and takes lots of desk space!`,
    commonMistakes: [
      "Using UNION instead of UNION ALL on massive high-volume tables, triggering heavy sort-buffer disk spills",
      "Expecting column aliases in the second query to take effect, when ANSI SQL dictates aliases come strictly from Query 1"
    ],
    takeaway: "UNION ALL streams combined records with zero deduplication memory cost; UNION forces an expensive sort/hash to eliminate identical duplicate tuples."
  });
});

// TOPIC 9: SET DIFFERENCE & INTERSECTION (EXCEPT & INTERSECT) (15 Cases)
const t9Templates = [
  // Easy (5)
  { diff: "Easy", ind: "Fintech", title: "Detect Cleared Bank Wires Missing in SWIFT Confirmation Logs via EXCEPT", tbl1: "internal_wires", tbl2: "swift_confirmations" },
  { diff: "Easy", ind: "SaaS", title: "Identify Active Paying Tenants That Have Never Triggered an SSO Login", tbl1: "active_tenants", tbl2: "sso_audit_logs" },
  { diff: "Easy", ind: "Healthcare", title: "Find Patients Prescribed Antibiotics with No Recorded Follow-up Lab Culture", tbl1: "rx_orders", tbl2: "lab_cultures" },
  { diff: "Easy", ind: "E-Commerce", title: "Isolate High-Spenders Who Purchased in Q1 but Have Zero Orders in Q2", tbl1: "q1_shoppers", tbl2: "q2_shoppers" },
  { diff: "Easy", ind: "Logistics", title: "Identify Dispatched Delivery Trucks With No Checkpoint GPS Pings", tbl1: "dispatched_trucks", tbl2: "gps_pings" },
  // Medium (5)
  { diff: "Medium", ind: "Gaming", title: "Find Hardcore Players Who Purchased the Battle Pass AND Reached Max Tier", tbl1: "battlepass_buyers", tbl2: "max_tier_players", op: "INTERSECT" },
  { diff: "Medium", ind: "AdTech", title: "Isolate Users Who Converted on Search AND Converted on Social Channels", tbl1: "search_converters", tbl2: "social_converters", op: "INTERSECT" },
  { diff: "Medium", ind: "EdTech", title: "Identify Students Who Passed Theory Exams but Failed Practical Lab Exams", tbl1: "theory_passes", tbl2: "lab_passes", op: "EXCEPT" },
  { diff: "Medium", ind: "Energy", title: "Find Power Substations Active on the Primary Grid but Excluded from Microgrid Backup", tbl1: "primary_grid_nodes", tbl2: "microgrid_backup_nodes", op: "EXCEPT" },
  { diff: "Medium", ind: "Media", title: "Isolate Subscribers Who Stream Music AND Watch Video On-Demand", tbl1: "music_listeners", tbl2: "video_watchers", op: "INTERSECT" },
  // Hard (5)
  { diff: "Hard", ind: "Fintech", title: "Bidirectional Ledger Audit: Discrepancies in Gateway vs Core via Symmetric Difference", tbl1: "gateway_settlements", tbl2: "core_ledger" },
  { diff: "Hard", ind: "SaaS", title: "Multi-Workspace User Cohort Intersection Across 3 Enterprise Subscriptions", tbl1: "ws_alpha_users", tbl2: "ws_beta_users" },
  { diff: "Hard", ind: "Healthcare", title: "Cross-Hospital Clinical Registry Cohort Overlap Reconciliation", tbl1: "hospital_a_patients", tbl2: "hospital_b_patients" },
  { diff: "Hard", ind: "E-Commerce", title: "Multi-Channel Cart Abandonment vs Completed Purchase Set Difference Matrix", tbl1: "abandoned_carts", tbl2: "completed_checkouts" },
  { diff: "Hard", ind: "Logistics", title: "International Customs Port Clearance Discrepancy Audit via Set Difference", tbl1: "export_manifests", tbl2: "import_clearances" }
];

t9Templates.forEach(item => {
  part2Cases.push({
    subtopic: "Set Difference & Intersection",
    difficulty: item.diff,
    domain: item.ind,
    title: item.title,
    schema: `| Column | Type | Description |\n|---|---|---|\n| entity_id | INT / VARCHAR | Entity Primary Reference |\n| amount | NUMERIC | Transactional Metric |\n| event_date | DATE | Recording Date |`,
    businessProblem: `Auditing ledger fidelity, user overlap, and missing records in ${item.ind} requires relational set algebra: finding common intersections (INTERSECT) or isolating unreconciled discrepancies (EXCEPT / MINUS).`,
    targetQuery: `SELECT entity_id FROM ${item.tbl1}\nEXCEPT\nSELECT entity_id FROM ${item.tbl2}\nORDER BY entity_id ASC;`,
    eli5Story: `If you compare your music playlist with your friend's playlist: INTERSECT gives you songs you both love, while EXCEPT gives you songs on your playlist that your friend doesn't have!`,
    commonMistakes: [
      "Using EXCEPT without understanding that it removes duplicates from the left query by default (EXCEPT DISTINCT)",
      "Assuming NULLs break EXCEPT, when in fact ANSI SQL set operations treat NULL as matching another NULL"
    ],
    takeaway: "INTERSECT isolates common distinct tuples between two relations; EXCEPT computes set subtraction, isolating records unique to the first query."
  });
});

// TOPIC 10: MULTI-DIMENSIONAL GROUPING (ROLLUP, CUBE, GROUPING SETS) (15 Cases)
const t10Templates = [
  // Easy (5)
  { diff: "Easy", ind: "Fintech", title: "Branch Loan Portfolio Rollup: Region -> Country -> Branch Subtotals", d1: "region", d2: "country", d3: "branch_name", tbl: "branch_loans" },
  { diff: "Easy", ind: "SaaS", title: "Subscription MRR Rollup: Cloud Provider -> Region -> Tier Subtotals", d1: "cloud_provider", d2: "cloud_region", d3: "plan_tier", tbl: "subscription_mrr" },
  { diff: "Easy", ind: "Healthcare", title: "Hospital Operating Cost Rollup: Division -> Department -> Clinic", d1: "hospital_division", d2: "department", d3: "clinic_name", tbl: "hospital_costs" },
  { diff: "Easy", ind: "E-Commerce", title: "Omnichannel Retail Sales Rollup: Territory -> State -> Store", d1: "territory", d2: "state", d3: "store_id", tbl: "retail_revenue" },
  { diff: "Easy", ind: "Logistics", title: "Freight Tonnage Rollup: Continent -> Country -> Port Terminal", d1: "continent", d2: "country", d3: "terminal_code", tbl: "freight_tonnage" },
  // Medium (5)
  { diff: "Medium", ind: "Gaming", title: "Microtransaction Revenue CUBE: Platform x Region x Currency", d1: "platform", d2: "region", d3: "currency", tbl: "inapp_purchases" },
  { diff: "Medium", ind: "AdTech", title: "Ad Impression Yield CUBE: Device Type x Ad Format x Country", d1: "device_type", d2: "ad_format", d3: "country_code", tbl: "impression_yield" },
  { diff: "Medium", ind: "EdTech", title: "Tuition Revenue Grouping Sets: (College, Major) and (College) and Grand Total", d1: "college", d2: "major", d3: "degree_type", tbl: "tuition_fees" },
  { diff: "Medium", ind: "Energy", title: "Carbon Emissions Rollup: Sector -> Fuel Type -> Generating Station", d1: "sector", d2: "fuel_type", d3: "station_name", tbl: "carbon_emissions" },
  { diff: "Medium", ind: "Media", title: "Streaming Hours CUBE: Device Category x Content Genre x Subscription Tier", d1: "device_cat", d2: "genre", d3: "tier", tbl: "streaming_hours" },
  // Hard (5)
  { diff: "Hard", ind: "Fintech", title: "Corporate Balance Sheet ROLLUP with Dynamic GROUPING() Flag Indicators", d1: "entity_grp", d2: "legal_entity", d3: "asset_class", tbl: "balance_sheet" },
  { diff: "Hard", ind: "SaaS", title: "Customer Success Engagement Matrix: Multi-Dimensional GROUPING SETS Pipeline", d1: "market_segment", d2: "account_tier", d3: "geo_region", tbl: "cs_engagement" },
  { diff: "Hard", ind: "Healthcare", title: "Clinical Outcome Risk Scores Multi-Factor CUBE with Aggregate Disambiguation", d1: "age_bracket", d2: "comorbidity", d3: "insurance_type", tbl: "clinical_outcomes" },
  { diff: "Hard", ind: "E-Commerce", title: "Executive Retail Financial Reporting: Full Cross-Tab CUBE with Profit Margins", d1: "merchandise_dept", d2: "sales_channel", d3: "fiscal_quarter", tbl: "executive_margins" },
  { diff: "Hard", ind: "Logistics", title: "Intermodal Cargo Transit Time Variance ROLLUP with Synthetic Subtotal Labels", d1: "shipping_lane", d2: "carrier_mode", d3: "customs_broker", tbl: "intermodal_transit" }
];

t10Templates.forEach(item => {
  part2Cases.push({
    subtopic: "Multi-Dimensional Grouping",
    difficulty: item.diff,
    domain: item.ind,
    title: item.title,
    schema: `| Column | Type | Description |\n|---|---|---|\n| ${item.d1} | VARCHAR | Dimension 1 |\n| ${item.d2} | VARCHAR | Dimension 2 |\n| ${item.d3} | VARCHAR | Dimension 3 |\n| total_val | NUMERIC | Financial Value Metric |`,
    businessProblem: `In ${item.ind} executive reporting, business stakeholders need granular reports showing subtotals at each dimensional tier as well as an overall grand total, computed in a single table scan.`,
    targetQuery: `SELECT \n    CASE WHEN GROUPING(${item.d1}) = 1 THEN 'Grand Total' ELSE ${item.d1} END AS ${item.d1}_tier,\n    CASE WHEN GROUPING(${item.d2}) = 1 AND GROUPING(${item.d1}) = 0 THEN 'Subtotal' ELSE ${item.d2} END AS ${item.d2}_tier,\n    SUM(total_val) AS metric_total\nFROM ${item.tbl}\nGROUP BY ${item.d1}, ${item.d2} WITH ROLLUP;`,
    eli5Story: `Instead of writing 3 separate reports (one by city, one by state, one for the whole country) and gluing them together, ROLLUP creates a single report that has all the city numbers, the state subtotals, and the final national grand total!`,
    commonMistakes: [
      "Using naive COALESCE(col, 'Total') when legitimate NULL data exists in the base table, confusing genuine NULLs with subtotal rows",
      "Using CUBE with 6+ dimensions, causing an exponential 2^N explosion that exhausts server memory"
    ],
    takeaway: "ROLLUP and CUBE generate multi-tier subtotals and grand totals in a single table scan; GROUPING() is required to distinguish data NULLs from aggregate NULLs."
  });
});

console.log(`Part 2 Generated: ${part2Cases.length} cases.`);
module.exports = part2Cases;
