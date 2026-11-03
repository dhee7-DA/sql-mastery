// =============================================================================
// NETFLIX STREAMING ANALYTICS ENGINEER 30-DAY ONBOARDING STORY DATA
// Role: Analytics Engineer (L4 -> L6) on the Netflix Core Playback & Content Platform
// 30 Days Across 4 Progressive Weeks with Authentic Streaming Telemetry
// =============================================================================

window.NETFLIX_STORY_DATA = [
  {
    "day": 1,
    "week": 1,
    "phase": "Week 1: Playback Telemetry & Heartbeat Logs",
    "title": "Day 01: Setup & First Stream Initialization Latency (TTFF P95)",
    "sender": "Elena Rostova",
    "senderRole": "L6 Staff Analytics Engineer",
    "senderAvatar": "👩‍💻",
    "priority": "P2 - Onboarding",
    "department": "Core Playback & Streaming Data Platform",
    "slackMessage": "Welcome to Netflix Data Platform! 🍿 Your laptop is provisioned and your Trino/Iceberg warehouse access is live. For your first production ticket, the Player Infrastructure team needs to monitor Time-To-First-Frame (TTFF) across smart TV devices. If initialization takes over 2,500ms, members press Back. Pull the device type, count of sessions, and average initialization latency in milliseconds for Smart TVs from yesterday's playback telemetry.",
    "contextReport": {
      "businessWhy": "Time-To-First-Frame (TTFF) is Netflix's North Star latency metric for streaming quality of experience (QoE). A 500ms regression in TTFF directly correlates with a 1.2% drop in 30-day retention across living room TV devices.",
      "learningFocus": [
        "Column projection: selecting exact dimensional metrics (`device_type`, `COUNT(session_id)`, `ROUND(AVG(init_latency_ms), 2)`)",
        "Filtering on specific device categories using string equality (`WHERE device_type = 'Smart TV'`)",
        "Deterministic grouping on low-cardinality device dimensions"
      ],
      "sampleSchema": "playback_init_logs (\n  session_id VARCHAR(36) PRIMARY KEY,\n  user_id VARCHAR(20),\n  device_type VARCHAR(50),\n  init_latency_ms INT,\n  country_code VARCHAR(3),\n  event_timestamp TIMESTAMP\n)",
      "realWorldTrap": "Never run unbounded aggregation on raw playback telemetry without device or time-slice pruning. Netflix ingests over 2 billion telemetry heartbeats daily. Unbounded table scans trigger multi-terabyte shuffle spills on Iceberg clusters.",
      "interviewRelevance": "Netflix, YouTube, and Twitch interviewers frequently probe your understanding of QoE latency distributions and how to write aggregations that isolate client-side startup bottlenecks."
    },
    "schema": "playback_init_logs",
    "challenge": {
      "instruction": "Write a query to retrieve the device_type, total session count as total_streams, and average init_latency_ms (rounded to 1 decimal place) as avg_latency_ms for 'Smart TV' devices.",
      "template": "SELECT device_type, COUNT(session_id) AS total_streams, ROUND(AVG(init_latency_ms), 1) AS avg_latency_ms\nFROM playback_init_logs\nWHERE device_type = ___1___\nGROUP BY ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Device Filter",
          "answer": "'Smart TV'",
          "options": [
            "'Smart TV'",
            "'Mobile'",
            "'Web'",
            "NULL"
          ]
        },
        {
          "id": 2,
          "label": "Grouping Column",
          "answer": "device_type",
          "options": [
            "device_type",
            "session_id",
            "country_code",
            "init_latency_ms"
          ]
        }
      ],
      "expectedSql": "SELECT device_type, COUNT(session_id) AS total_streams, ROUND(AVG(init_latency_ms), 1) AS avg_latency_ms FROM playback_init_logs WHERE device_type = 'Smart TV' GROUP BY device_type;",
      "managerReview": "Spot on! Smart TV initialization latency averaged 1,842.4ms across 480,000 sessions. The Player Infra team confirmed this falls safely within our 2,000ms SLA."
    }
  },
  {
    "day": 2,
    "week": 1,
    "phase": "Week 1: Playback Telemetry & Heartbeat Logs",
    "title": "Day 02: Playback Rebuffering Ratio & Audio/Video Bitrate Drops",
    "sender": "Marcus Vance",
    "senderRole": "L7 Director of Video Encoding & CDN",
    "senderAvatar": "👨‍💼",
    "priority": "P1 - High Urgency",
    "department": "Video Encoding & QoE Infrastructure",
    "slackMessage": "Morning! We're observing spikes in user complaints from Brazil (country_code = 'BR'). The adaptive bitrate (ABR) algorithm might be failing to step down video chunks smoothly, causing playback freezes. Can you compute the rebuffering percentage: total rebuffer duration divided by total watch time, grouped by ISP provider, filtered to Brazil?",
    "contextReport": {
      "businessWhy": "Rebuffering is the single most toxic playback defect: members who experience more than 1 rebuffer event per 10 minutes are 3.8x more likely to cancel their membership within 14 days. Measuring rebuffer ratio by ISP isolates peering congestion.",
      "learningFocus": [
        "Aggregate arithmetic: calculating ratios between two aggregates `(SUM(rebuffer_sec) * 100.0) / SUM(watch_sec)`",
        "Guarding against division-by-zero using `NULLIF(SUM(watch_sec), 0)`",
        "Multi-column ordering with `ORDER BY rebuffer_ratio_pct DESC`"
      ],
      "sampleSchema": "playback_heartbeats (\n  heartbeat_id VARCHAR(36) PRIMARY KEY,\n  country_code VARCHAR(3),\n  isp_name VARCHAR(100),\n  watch_sec INT,\n  rebuffer_sec INT,\n  bitrate_kbps INT\n)",
      "realWorldTrap": "In integer division engines like Postgres, `rebuffer_sec / watch_sec` evaluates to 0 because integer truncates. Always multiply by 100.0 or cast to numeric float before dividing.",
      "interviewRelevance": "Interviewers test whether you proactively guard against divide-by-zero errors when computing ratios and rates."
    },
    "schema": "playback_heartbeats",
    "challenge": {
      "instruction": "Calculate the rebuffer ratio percentage as `rebuffer_ratio_pct` (rounded to 2 decimal places) for each `isp_name` in Brazil ('BR'), sorted by worst rebuffer ratio descending.",
      "template": "SELECT isp_name,\n  ROUND((SUM(rebuffer_sec) * 100.0) / NULLIF(SUM(watch_sec), 0), 2) AS rebuffer_ratio_pct\nFROM playback_heartbeats\nWHERE country_code = ___1___\nGROUP BY ___2___\nORDER BY ___3___ ___4___;",
      "blanks": [
        {
          "id": 1,
          "label": "Country Filter",
          "answer": "'BR'",
          "options": [
            "'BR'",
            "'US'",
            "'MX'",
            "'ALL'"
          ]
        },
        {
          "id": 2,
          "label": "Grouping Column",
          "answer": "isp_name",
          "options": [
            "isp_name",
            "country_code",
            "rebuffer_sec",
            "bitrate_kbps"
          ]
        },
        {
          "id": 3,
          "label": "Sort Field",
          "answer": "rebuffer_ratio_pct",
          "options": [
            "rebuffer_ratio_pct",
            "isp_name",
            "country_code",
            "watch_sec"
          ]
        },
        {
          "id": 4,
          "label": "Sort Direction",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "LIMIT",
            "OVER"
          ]
        }
      ],
      "expectedSql": "SELECT isp_name, ROUND((SUM(rebuffer_sec) * 100.0) / NULLIF(SUM(watch_sec), 0), 2) AS rebuffer_ratio_pct FROM playback_heartbeats WHERE country_code = 'BR' GROUP BY isp_name ORDER BY rebuffer_ratio_pct DESC;",
      "managerReview": "Critical finding! ISP 'Claro Telecom' had a rebuffer ratio of 4.82% compared to the 0.35% baseline. Our Open Connect CDN team escalated an urgent peering route re-route."
    }
  },
  {
    "day": 3,
    "week": 1,
    "phase": "Week 1: Playback Telemetry & Heartbeat Logs",
    "title": "Day 03: Playback Completion Rate & Title Abandonment Thresholds",
    "sender": "Chloe Lin",
    "senderRole": "L5 Product Data Scientist",
    "senderAvatar": "👩‍🔬",
    "priority": "P2 - Sprint",
    "department": "Content Engineering & Engagement",
    "slackMessage": "Hey! Content Strategy is reviewing how viewers drop off on pilot episodes of new series. A play is classified as a 'Bounce' if watch_time < 180 seconds, 'Engaged' if watch_time is between 180s and 70% of duration, and 'Completed' if >= 70% of duration. Write a query to categorize viewing sessions and count totals for title_id = 'T_STRANGER_S04E01'.",
    "contextReport": {
      "businessWhy": "Pilot episode bounce rate indicates whether opening hooks and title thumbnails match viewer expectations. If 40% of viewers bounce within 3 minutes, recommendation algorithms downgrade the title on homepage billboard rows.",
      "learningFocus": [
        "Conditional classification with `CASE WHEN ... THEN ... ELSE ... END`",
        "Dynamic percentage comparison against total duration (`watch_seconds >= 0.70 * duration_seconds`)",
        "Aggregating grouped categorical outcomes with `GROUP BY` and `COUNT(*)`"
      ],
      "sampleSchema": "viewing_sessions (\n  session_id VARCHAR(36) PRIMARY KEY,\n  title_id VARCHAR(30),\n  watch_seconds INT,\n  duration_seconds INT,\n  user_id VARCHAR(20)\n)",
      "realWorldTrap": "Order of `WHEN` clauses matters! If you test `watch_seconds >= 0.70 * duration_seconds` after a looser condition, sessions will be swallowed prematurely. Always test most specific conditions first.",
      "interviewRelevance": "FAANG SQL interviews test CASE WHEN constructs extensively for behavioral tiering and funnel drop-off classification."
    },
    "schema": "viewing_sessions",
    "challenge": {
      "instruction": "Classify viewing sessions for title_id = 'T_STRANGER_S04E01' into 'Bounce', 'Completed', or 'Engaged' as `engagement_tier` and return the total count as `session_count`.",
      "template": "SELECT\n  CASE\n    WHEN watch_seconds < 180 THEN 'Bounce'\n    WHEN watch_seconds >= 0.70 * duration_seconds THEN 'Completed'\n    ELSE 'Engaged'\n  END AS engagement_tier,\n  COUNT(*) AS session_count\nFROM viewing_sessions\nWHERE title_id = ___1___\nGROUP BY ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Title Filter",
          "answer": "'T_STRANGER_S04E01'",
          "options": [
            "'T_STRANGER_S04E01'",
            "'STRANGER_THINGS'",
            "NULL",
            "'ALL'"
          ]
        },
        {
          "id": 2,
          "label": "Grouping Expression",
          "answer": "engagement_tier",
          "options": [
            "engagement_tier",
            "watch_seconds",
            "session_id",
            "title_id"
          ]
        }
      ],
      "expectedSql": "SELECT CASE WHEN watch_seconds < 180 THEN 'Bounce' WHEN watch_seconds >= 0.70 * duration_seconds THEN 'Completed' ELSE 'Engaged' END AS engagement_tier, COUNT(*) AS session_count FROM viewing_sessions WHERE title_id = 'T_STRANGER_S04E01' GROUP BY engagement_tier;",
      "managerReview": "Impressive! Stranger Things S4E1 has a phenomenal 84.1% Completion rate and only a 4.2% bounce rate. These metrics validate massive upfront production investment."
    }
  },
  {
    "day": 4,
    "week": 1,
    "phase": "Week 1: Playback Telemetry & Heartbeat Logs",
    "title": "Day 04: Multi-Profile Household Concurrency Audits",
    "sender": "Devin Patel",
    "senderRole": "L5 Growth & Retention Lead",
    "senderAvatar": "👨‍💼",
    "priority": "P1 - Security & Revenue",
    "department": "Identity, Household & Access Systems",
    "slackMessage": "We need an audit on concurrent streaming violations. Standard accounts allow up to 2 simultaneous streams; Premium allows 4. Query yesterday's active sessions to find accounts with `simultaneous_streams` exceeding their `allowed_streams` limit, and calculate the maximum simultaneous streams observed.",
    "contextReport": {
      "businessWhy": "Account credential sharing represents billions in unmonetized viewership. Identifying accounts that regularly violate stream concurrency limits informs targeted 'Add an Extra Member for $7.99/mo' conversion prompts.",
      "learningFocus": [
        "`HAVING` clause filtering: filtering aggregated group results after `GROUP BY account_id, allowed_streams`",
        "Aggregate functions `COUNT(DISTINCT session_id)` vs `COUNT(*)`",
        "Comparing calculated aggregate against static plan column"
      ],
      "sampleSchema": "account_active_streams (\n  session_id VARCHAR(36) PRIMARY KEY,\n  account_id VARCHAR(20),\n  profile_id VARCHAR(20),\n  allowed_streams INT,\n  stream_start_time TIMESTAMP,\n  stream_end_time TIMESTAMP\n)",
      "realWorldTrap": "Don't confuse `WHERE` with `HAVING`. You cannot use `WHERE COUNT(...) > allowed_streams` because `WHERE` filters rows before group aggregation happens.",
      "interviewRelevance": "The distinction between `WHERE` (pre-aggregation) and `HAVING` (post-aggregation) is evaluated in almost every data engineering phone screen."
    },
    "schema": "account_active_streams",
    "challenge": {
      "instruction": "Find account_ids where the count of active streams exceeds allowed_streams. Return account_id, allowed_streams, and current_active_streams.",
      "template": "SELECT account_id, allowed_streams, COUNT(session_id) AS current_active_streams\nFROM account_active_streams\nGROUP BY account_id, allowed_streams\nHAVING COUNT(session_id) ___1___ ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Comparison Operator",
          "answer": ">",
          "options": [
            ">",
            "=",
            "<",
            "!="
          ]
        },
        {
          "id": 2,
          "label": "Threshold Column",
          "answer": "allowed_streams",
          "options": [
            "allowed_streams",
            "2",
            "4",
            "current_active_streams"
          ]
        }
      ],
      "expectedSql": "SELECT account_id, allowed_streams, COUNT(session_id) AS current_active_streams FROM account_active_streams GROUP BY account_id, allowed_streams HAVING COUNT(session_id) > allowed_streams;",
      "managerReview": "Found 1,420 accounts running up to 7 concurrent streams simultaneously! These IDs will be routed to the Paid-Sharing conversion flow."
    }
  },
  {
    "day": 5,
    "week": 1,
    "phase": "Week 1: Playback Telemetry & Heartbeat Logs",
    "title": "Day 05: Video Encoding Profiles & Device Form Factor Breakdown",
    "sender": "Elena Rostova",
    "senderRole": "L6 Staff Analytics Engineer",
    "senderAvatar": "👩‍💻",
    "priority": "P2 - Sprint",
    "department": "Core Playback & Streaming Data Platform",
    "slackMessage": "Video Encoding released our new AV1 codec pipeline. We need to measure adoption: for each device form factor ('Living Room', 'Mobile', 'Desktop'), calculate the total streams and the percentage of streams that used the 'AV1' encoding profile versus legacy 'H.264' and 'HEVC'.",
    "contextReport": {
      "businessWhy": "The AV1 codec delivers 20% higher visual quality at 30% lower bitrates compared to H.264. Expanding AV1 coverage saves Netflix petabytes of daily CDN egress costs while improving mobile streaming on throttled cellular networks.",
      "learningFocus": [
        "Conditional aggregation: `ROUND(100.0 * COUNT(CASE WHEN encoding_profile = 'AV1' THEN 1 END) / COUNT(*), 2)`",
        "Categorical dimension grouping across multiple devices",
        "Alias preservation in reporting dashboards"
      ],
      "sampleSchema": "stream_encodings (\n  stream_id VARCHAR(36) PRIMARY KEY,\n  device_form_factor VARCHAR(30),\n  encoding_profile VARCHAR(20),\n  avg_bitrate_kbps INT\n)",
      "realWorldTrap": "Using `COUNT(*)` inside `CASE WHEN` without `END` will fail syntax. Prefer `COUNT(CASE WHEN ... THEN 1 END)` because `COUNT()` ignores `NULL`s produced when the condition is false.",
      "interviewRelevance": "Conditional aggregation using `SUM(CASE ...)` or `COUNT(CASE ...)` is one of the top 3 most requested patterns in tech company interviews."
    },
    "schema": "stream_encodings",
    "challenge": {
      "instruction": "Compute the total stream count and the percentage of streams using 'AV1' as `av1_stream_pct` for each device_form_factor.",
      "template": "SELECT device_form_factor,\n  COUNT(*) AS total_streams,\n  ROUND(100.0 * COUNT(CASE WHEN encoding_profile = ___1___ THEN 1 END) / COUNT(*), 2) AS av1_stream_pct\nFROM stream_encodings\nGROUP BY ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Profile Match",
          "answer": "'AV1'",
          "options": [
            "'AV1'",
            "'H.264'",
            "'HEVC'",
            "NULL"
          ]
        },
        {
          "id": 2,
          "label": "Group Dimension",
          "answer": "device_form_factor",
          "options": [
            "device_form_factor",
            "encoding_profile",
            "stream_id",
            "total_streams"
          ]
        }
      ],
      "expectedSql": "SELECT device_form_factor, COUNT(*) AS total_streams, ROUND(100.0 * COUNT(CASE WHEN encoding_profile = 'AV1' THEN 1 END) / COUNT(*), 2) AS av1_stream_pct FROM stream_encodings GROUP BY device_form_factor;",
      "managerReview": "Superb analysis! Living Room TVs are at 62% AV1 adoption, while older Smart TVs still require fallback to H.264. Great operational visibility."
    }
  },
  {
    "day": 6,
    "week": 1,
    "phase": "Week 1: Playback Telemetry & Heartbeat Logs",
    "title": "Day 06: Open Connect CDN Edge Cache Hit Invariant & Fallback Latency",
    "sender": "Marcus Vance",
    "senderRole": "L7 Director of Video Encoding & CDN",
    "senderAvatar": "👨‍💼",
    "priority": "P1 - Critical Invariant",
    "department": "Open Connect CDN Systems",
    "slackMessage": "Netflix Open Connect deploys OCA appliances directly inside telecom ISP networks. When a title is cached on an OCA appliance, cache_status = 'HIT' and latency is <10ms. When it's a 'MISS', we fall back to AWS origin servers costing 10x more. Query our edge metrics table to find edge regions with a cache hit rate below 95%.",
    "contextReport": {
      "businessWhy": "Open Connect serves over 95% of Netflix's global video traffic. A 1% dip in cache hit rate forces petabytes of video traffic onto commercial transit backbones, incurring substantial egress fees.",
      "learningFocus": [
        "Aggregate calculation in `HAVING` clause: `HAVING ROUND(100.0 * SUM(CASE WHEN cache_status = 'HIT' THEN 1 ELSE 0 END) / COUNT(*), 2) < 95.0`",
        "Edge appliance cluster monitoring",
        "Filtering outliers on high-volume traffic nodes"
      ],
      "sampleSchema": "cdn_edge_requests (\n  request_id VARCHAR(36) PRIMARY KEY,\n  edge_region VARCHAR(50),\n  cache_status VARCHAR(10),\n  egress_bytes BIGINT,\n  latency_ms INT\n)",
      "realWorldTrap": "Don't calculate hit rate by averaging pre-computed percentages! Always sum the raw hits and divide by sum of total requests. Averaging averages is a major mathematical blunder in distributed telemetry.",
      "interviewRelevance": "Evaluating ratios from raw counts rather than averaging percentages is a classic senior data engineer interview differentiator."
    },
    "schema": "cdn_edge_requests",
    "challenge": {
      "instruction": "Identify edge_regions where the cache hit rate is below 95%. Return edge_region, total_requests, and cache_hit_pct.",
      "template": "SELECT edge_region,\n  COUNT(*) AS total_requests,\n  ROUND(100.0 * SUM(CASE WHEN cache_status = 'HIT' THEN 1 ELSE 0 END) / COUNT(*), 2) AS cache_hit_pct\nFROM cdn_edge_requests\nGROUP BY edge_region\nHAVING cache_hit_pct ___1___ ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Comparison Operator",
          "answer": "<",
          "options": [
            "<",
            ">",
            "=",
            ">="
          ]
        },
        {
          "id": 2,
          "label": "Target SLA Threshold",
          "answer": "95.0",
          "options": [
            "95.0",
            "99.0",
            "90.0",
            "50.0"
          ]
        }
      ],
      "expectedSql": "SELECT edge_region, COUNT(*) AS total_requests, ROUND(100.0 * SUM(CASE WHEN cache_status = 'HIT' THEN 1 ELSE 0 END) / COUNT(*), 2) AS cache_hit_pct FROM cdn_edge_requests GROUP BY edge_region HAVING cache_hit_pct < 95.0;",
      "managerReview": "Identified edge clusters in Santiago and Mumbai dropping to 91.4% cache hit rates due to new Bollywood catalog additions that had not pre-seeded overnight."
    }
  },
  {
    "day": 7,
    "week": 1,
    "phase": "Week 1: Playback Telemetry & Heartbeat Logs",
    "title": "Day 07: Week 1 Executive Playback Health & QoE Scorecard",
    "sender": "Elena Rostova",
    "senderRole": "L6 Staff Analytics Engineer",
    "senderAvatar": "👩‍💻",
    "priority": "P2 - Executive Briefing",
    "department": "Core Playback & Streaming Data Platform",
    "slackMessage": "End of Week 1! We're briefing VP of Engineering on overall platform health. Compile a single summary row: total streaming sessions, total hours watched (`SUM(watch_seconds) / 3600.0`), overall average bitrate in Mbps (`AVG(bitrate_kbps) / 1000.0`), and distinct active accounts.",
    "contextReport": {
      "businessWhy": "Executive scorecards distill billions of raw telemetry heartbeats into board-level metrics. High fidelity in unit conversion (seconds to hours, kbps to Mbps) is required for shareholder and quarterly product reviews.",
      "learningFocus": [
        "Unit conversions in projection: `ROUND(SUM(watch_seconds) / 3600.0, 1) AS total_hours_streamed`",
        "Unique entity counting with `COUNT(DISTINCT account_id)`",
        "Single-row whole-table aggregation without `GROUP BY`"
      ],
      "sampleSchema": "playback_daily_summary (\n  session_id VARCHAR(36) PRIMARY KEY,\n  account_id VARCHAR(20),\n  watch_seconds INT,\n  bitrate_kbps INT\n)",
      "realWorldTrap": "Omitting `GROUP BY` when using aggregate functions will collapse the entire dataset into exactly 1 summary row. If you accidentally include an unaggregated column, SQL engines will throw an error.",
      "interviewRelevance": "Whole-table KPI aggregations demonstrate high-level business acumen and precision with unit conversions."
    },
    "schema": "playback_daily_summary",
    "challenge": {
      "instruction": "Generate the executive scorecard: total_sessions, distinct_accounts, total_hours_streamed (rounded to 1 decimal), and avg_bitrate_mbps (rounded to 2 decimals).",
      "template": "SELECT\n  COUNT(session_id) AS total_sessions,\n  COUNT(DISTINCT account_id) AS distinct_accounts,\n  ROUND(SUM(watch_seconds) / ___1___, 1) AS total_hours_streamed,\n  ROUND(AVG(bitrate_kbps) / ___2___, 2) AS avg_bitrate_mbps\nFROM playback_daily_summary;",
      "blanks": [
        {
          "id": 1,
          "label": "Seconds to Hours Divisor",
          "answer": "3600.0",
          "options": [
            "3600.0",
            "60.0",
            "1000.0",
            "86400.0"
          ]
        },
        {
          "id": 2,
          "label": "Kbps to Mbps Divisor",
          "answer": "1000.0",
          "options": [
            "1000.0",
            "1024.0",
            "100.0",
            "8.0"
          ]
        }
      ],
      "expectedSql": "SELECT COUNT(session_id) AS total_sessions, COUNT(DISTINCT account_id) AS distinct_accounts, ROUND(SUM(watch_seconds) / 3600.0, 1) AS total_hours_streamed, ROUND(AVG(bitrate_kbps) / 1000.0, 2) AS avg_bitrate_mbps FROM playback_daily_summary;",
      "managerReview": "Outstanding work! Week 1 cleared with distinction. 28.4 million streaming hours clocked at an average 5.82 Mbps bitrate. Promotion progress unlocked!"
    }
  },
  {
    "day": 8,
    "week": 2,
    "phase": "Week 2: Content Recommendation & Engagement",
    "title": "Day 08: Homepage Billboard Impression CTR & Row Position Decay",
    "sender": "Chloe Lin",
    "senderRole": "L5 Product Data Scientist",
    "senderAvatar": "👩‍🔬",
    "priority": "P2 - Sprint",
    "department": "Personalization & Recommendation Systems",
    "slackMessage": "Welcome to Week 2! We're analyzing the 'Billboard' hero unit on the home screen. When members scroll down, click-through rates plummet. Query our impressions table: for row ranks 1 through 5, calculate total impressions, total play clicks, and the conversion CTR percentage.",
    "contextReport": {
      "businessWhy": "80% of all content discovered on Netflix comes directly from algorithmic recommendations. Understanding row position decay tells machine learning engineers whether to feature new genres high up or stick to 'Continue Watching'.",
      "learningFocus": [
        "Computing Click-Through Rate: `ROUND(100.0 * SUM(clicks) / NULLIF(SUM(impressions), 0), 2) AS ctr_pct`",
        "Filtering numeric rank boundaries with `WHERE row_position BETWEEN 1 AND 5`",
        "Ranking decay observation with `ORDER BY row_position ASC`"
      ],
      "sampleSchema": "ui_row_impressions (\n  row_id VARCHAR(36) PRIMARY KEY,\n  row_position INT,\n  row_type VARCHAR(50),\n  impressions INT,\n  clicks INT\n)",
      "realWorldTrap": "Beware of CTRs above 100% caused by double-clicking! Always ensure clicks are deduped or capped at impressions before running aggregations.",
      "interviewRelevance": "Product analytics interviews always ask about conversion funnels and position bias adjustment in recommendation feeds."
    },
    "schema": "ui_row_impressions",
    "challenge": {
      "instruction": "Compute the total impressions, total clicks, and ctr_pct for row_position 1 to 5, ordered by row_position ascending.",
      "template": "SELECT row_position,\n  SUM(impressions) AS total_impressions,\n  SUM(clicks) AS total_clicks,\n  ROUND(100.0 * SUM(clicks) / NULLIF(SUM(impressions), 0), 2) AS ctr_pct\nFROM ui_row_impressions\nWHERE row_position ___1___ 1 AND 5\nGROUP BY row_position\nORDER BY row_position ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Range Operator",
          "answer": "BETWEEN",
          "options": [
            "BETWEEN",
            "IN",
            ">=",
            "LIKE"
          ]
        },
        {
          "id": 2,
          "label": "Order Direction",
          "answer": "ASC",
          "options": [
            "ASC",
            "DESC",
            "NULLS LAST",
            "LIMIT"
          ]
        }
      ],
      "expectedSql": "SELECT row_position, SUM(impressions) AS total_impressions, SUM(clicks) AS total_clicks, ROUND(100.0 * SUM(clicks) / NULLIF(SUM(impressions), 0), 2) AS ctr_pct FROM ui_row_impressions WHERE row_position BETWEEN 1 AND 5 GROUP BY row_position ORDER BY row_position ASC;",
      "managerReview": "Remarkable gradient: Row 1 (Top Billboard) has a 14.8% CTR, while Row 5 drops to 2.1%. Confirms why billboard asset optimization has such immense leverage."
    }
  },
  {
    "day": 9,
    "week": 2,
    "phase": "Week 2: Content Recommendation & Engagement",
    "title": "Day 09: Skip-Intro & Skip-Recap Telemetry Velocity",
    "sender": "Elena Rostova",
    "senderRole": "L6 Staff Analytics Engineer",
    "senderAvatar": "👩‍💻",
    "priority": "P2 - Feature Analytics",
    "department": "Player UX Engineering",
    "slackMessage": "Netflix invented the 'Skip Intro' button. Product wants to know: what percentage of viewers click 'Skip Intro' versus letting the title sequence play out, broken down by genre? Find the top 3 genres with the highest skip rates.",
    "contextReport": {
      "businessWhy": "Skip-Intro saves Netflix subscribers over 150 million hours of intro credits every year. High skip rates indicate strong desire for immediate story continuity, particularly in serial crime dramas and anime.",
      "learningFocus": [
        "`INNER JOIN` between telemetry sessions and content metadata catalog",
        "Ratio aggregation of binary event flags (`SUM(skipped_intro) * 100.0 / COUNT(*)`)",
        "Sorting and slicing with `ORDER BY skip_rate_pct DESC LIMIT 3`"
      ],
      "sampleSchema": "intro_events (\n  event_id VARCHAR(36) PRIMARY KEY,\n  title_id VARCHAR(30),\n  skipped_intro INT -- 1 if clicked, 0 if watched\n);\ntitles_catalog (\n  title_id VARCHAR(30) PRIMARY KEY,\n  title_name VARCHAR(100),\n  genre VARCHAR(50)\n)",
      "realWorldTrap": "Don't assume `skipped_intro` is always 0 or 1! If telemetry emits `NULL` when an intro does not exist (e.g. movies), your denominator must filter `WHERE has_intro = TRUE`.",
      "interviewRelevance": "Joins combined with event rate computations are standard medium-difficulty SQL interview questions."
    },
    "schema": "intro_events",
    "challenge": {
      "instruction": "Join intro_events with titles_catalog to calculate skip_rate_pct for each genre. Return genre, total_episodes_played, and skip_rate_pct, sorted by skip_rate_pct descending, top 3 genres.",
      "template": "SELECT t.genre,\n  COUNT(*) AS total_episodes_played,\n  ROUND(100.0 * SUM(e.skipped_intro) / COUNT(*), 2) AS skip_rate_pct\nFROM intro_events e\nJOIN titles_catalog t ON e.title_id = ___1___\nGROUP BY t.genre\nORDER BY skip_rate_pct DESC\nLIMIT ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Join Key",
          "answer": "t.title_id",
          "options": [
            "t.title_id",
            "t.genre",
            "e.event_id",
            "t.title_name"
          ]
        },
        {
          "id": 2,
          "label": "Top Rows",
          "answer": "3",
          "options": [
            "3",
            "5",
            "10",
            "1"
          ]
        }
      ],
      "expectedSql": "SELECT t.genre, COUNT(*) AS total_episodes_played, ROUND(100.0 * SUM(e.skipped_intro) / COUNT(*), 2) AS skip_rate_pct FROM intro_events e JOIN titles_catalog t ON e.title_id = t.title_id GROUP BY t.genre ORDER BY skip_rate_pct DESC LIMIT 3;",
      "managerReview": "Anime ranks #1 with an 89.2% skip rate, followed by True Crime at 81.5%! Shows members bingeing multiple episodes in a single sitting."
    }
  },
  {
    "day": 10,
    "week": 2,
    "phase": "Week 2: Content Recommendation & Engagement",
    "title": "Day 10: Binge-Watching Momentum & Episode Transition Gaps (Gaps & Islands)",
    "sender": "Chloe Lin",
    "senderRole": "L5 Product Data Scientist",
    "senderAvatar": "👩‍🔬",
    "priority": "P1 - Advanced SQL",
    "department": "Personalization & Recommendation Systems",
    "slackMessage": "We define a 'Binge Session' as watching 2 or more episodes of the same series where the time gap between episode N ending and episode N+1 starting is less than 15 minutes. Use `LAG()` over window partitioned by user_id and series_id to calculate the transition gap in minutes.",
    "contextReport": {
      "businessWhy": "Binge momentum is Netflix's primary defensive moat against churn. When users finish an episode and transition within seconds to the next, retention at 60 days increases by 2.4x.",
      "learningFocus": [
        "Window analytical functions: `LAG(end_time) OVER (PARTITION BY user_id, series_id ORDER BY start_time)`",
        "Epoch arithmetic: calculating elapsed minutes between consecutive events",
        "CTE structuring to separate window computation from final filtering"
      ],
      "sampleSchema": "episode_views (\n  view_id VARCHAR(36) PRIMARY KEY,\n  user_id VARCHAR(20),\n  series_id VARCHAR(30),\n  episode_num INT,\n  start_time TIMESTAMP,\n  end_time TIMESTAMP\n)",
      "realWorldTrap": "Forgetting `PARTITION BY series_id` will compare episode 1 of Stranger Things against episode 1 of Bridgerton if the user switched shows! Window boundaries must match the entity lifecycle.",
      "interviewRelevance": "Gaps & Islands problems with `LAG()` / `LEAD()` are considered the defining benchmark for Staff Analytics Engineers at FAANG."
    },
    "schema": "episode_views",
    "challenge": {
      "instruction": "Use LAG() to find the gap_minutes between consecutive episodes for each user and series. Return user_id, series_id, episode_num, and gap_minutes.",
      "template": "SELECT user_id, series_id, episode_num,\n  ROUND((JULIANDAY(start_time) - JULIANDAY(LAG(end_time) OVER (PARTITION BY ___1___ ORDER BY start_time))) * 1440, 1) AS gap_minutes\nFROM episode_views;",
      "blanks": [
        {
          "id": 1,
          "label": "Window Partition Keys",
          "answer": "user_id, series_id",
          "options": [
            "user_id, series_id",
            "user_id",
            "series_id",
            "episode_num"
          ]
        }
      ],
      "expectedSql": "SELECT user_id, series_id, episode_num, ROUND((JULIANDAY(start_time) - JULIANDAY(LAG(end_time) OVER (PARTITION BY user_id, series_id ORDER BY start_time))) * 1440, 1) AS gap_minutes FROM episode_views;",
      "managerReview": "Flawless window specification! 71% of viewers start the next episode within 45 seconds of the post-credits timer triggering."
    }
  },
  {
    "day": 11,
    "week": 2,
    "phase": "Week 2: Content Recommendation & Engagement",
    "title": "Day 11: Top 10 Global Content Affinity Cross-Joins (Co-Watching Matrix)",
    "sender": "Chloe Lin",
    "senderRole": "L5 Product Data Scientist",
    "senderAvatar": "👩‍🔬",
    "priority": "P2 - Sprint",
    "department": "Personalization & Recommendation Systems",
    "slackMessage": "Recommendation models use title-to-title affinity: how often users who watched Title A also watched Title B within 7 days. Perform a self-join on viewing records where title_a < title_b to avoid duplicate pairs, and count distinct co-viewing users.",
    "contextReport": {
      "businessWhy": "Item-item collaborative filtering powers the 'Because you watched X, you might like Y' carousel rows. Quantifying co-watching affinity drives automated cross-promotion and multi-title bundling.",
      "learningFocus": [
        "Self-joining tables on identical entity key (`v1.user_id = v2.user_id`)",
        "Preventing duplicate permutations and self-matches using strict inequality (`v1.title_id < v2.title_id`)",
        "Aggregating distinct co-viewers with `COUNT(DISTINCT v1.user_id)`"
      ],
      "sampleSchema": "user_title_views (\n  user_id VARCHAR(20),\n  title_id VARCHAR(30),\n  watch_date DATE\n)",
      "realWorldTrap": "If you join on `v1.title_id != v2.title_id`, you get both (Movie A, Movie B) and (Movie B, Movie A). Using `v1.title_id < v2.title_id` cuts the join explosion strictly in half.",
      "interviewRelevance": "Self-joins for graph relationships and recommendation affinity are classic FAANG interview questions."
    },
    "schema": "user_title_views",
    "challenge": {
      "instruction": "Self-join user_title_views to find pairs of titles watched by the same user. Return title_a, title_b, and co_viewers count, sorted by co_viewers DESC, limit 5.",
      "template": "SELECT v1.title_id AS title_a, v2.title_id AS title_b,\n  COUNT(DISTINCT v1.user_id) AS co_viewers\nFROM user_title_views v1\nJOIN user_title_views v2 ON v1.user_id = v2.user_id AND v1.title_id ___1___ v2.title_id\nGROUP BY v1.title_id, v2.title_id\nORDER BY co_viewers ___2___\nLIMIT 5;",
      "blanks": [
        {
          "id": 1,
          "label": "Inequality Condition",
          "answer": "<",
          "options": [
            "<",
            "!=",
            ">=",
            "="
          ]
        },
        {
          "id": 2,
          "label": "Sort Direction",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "ALL",
            "OVER"
          ]
        }
      ],
      "expectedSql": "SELECT v1.title_id AS title_a, v2.title_id AS title_b, COUNT(DISTINCT v1.user_id) AS co_viewers FROM user_title_views v1 JOIN user_title_views v2 ON v1.user_id = v2.user_id AND v1.title_id < v2.title_id GROUP BY v1.title_id, v2.title_id ORDER BY co_viewers DESC LIMIT 5;",
      "managerReview": "Wednesday & Stranger Things had 4.1 million co-viewers, forming our highest-affinity cross-genre co-watching pair globally!"
    }
  },
  {
    "day": 12,
    "week": 2,
    "phase": "Week 2: Content Recommendation & Engagement",
    "title": "Day 12: Search Fallback & Zero-Result Query Clustering",
    "sender": "Devin Patel",
    "senderRole": "L5 Growth & Retention Lead",
    "senderAvatar": "👨‍💼",
    "priority": "P2 - Sprint",
    "department": "Search & Discovery Engineering",
    "slackMessage": "When users search for titles Netflix doesn't own (e.g. 'Oppenheimer' or 'Succession'), our search engine provides fallback recommendations. Pull search queries that returned 0 exact matches (`results_count = 0`), and group them to find the top 5 most frequently demanded missing titles.",
    "contextReport": {
      "businessWhy": "Zero-result search telemetry is pure gold for Content Acquisition: it provides unbiased, direct intent data showing exactly what subscribers are looking for that we don't currently license.",
      "learningFocus": [
        "String normalization with `LOWER(TRIM(query_text))` to merge variations",
        "Filtering zero-result events with `WHERE results_count = 0`",
        "Frequency grouping with `COUNT(*) AS search_volume` and `LIMIT 5`"
      ],
      "sampleSchema": "search_logs (\n  search_id VARCHAR(36) PRIMARY KEY,\n  user_id VARCHAR(20),\n  query_text VARCHAR(255),\n  results_count INT,\n  searched_at TIMESTAMP\n)",
      "realWorldTrap": "Users type with varying capitalization and trailing spaces. Never group on raw `query_text` without `LOWER(TRIM(...))`, or 'Dune ', 'dune', and 'Dune' will split into separate buckets.",
      "interviewRelevance": "Data hygiene and string sanitization before aggregation is an essential interview checkpoint."
    },
    "schema": "search_logs",
    "challenge": {
      "instruction": "Group zero-result searches by normalized query_text, returning normalized_query and search_volume, sorted by search_volume descending, top 5.",
      "template": "SELECT LOWER(TRIM(query_text)) AS normalized_query,\n  COUNT(*) AS search_volume\nFROM search_logs\nWHERE results_count = ___1___\nGROUP BY ___2___\nORDER BY search_volume DESC\nLIMIT 5;",
      "blanks": [
        {
          "id": 1,
          "label": "Zero Matches Filter",
          "answer": "0",
          "options": [
            "0",
            "NULL",
            "1",
            "< 1"
          ]
        },
        {
          "id": 2,
          "label": "Grouping Expression",
          "answer": "normalized_query",
          "options": [
            "normalized_query",
            "query_text",
            "search_id",
            "results_count"
          ]
        }
      ],
      "expectedSql": "SELECT LOWER(TRIM(query_text)) AS normalized_query, COUNT(*) AS search_volume FROM search_logs WHERE results_count = 0 GROUP BY normalized_query ORDER BY search_volume DESC LIMIT 5;",
      "managerReview": "Top missing title was 'interstellar' with 380,000 monthly searches! Content Acquisition has flagged this for our next studio licensing cycle."
    }
  },
  {
    "day": 13,
    "week": 2,
    "phase": "Week 2: Content Recommendation & Engagement",
    "title": "Day 13: Watchlist ('My List') Conversion Funnel & Time-to-Play Velocity",
    "sender": "Chloe Lin",
    "senderRole": "L5 Product Data Scientist",
    "senderAvatar": "👩‍🔬",
    "priority": "P2 - Sprint",
    "department": "Personalization & Recommendation Systems",
    "slackMessage": "Users bookmark titles to 'My List', but many titles sit forgotten. Calculate the conversion rate: percentage of bookmarks that resulted in a play within 14 days, and the average days elapsed from bookmark to first play.",
    "contextReport": {
      "businessWhy": "If titles linger in 'My List' without being watched, viewer intent decays. Quantifying the time-to-play lag allows CRM teams to trigger personalized reminder push notifications at the optimal cadence.",
      "learningFocus": [
        "`LEFT JOIN` between bookmark events and subsequent play events",
        "Date difference calculations (`DATEDIFF` or `JULIANDAY` subtraction)",
        "Conditional aggregation of conversion rates"
      ],
      "sampleSchema": "my_list_bookmarks (\n  bookmark_id VARCHAR(36) PRIMARY KEY,\n  user_id VARCHAR(20),\n  title_id VARCHAR(30),\n  bookmarked_date DATE\n);\ntitle_plays (\n  play_id VARCHAR(36) PRIMARY KEY,\n  user_id VARCHAR(20),\n  title_id VARCHAR(30),\n  first_play_date DATE\n)",
      "realWorldTrap": "A member might play a title *before* bookmarking it (re-watching). You must ensure `p.first_play_date >= b.bookmarked_date` to measure forward conversion accurately.",
      "interviewRelevance": "Lagged conversion funnels with date boundaries are common in growth and product analytics interviews."
    },
    "schema": "my_list_bookmarks",
    "challenge": {
      "instruction": "Join bookmarks with plays. Calculate total bookmarks, total played within 14 days, and conversion_pct (rounded to 1 decimal).",
      "template": "SELECT\n  COUNT(b.bookmark_id) AS total_bookmarks,\n  COUNT(p.play_id) AS total_converted,\n  ROUND(100.0 * COUNT(p.play_id) / COUNT(b.bookmark_id), 1) AS conversion_pct\nFROM my_list_bookmarks b\nLEFT JOIN title_plays p ON b.user_id = p.user_id AND b.title_id = p.title_id\n  AND (JULIANDAY(p.first_play_date) - JULIANDAY(b.bookmarked_date)) ___1___ ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Comparison Operator",
          "answer": "<=",
          "options": [
            "<=",
            ">=",
            "=",
            "!="
          ]
        },
        {
          "id": 2,
          "label": "Conversion Window (Days)",
          "answer": "14",
          "options": [
            "14",
            "30",
            "7",
            "365"
          ]
        }
      ],
      "expectedSql": "SELECT COUNT(b.bookmark_id) AS total_bookmarks, COUNT(p.play_id) AS total_converted, ROUND(100.0 * COUNT(p.play_id) / COUNT(b.bookmark_id), 1) AS conversion_pct FROM my_list_bookmarks b LEFT JOIN title_plays p ON b.user_id = p.user_id AND b.title_id = p.title_id AND (JULIANDAY(p.first_play_date) - JULIANDAY(b.bookmarked_date)) <= 14;",
      "managerReview": "Found that 42.3% of bookmarks convert within 14 days. Titles not played within 14 days have an 88% probability of remaining unplayed forever."
    }
  },
  {
    "day": 14,
    "week": 2,
    "phase": "Week 2: Content Recommendation & Engagement",
    "title": "Day 14: Global Content Licensing ROI vs Production Amortization Cost",
    "sender": "Elena Rostova",
    "senderRole": "L6 Staff Analytics Engineer",
    "senderAvatar": "👩‍💻",
    "priority": "P1 - Executive Finance",
    "department": "Content Finance & Studio Strategy",
    "slackMessage": "Executive leadership needs an amortization review: for each content_tier ('Original Major', 'Original Indie', 'Licensed Studio'), calculate total production cost, total hours streamed, and the cost efficiency ratio: cost per streamed hour.",
    "contextReport": {
      "businessWhy": "Netflix spends $17+ billion annually on content. Measuring production amortization cost per streamed hour tells executives whether a $200M blockbuster film is actually more cost-effective than a $25M Korean reality drama.",
      "learningFocus": [
        "Financial ratio metrics: `ROUND(SUM(production_cost_usd) / NULLIF(SUM(streamed_hours), 0), 2) AS cost_per_streamed_hour`",
        "Aggregating across disparate business tiers",
        "Handling massive dollar values with `SUM()` and division"
      ],
      "sampleSchema": "content_roi_ledger (\n  title_id VARCHAR(30) PRIMARY KEY,\n  title_name VARCHAR(100),\n  content_tier VARCHAR(30),\n  production_cost_usd BIGINT,\n  streamed_hours BIGINT\n)",
      "realWorldTrap": "Don't compute the average of `(production_cost / streamed_hours)`! Small titles with few hours will skew the average into millions. Always take the ratio of totals.",
      "interviewRelevance": "Finance and operations analytics interviews place heavy emphasis on cost-per-unit-of-consumption metrics."
    },
    "schema": "content_roi_ledger",
    "challenge": {
      "instruction": "Compute total_cost_usd, total_streamed_hours, and cost_per_streamed_hour for each content_tier, ordered by cost efficiency ascending.",
      "template": "SELECT content_tier,\n  SUM(production_cost_usd) AS total_cost_usd,\n  SUM(streamed_hours) AS total_streamed_hours,\n  ROUND(SUM(production_cost_usd) / NULLIF(SUM(streamed_hours), 0), 2) AS cost_per_streamed_hour\nFROM content_roi_ledger\nGROUP BY ___1___\nORDER BY cost_per_streamed_hour ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Tier Grouping",
          "answer": "content_tier",
          "options": [
            "content_tier",
            "title_name",
            "title_id",
            "total_cost_usd"
          ]
        },
        {
          "id": 2,
          "label": "Sort Order",
          "answer": "ASC",
          "options": [
            "ASC",
            "DESC",
            "LIMIT",
            "OVER"
          ]
        }
      ],
      "expectedSql": "SELECT content_tier, SUM(production_cost_usd) AS total_cost_usd, SUM(streamed_hours) AS total_streamed_hours, ROUND(SUM(production_cost_usd) / NULLIF(SUM(streamed_hours), 0), 2) AS cost_per_streamed_hour FROM content_roi_ledger GROUP BY content_tier ORDER BY cost_per_streamed_hour ASC;",
      "managerReview": "Fascinating results: 'Original Major' costs $0.18 per streamed hour due to massive global volume, whereas 'Original Indie' was $0.74. Promoted to L4 Confirmed!"
    }
  },
  {
    "day": 15,
    "week": 3,
    "phase": "Week 3: A/B Testing & Statistical Experimentation",
    "title": "Day 15: Thumbnail Artwork Variation A/B Test Variant Allocation",
    "sender": "Chloe Lin",
    "senderRole": "L5 Product Data Scientist",
    "senderAvatar": "👩‍🔬",
    "priority": "P2 - Experimentation",
    "department": "Experimentation Platform (ABn Engine)",
    "slackMessage": "Welcome to Week 3! We just launched Experiment #EXP_ARTWORK_2026 testing 3 thumbnail variations for Stranger Things. Verify user variant assignment: count unique accounts assigned to 'control', 'variant_a', and 'variant_b', and verify that allocation proportions hover close to 33.3%.",
    "contextReport": {
      "businessWhy": "Thumbnail artwork is one of the highest leverage levers on Netflix: personalized artwork increases title plays by 20-30%. Before measuring conversion lift, data scientists must verify equal variant randomization.",
      "learningFocus": [
        "Experiment assignment verification",
        "Unique entity counting with `COUNT(DISTINCT account_id)`",
        "Computing percentage of total using window function: `ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 2)`"
      ],
      "sampleSchema": "experiment_assignments (\n  assignment_id VARCHAR(36) PRIMARY KEY,\n  experiment_id VARCHAR(30),\n  account_id VARCHAR(20),\n  variant_name VARCHAR(20),\n  assigned_at TIMESTAMP\n)",
      "realWorldTrap": "Never use simple `COUNT(*)` without checking for duplicate assignment events! If an account was assigned twice due to network retries, count distinct accounts.",
      "interviewRelevance": "A/B testing assignment validation and percentage-of-total window queries are standard senior data scientist interview questions."
    },
    "schema": "experiment_assignments",
    "challenge": {
      "instruction": "For experiment_id = 'EXP_ARTWORK_2026', return variant_name, unique_accounts, and variant_share_pct using SUM(COUNT(*)) OVER ().",
      "template": "SELECT variant_name,\n  COUNT(DISTINCT account_id) AS unique_accounts,\n  ROUND(100.0 * COUNT(DISTINCT account_id) / SUM(COUNT(DISTINCT account_id)) OVER (), 2) AS variant_share_pct\nFROM experiment_assignments\nWHERE experiment_id = ___1___\nGROUP BY ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Experiment Key",
          "answer": "'EXP_ARTWORK_2026'",
          "options": [
            "'EXP_ARTWORK_2026'",
            "'CONTROL'",
            "NULL",
            "'ALL'"
          ]
        },
        {
          "id": 2,
          "label": "Group Dimension",
          "answer": "variant_name",
          "options": [
            "variant_name",
            "account_id",
            "experiment_id",
            "assignment_id"
          ]
        }
      ],
      "expectedSql": "SELECT variant_name, COUNT(DISTINCT account_id) AS unique_accounts, ROUND(100.0 * COUNT(DISTINCT account_id) / SUM(COUNT(DISTINCT account_id)) OVER (), 2) AS variant_share_pct FROM experiment_assignments WHERE experiment_id = 'EXP_ARTWORK_2026' GROUP BY variant_name;",
      "managerReview": "Allocation confirmed: Control (33.34%), Variant A (33.31%), Variant B (33.35%). Randomization hash function is perfectly balanced."
    }
  },
  {
    "day": 16,
    "week": 3,
    "phase": "Week 3: A/B Testing & Statistical Experimentation",
    "title": "Day 16: Sample Ratio Mismatch (SRM) Chi-Square Diagnostic Invariant",
    "sender": "Chloe Lin",
    "senderRole": "L5 Product Data Scientist",
    "senderAvatar": "👩‍🔬",
    "priority": "P1 - Critical Guardrail",
    "department": "Experimentation Platform (ABn Engine)",
    "slackMessage": "Alert! An automated monitoring job flagged potential Sample Ratio Mismatch (SRM) on EXP_UI_NAV. If variant traffic deviates significantly from expected 50/50, the experiment results are mathematically invalid. Compute the chi-square component: `POWER(observed - expected, 2) / expected` for control and treatment.",
    "contextReport": {
      "businessWhy": "Sample Ratio Mismatch (SRM) is the #1 silent killer of online experimentation. If a bug crashes the app on treatment before telemetry fires, treatment appears to have fewer users, corrupting every downstream metric.",
      "learningFocus": [
        "Statistical math in SQL: `POWER(observed - expected, 2) / expected`",
        "Dynamic expected value computation based on equal 50/50 split",
        "SRM diagnostic reporting"
      ],
      "sampleSchema": "ab_variant_counts (\n  experiment_id VARCHAR(30),\n  variant VARCHAR(20),\n  observed_count INT\n)",
      "realWorldTrap": "Don't evaluate conversion lift if SRM is present! Any statistically significant SRM invalidates the test completely; you must fix the tracking bug and re-run.",
      "interviewRelevance": "Interviewers at Netflix, Meta, and Uber specifically test whether candidates know about SRM and how to detect it."
    },
    "schema": "ab_variant_counts",
    "challenge": {
      "instruction": "Calculate the chi-square component as `chi_sq_component` for each variant where expected is total_observed / 2.0.",
      "template": "WITH totals AS (\n  SELECT SUM(observed_count) * 0.5 AS expected_count\n  FROM ab_variant_counts\n  WHERE experiment_id = 'EXP_UI_NAV'\n)\nSELECT variant, observed_count, t.expected_count,\n  ROUND(POWER(observed_count - t.expected_count, 2) / t.expected_count, 3) AS chi_sq_component\nFROM ab_variant_counts\nCROSS JOIN totals t\nWHERE experiment_id = ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Experiment Filter",
          "answer": "'EXP_UI_NAV'",
          "options": [
            "'EXP_UI_NAV'",
            "'EXP_ARTWORK_2026'",
            "NULL",
            "'ALL'"
          ]
        }
      ],
      "expectedSql": "WITH totals AS (SELECT SUM(observed_count) * 0.5 AS expected_count FROM ab_variant_counts WHERE experiment_id = 'EXP_UI_NAV') SELECT variant, observed_count, t.expected_count, ROUND(POWER(observed_count - t.expected_count, 2) / t.expected_count, 3) AS chi_sq_component FROM ab_variant_counts CROSS JOIN totals t WHERE experiment_id = 'EXP_UI_NAV';",
      "managerReview": "Chi-Square sum = 0.42 (p-value ~0.51 > 0.05). No SRM detected! The experiment sample ratio is sound and ready for lift analysis."
    }
  },
  {
    "day": 17,
    "week": 3,
    "phase": "Week 3: A/B Testing & Statistical Experimentation",
    "title": "Day 17: Difference-in-Means: Mean Stream Hours per Subscriber",
    "sender": "Chloe Lin",
    "senderRole": "L5 Product Data Scientist",
    "senderAvatar": "👩‍🔬",
    "priority": "P2 - Sprint",
    "department": "Experimentation Platform (ABn Engine)",
    "slackMessage": "Now evaluate the primary metric for EXP_ARTWORK_2026: calculate the mean weekly watch hours per subscriber (`AVG(watch_hours)`) and standard deviation (`STDEV` or variance) for Control vs Variant A. What is the absolute lift in hours?",
    "contextReport": {
      "businessWhy": "Average watch time per subscriber is Netflix's primary engagement metric. Even a 0.2 hour/week increase per subscriber across 260M members equates to over 50 million hours of additional monthly viewing engagement.",
      "learningFocus": [
        "Two-sample comparison across experiment variants",
        "Calculating sample mean and standard error components",
        "Rounding statistical summaries for leadership reports"
      ],
      "sampleSchema": "experiment_metrics (\n  user_id VARCHAR(20) PRIMARY KEY,\n  experiment_id VARCHAR(30),\n  variant VARCHAR(20),\n  watch_hours DECIMAL(6,2)\n)",
      "realWorldTrap": "Watch hours are heavily right-skewed by power users who leave TVs playing in the background. Always inspect median or winsorized means to prevent 0.01% of outliers from distorting conclusions.",
      "interviewRelevance": "Computing A/B test treatment effect and variance estimation in SQL is a core requirement for tech analytics roles."
    },
    "schema": "experiment_metrics",
    "challenge": {
      "instruction": "Compute member_count, avg_watch_hours (rounded to 2 decimals), and min/max hours for each variant in 'EXP_ARTWORK_2026'.",
      "template": "SELECT variant,\n  COUNT(*) AS member_count,\n  ROUND(AVG(watch_hours), 2) AS avg_watch_hours,\n  MIN(watch_hours) AS min_hours,\n  MAX(watch_hours) AS max_hours\nFROM experiment_metrics\nWHERE experiment_id = ___1___\nGROUP BY ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Experiment Identifier",
          "answer": "'EXP_ARTWORK_2026'",
          "options": [
            "'EXP_ARTWORK_2026'",
            "'ALL'",
            "NULL",
            "'TREATMENT'"
          ]
        },
        {
          "id": 2,
          "label": "Grouping Column",
          "answer": "variant",
          "options": [
            "variant",
            "watch_hours",
            "user_id",
            "experiment_id"
          ]
        }
      ],
      "expectedSql": "SELECT variant, COUNT(*) AS member_count, ROUND(AVG(watch_hours), 2) AS avg_watch_hours, MIN(watch_hours) AS min_hours, MAX(watch_hours) AS max_hours FROM experiment_metrics WHERE experiment_id = 'EXP_ARTWORK_2026' GROUP BY variant;",
      "managerReview": "Variant A showed 11.45 avg hours vs Control's 10.82 (+0.63 hrs/wk lift, p < 0.001)! A statistically significant win for the new dynamic artwork engine."
    }
  },
  {
    "day": 18,
    "week": 3,
    "phase": "Week 3: A/B Testing & Statistical Experimentation",
    "title": "Day 18: Guardrail Metrics: App Crash Rate Variance during UI Rollout",
    "sender": "Elena Rostova",
    "senderRole": "L6 Staff Analytics Engineer",
    "senderAvatar": "👩‍💻",
    "priority": "P1 - Critical Guardrail",
    "department": "Core Playback & Streaming Data Platform",
    "slackMessage": "Even when a new UI shows positive engagement lift, we cannot ship if guardrail metrics degrade! Calculate the crash rate per 1,000 sessions (`SUM(crashes) * 1000.0 / COUNT(*)`) for Control vs Treatment. If treatment crash rate increases by >10%, we auto-revert.",
    "contextReport": {
      "businessWhy": "Guardrail metrics protect fundamental user experience: crash rates, playback start failures, and device battery drain. A feature that increases watch time by causing 20% more crashes on low-end devices must be vetoed.",
      "learningFocus": [
        "Guardrail rate metrics per 1,000 units: `ROUND(SUM(is_crash) * 1000.0 / COUNT(*), 3) AS crash_rate_per_k`",
        "Comparison between primary and guardrail trade-offs",
        "Device segmentation to isolate memory leak regressions"
      ],
      "sampleSchema": "app_client_sessions (\n  session_id VARCHAR(36) PRIMARY KEY,\n  variant VARCHAR(20),\n  device_os VARCHAR(30),\n  is_crash INT -- 1 if crash, 0 otherwise\n)",
      "realWorldTrap": "Rare events like crashes occur at rates of 0.05%. Dividing without multiplying by 1,000 or 10,000 produces tiny decimals (0.00005) that get rounded to 0.00 by default.",
      "interviewRelevance": "Demonstrating awareness of guardrail metrics and roll-back criteria proves production-grade engineering maturity."
    },
    "schema": "app_client_sessions",
    "challenge": {
      "instruction": "Compute total_sessions, total_crashes, and crash_rate_per_k for each variant, ordered by crash rate.",
      "template": "SELECT variant,\n  COUNT(*) AS total_sessions,\n  SUM(is_crash) AS total_crashes,\n  ROUND(SUM(is_crash) * 1000.0 / COUNT(*), 3) AS crash_rate_per_k\nFROM app_client_sessions\nGROUP BY ___1___\nORDER BY crash_rate_per_k ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Group Dimension",
          "answer": "variant",
          "options": [
            "variant",
            "is_crash",
            "device_os",
            "session_id"
          ]
        },
        {
          "id": 2,
          "label": "Sort Order",
          "answer": "ASC",
          "options": [
            "ASC",
            "DESC",
            "LIMIT",
            "OVER"
          ]
        }
      ],
      "expectedSql": "SELECT variant, COUNT(*) AS total_sessions, SUM(is_crash) AS total_crashes, ROUND(SUM(is_crash) * 1000.0 / COUNT(*), 3) AS crash_rate_per_k FROM app_client_sessions GROUP BY variant ORDER BY crash_rate_per_k ASC;",
      "managerReview": "Guardrail passed! Control crash rate: 0.142 per 1k; Treatment: 0.145 per 1k (+2.1% variance, well inside our 10% tolerance boundary)."
    }
  },
  {
    "day": 19,
    "week": 3,
    "phase": "Week 3: A/B Testing & Statistical Experimentation",
    "title": "Day 19: Algorithmic Recommendation Shuffle Holdout Groups",
    "sender": "Chloe Lin",
    "senderRole": "L5 Product Data Scientist",
    "senderAvatar": "👩‍🔬",
    "priority": "P2 - Sprint",
    "department": "Personalization & Recommendation Systems",
    "slackMessage": "Netflix maintains permanent 1% global holdout groups to measure long-term compound value of all recommendation algorithms. Compare the 90-day retention rate of the 1% 'Pure Random Recommendations' holdout group against the standard personalized feed.",
    "contextReport": {
      "businessWhy": "Permanent holdouts quantify the total cumulative ROI of machine learning investments over years. Showing that algorithmic personalization adds +12% in 90-day retention justifies large GPU cluster budgets.",
      "learningFocus": [
        "Holdout vs Production cohort comparison",
        "Retention percentage calculation: `ROUND(100.0 * COUNT(CASE WHEN retained_day_90 = 1 THEN 1 END) / COUNT(*), 2)`",
        "Cohort isolation"
      ],
      "sampleSchema": "holdout_members (\n  member_id VARCHAR(20) PRIMARY KEY,\n  holdout_group VARCHAR(30),\n  signup_cohort DATE,\n  retained_day_90 INT\n)",
      "realWorldTrap": "Holdout members often contact customer support complaining that their homepage feels weird. Ensure support tickets from holdout members are tagged and not manually swapped back into treatment.",
      "interviewRelevance": "Understanding universal holdouts and incrementality measurement is an advanced experimentation concept prized at top tech firms."
    },
    "schema": "holdout_members",
    "challenge": {
      "instruction": "Calculate total_members, retained_members, and retention_rate_pct for each holdout_group.",
      "template": "SELECT holdout_group,\n  COUNT(*) AS total_members,\n  SUM(retained_day_90) AS retained_members,\n  ROUND(100.0 * SUM(retained_day_90) / COUNT(*), 2) AS retention_rate_pct\nFROM holdout_members\nGROUP BY ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Group Dimension",
          "answer": "holdout_group",
          "options": [
            "holdout_group",
            "signup_cohort",
            "retained_day_90",
            "member_id"
          ]
        }
      ],
      "expectedSql": "SELECT holdout_group, COUNT(*) AS total_members, SUM(retained_day_90) AS retained_members, ROUND(100.0 * SUM(retained_day_90) / COUNT(*), 2) AS retention_rate_pct FROM holdout_members GROUP BY holdout_group;",
      "managerReview": "Personalized Feed: 78.4% 90-day retention vs Random Holdout: 61.2% (+17.2 percentage point delta)! Concrete proof of recommender system value."
    }
  },
  {
    "day": 20,
    "week": 3,
    "phase": "Week 3: A/B Testing & Statistical Experimentation",
    "title": "Day 20: Pre/Post Episode Teaser Engagement Significance",
    "sender": "Chloe Lin",
    "senderRole": "L5 Product Data Scientist",
    "senderAvatar": "👩‍🔬",
    "priority": "P2 - Sprint",
    "department": "Personalization & Recommendation Systems",
    "slackMessage": "We tested showing an auto-playing 15-second teaser during the post-credits countdown versus a static title card. Query teaser engagement metrics: calculate total impressions, total teaser views >= 10 seconds, and completion rate by teaser type.",
    "contextReport": {
      "businessWhy": "Post-play countdowns have seconds to capture viewer attention before they close the app. Auto-playing teasers can increase next-series adoption by 18%, but risk annoying fatigued late-night viewers.",
      "learningFocus": [
        "Binary event thresholds (`watch_seconds >= 10`)",
        "Cross-variant teaser evaluation",
        "Filtering on completed countdown events"
      ],
      "sampleSchema": "teaser_impressions (\n  impression_id VARCHAR(36) PRIMARY KEY,\n  teaser_type VARCHAR(30),\n  user_id VARCHAR(20),\n  teaser_watch_sec INT,\n  clicked_watch_now INT\n)",
      "realWorldTrap": "Don't count impressions where the user hit 'Stop' or closed the TV within 1 second as an authentic teaser view. Establish meaningful engagement thresholds (e.g. >= 5 seconds).",
      "interviewRelevance": "Event thresholding and video consumption funnel design are standard media streaming interview questions."
    },
    "schema": "teaser_impressions",
    "challenge": {
      "instruction": "Compute total_impressions, engaged_views (watch >= 10 sec), and engaged_pct for each teaser_type.",
      "template": "SELECT teaser_type,\n  COUNT(*) AS total_impressions,\n  SUM(CASE WHEN teaser_watch_sec >= 10 THEN 1 ELSE 0 END) AS engaged_views,\n  ROUND(100.0 * SUM(CASE WHEN teaser_watch_sec >= 10 THEN 1 ELSE 0 END) / COUNT(*), 2) AS engaged_pct\nFROM teaser_impressions\nGROUP BY ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Group Dimension",
          "answer": "teaser_type",
          "options": [
            "teaser_type",
            "user_id",
            "teaser_watch_sec",
            "impression_id"
          ]
        }
      ],
      "expectedSql": "SELECT teaser_type, COUNT(*) AS total_impressions, SUM(CASE WHEN teaser_watch_sec >= 10 THEN 1 ELSE 0 END) AS engaged_views, ROUND(100.0 * SUM(CASE WHEN teaser_watch_sec >= 10 THEN 1 ELSE 0 END) / COUNT(*), 2) AS engaged_pct FROM teaser_impressions GROUP BY teaser_type;",
      "managerReview": "Dynamic Video Clip had a 54.2% engaged rate vs 18.7% for Static Card. The feature is slated for global production rollout!"
    }
  },
  {
    "day": 21,
    "week": 3,
    "phase": "Week 3: A/B Testing & Statistical Experimentation",
    "title": "Day 21: A/B Experiment Ship vs Revert Decision Dossier for Product Council",
    "sender": "Elena Rostova",
    "senderRole": "L6 Staff Analytics Engineer",
    "senderAvatar": "👩‍💻",
    "priority": "P1 - Executive Product Council",
    "department": "Experimentation Platform (ABn Engine)",
    "slackMessage": "Today is Product Council! We must generate the final go/no-go dossier for all Q3 experiments. A test can only SHIP if: primary lift > 0.5%, p_value < 0.05, and guardrail_passed = 1. Write the evaluation logic that assigns 'SHIP', 'REVERT', or 'INCONCLUSIVE'.",
    "contextReport": {
      "businessWhy": "Standardizing automated decision rules prevents confirmation bias. Product managers often lobby to ship negative or inconclusive experiments based on intuition; algorithmic decision gates ensure data integrity.",
      "learningFocus": [
        "Multi-predicate business logic in `CASE WHEN`",
        "Comparing continuous p-values against alpha threshold (< 0.05)",
        "Evaluating binary guardrail flags in unison with primary lift"
      ],
      "sampleSchema": "experiment_results_dossier (\n  experiment_id VARCHAR(30) PRIMARY KEY,\n  feature_name VARCHAR(100),\n  primary_metric_lift_pct DECIMAL(5,2),\n  p_value DECIMAL(6,4),\n  guardrail_passed INT\n)",
      "realWorldTrap": "Remember that in statistics, a small p-value indicates statistical significance. `p_value < 0.05` means less than 5% probability the result was random chance. Never write `p_value > 0.05` for shipping!",
      "interviewRelevance": "Bridging statistical outputs (p-value, confidence intervals) with concrete business decisions is what separates senior quants and analytics engineers."
    },
    "schema": "experiment_results_dossier",
    "challenge": {
      "instruction": "Assign decision ('SHIP' if lift > 0.5 AND p_value < 0.05 AND guardrail_passed = 1, 'REVERT' if lift < 0, else 'INCONCLUSIVE'). Return experiment_id, feature_name, and decision.",
      "template": "SELECT experiment_id, feature_name,\n  CASE\n    WHEN primary_metric_lift_pct > 0.5 AND p_value < 0.05 AND guardrail_passed = 1 THEN 'SHIP'\n    WHEN primary_metric_lift_pct < 0.0 THEN 'REVERT'\n    ELSE 'INCONCLUSIVE'\n  END AS council_decision\nFROM experiment_results_dossier;",
      "blanks": [
        {
          "id": 1,
          "label": "P-Value Threshold",
          "answer": "0.05",
          "options": [
            "0.05",
            "0.50",
            "0.01",
            "0.95"
          ]
        }
      ],
      "expectedSql": "SELECT experiment_id, feature_name, CASE WHEN primary_metric_lift_pct > 0.5 AND p_value < 0.05 AND guardrail_passed = 1 THEN 'SHIP' WHEN primary_metric_lift_pct < 0.0 THEN 'REVERT' ELSE 'INCONCLUSIVE' END AS council_decision FROM experiment_results_dossier;",
      "managerReview": "Product Council approved! 4 experiments cleared to SHIP globally, 2 reverted. Promoted to L5 Senior Analytics Engineer!"
    }
  },
  {
    "day": 22,
    "week": 4,
    "phase": "Week 4: Subscription Retention & Global Growth",
    "title": "Day 22: 30-Day, 60-Day, 90-Day Cohort Retention Matrix (Triangle Analysis)",
    "sender": "Devin Patel",
    "senderRole": "L5 Growth & Retention Lead",
    "senderAvatar": "👨‍💼",
    "priority": "P1 - Executive Retention",
    "department": "Growth & Financial Operations",
    "slackMessage": "Welcome to Week 4! We're building the master cohort retention triangle for Wall Street earnings prep. For members who signed up in '2026-01', calculate the total cohort size, and the percentage still active at day 30, day 60, and day 90.",
    "contextReport": {
      "businessWhy": "Cohort retention triangles are the gold standard for subscription health. If newer cohorts retain at 82% at Day 90 compared to 75% for older cohorts, Lifetime Value (LTV) increases substantially, driving stock valuation.",
      "learningFocus": [
        "Cohort matrix aggregation: `ROUND(100.0 * COUNT(CASE WHEN active_day_30 = 1 THEN 1 END) / COUNT(*), 1) AS retain_30d_pct`",
        "Multi-interval retention columns in a single row",
        "Sign-up cohort filtering"
      ],
      "sampleSchema": "subscription_cohorts (\n  user_id VARCHAR(20) PRIMARY KEY,\n  signup_month VARCHAR(7),\n  active_day_30 INT,\n  active_day_60 INT,\n  active_day_90 INT\n)",
      "realWorldTrap": "Don't evaluate Day 90 retention for cohorts that signed up less than 90 days ago! Otherwise, recent subscribers will appear 'churned' simply because 90 days haven't elapsed yet.",
      "interviewRelevance": "Cohort retention matrices are asked in virtually every growth, subscription, and fintech data role."
    },
    "schema": "subscription_cohorts",
    "challenge": {
      "instruction": "Compute cohort_size, retain_30d_pct, retain_60d_pct, and retain_90d_pct for signup_month = '2026-01'.",
      "template": "SELECT signup_month,\n  COUNT(*) AS cohort_size,\n  ROUND(100.0 * SUM(active_day_30) / COUNT(*), 1) AS retain_30d_pct,\n  ROUND(100.0 * SUM(active_day_60) / COUNT(*), 1) AS retain_60d_pct,\n  ROUND(100.0 * SUM(active_day_90) / COUNT(*), 1) AS retain_90d_pct\nFROM subscription_cohorts\nWHERE signup_month = ___1___\nGROUP BY ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Cohort Month Filter",
          "answer": "'2026-01'",
          "options": [
            "'2026-01'",
            "'2026-Q1'",
            "NULL",
            "'ALL'"
          ]
        },
        {
          "id": 2,
          "label": "Grouping Column",
          "answer": "signup_month",
          "options": [
            "signup_month",
            "user_id",
            "active_day_30",
            "cohort_size"
          ]
        }
      ],
      "expectedSql": "SELECT signup_month, COUNT(*) AS cohort_size, ROUND(100.0 * SUM(active_day_30) / COUNT(*), 1) AS retain_30d_pct, ROUND(100.0 * SUM(active_day_60) / COUNT(*), 1) AS retain_60d_pct, ROUND(100.0 * SUM(active_day_90) / COUNT(*), 1) AS retain_90d_pct FROM subscription_cohorts WHERE signup_month = '2026-01' GROUP BY signup_month;",
      "managerReview": "January 2026 cohort demonstrated remarkable resilience: 91.2% at Day 30, 84.6% at Day 60, and 79.8% at Day 90. Strongest cohort in 8 quarters."
    }
  },
  {
    "day": 23,
    "week": 4,
    "phase": "Week 4: Subscription Retention & Global Growth",
    "title": "Day 23: Involuntary Churn & Payment Gateway Decline Dunning Cascades",
    "sender": "Devin Patel",
    "senderRole": "L5 Growth & Retention Lead",
    "senderAvatar": "👨‍💼",
    "priority": "P1 - High Urgency",
    "department": "Payments Platform & Global Billing",
    "slackMessage": "Involuntary churn happens when a loyal customer's credit card expires or gets falsely flagged for fraud. Our automated retry ('dunning') system re-attempts charges over 14 days. Calculate the final recovery rate: percentage of initially declined invoices successfully collected on retry attempts 1 through 4.",
    "contextReport": {
      "businessWhy": "Over 35% of all streaming cancellations are involuntary due to expired cards or bank rejections. Smart payment retry schedules recover up to $400M in annual recurring revenue without human intervention.",
      "learningFocus": [
        "Recovery rate computation: `ROUND(100.0 * SUM(CASE WHEN final_status = 'RECOVERED' THEN 1 ELSE 0 END) / COUNT(*), 2) AS recovery_rate_pct`",
        "Grouping by decline error reason (`insufficient_funds`, `expired_card`, `do_not_honor`)",
        "Dunning recovery funnel modeling"
      ],
      "sampleSchema": "billing_declines (\n  invoice_id VARCHAR(36) PRIMARY KEY,\n  user_id VARCHAR(20),\n  decline_reason VARCHAR(50),\n  retry_attempts INT,\n  final_status VARCHAR(20) -- 'RECOVERED' or 'CHURNED'\n)",
      "realWorldTrap": "Don't count invoices currently in active dunning (retry 1 or 2) as final failures! Filter only terminal states (`final_status IN ('RECOVERED', 'CHURNED')`).",
      "interviewRelevance": "Involuntary churn and payment dunning analytics are core to high-volume SaaS and subscription companies."
    },
    "schema": "billing_declines",
    "challenge": {
      "instruction": "For terminal invoices, compute total_declined, total_recovered, and recovery_rate_pct by decline_reason, sorted by recovery_rate_pct DESC.",
      "template": "SELECT decline_reason,\n  COUNT(*) AS total_declined,\n  SUM(CASE WHEN final_status = 'RECOVERED' THEN 1 ELSE 0 END) AS total_recovered,\n  ROUND(100.0 * SUM(CASE WHEN final_status = 'RECOVERED' THEN 1 ELSE 0 END) / COUNT(*), 2) AS recovery_rate_pct\nFROM billing_declines\nWHERE final_status IN ('RECOVERED', 'CHURNED')\nGROUP BY decline_reason\nORDER BY recovery_rate_pct ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Sort Direction",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "LIMIT",
            "OVER"
          ]
        }
      ],
      "expectedSql": "SELECT decline_reason, COUNT(*) AS total_declined, SUM(CASE WHEN final_status = 'RECOVERED' THEN 1 ELSE 0 END) AS total_recovered, ROUND(100.0 * SUM(CASE WHEN final_status = 'RECOVERED' THEN 1 ELSE 0 END) / COUNT(*), 2) AS recovery_rate_pct FROM billing_declines WHERE final_status IN ('RECOVERED', 'CHURNED') GROUP BY decline_reason ORDER BY recovery_rate_pct DESC;",
      "managerReview": "'Insufficient Funds' had a 68.4% recovery rate by scheduling retries on Friday paydays! 'Expired Card' achieved 51.2% recovery via Account Updater APIs."
    }
  },
  {
    "day": 24,
    "week": 4,
    "phase": "Week 4: Subscription Retention & Global Growth",
    "title": "Day 24: 'Standard with Ads' Migration & Ad-Impression ARPU Cannibalization Bridge",
    "sender": "Elena Rostova",
    "senderRole": "L6 Staff Analytics Engineer",
    "senderAvatar": "👩‍💻",
    "priority": "P2 - Sprint",
    "department": "Advertising Data Platform",
    "slackMessage": "When a subscriber downgrades from Standard ($15.49) to Standard-with-Ads ($6.99), subscription ARPU drops by $8.50. However, they generate advertising impression revenue. Calculate the total monthly ARPU: `subscription_fee + (ad_impressions / 1000.0 * effective_cpm)` to determine if ad tiers are accretive or dilutive.",
    "contextReport": {
      "businessWhy": "Wall Street closely scrutinizes Average Revenue Per User (ARPU). If an ad-supported subscriber watches 60 hours of TV a month, their ad revenue can exceed $10, making them MORE profitable than an ad-free subscriber.",
      "learningFocus": [
        "Multi-stream revenue modeling in SQL: `subscription_price + (monthly_impressions / 1000.0 * e_cpm)`",
        "Comparison against benchmark ad-free tier price ($15.49)",
        "Computing net revenue delta per user"
      ],
      "sampleSchema": "ad_tier_subscribers (\n  user_id VARCHAR(20) PRIMARY KEY,\n  plan_name VARCHAR(30),\n  subscription_fee DECIMAL(5,2),\n  monthly_ad_impressions INT,\n  effective_cpm DECIMAL(5,2)\n)",
      "realWorldTrap": "CPM (Cost Per Mille) is priced per 1,000 impressions! Forgetting to divide `monthly_ad_impressions` by 1000.0 will inflate ad revenue by a factor of 1,000x.",
      "interviewRelevance": "Blended revenue modeling (subscription + ad CPM) is the defining financial SQL test at Netflix, Hulu, and Spotify."
    },
    "schema": "ad_tier_subscribers",
    "challenge": {
      "instruction": "Compute the average total_blended_arpu for ad-tier members: ROUND(AVG(subscription_fee + (monthly_ad_impressions / 1000.0 * effective_cpm)), 2).",
      "template": "SELECT plan_name,\n  COUNT(*) AS subscriber_count,\n  ROUND(AVG(subscription_fee + (monthly_ad_impressions / ___1___ * effective_cpm)), 2) AS avg_total_arpu\nFROM ad_tier_subscribers\nGROUP BY ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Per-Mille Divisor",
          "answer": "1000.0",
          "options": [
            "1000.0",
            "100.0",
            "10.0",
            "1.0"
          ]
        },
        {
          "id": 2,
          "label": "Plan Dimension",
          "answer": "plan_name",
          "options": [
            "plan_name",
            "user_id",
            "subscription_fee",
            "effective_cpm"
          ]
        }
      ],
      "expectedSql": "SELECT plan_name, COUNT(*) AS subscriber_count, ROUND(AVG(subscription_fee + (monthly_ad_impressions / 1000.0 * effective_cpm)), 2) AS avg_total_arpu FROM ad_tier_subscribers GROUP BY plan_name;",
      "managerReview": "Remarkable insight: Average total ARPU on Standard-with-Ads was $17.14 ($6.99 sub + $10.15 ad revenue) vs $15.49 for ad-free! The ad tier is highly accretive."
    }
  },
  {
    "day": 25,
    "week": 4,
    "phase": "Week 4: Subscription Retention & Global Growth",
    "title": "Day 25: Paid-Sharing ('Extra Member') Household Verification Conversion",
    "sender": "Devin Patel",
    "senderRole": "L5 Growth & Retention Lead",
    "senderAvatar": "👨‍💼",
    "priority": "P2 - Sprint",
    "department": "Identity, Household & Access Systems",
    "slackMessage": "We rolled out Paid-Sharing notifications to 'borrower' profiles outside the primary household network. Query the conversion pipeline: for each country_code, count borrower prompts served, distinct extra members added, and compute the conversion percentage.",
    "contextReport": {
      "businessWhy": "Paid-Sharing transformed over 100 million unauthorized password sharers into paying subscribers or extra-member add-ons, fueling Netflix's largest subscriber growth spurt in history.",
      "learningFocus": [
        "Funnel ratio calculation across international regions",
        "Handling NULL counts with `COALESCE`",
        "Sorting by conversion efficiency descending"
      ],
      "sampleSchema": "household_prompts (\n  prompt_id VARCHAR(36) PRIMARY KEY,\n  user_id VARCHAR(20),\n  country_code VARCHAR(3),\n  converted_extra_member INT\n)",
      "realWorldTrap": "Don't count the same user multiple times if they were prompted 5 times! Always aggregate distinct users converted or filter to unique prompt exposures.",
      "interviewRelevance": "Product rollout impact evaluation across international regions is a hallmark of senior business analytics interviews."
    },
    "schema": "household_prompts",
    "challenge": {
      "instruction": "For each country_code, compute total_prompts, extra_members_added, and conversion_pct (rounded to 2 decimals), ordered by conversion_pct DESC.",
      "template": "SELECT country_code,\n  COUNT(*) AS total_prompts,\n  SUM(converted_extra_member) AS extra_members_added,\n  ROUND(100.0 * SUM(converted_extra_member) / COUNT(*), 2) AS conversion_pct\nFROM household_prompts\nGROUP BY country_code\nORDER BY conversion_pct ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Sort Order",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "LIMIT",
            "OVER"
          ]
        }
      ],
      "expectedSql": "SELECT country_code, COUNT(*) AS total_prompts, SUM(converted_extra_member) AS extra_members_added, ROUND(100.0 * SUM(converted_extra_member) / COUNT(*), 2) AS conversion_pct FROM household_prompts GROUP BY country_code ORDER BY conversion_pct DESC;",
      "managerReview": "Spain and Canada led the rollout with a 24.8% conversion rate from prompted borrowers into paid extra members."
    }
  },
  {
    "day": 26,
    "week": 4,
    "phase": "Week 4: Subscription Retention & Global Growth",
    "title": "Day 26: Predictive Churn Risk Feature Pipeline (30-Day Inactivity Lag)",
    "sender": "Chloe Lin",
    "senderRole": "L5 Product Data Scientist",
    "senderAvatar": "👩‍🔬",
    "priority": "P1 - Machine Learning Feature Store",
    "department": "ML Infrastructure & Feature Engineering",
    "slackMessage": "Our ML model predicts churn 30 days before renewal. A critical feature is 'days_since_last_stream'. Compute the elapsed days between snapshot_date ('2026-11-01') and each user's most recent stream. Flag accounts with >21 days of inactivity as high churn risk.",
    "contextReport": {
      "businessWhy": "When a subscriber stops streaming for 3 consecutive weeks, their likelihood of voluntary cancellation exceeds 65%. Automated retention emails offering trending content can reactivate up to 22% of dormant users if sent within the 21-day window.",
      "learningFocus": [
        "Feature store table generation: computing lag from snapshot dates",
        "Subqueries / CTEs with `MAX(stream_date)`",
        "Binary risk classification with `CASE WHEN days_inactive >= 21 THEN 'HIGH_RISK' ELSE 'LOW_RISK' END`"
      ],
      "sampleSchema": "user_stream_history (\n  stream_id VARCHAR(36) PRIMARY KEY,\n  user_id VARCHAR(20),\n  stream_date DATE\n)",
      "realWorldTrap": "Users with zero streams in history will be omitted by an `INNER JOIN`. Use `LEFT JOIN` or ensure your user base table includes all active subscriptions.",
      "interviewRelevance": "Feature engineering in SQL for machine learning pipelines is a high-frequency question in data engineering and data science interviews."
    },
    "schema": "user_stream_history",
    "challenge": {
      "instruction": "Find the last_stream_date for each user. Calculate days_inactive as JULIANDAY('2026-11-01') - JULIANDAY(MAX(stream_date)). Classify as 'HIGH_RISK' if days_inactive >= 21, else 'LOW_RISK'.",
      "template": "SELECT user_id,\n  MAX(stream_date) AS last_stream_date,\n  CAST(JULIANDAY('2026-11-01') - JULIANDAY(MAX(stream_date)) AS INT) AS days_inactive,\n  CASE\n    WHEN (JULIANDAY('2026-11-01') - JULIANDAY(MAX(stream_date))) >= ___1___ THEN 'HIGH_RISK'\n    ELSE 'LOW_RISK'\n  END AS churn_risk_tier\nFROM user_stream_history\nGROUP BY user_id;",
      "blanks": [
        {
          "id": 1,
          "label": "Inactivity Threshold (Days)",
          "answer": "21",
          "options": [
            "21",
            "30",
            "14",
            "7"
          ]
        }
      ],
      "expectedSql": "SELECT user_id, MAX(stream_date) AS last_stream_date, CAST(JULIANDAY('2026-11-01') - JULIANDAY(MAX(stream_date)) AS INT) AS days_inactive, CASE WHEN (JULIANDAY('2026-11-01') - JULIANDAY(MAX(stream_date))) >= 21 THEN 'HIGH_RISK' ELSE 'LOW_RISK' END AS churn_risk_tier FROM user_stream_history GROUP BY user_id;",
      "managerReview": "Identified 84,200 accounts in the HIGH_RISK bracket. The automated CRM re-engagement pipeline has ingested this table."
    }
  },
  {
    "day": 27,
    "week": 4,
    "phase": "Week 4: Subscription Retention & Global Growth",
    "title": "Day 27: Win-Back Email Campaign Reactivation Lift & Discount Elasticity",
    "sender": "Devin Patel",
    "senderRole": "L5 Growth & Retention Lead",
    "senderAvatar": "👨‍💼",
    "priority": "P2 - Sprint",
    "department": "Growth & Financial Operations",
    "slackMessage": "We sent win-back emails to cancelled subscribers with two offers: '$2 off for 3 months' vs 'Content Highlight (No Discount)'. Calculate the reactivation rate for each email campaign type and the 60-day renewal rate of reactivated members.",
    "contextReport": {
      "businessWhy": "Win-back marketing brings back former subscribers at 1/5th the acquisition cost of brand new members. Testing price discounts against pure content reminders reveals whether users left due to price sensitivity or lack of interesting titles.",
      "learningFocus": [
        "Reactivation rate calculation across campaign variants",
        "Secondary retention evaluation on reactivated cohorts",
        "Filtering on delivered emails"
      ],
      "sampleSchema": "winback_campaigns (\n  campaign_id VARCHAR(36) PRIMARY KEY,\n  user_id VARCHAR(20),\n  offer_type VARCHAR(30),\n  reactivated INT, -- 1 if re-subscribed, 0 otherwise\n  retained_60d INT\n)",
      "realWorldTrap": "Don't measure 60-day retention against total emails sent! The denominator for `retained_60d` must be `reactivated` members, not the whole population.",
      "interviewRelevance": "Multi-stage conversion funnel metrics are tested frequently in growth analytics interviews."
    },
    "schema": "winback_campaigns",
    "challenge": {
      "instruction": "For each offer_type, calculate total_emails, reactivated_count, reactivation_pct, and secondary_60d_retention_pct among reactivated members.",
      "template": "SELECT offer_type,\n  COUNT(*) AS total_emails,\n  SUM(reactivated) AS reactivated_count,\n  ROUND(100.0 * SUM(reactivated) / COUNT(*), 2) AS reactivation_pct,\n  ROUND(100.0 * SUM(retained_60d) / NULLIF(SUM(reactivated), 0), 2) AS secondary_60d_retention_pct\nFROM winback_campaigns\nGROUP BY ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Offer Dimension",
          "answer": "offer_type",
          "options": [
            "offer_type",
            "user_id",
            "campaign_id",
            "reactivated"
          ]
        }
      ],
      "expectedSql": "SELECT offer_type, COUNT(*) AS total_emails, SUM(reactivated) AS reactivated_count, ROUND(100.0 * SUM(reactivated) / COUNT(*), 2) AS reactivation_pct, ROUND(100.0 * SUM(retained_60d) / NULLIF(SUM(reactivated), 0), 2) AS secondary_60d_retention_pct FROM winback_campaigns GROUP BY offer_type;",
      "managerReview": "Eye-opening result: The $2 Discount had higher initial reactivation (14.2% vs 8.1%), but Content Highlights had much higher 60-day secondary retention (78% vs 49%). Discount seekers churned immediately after the promotional period!"
    }
  },
  {
    "day": 28,
    "week": 4,
    "phase": "Week 4: Subscription Retention & Global Growth",
    "title": "Day 28: Multi-Currency FX Normalization for International ARPU",
    "sender": "Elena Rostova",
    "senderRole": "L6 Staff Analytics Engineer",
    "senderAvatar": "👩‍💻",
    "priority": "P1 - Financial Compliance",
    "department": "Global Financial Operations",
    "slackMessage": "Netflix bills subscribers in over 40 global currencies. To report accurate ARPU to SEC regulators, all local currencies must be converted to USD using daily closing exchange rates. Join subscription revenues with fx_rates and calculate total USD revenue and avg ARPU per country.",
    "contextReport": {
      "businessWhy": "Foreign exchange volatility can make an international market appear to be shrinking in USD terms even while growing rapidly in local currency subscribers. Constant-currency and normalized FX reporting provides true organic operational growth.",
      "learningFocus": [
        "Joining transactional ledgers with FX rate tables on date and currency code (`r.currency = fx.currency AND r.bill_date = fx.rate_date`)",
        "Currency conversion math: `SUM(local_amount * fx.usd_per_local)`",
        "Financial precision with `ROUND(..., 2)`"
      ],
      "sampleSchema": "subscription_billing (\n  bill_id VARCHAR(36) PRIMARY KEY,\n  country_code VARCHAR(3),\n  currency VARCHAR(3),\n  bill_date DATE,\n  local_amount DECIMAL(10,2)\n);\nfx_rates (\n  rate_date DATE,\n  currency VARCHAR(3),\n  usd_per_local DECIMAL(10,4)\n)",
      "realWorldTrap": "Watch out for inverted exchange rates! Make sure `usd_per_local` is multiplied, not divided. If 1 EUR = 1.08 USD, multiplying €10 * 1.08 gives $10.80. If the rate is local_per_usd (1 USD = 0.925 EUR), you must divide.",
      "interviewRelevance": "Multi-currency financial joins and FX normalizations are heavily tested in fintech, global e-commerce, and enterprise SaaS interviews."
    },
    "schema": "subscription_billing",
    "challenge": {
      "instruction": "Join subscription_billing with fx_rates on currency and date. Compute total_usd_revenue and avg_arpu_usd for each country_code.",
      "template": "SELECT b.country_code,\n  COUNT(*) AS total_invoices,\n  ROUND(SUM(b.local_amount * fx.usd_per_local), 2) AS total_usd_revenue,\n  ROUND(AVG(b.local_amount * fx.usd_per_local), 2) AS avg_arpu_usd\nFROM subscription_billing b\nJOIN fx_rates fx ON b.currency = fx.currency AND b.bill_date = ___1___\nGROUP BY b.country_code\nORDER BY total_usd_revenue ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "FX Date Key",
          "answer": "fx.rate_date",
          "options": [
            "fx.rate_date",
            "fx.currency",
            "b.bill_id",
            "NULL"
          ]
        },
        {
          "id": 2,
          "label": "Sort Order",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "LIMIT",
            "OVER"
          ]
        }
      ],
      "expectedSql": "SELECT b.country_code, COUNT(*) AS total_invoices, ROUND(SUM(b.local_amount * fx.usd_per_local), 2) AS total_usd_revenue, ROUND(AVG(b.local_amount * fx.usd_per_local), 2) AS avg_arpu_usd FROM subscription_billing b JOIN fx_rates fx ON b.currency = fx.currency AND b.bill_date = fx.rate_date GROUP BY b.country_code ORDER BY total_usd_revenue DESC;",
      "managerReview": "FX normalized report complete! US ($16.42 ARPU) and UK ($14.85 ARPU) remain highest, while India clocked the fastest subscriber volume expansion."
    }
  },
  {
    "day": 29,
    "week": 4,
    "phase": "Week 4: Subscription Retention & Global Growth",
    "title": "Day 29: Stranger Things Global Premiere Streaming War Room Incident",
    "sender": "Marcus Vance",
    "senderRole": "L7 Director of Video Encoding & CDN",
    "senderAvatar": "👨‍💼",
    "priority": "P0 - LIVE PRODUCTION WAR ROOM",
    "department": "Platform Reliability & Streaming Operations",
    "slackMessage": "WAR ROOM ACTIVE! The final season of Stranger Things dropped 15 minutes ago. Concurrent streams just crossed 35 million. Edge servers in US-East are warning of saturation. Run a real-time 5-minute bucket query to identify the top 3 CDN edge nodes with the highest error rate (`5xx_errors / total_requests`).",
    "contextReport": {
      "businessWhy": "Live premiere spikes test the physical limits of global internet infrastructure. If edge servers fail to shed load to secondary caches within 60 seconds, cascading failures take down the entire streaming front door.",
      "learningFocus": [
        "High-urgency P0 triage under production pressure",
        "Real-time failure rate calculation: `ROUND(100.0 * SUM(http_5xx_count) / COUNT(*), 3) AS error_rate_pct`",
        "Threshold filtering on mission-critical traffic nodes"
      ],
      "sampleSchema": "cdn_realtime_metrics (\n  metric_id VARCHAR(36) PRIMARY KEY,\n  edge_node_id VARCHAR(30),\n  region VARCHAR(20),\n  http_2xx_count INT,\n  http_5xx_count INT,\n  timestamp TIMESTAMP\n)",
      "realWorldTrap": "Never execute full table scans during a P0 incident! Always filter on the exact incident time window (`timestamp >= NOW() - INTERVAL '15 MIN'`) to keep query execution times under 200ms.",
      "interviewRelevance": "War room incident debugging queries demonstrate real-world operational coolness under fire."
    },
    "schema": "cdn_realtime_metrics",
    "challenge": {
      "instruction": "Identify the top 3 edge_node_ids with the highest error_rate_pct where total requests (2xx + 5xx) exceed 100,000.",
      "template": "SELECT edge_node_id, region,\n  SUM(http_2xx_count + http_5xx_count) AS total_requests,\n  ROUND(100.0 * SUM(http_5xx_count) / SUM(http_2xx_count + http_5xx_count), 3) AS error_rate_pct\nFROM cdn_realtime_metrics\nGROUP BY edge_node_id, region\nHAVING total_requests > 100000\nORDER BY error_rate_pct ___1___\nLIMIT ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Sort Direction",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "LIMIT",
            "OVER"
          ]
        },
        {
          "id": 2,
          "label": "Top Error Nodes",
          "answer": "3",
          "options": [
            "3",
            "5",
            "10",
            "1"
          ]
        }
      ],
      "expectedSql": "SELECT edge_node_id, region, SUM(http_2xx_count + http_5xx_count) AS total_requests, ROUND(100.0 * SUM(http_5xx_count) / SUM(http_2xx_count + http_5xx_count), 3) AS error_rate_pct FROM cdn_realtime_metrics GROUP BY edge_node_id, region HAVING total_requests > 100000 ORDER BY error_rate_pct DESC LIMIT 3;",
      "managerReview": "WAR ROOM SAVED! Isolated 3 failing edge switches in Ashburn, VA (edge_node 'IAD-04') with a 6.2% error rate. Traffic was instantly rerouted to Atlanta and Newark. Streaming stayed online!"
    }
  },
  {
    "day": 30,
    "week": 4,
    "phase": "Week 4: Subscription Retention & Global Growth",
    "title": "Day 30: Senior Analytics Engineer Promotion Defense & Capstone",
    "sender": "Elena Rostova",
    "senderRole": "L6 Staff Analytics Engineer",
    "senderAvatar": "👩‍💻",
    "priority": "P1 - Career Milestone Defense",
    "department": "Core Playback & Streaming Data Platform",
    "slackMessage": "Day 30! You've navigated playback telemetry, A/B testing invariants, retention triangles, and a live P0 premiere war room. For your promotion capstone defense before the Engineering Review Committee: write a comprehensive query calculating 30-day cumulative platform watch time, overall completion rate, and member retention across all 4 global regions.",
    "contextReport": {
      "businessWhy": "Senior Analytics Engineers at Netflix don't just write queries; they architect institutional data truth that informs multi-billion dollar capital allocation across streaming infrastructure, content licensing, and member retention.",
      "learningFocus": [
        "Multi-dimensional business aggregation across global theaters",
        "CTE structuring for executive reporting",
        "Consolidated QoE and retention synthesis"
      ],
      "sampleSchema": "global_monthly_rollup (\n  rollup_id VARCHAR(36) PRIMARY KEY,\n  region VARCHAR(10), -- 'UCAN', 'EMEA', 'LATAM', 'APAC'\n  total_members INT,\n  retained_members INT,\n  total_stream_hours BIGINT,\n  completed_sessions BIGINT,\n  total_sessions BIGINT\n)",
      "realWorldTrap": "Don't calculate global averages by averaging regional percentages. Regional populations differ by an order of magnitude. Always roll up the underlying numerator and denominator globally.",
      "interviewRelevance": "Capstone queries that aggregate cross-functional business health demonstrate readiness for Staff/Principal Analytics Engineer roles."
    },
    "schema": "global_monthly_rollup",
    "challenge": {
      "instruction": "For each region, compute total_members, retention_pct (retained_members / total_members), total_stream_hours, and completion_pct (completed_sessions / total_sessions).",
      "template": "SELECT region,\n  SUM(total_members) AS total_members,\n  ROUND(100.0 * SUM(retained_members) / SUM(total_members), 2) AS retention_pct,\n  SUM(total_stream_hours) AS total_stream_hours,\n  ROUND(100.0 * SUM(completed_sessions) / SUM(total_sessions), 2) AS completion_pct\nFROM global_monthly_rollup\nGROUP BY ___1___\nORDER BY total_members ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Regional Dimension",
          "answer": "region",
          "options": [
            "region",
            "rollup_id",
            "total_members",
            "retention_pct"
          ]
        },
        {
          "id": 2,
          "label": "Sort Direction",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "LIMIT",
            "OVER"
          ]
        }
      ],
      "expectedSql": "SELECT region, SUM(total_members) AS total_members, ROUND(100.0 * SUM(retained_members) / SUM(total_members), 2) AS retention_pct, SUM(total_stream_hours) AS total_stream_hours, ROUND(100.0 * SUM(completed_sessions) / SUM(total_sessions), 2) AS completion_pct FROM global_monthly_rollup GROUP BY region ORDER BY total_members DESC;",
      "managerReview": "PROMOTION UNANIMOUSLY APPROVED! The Engineering Review Committee has officially confirmed your promotion to L6 Staff Analytics Engineer. You have mastered streaming platform analytics at Netflix scale!"
    }
  }
];
