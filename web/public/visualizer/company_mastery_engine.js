/**
 * =============================================================================
 * DOMAIN & COMPANY MASTERY HUB ENGINE (ENTERPRISE EDITION - REDESIGNED)
 * 10 Canonical Industry Domains · 75+ Premier Global Employers · 323 LeetCode Vault
 * Clean Single-Focus Directory & Dedicated Employer Track Navigation
 * =============================================================================
 */

window.CompanyMasteryEngine = (function() {
  'use strict';

  const DOMAIN_CATALOG = {
    all: {
      id: "all",
      name: "All Industry Domains",
      icon: "🌐",
      badge: "Universal Master Hub",
      tagline: "Cross-domain relational mastery across all 10 enterprise sectors & 70+ employers",
      erdKey: null,
      companies: ["All Companies"],
      coreFocus: "Relational modeling, Window Analytics, Gaps & Islands, Aggregate Rollups, ACID Concurrency & Cloud Warehousing.",
      topSyntax: ["DENSE_RANK()", "COALESCE()", "SELF JOIN", "RECURSIVE CTE", "LEAD / LAG"],
      domainProbabilities: [
        { topic: "Window Analytics & Rankings", pct: 95 },
        { topic: "Multi-Table Relational Joins", pct: 90 },
        { topic: "Conditional Aggregation (CASE WHEN)", pct: 86 },
        { topic: "Three-Valued Logic & NULL Traps", pct: 75 }
      ]
    },
    fintech: {
      id: "fintech",
      name: "FinTech & Payments",
      icon: "💳",
      badge: "Ledgers & Compliance",
      tagline: "Double-entry bookkeeping, currency reconciliation, dispute clawbacks & idempotency",
      erdKey: "Fintech",
      companies: ["Stripe", "PayPal", "Block", "Adyen", "Plaid", "Brex", "Revolut", "JPMorgan Chase"],
      coreFocus: "High-concurrency atomic balances, FX currency conversions, fraud disputes, and immutable audit ledgers.",
      topSyntax: ["SUM() OVER (ORDER BY)", "DECIMAL(18,4)", "EXISTS", "RECURSIVE CTE"],
      domainProbabilities: [
        { topic: "Double-Entry Running Balances", pct: 98 },
        { topic: "Idempotent Event De-duplication", pct: 93 },
        { topic: "Dispute & Fee Attribution", pct: 89 },
        { topic: "Multi-Currency Normalization", pct: 84 }
      ]
    },
    quant: {
      id: "quant",
      name: "Quant Finance & HFT",
      icon: "📈",
      badge: "Microstructure & Risk",
      tagline: "Microsecond tick blotters, VWAP calculation, order book crossing & maximum drawdowns",
      erdKey: "Fintech",
      companies: ["Citadel", "Jane Street", "Two Sigma", "Renaissance", "Bloomberg", "Millennium", "Jump Trading"],
      coreFocus: "Microsecond timestamp ordering, tick-by-tick market spreads, VWAP pricing, and portfolio peak-to-trough drawdowns.",
      topSyntax: ["SUM(p*v)/SUM(v) OVER", "MAX() OVER (ROWS UNBOUNDED)", "FIRST_VALUE()", "NTH_VALUE()"],
      domainProbabilities: [
        { topic: "VWAP & Order Book Crossing", pct: 97 },
        { topic: "Peak Drawdown & High Watermarks", pct: 94 },
        { topic: "Sliding Frame Tick Window Averages", pct: 91 },
        { topic: "Consecutive Gain/Loss Streaks", pct: 86 }
      ]
    },
    ecommerce: {
      id: "ecommerce",
      name: "E-Commerce & Supply Chain",
      icon: "🛒",
      badge: "Fulfillment & Retail",
      tagline: "Inventory replenishment, cross-dock logistics, cart abandonment & merchant GMV",
      erdKey: "Retail",
      companies: ["Amazon", "Shopify", "Walmart", "Target", "eBay", "Etsy", "Instacart"],
      coreFocus: "Fulfillment center bottlenecks, inventory reorder triggers, merchant sales cohorts, and cart abandonment.",
      topSyntax: ["DENSE_RANK()", "ROWS BETWEEN 6 PRECEDING", "LEFT JOIN ... IS NULL", "SUM() OVER()"],
      domainProbabilities: [
        { topic: "Fulfillment & Inventory Replenishment", pct: 96 },
        { topic: "Merchant GMV & Fee Rollups", pct: 91 },
        { topic: "Cart Conversion & Drop-off Funnels", pct: 88 },
        { topic: "Cross-Dock Transit Times", pct: 82 }
      ]
    },
    social: {
      id: "social",
      name: "Social Networks & AdTech",
      icon: "📱",
      badge: "Graph & Auctions",
      tagline: "Mutual connection triangulation, ad CTR attribution, rolling DAU/MAU & viral reach",
      erdKey: "Media",
      companies: ["Meta", "Google", "TikTok", "Twitter/X", "Pinterest", "Snap", "Reddit"],
      coreFocus: "Friendship graph edges, newsfeed engagement decay, ad click-through attribution, and retention curves.",
      topSyntax: ["SELF JOIN", "CROSS JOIN", "LAG() OVER()", "GROUPING SETS"],
      domainProbabilities: [
        { topic: "Friendship Graph Triangulation", pct: 95 },
        { topic: "Ad Conversion & Attribution Funnels", pct: 92 },
        { topic: "Rolling 7-Day & 30-Day Active Users (DAU/MAU)", pct: 89 },
        { topic: "Engagement Decay & Viral Loops", pct: 83 }
      ]
    },
    streaming: {
      id: "streaming",
      name: "Streaming, Media & Gaming",
      icon: "🎮",
      badge: "Telemetry & Retention",
      tagline: "30-second listen thresholds, binge sessionization, Elo/MMR matchmaking & gacha drops",
      erdKey: "Media",
      companies: ["Netflix", "Spotify", "Riot Games", "Epic Games", "Roblox", "Disney+", "Twitch"],
      coreFocus: "Inactivity session gaps (gaps & islands), audio monetization thresholds, player matchmaking, and content catalog ROI.",
      topSyntax: ["LAG()", "SUM(is_new_session) OVER", "NTILE(10)", "CORR()"],
      domainProbabilities: [
        { topic: "Sessionization & Inactivity Gaps", pct: 97 },
        { topic: "Drop-off Curves & Skip Rates", pct: 91 },
        { topic: "Player Matchmaking MMR & Ranks", pct: 87 },
        { topic: "Subscription Tier Upgrades/Downgrades", pct: 82 }
      ]
    },
    marketplace: {
      id: "marketplace",
      name: "Mobility & Marketplaces",
      icon: "🚗",
      badge: "Two-Sided Logistics",
      tagline: "Supply-demand surge pricing, ETA variance, multi-leg dispatch & host occupancy",
      erdKey: "Logistics",
      companies: ["Uber", "Lyft", "DoorDash", "Airbnb", "Booking.com", "Grab", "Deliveroo"],
      coreFocus: "Two-sided matching rates, rolling surge multipliers, delivery ETA variance, and lodging occupancy calendars.",
      topSyntax: ["AVG(CASE WHEN)", "COUNT(DISTINCT)", "ROW_NUMBER() OVER", "INTERVAL"],
      domainProbabilities: [
        { topic: "Supply-Demand Surge Ratios", pct: 96 },
        { topic: "Driver/Courier Acceptance & Cancellation", pct: 92 },
        { topic: "Multi-Leg Order Dispatching", pct: 86 },
        { topic: "Host Booking Occupancy Rates", pct: 81 }
      ]
    },
    cloud: {
      id: "cloud",
      name: "Cloud Warehouses & SaaS",
      icon: "☁️",
      badge: "Columnar & Lakehouse",
      tagline: "Micro-partition pruning, QUALIFY deduplication, multi-tenant metering & org trees",
      erdKey: "SaaS",
      companies: ["Snowflake", "Databricks", "AWS", "Google Cloud", "Microsoft", "Salesforce", "MongoDB"],
      coreFocus: "Large-scale analytical transformations, partition pruning, multi-tenant query compute metering, and recursive org hierarchies.",
      topSyntax: ["QUALIFY", "ROW_NUMBER() OVER()", "RECURSIVE CTE", "LATERAL FLATTEN"],
      domainProbabilities: [
        { topic: "QUALIFY Window Deduplication", pct: 98 },
        { topic: "Micro-Partition Pruning Physics", pct: 93 },
        { topic: "Multi-Tenant Compute Metering", pct: 89 },
        { topic: "Recursive Org Hierarchy Trees", pct: 84 }
      ]
    },
    health: {
      id: "health",
      name: "HealthTech & Clinical",
      icon: "🏥",
      badge: "EHR & Claims",
      tagline: "30-day hospital readmissions, claims adjudication, ICD-10 diagnosis codes & HIPAA audit",
      erdKey: "Healthcare",
      companies: ["UnitedHealth", "Epic Systems", "Cerner", "Flatiron Health", "Moderna", "Tempus AI"],
      coreFocus: "Patient encounter lifecycles, 30-day hospital readmission penalties, claims adjudication, and diagnostic code hierarchies.",
      topSyntax: ["DATEDIFF()", "CASE WHEN ... IN", "COALESCE()", "PARTITION BY patient_id"],
      domainProbabilities: [
        { topic: "30-Day Hospital Readmission Tracking", pct: 96 },
        { topic: "Claims Adjudication & Copay Rollups", pct: 92 },
        { topic: "Diagnostic ICD-10 Code Grouping", pct: 87 },
        { topic: "Patient Longitudinal Encounters", pct: 82 }
      ]
    },
    iot: {
      id: "iot",
      name: "IoT & Autonomous Fleet",
      icon: "⚡",
      badge: "Time-Series Telemetry",
      tagline: "Sensor downsampling, battery voltage anomalies, supercharger queues & OTA rollouts",
      erdKey: "Hardware",
      companies: ["Tesla", "SpaceX", "Waymo", "Apple", "Rivian", "Samsara"],
      coreFocus: "High-frequency sensor telemetry, battery state-of-charge degradation, charging station queuing, and fleet firmware rollouts.",
      topSyntax: ["DATE_TRUNC('minute')", "AVG() OVER (ROWS 60 PRECEDING)", "PERCENTILE_CONT", "LEAD()"],
      domainProbabilities: [
        { topic: "High-Frequency Sensor Downsampling", pct: 95 },
        { topic: "Battery Degradation & Outliers", pct: 91 },
        { topic: "Supercharger Station Queue Congestion", pct: 88 },
        { topic: "Firmware OTA Canary Rollout Health", pct: 83 }
      ]
    },
    cyber: {
      id: "cyber",
      name: "Cybersecurity & Intel",
      icon: "🛡️",
      badge: "Threat Logs & Auth",
      tagline: "DDoS request logs, IP CIDR subnet containment, rate limit spikes & auth breaches",
      erdKey: "Security",
      companies: ["CrowdStrike", "Cloudflare", "Palo Alto Networks", "Okta", "Datadog", "Zscaler"],
      coreFocus: "Streaming firewall packet logs, IP CIDR block containment, authentication brute-force spikes, and API rate-limiting.",
      topSyntax: ["COUNT(*) OVER (PARTITION BY ip ORDER BY ts)", "CASE WHEN status = 429", "STRING_AGG", "HAVING COUNT(*) > 100"],
      domainProbabilities: [
        { topic: "DDoS Attack Vector Detection", pct: 97 },
        { topic: "Brute-Force Auth Anomaly Bursts", pct: 93 },
        { topic: "IP Subnet CIDR Aggregation", pct: 88 },
        { topic: "API Rate-Limit Spike Attribution", pct: 84 }
      ]
    }
  };

  // ===========================================================================
  // 2. DETAILED BESPOKE COMPANY INTELLIGENCE PROFILES
  // ===========================================================================
  const COMPANY_PROFILES = {
    all: {
      name: "All Top Companies",
      badge: "Universal Benchmark",
      icon: "🌐",
      domain: "all",
      tier: "Tier 1 Global Tech & Finance",
      dialect: "ANSI SQL · PostgreSQL · MySQL 8.0 · Snowflake · BigQuery",
      screenFormat: "45-min live technical screens & take-home assessments",
      coreFocus: "Relational modeling, Window Analytics, Gaps & Islands, Aggregate Rollups",
      interviewPattern: "1 foundational filter/join question + 1 advanced analytical partitioning question",
      topSyntax: ["DENSE_RANK()", "COALESCE()", "SELF JOIN", "RECURSIVE CTE", "LEAD / LAG"],
      probabilities: [
        { topic: "Window Analytics & Rankings", pct: 95 },
        { topic: "Multi-Table Joins & Anti-Joins", pct: 88 },
        { topic: "Conditional Aggregation (CASE WHEN)", pct: 84 },
        { topic: "Three-Valued Logic & NULL Traps", pct: 72 }
      ],
      mockTrackId: null
    },
    Amazon: {
      name: "Amazon & AWS",
      badge: "High-Volume Infrastructure",
      icon: "🛒",
      domain: "ecommerce",
      tier: "Tier 1 Cloud & E-Commerce",
      dialect: "PostgreSQL · Redshift · MySQL · Athena",
      screenFormat: "45-min Chime / CoderPad screen with Amazon Bar Raiser principles",
      coreFocus: "Fulfillment center bottlenecks, prime subscription churn, seller revenue cohorts, inventory reconciliation",
      interviewPattern: "Heavy emphasis on large-scale self-joins, moving averages, and cumulative window frames",
      topSyntax: ["DENSE_RANK()", "ROWS BETWEEN 6 PRECEDING", "LEFT JOIN ... IS NULL", "SUM() OVER()"],
      probabilities: [
        { topic: "Cumulative & Rolling Metrics", pct: 98 },
        { topic: "Self-Joins & Hierarchies", pct: 92 },
        { topic: "Inventory Anti-Joins", pct: 85 },
        { topic: "Customer Cohort Retention", pct: 80 }
      ],
      mockTrackId: "track_amazon"
    },
    Google: {
      name: "Google & YouTube",
      badge: "Hyper-Scale Analytics",
      icon: "🔍",
      domain: "social",
      tier: "Tier 1 Big Data & Cloud",
      dialect: "Google BigQuery · PostgreSQL · Spark SQL",
      screenFormat: "45-min Google Meet / Google Docs live query derivation",
      coreFocus: "Video view duration sessionization, query search click-through, ad CTR attribution, user journey paths",
      interviewPattern: "Rigorous algorithmic SQL — sessionization via window gaps, ARRAY_AGG, and QUALIFY semantics",
      topSyntax: ["LEAD() / LAG()", "QUALIFY", "COUNT(DISTINCT)", "UNNEST()"],
      probabilities: [
        { topic: "Sessionization & Inactivity Gaps", pct: 96 },
        { topic: "Window Partition Filtering", pct: 91 },
        { topic: "Search Attribution Funnels", pct: 84 },
        { topic: "Streaming Event De-duplication", pct: 79 }
      ],
      mockTrackId: "track_google"
    },
    Meta: {
      name: "Meta (Facebook / IG)",
      badge: "Social Graph & Ads",
      icon: "📱",
      domain: "social",
      tier: "Tier 1 Social Network & Ads",
      dialect: "Presto / Trino · Spark SQL · Scuba",
      screenFormat: "45-min CoderPad with 2 back-to-back live SQL scenarios",
      coreFocus: "Friend graph triangulation, newsfeed impressions, active user retention (DAU/MAU), ad conversion funnels",
      interviewPattern: "Fast-paced query formulation testing self-joins on friendships, rolling 7-day active user windows",
      topSyntax: ["DENSE_RANK()", "LAG() OVER()", "CROSS JOIN", "GROUPING SETS"],
      probabilities: [
        { topic: "Friendship Graph Triangulation", pct: 95 },
        { topic: "Rolling 7-Day / 30-Day Churn", pct: 92 },
        { topic: "Ad Conversion Rate (CASE WHEN)", pct: 88 },
        { topic: "Self-Join Mutual Connections", pct: 82 }
      ],
      mockTrackId: "track_meta"
    },
    Apple: {
      name: "Apple",
      badge: "Ecosystem & Hardware Services",
      icon: "🍏",
      domain: "iot",
      tier: "Tier 1 Consumer & Services",
      dialect: "PostgreSQL · Snowflake · Spark SQL",
      screenFormat: "45-min technical screen with Engineering Manager & Data Architect",
      coreFocus: "App Store in-app purchases, iCloud subscription renewal pipelines, hardware activation curves, privacy-safe analytics",
      interviewPattern: "Subscription lifecycle, trial conversion drops, refund reconciliation, and NULL handling",
      topSyntax: ["COALESCE()", "DATE_TRUNC()", "ROW_NUMBER()", "LEFT JOIN"],
      probabilities: [
        { topic: "Subscription Cohort Drop-off", pct: 94 },
        { topic: "Trial-to-Paid Conversion", pct: 89 },
        { topic: "Payment Refund Reconciliation", pct: 83 },
        { topic: "Hardware Batch Defect Ratios", pct: 75 }
      ],
      mockTrackId: "track_apple"
    },
    Stripe: {
      name: "Stripe",
      badge: "FinTech & Ledgers",
      icon: "💳",
      domain: "fintech",
      tier: "Tier 1 Global Payments Infrastructure",
      dialect: "PostgreSQL · Presto · DuckDB",
      screenFormat: "60-min interactive pairing on realistic ledger schemas with live unit tests",
      coreFocus: "Immutable double-entry balances, currency conversions, dispute chargeback clawbacks, idempotency keys",
      interviewPattern: "Zero tolerance for floating-point errors, strict transaction ordering, and running balance calculation",
      topSyntax: ["SUM() OVER (ORDER BY)", "EXISTS", "DECIMAL(18,4)", "RECURSIVE CTE"],
      probabilities: [
        { topic: "Double-Entry Running Balance", pct: 99 },
        { topic: "Dispute & Fee Attribution", pct: 94 },
        { topic: "Cross-Border FX Normalization", pct: 88 },
        { topic: "Idempotent Event De-duplication", pct: 82 }
      ],
      mockTrackId: "track_stripe"
    },
    Citadel: {
      name: "Citadel Securities",
      badge: "Quantitative Trading & HFT",
      icon: "🏛️",
      domain: "quant",
      tier: "Tier 1 Wall Street Market Maker",
      dialect: "PostgreSQL · kdb+/q · ClickHouse · TimescaleDB",
      screenFormat: "45-min high-intensity algorithmic screen testing market microstructure",
      coreFocus: "Order book bid-ask crossing, VWAP (Volume-Weighted Average Price), tick price changes, maximum portfolio drawdown",
      interviewPattern: "Window frames with microsecond timestamp ordering, non-equi joins on trade matches, and peak-to-trough drawdowns",
      topSyntax: ["SUM(p*v)/SUM(v) OVER", "MAX() OVER (ROWS UNBOUNDED)", "FIRST_VALUE()", "NTH_VALUE()"],
      probabilities: [
        { topic: "VWAP & Order Book Crossing", pct: 98 },
        { topic: "Peak Drawdown & Watermarks", pct: 95 },
        { topic: "Tick-by-Tick Spread Analysis", pct: 90 },
        { topic: "Latency & Fill-Rate Ratios", pct: 86 }
      ],
      mockTrackId: "track_citadel"
    },
    JaneStreet: {
      name: "Jane Street / Goldman Sachs",
      badge: "Wall Street Quant Trading",
      icon: "⚡",
      domain: "quant",
      tier: "Tier 1 Quantitative & Prop Trading",
      dialect: "PostgreSQL · kdb+/q · DuckDB · ClickHouse",
      screenFormat: "45-min algorithmic quant screen with rapid-fire SQL & trade blotters",
      coreFocus: "Option arbitrage pricing, multi-asset blotters, trade execution latency, running risk limits",
      interviewPattern: "Complex analytical window frames, rolling standard deviations, and multi-leg order book matching",
      topSyntax: ["SUM() OVER()", "AVG() OVER (ROWS 30 PRECEDING)", "CASE WHEN", "LAG()"],
      probabilities: [
        { topic: "Order Book Matching Arbitrage", pct: 97 },
        { topic: "Moving Average Volatility Bounds", pct: 94 },
        { topic: "Execution Blotter Fill Rates", pct: 90 },
        { topic: "High-Frequency Spread Analysis", pct: 85 }
      ],
      mockTrackId: "track_janestreet"
    },
    Bloomberg: {
      name: "Bloomberg",
      badge: "Financial Data & Terminals",
      icon: "📈",
      domain: "quant",
      tier: "Tier 1 Financial Data & Media",
      dialect: "PostgreSQL · Comdb2 · MySQL",
      screenFormat: "45-min HackerRank + Onsite System & SQL Bar Raiser",
      coreFocus: "Corporate actions (stock splits / dividends), ticker history backfills, analyst consensus estimates, portfolio asset allocation",
      interviewPattern: "Consecutive day price gainers, point-in-time financial reporting, and complex multi-column tie breaks",
      topSyntax: ["LAG()", "DENSE_RANK()", "CASE WHEN", "DATEADD / DATEDIFF"],
      probabilities: [
        { topic: "Consecutive Gain Streaks", pct: 95 },
        { topic: "Point-in-Time Financials", pct: 90 },
        { topic: "Ticker Dividend Adjustments", pct: 84 },
        { topic: "Consensus Average Outliers", pct: 78 }
      ],
      mockTrackId: "track_bloomberg"
    },
    Uber: {
      name: "Uber & DoorDash",
      badge: "Marketplace & Logistics",
      icon: "🚗",
      domain: "marketplace",
      tier: "Tier 1 Two-Sided Marketplace",
      dialect: "Presto · PostgreSQL · Spark SQL",
      screenFormat: "45-min CoderPad covering driver dispatch, surge multipliers, and delivery completion rates",
      coreFocus: "Driver acceptance rate, surge pricing efficiency, delivery ETAs vs actuals, restaurant order batching",
      interviewPattern: "Two-sided matching rates, rolling 15-minute supply-demand ratios, and cancelled trip penalties",
      topSyntax: ["AVG(CASE WHEN)", "COUNT(DISTINCT)", "ROW_NUMBER() OVER", "INTERVAL"],
      probabilities: [
        { topic: "Supply-Demand Surge Ratios", pct: 96 },
        { topic: "Driver Acceptance & Cancellation", pct: 91 },
        { topic: "Multi-Leg Delivery Duration", pct: 85 },
        { topic: "Rolling Window Hotspots", pct: 80 }
      ],
      mockTrackId: "track_uber"
    },
    Airbnb: {
      name: "Airbnb",
      badge: "Travel & Lodging Marketplace",
      icon: "🏡",
      domain: "marketplace",
      tier: "Tier 1 Travel & Hospitality",
      dialect: "Presto / Trino · Apache Iceberg · Snowflake",
      screenFormat: "45-min CoderPad pairing on host calendar availability and guest booking funnels",
      coreFocus: "Host occupancy rate, booking search conversions, cancellation policy refunds, seasonal pricing elasticities",
      interviewPattern: "Consecutive night date overlaps, host response time percentiles, and multi-listing performance",
      topSyntax: ["DATEDIFF()", "COUNT(DISTINCT)", "AVG() OVER()", "ROW_NUMBER()"],
      probabilities: [
        { topic: "Calendar Occupancy & Availability", pct: 95 },
        { topic: "Search-to-Booking Funnels", pct: 91 },
        { topic: "Host Cancellation Penalty Logic", pct: 86 },
        { topic: "Dynamic Seasonal Pricing Tiers", pct: 80 }
      ],
      mockTrackId: "track_airbnb"
    },
    Netflix: {
      name: "Netflix",
      badge: "Streaming & Media",
      icon: "🎬",
      domain: "streaming",
      tier: "Tier 1 Entertainment & CDN",
      dialect: "Trino · Spark SQL · Apache Iceberg",
      screenFormat: "45-min pairing interview on subscriber engagement and streaming telemetry",
      coreFocus: "Binge-watching session definition, title completion rates, personalized recommendation clicks, subscriber tier migration",
      interviewPattern: "Gap-based sessionization (28 minutes of inactivity), continuous watch streaks, and content catalog ROI",
      topSyntax: ["LAG()", "SUM(is_new_session) OVER", "NTILE(10)", "CORR()"],
      probabilities: [
        { topic: "Streaming Sessionization", pct: 96 },
        { topic: "Title Completion Drop-off", pct: 90 },
        { topic: "Plan Upgrade/Downgrade Retention", pct: 84 },
        { topic: "Regional Catalog Saturation", pct: 78 }
      ],
      mockTrackId: "track_netflix"
    },
    Spotify: {
      name: "Spotify",
      badge: "Audio Streaming & Playlists",
      icon: "🎵",
      domain: "streaming",
      tier: "Tier 1 Audio Streaming & Ads",
      dialect: "Google BigQuery · Trino · PostgreSQL",
      screenFormat: "45-min Google Meet pairing on listening duration and playlist telemetry",
      coreFocus: "30-second monetization thresholds, skip-rate window partitions, collaborative playlist deduplication",
      interviewPattern: "Streaming sessionization, user discovery algorithms, podcast ad insertion tracking",
      topSyntax: ["SUM(CASE WHEN duration >= 30)", "LAG()", "DENSE_RANK()", "QUALIFY"],
      probabilities: [
        { topic: "30s Monetization Listening Rule", pct: 97 },
        { topic: "Track Skip-Rate Partitions", pct: 92 },
        { topic: "Collaborative Playlist Deduplication", pct: 86 },
        { topic: "Artist Stream Share Attribution", pct: 81 }
      ],
      mockTrackId: null
    },
    Snowflake: {
      name: "Snowflake",
      badge: "Cloud Data Warehouse",
      icon: "❄️",
      domain: "cloud",
      tier: "Tier 1 Modern Data Stack",
      dialect: "Snowflake SQL (ANSI Standard)",
      screenFormat: "45-min virtual whiteboard on micro-partitioning, credit metering, and query tuning",
      coreFocus: "Zero-copy cloning, micro-partition pruning, QUALIFY deduplication, semi-structured JSON unnesting",
      interviewPattern: "Multi-tenant query compute metering, disk spill prevention, and window function deduplication",
      topSyntax: ["QUALIFY", "FLATTEN()", "ROW_NUMBER() OVER()", "PARSE_JSON()"],
      probabilities: [
        { topic: "QUALIFY Window Deduplication", pct: 98 },
        { topic: "Micro-Partition Pruning & Cost", pct: 94 },
        { topic: "Virtual Warehouse Credit Metering", pct: 90 },
        { topic: "Semi-Structured LATERAL FLATTEN", pct: 85 }
      ],
      mockTrackId: "track_snowflake"
    },
    Microsoft: {
      name: "Microsoft",
      badge: "Enterprise SaaS & Cloud",
      icon: "🏢",
      domain: "cloud",
      tier: "Tier 1 Enterprise Tech & Cloud",
      dialect: "T-SQL / SQL Server · Azure Synapse · PostgreSQL",
      screenFormat: "45-min Teams technical screen on recursive CTEs and enterprise hierarchy graphs",
      coreFocus: "Org chart traversal, Azure subscription credit allocation, Teams collaboration edges, B2B churn",
      interviewPattern: "Recursive Common Table Expressions, multi-level reporting lines, and enterprise seat utilization",
      topSyntax: ["WITH RECURSIVE", "SELF JOIN", "DENSE_RANK()", "CROSS APPLY"],
      probabilities: [
        { topic: "Recursive Org Hierarchy Trees", pct: 96 },
        { topic: "Manager-Report Salary Differential", pct: 92 },
        { topic: "Azure Multi-Tenant Credit Metering", pct: 88 },
        { topic: "B2B Enterprise License Renewal", pct: 82 }
      ],
      mockTrackId: "track_microsoft"
    },
    Coinbase: {
      name: "Coinbase & Robinhood",
      badge: "Crypto & Retail Brokerage",
      icon: "🪙",
      domain: "fintech",
      tier: "Tier 1 Digital Assets & FinTech",
      dialect: "PostgreSQL · Snowflake · Presto",
      screenFormat: "45-min live pairing on crypto order book fills, deposit-to-trade velocity, and wash trading rings",
      coreFocus: "Order fill matching, maker/taker fee splits, ACH instant deposit outflow risk, circular wash trading",
      interviewPattern: "Strict financial precision, double-entry crypto ledger updates, and graph cycle detection",
      topSyntax: ["SUM(p*size)", "CASE WHEN fee_tier", "CYCLE DETECTION", "LAG()"],
      probabilities: [
        { topic: "Maker / Taker Volume Fee Splits", pct: 97 },
        { topic: "Deposit Velocity & Outflow Risk", pct: 93 },
        { topic: "Circular Wash Trading Rings", pct: 89 },
        { topic: "Cold Wallet Rebalancing Thresholds", pct: 83 }
      ],
      mockTrackId: "track_coinbase"
    },
    Tesla: {
      name: "Tesla & SpaceX",
      badge: "Autonomous Fleet & IoT",
      icon: "⚡",
      domain: "iot",
      tier: "Tier 1 Hardware, EV & Aerospace",
      dialect: "TimescaleDB · PostgreSQL · ClickHouse · Trino",
      screenFormat: "45-min screen on time-series telemetry downsampling and vehicle fleet state-of-charge",
      coreFocus: "Supercharger stall queue times, battery pack voltage drop-offs, fleet OTA rollout canary verification",
      interviewPattern: "Timestamp bucketing, rolling time windows (ROWS BETWEEN), and sensor anomaly detection",
      topSyntax: ["DATE_TRUNC()", "AVG() OVER (ROWS 60 PRECEDING)", "PERCENTILE_CONT", "LEAD()"],
      probabilities: [
        { topic: "Supercharger Queue Congestion", pct: 96 },
        { topic: "Battery Voltage Drop Anomalies", pct: 92 },
        { topic: "Fleet Firmware Canary Health", pct: 88 },
        { topic: "Autopilot Telemetry Disengagement", pct: 82 }
      ],
      mockTrackId: null
    },
    EpicSystems: {
      name: "Epic Systems & Healthcare",
      badge: "Clinical Records & EHR",
      icon: "🏥",
      domain: "health",
      tier: "Tier 1 HealthTech & Clinical",
      dialect: "InterSystems Caché SQL · PostgreSQL · Snowflake",
      screenFormat: "45-min technical screen on patient encounter pipelines, hospital readmissions, and claims adjudication",
      coreFocus: "30-day all-cause hospital readmission penalties, diagnosis code ICD-10 rollups, prescription adherence",
      interviewPattern: "Patient encounter date intervals, cohort retention, and HIPAA-safe data de-identification",
      topSyntax: ["DATEDIFF()", "CASE WHEN", "PARTITION BY patient_id", "COUNT(DISTINCT)"],
      probabilities: [
        { topic: "30-Day Hospital Readmission Rate", pct: 97 },
        { topic: "Claims Adjudication Copay Rollups", pct: 92 },
        { topic: "Diagnosis Code ICD-10 Aggregation", pct: 87 },
        { topic: "Prescription Refill Compliance Gap", pct: 82 }
      ],
      mockTrackId: null
    },
    Cloudflare: {
      name: "Cloudflare & CrowdStrike",
      badge: "Cybersecurity & Edge Logs",
      icon: "🛡️",
      domain: "cyber",
      tier: "Tier 1 Cloud Security & CDN",
      dialect: "ClickHouse · PostgreSQL · Trino",
      screenFormat: "45-min live log analysis on DDoS attack mitigation, IP CIDR containment, and rate-limit spikes",
      coreFocus: "High-velocity streaming request logs, IP subnet CIDR aggregation, rate-limiting HTTP 429 thresholding",
      interviewPattern: "Sliding window burst detection, rapid-fire IP group filtering, and latency percentile tracking",
      topSyntax: ["COUNT(*) OVER (PARTITION BY ip)", "HAVING COUNT(*) > 100", "APPROX_PERCENTILE", "STRING_AGG"],
      probabilities: [
        { topic: "DDoS High-Frequency Burst Detection", pct: 98 },
        { topic: "IP Subnet CIDR Block Aggregation", pct: 93 },
        { topic: "HTTP 429 Rate-Limit Spikes", pct: 89 },
        { topic: "SSL Handshake Latency Percentiles", pct: 84 }
      ],
      mockTrackId: null
    }
  };


  // Helper to dynamically synthesize a company profile if not explicitly defined above
  function getCompanyProfile(companyKey) {
    if (COMPANY_PROFILES[companyKey]) {
      return COMPANY_PROFILES[companyKey];
    }

    // Try fuzzy match without punctuation or spaces
    const clean = (companyKey || '').replace(/[^a-z0-9]/gi, '').toLowerCase();
    for (const k in COMPANY_PROFILES) {
      if (k.replace(/[^a-z0-9]/gi, '').toLowerCase() === clean) {
        return COMPANY_PROFILES[k];
      }
    }

    // Lookup which domain this company belongs to
    let foundDomain = DOMAIN_CATALOG.all;
    for (const dKey in DOMAIN_CATALOG) {
      if (DOMAIN_CATALOG[dKey].companies) {
        const found = DOMAIN_CATALOG[dKey].companies.some(c => c.replace(/[^a-z0-9]/gi, '').toLowerCase() === clean);
        if (found) {
          foundDomain = DOMAIN_CATALOG[dKey];
          break;
        }
      }
    }

    return {
      name: companyKey,
      badge: foundDomain.name,
      icon: foundDomain.icon || '🏢',
      domain: foundDomain.id,
      tier: "Tier 1 Enterprise Employer",
      dialect: "ANSI SQL · PostgreSQL · Snowflake",
      screenFormat: "45-min technical screen & real-world relational schema evaluation",
      coreFocus: foundDomain.coreFocus || "Relational modeling, Window Analytics, Gaps & Islands, Aggregate Rollups.",
      interviewPattern: `Specialized domain problem solving in ${foundDomain.name} testing ${foundDomain.tagline || 'core relational patterns'}.`,
      topSyntax: foundDomain.topSyntax || ["DENSE_RANK()", "COALESCE()", "SELF JOIN", "RECURSIVE CTE"],
      probabilities: foundDomain.domainProbabilities || [
        { topic: "Window Analytics & Rankings", pct: 90 },
        { topic: "Multi-Table Relational Joins", pct: 85 },
        { topic: "Conditional Aggregation (CASE WHEN)", pct: 80 }
      ],
      mockTrackId: null
    };
  }

  // Curated list of premier employers across all industry verticals
  const FEATURED_EMPLOYERS = [
    { key: 'Amazon', name: 'Amazon & AWS', domain: 'ecommerce', tier: 'Tier 1 FAANG / Cloud', icon: '📦' },
    { key: 'Google', name: 'Google & YouTube', domain: 'social', tier: 'Tier 1 FAANG / Search', icon: '🔍' },
    { key: 'Meta', name: 'Meta (Facebook / IG)', domain: 'social', tier: 'Tier 1 FAANG / AdTech', icon: '📱' },
    { key: 'Apple', name: 'Apple', domain: 'iot', tier: 'Tier 1 Tech / Consumer', icon: '🍏' },
    { key: 'Stripe', name: 'Stripe', domain: 'fintech', tier: 'Tier 1 FinTech Unicorn', icon: '💳' },
    { key: 'Citadel', name: 'Citadel Securities', domain: 'quant', tier: 'Tier 1 Quantitative HFT', icon: '🏛️' },
    { key: 'Jane Street', name: 'Jane Street', domain: 'quant', tier: 'Tier 1 Quantitative Trading', icon: '⚡' },
    { key: 'Bloomberg', name: 'Bloomberg LP', domain: 'quant', tier: 'Financial Terminal Scale', icon: '📊' },
    { key: 'Netflix', name: 'Netflix', domain: 'streaming', tier: 'Tier 1 Streaming Media', icon: '🍿' },
    { key: 'Spotify', name: 'Spotify', domain: 'streaming', tier: 'Tier 1 Audio Streaming', icon: '🎧' },
    { key: 'Snowflake', name: 'Snowflake', domain: 'cloud', tier: 'Cloud Data Warehouse', icon: '❄️' },
    { key: 'Databricks', name: 'Databricks', domain: 'cloud', tier: 'Lakehouse & Spark Analytics', icon: '🧱' },
    { key: 'Microsoft', name: 'Microsoft', domain: 'cloud', tier: 'Tier 1 Tech & Azure', icon: '💻' },
    { key: 'Uber', name: 'Uber Technologies', domain: 'marketplace', tier: 'Mobility & Marketplace', icon: '🚗' },
    { key: 'Airbnb', name: 'Airbnb', domain: 'marketplace', tier: 'Travel & Hospitality', icon: '🏡' },
    { key: 'DoorDash', name: 'DoorDash', domain: 'marketplace', tier: 'Logistics & Food Delivery', icon: '🥡' },
    { key: 'Shopify', name: 'Shopify', domain: 'ecommerce', tier: 'E-Commerce Merchant Scale', icon: '🛍️' },
    { key: 'Walmart', name: 'Walmart Global Tech', domain: 'ecommerce', tier: 'Enterprise Retail Scale', icon: '🛒' },
    { key: 'PayPal', name: 'PayPal', domain: 'fintech', tier: 'Global Payments Network', icon: '💸' },
    { key: 'Plaid', name: 'Plaid', domain: 'fintech', tier: 'FinTech Banking APIs', icon: '🔌' },
    { key: 'Coinbase', name: 'Coinbase', domain: 'fintech', tier: 'Digital Assets & Crypto', icon: '🪙' },
    { key: 'Tesla', name: 'Tesla', domain: 'iot', tier: 'Automotive & Telemetry IoT', icon: '⚡' },
    { key: 'Cloudflare', name: 'Cloudflare', domain: 'cyber', tier: 'CDN & Edge Infrastructure', icon: '🛡️' },
    { key: 'CrowdStrike', name: 'CrowdStrike', domain: 'cyber', tier: 'Cyber Threat Intelligence', icon: '🦅' },
    { key: 'Epic Systems', name: 'Epic Systems', domain: 'health', tier: 'Healthcare Records (EHR)', icon: '🏥' },
    { key: 'Twitter/X', name: 'Twitter / X', domain: 'social', tier: 'Real-Time Social Graph', icon: '🐦' },
    { key: 'TikTok', name: 'TikTok / ByteDance', domain: 'social', tier: 'Video Feed Analytics', icon: '🎵' },
    { key: 'Snap', name: 'Snap Inc.', domain: 'social', tier: 'Ephemeral Messaging & Ads', icon: '👻' },
    { key: 'Two Sigma', name: 'Two Sigma', domain: 'quant', tier: 'Systematic Quantitative Fund', icon: '📈' },
    { key: 'Goldman Sachs', name: 'Goldman Sachs', domain: 'quant', tier: 'Global Investment Banking', icon: '🏦' }
  ];

  // ===========================================================================
  // 3. ENGINE STATE & INITIALIZATION
  // ===========================================================================
  let viewMode = 'directory'; // 'directory' | 'company' | 'domain'
  let directoryTab = 'employers'; // 'employers' | 'domains' | 'problems'
  let directoryDomainFilter = 'all'; // Filter within employers tab
  let directorySearch = ''; // Filter text in directory mode

  let activeDomain = 'all';
  let activeCompany = 'all';
  let activeDifficulty = 'all';
  let searchQuery = '';
  let activeSort = 'probability'; // 'probability' | 'id' | 'difficulty'
  let activeModalProblem = null;

  function init() {
    const container = document.getElementById('viewCompanyHub');
    if (container) {
      render(container);
    }
  }

  function getVaultProblems() {
    if (typeof window.getAllLeetCodeProblems === 'function') {
      return window.getAllLeetCodeProblems();
    }
    return window.LEETCODE_300_VAULT || [];
  }

  function getFilteredProblems() {
    const vault = getVaultProblems();
    return vault.filter(p => {
      // Domain Match
      if (activeDomain !== 'all') {
        const domains = p.domains || [];
        if (!domains.includes(activeDomain)) return false;
      }

      // Company Match with clean fuzzy match
      if (activeCompany !== 'all') {
        const cleanTarget = activeCompany.toLowerCase().replace(/[^a-z0-9]/g, '');
        const hasCompany = (p.companies || []).some(c => {
          const cleanC = c.toLowerCase().replace(/[^a-z0-9]/g, '');
          return cleanC.includes(cleanTarget) || cleanTarget.includes(cleanC);
        });
        if (!hasCompany) return false;
      }

      // Difficulty Match
      if (activeDifficulty !== 'all') {
        if ((p.difficulty || '').toLowerCase() !== activeDifficulty.toLowerCase()) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const numMatch = String(p.id).includes(q) || String(p.number || '').includes(q);
        const titleMatch = (p.title || '').toLowerCase().includes(q);
        const catMatch = (p.category || '').toLowerCase().includes(q);
        const sqlMatch = (p.solutionSQL || '').toLowerCase().includes(q);
        const compMatch = (p.companies || []).some(c => c.toLowerCase().includes(q));
        if (!numMatch && !titleMatch && !catMatch && !sqlMatch && !compMatch) return false;
      }

      return true;
    }).sort((a, b) => {
      if (activeSort === 'probability') {
        const getFreqScore = (item) => {
          const str = item.interviewFreq || '';
          const match = str.match(/(\d+)%/);
          return match ? parseInt(match[1], 10) : 50;
        };
        return getFreqScore(b) - getFreqScore(a);
      } else if (activeSort === 'id') {
        return (a.id || 0) - (b.id || 0);
      } else if (activeSort === 'difficulty') {
        const diffRank = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        return (diffRank[b.difficulty] || 2) - (diffRank[a.difficulty] || 2);
      }
      return 0;
    });
  }

  function getDomainQuestionCount(domainKey) {
    const vault = getVaultProblems();
    if (domainKey === 'all') return vault.length;
    return vault.filter(p => (p.domains || []).includes(domainKey)).length;
  }

  function getCompanyQuestionCount(companyKey) {
    const vault = getVaultProblems();
    if (companyKey === 'all') {
      if (activeDomain === 'all') return vault.length;
      return vault.filter(p => (p.domains || []).includes(activeDomain)).length;
    }
    const cleanTarget = companyKey.toLowerCase().replace(/[^a-z0-9]/g, '');
    return vault.filter(p => (p.companies || []).some(c => {
      const cleanC = c.toLowerCase().replace(/[^a-z0-9]/g, '');
      return cleanC.includes(cleanTarget) || cleanTarget.includes(cleanC);
    })).length;
  }

  function getCompanyDifficultyCounts(companyKey) {
    const vault = getVaultProblems();
    let easy = 0, med = 0, hard = 0, total = 0;
    const cleanTarget = (companyKey === 'all') ? '' : companyKey.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    vault.forEach(p => {
      if (cleanTarget) {
        const match = (p.companies || []).some(c => {
          const cleanC = c.toLowerCase().replace(/[^a-z0-9]/g, '');
          return cleanC.includes(cleanTarget) || cleanTarget.includes(cleanC);
        });
        if (!match) return;
      }
      total++;
      const diff = (p.difficulty || 'Medium').toLowerCase();
      if (diff === 'easy') easy++;
      else if (diff === 'hard') hard++;
      else med++;
    });

    return { easy, med, hard, total };
  }

  // ===========================================================================
  // 4. MAIN VIEW RENDERER
  // ===========================================================================
  function render(container) {
    if (!container) {
      container = document.getElementById('viewCompanyHub');
    }
    if (!container) return;

    // Check if in Directory Mode or Dedicated Track Mode
    if (viewMode === 'directory') {
      renderDirectoryMode(container);
    } else {
      renderDedicatedTrackMode(container);
    }
  }

  // ---------------------------------------------------------------------------
  // 4A. DIRECTORY HUB (HOME LAUNCHPAD) - CLEAN, SCANNABLE, ZERO-CLUTTER
  // ---------------------------------------------------------------------------
  function renderDirectoryMode(container) {
    const vault = getVaultProblems();
    const totalVaultCount = vault.length;

    // Filter employers if domain filter or search is active
    let displayEmployers = FEATURED_EMPLOYERS;
    if (directoryDomainFilter !== 'all') {
      displayEmployers = displayEmployers.filter(e => e.domain === directoryDomainFilter);
    }
    if (directorySearch.trim()) {
      const q = directorySearch.toLowerCase().trim();
      displayEmployers = displayEmployers.filter(e => 
        e.name.toLowerCase().includes(q) || 
        e.tier.toLowerCase().includes(q) || 
        e.domain.toLowerCase().includes(q)
      );
    }

    // Filter domains if search active
    let displayDomains = Object.keys(DOMAIN_CATALOG).filter(k => k !== 'all');
    if (directorySearch.trim()) {
      const q = directorySearch.toLowerCase().trim();
      displayDomains = displayDomains.filter(k => {
        const d = DOMAIN_CATALOG[k];
        return d.name.toLowerCase().includes(q) || d.tagline.toLowerCase().includes(q) || (d.companies || []).some(c => c.toLowerCase().includes(q));
      });
    }

    container.innerHTML = `
      <div class="company-hub-wrapper">
        <!-- Sleek Directory Top Navigation Bar -->
        <header class="company-directory-topbar">
          <div class="hub-header-brand">
            <span class="hub-brand-icon">🏛️</span>
            <div>
              <h1 class="hub-brand-title">Company &amp; Industry Tracks</h1>
              <p class="hub-brand-sub">75 Premier Employers &bull; 10 Industry Domains &bull; ${totalVaultCount} WASM-Judged Problems</p>
            </div>
          </div>

          <!-- Segmented Toggle: 3 Clean View Modes -->
          <div class="hub-tab-segmented">
            <button class="hub-seg-btn ${directoryTab === 'employers' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDirectoryTab('employers')">
              <span>🏢 Top Employers (${FEATURED_EMPLOYERS.length})</span>
            </button>
            <button class="hub-seg-btn ${directoryTab === 'domains' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDirectoryTab('domains')">
              <span>🌐 Industry Domains (10)</span>
            </button>
            <button class="hub-seg-btn ${directoryTab === 'problems' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDirectoryTab('problems')">
              <span>📋 All Problems (${totalVaultCount})</span>
            </button>
          </div>

          <!-- Quick Search Filter -->
          <div class="hub-search-field">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" class="hub-search-input-box" id="hubDirSearch" placeholder="Filter company or domain..." value="${escapeHtml(directorySearch)}" oninput="window.CompanyMasteryEngine.onDirectorySearch(this.value)">
            ${directorySearch ? '<button class="hub-search-clear" onclick="window.CompanyMasteryEngine.clearDirectorySearch()">✕</button>' : ''}
          </div>
        </header>

        <!-- SUB-VIEW 1: TOP EMPLOYERS CARDS DIRECTORY -->
        ${directoryTab === 'employers' ? `
          <!-- Domain Filter Quick Pills -->
          <div class="company-domain-pills-bar">
            <button class="domain-filter-pill ${directoryDomainFilter === 'all' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDirectoryDomainFilter('all')">All Sectors</button>
            <button class="domain-filter-pill ${directoryDomainFilter === 'cloud' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDirectoryDomainFilter('cloud')">☁️ Cloud &amp; Warehouses</button>
            <button class="domain-filter-pill ${directoryDomainFilter === 'quant' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDirectoryDomainFilter('quant')">📈 Quant &amp; Wall St</button>
            <button class="domain-filter-pill ${directoryDomainFilter === 'fintech' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDirectoryDomainFilter('fintech')">💳 FinTech &amp; Payments</button>
            <button class="domain-filter-pill ${directoryDomainFilter === 'ecommerce' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDirectoryDomainFilter('ecommerce')">🛒 E-Commerce &amp; Retail</button>
            <button class="domain-filter-pill ${directoryDomainFilter === 'social' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDirectoryDomainFilter('social')">💬 Social &amp; AdTech</button>
            <button class="domain-filter-pill ${directoryDomainFilter === 'streaming' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDirectoryDomainFilter('streaming')">🎬 Streaming Media</button>
            <button class="domain-filter-pill ${directoryDomainFilter === 'marketplace' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDirectoryDomainFilter('marketplace')">🚗 Mobility &amp; Logistics</button>
            <button class="domain-filter-pill ${directoryDomainFilter === 'cyber' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDirectoryDomainFilter('cyber')">🛡️ Cybersecurity</button>
            <button class="domain-filter-pill ${directoryDomainFilter === 'health' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDirectoryDomainFilter('health')">🧬 Healthcare</button>
            <button class="domain-filter-pill ${directoryDomainFilter === 'iot' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDirectoryDomainFilter('iot')">⚡ Automotive &amp; IoT</button>
          </div>

          <!-- Company Cards Grid -->
          <div class="company-directory-grid">
            ${displayEmployers.map(emp => {
              const prof = getCompanyProfile(emp.key);
              const counts = getCompanyDifficultyCounts(emp.key);
              const qCount = counts.total;
              return `
                <div class="company-directory-card" onclick="window.CompanyMasteryEngine.openCompanyTrack('${emp.key}')">
                  <div class="company-card-header">
                    <div class="company-card-title-group">
                      <span class="company-card-avatar">${emp.icon || prof.icon || '🏢'}</span>
                      <div>
                        <h3 class="company-card-name">${emp.name}</h3>
                        <span class="company-card-domain-badge">${prof.badge}</span>
                      </div>
                    </div>
                    <span class="company-card-count-badge">${qCount} Problems</span>
                  </div>

                  <p class="company-card-focus">${escapeHtml(prof.coreFocus || '')}</p>

                  <div class="company-card-specs-row">
                    <span class="company-spec-tag dialect">${prof.dialect ? prof.dialect.split('·')[0].trim() : 'PostgreSQL'}</span>
                    <span class="company-spec-tag tier">${emp.tier || prof.tier || 'Tier 1'}</span>
                    ${prof.mockTrackId ? `<span class="company-spec-tag mock">🎯 45m Mock</span>` : ''}
                  </div>

                  <div class="company-card-syntax-row">
                    ${(prof.topSyntax || []).slice(0, 3).map(s => `<span class="company-syntax-pill">${escapeHtml(s)}</span>`).join('')}
                  </div>

                  <div class="company-card-footer">
                    <div class="company-card-diff-dots">
                      <span class="dot-count easy">🟢 ${counts.easy}</span>
                      <span class="dot-count medium">🟡 ${counts.med}</span>
                      <span class="dot-count hard">🔴 ${counts.hard}</span>
                    </div>
                    <button class="company-card-open-btn" onclick="event.stopPropagation(); window.CompanyMasteryEngine.openCompanyTrack('${emp.key}')">
                      <span>Explore Track →</span>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : ''}

        <!-- SUB-VIEW 2: INDUSTRY DOMAINS CARDS DIRECTORY -->
        ${directoryTab === 'domains' ? `
          <div class="domain-directory-grid">
            ${displayDomains.map(dKey => {
              const d = DOMAIN_CATALOG[dKey];
              const dCount = getDomainQuestionCount(dKey);
              return `
                <div class="domain-directory-card" onclick="window.CompanyMasteryEngine.openDomainTrack('${dKey}')">
                  <div class="domain-card-header">
                    <div class="domain-card-title-group">
                      <span class="domain-card-icon">${d.icon}</span>
                      <div>
                        <h3 class="domain-card-name">${d.name}</h3>
                        <span class="domain-card-badge">${d.badge}</span>
                      </div>
                    </div>
                    <span class="domain-card-count-badge">${dCount} Problems</span>
                  </div>

                  <p class="domain-card-tagline">${escapeHtml(d.tagline)}</p>
                  <p class="domain-card-focus"><strong>Relational Focus:</strong> ${escapeHtml(d.coreFocus)}</p>

                  <div class="domain-card-employers">
                    <span class="domain-emp-label">Target Employers:</span>
                    ${(d.companies || []).slice(0, 6).map(c => `
                      <span class="domain-emp-chip" onclick="event.stopPropagation(); window.CompanyMasteryEngine.openCompanyTrack('${c}')">${c}</span>
                    `).join('')}
                    ${(d.companies || []).length > 6 ? `<span class="domain-emp-chip more">+${(d.companies.length - 6)}</span>` : ''}
                  </div>

                  <div class="domain-card-footer">
                    ${d.erdKey && window.DOMAIN_ERD_ENGINE ? `
                      <button class="domain-erd-action-btn" onclick="event.stopPropagation(); window.CompanyMasteryEngine.openDomainERD('${d.erdKey}')">
                        <span>📐 View ERD Model</span>
                      </button>
                    ` : '<div></div>'}
                    <button class="domain-card-open-btn" onclick="event.stopPropagation(); window.CompanyMasteryEngine.openDomainTrack('${dKey}')">
                      <span>Open Domain Track (${dCount}) →</span>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : ''}

        <!-- SUB-VIEW 3: ALL PROBLEMS DIRECTORY -->
        ${directoryTab === 'problems' ? renderAllProblemsTable() : ''}
      </div>

      <!-- Detail Modal Mount Point -->
      <div id="companyProblemModal" class="company-modal-overlay" style="display: none;" onclick="window.CompanyMasteryEngine.handleModalOverlayClick(event)">
        <div class="company-modal-dialog">
          <div id="companyModalContent"></div>
        </div>
      </div>
    `;
  }

  // ---------------------------------------------------------------------------
  // 4B. DEDICATED TRACK VIEW (SINGLE PAGE ON ONE SCREEN)
  // ---------------------------------------------------------------------------
  function renderDedicatedTrackMode(container) {
    const isCompanyMode = viewMode === 'company';
    const domain = DOMAIN_CATALOG[activeDomain] || DOMAIN_CATALOG.all;
    const profile = isCompanyMode
      ? getCompanyProfile(activeCompany)
      : { ...COMPANY_PROFILES.all, name: domain.name, icon: domain.icon, coreFocus: domain.coreFocus, probabilities: domain.domainProbabilities, topSyntax: domain.topSyntax, badge: domain.badge, tier: "Industry Vertical Track", dialect: "ANSI SQL · PostgreSQL · Snowflake · BigQuery", screenFormat: `45-min domain relational technical screen on ${domain.name}` };

    const filteredProblems = getFilteredProblems();
    const totalCount = filteredProblems.length;
    const counts = isCompanyMode ? getCompanyDifficultyCounts(activeCompany) : getCompanyDifficultyCounts('all');

    container.innerHTML = `
      <div class="company-hub-wrapper">
        <!-- Sleek 44px Dedicated Track Action Bar -->
        <header class="company-track-topbar">
          <div class="track-bar-left">
            <button class="track-back-btn" onclick="window.CompanyMasteryEngine.backToDirectory()" title="Return to Company &amp; Domain Directory">
              <span class="track-back-arrow">←</span>
              <span>Back to Hub</span>
            </button>

            <div class="track-bar-sep"></div>

            <div class="track-bar-title-group">
              <span class="track-bar-icon">${profile.icon}</span>
              <span class="track-bar-name">${profile.name} ${isCompanyMode ? 'Interview Track' : 'Domain Track'}</span>
              <span class="track-bar-tier">${profile.tier}</span>
              <span class="track-bar-domain">${profile.badge || domain.name}</span>
              <span class="track-bar-count">${totalCount} Curated Problems</span>
            </div>
          </div>

          <div class="track-bar-right">
            ${profile.mockTrackId ? `
              <button class="track-cta-btn primary" onclick="window.CompanyMasteryEngine.launchMockTrack('${profile.mockTrackId}')">
                <span>🎯 45-Min Mock Screen</span>
              </button>
            ` : ''}
            <button class="track-cta-btn secondary" onclick="window.CompanyMasteryEngine.jumpToArena()">
              <span>⚡ Practice in Arena</span>
            </button>
            ${domain.erdKey && window.DOMAIN_ERD_ENGINE ? `
              <button class="track-cta-btn tertiary" onclick="window.CompanyMasteryEngine.openDomainERD('${domain.erdKey}')">
                <span>📐 View ERD Diagram</span>
              </button>
            ` : ''}
          </div>
        </header>

        <!-- Compact Scannable Interview Dossier -->
        <div class="company-dossier-card">
          <div class="dossier-main-col">
            <div class="dossier-header-bar">
              <div class="dossier-badge-row">
                <span class="dossier-tier-pill">${profile.tier}</span>
                <span class="dossier-category-pill">${profile.badge}</span>
                ${profile.mockTrackId ? `<span class="dossier-live-screen-pill">🎯 Interactive 45-Min Timed Screen</span>` : ''}
              </div>
              <h2 class="dossier-company-name">${profile.icon} ${profile.name} Technical Dossier</h2>
            </div>

            <p class="dossier-focus-desc"><strong>Core Relational Focus:</strong> ${profile.coreFocus}</p>

            <div class="dossier-specs-grid">
              <div class="dossier-spec-item">
                <div class="spec-label">Primary Dialects</div>
                <div class="spec-value">${profile.dialect}</div>
              </div>
              <div class="dossier-spec-item">
                <div class="spec-label">Screening Format</div>
                <div class="spec-value">${profile.screenFormat}</div>
              </div>
              <div class="dossier-spec-item">
                <div class="spec-label">Target Syntax Mastery</div>
                <div class="spec-syntax-tags">
                  ${(profile.topSyntax || []).map(s => `<span class="syntax-tag">${s}</span>`).join('')}
                </div>
              </div>
            </div>
          </div>

          <div class="dossier-radar-col">
            <h4 class="radar-title">Question Pattern Probability</h4>
            <div class="prob-bars-list">
              ${(profile.probabilities || []).map(p => `
                <div class="prob-bar-row">
                  <div class="prob-bar-label">
                    <span>${p.topic}</span>
                    <span class="prob-num">${p.pct}%</span>
                  </div>
                  <div class="prob-bar-track">
                    <div class="prob-bar-fill" style="width: ${p.pct}%"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Filter & Search Controls for Target Problems -->
        <div class="hub-controls-row">
          <div class="hub-search-box">
            <span class="search-icon">🔍</span>
            <input type="text" 
                   id="hubProblemSearch" 
                   class="hub-search-input" 
                   placeholder="Search ${profile.name} problems by #, title, keyword (e.g. QUALIFY, DENSE_RANK)..." 
                   value="${escapeHtml(searchQuery)}" 
                   oninput="window.CompanyMasteryEngine.onSearchChange(this.value)" />
            ${searchQuery ? `<button class="search-clear-btn" onclick="window.CompanyMasteryEngine.clearSearch()">✕</button>` : ''}
          </div>

          <div class="hub-filter-group">
            <div class="diff-filter-btns">
              <button class="diff-btn ${activeDifficulty === 'all' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDifficulty('all')">All (${totalCount})</button>
              <button class="diff-btn easy ${activeDifficulty === 'easy' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDifficulty('easy')">🟢 Easy (${counts.easy})</button>
              <button class="diff-btn medium ${activeDifficulty === 'medium' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDifficulty('medium')">🟡 Medium (${counts.med})</button>
              <button class="diff-btn hard ${activeDifficulty === 'hard' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDifficulty('hard')">🔴 Hard (${counts.hard})</button>
            </div>

            <div class="sort-selector">
              <label for="hubSortSelect">Sort by:</label>
              <select id="hubSortSelect" class="hub-select" onchange="window.CompanyMasteryEngine.setSort(this.value)">
                <option value="probability" ${activeSort === 'probability' ? 'selected' : ''}>Interview Frequency (High → Low)</option>
                <option value="id" ${activeSort === 'id' ? 'selected' : ''}>LeetCode # (Ascending)</option>
                <option value="difficulty" ${activeSort === 'difficulty' ? 'selected' : ''}>Difficulty (Hard → Easy)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Results Counter & Status -->
        <div class="hub-results-meta">
          <span>Showing <strong>${totalCount}</strong> problems for <strong>${profile.name}</strong></span>
          ${searchQuery ? `<span>Filtered by: "<em>${escapeHtml(searchQuery)}</em>"</span>` : ''}
        </div>

        <!-- Problems Grid -->
        <div class="hub-problems-grid" id="hubProblemsGrid">
          ${totalCount === 0 ? `
            <div class="hub-empty-state">
              <div class="empty-icon">📂</div>
              <h3>No matching interview problems found</h3>
              <p>Try resetting the search keywords or selecting "All Difficulties".</p>
              <button class="empty-reset-btn" onclick="window.CompanyMasteryEngine.resetFilters()">Reset All Filters</button>
            </div>
          ` : filteredProblems.map(p => renderProblemCard(p)).join('')}
        </div>
      </div>

      <!-- Detail Modal Mount Point -->
      <div id="companyProblemModal" class="company-modal-overlay" style="display: none;" onclick="window.CompanyMasteryEngine.handleModalOverlayClick(event)">
        <div class="company-modal-dialog">
          <div id="companyModalContent"></div>
        </div>
      </div>
    `;
  }

  function renderAllProblemsTable() {
    const filtered = getFilteredProblems();
    return `
      <!-- Filter & Search Controls -->
      <div class="hub-controls-row">
        <div class="hub-search-box">
          <span class="search-icon">🔍</span>
          <input type="text" 
                 id="hubProblemSearch" 
                 class="hub-search-input" 
                 placeholder="Search all 323 problems by #, title, company, or keyword..." 
                 value="${escapeHtml(searchQuery)}" 
                 oninput="window.CompanyMasteryEngine.onSearchChange(this.value)" />
          ${searchQuery ? `<button class="search-clear-btn" onclick="window.CompanyMasteryEngine.clearSearch()">✕</button>` : ''}
        </div>

        <div class="hub-filter-group">
          <div class="diff-filter-btns">
            <button class="diff-btn ${activeDifficulty === 'all' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDifficulty('all')">All</button>
            <button class="diff-btn easy ${activeDifficulty === 'easy' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDifficulty('easy')">Easy</button>
            <button class="diff-btn medium ${activeDifficulty === 'medium' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDifficulty('medium')">Medium</button>
            <button class="diff-btn hard ${activeDifficulty === 'hard' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDifficulty('hard')">Hard</button>
          </div>

          <div class="sort-selector">
            <label for="hubSortSelect">Sort by:</label>
            <select id="hubSortSelect" class="hub-select" onchange="window.CompanyMasteryEngine.setSort(this.value)">
              <option value="probability" ${activeSort === 'probability' ? 'selected' : ''}>Interview Frequency</option>
              <option value="id" ${activeSort === 'id' ? 'selected' : ''}>LeetCode #</option>
              <option value="difficulty" ${activeSort === 'difficulty' ? 'selected' : ''}>Difficulty</option>
            </select>
          </div>
        </div>
      </div>

      <div class="hub-problems-grid" id="hubProblemsGrid">
        ${filtered.length === 0 ? `
          <div class="hub-empty-state">
            <div class="empty-icon">📂</div>
            <h3>No matching interview problems found</h3>
            <button class="empty-reset-btn" onclick="window.CompanyMasteryEngine.resetFilters()">Reset All Filters</button>
          </div>
        ` : filtered.map(p => renderProblemCard(p)).join('')}
      </div>
    `;
  }

  function renderProblemCard(p) {
    const diffClass = (p.difficulty || 'Medium').toLowerCase();
    const companies = p.companies || [];
    const freq = p.interviewFreq || '85%';
    const round = p.interviewRound || 'Technical Screen';

    return `
      <div class="hub-prob-card">
        <div class="prob-card-top">
          <div class="prob-id-badge">LC #${p.id}</div>
          <span class="prob-diff-pill ${diffClass}">${p.difficulty}</span>
          <span class="prob-freq-badge">🔥 ${freq}</span>
        </div>

        <h3 class="prob-card-title">${escapeHtml(p.title)}</h3>
        <div class="prob-card-category"><span class="cat-dot"></span>${escapeHtml(p.category || 'Relational Core')}</div>

        <div class="prob-card-companies">
          ${companies.slice(0, 4).map(c => `<span class="company-tag" onclick="event.stopPropagation(); window.CompanyMasteryEngine.openCompanyTrack('${c}')">${c}</span>`).join('')}
          ${companies.length > 4 ? `<span class="company-tag more">+ ${companies.length - 4}</span>` : ''}
        </div>

        <div class="prob-card-round">
          <span class="round-icon">🎯</span>
          <span>${escapeHtml(round)}</span>
        </div>

        <div class="prob-card-actions">
          <button class="prob-action-btn inspect" onclick="window.CompanyMasteryEngine.openProblemModal(${p.id})">
            <span>Blueprint</span>
          </button>
          <button class="prob-action-btn arena" onclick="window.CompanyMasteryEngine.openInArena(${p.id})" title="Solve in LeetCode 323 Arena">
            <span>⚡ Solve in WASM</span>
          </button>
        </div>
      </div>
    `;
  }

  function openProblemModal(problemId) {
    const vault = getVaultProblems();
    const problem = vault.find(p => p.id === problemId);
    if (!problem) return;

    activeModalProblem = problem;
    const modal = document.getElementById('companyProblemModal');
    const content = document.getElementById('companyModalContent');
    if (!modal || !content) return;

    const diffClass = (problem.difficulty || 'Medium').toLowerCase();
    const companies = problem.companies || [];

    content.innerHTML = `
      <div class="modal-header">
        <div class="modal-title-left">
          <div class="modal-badge-row">
            <span class="modal-prob-id">LeetCode #${problem.id}</span>
            <span class="prob-diff-pill ${diffClass}">${problem.difficulty}</span>
            <span class="prob-freq-badge">🔥 Frequency: ${problem.interviewFreq || '90%'}</span>
            <span class="modal-category-tag">${problem.category}</span>
          </div>
          <h2 class="modal-problem-title">${escapeHtml(problem.title)}</h2>
        </div>
        <button class="modal-close-btn" onclick="window.CompanyMasteryEngine.closeModal()">✕</button>
      </div>

      <div class="modal-body">
        <div class="modal-meta-strip">
          <div class="meta-item">
            <span class="meta-lbl">Target Employers</span>
            <div class="meta-companies">
              ${companies.map(c => `<span class="company-tag">${c}</span>`).join('')}
            </div>
          </div>
          <div class="meta-item">
            <span class="meta-lbl">Interview Stage</span>
            <span class="meta-val">${escapeHtml(problem.interviewRound || 'Technical Screen')}</span>
          </div>
        </div>

        <div class="modal-tabs-bar">
          <button class="modal-tab-btn active" data-tab="spec" onclick="window.CompanyMasteryEngine.switchModalTab('spec')">Problem Spec &amp; Schema</button>
          <button class="modal-tab-btn" data-tab="solution" onclick="window.CompanyMasteryEngine.switchModalTab('solution')">Canonical Solution</button>
          <button class="modal-tab-btn" data-tab="logic" onclick="window.CompanyMasteryEngine.switchModalTab('logic')">Relational Logic</button>
          <button class="modal-tab-btn" data-tab="traps" onclick="window.CompanyMasteryEngine.switchModalTab('traps')">Interview Traps</button>
        </div>

        <div class="modal-tab-pane" id="modalTabContent">
          ${renderModalTabSpec(problem)}
        </div>
      </div>

      <div class="modal-footer">
        <button class="modal-action-btn secondary" onclick="window.CompanyMasteryEngine.copyCurrentSQL()">
          <span>📋 Copy SQL</span>
        </button>
        <button class="modal-action-btn primary" onclick="window.CompanyMasteryEngine.openInArena(${problem.id})">
          <span>⚡ Launch in LeetCode 323 Studio</span>
        </button>
      </div>
    `;

    modal.style.display = 'flex';
  }

  function renderModalTabSpec(problem) {
    const input = problem.sampleInput || {};
    const expected = problem.expectedOutput || {};

    return `
      <div class="tab-pane-spec">
        <div class="spec-section">
          <h4 class="spec-heading">Problem Description</h4>
          <p class="spec-prompt">${escapeHtml(problem.prompt || problem.description || 'No description available.')}</p>
        </div>

        ${input.table ? `
          <div class="spec-section">
            <h4 class="spec-heading">Input Table: <code>${input.table}</code></h4>
            <div class="spec-table-scroll">
              <table class="spec-data-table">
                <thead>
                  <tr>${(input.columns || []).map(col => `<th>${col}</th>`).join('')}</tr>
                </thead>
                <tbody>
                  ${(input.rows || []).map(row => `
                    <tr>${row.map(val => `<td>${val === null ? '<span class="null-val">NULL</span>' : escapeHtml(val)}</td>`).join('')}</tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  function renderModalTabSolution(problem) {
    return `
      <div class="tab-pane-solution">
        <div class="solution-header-bar">
          <span class="sql-badge">ANSI SQL / MySQL 8.0</span>
          <span class="verified-badge">✓ WASM Verified</span>
        </div>
        <pre class="solution-sql-block"><code>${escapeHtml(problem.solutionSQL || '-- No solution provided.')}</code></pre>
      </div>
    `;
  }

  function renderModalTabLogic(problem) {
    return `
      <div class="tab-pane-logic">
        <h4 class="logic-heading">Execution Mechanics</h4>
        <p class="logic-text">${escapeHtml(problem.explanation || problem.strategy || 'Solve using standard relational grouping, window rankings, or anti-joins.')}</p>
      </div>
    `;
  }

  function renderModalTabTraps(problem) {
    const traps = problem.trapsAndEdgeCases || problem.traps || [];
    return `
      <div class="tab-pane-traps">
        <h4 class="traps-heading">Edge Cases &amp; Candidate Traps</h4>
        <ul class="traps-list">
          ${traps.length > 0 
            ? traps.map(t => `<li>${escapeHtml(t)}</li>`).join('')
            : '<li>Three-Valued Logic NULL handling in WHERE clause predicates.</li><li>Duplicate keys or ties in ranking functions (RANK vs DENSE_RANK).</li>'}
        </ul>
      </div>
    `;
  }

  function switchModalTab(tabKey) {
    if (!activeModalProblem) return;
    document.querySelectorAll('.modal-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tabKey);
    });

    const content = document.getElementById('modalTabContent');
    if (!content) return;

    if (tabKey === 'spec') content.innerHTML = renderModalTabSpec(activeModalProblem);
    else if (tabKey === 'solution') content.innerHTML = renderModalTabSolution(activeModalProblem);
    else if (tabKey === 'logic') content.innerHTML = renderModalTabLogic(activeModalProblem);
    else if (tabKey === 'traps') content.innerHTML = renderModalTabTraps(activeModalProblem);
  }

  function closeModal() {
    activeModalProblem = null;
    const modal = document.getElementById('companyProblemModal');
    if (modal) modal.style.display = 'none';
  }

  function handleModalOverlayClick(e) {
    if (e.target.id === 'companyProblemModal') {
      closeModal();
    }
  }

  function copyCurrentSQL() {
    if (!activeModalProblem || !activeModalProblem.solutionSQL) return;
    navigator.clipboard.writeText(activeModalProblem.solutionSQL).then(() => {
      if (window.SQL_BUDDY && typeof window.SQL_BUDDY.say === 'function') {
        window.SQL_BUDDY.say("📋 Copied canonical SQL solution to clipboard!", 2500, 'celebrate');
      }
    });
  }

  function openInArena(problemId) {
    closeModal();
    if (typeof window.selectNavView === 'function') {
      window.selectNavView('viewLeetCode50', 'LeetCode 323', null);
    }
    setTimeout(() => {
      if (window.LEETCODE_ARENA && typeof window.LEETCODE_ARENA.selectProblem === 'function') {
        window.LEETCODE_ARENA.selectProblem(problemId);
      }
    }, 150);
  }

  function launchMockTrack(trackId) {
    if (typeof window.selectNavView === 'function') {
      window.selectNavView('viewMockInterview', 'Interview 🎯', null);
    }
    setTimeout(() => {
      if (window.MockInterviewEngine && typeof window.MockInterviewEngine.startScreen === 'function') {
        window.MockInterviewEngine.startScreen(trackId);
      }
    }, 150);
  }

  function jumpToArena() {
    if (typeof window.selectNavView === 'function') {
      window.selectNavView('viewLeetCode50', 'LeetCode 323', null);
    }
  }

  function openDomainERD(erdKey) {
    if (window.DOMAIN_ERD_ENGINE && typeof window.DOMAIN_ERD_ENGINE.openDomainERD === 'function') {
      window.DOMAIN_ERD_ENGINE.openDomainERD(erdKey);
    } else if (typeof window.selectNavView === 'function') {
      window.selectNavView('viewDomainERD', 'Domain ERD', null);
    }
  }

  function openCompanyTrack(companyKey) {
    activeCompany = companyKey;
    activeDomain = 'all';
    viewMode = 'company';
    searchQuery = '';
    activeDifficulty = 'all';
    render();
    const cont = document.getElementById('viewCompanyHub');
    if (cont) cont.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openDomainTrack(domainKey) {
    activeDomain = domainKey;
    activeCompany = 'all';
    viewMode = 'domain';
    searchQuery = '';
    activeDifficulty = 'all';
    render();
    const cont = document.getElementById('viewCompanyHub');
    if (cont) cont.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function backToDirectory() {
    viewMode = 'directory';
    activeCompany = 'all';
    activeDomain = 'all';
    searchQuery = '';
    render();
    const cont = document.getElementById('viewCompanyHub');
    if (cont) cont.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function setDirectoryTab(tab) {
    directoryTab = tab;
    render();
  }

  function setDirectoryDomainFilter(dKey) {
    directoryDomainFilter = dKey;
    render();
  }

  function onDirectorySearch(val) {
    directorySearch = val;
    render();
  }

  function clearDirectorySearch() {
    directorySearch = '';
    render();
  }

  function setDomain(domainKey) {
    openDomainTrack(domainKey);
  }

  function setCompany(companyKey) {
    openCompanyTrack(companyKey);
  }

  function setDifficulty(diff) {
    activeDifficulty = diff;
    render();
  }

  function setSort(sortKey) {
    activeSort = sortKey;
    render();
  }

  function onSearchChange(val) {
    searchQuery = val;
    render();
  }

  function clearSearch() {
    searchQuery = '';
    render();
  }

  function resetFilters() {
    activeDifficulty = 'all';
    searchQuery = '';
    activeSort = 'probability';
    render();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  return {
    init,
    setDomain,
    setCompany,
    setDifficulty,
    setSort,
    onSearchChange,
    clearSearch,
    resetFilters,
    openProblemModal,
    closeModal,
    switchModalTab,
    handleModalOverlayClick,
    copyCurrentSQL,
    openInArena,
    launchMockTrack,
    jumpToArena,
    openDomainERD,
    openCompanyTrack,
    openDomainTrack,
    backToDirectory,
    setDirectoryTab,
    setDirectoryDomainFilter,
    onDirectorySearch,
    clearDirectorySearch,
    DOMAIN_CATALOG,
    COMPANY_PROFILES,
    FEATURED_EMPLOYERS
  };

})();

// Alias for seamless backward/forward compatibility
window.DomainMasteryEngine = window.CompanyMasteryEngine;
