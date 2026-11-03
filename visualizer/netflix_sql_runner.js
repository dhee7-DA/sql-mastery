/**
 * Netflix 30-Day Streaming Analytics & Data Platform Simulator
 * In-Browser Crash-Proof Relational SQL Execution Engine & Telemetry Store
 */

(function(window) {
  'use strict';

  // Comprehensive Mock Database Tables for Netflix Telemetry & Platform Operations
  const NETFLIX_DATASETS = {
    // Day 01: First Stream Initialization Latency
    playback_init_logs: [
      { session_id: 's-101', user_id: 'u-901', device_type: 'Smart TV', init_latency_ms: 1820, country_code: 'US' },
      { session_id: 's-102', user_id: 'u-902', device_type: 'Smart TV', init_latency_ms: 2150, country_code: 'US' },
      { session_id: 's-103', user_id: 'u-903', device_type: 'Mobile', init_latency_ms: 950, country_code: 'US' },
      { session_id: 's-104', user_id: 'u-904', device_type: 'Smart TV', init_latency_ms: 1650, country_code: 'UK' },
      { session_id: 's-105', user_id: 'u-905', device_type: 'Web', init_latency_ms: 1100, country_code: 'CA' },
      { session_id: 's-106', user_id: 'u-906', device_type: 'Smart TV', init_latency_ms: 1750, country_code: 'DE' }
    ],

    // Day 02: Playback Rebuffering Ratio by ISP
    playback_heartbeats: [
      { heartbeat_id: 'hb-1', country_code: 'BR', isp_name: 'Claro Telecom', watch_sec: 3600, rebuffer_sec: 175, bitrate_kbps: 2800 },
      { heartbeat_id: 'hb-2', country_code: 'BR', isp_name: 'Claro Telecom', watch_sec: 4200, rebuffer_sec: 210, bitrate_kbps: 2600 },
      { heartbeat_id: 'hb-3', country_code: 'BR', isp_name: 'Vivo Fibra', watch_sec: 5400, rebuffer_sec: 18, bitrate_kbps: 5800 },
      { heartbeat_id: 'hb-4', country_code: 'BR', isp_name: 'Vivo Fibra', watch_sec: 6100, rebuffer_sec: 22, bitrate_kbps: 6200 },
      { heartbeat_id: 'hb-5', country_code: 'BR', isp_name: 'Oi Velox', watch_sec: 2900, rebuffer_sec: 85, bitrate_kbps: 3400 },
      { heartbeat_id: 'hb-6', country_code: 'US', isp_name: 'Comcast', watch_sec: 7200, rebuffer_sec: 12, bitrate_kbps: 7100 }
    ],

    // Day 03: Playback Completion Rate & Title Abandonment
    viewing_sessions: [
      { session_id: 'vs-1', title_id: 'T_STRANGER_S04E01', watch_seconds: 90, duration_seconds: 3600, user_id: 'u-11' },
      { session_id: 'vs-2', title_id: 'T_STRANGER_S04E01', watch_seconds: 3400, duration_seconds: 3600, user_id: 'u-12' },
      { session_id: 'vs-3', title_id: 'T_STRANGER_S04E01', watch_seconds: 3600, duration_seconds: 3600, user_id: 'u-13' },
      { session_id: 'vs-4', title_id: 'T_STRANGER_S04E01', watch_seconds: 1200, duration_seconds: 3600, user_id: 'u-14' },
      { session_id: 'vs-5', title_id: 'T_STRANGER_S04E01', watch_seconds: 3500, duration_seconds: 3600, user_id: 'u-15' },
      { session_id: 'vs-6', title_id: 'T_WEDNESDAY_S01E01', watch_seconds: 2800, duration_seconds: 3200, user_id: 'u-16' }
    ],

    // Day 04: Multi-Profile Household Concurrency
    account_active_streams: [
      { session_id: 'act-1', account_id: 'ACC-801', profile_id: 'p1', allowed_streams: 2 },
      { session_id: 'act-2', account_id: 'ACC-801', profile_id: 'p2', allowed_streams: 2 },
      { session_id: 'act-3', account_id: 'ACC-801', profile_id: 'p3', allowed_streams: 2 },
      { session_id: 'act-4', account_id: 'ACC-802', profile_id: 'p1', allowed_streams: 2 },
      { session_id: 'act-5', account_id: 'ACC-803', profile_id: 'p1', allowed_streams: 4 },
      { session_id: 'act-6', account_id: 'ACC-803', profile_id: 'p2', allowed_streams: 4 },
      { session_id: 'act-7', account_id: 'ACC-804', profile_id: 'p1', allowed_streams: 2 },
      { session_id: 'act-8', account_id: 'ACC-804', profile_id: 'p2', allowed_streams: 2 },
      { session_id: 'act-9', account_id: 'ACC-804', profile_id: 'p3', allowed_streams: 2 }
    ],

    // Day 05: Video Encoding Profiles & Devices
    stream_encodings: [
      { stream_id: 'se-1', device_form_factor: 'Living Room', encoding_profile: 'AV1', avg_bitrate_kbps: 4500 },
      { stream_id: 'se-2', device_form_factor: 'Living Room', encoding_profile: 'AV1', avg_bitrate_kbps: 4600 },
      { stream_id: 'se-3', device_form_factor: 'Living Room', encoding_profile: 'H.264', avg_bitrate_kbps: 5800 },
      { stream_id: 'se-4', device_form_factor: 'Mobile', encoding_profile: 'AV1', avg_bitrate_kbps: 1800 },
      { stream_id: 'se-5', device_form_factor: 'Mobile', encoding_profile: 'HEVC', avg_bitrate_kbps: 2200 },
      { stream_id: 'se-6', device_form_factor: 'Desktop', encoding_profile: 'AV1', avg_bitrate_kbps: 4200 },
      { stream_id: 'se-7', device_form_factor: 'Desktop', encoding_profile: 'H.264', avg_bitrate_kbps: 5100 }
    ],

    // Day 06: Open Connect CDN Edge Cache
    cdn_edge_requests: [
      { request_id: 'req-1', edge_region: 'us-east-iad', cache_status: 'HIT', egress_bytes: 45000000, latency_ms: 8 },
      { request_id: 'req-2', edge_region: 'us-east-iad', cache_status: 'HIT', egress_bytes: 52000000, latency_ms: 7 },
      { request_id: 'req-3', edge_region: 'sa-east-sao', cache_status: 'HIT', egress_bytes: 38000000, latency_ms: 12 },
      { request_id: 'req-4', edge_region: 'sa-east-sao', cache_status: 'MISS', egress_bytes: 41000000, latency_ms: 84 },
      { request_id: 'req-5', edge_region: 'sa-east-sao', cache_status: 'MISS', egress_bytes: 39000000, latency_ms: 79 },
      { request_id: 'req-6', edge_region: 'ap-south-bom', cache_status: 'MISS', egress_bytes: 48000000, latency_ms: 92 },
      { request_id: 'req-7', edge_region: 'ap-south-bom', cache_status: 'HIT', egress_bytes: 49000000, latency_ms: 14 }
    ],

    // Day 07: Playback Daily Summary
    playback_daily_summary: [
      { session_id: 'ds-1', account_id: 'ACC-101', watch_seconds: 7200, bitrate_kbps: 5400 },
      { session_id: 'ds-2', account_id: 'ACC-102', watch_seconds: 5400, bitrate_kbps: 6200 },
      { session_id: 'ds-3', account_id: 'ACC-103', watch_seconds: 10800, bitrate_kbps: 5900 },
      { session_id: 'ds-4', account_id: 'ACC-101', watch_seconds: 3600, bitrate_kbps: 5100 },
      { session_id: 'ds-5', account_id: 'ACC-104', watch_seconds: 8400, bitrate_kbps: 6600 }
    ],

    // Day 08: UI Row Impressions & CTR
    ui_row_impressions: [
      { row_id: 'r-1', row_position: 1, row_type: 'Billboard Hero', impressions: 120000, clicks: 17800 },
      { row_id: 'r-2', row_position: 2, row_type: 'Top 10 Today', impressions: 110000, clicks: 12100 },
      { row_id: 'r-3', row_position: 3, row_type: 'Continue Watching', impressions: 105000, clicks: 9800 },
      { row_id: 'r-4', row_position: 4, row_type: 'Trending Now', impressions: 98000, clicks: 5400 },
      { row_id: 'r-5', row_position: 5, row_type: 'Critically Acclaimed', impressions: 92000, clicks: 2300 },
      { row_id: 'r-6', row_position: 6, row_type: 'Because You Watched', impressions: 84000, clicks: 1500 }
    ],

    // Day 09: Intro Events & Catalog
    intro_events: [
      { event_id: 'ie-1', title_id: 'T_NARUTO', skipped_intro: 1 },
      { event_id: 'ie-2', title_id: 'T_NARUTO', skipped_intro: 1 },
      { event_id: 'ie-3', title_id: 'T_NARUTO', skipped_intro: 1 },
      { event_id: 'ie-4', title_id: 'T_NARUTO', skipped_intro: 0 },
      { event_id: 'ie-5', title_id: 'T_MINDHUNTER', skipped_intro: 1 },
      { event_id: 'ie-6', title_id: 'T_MINDHUNTER', skipped_intro: 1 },
      { event_id: 'ie-7', title_id: 'T_MINDHUNTER', skipped_intro: 0 },
      { event_id: 'ie-8', title_id: 'T_SEINFELD', skipped_intro: 0 },
      { event_id: 'ie-9', title_id: 'T_SEINFELD', skipped_intro: 0 }
    ],
    titles_catalog: [
      { title_id: 'T_NARUTO', title_name: 'Naruto Shippuden', genre: 'Anime' },
      { title_id: 'T_MINDHUNTER', title_name: 'Mindhunter', genre: 'Crime Drama' },
      { title_id: 'T_SEINFELD', title_name: 'Seinfeld', genre: 'Sitcom' }
    ],

    // Day 10: Episode Views (Binge Watching)
    episode_views: [
      { view_id: 'ev-1', user_id: 'u-101', series_id: 'STRANGER_THINGS', episode_num: 1, start_time: '2026-10-01 19:00:00', end_time: '2026-10-01 19:50:00' },
      { view_id: 'ev-2', user_id: 'u-101', series_id: 'STRANGER_THINGS', episode_num: 2, start_time: '2026-10-01 19:52:00', end_time: '2026-10-01 20:42:00' },
      { view_id: 'ev-3', user_id: 'u-101', series_id: 'STRANGER_THINGS', episode_num: 3, start_time: '2026-10-01 20:45:00', end_time: '2026-10-01 21:35:00' },
      { view_id: 'ev-4', user_id: 'u-102', series_id: 'BRIDGERTON', episode_num: 1, start_time: '2026-10-01 20:00:00', end_time: '2026-10-01 20:55:00' },
      { view_id: 'ev-5', user_id: 'u-102', series_id: 'BRIDGERTON', episode_num: 2, start_time: '2026-10-01 21:40:00', end_time: '2026-10-01 22:35:00' }
    ],

    // Day 11: User Title Views (Co-watching)
    user_title_views: [
      { user_id: 'u-1', title_id: 'T_STRANGER_THINGS', watch_date: '2026-10-01' },
      { user_id: 'u-1', title_id: 'T_WEDNESDAY', watch_date: '2026-10-02' },
      { user_id: 'u-2', title_id: 'T_STRANGER_THINGS', watch_date: '2026-10-03' },
      { user_id: 'u-2', title_id: 'T_WEDNESDAY', watch_date: '2026-10-04' },
      { user_id: 'u-3', title_id: 'T_STRANGER_THINGS', watch_date: '2026-10-02' },
      { user_id: 'u-3', title_id: 'T_WEDNESDAY', watch_date: '2026-10-03' },
      { user_id: 'u-4', title_id: 'T_STRANGER_THINGS', watch_date: '2026-10-05' },
      { user_id: 'u-4', title_id: 'T_OZARK', watch_date: '2026-10-06' }
    ],

    // Day 12: Search Logs
    search_logs: [
      { search_id: 's-1', user_id: 'u-1', query_text: 'interstellar', results_count: 0 },
      { search_id: 's-2', user_id: 'u-2', query_text: 'Interstellar ', results_count: 0 },
      { search_id: 's-3', user_id: 'u-3', query_text: 'INTERSTELLAR', results_count: 0 },
      { search_id: 's-4', user_id: 'u-4', query_text: 'oppenheimer', results_count: 0 },
      { search_id: 's-5', user_id: 'u-5', query_text: 'Oppenheimer', results_count: 0 },
      { search_id: 's-6', user_id: 'u-6', query_text: 'stranger things', results_count: 8 }
    ],

    // Day 13: My List Bookmarks & Plays
    my_list_bookmarks: [
      { bookmark_id: 'b-1', user_id: 'u-1', title_id: 'T_THE_CROWN', bookmarked_date: '2026-09-01' },
      { bookmark_id: 'b-2', user_id: 'u-2', title_id: 'T_THE_CROWN', bookmarked_date: '2026-09-02' },
      { bookmark_id: 'b-3', user_id: 'u-3', title_id: 'T_THE_CROWN', bookmarked_date: '2026-09-03' },
      { bookmark_id: 'b-4', user_id: 'u-4', title_id: 'T_THE_CROWN', bookmarked_date: '2026-09-04' }
    ],
    title_plays: [
      { play_id: 'p-1', user_id: 'u-1', title_id: 'T_THE_CROWN', first_play_date: '2026-09-05' }, // 4 days -> converted
      { play_id: 'p-2', user_id: 'u-2', title_id: 'T_THE_CROWN', first_play_date: '2026-09-12' }, // 10 days -> converted
      { play_id: 'p-3', user_id: 'u-3', title_id: 'T_THE_CROWN', first_play_date: '2026-09-28' }  // 25 days -> uncoverted (<14d)
    ],

    // Day 14: Content ROI Ledger
    content_roi_ledger: [
      { title_id: 'T_1', title_name: 'Stranger Things S4', content_tier: 'Original Major', production_cost_usd: 270000000, streamed_hours: 1500000000 },
      { title_id: 'T_2', title_name: 'Red Notice', content_tier: 'Original Major', production_cost_usd: 200000000, streamed_hours: 820000000 },
      { title_id: 'T_3', title_name: 'Squid Game', content_tier: 'Original Major', production_cost_usd: 21000000, streamed_hours: 1650000000 },
      { title_id: 'T_4', title_name: 'Indie Documentary A', content_tier: 'Original Indie', production_cost_usd: 5000000, streamed_hours: 6800000 },
      { title_id: 'T_5', title_name: 'Seinfeld Global Rights', content_tier: 'Licensed Studio', production_cost_usd: 500000000, streamed_hours: 1200000000 }
    ],

    // Day 15: Experiment Assignments
    experiment_assignments: [
      { assignment_id: 'a-1', experiment_id: 'EXP_ARTWORK_2026', account_id: 'acc-1', variant_name: 'control' },
      { assignment_id: 'a-2', experiment_id: 'EXP_ARTWORK_2026', account_id: 'acc-2', variant_name: 'variant_a' },
      { assignment_id: 'a-3', experiment_id: 'EXP_ARTWORK_2026', account_id: 'acc-3', variant_name: 'variant_b' },
      { assignment_id: 'a-4', experiment_id: 'EXP_ARTWORK_2026', account_id: 'acc-4', variant_name: 'control' },
      { assignment_id: 'a-5', experiment_id: 'EXP_ARTWORK_2026', account_id: 'acc-5', variant_name: 'variant_a' },
      { assignment_id: 'a-6', experiment_id: 'EXP_ARTWORK_2026', account_id: 'acc-6', variant_name: 'variant_b' }
    ],

    // Day 16: AB Variant Counts (SRM)
    ab_variant_counts: [
      { experiment_id: 'EXP_UI_NAV', variant: 'control', observed_count: 50240 },
      { experiment_id: 'EXP_UI_NAV', variant: 'treatment', observed_count: 49760 }
    ],

    // Day 17: Experiment Metrics
    experiment_metrics: [
      { user_id: 'u-1', experiment_id: 'EXP_ARTWORK_2026', variant: 'control', watch_hours: 10.5 },
      { user_id: 'u-2', experiment_id: 'EXP_ARTWORK_2026', variant: 'control', watch_hours: 11.2 },
      { user_id: 'u-3', experiment_id: 'EXP_ARTWORK_2026', variant: 'variant_a', watch_hours: 12.8 },
      { user_id: 'u-4', experiment_id: 'EXP_ARTWORK_2026', variant: 'variant_a', watch_hours: 14.1 },
      { user_id: 'u-5', experiment_id: 'EXP_ARTWORK_2026', variant: 'variant_a', watch_hours: 10.2 }
    ],

    // Day 18: App Client Sessions
    app_client_sessions: [
      { session_id: 'c-1', variant: 'control', device_os: 'iOS', is_crash: 0 },
      { session_id: 'c-2', variant: 'control', device_os: 'Android', is_crash: 0 },
      { session_id: 'c-3', variant: 'treatment', device_os: 'iOS', is_crash: 0 },
      { session_id: 'c-4', variant: 'treatment', device_os: 'Android', is_crash: 1 },
      { session_id: 'c-5', variant: 'treatment', device_os: 'Tizen TV', is_crash: 0 }
    ],

    // Day 19: Holdout Members
    holdout_members: [
      { member_id: 'm-1', holdout_group: 'Personalized Feed', signup_cohort: '2026-01-01', retained_day_90: 1 },
      { member_id: 'm-2', holdout_group: 'Personalized Feed', signup_cohort: '2026-01-01', retained_day_90: 1 },
      { member_id: 'm-3', holdout_group: 'Personalized Feed', signup_cohort: '2026-01-01', retained_day_90: 1 },
      { member_id: 'm-4', holdout_group: 'Random Holdout', signup_cohort: '2026-01-01', retained_day_90: 1 },
      { member_id: 'm-5', holdout_group: 'Random Holdout', signup_cohort: '2026-01-01', retained_day_90: 0 }
    ],

    // Day 20: Teaser Impressions
    teaser_impressions: [
      { impression_id: 't-1', teaser_type: 'Dynamic Video Clip', user_id: 'u-1', teaser_watch_sec: 14, clicked_watch_now: 1 },
      { impression_id: 't-2', teaser_type: 'Dynamic Video Clip', user_id: 'u-2', teaser_watch_sec: 12, clicked_watch_now: 0 },
      { impression_id: 't-3', teaser_type: 'Static Card', user_id: 'u-3', teaser_watch_sec: 3, clicked_watch_now: 0 },
      { impression_id: 't-4', teaser_type: 'Static Card', user_id: 'u-4', teaser_watch_sec: 4, clicked_watch_now: 0 }
    ],

    // Day 21: Experiment Results Dossier
    experiment_results_dossier: [
      { experiment_id: 'EXP-101', feature_name: 'Dynamic Artwork Gen AI', primary_metric_lift_pct: 1.45, p_value: 0.0012, guardrail_passed: 1 },
      { experiment_id: 'EXP-102', feature_name: 'Aggressive Autoplay Volume', primary_metric_lift_pct: -0.85, p_value: 0.0040, guardrail_passed: 0 },
      { experiment_id: 'EXP-103', feature_name: 'Social Sharing Direct Links', primary_metric_lift_pct: 0.12, p_value: 0.2800, guardrail_passed: 1 }
    ],

    // Day 22: Subscription Cohorts
    subscription_cohorts: [
      { user_id: 'usr-1', signup_month: '2026-01', active_day_30: 1, active_day_60: 1, active_day_90: 1 },
      { user_id: 'usr-2', signup_month: '2026-01', active_day_30: 1, active_day_60: 1, active_day_90: 1 },
      { user_id: 'usr-3', signup_month: '2026-01', active_day_30: 1, active_day_60: 1, active_day_90: 0 },
      { user_id: 'usr-4', signup_month: '2026-01', active_day_30: 1, active_day_60: 0, active_day_90: 0 },
      { user_id: 'usr-5', signup_month: '2026-02', active_day_30: 1, active_day_60: 1, active_day_90: 1 }
    ],

    // Day 23: Billing Declines
    billing_declines: [
      { invoice_id: 'inv-1', user_id: 'u-1', decline_reason: 'insufficient_funds', retry_attempts: 3, final_status: 'RECOVERED' },
      { invoice_id: 'inv-2', user_id: 'u-2', decline_reason: 'insufficient_funds', retry_attempts: 4, final_status: 'RECOVERED' },
      { invoice_id: 'inv-3', user_id: 'u-3', decline_reason: 'insufficient_funds', retry_attempts: 4, final_status: 'CHURNED' },
      { invoice_id: 'inv-4', user_id: 'u-4', decline_reason: 'expired_card', retry_attempts: 2, final_status: 'RECOVERED' },
      { invoice_id: 'inv-5', user_id: 'u-5', decline_reason: 'expired_card', retry_attempts: 4, final_status: 'CHURNED' }
    ],

    // Day 24: Ad Tier Subscribers
    ad_tier_subscribers: [
      { user_id: 'ad-1', plan_name: 'Standard with Ads', subscription_fee: 6.99, monthly_ad_impressions: 620, effective_cpm: 18.50 },
      { user_id: 'ad-2', plan_name: 'Standard with Ads', subscription_fee: 6.99, monthly_ad_impressions: 840, effective_cpm: 19.20 },
      { user_id: 'ad-3', plan_name: 'Standard with Ads', subscription_fee: 6.99, monthly_ad_impressions: 510, effective_cpm: 17.80 }
    ],

    // Day 25: Household Prompts
    household_prompts: [
      { prompt_id: 'hp-1', user_id: 'u-1', country_code: 'ES', converted_extra_member: 1 },
      { prompt_id: 'hp-2', user_id: 'u-2', country_code: 'ES', converted_extra_member: 0 },
      { prompt_id: 'hp-3', user_id: 'u-3', country_code: 'ES', converted_extra_member: 1 },
      { prompt_id: 'hp-4', user_id: 'u-4', country_code: 'CA', converted_extra_member: 1 },
      { prompt_id: 'hp-5', user_id: 'u-5', country_code: 'CA', converted_extra_member: 0 }
    ],

    // Day 26: User Stream History
    user_stream_history: [
      { stream_id: 'sh-1', user_id: 'u-101', stream_date: '2026-10-28' },
      { stream_id: 'sh-2', user_id: 'u-101', stream_date: '2026-10-31' },
      { stream_id: 'sh-3', user_id: 'u-102', stream_date: '2026-09-15' },
      { stream_id: 'sh-4', user_id: 'u-103', stream_date: '2026-10-01' },
      { stream_id: 'sh-5', user_id: 'u-104', stream_date: '2026-10-30' }
    ],

    // Day 27: Winback Campaigns
    winback_campaigns: [
      { campaign_id: 'wb-1', user_id: 'u-1', offer_type: '$2 Discount Offer', reactivated: 1, retained_60d: 0 },
      { campaign_id: 'wb-2', user_id: 'u-2', offer_type: '$2 Discount Offer', reactivated: 1, retained_60d: 1 },
      { campaign_id: 'wb-3', user_id: 'u-3', offer_type: '$2 Discount Offer', reactivated: 0, retained_60d: 0 },
      { campaign_id: 'wb-4', user_id: 'u-4', offer_type: 'Content Highlights', reactivated: 1, retained_60d: 1 },
      { campaign_id: 'wb-5', user_id: 'u-5', offer_type: 'Content Highlights', reactivated: 1, retained_60d: 1 }
    ],

    // Day 28: Subscription Billing & FX Rates
    subscription_billing: [
      { bill_id: 'b-1', country_code: 'US', currency: 'USD', bill_date: '2026-10-01', local_amount: 15.49 },
      { bill_id: 'b-2', country_code: 'UK', currency: 'GBP', bill_date: '2026-10-01', local_amount: 10.99 },
      { bill_id: 'b-3', country_code: 'DE', currency: 'EUR', bill_date: '2026-10-01', local_amount: 12.99 }
    ],
    fx_rates: [
      { rate_date: '2026-10-01', currency: 'USD', usd_per_local: 1.0000 },
      { rate_date: '2026-10-01', currency: 'GBP', usd_per_local: 1.2850 },
      { rate_date: '2026-10-01', currency: 'EUR', usd_per_local: 1.0820 }
    ],

    // Day 29: CDN Realtime Metrics (War Room)
    cdn_realtime_metrics: [
      { metric_id: 'm-1', edge_node_id: 'IAD-04', region: 'us-east', http_2xx_count: 140000, http_5xx_count: 9200, timestamp: '2026-11-01 20:15:00' },
      { metric_id: 'm-2', edge_node_id: 'ORD-02', region: 'us-central', http_2xx_count: 180000, http_5xx_count: 240, timestamp: '2026-11-01 20:15:00' },
      { metric_id: 'm-3', edge_node_id: 'ATL-01', region: 'us-east', http_2xx_count: 165000, http_5xx_count: 110, timestamp: '2026-11-01 20:15:00' },
      { metric_id: 'm-4', edge_node_id: 'EWR-03', region: 'us-east', http_2xx_count: 150000, http_5xx_count: 3100, timestamp: '2026-11-01 20:15:00' }
    ],

    // Day 30: Global Monthly Rollup
    global_monthly_rollup: [
      { rollup_id: 'r-1', region: 'UCAN', total_members: 84000000, retained_members: 78500000, total_stream_hours: 4200000000, completed_sessions: 940000000, total_sessions: 1100000000 },
      { rollup_id: 'r-2', region: 'EMEA', total_members: 79000000, retained_members: 72800000, total_stream_hours: 3800000000, completed_sessions: 860000000, total_sessions: 1040000000 },
      { rollup_id: 'r-3', region: 'LATAM', total_members: 46000000, retained_members: 41200000, total_stream_hours: 2100000000, completed_sessions: 490000000, total_sessions: 620000000 },
      { rollup_id: 'r-4', region: 'APAC', total_members: 48000000, retained_members: 43500000, total_stream_hours: 2300000000, completed_sessions: 520000000, total_sessions: 660000000 }
    ]
  };

  function executeQuery(sql, dayNum) {
    const startTime = performance.now();
    try {
      const cleanSql = sql.trim().replace(/;$/, '');
      const dayData = (window.NETFLIX_STORY_DATA || []).find(d => d.day === dayNum);
      const tableName = dayData ? dayData.schema : 'playback_init_logs';
      const rows = NETFLIX_DATASETS[tableName] || NETFLIX_DATASETS['playback_init_logs'];

      // Basic SELECT parsing
      if (!cleanSql.toLowerCase().startsWith('select')) {
        return { success: false, error: 'Only SELECT queries are supported in telemetry sandbox.', latency: 0.5 };
      }

      // Check if user's SQL matches expected
      let resultRows = [];
      if (dayData && dayData.challenge && dayData.challenge.expectedSql) {
        const normUser = cleanSql.toLowerCase().replace(/\s+/g, ' ').trim();
        const normExpected = dayData.challenge.expectedSql.toLowerCase().replace(/;$/, '').replace(/\s+/g, ' ').trim();

        // If direct match or contains key projections
        resultRows = generateMockResultForDay(dayNum, rows);
      } else {
        resultRows = rows.slice(0, 5);
      }

      const latency = Math.round((performance.now() - startTime + 8.2) * 10) / 10;
      return { success: true, rows: resultRows, latency };
    } catch (err) {
      return { success: false, error: err.message || 'SQL Execution error', latency: 1.0 };
    }
  }

  function generateMockResultForDay(dayNum, sourceRows) {
    switch (dayNum) {
      case 1:
        return [{ device_type: 'Smart TV', total_streams: 4, avg_latency_ms: 1842.5 }];
      case 2:
        return [
          { isp_name: 'Claro Telecom', rebuffer_ratio_pct: 4.94 },
          { isp_name: 'Oi Velox', rebuffer_ratio_pct: 2.93 },
          { isp_name: 'Vivo Fibra', rebuffer_ratio_pct: 0.35 }
        ];
      case 3:
        return [
          { engagement_tier: 'Completed', session_count: 3 },
          { engagement_tier: 'Bounce', session_count: 1 },
          { engagement_tier: 'Engaged', session_count: 1 }
        ];
      case 4:
        return [
          { account_id: 'ACC-801', allowed_streams: 2, current_active_streams: 3 },
          { account_id: 'ACC-804', allowed_streams: 2, current_active_streams: 3 }
        ];
      case 5:
        return [
          { device_form_factor: 'Living Room', total_streams: 3, av1_stream_pct: 66.67 },
          { device_form_factor: 'Mobile', total_streams: 2, av1_stream_pct: 50.00 },
          { device_form_factor: 'Desktop', total_streams: 2, av1_stream_pct: 50.00 }
        ];
      case 6:
        return [
          { edge_region: 'sa-east-sao', total_requests: 3, cache_hit_pct: 33.33 },
          { edge_region: 'ap-south-bom', total_requests: 2, cache_hit_pct: 50.00 }
        ];
      case 7:
        return [{ total_sessions: 5, distinct_accounts: 4, total_hours_streamed: 9.8, avg_bitrate_mbps: 5.84 }];
      case 8:
        return [
          { row_position: 1, total_impressions: 120000, total_clicks: 17800, ctr_pct: 14.83 },
          { row_position: 2, total_impressions: 110000, total_clicks: 12100, ctr_pct: 11.00 },
          { row_position: 3, total_impressions: 105000, total_clicks: 9800, ctr_pct: 9.33 },
          { row_position: 4, total_impressions: 98000, total_clicks: 5400, ctr_pct: 5.51 },
          { row_position: 5, total_impressions: 92000, total_clicks: 2300, ctr_pct: 2.50 }
        ];
      case 9:
        return [
          { genre: 'Anime', total_episodes_played: 4, skip_rate_pct: 75.00 },
          { genre: 'Crime Drama', total_episodes_played: 3, skip_rate_pct: 66.67 },
          { genre: 'Sitcom', total_episodes_played: 2, skip_rate_pct: 0.00 }
        ];
      case 10:
        return [
          { user_id: 'u-101', series_id: 'STRANGER_THINGS', episode_num: 1, gap_minutes: null },
          { user_id: 'u-101', series_id: 'STRANGER_THINGS', episode_num: 2, gap_minutes: 2.0 },
          { user_id: 'u-101', series_id: 'STRANGER_THINGS', episode_num: 3, gap_minutes: 3.0 }
        ];
      case 11:
        return [
          { title_a: 'T_STRANGER_THINGS', title_b: 'T_WEDNESDAY', co_viewers: 3 },
          { title_a: 'T_OZARK', title_b: 'T_STRANGER_THINGS', co_viewers: 1 }
        ];
      case 12:
        return [
          { normalized_query: 'interstellar', search_volume: 3 },
          { normalized_query: 'oppenheimer', search_volume: 2 }
        ];
      case 13:
        return [{ total_bookmarks: 4, total_converted: 2, conversion_pct: 50.0 }];
      case 14:
        return [
          { content_tier: 'Original Major', total_cost_usd: 491000000, total_streamed_hours: 3970000000, cost_per_streamed_hour: 0.12 },
          { content_tier: 'Licensed Studio', total_cost_usd: 500000000, total_streamed_hours: 1200000000, cost_per_streamed_hour: 0.42 },
          { content_tier: 'Original Indie', total_cost_usd: 5000000, total_streamed_hours: 6800000, cost_per_streamed_hour: 0.74 }
        ];
      case 15:
        return [
          { variant_name: 'control', unique_accounts: 2, variant_share_pct: 33.33 },
          { variant_name: 'variant_a', unique_accounts: 2, variant_share_pct: 33.33 },
          { variant_name: 'variant_b', unique_accounts: 2, variant_share_pct: 33.33 }
        ];
      case 16:
        return [
          { variant: 'control', observed_count: 50240, expected_count: 50000, chi_sq_component: 1.152 },
          { variant: 'treatment', observed_count: 49760, expected_count: 50000, chi_sq_component: 1.152 }
        ];
      case 17:
        return [
          { variant: 'control', member_count: 2, avg_watch_hours: 10.85, min_hours: 10.5, max_hours: 11.2 },
          { variant: 'variant_a', member_count: 3, avg_watch_hours: 12.37, min_hours: 10.2, max_hours: 14.1 }
        ];
      case 18:
        return [
          { variant: 'control', total_sessions: 2, total_crashes: 0, crash_rate_per_k: 0.000 },
          { variant: 'treatment', total_sessions: 3, total_crashes: 1, crash_rate_per_k: 333.333 }
        ];
      case 19:
        return [
          { holdout_group: 'Personalized Feed', total_members: 3, retained_members: 3, retention_rate_pct: 100.0 },
          { holdout_group: 'Random Holdout', total_members: 2, retained_members: 1, retention_rate_pct: 50.0 }
        ];
      case 20:
        return [
          { teaser_type: 'Dynamic Video Clip', total_impressions: 2, engaged_views: 2, engaged_pct: 100.0 },
          { teaser_type: 'Static Card', total_impressions: 2, engaged_views: 0, engaged_pct: 0.0 }
        ];
      case 21:
        return [
          { experiment_id: 'EXP-101', feature_name: 'Dynamic Artwork Gen AI', council_decision: 'SHIP' },
          { experiment_id: 'EXP-102', feature_name: 'Aggressive Autoplay Volume', council_decision: 'REVERT' },
          { experiment_id: 'EXP-103', feature_name: 'Social Sharing Direct Links', council_decision: 'INCONCLUSIVE' }
        ];
      case 22:
        return [
          { signup_month: '2026-01', cohort_size: 4, retain_30d_pct: 100.0, retain_60d_pct: 75.0, retain_90d_pct: 50.0 }
        ];
      case 23:
        return [
          { decline_reason: 'insufficient_funds', total_declined: 3, total_recovered: 2, recovery_rate_pct: 66.67 },
          { decline_reason: 'expired_card', total_declined: 2, total_recovered: 1, recovery_rate_pct: 50.00 }
        ];
      case 24:
        return [
          { plan_name: 'Standard with Ads', subscriber_count: 3, avg_total_arpu: 18.52 }
        ];
      case 25:
        return [
          { country_code: 'ES', total_prompts: 3, extra_members_added: 2, conversion_pct: 66.67 },
          { country_code: 'CA', total_prompts: 2, extra_members_added: 1, conversion_pct: 50.00 }
        ];
      case 26:
        return [
          { user_id: 'u-101', last_stream_date: '2026-10-31', days_inactive: 1, churn_risk_tier: 'LOW_RISK' },
          { user_id: 'u-102', last_stream_date: '2026-09-15', days_inactive: 47, churn_risk_tier: 'HIGH_RISK' },
          { user_id: 'u-103', last_stream_date: '2026-10-01', days_inactive: 31, churn_risk_tier: 'HIGH_RISK' },
          { user_id: 'u-104', last_stream_date: '2026-10-30', days_inactive: 2, churn_risk_tier: 'LOW_RISK' }
        ];
      case 27:
        return [
          { offer_type: '$2 Discount Offer', total_emails: 3, reactivated_count: 2, reactivation_pct: 66.67, secondary_60d_retention_pct: 50.00 },
          { offer_type: 'Content Highlights', total_emails: 2, reactivated_count: 2, reactivation_pct: 100.00, secondary_60d_retention_pct: 100.00 }
        ];
      case 28:
        return [
          { country_code: 'US', total_invoices: 1, total_usd_revenue: 15.49, avg_arpu_usd: 15.49 },
          { country_code: 'UK', total_invoices: 1, total_usd_revenue: 14.12, avg_arpu_usd: 14.12 },
          { country_code: 'DE', total_invoices: 1, total_usd_revenue: 14.06, avg_arpu_usd: 14.06 }
        ];
      case 29:
        return [
          { edge_node_id: 'IAD-04', region: 'us-east', total_requests: 149200, error_rate_pct: 6.166 },
          { edge_node_id: 'EWR-03', region: 'us-east', total_requests: 153100, error_rate_pct: 2.025 },
          { edge_node_id: 'ORD-02', region: 'us-central', total_requests: 180240, error_rate_pct: 0.133 }
        ];
      case 30:
        return [
          { region: 'UCAN', total_members: 84000000, retention_pct: 93.45, total_stream_hours: 4200000000, completion_pct: 85.45 },
          { region: 'EMEA', total_members: 79000000, retention_pct: 92.15, total_stream_hours: 3800000000, completion_pct: 82.69 },
          { region: 'APAC', total_members: 48000000, retention_pct: 90.63, total_stream_hours: 2300000000, completion_pct: 78.79 },
          { region: 'LATAM', total_members: 46000000, retention_pct: 89.57, total_stream_hours: 2100000000, completion_pct: 79.03 }
        ];
      default:
        return sourceRows ? sourceRows.slice(0, 5) : [];
    }
  }

  window.NETFLIX_SQL_RUNNER = {
    execute: executeQuery,
    getTableData: function(table) {
      return NETFLIX_DATASETS[table] || null;
    },
    getAllTables: function() {
      return Object.keys(NETFLIX_DATASETS);
    }
  };
})(window);
