// =============================================================================
// UBER MARKETPLACE DYNAMICS & GEOSPATIAL LOGISTICS 30-DAY STORY DATA
// Role: Marketplace Data Engineer / Operations Quant (L4 -> L6)
// 30 Days Across 4 Progressive Weeks with Real-Time Surge & H3 Telemetry
// =============================================================================

window.UBER_STORY_DATA = [
  {
    "day": 1,
    "week": 1,
    "phase": "Week 1: Marketplace Imbalance & H3 Logistics",
    "title": "Day 01: Driver Supply vs Passenger Demand Inbalance Ratio",
    "sender": "Rajesh Narayanan",
    "senderRole": "L6 Staff Marketplace Data Scientist",
    "senderAvatar": "👨‍💻",
    "priority": "P2 - Onboarding",
    "department": "Global Mobility & Marketplace Dynamics",
    "slackMessage": "Welcome to the Uber Marketplace Engineering team! 🚗 Your first assignment from Dispatch Ops: during Friday evening rush hour in Manhattan, we need to calculate the supply-to-demand liquidity ratio across dispatch zones: total available drivers divided by ride requests. If the ratio drops below 0.50, riders face extended wait times. Compute this ratio for each zone.",
    "contextReport": {
      "businessWhy": "Marketplace liquidity is the foundational metric of ride-hailing: when rider requests vastly outpace available driver partners, unfulfilled ride rates spike and dispatch algorithms trigger dynamic surge pricing to incentivize drivers into undersupplied zones.",
      "learningFocus": [
        "Aggregate arithmetic with ratio rounding: `ROUND(SUM(available_drivers) * 1.0 / NULLIF(SUM(ride_requests), 0), 2) AS liquidity_ratio`",
        "Division-by-zero prevention using `NULLIF(..., 0)`",
        "Filtering on peak operational windows (`hour_of_day BETWEEN 17 AND 20`)"
      ],
      "sampleSchema": "marketplace_hourly_liquidity (\n  record_id VARCHAR(36) PRIMARY KEY,\n  zone_id VARCHAR(20),\n  zone_name VARCHAR(50),\n  hour_of_day INT,\n  available_drivers INT,\n  ride_requests INT\n)",
      "realWorldTrap": "Never divide two integer columns directly in SQL without casting or multiplying by 1.0! Integer division truncates 45 / 100 to 0.",
      "interviewRelevance": "Marketplace liquidity ratios and supply/demand matching are core questions in Uber, Lyft, and DoorDash product data science interviews."
    },
    "schema": "marketplace_hourly_liquidity",
    "challenge": {
      "instruction": "Compute total_drivers, total_requests, and liquidity_ratio for each zone_name where hour_of_day is between 17 and 20, ordered by liquidity_ratio ascending.",
      "template": "SELECT zone_name,\n  SUM(available_drivers) AS total_drivers,\n  SUM(ride_requests) AS total_requests,\n  ROUND(SUM(available_drivers) * 1.0 / NULLIF(SUM(ride_requests), 0), 2) AS liquidity_ratio\nFROM marketplace_hourly_liquidity\nWHERE hour_of_day BETWEEN 17 AND 20\nGROUP BY ___1___\nORDER BY liquidity_ratio ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Grouping Dimension",
          "answer": "zone_name",
          "options": [
            "zone_name",
            "zone_id",
            "hour_of_day",
            "liquidity_ratio"
          ]
        },
        {
          "id": 2,
          "label": "Sort Direction",
          "answer": "ASC",
          "options": [
            "ASC",
            "DESC",
            "LIMIT",
            "OVER"
          ]
        }
      ],
      "expectedSql": "SELECT zone_name, SUM(available_drivers) AS total_drivers, SUM(ride_requests) AS total_requests, ROUND(SUM(available_drivers) * 1.0 / NULLIF(SUM(ride_requests), 0), 2) AS liquidity_ratio FROM marketplace_hourly_liquidity WHERE hour_of_day BETWEEN 17 AND 20 GROUP BY zone_name ORDER BY liquidity_ratio ASC;",
      "managerReview": "Crucial discovery! Lower East Side plunged to a 0.28 liquidity ratio with 2,400 requests against only 672 drivers. The Surge engine has activated."
    }
  },
  {
    "day": 2,
    "week": 1,
    "phase": "Week 1: Marketplace Imbalance & H3 Logistics",
    "title": "Day 02: Dynamic Surge Multiplier Invariant & Rider Conversion Elasticity",
    "sender": "Sarah Lin",
    "senderRole": "L5 Dispatch Operations Lead",
    "senderAvatar": "👩‍💼",
    "priority": "P1 - High Urgency",
    "department": "Real-Time Pricing & Surge Engine",
    "slackMessage": "Surge multipliers range from 1.0x (normal fare) to 3.5x during storms. Marketing claims riders stop booking when surge exceeds 2.2x. Query ride quote requests to compute the conversion rate: percentage of quotes accepted by riders grouped by surge multiplier bracket (1.0x, 1.1-1.5x, 1.6-2.0x, 2.1x+).",
    "contextReport": {
      "businessWhy": "Surge pricing serves two simultaneous economic goals: rationing scarce supply to riders who value it most while attracting additional drivers onto the road. Finding the exact price elasticity tipping point prevents demand destruction.",
      "learningFocus": [
        "Multi-tier bracket categorization with `CASE WHEN`",
        "Acceptance rate ratio calculation: `ROUND(100.0 * SUM(accepted) / COUNT(*), 1) AS accept_rate_pct`",
        "Price elasticity modeling in SQL"
      ],
      "sampleSchema": "ride_quotes (\n  quote_id VARCHAR(36) PRIMARY KEY,\n  rider_id VARCHAR(20),\n  surge_multiplier DECIMAL(3,1),\n  accepted INT -- 1 if rider booked, 0 if abandoned\n)",
      "realWorldTrap": "Don't group on continuous surge_multiplier floats directly, or you will get hundreds of single-row groups like 1.23x and 1.24x. Always bucket into discrete operational tiers.",
      "interviewRelevance": "Dynamic pricing, price elasticity curves, and conversion binning are classic ride-hailing interview scenarios."
    },
    "schema": "ride_quotes",
    "challenge": {
      "instruction": "Categorize surge_multiplier into '1.0x Base', '1.1-1.5x Moderate', '1.6-2.0x High', and '2.1x+ Extreme' as surge_tier. Calculate total quotes and accept_rate_pct.",
      "template": "SELECT\n  CASE\n    WHEN surge_multiplier = 1.0 THEN '1.0x Base'\n    WHEN surge_multiplier <= 1.5 THEN '1.1-1.5x Moderate'\n    WHEN surge_multiplier <= 2.0 THEN '1.6-2.0x High'\n    ELSE '2.1x+ Extreme'\n  END AS surge_tier,\n  COUNT(*) AS total_quotes,\n  ROUND(100.0 * SUM(accepted) / COUNT(*), 1) AS accept_rate_pct\nFROM ride_quotes\nGROUP BY ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Grouping Expression",
          "answer": "surge_tier",
          "options": [
            "surge_tier",
            "surge_multiplier",
            "quote_id",
            "accepted"
          ]
        }
      ],
      "expectedSql": "SELECT CASE WHEN surge_multiplier = 1.0 THEN '1.0x Base' WHEN surge_multiplier <= 1.5 THEN '1.1-1.5x Moderate' WHEN surge_multiplier <= 2.0 THEN '1.6-2.0x High' ELSE '2.1x+ Extreme' END AS surge_tier, COUNT(*) AS total_quotes, ROUND(100.0 * SUM(accepted) / COUNT(*), 1) AS accept_rate_pct FROM ride_quotes GROUP BY surge_tier;",
      "managerReview": "Clear empirical cliff: Base fares convert at 78.4%, while 2.1x+ Extreme plunges to 26.1%. Pricing algorithms will cap regional surge steps accordingly."
    }
  },
  {
    "day": 3,
    "week": 1,
    "phase": "Week 1: Marketplace Imbalance & H3 Logistics",
    "title": "Day 03: Geospatial Hexagon H3 Spatial Resolution Aggregations",
    "sender": "Rajesh Narayanan",
    "senderRole": "L6 Staff Marketplace Data Scientist",
    "senderAvatar": "👨‍💻",
    "priority": "P2 - Sprint",
    "department": "Global Mobility & Marketplace Dynamics",
    "slackMessage": "Uber partitions the entire globe into hexagonal cells using our open-source H3 library. For San Francisco resolution-8 hexagons (h3_res8), find hexagons with over 500 completed trips yesterday and calculate their average trip distance in miles and average fare.",
    "contextReport": {
      "businessWhy": "Hexagonal grids solve the distortion and neighbor adjacency problems of square latitude/longitude grids: every hexagon has exactly 6 neighbors at identical distances, enabling smooth spatial smoothing and dispatch radii.",
      "learningFocus": [
        "Geospatial cell indexing with H3 identifiers",
        "Filtering aggregated spatial clusters using `HAVING COUNT(*) > 500`",
        "Multi-metric dimensional aggregation (`AVG(distance_miles)`, `AVG(total_fare_usd)`)"
      ],
      "sampleSchema": "trip_hex_events (\n  trip_id VARCHAR(36) PRIMARY KEY,\n  pickup_h3_index VARCHAR(16),\n  distance_miles DECIMAL(5,2),\n  total_fare_usd DECIMAL(6,2)\n)",
      "realWorldTrap": "Don't mix resolutions! H3 resolution 7 cells (~1.2 km edges) have 7x the area of resolution 8 cells (~460m edges). Always verify your index strings belong to identical resolution levels.",
      "interviewRelevance": "H3 spatial partitioning, spatial indexing, and geohash aggregation are universally asked at Uber, Lyft, and Delivery Hero."
    },
    "schema": "trip_hex_events",
    "challenge": {
      "instruction": "For each pickup_h3_index, compute total_trips, avg_distance_miles (rounded to 1 decimal), and avg_fare_usd (rounded to 2 decimals) where total_trips > 500.",
      "template": "SELECT pickup_h3_index,\n  COUNT(*) AS total_trips,\n  ROUND(AVG(distance_miles), 1) AS avg_distance_miles,\n  ROUND(AVG(total_fare_usd), 2) AS avg_fare_usd\nFROM trip_hex_events\nGROUP BY pickup_h3_index\nHAVING COUNT(*) ___1___ ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Comparison Operator",
          "answer": ">",
          "options": [
            ">",
            "<",
            "=",
            ">="
          ]
        },
        {
          "id": 2,
          "label": "Trip Volume Threshold",
          "answer": "500",
          "options": [
            "500",
            "100",
            "1000",
            "50"
          ]
        }
      ],
      "expectedSql": "SELECT pickup_h3_index, COUNT(*) AS total_trips, ROUND(AVG(distance_miles), 1) AS avg_distance_miles, ROUND(AVG(total_fare_usd), 2) AS avg_fare_usd FROM trip_hex_events GROUP BY pickup_h3_index HAVING COUNT(*) > 500;",
      "managerReview": "Identified top demand hexagons centered around SFO Airport (`8828308281fffff`) and Financial District (`882830829bfffff`) with heavy commercial volume."
    }
  },
  {
    "day": 4,
    "week": 1,
    "phase": "Week 1: Marketplace Imbalance & H3 Logistics",
    "title": "Day 04: Estimated Time of Arrival (ETA) Prediction Error & P90 Latency",
    "sender": "Rajesh Narayanan",
    "senderRole": "L6 Staff Marketplace Data Scientist",
    "senderAvatar": "👨‍💻",
    "priority": "P1 - Critical QoE",
    "department": "Routing, Maps & ETA Intelligence",
    "slackMessage": "Riders get frustrated when the app promises an ETA of 4 minutes but the driver takes 12 minutes to arrive. Calculate the ETA prediction error: `actual_pickup_mins - predicted_eta_mins`. Find the percentage of trips where the driver arrived more than 3 minutes late, grouped by city.",
    "contextReport": {
      "businessWhy": "ETA accuracy is Uber's primary trust metric. If ETAs are systematically underestimated, riders cancel while waiting; if overestimated, riders choose competitors.",
      "learningFocus": [
        "Prediction error deviation calculation: `actual - predicted`",
        "Threshold breach rate computation: `ROUND(100.0 * COUNT(CASE WHEN (actual - predicted) > 3 THEN 1 END) / COUNT(*), 1)`",
        "City-level performance benchmark comparison"
      ],
      "sampleSchema": "eta_dispatch_records (\n  dispatch_id VARCHAR(36) PRIMARY KEY,\n  city_name VARCHAR(30),\n  predicted_eta_mins INT,\n  actual_pickup_mins INT\n)",
      "realWorldTrap": "Don't take the average of absolute errors (MAE) without also inspecting directional bias! If the mean error is 0, the model could still be 5 minutes late half the time and 5 minutes early half the time.",
      "interviewRelevance": "Machine learning model evaluation and prediction error telemetry in SQL are essential for ML platform roles."
    },
    "schema": "eta_dispatch_records",
    "challenge": {
      "instruction": "For each city_name, calculate total_dispatches, avg_error_mins (rounded to 1 decimal), and late_pct (percentage of trips where actual - predicted > 3 mins).",
      "template": "SELECT city_name,\n  COUNT(*) AS total_dispatches,\n  ROUND(AVG(actual_pickup_mins - predicted_eta_mins), 1) AS avg_error_mins,\n  ROUND(100.0 * COUNT(CASE WHEN (actual_pickup_mins - predicted_eta_mins) > 3 THEN 1 END) / COUNT(*), 1) AS late_pct\nFROM eta_dispatch_records\nGROUP BY ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Grouping Column",
          "answer": "city_name",
          "options": [
            "city_name",
            "dispatch_id",
            "predicted_eta_mins",
            "late_pct"
          ]
        }
      ],
      "expectedSql": "SELECT city_name, COUNT(*) AS total_dispatches, ROUND(AVG(actual_pickup_mins - predicted_eta_mins), 1) AS avg_error_mins, ROUND(100.0 * COUNT(CASE WHEN (actual_pickup_mins - predicted_eta_mins) > 3 THEN 1 END) / COUNT(*), 1) AS late_pct FROM eta_dispatch_records GROUP BY city_name;",
      "managerReview": "Chicago had a 21.4% late rate due to unexpected bridge maintenance along the river. Map Routing weights have been dynamically updated."
    }
  },
  {
    "day": 5,
    "week": 1,
    "phase": "Week 1: Marketplace Imbalance & H3 Logistics",
    "title": "Day 05: Unfulfilled Ride Requests (Zero-Driver Dispatch Bounces)",
    "sender": "Sarah Lin",
    "senderRole": "L5 Dispatch Operations Lead",
    "senderAvatar": "👩‍💼",
    "priority": "P1 - High Urgency",
    "department": "Global Mobility & Marketplace Dynamics",
    "slackMessage": "An 'Unfulfilled Request' occurs when a rider requests a trip but no driver accepts within 120 seconds or the rider cancels after seeing 'No Cars Available'. Query dispatch logs: compute the unfulfilled bounce rate for each vehicle product ('UberX', 'Uber Comfort', 'Uber Black', 'UberXL').",
    "contextReport": {
      "businessWhy": "Unfulfilled rides represent pure lost Gross Bookings and driver revenue. When Uber Black has high unfulfilled rates, high-margin executive riders switch to black car services.",
      "learningFocus": [
        "Unfulfilled rate metric: `ROUND(100.0 * SUM(CASE WHEN status = 'UNFULFILLED' THEN 1 ELSE 0 END) / COUNT(*), 2) AS bounce_rate_pct`",
        "Product tier aggregation",
        "Sorting by highest defect rate descending"
      ],
      "sampleSchema": "ride_dispatch_outcomes (\n  request_id VARCHAR(36) PRIMARY KEY,\n  product_tier VARCHAR(30),\n  status VARCHAR(20) -- 'COMPLETED', 'CANCELLED', 'UNFULFILLED'\n)",
      "realWorldTrap": "Don't count user cancellations after a driver was already on their way as unfulfilled requests! Only count requests that timed out without finding a match.",
      "interviewRelevance": "Classifying dispatch status outcomes and computing loss rates is a signature ride-sharing interview problem."
    },
    "schema": "ride_dispatch_outcomes",
    "challenge": {
      "instruction": "Compute total_requests, unfulfilled_count, and bounce_rate_pct for each product_tier, ordered by bounce_rate_pct DESC.",
      "template": "SELECT product_tier,\n  COUNT(*) AS total_requests,\n  SUM(CASE WHEN status = 'UNFULFILLED' THEN 1 ELSE 0 END) AS unfulfilled_count,\n  ROUND(100.0 * SUM(CASE WHEN status = 'UNFULFILLED' THEN 1 ELSE 0 END) / COUNT(*), 2) AS bounce_rate_pct\nFROM ride_dispatch_outcomes\nGROUP BY ___1___\nORDER BY bounce_rate_pct ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Product Dimension",
          "answer": "product_tier",
          "options": [
            "product_tier",
            "status",
            "request_id",
            "unfulfilled_count"
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
      "expectedSql": "SELECT product_tier, COUNT(*) AS total_requests, SUM(CASE WHEN status = 'UNFULFILLED' THEN 1 ELSE 0 END) AS unfulfilled_count, ROUND(100.0 * SUM(CASE WHEN status = 'UNFULFILLED' THEN 1 ELSE 0 END) / COUNT(*), 2) AS bounce_rate_pct FROM ride_dispatch_outcomes GROUP BY product_tier ORDER BY bounce_rate_pct DESC;",
      "managerReview": "UberXL showed an 8.4% bounce rate during airport holiday surges, prompting a targeted driver incentive campaign to bring 7-seat SUVs online."
    }
  },
  {
    "day": 6,
    "week": 1,
    "phase": "Week 1: Marketplace Imbalance & H3 Logistics",
    "title": "Day 06: Airport Queue FIFO Dispatch vs Curb Dwell Time Penalties",
    "sender": "Carlos Mendes",
    "senderRole": "L7 VP of Mobility Engineering",
    "senderAvatar": "👨‍💼",
    "priority": "P1 - Regulatory & Airport Operations",
    "department": "Airport & Transit Hub Infrastructure",
    "slackMessage": "Airport holding lots operate on a First-In, First-Out (FIFO) queue virtual staging system. If a driver waits in the lot for over 45 minutes, airport authorities penalize Uber for congestion. Calculate the average queue wait time in minutes and the count of drivers waiting > 45 mins at JFK, LAX, and ORD airports.",
    "contextReport": {
      "businessWhy": "Airports generate up to 15% of Uber's global Gross Bookings. Balancing staging lot queue times prevents airport ground transportation fines and keeps drivers earning rather than idling.",
      "learningFocus": [
        "Time duration aggregations in minutes: `ROUND(AVG(dwell_minutes), 1)`",
        "Threshold breach counting: `COUNT(CASE WHEN dwell_minutes > 45 THEN 1 END)`",
        "Airport hub segmentation with `WHERE airport_code IN ('JFK', 'LAX', 'ORD')`"
      ],
      "sampleSchema": "airport_queue_logs (\n  queue_id VARCHAR(36) PRIMARY KEY,\n  airport_code VARCHAR(3),\n  driver_id VARCHAR(20),\n  dwell_minutes INT\n)",
      "realWorldTrap": "Don't forget that airport FIFO queues re-prioritize drivers who get cancelled on through no fault of their own ('Queue Bump Protection'). Exclude bumped drivers from dwell penalty tallies.",
      "interviewRelevance": "Operational queue analytics and regulatory compliance queries are prominent in logistics data engineering."
    },
    "schema": "airport_queue_logs",
    "challenge": {
      "instruction": "Compute total_drivers, avg_wait_mins, and excessive_wait_count (wait > 45 mins) for 'JFK', 'LAX', and 'ORD'.",
      "template": "SELECT airport_code,\n  COUNT(*) AS total_drivers,\n  ROUND(AVG(dwell_minutes), 1) AS avg_wait_mins,\n  COUNT(CASE WHEN dwell_minutes > 45 THEN 1 END) AS excessive_wait_count\nFROM airport_queue_logs\nWHERE airport_code IN ('JFK', 'LAX', 'ORD')\nGROUP BY ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Airport Dimension",
          "answer": "airport_code",
          "options": [
            "airport_code",
            "driver_id",
            "dwell_minutes",
            "total_drivers"
          ]
        }
      ],
      "expectedSql": "SELECT airport_code, COUNT(*) AS total_drivers, ROUND(AVG(dwell_minutes), 1) AS avg_wait_mins, COUNT(CASE WHEN dwell_minutes > 45 THEN 1 END) AS excessive_wait_count FROM airport_queue_logs WHERE airport_code IN ('JFK', 'LAX', 'ORD') GROUP BY airport_code;",
      "managerReview": "JFK had 340 drivers waiting over 45 minutes during evening flight delays. Dispatch introduced Rematch algorithms allowing arriving drivers to pick up departing passengers immediately."
    }
  },
  {
    "day": 7,
    "week": 1,
    "phase": "Week 1: Marketplace Imbalance & H3 Logistics",
    "title": "Day 07: Week 1 Executive Marketplace Health & Dispatch Scorecard",
    "sender": "Rajesh Narayanan",
    "senderRole": "L6 Staff Marketplace Data Scientist",
    "senderAvatar": "👨‍💻",
    "priority": "P2 - Executive Briefing",
    "department": "Global Mobility & Marketplace Dynamics",
    "slackMessage": "End of Week 1! We're delivering our weekly marketplace scorecard to Dara and the Mobility leadership team. Compile a single summary row: total completed trips, total gross bookings in USD, platform take-rate percentage, and distinct active drivers.",
    "contextReport": {
      "businessWhy": "The weekly marketplace health scorecard tracks core operational efficiency across our two-sided ecosystem: volume of trips, Gross Bookings (GB), driver earnings, and platform net revenue take-rate.",
      "learningFocus": [
        "Executive KPI rollups in a single projection",
        "Take-rate percentage arithmetic: `ROUND(100.0 * (SUM(gross_fare_usd) - SUM(driver_payout_usd)) / SUM(gross_fare_usd), 2)`",
        "Unique entity counting with `COUNT(DISTINCT driver_id)`"
      ],
      "sampleSchema": "weekly_marketplace_rollups (\n  trip_id VARCHAR(36) PRIMARY KEY,\n  driver_id VARCHAR(20),\n  gross_fare_usd DECIMAL(7,2),\n  driver_payout_usd DECIMAL(7,2)\n)",
      "realWorldTrap": "Never compute take rate by averaging individual trip take-rates! Average of percentages produces mathematical distortion.",
      "interviewRelevance": "Gross bookings and net revenue take-rate rollups are the core financial metrics for all platform marketplace businesses."
    },
    "schema": "weekly_marketplace_rollups",
    "challenge": {
      "instruction": "Calculate total_trips, distinct_drivers, total_gross_bookings, and take_rate_pct across the entire dataset.",
      "template": "SELECT\n  COUNT(trip_id) AS total_trips,\n  COUNT(DISTINCT driver_id) AS distinct_drivers,\n  ROUND(SUM(gross_fare_usd), 2) AS total_gross_bookings,\n  ROUND(100.0 * (SUM(gross_fare_usd) - SUM(driver_payout_usd)) / ___1___, 2) AS take_rate_pct\nFROM weekly_marketplace_rollups;",
      "blanks": [
        {
          "id": 1,
          "label": "Take-Rate Denominator",
          "answer": "SUM(gross_fare_usd)",
          "options": [
            "SUM(gross_fare_usd)",
            "SUM(driver_payout_usd)",
            "COUNT(*)",
            "100.0"
          ]
        }
      ],
      "expectedSql": "SELECT COUNT(trip_id) AS total_trips, COUNT(DISTINCT driver_id) AS distinct_drivers, ROUND(SUM(gross_fare_usd), 2) AS total_gross_bookings, ROUND(100.0 * (SUM(gross_fare_usd) - SUM(driver_payout_usd)) / SUM(gross_fare_usd), 2) AS take_rate_pct FROM weekly_marketplace_rollups;",
      "managerReview": "Week 1 cleared with distinction! 1.48M trips completed with a 23.4% healthy platform take-rate. Promoted to L4 Confirmed Marketplace Analyst!"
    }
  },
  {
    "day": 8,
    "week": 2,
    "phase": "Week 2: Driver Supply Liquidity & Batch Pooling",
    "title": "Day 08: Driver Idle Utilization Rate (P1, P2, P3 Hours Decomposition)",
    "sender": "Sarah Lin",
    "senderRole": "L5 Dispatch Operations Lead",
    "senderAvatar": "👩‍💼",
    "priority": "P2 - Sprint",
    "department": "Earner Productivity & Vehicle Supply",
    "slackMessage": "Driver time is split into three phases: P1 (App online, waiting for match), P2 (En route to pickup), and P3 (On trip with rider). Calculate the driver utilization rate: `(P2 + P3) / (P1 + P2 + P3)` for each city. If utilization drops below 55%, drivers earn less per hour and sign off.",
    "contextReport": {
      "businessWhy": "Driver partner retention hinges on hourly gross earnings. When drivers spend 45% of their time idling in P1 without matches, effective hourly pay plummets, causing supply to contract.",
      "learningFocus": [
        "Time decomposition ratios: `ROUND(100.0 * SUM(p2_mins + p3_mins) / NULLIF(SUM(p1_mins + p2_mins + p3_mins), 0), 1) AS utilization_pct`",
        "Division safety with `NULLIF`",
        "Multi-metric duration aggregation"
      ],
      "sampleSchema": "driver_shift_durations (\n  shift_id VARCHAR(36) PRIMARY KEY,\n  driver_id VARCHAR(20),\n  city_name VARCHAR(30),\n  p1_mins INT,\n  p2_mins INT,\n  p3_mins INT\n)",
      "realWorldTrap": "Don't count drivers who left their phone online while sleeping at home! Filter out outlier shifts where P1 > 300 minutes with zero completed trips.",
      "interviewRelevance": "P1/P2/P3 driver state decomposition is the industry standard operational metric across rideshare and food delivery."
    },
    "schema": "driver_shift_durations",
    "challenge": {
      "instruction": "Compute total_online_hours as ROUND(SUM(p1_mins + p2_mins + p3_mins) / 60.0, 1), and utilization_pct for each city_name.",
      "template": "SELECT city_name,\n  ROUND(SUM(p1_mins + p2_mins + p3_mins) / 60.0, 1) AS total_online_hours,\n  ROUND(100.0 * SUM(p2_mins + p3_mins) / NULLIF(SUM(p1_mins + p2_mins + p3_mins), 0), 1) AS utilization_pct\nFROM driver_shift_durations\nGROUP BY ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "City Dimension",
          "answer": "city_name",
          "options": [
            "city_name",
            "driver_id",
            "shift_id",
            "utilization_pct"
          ]
        }
      ],
      "expectedSql": "SELECT city_name, ROUND(SUM(p1_mins + p2_mins + p3_mins) / 60.0, 1) AS total_online_hours, ROUND(100.0 * SUM(p2_mins + p3_mins) / NULLIF(SUM(p1_mins + p2_mins + p3_mins), 0), 1) AS utilization_pct FROM driver_shift_durations GROUP BY city_name;",
      "managerReview": "New York achieved a peak 71.2% utilization, while suburban Phoenix lagged at 48.3%. Supply rebalancing incentives dispatched."
    }
  },
  {
    "day": 9,
    "week": 2,
    "phase": "Week 2: Driver Supply Liquidity & Batch Pooling",
    "title": "Day 09: UberX Share / UberPool Route Detour Overlap Efficiency",
    "sender": "Rajesh Narayanan",
    "senderRole": "L6 Staff Marketplace Data Scientist",
    "senderAvatar": "👨‍💻",
    "priority": "P2 - Sprint",
    "department": "Shared Rides & Route Batching",
    "slackMessage": "For UberX Share rides, two riders going in the same direction are matched into one car. If a detour adds more than 8 minutes to Rider A's trip, rider dissatisfaction spikes. Calculate the average detour minutes: `shared_duration_mins - direct_duration_mins` and find the percentage of shared rides with detour > 8 minutes.",
    "contextReport": {
      "businessWhy": "Shared rides increase vehicle seat utilization, lower passenger fares, and reduce urban carbon emissions. However, excessive detours trigger rider cancellations and bad ratings.",
      "learningFocus": [
        "Detour penalty arithmetic: `shared_duration - direct_duration`",
        "Threshold breach rate: `ROUND(100.0 * COUNT(CASE WHEN (shared_duration_mins - direct_duration_mins) > 8 THEN 1 END) / COUNT(*), 1)`",
        "Grouping by metro market"
      ],
      "sampleSchema": "shared_ride_matches (\n  match_id VARCHAR(36) PRIMARY KEY,\n  market_id VARCHAR(20),\n  direct_duration_mins INT,\n  shared_duration_mins INT\n)",
      "realWorldTrap": "Ensure `shared_duration_mins >= direct_duration_mins`! In rare data anomalies where a driver skips traffic via an HOV lane, shared duration could theoretically be shorter.",
      "interviewRelevance": "Route batching algorithms and detour penalty metrics are favorite technical interview topics for logistics quants."
    },
    "schema": "shared_ride_matches",
    "challenge": {
      "instruction": "Compute total_matches, avg_detour_mins, and excessive_detour_pct (>8 mins) for each market_id.",
      "template": "SELECT market_id,\n  COUNT(*) AS total_matches,\n  ROUND(AVG(shared_duration_mins - direct_duration_mins), 1) AS avg_detour_mins,\n  ROUND(100.0 * COUNT(CASE WHEN (shared_duration_mins - direct_duration_mins) > 8 THEN 1 END) / COUNT(*), 1) AS excessive_detour_pct\nFROM shared_ride_matches\nGROUP BY ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Market Dimension",
          "answer": "market_id",
          "options": [
            "market_id",
            "match_id",
            "direct_duration_mins",
            "excessive_detour_pct"
          ]
        }
      ],
      "expectedSql": "SELECT market_id, COUNT(*) AS total_matches, ROUND(AVG(shared_duration_mins - direct_duration_mins), 1) AS avg_detour_mins, ROUND(100.0 * COUNT(CASE WHEN (shared_duration_mins - direct_duration_mins) > 8 THEN 1 END) / COUNT(*), 1) AS excessive_detour_pct FROM shared_ride_matches GROUP BY market_id;",
      "managerReview": "Found that 14.2% of Boston shared rides exceeded the 8-minute detour cap. Matching radius tightened from 1.5 miles to 0.8 miles."
    }
  },
  {
    "day": 10,
    "week": 2,
    "phase": "Week 2: Driver Supply Liquidity & Batch Pooling",
    "title": "Day 10: Driver Incentive Quest Progression & Milestone Bonus Elasticity",
    "sender": "Sarah Lin",
    "senderRole": "L5 Dispatch Operations Lead",
    "senderAvatar": "👩‍💼",
    "priority": "P2 - Sprint",
    "department": "Earner Incentives & Promotions",
    "slackMessage": "Weekend Quests reward drivers (e.g., 'Complete 40 trips for a $120 bonus'). Drivers who reach 38 trips often push hard to complete the final 2 trips. Calculate the completion rate: percentage of drivers who enrolled in the 40-trip quest that reached the goal.",
    "contextReport": {
      "businessWhy": "Driver incentives represent hundreds of millions in quarterly spend. Milestone quests exploit the 'goal-gradient effect', increasing driver supply on Sunday evenings when driver fatigue typically sets in.",
      "learningFocus": [
        "Goal achievement percentage: `ROUND(100.0 * COUNT(CASE WHEN completed_trips >= target_trips THEN 1 END) / COUNT(*), 1) AS quest_completion_pct`",
        "Target vs actual milestone comparison",
        "Cohort grouping by target tier"
      ],
      "sampleSchema": "driver_quest_cohorts (\n  enrollment_id VARCHAR(36) PRIMARY KEY,\n  driver_id VARCHAR(20),\n  quest_tier VARCHAR(20),\n  target_trips INT,\n  completed_trips INT,\n  bonus_payout_usd DECIMAL(6,2)\n)",
      "realWorldTrap": "Don't count drivers who completed 40 trips *after* the Sunday 11:59 PM deadline! Trips must be filtered to the eligible promotion time window.",
      "interviewRelevance": "Evaluating promotional elasticity and milestone incentives is core to growth and driver ops analytics."
    },
    "schema": "driver_quest_cohorts",
    "challenge": {
      "instruction": "For each quest_tier, calculate total_enrolled, total_completed, and quest_completion_pct, ordered by target_trips ASC.",
      "template": "SELECT quest_tier, target_trips,\n  COUNT(*) AS total_enrolled,\n  COUNT(CASE WHEN completed_trips >= target_trips THEN 1 END) AS total_completed,\n  ROUND(100.0 * COUNT(CASE WHEN completed_trips >= target_trips THEN 1 END) / COUNT(*), 1) AS quest_completion_pct\nFROM driver_quest_cohorts\nGROUP BY quest_tier, target_trips\nORDER BY target_trips ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Sort Direction",
          "answer": "ASC",
          "options": [
            "ASC",
            "DESC",
            "LIMIT",
            "OVER"
          ]
        }
      ],
      "expectedSql": "SELECT quest_tier, target_trips, COUNT(*) AS total_enrolled, COUNT(CASE WHEN completed_trips >= target_trips THEN 1 END) AS total_completed, ROUND(100.0 * COUNT(CASE WHEN completed_trips >= target_trips THEN 1 END) / COUNT(*), 1) AS quest_completion_pct FROM driver_quest_cohorts GROUP BY quest_tier, target_trips ORDER BY target_trips ASC;",
      "managerReview": "The 30-Trip tier achieved a 64.1% completion rate, while the 60-Trip tier achieved 38.2%. Provided essential supply during torrential rain."
    }
  },
  {
    "day": 11,
    "week": 2,
    "phase": "Week 2: Driver Supply Liquidity & Batch Pooling",
    "title": "Day 11: Consecutive Trip Streak Breaks & Acceptance Gaps (Gaps & Islands)",
    "sender": "Rajesh Narayanan",
    "senderRole": "L6 Staff Marketplace Data Scientist",
    "senderAvatar": "👨‍💻",
    "priority": "P1 - Advanced SQL",
    "department": "Global Mobility & Marketplace Dynamics",
    "slackMessage": "'Consecutive Trip Promotions' pay bonuses if a driver accepts 3 trips in a row without declining or going offline. Using `LAG()` over window partitioned by driver_id and shift_date, compute the time gap in minutes between consecutive accepted dispatches.",
    "contextReport": {
      "businessWhy": "Consecutive trip streaks lock driver supply into our platform, preventing drivers from multi-apping with Lyft or DoorDash during critical surge windows.",
      "learningFocus": [
        "Window analytic ordering: `LAG(dropoff_time) OVER (PARTITION BY driver_id ORDER BY pickup_time)`",
        "Epoch minutes calculation between consecutive events",
        "Isolating dispatch gaps to identify cherry-picking behavior"
      ],
      "sampleSchema": "driver_consecutive_trips (\n  trip_id VARCHAR(36) PRIMARY KEY,\n  driver_id VARCHAR(20),\n  pickup_time TIMESTAMP,\n  dropoff_time TIMESTAMP\n)",
      "realWorldTrap": "Don't omit `PARTITION BY driver_id`! If you order by pickup_time alone, Driver A's dropoff will be compared to Driver B's pickup in a completely different city.",
      "interviewRelevance": "Gaps & Islands window functions are among the highest-weight technical evaluation criteria for Staff data roles."
    },
    "schema": "driver_consecutive_trips",
    "challenge": {
      "instruction": "Use LAG() to compute dispatch_gap_mins between previous dropoff_time and current pickup_time for each driver.",
      "template": "SELECT driver_id, trip_id, pickup_time,\n  ROUND((JULIANDAY(pickup_time) - JULIANDAY(LAG(dropoff_time) OVER (PARTITION BY ___1___ ORDER BY pickup_time))) * 1440, 1) AS dispatch_gap_mins\nFROM driver_consecutive_trips;",
      "blanks": [
        {
          "id": 1,
          "label": "Partition Key",
          "answer": "driver_id",
          "options": [
            "driver_id",
            "trip_id",
            "pickup_time",
            "dropoff_time"
          ]
        }
      ],
      "expectedSql": "SELECT driver_id, trip_id, pickup_time, ROUND((JULIANDAY(pickup_time) - JULIANDAY(LAG(dropoff_time) OVER (PARTITION BY driver_id ORDER BY pickup_time))) * 1440, 1) AS dispatch_gap_mins FROM driver_consecutive_trips;",
      "managerReview": "Average dispatch gap during streak promotions dropped to 3.8 minutes! Drivers accepted immediate back-to-back rides without hesitation."
    }
  },
  {
    "day": 12,
    "week": 2,
    "phase": "Week 2: Driver Supply Liquidity & Batch Pooling",
    "title": "Day 12: Driver Churn Leading Indicators (Declining Acceptance Velocity)",
    "sender": "Sarah Lin",
    "senderRole": "L5 Dispatch Operations Lead",
    "senderAvatar": "👩‍💼",
    "priority": "P2 - Sprint",
    "department": "Earner Productivity & Vehicle Supply",
    "slackMessage": "When drivers are about to churn, their offer acceptance rate declines over two consecutive weeks. Compare week_1_accept_pct vs week_2_accept_pct for active drivers. Identify drivers whose acceptance rate dropped by more than 20 percentage points.",
    "contextReport": {
      "businessWhy": "Driver acquisition costs up to $800 per driver in marketing and background checks. Retaining an experienced driver partner with targeted support is 5x cheaper than onboarding a new replacement.",
      "learningFocus": [
        "Week-over-week metric delta: `week_1_rate - week_2_rate > 20.0`",
        "Threshold filtering on churn risk flags",
        "Driver partner lifecycle monitoring"
      ],
      "sampleSchema": "driver_weekly_acceptance (\n  driver_id VARCHAR(20) PRIMARY KEY,\n  city_name VARCHAR(30),\n  week_1_accept_pct DECIMAL(5,2),\n  week_2_accept_pct DECIMAL(5,2)\n)",
      "realWorldTrap": "Don't flag drivers who only did 2 trips in Week 2! Low sample size creates erratic percentages. Require minimum trip volume thresholds before computing rate deltas.",
      "interviewRelevance": "Churn leading indicator detection using comparative metric deltas is tested across all gig-economy platforms."
    },
    "schema": "driver_weekly_acceptance",
    "challenge": {
      "instruction": "Find driver_id and city_name where (week_1_accept_pct - week_2_accept_pct) >= 20.0, ordered by delta descending.",
      "template": "SELECT driver_id, city_name,\n  week_1_accept_pct, week_2_accept_pct,\n  ROUND(week_1_accept_pct - week_2_accept_pct, 1) AS accept_rate_drop\nFROM driver_weekly_acceptance\nWHERE (week_1_accept_pct - week_2_accept_pct) ___1___ ___2___\nORDER BY accept_rate_drop DESC;",
      "blanks": [
        {
          "id": 1,
          "label": "Comparison Operator",
          "answer": ">=",
          "options": [
            ">=",
            "<=",
            "=",
            "!="
          ]
        },
        {
          "id": 2,
          "label": "Drop Threshold",
          "answer": "20.0",
          "options": [
            "20.0",
            "10.0",
            "50.0",
            "5.0"
          ]
        }
      ],
      "expectedSql": "SELECT driver_id, city_name, week_1_accept_pct, week_2_accept_pct, ROUND(week_1_accept_pct - week_2_accept_pct, 1) AS accept_rate_drop FROM driver_weekly_acceptance WHERE (week_1_accept_pct - week_2_accept_pct) >= 20.0 ORDER BY accept_rate_drop DESC;",
      "managerReview": "Identified 420 drivers experiencing severe acceptance drops in Miami. Earner Operations triggered outreach to address vehicle maintenance issues."
    }
  },
  {
    "day": 13,
    "week": 2,
    "phase": "Week 2: Driver Supply Liquidity & Batch Pooling",
    "title": "Day 13: Delivery (Uber Eats) vs Mobility (Rides) Dual-Earning Cross-Dispatch",
    "sender": "Rajesh Narayanan",
    "senderRole": "L6 Staff Marketplace Data Scientist",
    "senderAvatar": "👨‍💻",
    "priority": "P2 - Sprint",
    "department": "Multi-Platform Dispatch & Uber Eats",
    "slackMessage": "During 2 PM - 5 PM lull between lunch and evening commutes, rides demand is slow while grocery and snack delivery stays active. Query drivers enabled for both Rides and Eats: calculate the percentage of total daily earnings earned from Eats vs Rides.",
    "contextReport": {
      "businessWhy": "Dual-earning cross-dispatch is Uber's biggest competitive moat against Lyft (which lacks food delivery). Smoothing driver earnings between meal times and rush hours keeps drivers active throughout the entire 8-hour shift.",
      "learningFocus": [
        "Multi-product revenue split: `ROUND(100.0 * SUM(eats_earnings) / NULLIF(SUM(rides_earnings + eats_earnings), 0), 1) AS eats_share_pct`",
        "Categorical earner classification",
        "Earning distribution analysis"
      ],
      "sampleSchema": "dual_earner_shifts (\n  shift_id VARCHAR(36) PRIMARY KEY,\n  driver_id VARCHAR(20),\n  rides_earnings DECIMAL(7,2),\n  eats_earnings DECIMAL(7,2)\n)",
      "realWorldTrap": "Don't classify a driver as dual-earner if they have $0 Eats earnings all month! Segment into 'Mobility Pure', 'Delivery Pure', and 'True Hybrid'.",
      "interviewRelevance": "Multi-sided platform synergy and cross-vertical revenue allocation are favorite topics for senior product analyst interviews."
    },
    "schema": "dual_earner_shifts",
    "challenge": {
      "instruction": "Compute total_rides_earnings, total_eats_earnings, and eats_share_pct across all dual_earner_shifts.",
      "template": "SELECT\n  ROUND(SUM(rides_earnings), 2) AS total_rides_earnings,\n  ROUND(SUM(eats_earnings), 2) AS total_eats_earnings,\n  ROUND(100.0 * SUM(eats_earnings) / NULLIF(SUM(rides_earnings + eats_earnings), 0), 1) AS eats_share_pct\nFROM dual_earner_shifts;",
      "blanks": [
        {
          "id": 1,
          "label": "Denominator Sum",
          "answer": "SUM(rides_earnings + eats_earnings)",
          "options": [
            "SUM(rides_earnings + eats_earnings)",
            "SUM(rides_earnings)",
            "SUM(eats_earnings)",
            "COUNT(*)"
          ]
        }
      ],
      "expectedSql": "SELECT ROUND(SUM(rides_earnings), 2) AS total_rides_earnings, ROUND(SUM(eats_earnings), 2) AS total_eats_earnings, ROUND(100.0 * SUM(eats_earnings) / NULLIF(SUM(rides_earnings + eats_earnings), 0), 1) AS eats_share_pct FROM dual_earner_shifts;",
      "managerReview": "Dual-earners made 34.2% of their shift earnings from Uber Eats between 1:30 PM and 5:00 PM, increasing their total hourly wage by $4.20/hr!"
    }
  },
  {
    "day": 14,
    "week": 2,
    "phase": "Week 2: Driver Supply Liquidity & Batch Pooling",
    "title": "Day 14: Fleet Vehicle Telemetry: EV Charging Deadhead Mileage Optimization",
    "sender": "Carlos Mendes",
    "senderRole": "L7 VP of Mobility Engineering",
    "senderAvatar": "👨‍💼",
    "priority": "P1 - Sustainability & Fleet",
    "department": "Fleet Operations & Clean Energy",
    "slackMessage": "Uber committed to 100% Zero-Emission vehicles by 2030. When Electric Vehicle (EV) drivers run low on battery, driving to fast-chargers without a passenger is unpaid 'deadhead' mileage. Calculate total deadhead miles and deadhead percentage for EV vs Gas vehicles.",
    "contextReport": {
      "businessWhy": "Deadhead miles waste energy and congest roads. Providing EV drivers with 'Destination Filter' rides heading towards charging stations reduces uncompensated deadhead miles by up to 40%.",
      "learningFocus": [
        "Deadhead percentage metric: `ROUND(100.0 * SUM(deadhead_miles) / SUM(passenger_miles + deadhead_miles), 1) AS deadhead_pct`",
        "Vehicle powertrain segmentation (`powertrain_type IN ('EV', 'GAS', 'HYBRID')`)",
        "Environmental telemetry aggregation"
      ],
      "sampleSchema": "vehicle_trip_telemetry (\n  telemetry_id VARCHAR(36) PRIMARY KEY,\n  powertrain_type VARCHAR(20),\n  passenger_miles DECIMAL(6,2),\n  deadhead_miles DECIMAL(6,2)\n)",
      "realWorldTrap": "Don't divide deadhead miles by passenger miles alone! Deadhead percentage must be calculated against *total* miles (passenger + deadhead).",
      "interviewRelevance": "Operational fleet efficiency, logistics deadhead, and ESG metrics are critical for modern transportation networks."
    },
    "schema": "vehicle_trip_telemetry",
    "challenge": {
      "instruction": "For each powertrain_type, compute total_passenger_miles, total_deadhead_miles, and deadhead_pct, ordered by deadhead_pct ASC.",
      "template": "SELECT powertrain_type,\n  ROUND(SUM(passenger_miles), 1) AS total_passenger_miles,\n  ROUND(SUM(deadhead_miles), 1) AS total_deadhead_miles,\n  ROUND(100.0 * SUM(deadhead_miles) / SUM(passenger_miles + deadhead_miles), 1) AS deadhead_pct\nFROM vehicle_trip_telemetry\nGROUP BY powertrain_type\nORDER BY deadhead_pct ___1___;",
      "blanks": [
        {
          "id": 1,
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
      "expectedSql": "SELECT powertrain_type, ROUND(SUM(passenger_miles), 1) AS total_passenger_miles, ROUND(SUM(deadhead_miles), 1) AS total_deadhead_miles, ROUND(100.0 * SUM(deadhead_miles) / SUM(passenger_miles + deadhead_miles), 1) AS deadhead_pct FROM vehicle_trip_telemetry GROUP BY powertrain_type ORDER BY deadhead_pct ASC;",
      "managerReview": "EV deadhead dropped to 19.4% following our smart charging destination filter rollout! Promoted to L4 Confirmed Marketplace Analyst."
    }
  },
  {
    "day": 15,
    "week": 3,
    "phase": "Week 3: Rider Cancellations, Fraud & Safety",
    "title": "Day 15: Post-Match Rider Cancellation Funnel (< 2 Min Grace Period)",
    "sender": "Sarah Lin",
    "senderRole": "L5 Dispatch Operations Lead",
    "senderAvatar": "👩‍💼",
    "priority": "P2 - Sprint",
    "department": "Rider Experience & Cancellation Policy",
    "slackMessage": "Welcome to Week 3! Riders can cancel for free within a 2-minute grace period after matching. If they cancel after 2 minutes, a $5 fee is charged to compensate the driver. Query rider cancellations: compute the count and percentage of cancellations occurring within 2 minutes vs after 2 minutes.",
    "contextReport": {
      "businessWhy": "Late cancellations strand drivers after they have already driven miles toward the pickup spot. Balancing rider grace periods with driver compensation is essential for driver partner fairness.",
      "learningFocus": [
        "Cancellation window tiering with `CASE WHEN`",
        "Calculating percentage of total cancellations",
        "Filtering on cancelled dispatches"
      ],
      "sampleSchema": "rider_cancellations (\n  cancel_id VARCHAR(36) PRIMARY KEY,\n  trip_id VARCHAR(36),\n  seconds_after_match INT,\n  fee_charged_usd DECIMAL(5,2)\n)",
      "realWorldTrap": "Don't assume `fee_charged_usd > 0` always correlates with > 120 seconds! If the driver was stationary for 5 minutes without moving toward the pickup, the cancellation fee is waived.",
      "interviewRelevance": "Policy threshold analysis and fee split mechanics are frequent business case interview prompts."
    },
    "schema": "rider_cancellations",
    "challenge": {
      "instruction": "Classify seconds_after_match into 'Grace Period (<= 120s)' and 'Fee Eligible (> 120s)' as cancel_bracket. Compute total_cancels and pct_of_cancels using SUM(COUNT(*)) OVER ().",
      "template": "SELECT\n  CASE\n    WHEN seconds_after_match <= 120 THEN 'Grace Period (<= 120s)'\n    ELSE 'Fee Eligible (> 120s)'\n  END AS cancel_bracket,\n  COUNT(*) AS total_cancels,\n  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 1) AS pct_of_cancels\nFROM rider_cancellations\nGROUP BY ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Grouping Expression",
          "answer": "cancel_bracket",
          "options": [
            "cancel_bracket",
            "seconds_after_match",
            "cancel_id",
            "fee_charged_usd"
          ]
        }
      ],
      "expectedSql": "SELECT CASE WHEN seconds_after_match <= 120 THEN 'Grace Period (<= 120s)' ELSE 'Fee Eligible (> 120s)' END AS cancel_bracket, COUNT(*) AS total_cancels, ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 1) AS pct_of_cancels FROM rider_cancellations GROUP BY cancel_bracket;",
      "managerReview": "72.4% of cancellations happen within the 2-minute grace window. Most occur within 30 seconds when riders realize the pickup location was pinned incorrectly."
    }
  },
  {
    "day": 16,
    "week": 3,
    "phase": "Week 3: Rider Cancellations, Fraud & Safety",
    "title": "Day 16: Driver-Initiated Cancellation Audit & Cherry-Picking Detection",
    "sender": "Rajesh Narayanan",
    "senderRole": "L6 Staff Marketplace Data Scientist",
    "senderAvatar": "👨‍💻",
    "priority": "P1 - High Urgency",
    "department": "Marketplace Integrity & Driver Quality",
    "slackMessage": "Some drivers accept trips and then immediately cancel if the ride is too short ('cherry-picking'). Query driver cancellations: identify drivers who cancelled more than 15 trips last week where driver_cancel_rate exceeds 25%.",
    "contextReport": {
      "businessWhy": "Driver cherry-picking ruins the reliability of the Uber network: riders get matched, wait 3 minutes, and then get cancelled on, forcing a re-dispatch cycle that triples their wait time.",
      "learningFocus": [
        "`HAVING` clause filtering on dual aggregated conditions",
        "Cancellation rate calculation: `SUM(cancelled_by_driver) * 1.0 / COUNT(*)`",
        "Outlier detection on bad actors"
      ],
      "sampleSchema": "driver_dispatch_events (\n  event_id VARCHAR(36) PRIMARY KEY,\n  driver_id VARCHAR(20),\n  cancelled_by_driver INT\n)",
      "realWorldTrap": "Don't confuse driver cancellations with rider cancellations! Always verify `cancelled_by = 'DRIVER'`. Penalizing drivers for rider cancellations destroys driver trust.",
      "interviewRelevance": "Marketplace abuse detection and multi-condition HAVING clauses are classic tech interview problems."
    },
    "schema": "driver_dispatch_events",
    "challenge": {
      "instruction": "Find driver_ids with total_dispatches > 20 and cancel_rate_pct > 25.0, ordered by cancel_rate_pct DESC.",
      "template": "SELECT driver_id,\n  COUNT(*) AS total_dispatches,\n  SUM(cancelled_by_driver) AS driver_cancels,\n  ROUND(100.0 * SUM(cancelled_by_driver) / COUNT(*), 1) AS cancel_rate_pct\nFROM driver_dispatch_events\nGROUP BY driver_id\nHAVING COUNT(*) > 20 AND cancel_rate_pct ___1___ ___2___\nORDER BY cancel_rate_pct DESC;",
      "blanks": [
        {
          "id": 1,
          "label": "Comparison Operator",
          "answer": ">",
          "options": [
            ">",
            "<",
            "=",
            ">="
          ]
        },
        {
          "id": 2,
          "label": "Threshold Percent",
          "answer": "25.0",
          "options": [
            "25.0",
            "10.0",
            "50.0",
            "5.0"
          ]
        }
      ],
      "expectedSql": "SELECT driver_id, COUNT(*) AS total_dispatches, SUM(cancelled_by_driver) AS driver_cancels, ROUND(100.0 * SUM(cancelled_by_driver) / COUNT(*), 1) AS cancel_rate_pct FROM driver_dispatch_events GROUP BY driver_id HAVING COUNT(*) > 20 AND cancel_rate_pct > 25.0 ORDER BY cancel_rate_pct DESC;",
      "managerReview": "Found 48 drivers with cancel rates exceeding 35% in Las Vegas. Operational warnings issued; repeated violations trigger account deactivation."
    }
  },
  {
    "day": 17,
    "week": 3,
    "phase": "Week 3: Rider Cancellations, Fraud & Safety",
    "title": "Day 17: GPS Spoofing & Phantom Ride Fraud Detection (Speed > 120 MPH)",
    "sender": "Rajesh Narayanan",
    "senderRole": "L6 Staff Marketplace Data Scientist",
    "senderAvatar": "👨‍💻",
    "priority": "P0 - FRAUD ALERT",
    "department": "Trust & Safety / Financial Fraud",
    "slackMessage": "FRAUD ALERT! Fraudulent driver rings use modified GPS apps to fake phantom rides and collect promotions. A trip is impossible if calculated average speed: `(distance_miles / duration_hours)` exceeds 110 MPH within city limits. Flag all trips exceeding 110 MPH.",
    "contextReport": {
      "businessWhy": "GPS spoofing rings steal millions in promotional bonuses and fabricated long-distance fares. Real-time velocity and teleportation checks freeze automated payouts before funds leave our accounts.",
      "learningFocus": [
        "Velocity physics in SQL: `ROUND(distance_miles / NULLIF(duration_minutes / 60.0, 0), 1) AS avg_speed_mph`",
        "Threshold filtering on physical impossibilities (`speed > 110.0`)",
        "Financial loss prevention"
      ],
      "sampleSchema": "trip_gps_telemetry (\n  trip_id VARCHAR(36) PRIMARY KEY,\n  driver_id VARCHAR(20),\n  distance_miles DECIMAL(6,2),\n  duration_minutes DECIMAL(6,2),\n  fare_amount_usd DECIMAL(6,2)\n)",
      "realWorldTrap": "Beware of `duration_minutes = 0` when GPS timestamps collide! Division by zero will crash your query. Always wrap duration with `NULLIF(duration_minutes, 0)`.",
      "interviewRelevance": "Physical impossibility fraud detection and anomaly queries are tested in trust & safety roles."
    },
    "schema": "trip_gps_telemetry",
    "challenge": {
      "instruction": "Identify fraudulent trips where calculated avg_speed_mph > 110.0. Return trip_id, driver_id, distance_miles, duration_minutes, and avg_speed_mph.",
      "template": "SELECT trip_id, driver_id, distance_miles, duration_minutes,\n  ROUND(distance_miles / (duration_minutes / 60.0), 1) AS avg_speed_mph\nFROM trip_gps_telemetry\nWHERE (distance_miles / (duration_minutes / 60.0)) ___1___ ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Comparison Operator",
          "answer": ">",
          "options": [
            ">",
            "<",
            "=",
            "<="
          ]
        },
        {
          "id": 2,
          "label": "Speed Threshold (MPH)",
          "answer": "110.0",
          "options": [
            "110.0",
            "65.0",
            "85.0",
            "200.0"
          ]
        }
      ],
      "expectedSql": "SELECT trip_id, driver_id, distance_miles, duration_minutes, ROUND(distance_miles / (duration_minutes / 60.0), 1) AS avg_speed_mph FROM trip_gps_telemetry WHERE (distance_miles / (duration_minutes / 60.0)) > 110.0;",
      "managerReview": "BLOCKED! Caught 14 simulated trips logging 32 miles in 8 minutes (240 MPH). The associated accounts and $1,850 in pending payouts have been frozen."
    }
  },
  {
    "day": 18,
    "week": 3,
    "phase": "Week 3: Rider Cancellations, Fraud & Safety",
    "title": "Day 18: Telematics Safety Invariants: Hard Braking & Rapid Acceleration",
    "sender": "Carlos Mendes",
    "senderRole": "L7 VP of Mobility Engineering",
    "senderAvatar": "👨‍💼",
    "priority": "P1 - Safety Invariant",
    "department": "Safety Telematics & Insurance Risk",
    "slackMessage": "Smartphone gyroscopes and accelerometers log driving telemetry every second. We define 'Harsh Driving' as exceeding 4 hard braking events (> 8.5 mph/s deceleration) per 100 miles driven. Calculate the hard braking rate per 100 miles for each driver.",
    "contextReport": {
      "businessWhy": "Telematics safety scoring lowers commercial insurance premiums, which constitute one of Uber's largest cost items. Proactively coaching aggressive drivers reduces vehicle collisions by 28%.",
      "learningFocus": [
        "Normalized incident rate calculation: `ROUND(SUM(hard_brakes) * 100.0 / NULLIF(SUM(miles_driven), 0), 2) AS hard_brake_rate_per_100m`",
        "Safety threshold categorization",
        "Telematics aggregation across multiple trips"
      ],
      "sampleSchema": "telematics_sensor_logs (\n  log_id VARCHAR(36) PRIMARY KEY,\n  driver_id VARCHAR(20),\n  miles_driven DECIMAL(6,2),\n  hard_brakes INT,\n  rapid_accels INT\n)",
      "realWorldTrap": "Don't evaluate braking rates on drivers with fewer than 50 total miles logged! A single sudden stop when a pedestrian steps out would wrongly tag them as hazardous.",
      "interviewRelevance": "Sensor telematics normalization per unit of exposure (per 100 miles or per 1,000 hours) is standard in safety engineering."
    },
    "schema": "telematics_sensor_logs",
    "challenge": {
      "instruction": "Compute total_miles, total_hard_brakes, and hard_brake_rate_per_100m for each driver where total_miles >= 50.0.",
      "template": "SELECT driver_id,\n  ROUND(SUM(miles_driven), 1) AS total_miles,\n  SUM(hard_brakes) AS total_hard_brakes,\n  ROUND(SUM(hard_brakes) * 100.0 / SUM(miles_driven), 2) AS hard_brake_rate_per_100m\nFROM telematics_sensor_logs\nGROUP BY driver_id\nHAVING SUM(miles_driven) ___1___ 50.0;",
      "blanks": [
        {
          "id": 1,
          "label": "Comparison Operator",
          "answer": ">=",
          "options": [
            ">=",
            "<=",
            "=",
            ">"
          ]
        }
      ],
      "expectedSql": "SELECT driver_id, ROUND(SUM(miles_driven), 1) AS total_miles, SUM(hard_brakes) AS total_hard_brakes, ROUND(SUM(hard_brakes) * 100.0 / SUM(miles_driven), 2) AS hard_brake_rate_per_100m FROM telematics_sensor_logs GROUP BY driver_id HAVING SUM(miles_driven) >= 50.0;",
      "managerReview": "Top 95% of drivers averaged 1.2 hard brakes per 100 miles. Drivers exceeding 6.0 will receive in-app driving smoothness guidance."
    }
  },
  {
    "day": 19,
    "week": 3,
    "phase": "Week 3: Rider Cancellations, Fraud & Safety",
    "title": "Day 19: Dynamic Route Rerouting during Road Closures & Adverse Weather",
    "sender": "Rajesh Narayanan",
    "senderRole": "L6 Staff Marketplace Data Scientist",
    "senderAvatar": "👨‍💻",
    "priority": "P2 - Sprint",
    "department": "Routing, Maps & ETA Intelligence",
    "slackMessage": "During a marathon in downtown Seattle, city streets were closed. Trips that rerouted took longer than initial estimates. Calculate the average route detour ratio: `actual_distance / estimated_distance` grouped by weather condition ('Clear', 'Rain', 'Snow').",
    "contextReport": {
      "businessWhy": "Severe weather and street closures distort standard shortest-path Dijkstra algorithms. Understanding detour expansion factors allows dynamic upfront pricing to price weather hazards accurately.",
      "learningFocus": [
        "Detour ratio arithmetic: `ROUND(AVG(actual_miles / estimated_miles), 2) AS detour_ratio`",
        "Weather condition dimension grouping",
        "Routing distortion evaluation"
      ],
      "sampleSchema": "weather_reroute_trips (\n  trip_id VARCHAR(36) PRIMARY KEY,\n  weather_condition VARCHAR(20),\n  estimated_miles DECIMAL(5,2),\n  actual_miles DECIMAL(5,2)\n)",
      "realWorldTrap": "Don't divide when `estimated_miles = 0`! In rare GPS glitches where pickup and dropoff coordinates are identical, estimated distance is 0.",
      "interviewRelevance": "Graph routing performance and environmental covariate modeling are popular interview topics at mobility companies."
    },
    "schema": "weather_reroute_trips",
    "challenge": {
      "instruction": "Compute trip_count, avg_estimated_miles, avg_actual_miles, and avg_detour_ratio for each weather_condition.",
      "template": "SELECT weather_condition,\n  COUNT(*) AS trip_count,\n  ROUND(AVG(estimated_miles), 1) AS avg_estimated_miles,\n  ROUND(AVG(actual_miles), 1) AS avg_actual_miles,\n  ROUND(AVG(actual_miles / estimated_miles), 2) AS avg_detour_ratio\nFROM weather_reroute_trips\nGROUP BY ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Weather Dimension",
          "answer": "weather_condition",
          "options": [
            "weather_condition",
            "trip_id",
            "estimated_miles",
            "actual_miles"
          ]
        }
      ],
      "expectedSql": "SELECT weather_condition, COUNT(*) AS trip_count, ROUND(AVG(estimated_miles), 1) AS avg_estimated_miles, ROUND(AVG(actual_miles), 1) AS avg_actual_miles, ROUND(AVG(actual_miles / estimated_miles), 2) AS avg_detour_ratio FROM weather_reroute_trips GROUP BY weather_condition;",
      "managerReview": "'Snow' generated an average 1.38x detour ratio compared to 1.04x for 'Clear', informing real-time weather surcharge calibration."
    }
  },
  {
    "day": 20,
    "week": 3,
    "phase": "Week 3: Rider Cancellations, Fraud & Safety",
    "title": "Day 20: Fare Split Attribution & Disputed Ride Multi-Payer Reconciliation",
    "sender": "Sarah Lin",
    "senderRole": "L5 Dispatch Operations Lead",
    "senderAvatar": "👩‍💼",
    "priority": "P2 - Sprint",
    "department": "Rider Billing & Ledger Systems",
    "slackMessage": "When riders split a fare between 3 friends, each passenger pays their share plus a $0.25 split fee. If one friend's card declines, the primary booker is charged the difference. Query split transactions: find all split rides where total collected did not equal the total fare plus split fees.",
    "contextReport": {
      "businessWhy": "Multi-party payment splitting creates reconciliation balance imbalances if partial authorizations fail. General ledger audit invariants must ensure every cent of driver pay is backed by collected funds.",
      "learningFocus": [
        "Ledger reconciliation invariant checks",
        "Subquery / CTE aggregation of split payments",
        "Comparing summed collection against expected fare total"
      ],
      "sampleSchema": "fare_split_ledger (\n  split_id VARCHAR(36) PRIMARY KEY,\n  trip_id VARCHAR(36),\n  expected_total_usd DECIMAL(6,2),\n  collected_amount_usd DECIMAL(6,2)\n)",
      "realWorldTrap": "Floating-point rounding errors can make $15.00 != $15.0000001! In financial SQL, always cast differences to decimal currency or test `ABS(expected - actual) > 0.01`.",
      "interviewRelevance": "Financial ledger integrity and balance reconciliation invariants are tested across fintech and rideshare."
    },
    "schema": "fare_split_ledger",
    "challenge": {
      "instruction": "Group by trip_id, expected_total_usd. Find trips where ABS(expected_total_usd - SUM(collected_amount_usd)) > 0.01.",
      "template": "SELECT trip_id, expected_total_usd,\n  SUM(collected_amount_usd) AS total_collected\nFROM fare_split_ledger\nGROUP BY trip_id, expected_total_usd\nHAVING ABS(expected_total_usd - SUM(collected_amount_usd)) ___1___ ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Comparison Operator",
          "answer": ">",
          "options": [
            ">",
            "<",
            "=",
            "<="
          ]
        },
        {
          "id": 2,
          "label": "Cent Imbalance Threshold",
          "answer": "0.01",
          "options": [
            "0.01",
            "1.00",
            "0.00",
            "5.00"
          ]
        }
      ],
      "expectedSql": "SELECT trip_id, expected_total_usd, SUM(collected_amount_usd) AS total_collected FROM fare_split_ledger GROUP BY trip_id, expected_total_usd HAVING ABS(expected_total_usd - SUM(collected_amount_usd)) > 0.01;",
      "managerReview": "Found 12 trips with $0.25 collection mismatches due to declined secondary cards. Automated secondary dunning rules triggered."
    }
  },
  {
    "day": 21,
    "week": 3,
    "phase": "Week 3: Rider Cancellations, Fraud & Safety",
    "title": "Day 21: Emergency RideCheck Telemetry Trigger Analysis (Prolonged Stop)",
    "sender": "Carlos Mendes",
    "senderRole": "L7 VP of Mobility Engineering",
    "senderAvatar": "👨‍💼",
    "priority": "P1 - Critical Safety",
    "department": "Safety Telematics & Insurance Risk",
    "slackMessage": "RideCheck uses GPS sensors to detect if a vehicle stops unexpectedly mid-trip for over 4 minutes away from traffic signals. When triggered, the app prompts rider and driver: 'Is everything OK?' Query RideCheck incidents: calculate the response rate and count of emergency 911 escalations.",
    "contextReport": {
      "businessWhy": "RideCheck is Uber's flagship proactive safety feature. Rapid automated check-ins during unexpected roadside stops save lives during medical emergencies or vehicular collisions.",
      "learningFocus": [
        "Safety incident escalation rates: `ROUND(100.0 * SUM(escalated_to_emergency) / COUNT(*), 2) AS escalation_pct`",
        "Response status breakdown (`SAFE`, `ESCALATED`, `NO_RESPONSE`)",
        "Safety incident telemetry reporting"
      ],
      "sampleSchema": "ridecheck_incidents (\n  incident_id VARCHAR(36) PRIMARY KEY,\n  city_name VARCHAR(30),\n  stop_duration_mins INT,\n  rider_response VARCHAR(20), -- 'SAFE', 'ESCALATED', 'NO_RESPONSE'\n  escalated_to_emergency INT\n)",
      "realWorldTrap": "Don't count traffic jams as RideCheck stops! Machine learning models cross-reference live traffic maps to suppress check-in prompts when surrounding vehicles are also stationary.",
      "interviewRelevance": "Mission-critical safety telemetry and escalation workflows demonstrate senior system architecture awareness."
    },
    "schema": "ridecheck_incidents",
    "challenge": {
      "instruction": "For each city_name, compute total_incidents, safe_confirmations, emergency_escalations, and escalation_pct.",
      "template": "SELECT city_name,\n  COUNT(*) AS total_incidents,\n  SUM(CASE WHEN rider_response = 'SAFE' THEN 1 ELSE 0 END) AS safe_confirmations,\n  SUM(escalated_to_emergency) AS emergency_escalations,\n  ROUND(100.0 * SUM(escalated_to_emergency) / COUNT(*), 2) AS escalation_pct\nFROM ridecheck_incidents\nGROUP BY ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "City Dimension",
          "answer": "city_name",
          "options": [
            "city_name",
            "incident_id",
            "rider_response",
            "stop_duration_mins"
          ]
        }
      ],
      "expectedSql": "SELECT city_name, COUNT(*) AS total_incidents, SUM(CASE WHEN rider_response = 'SAFE' THEN 1 ELSE 0 END) AS safe_confirmations, SUM(escalated_to_emergency) AS emergency_escalations, ROUND(100.0 * SUM(escalated_to_emergency) / COUNT(*), 2) AS escalation_pct FROM ridecheck_incidents GROUP BY city_name;",
      "managerReview": "98.4% of RideCheck triggers were confirmed safe (riders stopping for drive-thru food or gas). 3 emergency incidents dispatched safety agents. Promoted to L5 Senior Marketplace Engineer!"
    }
  },
  {
    "day": 22,
    "week": 4,
    "phase": "Week 4: Global Pricing, Take-Rate & Compliance",
    "title": "Day 22: Platform Take-Rate Bridge (Gross Bookings to Adjusted EBITDA)",
    "sender": "Carlos Mendes",
    "senderRole": "L7 VP of Mobility Engineering",
    "senderAvatar": "👨‍💼",
    "priority": "P1 - Executive Finance",
    "department": "Corporate Financial Operations",
    "slackMessage": "Welcome to Week 4! For our quarterly Wall Street earnings release, we need the Gross Bookings to Net Revenue bridge: `Gross Bookings - Driver Earnings - Driver Incentives = Net Take Revenue`. Compute the net take-rate percentage for Mobility vs Delivery.",
    "contextReport": {
      "businessWhy": "Take-rate is the percentage of Gross Bookings that Uber retains as net revenue. Demonstrating expanding take-rates (from 21% to 28%) proves operating leverage to institutional investors.",
      "learningFocus": [
        "Financial bridge arithmetic across multiple deductions",
        "Net take-rate percentage: `ROUND(100.0 * (SUM(gross_bookings) - SUM(driver_pay) - SUM(incentives)) / SUM(gross_bookings), 2) AS net_take_rate_pct`",
        "Business line comparison (Mobility vs Delivery)"
      ],
      "sampleSchema": "financial_quarterly_bridge (\n  entry_id VARCHAR(36) PRIMARY KEY,\n  business_line VARCHAR(20),\n  gross_bookings_usd BIGINT,\n  driver_pay_usd BIGINT,\n  incentives_usd BIGINT\n)",
      "realWorldTrap": "Don't forget driver incentives when computing Net Revenue! Driver incentives directly reduce GAAP net revenue under modern accounting standards.",
      "interviewRelevance": "Platform economics, GAAP revenue definitions, and Gross-to-Net revenue bridges are standard executive interview questions."
    },
    "schema": "financial_quarterly_bridge",
    "challenge": {
      "instruction": "Compute total_gb, total_net_revenue, and net_take_rate_pct for each business_line.",
      "template": "SELECT business_line,\n  SUM(gross_bookings_usd) AS total_gb,\n  SUM(gross_bookings_usd - driver_pay_usd - incentives_usd) AS total_net_revenue,\n  ROUND(100.0 * SUM(gross_bookings_usd - driver_pay_usd - incentives_usd) / SUM(gross_bookings_usd), 2) AS net_take_rate_pct\nFROM financial_quarterly_bridge\nGROUP BY ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Business Line Dimension",
          "answer": "business_line",
          "options": [
            "business_line",
            "entry_id",
            "gross_bookings_usd",
            "total_gb"
          ]
        }
      ],
      "expectedSql": "SELECT business_line, SUM(gross_bookings_usd) AS total_gb, SUM(gross_bookings_usd - driver_pay_usd - incentives_usd) AS total_net_revenue, ROUND(100.0 * SUM(gross_bookings_usd - driver_pay_usd - incentives_usd) / SUM(gross_bookings_usd), 2) AS net_take_rate_pct FROM financial_quarterly_bridge GROUP BY business_line;",
      "managerReview": "Mobility achieved a 28.4% net take-rate; Delivery achieved 19.8%. The earnings financial bridge is verified for disclosure."
    }
  },
  {
    "day": 23,
    "week": 4,
    "phase": "Week 4: Global Pricing, Take-Rate & Compliance",
    "title": "Day 23: California Prop 22 Guaranteed Minimum Earnings Auditing",
    "sender": "Sarah Lin",
    "senderRole": "L5 Dispatch Operations Lead",
    "senderAvatar": "👩‍💼",
    "priority": "P1 - Regulatory & Compliance",
    "department": "Earner Legal & Regulatory Compliance",
    "slackMessage": "Under California Prop 22, drivers are guaranteed 120% of local minimum wage ($19.20/hr) for engaged time (P2 + P3) plus $0.35/mile. If actual trip earnings fall below this floor, Uber must pay a top-up subsidy. Identify drivers whose earnings fell below the guarantee and calculate their required top-up subsidy.",
    "contextReport": {
      "businessWhy": "State regulations mandate strict floor earnings guarantees. Automating fortnightly Prop 22 calculation pipelines avoids multi-million dollar regulatory penalties and ensures fair compensation.",
      "learningFocus": [
        "Statutory formula implementation: `(engaged_hours * 19.20) + (engaged_miles * 0.35)`",
        "Subsidized top-up calculation: `CASE WHEN total_earnings < guaranteed_floor THEN (guaranteed_floor - total_earnings) ELSE 0 END`",
        "Regulatory audit compliance"
      ],
      "sampleSchema": "prop22_driver_periods (\n  period_id VARCHAR(36) PRIMARY KEY,\n  driver_id VARCHAR(20),\n  engaged_hours DECIMAL(6,2),\n  engaged_miles DECIMAL(6,2),\n  actual_earnings_usd DECIMAL(7,2)\n)",
      "realWorldTrap": "Never pay a negative subsidy! If a driver earned $40/hr during surge, their subsidy is $0.00, not a deduction. Always wrap top-up in `GREATEST(0, guarantee - actual)`.",
      "interviewRelevance": "Regulatory earnings floors and algorithmic labor compliance queries are tested heavily in gig-economy tech."
    },
    "schema": "prop22_driver_periods",
    "challenge": {
      "instruction": "Compute guaranteed_floor as ((engaged_hours * 19.20) + (engaged_miles * 0.35)). Find drivers where actual_earnings_usd < guaranteed_floor and calculate required top_up_subsidy.",
      "template": "SELECT driver_id, actual_earnings_usd,\n  ROUND((engaged_hours * 19.20) + (engaged_miles * 0.35), 2) AS guaranteed_floor,\n  ROUND(((engaged_hours * 19.20) + (engaged_miles * 0.35)) - actual_earnings_usd, 2) AS top_up_subsidy\nFROM prop22_driver_periods\nWHERE actual_earnings_usd ___1___ ((engaged_hours * 19.20) + (engaged_miles * 0.35));",
      "blanks": [
        {
          "id": 1,
          "label": "Comparison Operator",
          "answer": "<",
          "options": [
            "<",
            ">",
            "=",
            "!="
          ]
        }
      ],
      "expectedSql": "SELECT driver_id, actual_earnings_usd, ROUND((engaged_hours * 19.20) + (engaged_miles * 0.35), 2) AS guaranteed_floor, ROUND(((engaged_hours * 19.20) + (engaged_miles * 0.35)) - actual_earnings_usd, 2) AS top_up_subsidy FROM prop22_driver_periods WHERE actual_earnings_usd < ((engaged_hours * 19.20) + (engaged_miles * 0.35));",
      "managerReview": "Audit complete! 1,240 California drivers qualified for top-ups averaging $42.50 for the bi-weekly cycle. Compliance verified."
    }
  },
  {
    "day": 24,
    "week": 4,
    "phase": "Week 4: Global Pricing, Take-Rate & Compliance",
    "title": "Day 24: Congestion Pricing Surcharge Passthrough (NYC Congestion Zone)",
    "sender": "Rajesh Narayanan",
    "senderRole": "L6 Staff Marketplace Data Scientist",
    "senderAvatar": "👨‍💻",
    "priority": "P2 - Sprint",
    "department": "Public Policy & Transit Compliance",
    "slackMessage": "New York City charges a Congestion Surcharge ($2.75 per trip south of 60th St in Manhattan). Every cent collected from riders must be segregated and remitted to the MTA transit authority. Verify that total surcharges collected match total surcharges remitted.",
    "contextReport": {
      "businessWhy": "Municipal congestion fees are fiduciary passthroughs: Uber collects them as an agent for city governments. Intermingling congestion fees with platform revenue creates catastrophic tax compliance liability.",
      "learningFocus": [
        "Fiduciary passthrough reconciliation",
        "Geographic boundary filtering (pickup or dropoff in Manhattan congestion zone)",
        "Zero-balance remittance invariants"
      ],
      "sampleSchema": "nyc_congestion_ledger (\n  trip_id VARCHAR(36) PRIMARY KEY,\n  in_congestion_zone INT,\n  surcharge_collected_usd DECIMAL(5,2),\n  surcharge_remitted_usd DECIMAL(5,2)\n)",
      "realWorldTrap": "Don't count trips that only passed through the zone without picking up or dropping off! The law only applies when a pickup or dropoff touches the designated zone.",
      "interviewRelevance": "Tax passthrough ledgers and municipal regulatory accounting are core to urban mobility data infrastructure."
    },
    "schema": "nyc_congestion_ledger",
    "challenge": {
      "instruction": "For trips in_congestion_zone = 1, compute total_trips, total_collected, total_remitted, and remittance_discrepancy (collected - remitted).",
      "template": "SELECT\n  COUNT(*) AS total_trips,\n  ROUND(SUM(surcharge_collected_usd), 2) AS total_collected,\n  ROUND(SUM(surcharge_remitted_usd), 2) AS total_remitted,\n  ROUND(SUM(surcharge_collected_usd) - SUM(surcharge_remitted_usd), 2) AS remittance_discrepancy\nFROM nyc_congestion_ledger\nWHERE in_congestion_zone = ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Zone Flag",
          "answer": "1",
          "options": [
            "1",
            "0",
            "NULL",
            "ALL"
          ]
        }
      ],
      "expectedSql": "SELECT COUNT(*) AS total_trips, ROUND(SUM(surcharge_collected_usd), 2) AS total_collected, ROUND(SUM(surcharge_remitted_usd), 2) AS total_remitted, ROUND(SUM(surcharge_collected_usd) - SUM(surcharge_remitted_usd), 2) AS remittance_discrepancy FROM nyc_congestion_ledger WHERE in_congestion_zone = 1;",
      "managerReview": "Perfect zero-discrepancy reconciliation! $4.12M collected and exactly $4.12M remitted to the state treasury."
    }
  },
  {
    "day": 25,
    "week": 4,
    "phase": "Week 4: Global Pricing, Take-Rate & Compliance",
    "title": "Day 25: Uber One Subscription Retention & Cross-Platform GMV Lift",
    "sender": "Sarah Lin",
    "senderRole": "L5 Dispatch Operations Lead",
    "senderAvatar": "👩‍💼",
    "priority": "P2 - Sprint",
    "department": "Membership & Subscription Growth",
    "slackMessage": "Uber One members pay $9.99/mo for $0 delivery fees and 5% off rides. Compare members vs non-members: calculate average monthly trips and average Gross Bookings per user. Does membership double rider frequency?",
    "contextReport": {
      "businessWhy": "Uber One members spend 3.4x more annually across both Mobility and Eats compared to non-subscribers. Membership creates cross-platform retention and makes Uber the default everyday utility app.",
      "learningFocus": [
        "Member vs Non-Member cohort comparison",
        "Per-user aggregation: `ROUND(AVG(monthly_trips), 1)`, `ROUND(AVG(monthly_gb_usd), 2)`",
        "Lifetime customer value uplift modeling"
      ],
      "sampleSchema": "membership_rider_profiles (\n  user_id VARCHAR(20) PRIMARY KEY,\n  is_uber_one_member INT,\n  monthly_trips INT,\n  monthly_gb_usd DECIMAL(7,2)\n)",
      "realWorldTrap": "Beware of selection bias! Heavy users are more likely to buy Uber One in the first place. Advanced incrementality testing compares pre-membership vs post-membership lift.",
      "interviewRelevance": "Subscription membership ROI and cross-category halo effects are standard product data science prompts."
    },
    "schema": "membership_rider_profiles",
    "challenge": {
      "instruction": "Compute user_count, avg_monthly_trips, and avg_monthly_gb for is_uber_one_member = 1 vs 0.",
      "template": "SELECT is_uber_one_member,\n  COUNT(*) AS user_count,\n  ROUND(AVG(monthly_trips), 1) AS avg_monthly_trips,\n  ROUND(AVG(monthly_gb_usd), 2) AS avg_monthly_gb\nFROM membership_rider_profiles\nGROUP BY ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Membership Dimension",
          "answer": "is_uber_one_member",
          "options": [
            "is_uber_one_member",
            "user_id",
            "monthly_trips",
            "monthly_gb_usd"
          ]
        }
      ],
      "expectedSql": "SELECT is_uber_one_member, COUNT(*) AS user_count, ROUND(AVG(monthly_trips), 1) AS avg_monthly_trips, ROUND(AVG(monthly_gb_usd), 2) AS avg_monthly_gb FROM membership_rider_profiles GROUP BY is_uber_one_member;",
      "managerReview": "Uber One members average 9.8 trips/month ($184.20 GB) vs 3.1 trips ($58.10 GB) for non-members! The subscription engine is a massive flywheel."
    }
  },
  {
    "day": 26,
    "week": 4,
    "phase": "Week 4: Global Pricing, Take-Rate & Compliance",
    "title": "Day 26: Cross-Border Currency FX Settlement for International Travelers",
    "sender": "Rajesh Narayanan",
    "senderRole": "L6 Staff Marketplace Data Scientist",
    "senderAvatar": "👨‍💻",
    "priority": "P2 - Sprint",
    "department": "International Treasury & Payments",
    "slackMessage": "When a US tourist takes an Uber in London, the fare is charged in GBP but settled to their credit card in USD. Join trips with daily FX rates to compute total GBP fares, converted USD volume, and the realized FX spread revenue.",
    "contextReport": {
      "businessWhy": "International roaming riders generate substantial travel revenue during summer tourism peaks. Proper FX conversion ensures drivers receive exact local pound currency while riders are charged at mid-market rates.",
      "learningFocus": [
        "Multi-currency join on date and currency code",
        "Currency conversion math: `SUM(fare_gbp * fx.gbp_to_usd)`",
        "Foreign exchange financial precision"
      ],
      "sampleSchema": "cross_border_trips (\n  trip_id VARCHAR(36) PRIMARY KEY,\n  trip_date DATE,\n  fare_gbp DECIMAL(6,2)\n);\ngbp_fx_rates (\n  rate_date DATE PRIMARY KEY,\n  gbp_to_usd DECIMAL(6,4)\n)",
      "realWorldTrap": "Make sure you join on `trip_date = rate_date`! Using today's exchange rate for a trip taken 30 days ago violates GAAP foreign currency reporting standards.",
      "interviewRelevance": "Cross-border transactional joins and currency conversion precision are evaluated in all global platforms."
    },
    "schema": "cross_border_trips",
    "challenge": {
      "instruction": "Join cross_border_trips with gbp_fx_rates on trip_date = rate_date. Compute total_trips, total_gbp, and total_usd.",
      "template": "SELECT\n  COUNT(*) AS total_trips,\n  ROUND(SUM(t.fare_gbp), 2) AS total_gbp,\n  ROUND(SUM(t.fare_gbp * fx.gbp_to_usd), 2) AS total_usd\nFROM cross_border_trips t\nJOIN gbp_fx_rates fx ON t.trip_date = ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Join Date Key",
          "answer": "fx.rate_date",
          "options": [
            "fx.rate_date",
            "fx.gbp_to_usd",
            "t.trip_id",
            "NULL"
          ]
        }
      ],
      "expectedSql": "SELECT COUNT(*) AS total_trips, ROUND(SUM(t.fare_gbp), 2) AS total_gbp, ROUND(SUM(t.fare_gbp * fx.gbp_to_usd), 2) AS total_usd FROM cross_border_trips t JOIN gbp_fx_rates fx ON t.trip_date = fx.rate_date;",
      "managerReview": "London international tourist volume cleared: £1.24M converted to $1.59M USD with zero currency variance."
    }
  },
  {
    "day": 27,
    "week": 4,
    "phase": "Week 4: Global Pricing, Take-Rate & Compliance",
    "title": "Day 27: Rider Lifetime Value (LTV) Cohort Decay Across Acquisition Channels",
    "sender": "Sarah Lin",
    "senderRole": "L5 Dispatch Operations Lead",
    "senderAvatar": "👩‍💼",
    "priority": "P2 - Sprint",
    "department": "Performance Marketing & Rider Growth",
    "slackMessage": "Marketing acquires riders via Paid Social, Airport Billboards, and Referral Codes. For the Q1 cohort, calculate the 6-month cumulative Gross Bookings per user across acquisition channels. Which channel yields the highest Lifetime Value (LTV)?",
    "contextReport": {
      "businessWhy": "Optimizing Customer Acquisition Cost (CAC) against Lifetime Value (LTV) ensures marketing budgets flow to high-retention organic and referral loops rather than one-time promo hunters.",
      "learningFocus": [
        "LTV cohort metric: `ROUND(SUM(cumulative_6m_gb_usd) / COUNT(user_id), 2) AS avg_6m_ltv_usd`",
        "Acquisition channel dimension grouping",
        "Sorting by LTV return descending"
      ],
      "sampleSchema": "rider_acquisition_cohorts (\n  user_id VARCHAR(20) PRIMARY KEY,\n  acquisition_channel VARCHAR(30),\n  cumulative_6m_gb_usd DECIMAL(8,2)\n)",
      "realWorldTrap": "Don't measure LTV on cohorts before 6 full months have elapsed! Younger cohorts will appear to have lower LTV simply because of maturity lag.",
      "interviewRelevance": "LTV/CAC ratios and acquisition channel attribution queries are vital for growth analytics roles."
    },
    "schema": "rider_acquisition_cohorts",
    "challenge": {
      "instruction": "Compute total_riders, total_6m_gb, and avg_6m_ltv_usd for each acquisition_channel, ordered by avg_6m_ltv_usd DESC.",
      "template": "SELECT acquisition_channel,\n  COUNT(*) AS total_riders,\n  ROUND(SUM(cumulative_6m_gb_usd), 2) AS total_6m_gb,\n  ROUND(SUM(cumulative_6m_gb_usd) / COUNT(user_id), 2) AS avg_6m_ltv_usd\nFROM rider_acquisition_cohorts\nGROUP BY acquisition_channel\nORDER BY avg_6m_ltv_usd ___1___;",
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
      "expectedSql": "SELECT acquisition_channel, COUNT(*) AS total_riders, ROUND(SUM(cumulative_6m_gb_usd), 2) AS total_6m_gb, ROUND(SUM(cumulative_6m_gb_usd) / COUNT(user_id), 2) AS avg_6m_ltv_usd FROM rider_acquisition_cohorts GROUP BY acquisition_channel ORDER BY avg_6m_ltv_usd DESC;",
      "managerReview": "Rider Referrals had the highest 6-month LTV ($420.50), while Paid Social clocked $185.20. Referral budget boosted by 25%."
    }
  },
  {
    "day": 28,
    "week": 4,
    "phase": "Week 4: Global Pricing, Take-Rate & Compliance",
    "title": "Day 28: Autonomous Vehicle (AV) Waymo Telemetry vs Human Driver Fleet",
    "sender": "Carlos Mendes",
    "senderRole": "L7 VP of Mobility Engineering",
    "senderAvatar": "👨‍💼",
    "priority": "P1 - Autonomous Mobility",
    "department": "Autonomous Mobility & Robotics",
    "slackMessage": "In Phoenix and San Francisco, riders can choose between Waymo Autonomous Vehicles (AV) and Human Drivers. Compare the fleet performance: calculate average rating, average trip speed, and rider completion rate between 'Autonomous AV' and 'Human Driver'.",
    "contextReport": {
      "businessWhy": "Autonomous vehicles eliminate driver supply bottlenecks and expand 24/7 operating capacity. Comparing rider satisfaction between AVs and human drivers charts the future roadmap of urban transportation.",
      "learningFocus": [
        "Fleet comparison metrics: `ROUND(AVG(rider_rating), 2)`, `ROUND(AVG(avg_speed_mph), 1)`",
        "Completion rate calculation across fleet modes",
        "Autonomous operations analytics"
      ],
      "sampleSchema": "fleet_comparison_trips (\n  trip_id VARCHAR(36) PRIMARY KEY,\n  fleet_mode VARCHAR(20), -- 'Autonomous AV', 'Human Driver'\n  rider_rating DECIMAL(3,2),\n  avg_speed_mph DECIMAL(4,1),\n  completed INT\n)",
      "realWorldTrap": "AVs obey speed limits strictly and don't take unmapped shortcuts through parking lots. Account for slower navigation speeds in early AV rider satisfaction benchmarks.",
      "interviewRelevance": "Autonomous fleet telemetry, hybrid dispatching, and comparative satisfaction metrics are cutting-edge mobility interview prompts."
    },
    "schema": "fleet_comparison_trips",
    "challenge": {
      "instruction": "Compute total_trips, avg_rating, avg_speed_mph, and completion_pct for each fleet_mode.",
      "template": "SELECT fleet_mode,\n  COUNT(*) AS total_trips,\n  ROUND(AVG(rider_rating), 2) AS avg_rating,\n  ROUND(AVG(avg_speed_mph), 1) AS avg_speed_mph,\n  ROUND(100.0 * SUM(completed) / COUNT(*), 1) AS completion_pct\nFROM fleet_comparison_trips\nGROUP BY ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Fleet Dimension",
          "answer": "fleet_mode",
          "options": [
            "fleet_mode",
            "trip_id",
            "rider_rating",
            "avg_speed_mph"
          ]
        }
      ],
      "expectedSql": "SELECT fleet_mode, COUNT(*) AS total_trips, ROUND(AVG(rider_rating), 2) AS avg_rating, ROUND(AVG(avg_speed_mph), 1) AS avg_speed_mph, ROUND(100.0 * SUM(completed) / COUNT(*), 1) AS completion_pct FROM fleet_comparison_trips GROUP BY fleet_mode;",
      "managerReview": "Waymo AVs scored a stellar 4.92 average rating vs 4.86 for human drivers! Riders praised pristine cabin cleanliness and smooth braking."
    }
  },
  {
    "day": 29,
    "week": 4,
    "phase": "Week 4: Global Pricing, Take-Rate & Compliance",
    "title": "Day 29: New Year's Eve Global Surge Spike War Room Incident",
    "sender": "Rajesh Narayanan",
    "senderRole": "L6 Staff Marketplace Data Scientist",
    "senderAvatar": "👨‍💻",
    "priority": "P0 - GLOBAL WAR ROOM",
    "department": "Platform Reliability & Surge Operations",
    "slackMessage": "WAR ROOM ACTIVE! It is 12:15 AM on New Year's Eve. Ride requests just hit 85,000 requests per minute globally. In Sydney and London, redispatch queues are backing up. Run an emergency 5-minute bucket query across dispatch clusters: find clusters where unfulfilled requests exceed 15% and surge is pinned at max ceiling (3.5x).",
    "contextReport": {
      "businessWhy": "New Year's Eve is Uber's biggest volume night of the year. If dispatch queues deadlock due to runaway surge feedback loops, millions of stranded celebrants face sub-zero temperatures.",
      "learningFocus": [
        "P0 War Room triage under live streaming load",
        "Dual-condition anomaly thresholding: `unfulfilled_pct > 15.0 AND max_surge >= 3.5`",
        "Cluster dispatch reliability"
      ],
      "sampleSchema": "nye_cluster_telemetry (\n  cluster_id VARCHAR(30) PRIMARY KEY,\n  city_name VARCHAR(30),\n  requests_count INT,\n  unfulfilled_count INT,\n  current_surge DECIMAL(3,1)\n)",
      "realWorldTrap": "Don't increase surge beyond 3.5x during extreme congestion! Demand becomes completely price-inelastic, causing public relations backlash without bringing any new drivers onto the road.",
      "interviewRelevance": "War room incident handling and extreme load dispatch invariants demonstrate real-world production engineering coolness."
    },
    "schema": "nye_cluster_telemetry",
    "challenge": {
      "instruction": "Identify clusters where (unfulfilled_count * 100.0 / requests_count) > 15.0 AND current_surge >= 3.5. Return cluster_id, city_name, requests_count, and unfulfilled_pct.",
      "template": "SELECT cluster_id, city_name, requests_count,\n  ROUND(100.0 * unfulfilled_count / requests_count, 1) AS unfulfilled_pct\nFROM nye_cluster_telemetry\nWHERE current_surge >= 3.5 AND (unfulfilled_count * 100.0 / requests_count) ___1___ ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Comparison Operator",
          "answer": ">",
          "options": [
            ">",
            "<",
            "=",
            ">="
          ]
        },
        {
          "id": 2,
          "label": "Unfulfilled Percent Threshold",
          "answer": "15.0",
          "options": [
            "15.0",
            "5.0",
            "50.0",
            "1.0"
          ]
        }
      ],
      "expectedSql": "SELECT cluster_id, city_name, requests_count, ROUND(100.0 * unfulfilled_count / requests_count, 1) AS unfulfilled_pct FROM nye_cluster_telemetry WHERE current_surge >= 3.5 AND (unfulfilled_count * 100.0 / requests_count) > 15.0;",
      "managerReview": "WAR ROOM INTERVENTION DEPLOYED! Rebalanced dispatch radius across Soho London and Sydney Harbour. Surge caps stabilized; 120,000 riders safely ferried home."
    }
  },
  {
    "day": 30,
    "week": 4,
    "phase": "Week 4: Global Pricing, Take-Rate & Compliance",
    "title": "Day 30: Staff Marketplace Data Scientist Promotion Defense & Capstone",
    "sender": "Rajesh Narayanan",
    "senderRole": "L6 Staff Marketplace Data Scientist",
    "senderAvatar": "👨‍💻",
    "priority": "P1 - Career Milestone Defense",
    "department": "Global Mobility & Marketplace Dynamics",
    "slackMessage": "Day 30! You've conquered H3 geospatial grids, surge elasticity, airport queues, telematics safety, Prop 22 audits, and a global NYE war room. For your promotion defense before Dara and the Technical Review Board: write a comprehensive query aggregating 30-day Gross Bookings, net platform take-rate, overall rider trip completion rate, and driver retention across all global mega-regions.",
    "contextReport": {
      "businessWhy": "Staff Marketplace Engineers at Uber design the algorithms and financial data foundations that orchestrate tens of millions of rides and deliveries across 70 countries every single day.",
      "learningFocus": [
        "Consolidated global marketplace synthesis",
        "Cross-functional metric aggregation across continents",
        "Executive board reporting"
      ],
      "sampleSchema": "global_mega_region_rollup (\n  rollup_id VARCHAR(36) PRIMARY KEY,\n  mega_region VARCHAR(10), -- 'US_CAN', 'EMEA', 'LATAM', 'APAC'\n  total_trips BIGINT,\n  completed_trips BIGINT,\n  gross_bookings_usd BIGINT,\n  net_revenue_usd BIGINT,\n  active_drivers INT\n)",
      "realWorldTrap": "Always use weighted rollups for global metrics! Sum underlying raw numbers rather than averaging regional ratios.",
      "interviewRelevance": "Capstone queries demonstrating mastery of platform economics, operational liquidity, and executive communication mark the transition to Staff Engineer."
    },
    "schema": "global_mega_region_rollup",
    "challenge": {
      "instruction": "For each mega_region, calculate total_trips, completion_pct (completed_trips / total_trips), total_gb_usd, and net_take_rate_pct (net_revenue / gross_bookings), ordered by total_gb_usd DESC.",
      "template": "SELECT mega_region,\n  SUM(total_trips) AS total_trips,\n  ROUND(100.0 * SUM(completed_trips) / SUM(total_trips), 1) AS completion_pct,\n  SUM(gross_bookings_usd) AS total_gb_usd,\n  ROUND(100.0 * SUM(net_revenue_usd) / SUM(gross_bookings_usd), 2) AS net_take_rate_pct\nFROM global_mega_region_rollup\nGROUP BY ___1___\nORDER BY total_gb_usd ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Regional Dimension",
          "answer": "mega_region",
          "options": [
            "mega_region",
            "rollup_id",
            "total_trips",
            "total_gb_usd"
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
      "expectedSql": "SELECT mega_region, SUM(total_trips) AS total_trips, ROUND(100.0 * SUM(completed_trips) / SUM(total_trips), 1) AS completion_pct, SUM(gross_bookings_usd) AS total_gb_usd, ROUND(100.0 * SUM(net_revenue_usd) / SUM(gross_bookings_usd), 2) AS net_take_rate_pct FROM global_mega_region_rollup GROUP BY mega_region ORDER BY total_gb_usd DESC;",
      "managerReview": "PROMOTION UNANIMOUSLY APPROVED! The Technical Review Board and Dara Khosrowshahi officially confirm your promotion to L6 Staff Marketplace Data Scientist. You have mastered marketplace operations at Uber scale!"
    }
  }
];
