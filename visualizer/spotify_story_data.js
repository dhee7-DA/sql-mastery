// =============================================================================
// SPOTIFY 30-DAY AUDIO STREAMING & CREATOR ECONOMY SIMULATION DATA
// Role: Audio Telemetry Engineer & Playlist Recommendation Quant (L4 -> L6 Staff)
// 30 Days Across 4 Progressive Weeks with Authentic Streaming & Royalty Telemetry
// =============================================================================

window.SPOTIFY_STORY_DATA = [
  {
    "day": 1,
    "week": 1,
    "phase": "Playback Telemetry & Streaming",
    "title": "Day 01: 30-Second Qualifying Stream Playback Rate by Client Platform",
    "sender": "Johan Lindqvist",
    "senderRole": "Staff Audio Telemetry Engineer",
    "senderAvatar": "JL",
    "priority": "P1",
    "department": "Core Audio Platform & Player SDK",
    "slackMessage": "Morning! In music streaming, a playback session only qualifies as a payable stream if duration_seconds >= 30. Calculate total playback sessions, qualifying streams, and qualifying_rate_pct grouped by client_platform (iOS, Android, Desktop, Web Player, Smart Speaker). Order by qualifying_rate_pct DESC.",
    "contextReport": "The 30-second rule is the fundamental industry invariant distinguishing accidental skips from genuine content consumption. Qualifying streams feed directly into artist royalty payouts and algorithmic recommendation graphs.",
    "schema": {
      "tableName": "audio_playback_sessions",
      "columns": [
        {
          "name": "session_id",
          "type": "VARCHAR(32)",
          "desc": "Unique streaming session ID"
        },
        {
          "name": "client_platform",
          "type": "VARCHAR(32)",
          "desc": "Playback device platform"
        },
        {
          "name": "duration_seconds",
          "type": "INT",
          "desc": "Continuous playback duration"
        },
        {
          "name": "is_qualifying",
          "type": "TINYINT",
          "desc": "1 if duration_seconds >= 30, else 0"
        }
      ]
    },
    "challenge": {
      "instruction": "Compute client_platform, total_streams, qualifying_streams, and qualifying_rate_pct ordered by qualifying_rate_pct DESC.",
      "template": "SELECT client_platform,\n  COUNT(*) AS total_streams,\n  SUM(CASE WHEN duration_seconds >= 30 THEN 1 ELSE 0 END) AS qualifying_streams,\n  ROUND(100.0 * SUM(CASE WHEN duration_seconds >= 30 THEN 1 ELSE 0 END) / COUNT(*), 2) AS qualifying_rate_pct\nFROM audio_playback_sessions\nGROUP BY ___1___\nORDER BY qualifying_rate_pct ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Device Dimension",
          "answer": "client_platform",
          "options": [
            "client_platform",
            "session_id",
            "duration_seconds",
            "is_qualifying"
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
      "expectedSql": "SELECT client_platform, COUNT(*) AS total_streams, SUM(CASE WHEN duration_seconds >= 30 THEN 1 ELSE 0 END) AS qualifying_streams, ROUND(100.0 * SUM(CASE WHEN duration_seconds >= 30 THEN 1 ELSE 0 END) / COUNT(*), 2) AS qualifying_rate_pct FROM audio_playback_sessions GROUP BY client_platform ORDER BY qualifying_rate_pct DESC;",
      "managerReview": "Smart Speakers led at 88.4% qualifying rate due to hands-free passive listening; Web Player lagged at 61.2% due to accidental tab closures."
    }
  },
  {
    "day": 2,
    "week": 1,
    "phase": "Playback Telemetry & Streaming",
    "title": "Day 02: Skip Rate Distribution by Song Position in Playlist",
    "sender": "Astrid Berg",
    "senderRole": "Lead Playlist Data Scientist",
    "senderAvatar": "AB",
    "priority": "P1",
    "department": "Music Discovery & Personalization",
    "slackMessage": "Users frequently skip songs early in Discover Weekly playlists. Calculate total plays, skip_count (duration_seconds < 10), and skip_rate_pct grouped by track_position_index (1 to 5).",
    "contextReport": "The 'Track 1 Problem': The opening song of a personalized playlist determines session length. If Track 1 suffers a >30% immediate skip rate, session abandonment jumps by 4.2x.",
    "schema": {
      "tableName": "playlist_track_plays",
      "columns": [
        {
          "name": "track_position_index",
          "type": "INT",
          "desc": "1-based track position in playlist"
        },
        {
          "name": "duration_seconds",
          "type": "INT",
          "desc": "Playback seconds before skip"
        },
        {
          "name": "is_skipped",
          "type": "TINYINT",
          "desc": "1 if user hit next before 10s"
        }
      ]
    },
    "challenge": {
      "instruction": "Compute track_position_index, total_plays, skip_count, and skip_rate_pct where track_position_index <= 5, ordered by track_position_index ASC.",
      "template": "SELECT track_position_index,\n  COUNT(*) AS total_plays,\n  SUM(CASE WHEN duration_seconds < 10 THEN 1 ELSE 0 END) AS skip_count,\n  ROUND(100.0 * SUM(CASE WHEN duration_seconds < 10 THEN 1 ELSE 0 END) / COUNT(*), 2) AS skip_rate_pct\nFROM playlist_track_plays\nWHERE track_position_index <= 5\nGROUP BY ___1___\nORDER BY track_position_index ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Position Index",
          "answer": "track_position_index",
          "options": [
            "track_position_index",
            "duration_seconds",
            "is_skipped",
            "skip_rate_pct"
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
      "expectedSql": "SELECT track_position_index, COUNT(*) AS total_plays, SUM(CASE WHEN duration_seconds < 10 THEN 1 ELSE 0 END) AS skip_count, ROUND(100.0 * SUM(CASE WHEN duration_seconds < 10 THEN 1 ELSE 0 END) / COUNT(*), 2) AS skip_rate_pct FROM playlist_track_plays WHERE track_position_index <= 5 GROUP BY track_position_index ORDER BY track_position_index ASC;",
      "managerReview": "Position 1 had only 14.1% skip rate, but Position 4 spiked to 38.2%. The recommendation re-ranking model will adjust similarity weighting."
    }
  },
  {
    "day": 3,
    "week": 1,
    "phase": "Playback Telemetry & Streaming",
    "title": "Day 03: Free vs Premium Audio Bitrate QoE Telemetry",
    "sender": "Johan Lindqvist",
    "senderRole": "Staff Audio Telemetry Engineer",
    "senderAvatar": "JL",
    "priority": "P2",
    "department": "Audio Codec & Delivery",
    "slackMessage": "Premium users are entitled to Very High quality (320kbps Ogg Vorbis / AAC), while Free users stream at Normal (160kbps). Group by subscription_tier and compute average bitrate_kbps, buffer_underrun_events, and p99_latency_ms.",
    "contextReport": "Ensuring strict QoS/QoE SLA differentiation between Free (ad-supported) and Premium subscriptions validates customer value while monitoring audio buffer health.",
    "schema": {
      "tableName": "audio_codec_telemetry",
      "columns": [
        {
          "name": "subscription_tier",
          "type": "VARCHAR(16)",
          "desc": "Free or Premium"
        },
        {
          "name": "actual_bitrate_kbps",
          "type": "INT",
          "desc": "Audio delivery bitrate"
        },
        {
          "name": "buffer_underruns",
          "type": "INT",
          "desc": "Stutter buffer stall events"
        }
      ]
    },
    "challenge": {
      "instruction": "Compute subscription_tier, avg_bitrate, and total_stalls ordered by avg_bitrate DESC.",
      "template": "SELECT subscription_tier,\n  ROUND(AVG(actual_bitrate_kbps), 1) AS avg_bitrate,\n  SUM(buffer_underruns) AS total_stalls\nFROM audio_codec_telemetry\nGROUP BY ___1___\nORDER BY avg_bitrate ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Tier Dimension",
          "answer": "subscription_tier",
          "options": [
            "subscription_tier",
            "actual_bitrate_kbps",
            "buffer_underruns",
            "total_stalls"
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
      "expectedSql": "SELECT subscription_tier, ROUND(AVG(actual_bitrate_kbps), 1) AS avg_bitrate, SUM(buffer_underruns) AS total_stalls FROM audio_codec_telemetry GROUP BY subscription_tier ORDER BY avg_bitrate DESC;",
      "managerReview": "Premium averaged 318.4 kbps with near-zero buffer stalls; Free held steady at 159.2 kbps."
    }
  },
  {
    "day": 4,
    "week": 1,
    "phase": "Playback Telemetry & Streaming",
    "title": "Day 04: Repeat Listeners & Track Stickiness Ratio",
    "sender": "Astrid Berg",
    "senderRole": "Lead Playlist Data Scientist",
    "senderAvatar": "AB",
    "priority": "P1",
    "department": "Music Discovery & Personalization",
    "slackMessage": "Hit songs exhibit extreme replay loops. For each track_id, calculate distinct_listeners, total_streams, and repeat_ratio (total_streams / distinct_listeners). Filter for tracks with at least 50 distinct listeners.",
    "contextReport": "Stickiness (repeat ratio > 3.0) signals organic cultural resonance vs algorithmic artificial push. Tracks with high stickiness are promoted into Viral 50 and Today's Top Hits.",
    "schema": {
      "tableName": "track_stream_logs",
      "columns": [
        {
          "name": "track_id",
          "type": "VARCHAR(32)",
          "desc": "Song ID"
        },
        {
          "name": "user_id",
          "type": "VARCHAR(32)",
          "desc": "Listener ID"
        },
        {
          "name": "stream_id",
          "type": "VARCHAR(32)",
          "desc": "Stream session ID"
        }
      ]
    },
    "challenge": {
      "instruction": "Compute track_id, unique_listeners, total_streams, and repeat_ratio where unique_listeners >= 50, ordered by repeat_ratio DESC.",
      "template": "SELECT track_id,\n  COUNT(DISTINCT user_id) AS unique_listeners,\n  COUNT(stream_id) AS total_streams,\n  ROUND(COUNT(stream_id) * 1.0 / COUNT(DISTINCT user_id), 2) AS repeat_ratio\nFROM track_stream_logs\nGROUP BY ___1___\nHAVING COUNT(DISTINCT user_id) >= 50\nORDER BY repeat_ratio ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Group Dimension",
          "answer": "track_id",
          "options": [
            "track_id",
            "user_id",
            "stream_id",
            "repeat_ratio"
          ]
        },
        {
          "id": 2,
          "label": "Sort Direction",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "HAVING",
            "LIMIT"
          ]
        }
      ],
      "expectedSql": "SELECT track_id, COUNT(DISTINCT user_id) AS unique_listeners, COUNT(stream_id) AS total_streams, ROUND(COUNT(stream_id) * 1.0 / COUNT(DISTINCT user_id), 2) AS repeat_ratio FROM track_stream_logs GROUP BY track_id HAVING COUNT(DISTINCT user_id) >= 50 ORDER BY repeat_ratio DESC;",
      "managerReview": "Top single achieved a 4.82 repeat ratio. It has been promoted to editorial priority rotation."
    }
  },
  {
    "day": 5,
    "week": 1,
    "phase": "Playback Telemetry & Streaming",
    "title": "Day 05: Offline Cache Download Sync Completion Rate",
    "sender": "Johan Lindqvist",
    "senderRole": "Staff Audio Telemetry Engineer",
    "senderAvatar": "JL",
    "priority": "P2",
    "department": "Mobile Client Storage",
    "slackMessage": "Subway commuters rely on offline playlists. Calculate total download requests, successful syncs, and download_success_rate_pct across connection_type ('WIFI', 'CELLULAR_5G', 'CELLULAR_4G').",
    "contextReport": "Large playlist offline syncing can time out on poor cellular connections. Monitoring failure rates prevents corrupt local cache chunks and unnecessary re-downloads.",
    "schema": {
      "tableName": "offline_sync_events",
      "columns": [
        {
          "name": "connection_type",
          "type": "VARCHAR(24)",
          "desc": "WIFI or Cellular network"
        },
        {
          "name": "download_status",
          "type": "VARCHAR(24)",
          "desc": "SUCCESS, FAILED, TIMEOUT"
        }
      ]
    },
    "challenge": {
      "instruction": "Compute connection_type, total_downloads, and success_rate_pct ordered by success_rate_pct DESC.",
      "template": "SELECT connection_type,\n  COUNT(*) AS total_downloads,\n  SUM(CASE WHEN download_status = 'SUCCESS' THEN 1 ELSE 0 END) AS success_downloads,\n  ROUND(100.0 * SUM(CASE WHEN download_status = 'SUCCESS' THEN 1 ELSE 0 END) / COUNT(*), 2) AS success_rate_pct\nFROM offline_sync_events\nGROUP BY ___1___\nORDER BY success_rate_pct ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Network Dimension",
          "answer": "connection_type",
          "options": [
            "connection_type",
            "download_status",
            "total_downloads",
            "success_rate_pct"
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
      "expectedSql": "SELECT connection_type, COUNT(*) AS total_downloads, SUM(CASE WHEN download_status = 'SUCCESS' THEN 1 ELSE 0 END) AS success_downloads, ROUND(100.0 * SUM(CASE WHEN download_status = 'SUCCESS' THEN 1 ELSE 0 END) / COUNT(*), 2) AS success_rate_pct FROM offline_sync_events GROUP BY connection_type ORDER BY success_rate_pct DESC;",
      "managerReview": "WiFi achieved 99.1% success; Cellular 4G lagged at 82.4% with timeout retry surges. Segmented chunking enabled."
    }
  },
  {
    "day": 6,
    "week": 1,
    "phase": "Playback Telemetry & Streaming",
    "title": "Day 06: Device Handoff Latency across Spotify Connect",
    "sender": "Johan Lindqvist",
    "senderRole": "Staff Audio Telemetry Engineer",
    "senderAvatar": "JL",
    "priority": "P1",
    "department": "Connect Infrastructure",
    "slackMessage": "Spotify Connect transfers seamless playback from phone to soundbar/console. Group by source_to_target_type (e.g. 'Phone_to_Speaker', 'Desktop_to_Phone') and calculate avg_handoff_latency_ms and failed_transfer_count.",
    "contextReport": "Playback handoff must preserve playback position within 50ms without audio pops or dropped track metadata. Latencies over 500ms trigger UI error toasts.",
    "schema": {
      "tableName": "connect_handoff_logs",
      "columns": [
        {
          "name": "handoff_pair",
          "type": "VARCHAR(48)",
          "desc": "Source and target device pair"
        },
        {
          "name": "latency_ms",
          "type": "INT",
          "desc": "Milliseconds to transfer stream"
        },
        {
          "name": "is_successful",
          "type": "TINYINT",
          "desc": "1 if seamless transfer, 0 if dropped"
        }
      ]
    },
    "challenge": {
      "instruction": "Compute handoff_pair, avg_latency_ms, and failure_count ordered by avg_latency_ms ASC.",
      "template": "SELECT handoff_pair,\n  ROUND(AVG(latency_ms), 1) AS avg_latency_ms,\n  SUM(CASE WHEN is_successful = 0 THEN 1 ELSE 0 END) AS failure_count\nFROM connect_handoff_logs\nGROUP BY ___1___\nORDER BY avg_latency_ms ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Pair Column",
          "answer": "handoff_pair",
          "options": [
            "handoff_pair",
            "latency_ms",
            "is_successful",
            "failure_count"
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
      "expectedSql": "SELECT handoff_pair, ROUND(AVG(latency_ms), 1) AS avg_latency_ms, SUM(CASE WHEN is_successful = 0 THEN 1 ELSE 0 END) AS failure_count FROM connect_handoff_logs GROUP BY handoff_pair ORDER BY avg_latency_ms ASC;",
      "managerReview": "Phone-to-Speaker averaged 112ms; Desktop-to-Console lagged at 480ms due to UPnP multicast discovery."
    }
  },
  {
    "day": 7,
    "week": 1,
    "phase": "Playback Telemetry & Streaming",
    "title": "Day 07: Week 1 Staff Architectural Review: Playback Telemetry Pipeline",
    "sender": "Gustav Söderström",
    "senderRole": "Co-President & Chief Product Officer",
    "senderAvatar": "GS",
    "priority": "P0",
    "department": "Executive Leadership",
    "slackMessage": "Executive weekly review: combine all daily playback data across global regions ('NA', 'EMEA', 'LATAM', 'APAC'). Output region_name, gross_streams, qualifying_stream_volume, and royalty_eligible_ratio_pct.",
    "contextReport": "The consolidated global playback summary is the primary input into monthly label distribution pools. Any discrepancy at this stage cascades into multimillion-dollar record label audit disputes.",
    "schema": {
      "tableName": "regional_playback_summary",
      "columns": [
        {
          "name": "region_name",
          "type": "VARCHAR(16)",
          "desc": "Global market region"
        },
        {
          "name": "gross_streams",
          "type": "BIGINT",
          "desc": "Total raw play attempts"
        },
        {
          "name": "qualifying_streams",
          "type": "BIGINT",
          "desc": "Streams meeting 30s threshold"
        }
      ]
    },
    "challenge": {
      "instruction": "Compute region_name, gross_streams, qualifying_streams, and eligible_pct ordered by qualifying_streams DESC.",
      "template": "SELECT region_name,\n  SUM(gross_streams) AS total_gross,\n  SUM(qualifying_streams) AS total_qualifying,\n  ROUND(100.0 * SUM(qualifying_streams) / SUM(gross_streams), 2) AS eligible_pct\nFROM regional_playback_summary\nGROUP BY ___1___\nORDER BY total_qualifying ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Region Group",
          "answer": "region_name",
          "options": [
            "region_name",
            "gross_streams",
            "qualifying_streams",
            "eligible_pct"
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
      "expectedSql": "SELECT region_name, SUM(gross_streams) AS total_gross, SUM(qualifying_streams) AS total_qualifying, ROUND(100.0 * SUM(qualifying_streams) / SUM(gross_streams), 2) AS eligible_pct FROM regional_playback_summary GROUP BY region_name ORDER BY total_qualifying DESC;",
      "managerReview": "Executive review signed off. EMEA generated 42.1B qualifying streams at 84.5% eligibility, leading global playback volume."
    }
  },
  {
    "day": 8,
    "week": 2,
    "phase": "Music Discovery & ML Graph",
    "title": "Day 08: Discover Weekly Collaborative Filtering Track Affinity",
    "sender": "Astrid Berg",
    "senderRole": "Lead Playlist Data Scientist",
    "senderAvatar": "AB",
    "priority": "P1",
    "department": "Music Personalization Engineering",
    "slackMessage": "Team, recommendation graph fidelity check: execute validation on collaborative_affinity_scores for Day 08: Discover Weekly Collaborative Filtering Track Affinity.",
    "contextReport": "Personalized recommendation vectors combine implicit feedback (listens, saves, skips) with audio acoustic features to populate Discover Weekly and Daily Mix.",
    "schema": {
      "tableName": "collaborative_affinity_scores",
      "columns": [
        {
          "name": "id",
          "type": "VARCHAR(32)",
          "desc": "Record ID"
        },
        {
          "name": "score",
          "type": "DECIMAL(5,2)",
          "desc": "Model Score"
        },
        {
          "name": "status",
          "type": "VARCHAR(24)",
          "desc": "Audit Status"
        }
      ]
    },
    "challenge": {
      "instruction": "Query collaborative_affinity_scores to verify recommendation distribution.",
      "template": "SELECT * FROM collaborative_affinity_scores WHERE id IS NOT ___1___ ORDER BY id ___2___;",
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
      "expectedSql": "SELECT * FROM collaborative_affinity_scores WHERE id IS NOT NULL ORDER BY id ASC;",
      "managerReview": "Recommendation invariant confirmed on collaborative_affinity_scores. No cold-start bias detected."
    }
  },
  {
    "day": 9,
    "week": 2,
    "phase": "Music Discovery & ML Graph",
    "title": "Day 09: Release Radar New Track Impression-to-Play Conversion",
    "sender": "Astrid Berg",
    "senderRole": "Lead Playlist Data Scientist",
    "senderAvatar": "AB",
    "priority": "P2",
    "department": "Music Personalization Engineering",
    "slackMessage": "Team, recommendation graph fidelity check: execute validation on release_radar_impressions for Day 09: Release Radar New Track Impression-to-Play Conversion.",
    "contextReport": "Personalized recommendation vectors combine implicit feedback (listens, saves, skips) with audio acoustic features to populate Discover Weekly and Daily Mix.",
    "schema": {
      "tableName": "release_radar_impressions",
      "columns": [
        {
          "name": "id",
          "type": "VARCHAR(32)",
          "desc": "Record ID"
        },
        {
          "name": "score",
          "type": "DECIMAL(5,2)",
          "desc": "Model Score"
        },
        {
          "name": "status",
          "type": "VARCHAR(24)",
          "desc": "Audit Status"
        }
      ]
    },
    "challenge": {
      "instruction": "Query release_radar_impressions to verify recommendation distribution.",
      "template": "SELECT * FROM release_radar_impressions WHERE id IS NOT ___1___ ORDER BY id ___2___;",
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
      "expectedSql": "SELECT * FROM release_radar_impressions WHERE id IS NOT NULL ORDER BY id ASC;",
      "managerReview": "Recommendation invariant confirmed on release_radar_impressions. No cold-start bias detected."
    }
  },
  {
    "day": 10,
    "week": 2,
    "phase": "Music Discovery & ML Graph",
    "title": "Day 10: User Created vs Editorial Playlist Follower Growth",
    "sender": "Astrid Berg",
    "senderRole": "Lead Playlist Data Scientist",
    "senderAvatar": "AB",
    "priority": "P2",
    "department": "Music Personalization Engineering",
    "slackMessage": "Team, recommendation graph fidelity check: execute validation on playlist_follower_metrics for Day 10: User Created vs Editorial Playlist Follower Growth.",
    "contextReport": "Personalized recommendation vectors combine implicit feedback (listens, saves, skips) with audio acoustic features to populate Discover Weekly and Daily Mix.",
    "schema": {
      "tableName": "playlist_follower_metrics",
      "columns": [
        {
          "name": "id",
          "type": "VARCHAR(32)",
          "desc": "Record ID"
        },
        {
          "name": "score",
          "type": "DECIMAL(5,2)",
          "desc": "Model Score"
        },
        {
          "name": "status",
          "type": "VARCHAR(24)",
          "desc": "Audit Status"
        }
      ]
    },
    "challenge": {
      "instruction": "Query playlist_follower_metrics to verify recommendation distribution.",
      "template": "SELECT * FROM playlist_follower_metrics WHERE id IS NOT ___1___ ORDER BY id ___2___;",
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
      "expectedSql": "SELECT * FROM playlist_follower_metrics WHERE id IS NOT NULL ORDER BY id ASC;",
      "managerReview": "Recommendation invariant confirmed on playlist_follower_metrics. No cold-start bias detected."
    }
  },
  {
    "day": 11,
    "week": 2,
    "phase": "Music Discovery & ML Graph",
    "title": "Day 11: Editorial vs Algorithmic Stream Attribution Matrix",
    "sender": "Astrid Berg",
    "senderRole": "Lead Playlist Data Scientist",
    "senderAvatar": "AB",
    "priority": "P1",
    "department": "Music Personalization Engineering",
    "slackMessage": "Team, recommendation graph fidelity check: execute validation on stream_source_attribution for Day 11: Editorial vs Algorithmic Stream Attribution Matrix.",
    "contextReport": "Personalized recommendation vectors combine implicit feedback (listens, saves, skips) with audio acoustic features to populate Discover Weekly and Daily Mix.",
    "schema": {
      "tableName": "stream_source_attribution",
      "columns": [
        {
          "name": "id",
          "type": "VARCHAR(32)",
          "desc": "Record ID"
        },
        {
          "name": "score",
          "type": "DECIMAL(5,2)",
          "desc": "Model Score"
        },
        {
          "name": "status",
          "type": "VARCHAR(24)",
          "desc": "Audit Status"
        }
      ]
    },
    "challenge": {
      "instruction": "Query stream_source_attribution to verify recommendation distribution.",
      "template": "SELECT * FROM stream_source_attribution WHERE id IS NOT ___1___ ORDER BY id ___2___;",
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
      "expectedSql": "SELECT * FROM stream_source_attribution WHERE id IS NOT NULL ORDER BY id ASC;",
      "managerReview": "Recommendation invariant confirmed on stream_source_attribution. No cold-start bias detected."
    }
  },
  {
    "day": 12,
    "week": 2,
    "phase": "Music Discovery & ML Graph",
    "title": "Day 12: Genre Diversity Entropy Score per User Listening Session",
    "sender": "Astrid Berg",
    "senderRole": "Lead Playlist Data Scientist",
    "senderAvatar": "AB",
    "priority": "P2",
    "department": "Music Personalization Engineering",
    "slackMessage": "Team, recommendation graph fidelity check: execute validation on user_session_entropy for Day 12: Genre Diversity Entropy Score per User Listening Session.",
    "contextReport": "Personalized recommendation vectors combine implicit feedback (listens, saves, skips) with audio acoustic features to populate Discover Weekly and Daily Mix.",
    "schema": {
      "tableName": "user_session_entropy",
      "columns": [
        {
          "name": "id",
          "type": "VARCHAR(32)",
          "desc": "Record ID"
        },
        {
          "name": "score",
          "type": "DECIMAL(5,2)",
          "desc": "Model Score"
        },
        {
          "name": "status",
          "type": "VARCHAR(24)",
          "desc": "Audit Status"
        }
      ]
    },
    "challenge": {
      "instruction": "Query user_session_entropy to verify recommendation distribution.",
      "template": "SELECT * FROM user_session_entropy WHERE id IS NOT ___1___ ORDER BY id ___2___;",
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
      "expectedSql": "SELECT * FROM user_session_entropy WHERE id IS NOT NULL ORDER BY id ASC;",
      "managerReview": "Recommendation invariant confirmed on user_session_entropy. No cold-start bias detected."
    }
  },
  {
    "day": 13,
    "week": 2,
    "phase": "Music Discovery & ML Graph",
    "title": "Day 13: Daily Mix Audio Feature Vector Clustering (Danceability vs Energy)",
    "sender": "Astrid Berg",
    "senderRole": "Lead Playlist Data Scientist",
    "senderAvatar": "AB",
    "priority": "P2",
    "department": "Music Personalization Engineering",
    "slackMessage": "Team, recommendation graph fidelity check: execute validation on track_audio_features for Day 13: Daily Mix Audio Feature Vector Clustering (Danceability vs Energy).",
    "contextReport": "Personalized recommendation vectors combine implicit feedback (listens, saves, skips) with audio acoustic features to populate Discover Weekly and Daily Mix.",
    "schema": {
      "tableName": "track_audio_features",
      "columns": [
        {
          "name": "id",
          "type": "VARCHAR(32)",
          "desc": "Record ID"
        },
        {
          "name": "score",
          "type": "DECIMAL(5,2)",
          "desc": "Model Score"
        },
        {
          "name": "status",
          "type": "VARCHAR(24)",
          "desc": "Audit Status"
        }
      ]
    },
    "challenge": {
      "instruction": "Query track_audio_features to verify recommendation distribution.",
      "template": "SELECT * FROM track_audio_features WHERE id IS NOT ___1___ ORDER BY id ___2___;",
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
      "expectedSql": "SELECT * FROM track_audio_features WHERE id IS NOT NULL ORDER BY id ASC;",
      "managerReview": "Recommendation invariant confirmed on track_audio_features. No cold-start bias detected."
    }
  },
  {
    "day": 14,
    "week": 2,
    "phase": "Music Discovery & ML Graph",
    "title": "Day 14: Week 2 Staff Architectural Review: Recommendation Graph Invariants",
    "sender": "Astrid Berg",
    "senderRole": "Lead Playlist Data Scientist",
    "senderAvatar": "AB",
    "priority": "P1",
    "department": "Music Personalization Engineering",
    "slackMessage": "Team, recommendation graph fidelity check: execute validation on recommendation_graph_audit for Day 14: Week 2 Staff Architectural Review: Recommendation Graph Invariants.",
    "contextReport": "Personalized recommendation vectors combine implicit feedback (listens, saves, skips) with audio acoustic features to populate Discover Weekly and Daily Mix.",
    "schema": {
      "tableName": "recommendation_graph_audit",
      "columns": [
        {
          "name": "id",
          "type": "VARCHAR(32)",
          "desc": "Record ID"
        },
        {
          "name": "score",
          "type": "DECIMAL(5,2)",
          "desc": "Model Score"
        },
        {
          "name": "status",
          "type": "VARCHAR(24)",
          "desc": "Audit Status"
        }
      ]
    },
    "challenge": {
      "instruction": "Query recommendation_graph_audit to verify recommendation distribution.",
      "template": "SELECT * FROM recommendation_graph_audit WHERE id IS NOT ___1___ ORDER BY id ___2___;",
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
      "expectedSql": "SELECT * FROM recommendation_graph_audit WHERE id IS NOT NULL ORDER BY id ASC;",
      "managerReview": "Recommendation invariant confirmed on recommendation_graph_audit. No cold-start bias detected."
    }
  },
  {
    "day": 15,
    "week": 3,
    "phase": "Creator Economy & Royalties",
    "title": "Day 15: Pro-Rata Master Royalty Pool Allocation per Country",
    "sender": "Astrid Berg",
    "senderRole": "Lead Royalty Data Scientist",
    "senderAvatar": "AB",
    "priority": "P0",
    "department": "Royalty & Financial Engineering",
    "slackMessage": "Financial compliance sprint: audit table country_royalty_pools for Day 15: Pro-Rata Master Royalty Pool Allocation per Country to prevent distributor royalty overpayment or leakage.",
    "contextReport": "Spotify operates on a pro-rata streamshare model: an artist receives a share of a country's net subscription and ad revenue proportional to their share of total qualifying streams in that country.",
    "schema": {
      "tableName": "country_royalty_pools",
      "columns": [
        {
          "name": "entry_id",
          "type": "VARCHAR(32)",
          "desc": "Ledger ID"
        },
        {
          "name": "amount_usd",
          "type": "DECIMAL(12,2)",
          "desc": "Settlement amount"
        },
        {
          "name": "status",
          "type": "VARCHAR(24)",
          "desc": "Reconciliation status"
        }
      ]
    },
    "challenge": {
      "instruction": "Run royalty audit query on country_royalty_pools ordered by amount_usd DESC.",
      "template": "SELECT * FROM country_royalty_pools WHERE status = 'SETTLED' ORDER BY amount_usd ___1___ LIMIT ___2___;",
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
            "50",
            "10",
            "1"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM country_royalty_pools WHERE status = 'SETTLED' ORDER BY amount_usd DESC LIMIT 100;",
      "managerReview": "Royalty allocation on country_royalty_pools verified. Streamshare pro-rata distribution matched label master contracts."
    }
  },
  {
    "day": 16,
    "week": 3,
    "phase": "Creator Economy & Royalties",
    "title": "Day 16: Major Label vs Indie Distributor Royalty Split Ledger",
    "sender": "Astrid Berg",
    "senderRole": "Lead Royalty Data Scientist",
    "senderAvatar": "AB",
    "priority": "P1",
    "department": "Royalty & Financial Engineering",
    "slackMessage": "Financial compliance sprint: audit table label_royalty_settlement for Day 16: Major Label vs Indie Distributor Royalty Split Ledger to prevent distributor royalty overpayment or leakage.",
    "contextReport": "Spotify operates on a pro-rata streamshare model: an artist receives a share of a country's net subscription and ad revenue proportional to their share of total qualifying streams in that country.",
    "schema": {
      "tableName": "label_royalty_settlement",
      "columns": [
        {
          "name": "entry_id",
          "type": "VARCHAR(32)",
          "desc": "Ledger ID"
        },
        {
          "name": "amount_usd",
          "type": "DECIMAL(12,2)",
          "desc": "Settlement amount"
        },
        {
          "name": "status",
          "type": "VARCHAR(24)",
          "desc": "Reconciliation status"
        }
      ]
    },
    "challenge": {
      "instruction": "Run royalty audit query on label_royalty_settlement ordered by amount_usd DESC.",
      "template": "SELECT * FROM label_royalty_settlement WHERE status = 'SETTLED' ORDER BY amount_usd ___1___ LIMIT ___2___;",
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
            "50",
            "10",
            "1"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM label_royalty_settlement WHERE status = 'SETTLED' ORDER BY amount_usd DESC LIMIT 100;",
      "managerReview": "Royalty allocation on label_royalty_settlement verified. Streamshare pro-rata distribution matched label master contracts."
    }
  },
  {
    "day": 17,
    "week": 3,
    "phase": "Creator Economy & Royalties",
    "title": "Day 17: Mechanical Publishing vs Sound Recording Rights Split",
    "sender": "Astrid Berg",
    "senderRole": "Lead Royalty Data Scientist",
    "senderAvatar": "AB",
    "priority": "P1",
    "department": "Royalty & Financial Engineering",
    "slackMessage": "Financial compliance sprint: audit table publishing_rights_splits for Day 17: Mechanical Publishing vs Sound Recording Rights Split to prevent distributor royalty overpayment or leakage.",
    "contextReport": "Spotify operates on a pro-rata streamshare model: an artist receives a share of a country's net subscription and ad revenue proportional to their share of total qualifying streams in that country.",
    "schema": {
      "tableName": "publishing_rights_splits",
      "columns": [
        {
          "name": "entry_id",
          "type": "VARCHAR(32)",
          "desc": "Ledger ID"
        },
        {
          "name": "amount_usd",
          "type": "DECIMAL(12,2)",
          "desc": "Settlement amount"
        },
        {
          "name": "status",
          "type": "VARCHAR(24)",
          "desc": "Reconciliation status"
        }
      ]
    },
    "challenge": {
      "instruction": "Run royalty audit query on publishing_rights_splits ordered by amount_usd DESC.",
      "template": "SELECT * FROM publishing_rights_splits WHERE status = 'SETTLED' ORDER BY amount_usd ___1___ LIMIT ___2___;",
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
            "50",
            "10",
            "1"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM publishing_rights_splits WHERE status = 'SETTLED' ORDER BY amount_usd DESC LIMIT 100;",
      "managerReview": "Royalty allocation on publishing_rights_splits verified. Streamshare pro-rata distribution matched label master contracts."
    }
  },
  {
    "day": 18,
    "week": 3,
    "phase": "Creator Economy & Royalties",
    "title": "Day 18: Artificial Streaming Fraud & Bot Farm Detection",
    "sender": "Astrid Berg",
    "senderRole": "Lead Royalty Data Scientist",
    "senderAvatar": "AB",
    "priority": "P0",
    "department": "Royalty & Financial Engineering",
    "slackMessage": "Financial compliance sprint: audit table fraudulent_stream_clusters for Day 18: Artificial Streaming Fraud & Bot Farm Detection to prevent distributor royalty overpayment or leakage.",
    "contextReport": "Spotify operates on a pro-rata streamshare model: an artist receives a share of a country's net subscription and ad revenue proportional to their share of total qualifying streams in that country.",
    "schema": {
      "tableName": "fraudulent_stream_clusters",
      "columns": [
        {
          "name": "entry_id",
          "type": "VARCHAR(32)",
          "desc": "Ledger ID"
        },
        {
          "name": "amount_usd",
          "type": "DECIMAL(12,2)",
          "desc": "Settlement amount"
        },
        {
          "name": "status",
          "type": "VARCHAR(24)",
          "desc": "Reconciliation status"
        }
      ]
    },
    "challenge": {
      "instruction": "Run royalty audit query on fraudulent_stream_clusters ordered by amount_usd DESC.",
      "template": "SELECT * FROM fraudulent_stream_clusters WHERE status = 'SETTLED' ORDER BY amount_usd ___1___ LIMIT ___2___;",
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
            "50",
            "10",
            "1"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM fraudulent_stream_clusters WHERE status = 'SETTLED' ORDER BY amount_usd DESC LIMIT 100;",
      "managerReview": "Royalty allocation on fraudulent_stream_clusters verified. Streamshare pro-rata distribution matched label master contracts."
    }
  },
  {
    "day": 19,
    "week": 3,
    "phase": "Creator Economy & Royalties",
    "title": "Day 19: Family Plan / Duo Multi-User Payout Attribution",
    "sender": "Astrid Berg",
    "senderRole": "Lead Royalty Data Scientist",
    "senderAvatar": "AB",
    "priority": "P1",
    "department": "Royalty & Financial Engineering",
    "slackMessage": "Financial compliance sprint: audit table family_account_allocation for Day 19: Family Plan / Duo Multi-User Payout Attribution to prevent distributor royalty overpayment or leakage.",
    "contextReport": "Spotify operates on a pro-rata streamshare model: an artist receives a share of a country's net subscription and ad revenue proportional to their share of total qualifying streams in that country.",
    "schema": {
      "tableName": "family_account_allocation",
      "columns": [
        {
          "name": "entry_id",
          "type": "VARCHAR(32)",
          "desc": "Ledger ID"
        },
        {
          "name": "amount_usd",
          "type": "DECIMAL(12,2)",
          "desc": "Settlement amount"
        },
        {
          "name": "status",
          "type": "VARCHAR(24)",
          "desc": "Reconciliation status"
        }
      ]
    },
    "challenge": {
      "instruction": "Run royalty audit query on family_account_allocation ordered by amount_usd DESC.",
      "template": "SELECT * FROM family_account_allocation WHERE status = 'SETTLED' ORDER BY amount_usd ___1___ LIMIT ___2___;",
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
            "50",
            "10",
            "1"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM family_account_allocation WHERE status = 'SETTLED' ORDER BY amount_usd DESC LIMIT 100;",
      "managerReview": "Royalty allocation on family_account_allocation verified. Streamshare pro-rata distribution matched label master contracts."
    }
  },
  {
    "day": 20,
    "week": 3,
    "phase": "Creator Economy & Royalties",
    "title": "Day 20: Cross-Border Currency FX Adjustment on Global Stream Pools",
    "sender": "Astrid Berg",
    "senderRole": "Lead Royalty Data Scientist",
    "senderAvatar": "AB",
    "priority": "P1",
    "department": "Royalty & Financial Engineering",
    "slackMessage": "Financial compliance sprint: audit table fx_royalty_reconciliation for Day 20: Cross-Border Currency FX Adjustment on Global Stream Pools to prevent distributor royalty overpayment or leakage.",
    "contextReport": "Spotify operates on a pro-rata streamshare model: an artist receives a share of a country's net subscription and ad revenue proportional to their share of total qualifying streams in that country.",
    "schema": {
      "tableName": "fx_royalty_reconciliation",
      "columns": [
        {
          "name": "entry_id",
          "type": "VARCHAR(32)",
          "desc": "Ledger ID"
        },
        {
          "name": "amount_usd",
          "type": "DECIMAL(12,2)",
          "desc": "Settlement amount"
        },
        {
          "name": "status",
          "type": "VARCHAR(24)",
          "desc": "Reconciliation status"
        }
      ]
    },
    "challenge": {
      "instruction": "Run royalty audit query on fx_royalty_reconciliation ordered by amount_usd DESC.",
      "template": "SELECT * FROM fx_royalty_reconciliation WHERE status = 'SETTLED' ORDER BY amount_usd ___1___ LIMIT ___2___;",
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
            "50",
            "10",
            "1"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM fx_royalty_reconciliation WHERE status = 'SETTLED' ORDER BY amount_usd DESC LIMIT 100;",
      "managerReview": "Royalty allocation on fx_royalty_reconciliation verified. Streamshare pro-rata distribution matched label master contracts."
    }
  },
  {
    "day": 21,
    "week": 3,
    "phase": "Creator Economy & Royalties",
    "title": "Day 21: Week 3 Staff Architectural Review: Zero-Leakage Royalty Accounting",
    "sender": "Astrid Berg",
    "senderRole": "Lead Royalty Data Scientist",
    "senderAvatar": "AB",
    "priority": "P0",
    "department": "Royalty & Financial Engineering",
    "slackMessage": "Financial compliance sprint: audit table royalty_general_ledger for Day 21: Week 3 Staff Architectural Review: Zero-Leakage Royalty Accounting to prevent distributor royalty overpayment or leakage.",
    "contextReport": "Spotify operates on a pro-rata streamshare model: an artist receives a share of a country's net subscription and ad revenue proportional to their share of total qualifying streams in that country.",
    "schema": {
      "tableName": "royalty_general_ledger",
      "columns": [
        {
          "name": "entry_id",
          "type": "VARCHAR(32)",
          "desc": "Ledger ID"
        },
        {
          "name": "amount_usd",
          "type": "DECIMAL(12,2)",
          "desc": "Settlement amount"
        },
        {
          "name": "status",
          "type": "VARCHAR(24)",
          "desc": "Reconciliation status"
        }
      ]
    },
    "challenge": {
      "instruction": "Run royalty audit query on royalty_general_ledger ordered by amount_usd DESC.",
      "template": "SELECT * FROM royalty_general_ledger WHERE status = 'SETTLED' ORDER BY amount_usd ___1___ LIMIT ___2___;",
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
            "50",
            "10",
            "1"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM royalty_general_ledger WHERE status = 'SETTLED' ORDER BY amount_usd DESC LIMIT 100;",
      "managerReview": "Royalty allocation on royalty_general_ledger verified. Streamshare pro-rata distribution matched label master contracts."
    }
  },
  {
    "day": 22,
    "week": 4,
    "phase": "Podcasts, War Room & Staff Ops",
    "title": "Day 22: Podcast Dynamic Ad Insertion Pacing & Fill Rate",
    "sender": "Gustav Söderström",
    "senderRole": "Co-President & Chief Product Officer",
    "senderAvatar": "GS",
    "priority": "P1",
    "department": "High-Throughput Streaming & War Room",
    "slackMessage": "Global War Room Ticket: Day 22: Podcast Dynamic Ad Insertion Pacing & Fill Rate. Query table podcast_ad_placements immediately to evaluate system degradation.",
    "contextReport": "Massive global concurrent surges (Wrapped release, midnight album drops) test Cassandra and Flyte pipeline limits. P99 latency must stay under 150ms.",
    "schema": {
      "tableName": "podcast_ad_placements",
      "columns": [
        {
          "name": "event_id",
          "type": "VARCHAR(32)",
          "desc": "War room incident ID"
        },
        {
          "name": "severity",
          "type": "VARCHAR(16)",
          "desc": "P0/P1 Severity"
        },
        {
          "name": "impact_score",
          "type": "DECIMAL(8,2)",
          "desc": "Impact Index"
        }
      ]
    },
    "challenge": {
      "instruction": "Run query on podcast_ad_placements to assess incident severity across audio streaming clusters.",
      "template": "SELECT * FROM podcast_ad_placements WHERE severity = 'P0' ORDER BY impact_score ___1___ LIMIT ___2___;",
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
          "label": "Row Limit",
          "answer": "50",
          "options": [
            "50",
            "10",
            "100",
            "5"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM podcast_ad_placements WHERE severity = 'P0' ORDER BY impact_score DESC LIMIT 50;",
      "managerReview": "Incident successfully resolved. Day 22: Podcast Dynamic Ad Insertion Pacing & Fill Rate metrics restored to normal baseline."
    }
  },
  {
    "day": 23,
    "week": 4,
    "phase": "Podcasts, War Room & Staff Ops",
    "title": "Day 23: Podcast Mid-Roll 15s Skip Forward Rate Analysis",
    "sender": "Johan Lindqvist",
    "senderRole": "Staff Audio Telemetry Engineer",
    "senderAvatar": "JL",
    "priority": "P1",
    "department": "High-Throughput Streaming & War Room",
    "slackMessage": "Global War Room Ticket: Day 23: Podcast Mid-Roll 15s Skip Forward Rate Analysis. Query table podcast_skip_telemetry immediately to evaluate system degradation.",
    "contextReport": "Massive global concurrent surges (Wrapped release, midnight album drops) test Cassandra and Flyte pipeline limits. P99 latency must stay under 150ms.",
    "schema": {
      "tableName": "podcast_skip_telemetry",
      "columns": [
        {
          "name": "event_id",
          "type": "VARCHAR(32)",
          "desc": "War room incident ID"
        },
        {
          "name": "severity",
          "type": "VARCHAR(16)",
          "desc": "P0/P1 Severity"
        },
        {
          "name": "impact_score",
          "type": "DECIMAL(8,2)",
          "desc": "Impact Index"
        }
      ]
    },
    "challenge": {
      "instruction": "Run query on podcast_skip_telemetry to assess incident severity across audio streaming clusters.",
      "template": "SELECT * FROM podcast_skip_telemetry WHERE severity = 'P0' ORDER BY impact_score ___1___ LIMIT ___2___;",
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
          "label": "Row Limit",
          "answer": "50",
          "options": [
            "50",
            "10",
            "100",
            "5"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM podcast_skip_telemetry WHERE severity = 'P0' ORDER BY impact_score DESC LIMIT 50;",
      "managerReview": "Incident successfully resolved. Day 23: Podcast Mid-Roll 15s Skip Forward Rate Analysis metrics restored to normal baseline."
    }
  },
  {
    "day": 24,
    "week": 4,
    "phase": "Podcasts, War Room & Staff Ops",
    "title": "Day 24: Audiobook 15-Hour Free Listening Cap Consumption",
    "sender": "Johan Lindqvist",
    "senderRole": "Staff Audio Telemetry Engineer",
    "senderAvatar": "JL",
    "priority": "P1",
    "department": "High-Throughput Streaming & War Room",
    "slackMessage": "Global War Room Ticket: Day 24: Audiobook 15-Hour Free Listening Cap Consumption. Query table audiobook_monthly_caps immediately to evaluate system degradation.",
    "contextReport": "Massive global concurrent surges (Wrapped release, midnight album drops) test Cassandra and Flyte pipeline limits. P99 latency must stay under 150ms.",
    "schema": {
      "tableName": "audiobook_monthly_caps",
      "columns": [
        {
          "name": "event_id",
          "type": "VARCHAR(32)",
          "desc": "War room incident ID"
        },
        {
          "name": "severity",
          "type": "VARCHAR(16)",
          "desc": "P0/P1 Severity"
        },
        {
          "name": "impact_score",
          "type": "DECIMAL(8,2)",
          "desc": "Impact Index"
        }
      ]
    },
    "challenge": {
      "instruction": "Run query on audiobook_monthly_caps to assess incident severity across audio streaming clusters.",
      "template": "SELECT * FROM audiobook_monthly_caps WHERE severity = 'P0' ORDER BY impact_score ___1___ LIMIT ___2___;",
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
          "label": "Row Limit",
          "answer": "50",
          "options": [
            "50",
            "10",
            "100",
            "5"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM audiobook_monthly_caps WHERE severity = 'P0' ORDER BY impact_score DESC LIMIT 50;",
      "managerReview": "Incident successfully resolved. Day 24: Audiobook 15-Hour Free Listening Cap Consumption metrics restored to normal baseline."
    }
  },
  {
    "day": 25,
    "week": 4,
    "phase": "Podcasts, War Room & Staff Ops",
    "title": "Day 25: New Music Friday Midnight Global Playback Spike",
    "sender": "Johan Lindqvist",
    "senderRole": "Staff Audio Telemetry Engineer",
    "senderAvatar": "JL",
    "priority": "P0",
    "department": "High-Throughput Streaming & War Room",
    "slackMessage": "Global War Room Ticket: Day 25: New Music Friday Midnight Global Playback Spike. Query table new_music_friday_spike immediately to evaluate system degradation.",
    "contextReport": "Massive global concurrent surges (Wrapped release, midnight album drops) test Cassandra and Flyte pipeline limits. P99 latency must stay under 150ms.",
    "schema": {
      "tableName": "new_music_friday_spike",
      "columns": [
        {
          "name": "event_id",
          "type": "VARCHAR(32)",
          "desc": "War room incident ID"
        },
        {
          "name": "severity",
          "type": "VARCHAR(16)",
          "desc": "P0/P1 Severity"
        },
        {
          "name": "impact_score",
          "type": "DECIMAL(8,2)",
          "desc": "Impact Index"
        }
      ]
    },
    "challenge": {
      "instruction": "Run query on new_music_friday_spike to assess incident severity across audio streaming clusters.",
      "template": "SELECT * FROM new_music_friday_spike WHERE severity = 'P0' ORDER BY impact_score ___1___ LIMIT ___2___;",
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
          "label": "Row Limit",
          "answer": "50",
          "options": [
            "50",
            "10",
            "100",
            "5"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM new_music_friday_spike WHERE severity = 'P0' ORDER BY impact_score DESC LIMIT 50;",
      "managerReview": "Incident successfully resolved. Day 25: New Music Friday Midnight Global Playback Spike metrics restored to normal baseline."
    }
  },
  {
    "day": 26,
    "week": 4,
    "phase": "Podcasts, War Room & Staff Ops",
    "title": "Day 26: Spotify Wrapped Year-End Batch Aggregation Pipeline",
    "sender": "Gustav Söderström",
    "senderRole": "Co-President & Chief Product Officer",
    "senderAvatar": "GS",
    "priority": "P0",
    "department": "High-Throughput Streaming & War Room",
    "slackMessage": "Global War Room Ticket: Day 26: Spotify Wrapped Year-End Batch Aggregation Pipeline. Query table wrapped_user_aggregates immediately to evaluate system degradation.",
    "contextReport": "Massive global concurrent surges (Wrapped release, midnight album drops) test Cassandra and Flyte pipeline limits. P99 latency must stay under 150ms.",
    "schema": {
      "tableName": "wrapped_user_aggregates",
      "columns": [
        {
          "name": "event_id",
          "type": "VARCHAR(32)",
          "desc": "War room incident ID"
        },
        {
          "name": "severity",
          "type": "VARCHAR(16)",
          "desc": "P0/P1 Severity"
        },
        {
          "name": "impact_score",
          "type": "DECIMAL(8,2)",
          "desc": "Impact Index"
        }
      ]
    },
    "challenge": {
      "instruction": "Run query on wrapped_user_aggregates to assess incident severity across audio streaming clusters.",
      "template": "SELECT * FROM wrapped_user_aggregates WHERE severity = 'P0' ORDER BY impact_score ___1___ LIMIT ___2___;",
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
          "label": "Row Limit",
          "answer": "50",
          "options": [
            "50",
            "10",
            "100",
            "5"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM wrapped_user_aggregates WHERE severity = 'P0' ORDER BY impact_score DESC LIMIT 50;",
      "managerReview": "Incident successfully resolved. Day 26: Spotify Wrapped Year-End Batch Aggregation Pipeline metrics restored to normal baseline."
    }
  },
  {
    "day": 27,
    "week": 4,
    "phase": "Podcasts, War Room & Staff Ops",
    "title": "Day 27: Major Artist Global Album Drop Telemetry Incident",
    "sender": "Johan Lindqvist",
    "senderRole": "Staff Audio Telemetry Engineer",
    "senderAvatar": "JL",
    "priority": "P0",
    "department": "High-Throughput Streaming & War Room",
    "slackMessage": "Global War Room Ticket: Day 27: Major Artist Global Album Drop Telemetry Incident. Query table album_drop_incident_logs immediately to evaluate system degradation.",
    "contextReport": "Massive global concurrent surges (Wrapped release, midnight album drops) test Cassandra and Flyte pipeline limits. P99 latency must stay under 150ms.",
    "schema": {
      "tableName": "album_drop_incident_logs",
      "columns": [
        {
          "name": "event_id",
          "type": "VARCHAR(32)",
          "desc": "War room incident ID"
        },
        {
          "name": "severity",
          "type": "VARCHAR(16)",
          "desc": "P0/P1 Severity"
        },
        {
          "name": "impact_score",
          "type": "DECIMAL(8,2)",
          "desc": "Impact Index"
        }
      ]
    },
    "challenge": {
      "instruction": "Run query on album_drop_incident_logs to assess incident severity across audio streaming clusters.",
      "template": "SELECT * FROM album_drop_incident_logs WHERE severity = 'P0' ORDER BY impact_score ___1___ LIMIT ___2___;",
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
          "label": "Row Limit",
          "answer": "50",
          "options": [
            "50",
            "10",
            "100",
            "5"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM album_drop_incident_logs WHERE severity = 'P0' ORDER BY impact_score DESC LIMIT 50;",
      "managerReview": "Incident successfully resolved. Day 27: Major Artist Global Album Drop Telemetry Incident metrics restored to normal baseline."
    }
  },
  {
    "day": 28,
    "week": 4,
    "phase": "Podcasts, War Room & Staff Ops",
    "title": "Day 28: Global CDN Edge Cache Eviction & Audio Stuttering Outage",
    "sender": "Johan Lindqvist",
    "senderRole": "Staff Audio Telemetry Engineer",
    "senderAvatar": "JL",
    "priority": "P0",
    "department": "High-Throughput Streaming & War Room",
    "slackMessage": "Global War Room Ticket: Day 28: Global CDN Edge Cache Eviction & Audio Stuttering Outage. Query table cdn_edge_evictions immediately to evaluate system degradation.",
    "contextReport": "Massive global concurrent surges (Wrapped release, midnight album drops) test Cassandra and Flyte pipeline limits. P99 latency must stay under 150ms.",
    "schema": {
      "tableName": "cdn_edge_evictions",
      "columns": [
        {
          "name": "event_id",
          "type": "VARCHAR(32)",
          "desc": "War room incident ID"
        },
        {
          "name": "severity",
          "type": "VARCHAR(16)",
          "desc": "P0/P1 Severity"
        },
        {
          "name": "impact_score",
          "type": "DECIMAL(8,2)",
          "desc": "Impact Index"
        }
      ]
    },
    "challenge": {
      "instruction": "Run query on cdn_edge_evictions to assess incident severity across audio streaming clusters.",
      "template": "SELECT * FROM cdn_edge_evictions WHERE severity = 'P0' ORDER BY impact_score ___1___ LIMIT ___2___;",
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
          "label": "Row Limit",
          "answer": "50",
          "options": [
            "50",
            "10",
            "100",
            "5"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM cdn_edge_evictions WHERE severity = 'P0' ORDER BY impact_score DESC LIMIT 50;",
      "managerReview": "Incident successfully resolved. Day 28: Global CDN Edge Cache Eviction & Audio Stuttering Outage metrics restored to normal baseline."
    }
  },
  {
    "day": 29,
    "week": 4,
    "phase": "Podcasts, War Room & Staff Ops",
    "title": "Day 29: Black Friday Premium Subscription Conversion Surge",
    "sender": "Johan Lindqvist",
    "senderRole": "Staff Audio Telemetry Engineer",
    "senderAvatar": "JL",
    "priority": "P1",
    "department": "High-Throughput Streaming & War Room",
    "slackMessage": "Global War Room Ticket: Day 29: Black Friday Premium Subscription Conversion Surge. Query table premium_conversion_surge immediately to evaluate system degradation.",
    "contextReport": "Massive global concurrent surges (Wrapped release, midnight album drops) test Cassandra and Flyte pipeline limits. P99 latency must stay under 150ms.",
    "schema": {
      "tableName": "premium_conversion_surge",
      "columns": [
        {
          "name": "event_id",
          "type": "VARCHAR(32)",
          "desc": "War room incident ID"
        },
        {
          "name": "severity",
          "type": "VARCHAR(16)",
          "desc": "P0/P1 Severity"
        },
        {
          "name": "impact_score",
          "type": "DECIMAL(8,2)",
          "desc": "Impact Index"
        }
      ]
    },
    "challenge": {
      "instruction": "Run query on premium_conversion_surge to assess incident severity across audio streaming clusters.",
      "template": "SELECT * FROM premium_conversion_surge WHERE severity = 'P0' ORDER BY impact_score ___1___ LIMIT ___2___;",
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
          "label": "Row Limit",
          "answer": "50",
          "options": [
            "50",
            "10",
            "100",
            "5"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM premium_conversion_surge WHERE severity = 'P0' ORDER BY impact_score DESC LIMIT 50;",
      "managerReview": "Incident successfully resolved. Day 29: Black Friday Premium Subscription Conversion Surge metrics restored to normal baseline."
    }
  },
  {
    "day": 30,
    "week": 4,
    "phase": "Podcasts, War Room & Staff Ops",
    "title": "Day 30: Staff Audio Infrastructure & Creator Economics Architect Promotion Defense",
    "sender": "Gustav Söderström",
    "senderRole": "Co-President & Chief Product Officer",
    "senderAvatar": "GS",
    "priority": "P0",
    "department": "High-Throughput Streaming & War Room",
    "slackMessage": "Global War Room Ticket: Day 30: Staff Audio Infrastructure & Creator Economics Architect Promotion Defense. Query table staff_promotion_defense immediately to evaluate system degradation.",
    "contextReport": "Massive global concurrent surges (Wrapped release, midnight album drops) test Cassandra and Flyte pipeline limits. P99 latency must stay under 150ms.",
    "schema": {
      "tableName": "staff_promotion_defense",
      "columns": [
        {
          "name": "event_id",
          "type": "VARCHAR(32)",
          "desc": "War room incident ID"
        },
        {
          "name": "severity",
          "type": "VARCHAR(16)",
          "desc": "P0/P1 Severity"
        },
        {
          "name": "impact_score",
          "type": "DECIMAL(8,2)",
          "desc": "Impact Index"
        }
      ]
    },
    "challenge": {
      "instruction": "Run query on staff_promotion_defense to assess incident severity across audio streaming clusters.",
      "template": "SELECT * FROM staff_promotion_defense WHERE severity = 'P0' ORDER BY impact_score ___1___ LIMIT ___2___;",
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
          "label": "Row Limit",
          "answer": "50",
          "options": [
            "50",
            "10",
            "100",
            "5"
          ]
        }
      ],
      "expectedSql": "SELECT * FROM staff_promotion_defense WHERE severity = 'P0' ORDER BY impact_score DESC LIMIT 50;",
      "managerReview": "Incident successfully resolved. Day 30: Staff Audio Infrastructure & Creator Economics Architect Promotion Defense metrics restored to normal baseline."
    }
  }
];
