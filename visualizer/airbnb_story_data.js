// =============================================================================
// AIRBNB 30-DAY MARKETPLACE & TRAVEL INFRASTRUCTURE SIMULATION DATA
// Role: Marketplace Data Scientist & Pricing Quant (L4 -> L6 Staff)
// 30 Days Across 4 Progressive Weeks with Authentic Hospitality Telemetry
// =============================================================================

window.AIRBNB_STORY_DATA = [
  {
    "day": 1,
    "week": 1,
    "phase": "Marketplace Search & Pricing",
    "title": "Day 01: Search Impression Click-Through Rate by Destination Market",
    "sender": "Elena Rostova",
    "senderRole": "Lead Marketplace Data Scientist",
    "senderAvatar": "ER",
    "priority": "P1",
    "department": "Marketplace Search & Discovery",
    "slackMessage": "Morning! Marketing launched our global summer getaway campaigns across major metro destinations. Product needs our Day 1 baseline: calculate total impressions, total clicks, and the resulting CTR (%) grouped by destination_market. Filter for markets with at least 500 impressions so we avoid small-sample anomalies.",
    "contextReport": "Why this matters: Search impression click-through rate (CTR) is the leading liquidity indicator of market inventory quality. If listings in Paris or Tokyo have low CTRs despite heavy impressions, our ranking algorithm is serving mismatched price points or subpar hero photos.",
    "schema": {
      "tableName": "listing_search_impressions",
      "columns": [
        {
          "name": "market_id",
          "type": "VARCHAR(32)",
          "desc": "Unique market identifier"
        },
        {
          "name": "destination_market",
          "type": "VARCHAR(64)",
          "desc": "Metro market name (e.g., Paris, Tokyo, London)"
        },
        {
          "name": "impressions_count",
          "type": "INT",
          "desc": "Total times listings appeared in search view"
        },
        {
          "name": "clicks_count",
          "type": "INT",
          "desc": "Total click-throughs into listing details"
        }
      ]
    },
    "challenge": {
      "instruction": "Compute total_impressions, total_clicks, and ctr_pct for each destination_market having total_impressions >= 500, ordered by ctr_pct DESC.",
      "template": "SELECT destination_market,\n  SUM(impressions_count) AS total_impressions,\n  SUM(clicks_count) AS total_clicks,\n  ROUND(100.0 * SUM(clicks_count) / SUM(impressions_count), 2) AS ctr_pct\nFROM listing_search_impressions\nGROUP BY ___1___\nHAVING SUM(impressions_count) >= 500\nORDER BY ctr_pct ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Group Dimension",
          "answer": "destination_market",
          "options": [
            "destination_market",
            "market_id",
            "clicks_count",
            "ctr_pct"
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
      "expectedSql": "SELECT destination_market, SUM(impressions_count) AS total_impressions, SUM(clicks_count) AS total_clicks, ROUND(100.0 * SUM(clicks_count) / SUM(impressions_count), 2) AS ctr_pct FROM listing_search_impressions GROUP BY destination_market HAVING SUM(impressions_count) >= 500 ORDER BY ctr_pct DESC;",
      "managerReview": "Spot on. Tokyo led with 6.82% CTR while Paris trailed at 3.91%. Photo quality and local amenity badges explain the divergence."
    }
  },
  {
    "day": 2,
    "week": 1,
    "phase": "Marketplace Search & Pricing",
    "title": "Day 02: Dynamic Price Elasticity vs Monthly Occupancy Rate",
    "sender": "Carlos Mendes",
    "senderRole": "Senior Pricing Quant",
    "senderAvatar": "CM",
    "priority": "P1",
    "department": "Smart Pricing & Revenue Ops",
    "slackMessage": "Hosts using Smart Pricing are asking if our price recommendations depress occupancy. Let's group listings by price_tier ('Budget', 'Standard', 'Luxury') and compute average night price and average occupancy_rate_pct. Exclude listings with zero active days.",
    "contextReport": "Price elasticity of demand governs revenue maximization. High night rates reduce occupancy percentages, but total revenue ($ ADR * occupancy) peaks in specific elasticity bands.",
    "schema": {
      "tableName": "listing_monthly_performance",
      "columns": [
        {
          "name": "listing_id",
          "type": "VARCHAR(32)",
          "desc": "Listing ID"
        },
        {
          "name": "price_tier",
          "type": "VARCHAR(32)",
          "desc": "Price category (Budget, Standard, Luxury)"
        },
        {
          "name": "nightly_rate_usd",
          "type": "DECIMAL(10,2)",
          "desc": "Average price per night"
        },
        {
          "name": "booked_nights",
          "type": "INT",
          "desc": "Days booked in month"
        },
        {
          "name": "available_nights",
          "type": "INT",
          "desc": "Total days available"
        }
      ]
    },
    "challenge": {
      "instruction": "Calculate price_tier, avg_nightly_price, and avg_occupancy_pct ordered by avg_nightly_price ASC.",
      "template": "SELECT price_tier,\n  ROUND(AVG(nightly_rate_usd), 2) AS avg_nightly_price,\n  ROUND(100.0 * SUM(booked_nights) / SUM(available_nights), 2) AS avg_occupancy_pct\nFROM listing_monthly_performance\nWHERE available_nights > 0\nGROUP BY ___1___\nORDER BY avg_nightly_price ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Group Column",
          "answer": "price_tier",
          "options": [
            "price_tier",
            "listing_id",
            "nightly_rate_usd",
            "booked_nights"
          ]
        },
        {
          "id": 2,
          "label": "Sort Direction",
          "answer": "ASC",
          "options": [
            "ASC",
            "DESC",
            "OVER",
            "NULLS"
          ]
        }
      ],
      "expectedSql": "SELECT price_tier, ROUND(AVG(nightly_rate_usd), 2) AS avg_nightly_price, ROUND(100.0 * SUM(booked_nights) / SUM(available_nights), 2) AS avg_occupancy_pct FROM listing_monthly_performance WHERE available_nights > 0 GROUP BY price_tier ORDER BY avg_nightly_price ASC;",
      "managerReview": "Clear elasticity curve: Budget achieved 82.4% occupancy at $85/night; Luxury held 46.1% at $420/night, maximizing total RevPAL."
    }
  },
  {
    "day": 3,
    "week": 1,
    "phase": "Marketplace Search & Pricing",
    "title": "Day 03: Weekend vs Midweek Nightly Pricing Premiums",
    "sender": "Sarah Lin",
    "senderRole": "Staff Marketplace Architect",
    "senderAvatar": "SL",
    "priority": "P2",
    "department": "Revenue Management",
    "slackMessage": "Weekend premiums (Fri-Sat) drive over 40% of host profits. Compare avg_weekend_price against avg_midweek_price across property_type (Entire Apt, Private Room, Villa). Calculate weekend_markup_pct.",
    "contextReport": "Leisure travel concentrates on weekends, while business travel peaks midweek. Tracking markup spreads prevents hosts from overpricing midweek and leaving inventory unbooked.",
    "schema": {
      "tableName": "calendar_pricing_rules",
      "columns": [
        {
          "name": "property_type",
          "type": "VARCHAR(32)",
          "desc": "Property type"
        },
        {
          "name": "is_weekend",
          "type": "TINYINT",
          "desc": "1 for Fri/Sat, 0 otherwise"
        },
        {
          "name": "price_usd",
          "type": "DECIMAL(10,2)",
          "desc": "Nightly rate"
        }
      ]
    },
    "challenge": {
      "instruction": "Compute property_type, weekend_avg, midweek_avg, and markup_pct ordered by markup_pct DESC.",
      "template": "SELECT property_type,\n  ROUND(AVG(CASE WHEN is_weekend = 1 THEN price_usd END), 2) AS weekend_avg,\n  ROUND(AVG(CASE WHEN is_weekend = 0 THEN price_usd END), 2) AS midweek_avg,\n  ROUND(100.0 * (AVG(CASE WHEN is_weekend = 1 THEN price_usd END) - AVG(CASE WHEN is_weekend = 0 THEN price_usd END)) / AVG(CASE WHEN is_weekend = 0 THEN price_usd END), 2) AS markup_pct\nFROM calendar_pricing_rules\nGROUP BY ___1___\nORDER BY markup_pct ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Grouping Dimension",
          "answer": "property_type",
          "options": [
            "property_type",
            "is_weekend",
            "price_usd",
            "markup_pct"
          ]
        },
        {
          "id": 2,
          "label": "Order Direction",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "HAVING",
            "LIMIT"
          ]
        }
      ],
      "expectedSql": "SELECT property_type, ROUND(AVG(CASE WHEN is_weekend = 1 THEN price_usd END), 2) AS weekend_avg, ROUND(AVG(CASE WHEN is_weekend = 0 THEN price_usd END), 2) AS midweek_avg, ROUND(100.0 * (AVG(CASE WHEN is_weekend = 1 THEN price_usd END) - AVG(CASE WHEN is_weekend = 0 THEN price_usd END)) / AVG(CASE WHEN is_weekend = 0 THEN price_usd END), 2) AS markup_pct FROM calendar_pricing_rules GROUP BY property_type ORDER BY markup_pct DESC;",
      "managerReview": "Villas capture a 34.2% weekend premium, while Private Rooms only capture 11.5%. Smart Pricing models will adjust regional baselines."
    }
  },
  {
    "day": 4,
    "week": 1,
    "phase": "Marketplace Search & Pricing",
    "title": "Day 04: Minimum Night Stay Restriction Friction & Search Drop-Off",
    "sender": "Elena Rostova",
    "senderRole": "Lead Marketplace Data Scientist",
    "senderAvatar": "ER",
    "priority": "P1",
    "department": "Marketplace Search & Discovery",
    "slackMessage": "Hosts setting 5+ night minimums are seeing booking inquiries collapse. Group search queries by requested_stay_length and calculate the percent of searches that found zero available listings due to min_nights constraint.",
    "contextReport": "Minimum stay requirements protect host cleaning margins but create friction for 1-2 night city weekenders. Identifying search drop-off informs host nudges.",
    "schema": {
      "tableName": "search_filter_results",
      "columns": [
        {
          "name": "stay_nights",
          "type": "INT",
          "desc": "Length of stay requested by guest"
        },
        {
          "name": "search_count",
          "type": "INT",
          "desc": "Total searches conducted"
        },
        {
          "name": "blocked_by_min_nights",
          "type": "INT",
          "desc": "Searches where 0 listings matched min night filter"
        }
      ]
    },
    "challenge": {
      "instruction": "Compute stay_nights, total_searches, and blocked_pct ordered by stay_nights ASC.",
      "template": "SELECT stay_nights,\n  SUM(search_count) AS total_searches,\n  SUM(blocked_by_min_nights) AS total_blocked,\n  ROUND(100.0 * SUM(blocked_by_min_nights) / SUM(search_count), 2) AS blocked_pct\nFROM search_filter_results\nGROUP BY ___1___\nORDER BY stay_nights ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Dimension",
          "answer": "stay_nights",
          "options": [
            "stay_nights",
            "search_count",
            "total_blocked",
            "blocked_pct"
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
      "expectedSql": "SELECT stay_nights, SUM(search_count) AS total_searches, SUM(blocked_by_min_nights) AS total_blocked, ROUND(100.0 * SUM(blocked_by_min_nights) / SUM(search_count), 2) AS blocked_pct FROM search_filter_results GROUP BY stay_nights ORDER BY stay_nights ASC;",
      "managerReview": "1-night searches face a massive 68.4% blockage rate. Nudging hosts to relax 1-night restrictions midweek will unlock $14M in bookings."
    }
  },
  {
    "day": 5,
    "week": 1,
    "phase": "Marketplace Search & Pricing",
    "title": "Day 05: Superhost Badge Quality Invariant Verification",
    "sender": "Nathan Blecharczyk",
    "senderRole": "Chief Strategy Officer & Co-Founder",
    "senderAvatar": "NB",
    "priority": "P0",
    "department": "Trust & Quality Standards",
    "slackMessage": "Superhost assessment quarter is closing. The invariant: a host must have rating >= 4.8, cancellation_rate <= 1.0%, and response_rate >= 90.0%. Write a query identifying all hosts who currently hold the badge but violate at least one invariant.",
    "contextReport": "Superhost status grants priority placement and a trust badge. Permitting substandard hosts to retain the badge dilutes brand trust and degrades guest satisfaction scores.",
    "schema": {
      "tableName": "host_superhost_audit",
      "columns": [
        {
          "name": "host_id",
          "type": "VARCHAR(32)",
          "desc": "Host identifier"
        },
        {
          "name": "host_name",
          "type": "VARCHAR(64)",
          "desc": "Host name"
        },
        {
          "name": "overall_rating",
          "type": "DECIMAL(3,2)",
          "desc": "Average review score"
        },
        {
          "name": "host_cancellation_rate_pct",
          "type": "DECIMAL(5,2)",
          "desc": "Percent of bookings canceled by host"
        },
        {
          "name": "response_rate_pct",
          "type": "DECIMAL(5,2)",
          "desc": "Response rate within 24h"
        },
        {
          "name": "current_superhost_badge",
          "type": "TINYINT",
          "desc": "1 if currently displayed as Superhost"
        }
      ]
    },
    "challenge": {
      "instruction": "Select host_id, host_name, overall_rating, host_cancellation_rate_pct where current_superhost_badge = 1 AND invariant violated, ordered by overall_rating ASC.",
      "template": "SELECT host_id, host_name, overall_rating, host_cancellation_rate_pct, response_rate_pct\nFROM host_superhost_audit\nWHERE current_superhost_badge = 1\n  AND (overall_rating < 4.80 OR host_cancellation_rate_pct > 1.00 OR response_rate_pct < 90.0)\nORDER BY overall_rating ___1___;",
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
      "expectedSql": "SELECT host_id, host_name, overall_rating, host_cancellation_rate_pct, response_rate_pct FROM host_superhost_audit WHERE current_superhost_badge = 1 AND (overall_rating < 4.80 OR host_cancellation_rate_pct > 1.00 OR response_rate_pct < 90.0) ORDER BY overall_rating ASC;",
      "managerReview": "Found 412 lapsed hosts with excessive cancellations. Batch badge revocation job scheduled for midnight."
    }
  },
  {
    "day": 6,
    "week": 1,
    "phase": "Marketplace Search & Pricing",
    "title": "Day 06: Geo-Radius Listing Density & Spatial Clustering",
    "sender": "Sarah Lin",
    "senderRole": "Staff Marketplace Architect",
    "senderAvatar": "SL",
    "priority": "P2",
    "department": "Geospatial Marketplace",
    "slackMessage": "In dense urban centers like Barcelona and Manhattan, listing clusters can cause search map pin overcrowding. Calculate listing counts and average ADR within 500m geohash buckets to power map clustering.",
    "contextReport": "Rendering 10,000 individual pins degrades mobile client FPS. Grouping by spatial geohash-7 prefixes enables high-performance map clustering while preserving pricing transparency.",
    "schema": {
      "tableName": "listing_spatial_locations",
      "columns": [
        {
          "name": "geohash_prefix",
          "type": "VARCHAR(12)",
          "desc": "Geohash 7-character string"
        },
        {
          "name": "city_name",
          "type": "VARCHAR(64)",
          "desc": "Metro area"
        },
        {
          "name": "listing_id",
          "type": "VARCHAR(32)",
          "desc": "Listing ID"
        },
        {
          "name": "price_usd",
          "type": "DECIMAL(10,2)",
          "desc": "Nightly price"
        }
      ]
    },
    "challenge": {
      "instruction": "Compute geohash_prefix, city_name, listing_count, and avg_price ordered by listing_count DESC.",
      "template": "SELECT geohash_prefix, city_name,\n  COUNT(listing_id) AS listing_count,\n  ROUND(AVG(price_usd), 2) AS avg_cluster_price\nFROM listing_spatial_locations\nGROUP BY ___1___, city_name\nHAVING COUNT(listing_id) >= 5\nORDER BY listing_count ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Spatial Group",
          "answer": "geohash_prefix",
          "options": [
            "geohash_prefix",
            "city_name",
            "listing_id",
            "price_usd"
          ]
        },
        {
          "id": 2,
          "label": "Order Order",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "HAVING",
            "LIMIT"
          ]
        }
      ],
      "expectedSql": "SELECT geohash_prefix, city_name, COUNT(listing_id) AS listing_count, ROUND(AVG(price_usd), 2) AS avg_cluster_price FROM listing_spatial_locations GROUP BY geohash_prefix, city_name HAVING COUNT(listing_id) >= 5 ORDER BY listing_count DESC;",
      "managerReview": "Clustering algorithm deployed to production MapBox tiles. Mobile map search latency dropped from 420ms to 65ms."
    }
  },
  {
    "day": 7,
    "week": 1,
    "phase": "Marketplace Search & Pricing",
    "title": "Day 07: Week 1 Staff Architectural Review: Search-to-Booking Funnel",
    "sender": "Brian Chesky",
    "senderRole": "Co-Founder & CEO",
    "senderAvatar": "BC",
    "priority": "P0",
    "department": "Executive Leadership",
    "slackMessage": "Executive team wants a unified funnel review: search_impressions -> listing_clicks -> checkout_starts -> confirmed_bookings by device_category (iOS, Android, Mobile Web, Desktop). Show conversion rates across every stage.",
    "contextReport": "The end-to-end booking funnel highlights friction points. Mobile Web often suffers from checkout payment friction that native iOS Apple Pay seamlessly bypasses.",
    "schema": {
      "tableName": "funnel_daily_events",
      "columns": [
        {
          "name": "device_category",
          "type": "VARCHAR(32)",
          "desc": "Device platform"
        },
        {
          "name": "impressions",
          "type": "INT",
          "desc": "Total impressions"
        },
        {
          "name": "clicks",
          "type": "INT",
          "desc": "Listing clicks"
        },
        {
          "name": "checkout_starts",
          "type": "INT",
          "desc": "Checkout initiated"
        },
        {
          "name": "confirmed_bookings",
          "type": "INT",
          "desc": "Successful paid bookings"
        }
      ]
    },
    "challenge": {
      "instruction": "Compute device_category, total_impressions, click_through_pct, and checkout_to_book_pct ordered by confirmed_bookings DESC.",
      "template": "SELECT device_category,\n  SUM(impressions) AS total_impressions,\n  ROUND(100.0 * SUM(clicks) / SUM(impressions), 2) AS click_through_pct,\n  ROUND(100.0 * SUM(confirmed_bookings) / SUM(checkout_starts), 2) AS checkout_to_book_pct,\n  SUM(confirmed_bookings) AS total_confirmed\nFROM funnel_daily_events\nGROUP BY ___1___\nORDER BY total_confirmed ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Platform Dimension",
          "answer": "device_category",
          "options": [
            "device_category",
            "impressions",
            "clicks",
            "confirmed_bookings"
          ]
        },
        {
          "id": 2,
          "label": "Sort Order",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "OVER",
            "LIMIT"
          ]
        }
      ],
      "expectedSql": "SELECT device_category, SUM(impressions) AS total_impressions, ROUND(100.0 * SUM(clicks) / SUM(impressions), 2) AS click_through_pct, ROUND(100.0 * SUM(confirmed_bookings) / SUM(checkout_starts), 2) AS checkout_to_book_pct, SUM(confirmed_bookings) AS total_confirmed FROM funnel_daily_events GROUP BY device_category ORDER BY total_confirmed DESC;",
      "managerReview": "Outstanding executive review! iOS converted 78.4% of checkout starts into paid bookings, while Mobile Web lagged at 51.2% due to 3DS friction."
    }
  },
  {
    "day": 8,
    "week": 2,
    "phase": "Calendar Gaps & Availability",
    "title": "Day 08: Contiguous Booking Slot Island & Gap Identification",
    "sender": "Sarah Lin",
    "senderRole": "Staff Marketplace Architect",
    "senderAvatar": "SL",
    "priority": "P1",
    "department": "Calendar Platform Infrastructure",
    "slackMessage": "Team, calendar sync and availability invariance is critical for Day 08: Contiguous Booking Slot Island & Gap Identification. Run the analysis on table listing_calendar_slots to identify pipeline anomalies.",
    "contextReport": "Calendar state machine must guarantee no double bookings while preventing unbookable orphan date gaps between reservation islands.",
    "schema": {
      "tableName": "listing_calendar_slots",
      "columns": [
        {
          "name": "id",
          "type": "VARCHAR(32)",
          "desc": "Record ID"
        },
        {
          "name": "status",
          "type": "VARCHAR(32)",
          "desc": "Execution Status"
        },
        {
          "name": "metric_val",
          "type": "DECIMAL(10,2)",
          "desc": "Calculated value"
        }
      ]
    },
    "challenge": {
      "instruction": "Execute inspection on listing_calendar_slots to verify calendar invariants.",
      "template": "SELECT * FROM listing_calendar_slots WHERE id IS NOT ___1___ ORDER BY id ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Null Check",
          "answer": "NULL",
          "options": [
            "NULL",
            "EMPTY",
            "ZERO",
            "FALSE"
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
      "expectedSql": "SELECT * FROM listing_calendar_slots WHERE id IS NOT NULL ORDER BY id ASC;",
      "managerReview": "Production invariant verified on listing_calendar_slots. No calendar synchronization drift detected."
    }
  },
  {
    "day": 9,
    "week": 2,
    "phase": "Calendar Gaps & Availability",
    "title": "Day 09: Orphan 1-Day Gap Auto-Discounting Optimization",
    "sender": "Sarah Lin",
    "senderRole": "Staff Marketplace Architect",
    "senderAvatar": "SL",
    "priority": "P2",
    "department": "Calendar Platform Infrastructure",
    "slackMessage": "Team, calendar sync and availability invariance is critical for Day 09: Orphan 1-Day Gap Auto-Discounting Optimization. Run the analysis on table calendar_orphan_gaps to identify pipeline anomalies.",
    "contextReport": "Calendar state machine must guarantee no double bookings while preventing unbookable orphan date gaps between reservation islands.",
    "schema": {
      "tableName": "calendar_orphan_gaps",
      "columns": [
        {
          "name": "id",
          "type": "VARCHAR(32)",
          "desc": "Record ID"
        },
        {
          "name": "status",
          "type": "VARCHAR(32)",
          "desc": "Execution Status"
        },
        {
          "name": "metric_val",
          "type": "DECIMAL(10,2)",
          "desc": "Calculated value"
        }
      ]
    },
    "challenge": {
      "instruction": "Execute inspection on calendar_orphan_gaps to verify calendar invariants.",
      "template": "SELECT * FROM calendar_orphan_gaps WHERE id IS NOT ___1___ ORDER BY id ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Null Check",
          "answer": "NULL",
          "options": [
            "NULL",
            "EMPTY",
            "ZERO",
            "FALSE"
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
      "expectedSql": "SELECT * FROM calendar_orphan_gaps WHERE id IS NOT NULL ORDER BY id ASC;",
      "managerReview": "Production invariant verified on calendar_orphan_gaps. No calendar synchronization drift detected."
    }
  },
  {
    "day": 10,
    "week": 2,
    "phase": "Calendar Gaps & Availability",
    "title": "Day 10: Instant Book vs Request-to-Book Conversion Velocity",
    "sender": "Sarah Lin",
    "senderRole": "Staff Marketplace Architect",
    "senderAvatar": "SL",
    "priority": "P1",
    "department": "Calendar Platform Infrastructure",
    "slackMessage": "Team, calendar sync and availability invariance is critical for Day 10: Instant Book vs Request-to-Book Conversion Velocity. Run the analysis on table booking_request_funnel to identify pipeline anomalies.",
    "contextReport": "Calendar state machine must guarantee no double bookings while preventing unbookable orphan date gaps between reservation islands.",
    "schema": {
      "tableName": "booking_request_funnel",
      "columns": [
        {
          "name": "id",
          "type": "VARCHAR(32)",
          "desc": "Record ID"
        },
        {
          "name": "status",
          "type": "VARCHAR(32)",
          "desc": "Execution Status"
        },
        {
          "name": "metric_val",
          "type": "DECIMAL(10,2)",
          "desc": "Calculated value"
        }
      ]
    },
    "challenge": {
      "instruction": "Execute inspection on booking_request_funnel to verify calendar invariants.",
      "template": "SELECT * FROM booking_request_funnel WHERE id IS NOT ___1___ ORDER BY id ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Null Check",
          "answer": "NULL",
          "options": [
            "NULL",
            "EMPTY",
            "ZERO",
            "FALSE"
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
      "expectedSql": "SELECT * FROM booking_request_funnel WHERE id IS NOT NULL ORDER BY id ASC;",
      "managerReview": "Production invariant verified on booking_request_funnel. No calendar synchronization drift detected."
    }
  },
  {
    "day": 11,
    "week": 2,
    "phase": "Calendar Gaps & Availability",
    "title": "Day 11: Host Calendar Manual Block Flapping Telemetry",
    "sender": "Sarah Lin",
    "senderRole": "Staff Marketplace Architect",
    "senderAvatar": "SL",
    "priority": "P2",
    "department": "Calendar Platform Infrastructure",
    "slackMessage": "Team, calendar sync and availability invariance is critical for Day 11: Host Calendar Manual Block Flapping Telemetry. Run the analysis on table calendar_block_events to identify pipeline anomalies.",
    "contextReport": "Calendar state machine must guarantee no double bookings while preventing unbookable orphan date gaps between reservation islands.",
    "schema": {
      "tableName": "calendar_block_events",
      "columns": [
        {
          "name": "id",
          "type": "VARCHAR(32)",
          "desc": "Record ID"
        },
        {
          "name": "status",
          "type": "VARCHAR(32)",
          "desc": "Execution Status"
        },
        {
          "name": "metric_val",
          "type": "DECIMAL(10,2)",
          "desc": "Calculated value"
        }
      ]
    },
    "challenge": {
      "instruction": "Execute inspection on calendar_block_events to verify calendar invariants.",
      "template": "SELECT * FROM calendar_block_events WHERE id IS NOT ___1___ ORDER BY id ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Null Check",
          "answer": "NULL",
          "options": [
            "NULL",
            "EMPTY",
            "ZERO",
            "FALSE"
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
      "expectedSql": "SELECT * FROM calendar_block_events WHERE id IS NOT NULL ORDER BY id ASC;",
      "managerReview": "Production invariant verified on calendar_block_events. No calendar synchronization drift detected."
    }
  },
  {
    "day": 12,
    "week": 2,
    "phase": "Calendar Gaps & Availability",
    "title": "Day 12: Peak Summer Seasonal Compression Index",
    "sender": "Sarah Lin",
    "senderRole": "Staff Marketplace Architect",
    "senderAvatar": "SL",
    "priority": "P2",
    "department": "Calendar Platform Infrastructure",
    "slackMessage": "Team, calendar sync and availability invariance is critical for Day 12: Peak Summer Seasonal Compression Index. Run the analysis on table market_seasonal_capacity to identify pipeline anomalies.",
    "contextReport": "Calendar state machine must guarantee no double bookings while preventing unbookable orphan date gaps between reservation islands.",
    "schema": {
      "tableName": "market_seasonal_capacity",
      "columns": [
        {
          "name": "id",
          "type": "VARCHAR(32)",
          "desc": "Record ID"
        },
        {
          "name": "status",
          "type": "VARCHAR(32)",
          "desc": "Execution Status"
        },
        {
          "name": "metric_val",
          "type": "DECIMAL(10,2)",
          "desc": "Calculated value"
        }
      ]
    },
    "challenge": {
      "instruction": "Execute inspection on market_seasonal_capacity to verify calendar invariants.",
      "template": "SELECT * FROM market_seasonal_capacity WHERE id IS NOT ___1___ ORDER BY id ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Null Check",
          "answer": "NULL",
          "options": [
            "NULL",
            "EMPTY",
            "ZERO",
            "FALSE"
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
      "expectedSql": "SELECT * FROM market_seasonal_capacity WHERE id IS NOT NULL ORDER BY id ASC;",
      "managerReview": "Production invariant verified on market_seasonal_capacity. No calendar synchronization drift detected."
    }
  },
  {
    "day": 13,
    "week": 2,
    "phase": "Calendar Gaps & Availability",
    "title": "Day 13: Multi-Listing Professional Host Cannibalization",
    "sender": "Sarah Lin",
    "senderRole": "Staff Marketplace Architect",
    "senderAvatar": "SL",
    "priority": "P2",
    "department": "Calendar Platform Infrastructure",
    "slackMessage": "Team, calendar sync and availability invariance is critical for Day 13: Multi-Listing Professional Host Cannibalization. Run the analysis on table host_portfolio_metrics to identify pipeline anomalies.",
    "contextReport": "Calendar state machine must guarantee no double bookings while preventing unbookable orphan date gaps between reservation islands.",
    "schema": {
      "tableName": "host_portfolio_metrics",
      "columns": [
        {
          "name": "id",
          "type": "VARCHAR(32)",
          "desc": "Record ID"
        },
        {
          "name": "status",
          "type": "VARCHAR(32)",
          "desc": "Execution Status"
        },
        {
          "name": "metric_val",
          "type": "DECIMAL(10,2)",
          "desc": "Calculated value"
        }
      ]
    },
    "challenge": {
      "instruction": "Execute inspection on host_portfolio_metrics to verify calendar invariants.",
      "template": "SELECT * FROM host_portfolio_metrics WHERE id IS NOT ___1___ ORDER BY id ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Null Check",
          "answer": "NULL",
          "options": [
            "NULL",
            "EMPTY",
            "ZERO",
            "FALSE"
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
      "expectedSql": "SELECT * FROM host_portfolio_metrics WHERE id IS NOT NULL ORDER BY id ASC;",
      "managerReview": "Production invariant verified on host_portfolio_metrics. No calendar synchronization drift detected."
    }
  },
  {
    "day": 14,
    "week": 2,
    "phase": "Calendar Gaps & Availability",
    "title": "Day 14: Week 2 Staff Architectural Review: Calendar State Invariants",
    "sender": "Sarah Lin",
    "senderRole": "Staff Marketplace Architect",
    "senderAvatar": "SL",
    "priority": "P1",
    "department": "Calendar Platform Infrastructure",
    "slackMessage": "Team, calendar sync and availability invariance is critical for Day 14: Week 2 Staff Architectural Review: Calendar State Invariants. Run the analysis on table calendar_state_audit to identify pipeline anomalies.",
    "contextReport": "Calendar state machine must guarantee no double bookings while preventing unbookable orphan date gaps between reservation islands.",
    "schema": {
      "tableName": "calendar_state_audit",
      "columns": [
        {
          "name": "id",
          "type": "VARCHAR(32)",
          "desc": "Record ID"
        },
        {
          "name": "status",
          "type": "VARCHAR(32)",
          "desc": "Execution Status"
        },
        {
          "name": "metric_val",
          "type": "DECIMAL(10,2)",
          "desc": "Calculated value"
        }
      ]
    },
    "challenge": {
      "instruction": "Execute inspection on calendar_state_audit to verify calendar invariants.",
      "template": "SELECT * FROM calendar_state_audit WHERE id IS NOT ___1___ ORDER BY id ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Null Check",
          "answer": "NULL",
          "options": [
            "NULL",
            "EMPTY",
            "ZERO",
            "FALSE"
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
      "expectedSql": "SELECT * FROM calendar_state_audit WHERE id IS NOT NULL ORDER BY id ASC;",
      "managerReview": "Production invariant verified on calendar_state_audit. No calendar synchronization drift detected."
    }
  },
  {
    "day": 15,
    "week": 3,
    "phase": "Financial Settlement & Tax",
    "title": "Day 15: Flexible vs Strict Cancellation Refund Waterfall",
    "sender": "Carlos Mendes",
    "senderRole": "Senior FinTech & Tax Quant",
    "senderAvatar": "CM",
    "priority": "P0",
    "department": "Global Treasury & Payments",
    "slackMessage": "Finance compliance ticket: audit cancellation_refund_ledger to verify tax withholding, cancellation refund splits, and IRS 1099-K thresholds.",
    "contextReport": "Global travel marketplace settlement requires split-ledger integrity between host net earnings, guest refunds, local tourist occupancy tax (TOT), and Airbnb platform service fee.",
    "schema": {
      "tableName": "cancellation_refund_ledger",
      "columns": [
        {
          "name": "record_id",
          "type": "VARCHAR(32)",
          "desc": "Ledger entry ID"
        },
        {
          "name": "amount_usd",
          "type": "DECIMAL(12,2)",
          "desc": "Ledger USD value"
        },
        {
          "name": "status",
          "type": "VARCHAR(32)",
          "desc": "Reconciliation status"
        }
      ]
    },
    "challenge": {
      "instruction": "Run financial audit query on cancellation_refund_ledger ordered by amount_usd DESC.",
      "template": "SELECT * FROM cancellation_refund_ledger WHERE status = 'SETTLED' ORDER BY amount_usd ___1___ LIMIT ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Sort Direction",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "OVER",
            "NULLS"
          ]
        },
        {
          "id": 2,
          "label": "Row Limit",
          "answer": "100",
          "options": [
            "100",
            "10",
            "1",
            "1000"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM cancellation_refund_ledger WHERE status = 'SETTLED' ORDER BY amount_usd DESC LIMIT 100;",
      "managerReview": "Financial reconciliation on cancellation_refund_ledger balanced to the penny. Zero unallocated escrow balances detected."
    }
  },
  {
    "day": 16,
    "week": 3,
    "phase": "Financial Settlement & Tax",
    "title": "Day 16: Host Payout Splitting & Local VAT/City Tax Withholding",
    "sender": "Carlos Mendes",
    "senderRole": "Senior FinTech & Tax Quant",
    "senderAvatar": "CM",
    "priority": "P1",
    "department": "Global Treasury & Payments",
    "slackMessage": "Finance compliance ticket: audit tax_withholding_ledger to verify tax withholding, cancellation refund splits, and IRS 1099-K thresholds.",
    "contextReport": "Global travel marketplace settlement requires split-ledger integrity between host net earnings, guest refunds, local tourist occupancy tax (TOT), and Airbnb platform service fee.",
    "schema": {
      "tableName": "tax_withholding_ledger",
      "columns": [
        {
          "name": "record_id",
          "type": "VARCHAR(32)",
          "desc": "Ledger entry ID"
        },
        {
          "name": "amount_usd",
          "type": "DECIMAL(12,2)",
          "desc": "Ledger USD value"
        },
        {
          "name": "status",
          "type": "VARCHAR(32)",
          "desc": "Reconciliation status"
        }
      ]
    },
    "challenge": {
      "instruction": "Run financial audit query on tax_withholding_ledger ordered by amount_usd DESC.",
      "template": "SELECT * FROM tax_withholding_ledger WHERE status = 'SETTLED' ORDER BY amount_usd ___1___ LIMIT ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Sort Direction",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "OVER",
            "NULLS"
          ]
        },
        {
          "id": 2,
          "label": "Row Limit",
          "answer": "100",
          "options": [
            "100",
            "10",
            "1",
            "1000"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM tax_withholding_ledger WHERE status = 'SETTLED' ORDER BY amount_usd DESC LIMIT 100;",
      "managerReview": "Financial reconciliation on tax_withholding_ledger balanced to the penny. Zero unallocated escrow balances detected."
    }
  },
  {
    "day": 17,
    "week": 3,
    "phase": "Financial Settlement & Tax",
    "title": "Day 17: Security Deposit Damage Claim Escrow Settlement",
    "sender": "Carlos Mendes",
    "senderRole": "Senior FinTech & Tax Quant",
    "senderAvatar": "CM",
    "priority": "P1",
    "department": "Global Treasury & Payments",
    "slackMessage": "Finance compliance ticket: audit damage_escrow_claims to verify tax withholding, cancellation refund splits, and IRS 1099-K thresholds.",
    "contextReport": "Global travel marketplace settlement requires split-ledger integrity between host net earnings, guest refunds, local tourist occupancy tax (TOT), and Airbnb platform service fee.",
    "schema": {
      "tableName": "damage_escrow_claims",
      "columns": [
        {
          "name": "record_id",
          "type": "VARCHAR(32)",
          "desc": "Ledger entry ID"
        },
        {
          "name": "amount_usd",
          "type": "DECIMAL(12,2)",
          "desc": "Ledger USD value"
        },
        {
          "name": "status",
          "type": "VARCHAR(32)",
          "desc": "Reconciliation status"
        }
      ]
    },
    "challenge": {
      "instruction": "Run financial audit query on damage_escrow_claims ordered by amount_usd DESC.",
      "template": "SELECT * FROM damage_escrow_claims WHERE status = 'SETTLED' ORDER BY amount_usd ___1___ LIMIT ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Sort Direction",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "OVER",
            "NULLS"
          ]
        },
        {
          "id": 2,
          "label": "Row Limit",
          "answer": "100",
          "options": [
            "100",
            "10",
            "1",
            "1000"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM damage_escrow_claims WHERE status = 'SETTLED' ORDER BY amount_usd DESC LIMIT 100;",
      "managerReview": "Financial reconciliation on damage_escrow_claims balanced to the penny. Zero unallocated escrow balances detected."
    }
  },
  {
    "day": 18,
    "week": 3,
    "phase": "Financial Settlement & Tax",
    "title": "Day 18: Resolution Center Dispute Arbitration Loss Ratios",
    "sender": "Carlos Mendes",
    "senderRole": "Senior FinTech & Tax Quant",
    "senderAvatar": "CM",
    "priority": "P1",
    "department": "Global Treasury & Payments",
    "slackMessage": "Finance compliance ticket: audit resolution_disputes to verify tax withholding, cancellation refund splits, and IRS 1099-K thresholds.",
    "contextReport": "Global travel marketplace settlement requires split-ledger integrity between host net earnings, guest refunds, local tourist occupancy tax (TOT), and Airbnb platform service fee.",
    "schema": {
      "tableName": "resolution_disputes",
      "columns": [
        {
          "name": "record_id",
          "type": "VARCHAR(32)",
          "desc": "Ledger entry ID"
        },
        {
          "name": "amount_usd",
          "type": "DECIMAL(12,2)",
          "desc": "Ledger USD value"
        },
        {
          "name": "status",
          "type": "VARCHAR(32)",
          "desc": "Reconciliation status"
        }
      ]
    },
    "challenge": {
      "instruction": "Run financial audit query on resolution_disputes ordered by amount_usd DESC.",
      "template": "SELECT * FROM resolution_disputes WHERE status = 'SETTLED' ORDER BY amount_usd ___1___ LIMIT ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Sort Direction",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "OVER",
            "NULLS"
          ]
        },
        {
          "id": 2,
          "label": "Row Limit",
          "answer": "100",
          "options": [
            "100",
            "10",
            "1",
            "1000"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM resolution_disputes WHERE status = 'SETTLED' ORDER BY amount_usd DESC LIMIT 100;",
      "managerReview": "Financial reconciliation on resolution_disputes balanced to the penny. Zero unallocated escrow balances detected."
    }
  },
  {
    "day": 19,
    "week": 3,
    "phase": "Financial Settlement & Tax",
    "title": "Day 19: Cross-Currency FX Spread on Cross-Border Bookings",
    "sender": "Carlos Mendes",
    "senderRole": "Senior FinTech & Tax Quant",
    "senderAvatar": "CM",
    "priority": "P1",
    "department": "Global Treasury & Payments",
    "slackMessage": "Finance compliance ticket: audit cross_currency_reservations to verify tax withholding, cancellation refund splits, and IRS 1099-K thresholds.",
    "contextReport": "Global travel marketplace settlement requires split-ledger integrity between host net earnings, guest refunds, local tourist occupancy tax (TOT), and Airbnb platform service fee.",
    "schema": {
      "tableName": "cross_currency_reservations",
      "columns": [
        {
          "name": "record_id",
          "type": "VARCHAR(32)",
          "desc": "Ledger entry ID"
        },
        {
          "name": "amount_usd",
          "type": "DECIMAL(12,2)",
          "desc": "Ledger USD value"
        },
        {
          "name": "status",
          "type": "VARCHAR(32)",
          "desc": "Reconciliation status"
        }
      ]
    },
    "challenge": {
      "instruction": "Run financial audit query on cross_currency_reservations ordered by amount_usd DESC.",
      "template": "SELECT * FROM cross_currency_reservations WHERE status = 'SETTLED' ORDER BY amount_usd ___1___ LIMIT ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Sort Direction",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "OVER",
            "NULLS"
          ]
        },
        {
          "id": 2,
          "label": "Row Limit",
          "answer": "100",
          "options": [
            "100",
            "10",
            "1",
            "1000"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM cross_currency_reservations WHERE status = 'SETTLED' ORDER BY amount_usd DESC LIMIT 100;",
      "managerReview": "Financial reconciliation on cross_currency_reservations balanced to the penny. Zero unallocated escrow balances detected."
    }
  },
  {
    "day": 20,
    "week": 3,
    "phase": "Financial Settlement & Tax",
    "title": "Day 20: IRS 1099-K Regulatory Threshold Payout Reconciliation",
    "sender": "Carlos Mendes",
    "senderRole": "Senior FinTech & Tax Quant",
    "senderAvatar": "CM",
    "priority": "P0",
    "department": "Global Treasury & Payments",
    "slackMessage": "Finance compliance ticket: audit host_annual_payout_tax to verify tax withholding, cancellation refund splits, and IRS 1099-K thresholds.",
    "contextReport": "Global travel marketplace settlement requires split-ledger integrity between host net earnings, guest refunds, local tourist occupancy tax (TOT), and Airbnb platform service fee.",
    "schema": {
      "tableName": "host_annual_payout_tax",
      "columns": [
        {
          "name": "record_id",
          "type": "VARCHAR(32)",
          "desc": "Ledger entry ID"
        },
        {
          "name": "amount_usd",
          "type": "DECIMAL(12,2)",
          "desc": "Ledger USD value"
        },
        {
          "name": "status",
          "type": "VARCHAR(32)",
          "desc": "Reconciliation status"
        }
      ]
    },
    "challenge": {
      "instruction": "Run financial audit query on host_annual_payout_tax ordered by amount_usd DESC.",
      "template": "SELECT * FROM host_annual_payout_tax WHERE status = 'SETTLED' ORDER BY amount_usd ___1___ LIMIT ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Sort Direction",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "OVER",
            "NULLS"
          ]
        },
        {
          "id": 2,
          "label": "Row Limit",
          "answer": "100",
          "options": [
            "100",
            "10",
            "1",
            "1000"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM host_annual_payout_tax WHERE status = 'SETTLED' ORDER BY amount_usd DESC LIMIT 100;",
      "managerReview": "Financial reconciliation on host_annual_payout_tax balanced to the penny. Zero unallocated escrow balances detected."
    }
  },
  {
    "day": 21,
    "week": 3,
    "phase": "Financial Settlement & Tax",
    "title": "Day 21: Week 3 Staff Architectural Review: Zero-Loss Financial Invariance",
    "sender": "Carlos Mendes",
    "senderRole": "Senior FinTech & Tax Quant",
    "senderAvatar": "CM",
    "priority": "P0",
    "department": "Global Treasury & Payments",
    "slackMessage": "Finance compliance ticket: audit general_ledger_reconciliation to verify tax withholding, cancellation refund splits, and IRS 1099-K thresholds.",
    "contextReport": "Global travel marketplace settlement requires split-ledger integrity between host net earnings, guest refunds, local tourist occupancy tax (TOT), and Airbnb platform service fee.",
    "schema": {
      "tableName": "general_ledger_reconciliation",
      "columns": [
        {
          "name": "record_id",
          "type": "VARCHAR(32)",
          "desc": "Ledger entry ID"
        },
        {
          "name": "amount_usd",
          "type": "DECIMAL(12,2)",
          "desc": "Ledger USD value"
        },
        {
          "name": "status",
          "type": "VARCHAR(32)",
          "desc": "Reconciliation status"
        }
      ]
    },
    "challenge": {
      "instruction": "Run financial audit query on general_ledger_reconciliation ordered by amount_usd DESC.",
      "template": "SELECT * FROM general_ledger_reconciliation WHERE status = 'SETTLED' ORDER BY amount_usd ___1___ LIMIT ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Sort Direction",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "OVER",
            "NULLS"
          ]
        },
        {
          "id": 2,
          "label": "Row Limit",
          "answer": "100",
          "options": [
            "100",
            "10",
            "1",
            "1000"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM general_ledger_reconciliation WHERE status = 'SETTLED' ORDER BY amount_usd DESC LIMIT 100;",
      "managerReview": "Financial reconciliation on general_ledger_reconciliation balanced to the penny. Zero unallocated escrow balances detected."
    }
  },
  {
    "day": 22,
    "week": 4,
    "phase": "Trust, War Room & Staff Ops",
    "title": "Day 22: Search Ranking NDCG Score & Position Bias Correction",
    "sender": "Nathan Blecharczyk",
    "senderRole": "Co-Founder & Chief Strategy Officer",
    "senderAvatar": "NB",
    "priority": "P1",
    "department": "Core Infrastructure & Trust Engineering",
    "slackMessage": "Production War Room: Day 22: Search Ranking NDCG Score & Position Bias Correction. We need immediate SQL verification on search_ndcg_rankings before escalating to leadership.",
    "contextReport": "High-scale operational resilience test. Tier-1 travel marketplaces must maintain 99.99% availability during peak global sporting and celestial travel spikes.",
    "schema": {
      "tableName": "search_ndcg_rankings",
      "columns": [
        {
          "name": "event_id",
          "type": "VARCHAR(32)",
          "desc": "Incident event identifier"
        },
        {
          "name": "severity",
          "type": "VARCHAR(16)",
          "desc": "P0/P1/P2 Severity level"
        },
        {
          "name": "impact_score",
          "type": "DECIMAL(8,2)",
          "desc": "Calculated business impact"
        }
      ]
    },
    "challenge": {
      "instruction": "Run query on search_ndcg_rankings to assess impact across system components.",
      "template": "SELECT * FROM search_ndcg_rankings WHERE severity = 'P0' ORDER BY impact_score ___1___ LIMIT ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Sort Order",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "OVER",
            "NULLS"
          ]
        },
        {
          "id": 2,
          "label": "Batch Size",
          "answer": "50",
          "options": [
            "50",
            "10",
            "100",
            "5"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM search_ndcg_rankings WHERE severity = 'P0' ORDER BY impact_score DESC LIMIT 50;",
      "managerReview": "War room resolution approved. Day 22: Search Ranking NDCG Score & Position Bias Correction successfully mitigated without SLA violation."
    }
  },
  {
    "day": 23,
    "week": 4,
    "phase": "Trust, War Room & Staff Ops",
    "title": "Day 23: Review Sentiment Bimodal Distribution & Fake Review Rings",
    "sender": "Elena Rostova",
    "senderRole": "Lead Marketplace Data Scientist",
    "senderAvatar": "ER",
    "priority": "P1",
    "department": "Core Infrastructure & Trust Engineering",
    "slackMessage": "Production War Room: Day 23: Review Sentiment Bimodal Distribution & Fake Review Rings. We need immediate SQL verification on review_sentiment_audit before escalating to leadership.",
    "contextReport": "High-scale operational resilience test. Tier-1 travel marketplaces must maintain 99.99% availability during peak global sporting and celestial travel spikes.",
    "schema": {
      "tableName": "review_sentiment_audit",
      "columns": [
        {
          "name": "event_id",
          "type": "VARCHAR(32)",
          "desc": "Incident event identifier"
        },
        {
          "name": "severity",
          "type": "VARCHAR(16)",
          "desc": "P0/P1/P2 Severity level"
        },
        {
          "name": "impact_score",
          "type": "DECIMAL(8,2)",
          "desc": "Calculated business impact"
        }
      ]
    },
    "challenge": {
      "instruction": "Run query on review_sentiment_audit to assess impact across system components.",
      "template": "SELECT * FROM review_sentiment_audit WHERE severity = 'P0' ORDER BY impact_score ___1___ LIMIT ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Sort Order",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "OVER",
            "NULLS"
          ]
        },
        {
          "id": 2,
          "label": "Batch Size",
          "answer": "50",
          "options": [
            "50",
            "10",
            "100",
            "5"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM review_sentiment_audit WHERE severity = 'P0' ORDER BY impact_score DESC LIMIT 50;",
      "managerReview": "War room resolution approved. Day 23: Review Sentiment Bimodal Distribution & Fake Review Rings successfully mitigated without SLA violation."
    }
  },
  {
    "day": 24,
    "week": 4,
    "phase": "Trust, War Room & Staff Ops",
    "title": "Day 24: Fake Listing Bait-and-Switch Image Hash Detection",
    "sender": "Elena Rostova",
    "senderRole": "Lead Marketplace Data Scientist",
    "senderAvatar": "ER",
    "priority": "P1",
    "department": "Core Infrastructure & Trust Engineering",
    "slackMessage": "Production War Room: Day 24: Fake Listing Bait-and-Switch Image Hash Detection. We need immediate SQL verification on image_perceptual_hashes before escalating to leadership.",
    "contextReport": "High-scale operational resilience test. Tier-1 travel marketplaces must maintain 99.99% availability during peak global sporting and celestial travel spikes.",
    "schema": {
      "tableName": "image_perceptual_hashes",
      "columns": [
        {
          "name": "event_id",
          "type": "VARCHAR(32)",
          "desc": "Incident event identifier"
        },
        {
          "name": "severity",
          "type": "VARCHAR(16)",
          "desc": "P0/P1/P2 Severity level"
        },
        {
          "name": "impact_score",
          "type": "DECIMAL(8,2)",
          "desc": "Calculated business impact"
        }
      ]
    },
    "challenge": {
      "instruction": "Run query on image_perceptual_hashes to assess impact across system components.",
      "template": "SELECT * FROM image_perceptual_hashes WHERE severity = 'P0' ORDER BY impact_score ___1___ LIMIT ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Sort Order",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "OVER",
            "NULLS"
          ]
        },
        {
          "id": 2,
          "label": "Batch Size",
          "answer": "50",
          "options": [
            "50",
            "10",
            "100",
            "5"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM image_perceptual_hashes WHERE severity = 'P0' ORDER BY impact_score DESC LIMIT 50;",
      "managerReview": "War room resolution approved. Day 24: Fake Listing Bait-and-Switch Image Hash Detection successfully mitigated without SLA violation."
    }
  },
  {
    "day": 25,
    "week": 4,
    "phase": "Trust, War Room & Staff Ops",
    "title": "Day 25: Unauthorized Party & Neighborhood Noise Sensor Alerts",
    "sender": "Elena Rostova",
    "senderRole": "Lead Marketplace Data Scientist",
    "senderAvatar": "ER",
    "priority": "P0",
    "department": "Core Infrastructure & Trust Engineering",
    "slackMessage": "Production War Room: Day 25: Unauthorized Party & Neighborhood Noise Sensor Alerts. We need immediate SQL verification on noise_sensor_telemetry before escalating to leadership.",
    "contextReport": "High-scale operational resilience test. Tier-1 travel marketplaces must maintain 99.99% availability during peak global sporting and celestial travel spikes.",
    "schema": {
      "tableName": "noise_sensor_telemetry",
      "columns": [
        {
          "name": "event_id",
          "type": "VARCHAR(32)",
          "desc": "Incident event identifier"
        },
        {
          "name": "severity",
          "type": "VARCHAR(16)",
          "desc": "P0/P1/P2 Severity level"
        },
        {
          "name": "impact_score",
          "type": "DECIMAL(8,2)",
          "desc": "Calculated business impact"
        }
      ]
    },
    "challenge": {
      "instruction": "Run query on noise_sensor_telemetry to assess impact across system components.",
      "template": "SELECT * FROM noise_sensor_telemetry WHERE severity = 'P0' ORDER BY impact_score ___1___ LIMIT ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Sort Order",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "OVER",
            "NULLS"
          ]
        },
        {
          "id": 2,
          "label": "Batch Size",
          "answer": "50",
          "options": [
            "50",
            "10",
            "100",
            "5"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM noise_sensor_telemetry WHERE severity = 'P0' ORDER BY impact_score DESC LIMIT 50;",
      "managerReview": "War room resolution approved. Day 25: Unauthorized Party & Neighborhood Noise Sensor Alerts successfully mitigated without SLA violation."
    }
  },
  {
    "day": 26,
    "week": 4,
    "phase": "Trust, War Room & Staff Ops",
    "title": "Day 26: Total Solar Eclipse & Olympic Peak Demand Outage",
    "sender": "Elena Rostova",
    "senderRole": "Lead Marketplace Data Scientist",
    "senderAvatar": "ER",
    "priority": "P0",
    "department": "Core Infrastructure & Trust Engineering",
    "slackMessage": "Production War Room: Day 26: Total Solar Eclipse & Olympic Peak Demand Outage. We need immediate SQL verification on peak_event_traffic before escalating to leadership.",
    "contextReport": "High-scale operational resilience test. Tier-1 travel marketplaces must maintain 99.99% availability during peak global sporting and celestial travel spikes.",
    "schema": {
      "tableName": "peak_event_traffic",
      "columns": [
        {
          "name": "event_id",
          "type": "VARCHAR(32)",
          "desc": "Incident event identifier"
        },
        {
          "name": "severity",
          "type": "VARCHAR(16)",
          "desc": "P0/P1/P2 Severity level"
        },
        {
          "name": "impact_score",
          "type": "DECIMAL(8,2)",
          "desc": "Calculated business impact"
        }
      ]
    },
    "challenge": {
      "instruction": "Run query on peak_event_traffic to assess impact across system components.",
      "template": "SELECT * FROM peak_event_traffic WHERE severity = 'P0' ORDER BY impact_score ___1___ LIMIT ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Sort Order",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "OVER",
            "NULLS"
          ]
        },
        {
          "id": 2,
          "label": "Batch Size",
          "answer": "50",
          "options": [
            "50",
            "10",
            "100",
            "5"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM peak_event_traffic WHERE severity = 'P0' ORDER BY impact_score DESC LIMIT 50;",
      "managerReview": "War room resolution approved. Day 26: Total Solar Eclipse & Olympic Peak Demand Outage successfully mitigated without SLA violation."
    }
  },
  {
    "day": 27,
    "week": 4,
    "phase": "Trust, War Room & Staff Ops",
    "title": "Day 27: Host Cancellation Spike Incident Post-Mortem",
    "sender": "Elena Rostova",
    "senderRole": "Lead Marketplace Data Scientist",
    "senderAvatar": "ER",
    "priority": "P1",
    "department": "Core Infrastructure & Trust Engineering",
    "slackMessage": "Production War Room: Day 27: Host Cancellation Spike Incident Post-Mortem. We need immediate SQL verification on host_cancellation_incidents before escalating to leadership.",
    "contextReport": "High-scale operational resilience test. Tier-1 travel marketplaces must maintain 99.99% availability during peak global sporting and celestial travel spikes.",
    "schema": {
      "tableName": "host_cancellation_incidents",
      "columns": [
        {
          "name": "event_id",
          "type": "VARCHAR(32)",
          "desc": "Incident event identifier"
        },
        {
          "name": "severity",
          "type": "VARCHAR(16)",
          "desc": "P0/P1/P2 Severity level"
        },
        {
          "name": "impact_score",
          "type": "DECIMAL(8,2)",
          "desc": "Calculated business impact"
        }
      ]
    },
    "challenge": {
      "instruction": "Run query on host_cancellation_incidents to assess impact across system components.",
      "template": "SELECT * FROM host_cancellation_incidents WHERE severity = 'P0' ORDER BY impact_score ___1___ LIMIT ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Sort Order",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "OVER",
            "NULLS"
          ]
        },
        {
          "id": 2,
          "label": "Batch Size",
          "answer": "50",
          "options": [
            "50",
            "10",
            "100",
            "5"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM host_cancellation_incidents WHERE severity = 'P0' ORDER BY impact_score DESC LIMIT 50;",
      "managerReview": "War room resolution approved. Day 27: Host Cancellation Spike Incident Post-Mortem successfully mitigated without SLA violation."
    }
  },
  {
    "day": 28,
    "week": 4,
    "phase": "Trust, War Room & Staff Ops",
    "title": "Day 28: Global Disaster Extenuating Circumstances Fund Drawdowns",
    "sender": "Nathan Blecharczyk",
    "senderRole": "Co-Founder & Chief Strategy Officer",
    "senderAvatar": "NB",
    "priority": "P1",
    "department": "Core Infrastructure & Trust Engineering",
    "slackMessage": "Production War Room: Day 28: Global Disaster Extenuating Circumstances Fund Drawdowns. We need immediate SQL verification on extenuating_fund_drawdowns before escalating to leadership.",
    "contextReport": "High-scale operational resilience test. Tier-1 travel marketplaces must maintain 99.99% availability during peak global sporting and celestial travel spikes.",
    "schema": {
      "tableName": "extenuating_fund_drawdowns",
      "columns": [
        {
          "name": "event_id",
          "type": "VARCHAR(32)",
          "desc": "Incident event identifier"
        },
        {
          "name": "severity",
          "type": "VARCHAR(16)",
          "desc": "P0/P1/P2 Severity level"
        },
        {
          "name": "impact_score",
          "type": "DECIMAL(8,2)",
          "desc": "Calculated business impact"
        }
      ]
    },
    "challenge": {
      "instruction": "Run query on extenuating_fund_drawdowns to assess impact across system components.",
      "template": "SELECT * FROM extenuating_fund_drawdowns WHERE severity = 'P0' ORDER BY impact_score ___1___ LIMIT ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Sort Order",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "OVER",
            "NULLS"
          ]
        },
        {
          "id": 2,
          "label": "Batch Size",
          "answer": "50",
          "options": [
            "50",
            "10",
            "100",
            "5"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM extenuating_fund_drawdowns WHERE severity = 'P0' ORDER BY impact_score DESC LIMIT 50;",
      "managerReview": "War room resolution approved. Day 28: Global Disaster Extenuating Circumstances Fund Drawdowns successfully mitigated without SLA violation."
    }
  },
  {
    "day": 29,
    "week": 4,
    "phase": "Trust, War Room & Staff Ops",
    "title": "Day 29: Black Friday Cyber Monday Travel Booking Surge",
    "sender": "Elena Rostova",
    "senderRole": "Lead Marketplace Data Scientist",
    "senderAvatar": "ER",
    "priority": "P0",
    "department": "Core Infrastructure & Trust Engineering",
    "slackMessage": "Production War Room: Day 29: Black Friday Cyber Monday Travel Booking Surge. We need immediate SQL verification on bfcm_travel_metrics before escalating to leadership.",
    "contextReport": "High-scale operational resilience test. Tier-1 travel marketplaces must maintain 99.99% availability during peak global sporting and celestial travel spikes.",
    "schema": {
      "tableName": "bfcm_travel_metrics",
      "columns": [
        {
          "name": "event_id",
          "type": "VARCHAR(32)",
          "desc": "Incident event identifier"
        },
        {
          "name": "severity",
          "type": "VARCHAR(16)",
          "desc": "P0/P1/P2 Severity level"
        },
        {
          "name": "impact_score",
          "type": "DECIMAL(8,2)",
          "desc": "Calculated business impact"
        }
      ]
    },
    "challenge": {
      "instruction": "Run query on bfcm_travel_metrics to assess impact across system components.",
      "template": "SELECT * FROM bfcm_travel_metrics WHERE severity = 'P0' ORDER BY impact_score ___1___ LIMIT ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Sort Order",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "OVER",
            "NULLS"
          ]
        },
        {
          "id": 2,
          "label": "Batch Size",
          "answer": "50",
          "options": [
            "50",
            "10",
            "100",
            "5"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM bfcm_travel_metrics WHERE severity = 'P0' ORDER BY impact_score DESC LIMIT 50;",
      "managerReview": "War room resolution approved. Day 29: Black Friday Cyber Monday Travel Booking Surge successfully mitigated without SLA violation."
    }
  },
  {
    "day": 30,
    "week": 4,
    "phase": "Trust, War Room & Staff Ops",
    "title": "Day 30: Staff Travel Infrastructure Architect Promotion Defense",
    "sender": "Nathan Blecharczyk",
    "senderRole": "Co-Founder & Chief Strategy Officer",
    "senderAvatar": "NB",
    "priority": "P0",
    "department": "Core Infrastructure & Trust Engineering",
    "slackMessage": "Production War Room: Day 30: Staff Travel Infrastructure Architect Promotion Defense. We need immediate SQL verification on staff_promotion_portfolio before escalating to leadership.",
    "contextReport": "High-scale operational resilience test. Tier-1 travel marketplaces must maintain 99.99% availability during peak global sporting and celestial travel spikes.",
    "schema": {
      "tableName": "staff_promotion_portfolio",
      "columns": [
        {
          "name": "event_id",
          "type": "VARCHAR(32)",
          "desc": "Incident event identifier"
        },
        {
          "name": "severity",
          "type": "VARCHAR(16)",
          "desc": "P0/P1/P2 Severity level"
        },
        {
          "name": "impact_score",
          "type": "DECIMAL(8,2)",
          "desc": "Calculated business impact"
        }
      ]
    },
    "challenge": {
      "instruction": "Run query on staff_promotion_portfolio to assess impact across system components.",
      "template": "SELECT * FROM staff_promotion_portfolio WHERE severity = 'P0' ORDER BY impact_score ___1___ LIMIT ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Sort Order",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "OVER",
            "NULLS"
          ]
        },
        {
          "id": 2,
          "label": "Batch Size",
          "answer": "50",
          "options": [
            "50",
            "10",
            "100",
            "5"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM staff_promotion_portfolio WHERE severity = 'P0' ORDER BY impact_score DESC LIMIT 50;",
      "managerReview": "War room resolution approved. Day 30: Staff Travel Infrastructure Architect Promotion Defense successfully mitigated without SLA violation."
    }
  }
];
