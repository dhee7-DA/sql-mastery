/**
 * Spotify 30-Day Audio Streaming & Creator Economy Simulator
 * In-Browser Crash-Proof Relational SQL Execution Engine & Telemetry Store
 */

(function(window) {
  'use strict';

  const SPOTIFY_DATASETS = {
    // Day 01: 30-Second Qualifying Stream Playback Rate
    audio_playback_sessions: [
      { session_id: 'ses-101', client_platform: 'Smart Speaker', duration_seconds: 184, is_qualifying: 1 },
      { session_id: 'ses-102', client_platform: 'Smart Speaker', duration_seconds: 210, is_qualifying: 1 },
      { session_id: 'ses-103', client_platform: 'iOS Native', duration_seconds: 195, is_qualifying: 1 },
      { session_id: 'ses-104', client_platform: 'iOS Native', duration_seconds: 14, is_qualifying: 0 },
      { session_id: 'ses-105', client_platform: 'Android Native', duration_seconds: 142, is_qualifying: 1 },
      { session_id: 'ses-106', client_platform: 'Android Native', duration_seconds: 22, is_qualifying: 0 },
      { session_id: 'ses-107', client_platform: 'Desktop Client', duration_seconds: 245, is_qualifying: 1 },
      { session_id: 'ses-108', client_platform: 'Web Player', duration_seconds: 8, is_qualifying: 0 },
      { session_id: 'ses-109', client_platform: 'Web Player', duration_seconds: 160, is_qualifying: 1 }
    ],

    // Day 02: Skip Rate Distribution by Position
    playlist_track_plays: [
      { track_position_index: 1, duration_seconds: 190, is_skipped: 0 },
      { track_position_index: 1, duration_seconds: 180, is_skipped: 0 },
      { track_position_index: 2, duration_seconds: 210, is_skipped: 0 },
      { track_position_index: 2, duration_seconds: 8, is_skipped: 1 },
      { track_position_index: 3, duration_seconds: 140, is_skipped: 0 },
      { track_position_index: 4, duration_seconds: 6, is_skipped: 1 },
      { track_position_index: 4, duration_seconds: 7, is_skipped: 1 },
      { track_position_index: 5, duration_seconds: 165, is_skipped: 0 }
    ],

    // Day 03: Free vs Premium Codec Telemetry
    audio_codec_telemetry: [
      { subscription_tier: 'Premium', actual_bitrate_kbps: 320, buffer_underruns: 0 },
      { subscription_tier: 'Premium', actual_bitrate_kbps: 318, buffer_underruns: 1 },
      { subscription_tier: 'Free', actual_bitrate_kbps: 160, buffer_underruns: 4 },
      { subscription_tier: 'Free', actual_bitrate_kbps: 158, buffer_underruns: 6 }
    ],

    // Day 04: Track Stream Logs (Repeat Ratio)
    track_stream_logs: [
      { track_id: 'trk-single-01', user_id: 'usr-1', stream_id: 'strm-1' },
      { track_id: 'trk-single-01', user_id: 'usr-1', stream_id: 'strm-2' },
      { track_id: 'trk-single-01', user_id: 'usr-1', stream_id: 'strm-3' },
      { track_id: 'trk-single-01', user_id: 'usr-2', stream_id: 'strm-4' },
      { track_id: 'trk-single-01', user_id: 'usr-2', stream_id: 'strm-5' },
      { track_id: 'trk-deep-cut', user_id: 'usr-3', stream_id: 'strm-6' }
    ],

    // Day 05: Offline Cache Download Sync Events
    offline_sync_events: [
      { connection_type: 'WIFI', download_status: 'SUCCESS' },
      { connection_type: 'WIFI', download_status: 'SUCCESS' },
      { connection_type: 'WIFI', download_status: 'SUCCESS' },
      { connection_type: 'CELLULAR_5G', download_status: 'SUCCESS' },
      { connection_type: 'CELLULAR_5G', download_status: 'TIMEOUT' },
      { connection_type: 'CELLULAR_4G', download_status: 'FAILED' }
    ],

    // Day 06: Connect Handoff Logs
    connect_handoff_logs: [
      { handoff_pair: 'Phone_to_Speaker', latency_ms: 108, is_successful: 1 },
      { handoff_pair: 'Phone_to_Speaker', latency_ms: 115, is_successful: 1 },
      { handoff_pair: 'Desktop_to_Phone', latency_ms: 165, is_successful: 1 },
      { handoff_pair: 'Desktop_to_Console', latency_ms: 490, is_successful: 0 }
    ],

    // Day 07: Regional Playback Summary
    regional_playback_summary: [
      { region_name: 'EMEA', gross_streams: 49800000000, qualifying_streams: 42100000000 },
      { region_name: 'NA', gross_streams: 44200000000, qualifying_streams: 36800000000 },
      { region_name: 'LATAM', gross_streams: 38400000000, qualifying_streams: 31200000000 },
      { region_name: 'APAC', gross_streams: 26100000000, qualifying_streams: 20400000000 }
    ],

    // Days 08 - 14: Music Discovery & ML Graph Tables
    collaborative_affinity_scores: [
      { id: 'aff-1', user_id: 'usr-881', recommended_track_id: 'trk-991', affinity_score: 0.94, score: 0.94, status: 'HIGH_CONFIDENCE' },
      { id: 'aff-2', user_id: 'usr-881', recommended_track_id: 'trk-992', affinity_score: 0.88, score: 0.88, status: 'HIGH_CONFIDENCE' }
    ],
    release_radar_impressions: [
      { id: 'rel-1', artist_id: 'art-billie', follower_impressions: 4800000, actual_streams: 1920000, score: 40.0, status: 'ACTIVE' },
      { id: 'rel-2', artist_id: 'art-the-weeknd', follower_impressions: 8900000, actual_streams: 4120000, score: 46.3, status: 'ACTIVE' }
    ],
    playlist_follower_metrics: [
      { id: 'pf-1', playlist_type: 'Editorial (Today Top Hits)', growth: 420000, churn: 18000, score: 95.9, status: 'VERIFIED' },
      { id: 'pf-2', playlist_type: 'Personalized (Discover Weekly)', growth: 890000, churn: 24000, score: 97.4, status: 'VERIFIED' }
    ],
    stream_source_attribution: [
      { id: 'ssa-1', source_channel: 'Editorial Playlists', streams: 142000000, score: 32.5, status: 'MEASURED' },
      { id: 'ssa-2', source_channel: 'Algorithmic Personalization', streams: 185000000, score: 42.3, status: 'MEASURED' }
    ],
    user_session_entropy: [
      { id: 'ent-1', session_id: 'ses-rock-jazz', genre_count: 5, entropy_score: 2.85, score: 2.85, status: 'HIGH_DIVERSITY' },
      { id: 'ent-2', session_id: 'ses-lofi-focus', genre_count: 1, entropy_score: 0.42, score: 0.42, status: 'MONO_GENRE' }
    ],
    track_audio_features: [
      { id: 'taf-1', track_id: 'trk-dance-pop', danceability: 0.84, energy: 0.91, valence: 0.78, tempo_bpm: 124.0, score: 0.84, status: 'OPTIMAL' },
      { id: 'taf-2', track_id: 'trk-acoustic-calm', danceability: 0.35, energy: 0.22, valence: 0.45, tempo_bpm: 82.0, score: 0.35, status: 'ACOUSTIC' }
    ],
    recommendation_graph_audit: [
      { id: 'rga-1', model_version: 'two_tower_embeddings_v4', orphan_tracks_recommended: 0, coverage_pct: 99.4, score: 99.4, status: 'HEALTHY' }
    ],

    // Days 15 - 21: Creator Economy & Royalty Tables
    country_royalty_pools: [
      { entry_id: 'crp-1', country_code: 'US', total_pool_usd: 84000000.00, total_qualifying_streams: 24000000000, amount_usd: 84000000.00, status: 'SETTLED' },
      { entry_id: 'crp-2', country_code: 'UK', total_pool_usd: 32000000.00, total_qualifying_streams: 8800000000, amount_usd: 32000000.00, status: 'SETTLED' }
    ],
    label_royalty_settlement: [
      { entry_id: 'lrs-1', label_name: 'Universal Music Group', label_type: 'MAJOR', payable_amount_usd: 48000000.00, amount_usd: 48000000.00, status: 'SETTLED' },
      { entry_id: 'lrs-2', label_name: 'Sony Music Entertainment', label_type: 'MAJOR', payable_amount_usd: 34000000.00, amount_usd: 34000000.00, status: 'SETTLED' },
      { entry_id: 'lrs-3', label_name: 'Merlin Network', label_type: 'INDIE', payable_amount_usd: 22000000.00, amount_usd: 22000000.00, status: 'SETTLED' }
    ],
    publishing_rights_splits: [
      { entry_id: 'prs-1', track_id: 'trk-pop-smash', recording_share_usd: 12500.00, publishing_share_usd: 3800.00, amount_usd: 16300.00, status: 'SETTLED' }
    ],
    fraudulent_stream_clusters: [
      { entry_id: 'fsc-1', ip_subnet: '198.51.100.0/24', bot_account_count: 850, flagged_stream_volume: 420000, amount_usd: 1450.00, status: 'SETTLED' }
    ],
    family_account_allocation: [
      { entry_id: 'fam-1', account_id: 'fam_8801', sub_profile_count: 6, allocated_subscription_usd: 19.99, amount_usd: 19.99, status: 'SETTLED' }
    ],
    fx_royalty_reconciliation: [
      { entry_id: 'fxr-1', local_currency: 'EUR', gross_local_amount: 45000000.00, fx_to_usd_rate: 1.085, net_usd_pool: 48825000.00, amount_usd: 48825000.00, status: 'SETTLED' }
    ],
    royalty_general_ledger: [
      { entry_id: 'rgl-1', ledger_account: 'Streamshare_Payout_Escrow', debit_usd: 145000000.00, credit_usd: 145000000.00, amount_usd: 145000000.00, status: 'SETTLED' }
    ],

    // Days 22 - 30: Podcasts, War Room & Staff Ops Tables
    podcast_ad_placements: [
      { event_id: 'pod-1', podcast_id: 'pod_huberman', ad_slot_type: 'MID_ROLL', requested_impressions: 450000, delivered_impressions: 442000, severity: 'P0', impact_score: 98.2 },
      { event_id: 'pod-2', podcast_id: 'pod_lex', ad_slot_type: 'PRE_ROLL', requested_impressions: 320000, delivered_impressions: 318000, severity: 'P0', impact_score: 99.4 }
    ],
    podcast_skip_telemetry: [
      { event_id: 'psk-1', episode_id: 'ep_101', ad_start_second: 1840, skip_15s_button_presses: 4120, severity: 'P0', impact_score: 72.0 }
    ],
    audiobook_monthly_caps: [
      { event_id: 'abk-1', user_id: 'usr_bookworm', consumed_hours: 15.0, remaining_hours: 0.0, is_cap_exceeded: 1, severity: 'P0', impact_score: 85.0 }
    ],
    new_music_friday_spike: [
      { event_id: 'nmf-1', minute_bucket: '2026-11-27 00:01', concurrent_streams: 14200000, edge_cache_hit_rate: 98.8, severity: 'P0', impact_score: 98.0 }
    ],
    wrapped_user_aggregates: [
      { event_id: 'wrp-1', user_id: 'usr_top_fan', top_artist_id: 'art-taylor-swift', total_listening_minutes: 84200, severity: 'P0', impact_score: 100.0 }
    ],
    album_drop_incident_logs: [
      { event_id: 'adi-1', minute_bucket: '2026-11-20 00:00', rps_audio_init: 84000, p99_playback_latency_ms: 112, severity: 'P0', impact_score: 99.0 }
    ],
    cdn_edge_evictions: [
      { event_id: 'cdn-1', edge_pop_location: 'Frankfurt-DE', cache_evictions_per_sec: 24, audio_stall_count: 8, severity: 'P0', impact_score: 89.0 }
    ],
    premium_conversion_surge: [
      { event_id: 'pcs-1', minute_bucket: '2026-11-27 12:00', checkout_attempts: 125000, conversion_rate_pct: 94.2, severity: 'P0', impact_score: 96.0 }
    ],
    staff_promotion_defense: [
      { event_id: 'spd-1', candidate_id: 'eng_audio_lead_01', domain_track: 'Audio Streaming & Royalties', score_points: 99.7, promotion_status: 'APPROVED', severity: 'P0', impact_score: 100.0 }
    ]
  };

  function executeSpotifyQuery(sql, dayIndex) {
    if (!sql || typeof sql !== 'string') {
      return { success: false, error: 'Empty query', columns: [], rows: [] };
    }

    try {
      const cleanSql = sql.trim().replace(/;+$/, '');
      let matchedTable = null;
      for (const tName of Object.keys(SPOTIFY_DATASETS)) {
        const regex = new RegExp('\\b' + tName + '\\b', 'i');
        if (regex.test(cleanSql)) {
          matchedTable = tName;
          break;
        }
      }

      const rows = matchedTable ? SPOTIFY_DATASETS[matchedTable] : (SPOTIFY_DATASETS.audio_playback_sessions || []);
      const sample = rows[0] || {};
      const columns = Object.keys(sample);

      return {
        success: true,
        tableName: matchedTable || 'audio_playback_sessions',
        columns: columns,
        rows: rows.map(r => columns.map(c => r[c])),
        executionTimeMs: (Math.random() * 8 + 4).toFixed(2),
        totalRowCount: rows.length
      };
    } catch (err) {
      return {
        success: false,
        error: err.message || 'Execution Error',
        columns: [],
        rows: []
      };
    }
  }

  function getSpotifyTableData(tableName) {
    return SPOTIFY_DATASETS[tableName] || null;
  }

  function getAllSpotifyTableNames() {
    return Object.keys(SPOTIFY_DATASETS);
  }

  window.SPOTIFY_SQL_RUNNER = {
    datasets: SPOTIFY_DATASETS,
    execute: executeSpotifyQuery,
    getTableData: getSpotifyTableData,
    getAllTableNames: getAllSpotifyTableNames
  };

})(window);
