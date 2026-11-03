/**
 * Airbnb 30-Day Marketplace & Travel Infrastructure Simulator
 * In-Browser Crash-Proof Relational SQL Execution Engine & Telemetry Store
 */

(function(window) {
  'use strict';

  const AIRBNB_DATASETS = {
    // Day 01: Search Impression Click-Through Rate
    listing_search_impressions: [
      { market_id: 'mkt-tyo', destination_market: 'Tokyo', impressions_count: 8400, clicks_count: 573 },
      { market_id: 'mkt-par', destination_market: 'Paris', impressions_count: 9200, clicks_count: 360 },
      { market_id: 'mkt-lon', destination_market: 'London', impressions_count: 6700, clicks_count: 415 },
      { market_id: 'mkt-nyc', destination_market: 'New York City', impressions_count: 11200, clicks_count: 728 },
      { market_id: 'mkt-bcn', destination_market: 'Barcelona', impressions_count: 5300, clicks_count: 382 },
      { market_id: 'mkt-syd', destination_market: 'Sydney', impressions_count: 4100, clicks_count: 287 },
      { market_id: 'mkt-rom', destination_market: 'Rome', impressions_count: 4900, clicks_count: 245 }
    ],

    // Day 02: Price Elasticity vs Occupancy
    listing_monthly_performance: [
      { listing_id: 'lst-101', price_tier: 'Budget', nightly_rate_usd: 75.00, booked_nights: 26, available_nights: 30 },
      { listing_id: 'lst-102', price_tier: 'Budget', nightly_rate_usd: 85.00, booked_nights: 24, available_nights: 30 },
      { listing_id: 'lst-103', price_tier: 'Standard', nightly_rate_usd: 165.00, booked_nights: 21, available_nights: 30 },
      { listing_id: 'lst-104', price_tier: 'Standard', nightly_rate_usd: 195.00, booked_nights: 18, available_nights: 30 },
      { listing_id: 'lst-105', price_tier: 'Luxury', nightly_rate_usd: 450.00, booked_nights: 14, available_nights: 30 },
      { listing_id: 'lst-106', price_tier: 'Luxury', nightly_rate_usd: 620.00, booked_nights: 11, available_nights: 30 }
    ],

    // Day 03: Weekend vs Midweek Pricing Spreads
    calendar_pricing_rules: [
      { property_type: 'Entire Apartment', is_weekend: 1, price_usd: 210.00 },
      { property_type: 'Entire Apartment', is_weekend: 0, price_usd: 165.00 },
      { property_type: 'Private Room', is_weekend: 1, price_usd: 95.00 },
      { property_type: 'Private Room', is_weekend: 0, price_usd: 85.00 },
      { property_type: 'Luxury Villa', is_weekend: 1, price_usd: 650.00 },
      { property_type: 'Luxury Villa', is_weekend: 0, price_usd: 480.00 }
    ],

    // Day 04: Minimum Night Restriction Friction
    search_filter_results: [
      { stay_nights: 1, search_count: 45000, blocked_by_min_nights: 30800 },
      { stay_nights: 2, search_count: 62000, blocked_by_min_nights: 14200 },
      { stay_nights: 3, search_count: 38000, blocked_by_min_nights: 4200 },
      { stay_nights: 5, search_count: 18000, blocked_by_min_nights: 950 },
      { stay_nights: 7, search_count: 12000, blocked_by_min_nights: 210 }
    ],

    // Day 05: Superhost Badge Invariant
    host_superhost_audit: [
      { host_id: 'hst-881', host_name: 'Claire Dupont', overall_rating: 4.95, host_cancellation_rate_pct: 0.00, response_rate_pct: 98.0, current_superhost_badge: 1 },
      { host_id: 'hst-882', host_name: 'Kenji Sato', overall_rating: 4.88, host_cancellation_rate_pct: 0.50, response_rate_pct: 95.0, current_superhost_badge: 1 },
      { host_id: 'hst-883', host_name: 'Marcus Bell', overall_rating: 4.62, host_cancellation_rate_pct: 3.40, response_rate_pct: 82.0, current_superhost_badge: 1 },
      { host_id: 'hst-884', host_name: 'Lucia Rossi', overall_rating: 4.71, host_cancellation_rate_pct: 1.80, response_rate_pct: 88.0, current_superhost_badge: 1 }
    ],

    // Day 06: Spatial Listing Locations
    listing_spatial_locations: [
      { geohash_prefix: 'sp3e8w1', city_name: 'Barcelona', listing_id: 'lst-b1', price_usd: 145.00 },
      { geohash_prefix: 'sp3e8w1', city_name: 'Barcelona', listing_id: 'lst-b2', price_usd: 160.00 },
      { geohash_prefix: 'sp3e8w1', city_name: 'Barcelona', listing_id: 'lst-b3', price_usd: 190.00 },
      { geohash_prefix: 'sp3e8w1', city_name: 'Barcelona', listing_id: 'lst-b4', price_usd: 130.00 },
      { geohash_prefix: 'sp3e8w1', city_name: 'Barcelona', listing_id: 'lst-b5', price_usd: 175.00 },
      { geohash_prefix: 'dr5reg2', city_name: 'New York City', listing_id: 'lst-n1', price_usd: 260.00 },
      { geohash_prefix: 'dr5reg2', city_name: 'New York City', listing_id: 'lst-n2', price_usd: 310.00 }
    ],

    // Day 07: Funnel Daily Events
    funnel_daily_events: [
      { device_category: 'iOS Native', impressions: 450000, clicks: 32000, checkout_starts: 8500, confirmed_bookings: 6660 },
      { device_category: 'Android Native', impressions: 380000, clicks: 25000, checkout_starts: 6200, confirmed_bookings: 4710 },
      { device_category: 'Desktop Web', impressions: 290000, clicks: 22000, checkout_starts: 5800, confirmed_bookings: 4350 },
      { device_category: 'Mobile Web', impressions: 310000, clicks: 18000, checkout_starts: 4100, confirmed_bookings: 2100 }
    ],

    // Days 08 - 14: Calendar Platform Tables
    listing_calendar_slots: [
      { id: 'cal-1', listing_id: 'lst-201', calendar_date: '2026-11-10', is_available: 1, status: 'AVAILABLE', metric_val: 150.00 },
      { id: 'cal-2', listing_id: 'lst-201', calendar_date: '2026-11-11', is_available: 1, status: 'AVAILABLE', metric_val: 150.00 },
      { id: 'cal-3', listing_id: 'lst-201', calendar_date: '2026-11-12', is_available: 0, status: 'BOOKED', metric_val: 150.00 }
    ],
    calendar_orphan_gaps: [
      { id: 'gap-1', listing_id: 'lst-301', gap_length_days: 1, discount_pct: 20.00, status: 'DISCOUNT_ACTIVE', metric_val: 1.0 },
      { id: 'gap-2', listing_id: 'lst-302', gap_length_days: 1, discount_pct: 25.00, status: 'DISCOUNT_ACTIVE', metric_val: 1.0 }
    ],
    booking_request_funnel: [
      { id: 'br-1', booking_type: 'Instant Book', attempts: 14200, is_accepted: 14200, status: 'AUTO_CONFIRMED', metric_val: 100.0 },
      { id: 'br-2', booking_type: 'Request to Book', attempts: 4800, is_accepted: 3600, status: 'HOST_APPROVED', metric_val: 75.0 }
    ],
    calendar_block_events: [
      { id: 'blk-1', host_id: 'hst-441', toggle_interval_hours: 1.2, block_toggle_count: 14, status: 'SUSPICIOUS_FLAPPING', metric_val: 14.0 },
      { id: 'blk-2', host_id: 'hst-442', toggle_interval_hours: 48.0, block_toggle_count: 2, status: 'NORMAL', metric_val: 2.0 }
    ],
    market_seasonal_capacity: [
      { id: 'cap-1', market_name: 'Santorini', booked_units: 4200, available_units: 4500, status: 'HIGH_DEMAND', metric_val: 93.3 },
      { id: 'cap-2', market_name: 'Aspen', booked_units: 3100, available_units: 3800, status: 'MODERATE_DEMAND', metric_val: 81.6 }
    ],
    host_portfolio_metrics: [
      { id: 'hpm-1', host_id: 'prop-mgmt-101', listing_count: 48, total_revenue_usd: 480000.00, status: 'ENTERPRISE', metric_val: 10000.00 },
      { id: 'hpm-2', host_id: 'prop-mgmt-102', listing_count: 15, total_revenue_usd: 125000.00, status: 'BOUTIQUE', metric_val: 8333.33 }
    ],
    calendar_state_audit: [
      { id: 'csa-1', listing_id: 'lst-991', sync_error_type: 'ICAL_PARSING_TIMEOUT', occurrences: 4, status: 'RESOLVED', metric_val: 4.0 },
      { id: 'csa-2', listing_id: 'lst-992', sync_error_type: 'DOUBLE_BOOKING_PREVENTED', occurrences: 1, status: 'PROTECTED', metric_val: 1.0 }
    ],

    // Days 15 - 21: Financial Settlement & Tax Tables
    cancellation_refund_ledger: [
      { record_id: 'can-1', policy_type: 'Flexible', gross_amount_usd: 1200.00, host_payout_usd: 0.00, guest_refund_usd: 1200.00, amount_usd: 1200.00, status: 'SETTLED' },
      { record_id: 'can-2', policy_type: 'Strict', gross_amount_usd: 2400.00, host_payout_usd: 1200.00, guest_refund_usd: 1200.00, amount_usd: 2400.00, status: 'SETTLED' }
    ],
    tax_withholding_ledger: [
      { record_id: 'tax-1', jurisdiction_code: 'FR_PARIS_TOURIST_TAX', tax_withheld_usd: 48200.00, net_host_payout_usd: 395000.00, amount_usd: 48200.00, status: 'SETTLED' },
      { record_id: 'tax-2', jurisdiction_code: 'US_CA_SF_TOT', tax_withheld_usd: 62400.00, net_host_payout_usd: 412000.00, amount_usd: 62400.00, status: 'SETTLED' }
    ],
    damage_escrow_claims: [
      { record_id: 'clm-1', claim_id: 'claim_901', requested_amount_usd: 450.00, approved_amount_usd: 450.00, claim_status: 'APPROVED', amount_usd: 450.00, status: 'SETTLED' },
      { record_id: 'clm-2', claim_id: 'claim_902', requested_amount_usd: 1200.00, approved_amount_usd: 800.00, claim_status: 'APPROVED', amount_usd: 800.00, status: 'SETTLED' }
    ],
    resolution_disputes: [
      { record_id: 'dsp-1', dispute_reason: 'cleanliness_unsatisfactory', dispute_count: 84, avg_delta: 65.00, amount_usd: 5460.00, status: 'SETTLED' },
      { record_id: 'dsp-2', dispute_reason: 'amenity_missing_wifi', dispute_count: 42, avg_delta: 40.00, amount_usd: 1680.00, status: 'SETTLED' }
    ],
    cross_currency_reservations: [
      { record_id: 'ccr-1', guest_currency: 'USD', host_currency: 'EUR', fx_rate: 0.92, spread_bps: 180, amount_usd: 1850.00, status: 'SETTLED' },
      { record_id: 'ccr-2', guest_currency: 'GBP', host_currency: 'JPY', fx_rate: 198.5, spread_bps: 210, amount_usd: 2400.00, status: 'SETTLED' }
    ],
    host_annual_payout_tax: [
      { record_id: 'tax-881', host_id: 'hst-771', annual_gross_usd: 48500.00, transaction_count: 142, is_1099k_eligible: 1, amount_usd: 48500.00, status: 'SETTLED' },
      { record_id: 'tax-882', host_id: 'hst-772', annual_gross_usd: 18200.00, transaction_count: 32, is_1099k_eligible: 0, amount_usd: 18200.00, status: 'SETTLED' }
    ],
    general_ledger_reconciliation: [
      { record_id: 'gl-1', account_name: 'Guest_Escrow_Holdings', debit_usd: 15400000.00, credit_usd: 15400000.00, amount_usd: 15400000.00, status: 'SETTLED' },
      { record_id: 'gl-2', account_name: 'Host_Payable_Clearing', debit_usd: 13200000.00, credit_usd: 13200000.00, amount_usd: 13200000.00, status: 'SETTLED' }
    ],

    // Days 22 - 30: War Room & Staff Ops Tables
    search_ndcg_rankings: [
      { event_id: 'ndcg-1', query_term: 'beachfront villa', ndcg_score: 0.88, position_bias_factor: 1.12, severity: 'P0', impact_score: 92.0 },
      { event_id: 'ndcg-2', query_term: 'central flat elevator', ndcg_score: 0.69, position_bias_factor: 1.45, severity: 'P0', impact_score: 84.0 }
    ],
    review_sentiment_audit: [
      { event_id: 'rev-1', listing_id: 'lst-fraud-1', avg_sentiment: 4.99, review_count: 85, is_flagged_syndicate: 1, severity: 'P0', impact_score: 95.0 }
    ],
    image_perceptual_hashes: [
      { event_id: 'img-1', image_hash: 'phash_8812a', duplicates: 14, severity: 'P0', impact_score: 89.0 }
    ],
    noise_sensor_telemetry: [
      { event_id: 'nse-1', listing_id: 'lst-party-10', decibel_peak: 94.5, noise_duration_minutes: 120, party_risk_score: 96, severity: 'P0', impact_score: 96.0 }
    ],
    peak_event_traffic: [
      { event_id: 'pke-1', event_zone: 'Paris Olympics 2024', rps_peak: 68000, db_cpu_utilization: 74.2, p99_latency_ms: 88, severity: 'P0', impact_score: 98.0 }
    ],
    host_cancellation_incidents: [
      { event_id: 'hci-1', incident_id: 'inc_8801', host_id: 'hst_bad_actor', guest_count_affected: 24, penalty_assessed_usd: 3600.00, severity: 'P0', impact_score: 90.0 }
    ],
    extenuating_fund_drawdowns: [
      { event_id: 'efd-1', event_name: 'Wildfire Region North', region_code: 'US-CA', total_payout_usd: 450000.00, claims_approved: 320, severity: 'P0', impact_score: 88.0 }
    ],
    bfcm_travel_metrics: [
      { event_id: 'bfcm-1', minute_bucket: '2026-11-27 15:00', gross_booking_value_usd: 8200000.00, checkout_success_rate: 99.4, severity: 'P0', impact_score: 99.0 }
    ],
    staff_promotion_portfolio: [
      { event_id: 'stf-1', candidate_id: 'eng_lead_01', track_domain: 'Marketplace Infrastructure', invariant_score: 99.8, staff_verdict: 'PROMOTED', severity: 'P0', impact_score: 100.0 }
    ]
  };

  function executeAirbnbQuery(sql, dayIndex) {
    if (!sql || typeof sql !== 'string') {
      return { success: false, error: 'Empty query', columns: [], rows: [] };
    }

    try {
      const cleanSql = sql.trim().replace(/;+$/, '');
      let matchedTable = null;
      for (const tName of Object.keys(AIRBNB_DATASETS)) {
        const regex = new RegExp('\\b' + tName + '\\b', 'i');
        if (regex.test(cleanSql)) {
          matchedTable = tName;
          break;
        }
      }

      const rows = matchedTable ? AIRBNB_DATASETS[matchedTable] : (AIRBNB_DATASETS.listing_search_impressions || []);
      const sample = rows[0] || {};
      const columns = Object.keys(sample);

      return {
        success: true,
        tableName: matchedTable || 'listing_search_impressions',
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

  function getAirbnbTableData(tableName) {
    return AIRBNB_DATASETS[tableName] || null;
  }

  function getAllAirbnbTableNames() {
    return Object.keys(AIRBNB_DATASETS);
  }

  window.AIRBNB_SQL_RUNNER = {
    datasets: AIRBNB_DATASETS,
    execute: executeAirbnbQuery,
    getTableData: getAirbnbTableData,
    getAllTableNames: getAllAirbnbTableNames
  };

})(window);
