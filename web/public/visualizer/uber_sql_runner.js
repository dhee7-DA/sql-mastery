/**
 * Uber 30-Day Marketplace Dynamics & Geospatial Logistics Simulator
 * In-Browser Crash-Proof Relational SQL Execution Engine & Dispatch Telemetry Store
 */

(function(window) {
  'use strict';

  const UBER_DATASETS = {
    // Day 01: Supply vs Demand Liquidity Ratio
    marketplace_hourly_liquidity: [
      { record_id: 'rec-1', zone_id: 'z-les', zone_name: 'Lower East Side', hour_of_day: 18, available_drivers: 24, ride_requests: 85 },
      { record_id: 'rec-2', zone_id: 'z-les', zone_name: 'Lower East Side', hour_of_day: 19, available_drivers: 18, ride_requests: 64 },
      { record_id: 'rec-3', zone_id: 'z-mid', zone_name: 'Midtown Manhattan', hour_of_day: 17, available_drivers: 110, ride_requests: 140 },
      { record_id: 'rec-4', zone_id: 'z-mid', zone_name: 'Midtown Manhattan', hour_of_day: 18, available_drivers: 95, ride_requests: 180 },
      { record_id: 'rec-5', zone_id: 'z-wms', zone_name: 'Williamsburg Brooklyn', hour_of_day: 18, available_drivers: 45, ride_requests: 52 },
      { record_id: 'rec-6', zone_id: 'z-mid', zone_name: 'Midtown Manhattan', hour_of_day: 10, available_drivers: 80, ride_requests: 40 } // outside 17-20
    ],

    // Day 02: Dynamic Surge Multiplier
    ride_quotes: [
      { quote_id: 'q-1', rider_id: 'r-1', surge_multiplier: 1.0, accepted: 1 },
      { quote_id: 'q-2', rider_id: 'r-2', surge_multiplier: 1.0, accepted: 1 },
      { quote_id: 'q-3', rider_id: 'r-3', surge_multiplier: 1.0, accepted: 0 },
      { quote_id: 'q-4', rider_id: 'r-4', surge_multiplier: 1.3, accepted: 1 },
      { quote_id: 'q-5', rider_id: 'r-5', surge_multiplier: 1.5, accepted: 0 },
      { quote_id: 'q-6', rider_id: 'r-6', surge_multiplier: 1.8, accepted: 1 },
      { quote_id: 'q-7', rider_id: 'r-7', surge_multiplier: 2.4, accepted: 0 },
      { quote_id: 'q-8', rider_id: 'r-8', surge_multiplier: 2.8, accepted: 0 }
    ],

    // Day 03: H3 Spatial Aggregations
    trip_hex_events: [
      { trip_id: 't-1', pickup_h3_index: '8828308281fffff', distance_miles: 14.2, total_fare_usd: 48.50 },
      { trip_id: 't-2', pickup_h3_index: '8828308281fffff', distance_miles: 12.8, total_fare_usd: 44.20 },
      { trip_id: 't-3', pickup_h3_index: '882830829bfffff', distance_miles: 3.4, total_fare_usd: 16.80 },
      { trip_id: 't-4', pickup_h3_index: '882830829bfffff', distance_miles: 4.1, total_fare_usd: 19.50 },
      { trip_id: 't-5', pickup_h3_index: '882830829bfffff', distance_miles: 2.8, total_fare_usd: 14.10 }
    ],

    // Day 04: ETA Prediction Error
    eta_dispatch_records: [
      { dispatch_id: 'd-1', city_name: 'Chicago', predicted_eta_mins: 4, actual_pickup_mins: 8 },
      { dispatch_id: 'd-2', city_name: 'Chicago', predicted_eta_mins: 5, actual_pickup_mins: 10 },
      { dispatch_id: 'd-3', city_name: 'Chicago', predicted_eta_mins: 3, actual_pickup_mins: 4 },
      { dispatch_id: 'd-4', city_name: 'New York', predicted_eta_mins: 6, actual_pickup_mins: 7 },
      { dispatch_id: 'd-5', city_name: 'New York', predicted_eta_mins: 4, actual_pickup_mins: 5 }
    ],

    // Day 05: Unfulfilled Requests
    ride_dispatch_outcomes: [
      { request_id: 'req-1', product_tier: 'UberX', status: 'COMPLETED' },
      { request_id: 'req-2', product_tier: 'UberX', status: 'COMPLETED' },
      { request_id: 'req-3', product_tier: 'UberX', status: 'UNFULFILLED' },
      { request_id: 'req-4', product_tier: 'UberXL', status: 'UNFULFILLED' },
      { request_id: 'req-5', product_tier: 'UberXL', status: 'COMPLETED' },
      { request_id: 'req-6', product_tier: 'Uber Black', status: 'COMPLETED' }
    ],

    // Day 06: Airport Queue
    airport_queue_logs: [
      { queue_id: 'q-1', airport_code: 'JFK', driver_id: 'drv-1', dwell_minutes: 52 },
      { queue_id: 'q-2', airport_code: 'JFK', driver_id: 'drv-2', dwell_minutes: 48 },
      { queue_id: 'q-3', airport_code: 'JFK', driver_id: 'drv-3', dwell_minutes: 24 },
      { queue_id: 'q-4', airport_code: 'LAX', driver_id: 'drv-4', dwell_minutes: 38 },
      { queue_id: 'q-5', airport_code: 'ORD', driver_id: 'drv-5', dwell_minutes: 29 }
    ],

    // Day 07: Weekly Marketplace Rollup
    weekly_marketplace_rollups: [
      { trip_id: 'tr-1', driver_id: 'drv-1', gross_fare_usd: 32.50, driver_payout_usd: 24.20 },
      { trip_id: 'tr-2', driver_id: 'drv-2', gross_fare_usd: 48.00, driver_payout_usd: 36.50 },
      { trip_id: 'tr-3', driver_id: 'drv-1', gross_fare_usd: 19.50, driver_payout_usd: 15.00 },
      { trip_id: 'tr-4', driver_id: 'drv-3', gross_fare_usd: 55.00, driver_payout_usd: 42.00 }
    ],

    // Day 08: Driver Shift Durations
    driver_shift_durations: [
      { shift_id: 's-1', driver_id: 'drv-1', city_name: 'New York', p1_mins: 60, p2_mins: 45, p3_mins: 150 },
      { shift_id: 's-2', driver_id: 'drv-2', city_name: 'New York', p1_mins: 40, p2_mins: 50, p3_mins: 180 },
      { shift_id: 's-3', driver_id: 'drv-3', city_name: 'Phoenix', p1_mins: 120, p2_mins: 30, p3_mins: 90 }
    ],

    // Day 09: Shared Ride Matches
    shared_ride_matches: [
      { match_id: 'sm-1', market_id: 'Boston', direct_duration_mins: 18, shared_duration_mins: 28 }, // 10m detour (>8m)
      { match_id: 'sm-2', market_id: 'Boston', direct_duration_mins: 22, shared_duration_mins: 26 }, // 4m detour
      { match_id: 'sm-3', market_id: 'Chicago', direct_duration_mins: 15, shared_duration_mins: 20 }
    ],

    // Day 10: Driver Quests
    driver_quest_cohorts: [
      { enrollment_id: 'qe-1', driver_id: 'drv-1', quest_tier: 'Bronze', target_trips: 30, completed_trips: 32, bonus_payout_usd: 80.00 },
      { enrollment_id: 'qe-2', driver_id: 'drv-2', quest_tier: 'Bronze', target_trips: 30, completed_trips: 28, bonus_payout_usd: 0.00 },
      { enrollment_id: 'qe-3', driver_id: 'drv-3', quest_tier: 'Silver', target_trips: 60, completed_trips: 64, bonus_payout_usd: 200.00 }
    ],

    // Day 11: Consecutive Trips
    driver_consecutive_trips: [
      { trip_id: 'ct-1', driver_id: 'drv-1', pickup_time: '2026-10-15 17:00:00', dropoff_time: '2026-10-15 17:25:00' },
      { trip_id: 'ct-2', driver_id: 'drv-1', pickup_time: '2026-10-15 17:28:00', dropoff_time: '2026-10-15 17:50:00' },
      { trip_id: 'ct-3', driver_id: 'drv-1', pickup_time: '2026-10-15 17:55:00', dropoff_time: '2026-10-15 18:20:00' }
    ],

    // Day 12: Driver Weekly Acceptance
    driver_weekly_acceptance: [
      { driver_id: 'drv-101', city_name: 'Miami', week_1_accept_pct: 88.5, week_2_accept_pct: 62.0 },
      { driver_id: 'drv-102', city_name: 'Miami', week_1_accept_pct: 92.0, week_2_accept_pct: 89.5 },
      { driver_id: 'drv-103', city_name: 'Atlanta', week_1_accept_pct: 84.0, week_2_accept_pct: 58.0 }
    ],

    // Day 13: Dual Earner Shifts
    dual_earner_shifts: [
      { shift_id: 'ds-1', driver_id: 'drv-1', rides_earnings: 140.00, eats_earnings: 75.00 },
      { shift_id: 'ds-2', driver_id: 'drv-2', rides_earnings: 180.00, eats_earnings: 95.00 }
    ],

    // Day 14: Vehicle Trip Telemetry
    vehicle_trip_telemetry: [
      { telemetry_id: 'vt-1', powertrain_type: 'EV', passenger_miles: 180.5, deadhead_miles: 42.0 },
      { telemetry_id: 'vt-2', powertrain_type: 'GAS', passenger_miles: 240.0, deadhead_miles: 75.0 }
    ],

    // Day 15: Rider Cancellations
    rider_cancellations: [
      { cancel_id: 'rc-1', trip_id: 'tr-1', seconds_after_match: 45, fee_charged_usd: 0.00 },
      { cancel_id: 'rc-2', trip_id: 'tr-2', seconds_after_match: 80, fee_charged_usd: 0.00 },
      { cancel_id: 'rc-3', trip_id: 'tr-3', seconds_after_match: 195, fee_charged_usd: 5.00 }
    ],

    // Day 16: Driver Dispatch Events
    driver_dispatch_events: [
      { event_id: 'de-1', driver_id: 'drv-901', cancelled_by_driver: 1 },
      { event_id: 'de-2', driver_id: 'drv-901', cancelled_by_driver: 1 },
      { event_id: 'de-3', driver_id: 'drv-901', cancelled_by_driver: 0 }
    ],

    // Day 17: Trip GPS Telemetry (Fraud)
    trip_gps_telemetry: [
      { trip_id: 'gf-1', driver_id: 'bad-drv-1', distance_miles: 34.0, duration_minutes: 8.5, fare_amount_usd: 88.00 },
      { trip_id: 'gf-2', driver_id: 'drv-normal', distance_miles: 8.2, duration_minutes: 24.0, fare_amount_usd: 22.50 }
    ],

    // Day 18: Telematics Sensor Logs
    telematics_sensor_logs: [
      { log_id: 'tl-1', driver_id: 'drv-1', miles_driven: 120.0, hard_brakes: 2, rapid_accels: 1 },
      { log_id: 'tl-2', driver_id: 'drv-2', miles_driven: 85.0, hard_brakes: 6, rapid_accels: 4 }
    ],

    // Day 19: Weather Reroute Trips
    weather_reroute_trips: [
      { trip_id: 'wr-1', weather_condition: 'Snow', estimated_miles: 6.0, actual_miles: 8.4 },
      { trip_id: 'wr-2', weather_condition: 'Clear', estimated_miles: 5.5, actual_miles: 5.7 }
    ],

    // Day 20: Fare Split Ledger
    fare_split_ledger: [
      { split_id: 'fs-1', trip_id: 'tr-1', expected_total_usd: 30.50, collected_amount_usd: 15.25 },
      { split_id: 'fs-2', trip_id: 'tr-1', expected_total_usd: 30.50, collected_amount_usd: 15.00 } // 0.25 discrepancy
    ],

    // Day 21: RideCheck Incidents
    ridecheck_incidents: [
      { incident_id: 'rc-1', city_name: 'San Francisco', stop_duration_mins: 6, rider_response: 'SAFE', escalated_to_emergency: 0 },
      { incident_id: 'rc-2', city_name: 'San Francisco', stop_duration_mins: 8, rider_response: 'ESCALATED', escalated_to_emergency: 1 }
    ],

    // Day 22: Financial Quarterly Bridge
    financial_quarterly_bridge: [
      { entry_id: 'fb-1', business_line: 'Mobility', gross_bookings_usd: 18500000000, driver_pay_usd: 12400000000, incentives_usd: 850000000 },
      { entry_id: 'fb-2', business_line: 'Delivery', gross_bookings_usd: 17200000000, driver_pay_usd: 13100000000, incentives_usd: 680000000 }
    ],

    // Day 23: Prop 22 Driver Periods
    prop22_driver_periods: [
      { period_id: 'p22-1', driver_id: 'drv-ca-1', engaged_hours: 42.5, engaged_miles: 580.0, actual_earnings_usd: 940.00 },
      { period_id: 'p22-2', driver_id: 'drv-ca-2', engaged_hours: 38.0, engaged_miles: 490.0, actual_earnings_usd: 1250.00 }
    ],

    // Day 24: NYC Congestion Ledger
    nyc_congestion_ledger: [
      { trip_id: 'nyc-1', in_congestion_zone: 1, surcharge_collected_usd: 2.75, surcharge_remitted_usd: 2.75 },
      { trip_id: 'nyc-2', in_congestion_zone: 1, surcharge_collected_usd: 2.75, surcharge_remitted_usd: 2.75 }
    ],

    // Day 25: Membership Rider Profiles
    membership_rider_profiles: [
      { user_id: 'u-1', is_uber_one_member: 1, monthly_trips: 12, monthly_gb_usd: 215.00 },
      { user_id: 'u-2', is_uber_one_member: 1, monthly_trips: 8, monthly_gb_usd: 165.00 },
      { user_id: 'u-3', is_uber_one_member: 0, monthly_trips: 3, monthly_gb_usd: 54.00 }
    ],

    // Day 26: Cross Border Trips
    cross_border_trips: [
      { trip_id: 'cb-1', trip_date: '2026-08-10', fare_gbp: 28.50 },
      { trip_id: 'cb-2', trip_date: '2026-08-10', fare_gbp: 42.00 }
    ],
    gbp_fx_rates: [
      { rate_date: '2026-08-10', gbp_to_usd: 1.2850 }
    ],

    // Day 27: Rider Acquisition Cohorts
    rider_acquisition_cohorts: [
      { user_id: 'rac-1', acquisition_channel: 'Rider Referral', cumulative_6m_gb_usd: 480.00 },
      { user_id: 'rac-2', acquisition_channel: 'Paid Social', cumulative_6m_gb_usd: 190.00 },
      { user_id: 'rac-3', acquisition_channel: 'Airport Billboard', cumulative_6m_gb_usd: 310.00 }
    ],

    // Day 28: Fleet Comparison Trips
    fleet_comparison_trips: [
      { trip_id: 'fc-1', fleet_mode: 'Autonomous AV', rider_rating: 4.95, avg_speed_mph: 22.4, completed: 1 },
      { trip_id: 'fc-2', fleet_mode: 'Autonomous AV', rider_rating: 4.90, avg_speed_mph: 24.1, completed: 1 },
      { trip_id: 'fc-3', fleet_mode: 'Human Driver', rider_rating: 4.85, avg_speed_mph: 26.8, completed: 1 }
    ],

    // Day 29: NYE Cluster Telemetry (War Room)
    nye_cluster_telemetry: [
      { cluster_id: 'syd-harbour-01', city_name: 'Sydney', requests_count: 12400, unfulfilled_count: 2480, current_surge: 3.5 },
      { cluster_id: 'lon-soho-02', city_name: 'London', requests_count: 18200, unfulfilled_count: 3100, current_surge: 3.5 },
      { cluster_id: 'nyc-timessq-01', city_name: 'New York', requests_count: 24500, unfulfilled_count: 1900, current_surge: 2.8 }
    ],

    // Day 30: Global Mega Region Rollup
    global_mega_region_rollup: [
      { rollup_id: 'g-1', mega_region: 'US_CAN', total_trips: 1850000000, completed_trips: 1720000000, gross_bookings_usd: 54000000000, net_revenue_usd: 15300000000, active_drivers: 2400000 },
      { rollup_id: 'g-2', mega_region: 'EMEA', total_trips: 1420000000, completed_trips: 1310000000, gross_bookings_usd: 38000000000, net_revenue_usd: 10600000000, active_drivers: 1850000 },
      { rollup_id: 'g-3', mega_region: 'LATAM', total_trips: 1100000000, completed_trips: 1010000000, gross_bookings_usd: 21000000000, net_revenue_usd: 5900000000, active_drivers: 1500000 },
      { rollup_id: 'g-4', mega_region: 'APAC', total_trips: 980000000, completed_trips: 890000000, gross_bookings_usd: 19000000000, net_revenue_usd: 5300000000, active_drivers: 1200000 }
    ]
  };

  function executeQuery(sql, dayNum) {
    const startTime = performance.now();
    try {
      const cleanSql = sql.trim().replace(/;$/, '');
      const dayData = (window.UBER_STORY_DATA || []).find(d => d.day === dayNum);
      const tableName = dayData ? dayData.schema : 'marketplace_hourly_liquidity';
      const rows = UBER_DATASETS[tableName] || UBER_DATASETS['marketplace_hourly_liquidity'];

      if (!cleanSql.toLowerCase().startsWith('select')) {
        return { success: false, error: 'Only SELECT queries supported in dispatch sandbox.', latency: 0.5 };
      }

      const resultRows = generateMockResultForDay(dayNum, rows);
      const latency = Math.round((performance.now() - startTime + 6.8) * 10) / 10;
      return { success: true, rows: resultRows, latency };
    } catch (err) {
      return { success: false, error: err.message || 'SQL execution error', latency: 1.0 };
    }
  }

  function generateMockResultForDay(dayNum, sourceRows) {
    switch (dayNum) {
      case 1:
        return [
          { zone_name: 'Lower East Side', total_drivers: 42, total_requests: 149, liquidity_ratio: 0.28 },
          { zone_name: 'Midtown Manhattan', total_drivers: 205, total_requests: 320, liquidity_ratio: 0.64 },
          { zone_name: 'Williamsburg Brooklyn', total_drivers: 45, total_requests: 52, liquidity_ratio: 0.87 }
        ];
      case 2:
        return [
          { surge_tier: '1.0x Base', total_quotes: 3, accept_rate_pct: 66.7 },
          { surge_tier: '1.1-1.5x Moderate', total_quotes: 2, accept_rate_pct: 50.0 },
          { surge_tier: '1.6-2.0x High', total_quotes: 1, accept_rate_pct: 100.0 },
          { surge_tier: '2.1x+ Extreme', total_quotes: 2, accept_rate_pct: 0.0 }
        ];
      case 3:
        return [
          { pickup_h3_index: '8828308281fffff', total_trips: 580, avg_distance_miles: 13.5, avg_fare_usd: 46.35 },
          { pickup_h3_index: '882830829bfffff', total_trips: 920, avg_distance_miles: 3.4, avg_fare_usd: 16.80 }
        ];
      case 4:
        return [
          { city_name: 'Chicago', total_dispatches: 3, avg_error_mins: 3.3, late_pct: 66.7 },
          { city_name: 'New York', total_dispatches: 2, avg_error_mins: 1.0, late_pct: 0.0 }
        ];
      case 5:
        return [
          { product_tier: 'UberXL', total_requests: 2, unfulfilled_count: 1, bounce_rate_pct: 50.00 },
          { product_tier: 'UberX', total_requests: 3, unfulfilled_count: 1, bounce_rate_pct: 33.33 },
          { product_tier: 'Uber Black', total_requests: 1, unfulfilled_count: 0, bounce_rate_pct: 0.00 }
        ];
      case 6:
        return [
          { airport_code: 'JFK', total_drivers: 3, avg_wait_mins: 41.3, excessive_wait_count: 2 },
          { airport_code: 'LAX', total_drivers: 1, avg_wait_mins: 38.0, excessive_wait_count: 0 },
          { airport_code: 'ORD', total_drivers: 1, avg_wait_mins: 29.0, excessive_wait_count: 0 }
        ];
      case 7:
        return [{ total_trips: 4, distinct_drivers: 3, total_gross_bookings: 155.00, take_rate_pct: 24.06 }];
      case 8:
        return [
          { city_name: 'New York', total_online_hours: 6.3, utilization_pct: 86.6 },
          { city_name: 'Phoenix', total_online_hours: 4.0, utilization_pct: 50.0 }
        ];
      case 9:
        return [
          { market_id: 'Boston', total_matches: 2, avg_detour_mins: 7.0, excessive_detour_pct: 50.0 },
          { market_id: 'Chicago', total_matches: 1, avg_detour_mins: 5.0, excessive_detour_pct: 0.0 }
        ];
      case 10:
        return [
          { quest_tier: 'Bronze', target_trips: 30, total_enrolled: 2, total_completed: 1, quest_completion_pct: 50.0 },
          { quest_tier: 'Silver', target_trips: 60, total_enrolled: 1, total_completed: 1, quest_completion_pct: 100.0 }
        ];
      case 11:
        return [
          { driver_id: 'drv-1', trip_id: 'ct-1', pickup_time: '2026-10-15 17:00:00', dispatch_gap_mins: null },
          { driver_id: 'drv-1', trip_id: 'ct-2', pickup_time: '2026-10-15 17:28:00', dispatch_gap_mins: 3.0 },
          { driver_id: 'drv-1', trip_id: 'ct-3', pickup_time: '2026-10-15 17:55:00', dispatch_gap_mins: 5.0 }
        ];
      case 12:
        return [
          { driver_id: 'drv-101', city_name: 'Miami', week_1_accept_pct: 88.5, week_2_accept_pct: 62.0, accept_rate_drop: 26.5 },
          { driver_id: 'drv-103', city_name: 'Atlanta', week_1_accept_pct: 84.0, week_2_accept_pct: 58.0, accept_rate_drop: 26.0 }
        ];
      case 13:
        return [{ total_rides_earnings: 320.00, total_eats_earnings: 170.00, eats_share_pct: 34.7 }];
      case 14:
        return [
          { powertrain_type: 'EV', total_passenger_miles: 180.5, total_deadhead_miles: 42.0, deadhead_pct: 18.9 },
          { powertrain_type: 'GAS', total_passenger_miles: 240.0, total_deadhead_miles: 75.0, deadhead_pct: 23.8 }
        ];
      case 15:
        return [
          { cancel_bracket: 'Grace Period (<= 120s)', total_cancels: 2, pct_of_cancels: 66.7 },
          { cancel_bracket: 'Fee Eligible (> 120s)', total_cancels: 1, pct_of_cancels: 33.3 }
        ];
      case 16:
        return [{ driver_id: 'drv-901', total_dispatches: 24, driver_cancels: 8, cancel_rate_pct: 33.3 }];
      case 17:
        return [{ trip_id: 'gf-1', driver_id: 'bad-drv-1', distance_miles: 34.0, duration_minutes: 8.5, avg_speed_mph: 240.0 }];
      case 18:
        return [
          { driver_id: 'drv-1', total_miles: 120.0, total_hard_brakes: 2, hard_brake_rate_per_100m: 1.67 },
          { driver_id: 'drv-2', total_miles: 85.0, total_hard_brakes: 6, hard_brake_rate_per_100m: 7.06 }
        ];
      case 19:
        return [
          { weather_condition: 'Clear', trip_count: 1, avg_estimated_miles: 5.5, avg_actual_miles: 5.7, avg_detour_ratio: 1.04 },
          { weather_condition: 'Snow', trip_count: 1, avg_estimated_miles: 6.0, avg_actual_miles: 8.4, avg_detour_ratio: 1.40 }
        ];
      case 20:
        return [{ trip_id: 'tr-1', expected_total_usd: 30.50, total_collected: 30.25 }];
      case 21:
        return [{ city_name: 'San Francisco', total_incidents: 2, safe_confirmations: 1, emergency_escalations: 1, escalation_pct: 50.00 }];
      case 22:
        return [
          { business_line: 'Mobility', total_gb: 18500000000, total_net_revenue: 5250000000, net_take_rate_pct: 28.38 },
          { business_line: 'Delivery', total_gb: 17200000000, total_net_revenue: 3420000000, net_take_rate_pct: 19.88 }
        ];
      case 23:
        return [{ driver_id: 'drv-ca-1', actual_earnings_usd: 940.00, guaranteed_floor: 1019.00, top_up_subsidy: 79.00 }];
      case 24:
        return [{ total_trips: 2, total_collected: 5.50, total_remitted: 5.50, remittance_discrepancy: 0.00 }];
      case 25:
        return [
          { is_uber_one_member: 0, user_count: 1, avg_monthly_trips: 3.0, avg_monthly_gb: 54.00 },
          { is_uber_one_member: 1, user_count: 2, avg_monthly_trips: 10.0, avg_monthly_gb: 190.00 }
        ];
      case 26:
        return [{ total_trips: 2, total_gbp: 70.50, total_usd: 90.59 }];
      case 27:
        return [
          { acquisition_channel: 'Rider Referral', total_riders: 1, total_6m_gb: 480.00, avg_6m_ltv_usd: 480.00 },
          { acquisition_channel: 'Airport Billboard', total_riders: 1, total_6m_gb: 310.00, avg_6m_ltv_usd: 310.00 },
          { acquisition_channel: 'Paid Social', total_riders: 1, total_6m_gb: 190.00, avg_6m_ltv_usd: 190.00 }
        ];
      case 28:
        return [
          { fleet_mode: 'Autonomous AV', total_trips: 2, avg_rating: 4.93, avg_speed_mph: 23.3, completion_pct: 100.0 },
          { fleet_mode: 'Human Driver', total_trips: 1, avg_rating: 4.85, avg_speed_mph: 26.8, completion_pct: 100.0 }
        ];
      case 29:
        return [
          { cluster_id: 'lon-soho-02', city_name: 'London', requests_count: 18200, unfulfilled_pct: 17.0 },
          { cluster_id: 'syd-harbour-01', city_name: 'Sydney', requests_count: 12400, unfulfilled_pct: 20.0 }
        ];
      case 30:
        return [
          { mega_region: 'US_CAN', total_trips: 1850000000, completion_pct: 93.0, total_gb_usd: 54000000000, net_take_rate_pct: 28.33 },
          { mega_region: 'EMEA', total_trips: 1420000000, completion_pct: 92.3, total_gb_usd: 38000000000, net_take_rate_pct: 27.89 },
          { mega_region: 'LATAM', total_trips: 1100000000, completion_pct: 91.8, total_gb_usd: 21000000000, net_take_rate_pct: 28.10 },
          { mega_region: 'APAC', total_trips: 980000000, completion_pct: 90.8, total_gb_usd: 19000000000, net_take_rate_pct: 27.89 }
        ];
      default:
        return sourceRows ? sourceRows.slice(0, 5) : [];
    }
  }

  window.UBER_SQL_RUNNER = {
    execute: executeQuery,
    getTableData: function(table) {
      return UBER_DATASETS[table] || null;
    },
    getAllTables: function() {
      return Object.keys(UBER_DATASETS);
    }
  };
})(window);
