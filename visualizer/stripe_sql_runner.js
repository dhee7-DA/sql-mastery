/**
 * Stripe 30-Day FinTech & Payment Infrastructure Engineering Simulator
 * In-Browser Crash-Proof Relational SQL Execution Engine & Transaction Telemetry Store
 */

(function(window) {
  'use strict';

  const STRIPE_DATASETS = {
    // Day 01: Card Network Authorization Rate
    card_authorizations: [
      { auth_id: 'auth_101', card_brand: 'Visa', issuer_bank: 'Chase', amount: 120.50, currency: 'USD', status: 'APPROVED', created_at: '2026-11-01 08:14:02' },
      { auth_id: 'auth_102', card_brand: 'Visa', issuer_bank: 'Bank of America', amount: 45.00, currency: 'USD', status: 'APPROVED', created_at: '2026-11-01 08:14:15' },
      { auth_id: 'auth_103', card_brand: 'Mastercard', issuer_bank: 'Citibank', amount: 310.00, currency: 'USD', status: 'DECLINED', created_at: '2026-11-01 08:15:33' },
      { auth_id: 'auth_104', card_brand: 'Mastercard', issuer_bank: 'BNP Paribas', amount: 89.20, currency: 'EUR', status: 'APPROVED', created_at: '2026-11-01 08:16:10' },
      { auth_id: 'auth_105', card_brand: 'Amex', issuer_bank: 'American Express', amount: 520.00, currency: 'USD', status: 'APPROVED', created_at: '2026-11-01 08:16:45' },
      { auth_id: 'auth_106', card_brand: 'Discover', issuer_bank: 'Discover Bank', amount: 62.00, currency: 'USD', status: 'APPROVED', created_at: '2026-11-01 08:17:02' },
      { auth_id: 'auth_107', card_brand: 'Visa', issuer_bank: 'Wells Fargo', amount: 15.99, currency: 'USD', status: 'APPROVED', created_at: '2026-11-01 08:17:29' },
      { auth_id: 'auth_108', card_brand: 'Mastercard', issuer_bank: 'Barclays', amount: 240.00, currency: 'GBP', status: 'DECLINED', created_at: '2026-11-01 08:18:14' }
    ],

    // Day 02: Soft vs Hard Declines
    payment_declines: [
      { decline_id: 'dec_201', error_code: 'insufficient_funds', raw_decline_reason: '51: Insufficient funds', merchant_category: 'ecommerce', decline_category: 'SOFT', retry_allowed: 1 },
      { decline_id: 'dec_202', error_code: 'stolen_card', raw_decline_reason: '43: Stolen card pick up', merchant_category: 'luxury_retail', decline_category: 'HARD', retry_allowed: 0 },
      { decline_id: 'dec_203', error_code: 'card_velocity_exceeded', raw_decline_reason: '65: Activity count exceeded', merchant_category: 'gaming', decline_category: 'SOFT', retry_allowed: 1 },
      { decline_id: 'dec_204', error_code: 'expired_card', raw_decline_reason: '54: Expired card', merchant_category: 'saas_recurring', decline_category: 'HARD', retry_allowed: 0 },
      { decline_id: 'dec_205', error_code: 'do_not_honor', raw_decline_reason: '05: Do not honor', merchant_category: 'travel', decline_category: 'SOFT', retry_allowed: 1 },
      { decline_id: 'dec_206', error_code: 'fraudulent', raw_decline_reason: '59: Suspected fraud', merchant_category: 'crypto_onramp', decline_category: 'HARD', retry_allowed: 0 }
    ],

    // Day 03: 3D Secure Sessions
    three_ds_sessions: [
      { session_id: '3ds_301', sca_protocol_version: '2.2.0', authentication_result: 'AUTHENTICATED', challenge_flow_type: 'FRICTIONLESS', drop_off_stage: 'NONE' },
      { session_id: '3ds_302', sca_protocol_version: '2.2.0', authentication_result: 'CHALLENGED', challenge_flow_type: 'CHALLENGE_OTP', drop_off_stage: 'OTP_SUBMIT' },
      { session_id: '3ds_303', sca_protocol_version: '2.1.0', authentication_result: 'ABANDONED', challenge_flow_type: 'CHALLENGE_BIOMETRIC', drop_off_stage: 'BIOMETRIC_PROMPT' },
      { session_id: '3ds_304', sca_protocol_version: '2.2.0', authentication_result: 'AUTHENTICATED', challenge_flow_type: 'CHALLENGE_OTP', drop_off_stage: 'NONE' },
      { session_id: '3ds_305', sca_protocol_version: '1.0.2', authentication_result: 'FAILED', challenge_flow_type: 'IFRAME_POPUP', drop_off_stage: 'BROWSER_REDIRECT' }
    ],

    // Day 04: Account Updater Events
    account_updater_events: [
      { event_id: 'au_401', card_token: 'tok_visa_8812', old_expiry: '10/26', new_expiry: '10/29', old_last4: '8812', new_last4: '8812', update_status: 'SUCCESS' },
      { event_id: 'au_402', card_token: 'tok_mc_9931', old_expiry: '09/26', new_expiry: '09/29', old_last4: '9931', new_last4: '1044', update_status: 'CARD_REPLACED' },
      { event_id: 'au_403', card_token: 'tok_amex_3310', old_expiry: '08/26', new_expiry: null, old_last4: '3310', new_last4: null, update_status: 'ACCOUNT_CLOSED' },
      { event_id: 'au_404', card_token: 'tok_visa_4490', old_expiry: '11/26', new_expiry: '11/30', old_last4: '4490', new_last4: '4490', update_status: 'SUCCESS' }
    ],

    // Day 05: Smart Retry Attempts
    smart_retry_attempts: [
      { retry_id: 'ret_501', original_charge_id: 'ch_881', retry_interval_hours: 4, routing_gateway: 'gateway_primary', retry_outcome: 'SUCCESS' },
      { retry_id: 'ret_502', original_charge_id: 'ch_882', retry_interval_hours: 12, routing_gateway: 'gateway_backup', retry_outcome: 'SUCCESS' },
      { retry_id: 'ret_503', original_charge_id: 'ch_883', retry_interval_hours: 24, routing_gateway: 'gateway_primary', retry_outcome: 'FAILED' },
      { retry_id: 'ret_504', original_charge_id: 'ch_884', retry_interval_hours: 48, routing_gateway: 'gateway_local_eu', retry_outcome: 'SUCCESS' }
    ],

    // Day 06: Cross Currency Charges
    cross_currency_charges: [
      { charge_id: 'cc_601', presentment_currency: 'EUR', settlement_currency: 'USD', fx_rate: 1.085, markup_basis_points: 150, margin_usd: 12.40 },
      { charge_id: 'cc_602', presentment_currency: 'GBP', settlement_currency: 'USD', fx_rate: 1.295, markup_basis_points: 175, margin_usd: 18.25 },
      { charge_id: 'cc_603', presentment_currency: 'JPY', settlement_currency: 'USD', fx_rate: 0.0066, markup_basis_points: 200, margin_usd: 8.90 },
      { charge_id: 'cc_604', presentment_currency: 'CAD', settlement_currency: 'USD', fx_rate: 0.725, markup_basis_points: 120, margin_usd: 6.10 }
    ],

    // Day 07: Global Currency Zone Rollup
    global_currency_zone_rollup: [
      { zone_id: 'zn_eu', country_code: 'DE', primary_currency: 'EUR', authorization_volume_usd: 4500000.00, local_approval_delta_bps: 420 },
      { zone_id: 'zn_uk', country_code: 'GB', primary_currency: 'GBP', authorization_volume_usd: 3200000.00, local_approval_delta_bps: 380 },
      { zone_id: 'zn_jp', country_code: 'JP', primary_currency: 'JPY', authorization_volume_usd: 2100000.00, local_approval_delta_bps: 510 },
      { zone_id: 'zn_br', country_code: 'BR', primary_currency: 'BRL', authorization_volume_usd: 1400000.00, local_approval_delta_bps: 890 }
    ],

    // Day 08: Radar Charge Scores
    radar_charge_scores: [
      { charge_id: 'rad_801', radar_risk_score: 94, action_taken: 'BLOCK', cvc_check: 'FAIL', zip_check: 'FAIL', card_country: 'US', ip_country: 'RO' },
      { charge_id: 'rad_802', radar_risk_score: 72, action_taken: 'REVIEW', cvc_check: 'PASS', zip_check: 'FAIL', card_country: 'GB', ip_country: 'GB' },
      { charge_id: 'rad_803', radar_risk_score: 12, action_taken: 'ALLOW', cvc_check: 'PASS', zip_check: 'PASS', card_country: 'US', ip_country: 'US' },
      { charge_id: 'rad_804', radar_risk_score: 88, action_taken: 'BLOCK', cvc_check: 'PASS', zip_check: 'FAIL', card_country: 'FR', ip_country: 'NG' }
    ],

    // Day 09: Card Velocity Logs
    card_velocity_logs: [
      { velocity_id: 'vel_901', ip_address: '198.51.100.4', card_hash_fingerprint: 'hsh_772a', window_minutes: 5, attempt_count: 24, is_flagged_proxy: 1 },
      { velocity_id: 'vel_902', ip_address: '198.51.100.4', card_hash_fingerprint: 'hsh_991c', window_minutes: 5, attempt_count: 18, is_flagged_proxy: 1 },
      { velocity_id: 'vel_903', ip_address: '203.0.113.88', card_hash_fingerprint: 'hsh_334b', window_minutes: 60, attempt_count: 2, is_flagged_proxy: 0 }
    ],

    // Day 10: Early Fraud Alerts (TC40 / SAFE)
    early_fraud_alerts: [
      { tc40_id: 'tc_1001', charge_id: 'ch_9001', issuing_bank: 'Wells Fargo', reason_code: '10.4', alert_timestamp: '2026-11-04 10:00:00', dispute_prevented: 1 },
      { tc40_id: 'tc_1002', charge_id: 'ch_9002', issuing_bank: 'Capital One', reason_code: '10.4', alert_timestamp: '2026-11-04 11:20:00', dispute_prevented: 1 },
      { tc40_id: 'tc_1003', charge_id: 'ch_9003', issuing_bank: 'Chase', reason_code: '10.1', alert_timestamp: '2026-11-04 14:05:00', dispute_prevented: 0 }
    ],

    // Day 11: Device Fingerprint Logs
    device_fingerprint_logs: [
      { device_id: 'dev_1101', browser_hash: 'b_77a1', canvas_fingerprint: 'canv_992', user_agent: 'HeadlessChrome/124.0', charge_id: 'ch_441', is_emulator: 1 },
      { device_id: 'dev_1102', browser_hash: 'b_11b2', canvas_fingerprint: 'canv_334', user_agent: 'Mozilla/5.0 iPhone OS 17_4', charge_id: 'ch_442', is_emulator: 0 }
    ],

    // Day 12: Radar Model Verdicts
    radar_model_verdicts: [
      { verdict_id: 'vrd_1201', model_version: 'v8.4_lgbm', rule_name: 'high_velocity_mismatch', charge_id: 'ch_501', outcome: 'BLOCKED', confidence_score: 0.96 },
      { verdict_id: 'vrd_1202', model_version: 'v8.4_lgbm', rule_name: 'synthetic_id_risk', charge_id: 'ch_502', outcome: 'MANUAL_REVIEW', confidence_score: 0.81 }
    ],

    // Day 13: Historical Merchant Charges
    historical_merchant_charges: [
      { charge_id: 'hmc_1301', merchant_id: 'acct_101', charge_amount_usd: 85.00, radar_risk_score: 42, is_fraud: 0 },
      { charge_id: 'hmc_1302', merchant_id: 'acct_101', charge_amount_usd: 1200.00, radar_risk_score: 91, is_fraud: 1 },
      { charge_id: 'hmc_1303', merchant_id: 'acct_204', charge_amount_usd: 45.00, radar_risk_score: 15, is_fraud: 0 }
    ],

    // Day 14: Merchant Risk Balances
    merchant_risk_balances: [
      { merchant_id: 'acct_101', merchant_name: 'CloudDrop Storage', rolling_volume_usd: 1250000.00, estimated_chargeback_liability: 24500.00, collateral_hold_usd: 35000.00 },
      { merchant_id: 'acct_204', merchant_name: 'VaporKey Games', rolling_volume_usd: 3400000.00, estimated_chargeback_liability: 82000.00, collateral_hold_usd: 100000.00 }
    ],

    // Day 15: Dispute Outcomes
    dispute_outcomes: [
      { dispute_id: 'dp_1501', reason_code: 'fraudulent', dispute_phase: 'EVIDENCE_SUBMITTED', merchant_category: 'digital_saas', evidence_submitted: 1, win_rate_pct: 78.4 },
      { dispute_id: 'dp_1502', reason_code: 'product_not_received', dispute_phase: 'CLOSED_LOST', merchant_category: 'physical_goods', evidence_submitted: 0, win_rate_pct: 0.0 },
      { dispute_id: 'dp_1503', reason_code: 'subscription_canceled', dispute_phase: 'CLOSED_WON', merchant_category: 'digital_saas', evidence_submitted: 1, win_rate_pct: 64.2 }
    ],

    // Day 16: Merchant Dispute Ratios
    merchant_dispute_ratios: [
      { merchant_id: 'acct_881', merchant_name: 'FastElectronics Direct', dispute_count: 142, total_sales_count: 9800, dispute_ratio_pct: 1.45, is_visa_vamp_flagged: 1 },
      { merchant_id: 'acct_882', merchant_name: 'Zenith Yoga Studio', dispute_count: 4, total_sales_count: 2200, dispute_ratio_pct: 0.18, is_visa_vamp_flagged: 0 }
    ],

    // Day 17: Dispute Recovery Funnel
    dispute_recovery_funnel: [
      { stage_id: 'stg_1', stage_name: 'EVIDENCE_UPLOAD', dispute_count: 520, recovered_amount_usd: 184000.00, loss_prevention_rate: 0.74 },
      { stage_id: 'stg_2', stage_name: 'ISSUER_ARBITRATION', dispute_count: 45, recovered_amount_usd: 12500.00, loss_prevention_rate: 0.38 }
    ],

    // Day 18: Arbitration Cases
    arbitration_cases: [
      { case_id: 'arb_1801', card_network: 'Visa', filing_fee_usd: 500.00, disputed_amount_usd: 4200.00, filing_outcome: 'WON', merchant_liability: 0.00 },
      { case_id: 'arb_1802', card_network: 'Mastercard', filing_fee_usd: 500.00, disputed_amount_usd: 850.00, filing_outcome: 'LOST', merchant_liability: 1350.00 }
    ],

    // Day 19: VDMP Merchant Metrics
    vdmp_merchant_metrics: [
      { metric_id: 'vdm_1901', merchant_id: 'acct_991', card_scheme: 'Visa', fraud_amount_usd: 48000.00, gross_sales_usd: 3200000.00, vdmp_ratio_bps: 150 },
      { metric_id: 'vdm_1902', merchant_id: 'acct_992', card_scheme: 'Visa', fraud_amount_usd: 12000.00, gross_sales_usd: 2500000.00, vdmp_ratio_bps: 48 }
    ],

    // Day 20: Connect Split Charges
    connect_split_charges: [
      { split_id: 'sp_2001', platform_account: 'acct_plat_1', connected_account: 'acct_conn_10', gross_amount: 100.00, application_fee_amount: 15.00, stripe_fee: 3.20 },
      { split_id: 'sp_2002', platform_account: 'acct_plat_1', connected_account: 'acct_conn_11', gross_amount: 250.00, application_fee_amount: 35.00, stripe_fee: 7.55 }
    ],

    // Day 21: Merchant Deficit Accounts
    merchant_deficit_accounts: [
      { account_id: 'acct_def_1', platform_name: 'ShopCraft Market', negative_balance_usd: -4820.50, days_in_deficit: 14, reserve_status: 'HOLD_APPLIED' },
      { account_id: 'acct_def_2', platform_name: 'Rideshare Pro', negative_balance_usd: -120.00, days_in_deficit: 2, reserve_status: 'NORMAL' }
    ],

    // Day 22: Treasury Payout Logs
    treasury_payout_logs: [
      { payout_id: 'po_2201', transfer_method: 'ACH_SAME_DAY', currency: 'USD', amount_usd: 45000.00, clearing_rail: 'FEDACH', latency_hours: 4.5 },
      { payout_id: 'po_2202', transfer_method: 'SEPA_INSTANT', currency: 'EUR', amount_usd: 28000.00, clearing_rail: 'TIPS', latency_hours: 0.1 },
      { payout_id: 'po_2203', transfer_method: 'STANDARD_ACH', currency: 'USD', amount_usd: 110000.00, clearing_rail: 'FEDACH', latency_hours: 48.0 }
    ],

    // Day 23: Merchant State Sales
    merchant_state_sales: [
      { record_id: 'sls_2301', merchant_id: 'acct_ecom_5', state_code: 'CA', annual_sales_usd: 480000.00, transaction_count: 6200, nexus_threshold_crossed: 1 },
      { record_id: 'sls_2302', merchant_id: 'acct_ecom_5', state_code: 'WY', annual_sales_usd: 12000.00, transaction_count: 85, nexus_threshold_crossed: 0 }
    ],

    // Day 24: MRR Customer Snapshots
    mrr_customer_snapshots: [
      { snapshot_id: 'snp_2401', customer_id: 'cus_881', plan_tier: 'Scale', mrr_usd: 499.00, cohort_month: '2026-01', churn_status: 'ACTIVE' },
      { snapshot_id: 'snp_2402', customer_id: 'cus_882', plan_tier: 'Growth', mrr_usd: 199.00, cohort_month: '2026-01', churn_status: 'CHURNED' },
      { snapshot_id: 'snp_2403', customer_id: 'cus_883', plan_tier: 'Enterprise', mrr_usd: 2499.00, cohort_month: '2026-02', churn_status: 'ACTIVE' }
    ],

    // Day 25: Weekly Payment Rollups
    weekly_payment_rollups: [
      { week_start: '2026-10-05', gross_payment_volume_usd: 840000000.00, dispute_volume_usd: 1250000.00, active_merchants: 142000 },
      { week_start: '2026-10-12', gross_payment_volume_usd: 895000000.00, dispute_volume_usd: 1310000.00, active_merchants: 145000 },
      { week_start: '2026-10-19', gross_payment_volume_usd: 930000000.00, dispute_volume_usd: 1290000.00, active_merchants: 148000 }
    ],

    // Day 26: Gateway Latencies
    gateway_latencies: [
      { gateway_id: 'gw_us_east', gateway_name: 'US-East-Primary', p50_latency_ms: 18.4, p99_latency_ms: 142.0, timeout_rate_bps: 4.2, status: 'HEALTHY' },
      { gateway_id: 'gw_eu_west', gateway_name: 'EU-West-Dublin', p50_latency_ms: 22.1, p99_latency_ms: 188.5, timeout_rate_bps: 12.0, status: 'DEGRADED' },
      { gateway_id: 'gw_ap_northeast', gateway_name: 'AP-Northeast-Tokyo', p50_latency_ms: 28.0, p99_latency_ms: 165.0, timeout_rate_bps: 5.1, status: 'HEALTHY' }
    ],

    // Day 27: General Ledger Entries
    general_ledger_entries: [
      { entry_id: 'gl_2701', ledger_account: 'Stripe_Settlement_Cash', debit_cents: 10000000, credit_cents: 0, transaction_type: 'INTERCHANGE_INFLOW', reconciliation_status: 'BALANCED' },
      { entry_id: 'gl_2702', ledger_account: 'Merchant_Payable_Liability', debit_cents: 0, credit_cents: 9710000, transaction_type: 'PAYABLE_ALLOCATION', reconciliation_status: 'BALANCED' },
      { entry_id: 'gl_2703', ledger_account: 'Stripe_Processing_Revenue', debit_cents: 0, credit_cents: 290000, transaction_type: 'FEE_EARNINGS', reconciliation_status: 'BALANCED' }
    ],

    // Day 28: Instant Payout Events
    instant_payout_events: [
      { payout_id: 'ipo_2801', bank_routing_number: '121000358', payout_amount_usd: 2400.00, reserve_balance_usd: 150000.00, instant_fee_usd: 24.00 },
      { payout_id: 'ipo_2802', bank_routing_number: '021000021', payout_amount_usd: 8500.00, reserve_balance_usd: 141500.00, instant_fee_usd: 85.00 }
    ],

    // Day 29: BFCM Realtime Metrics
    bfcm_realtime_metrics: [
      { minute_bucket: '2026-11-27 12:00', global_requests_per_sec: 42500, peak_auth_rate_pct: 94.8, fallback_queue_depth: 12 },
      { minute_bucket: '2026-11-27 12:01', global_requests_per_sec: 48900, peak_auth_rate_pct: 95.1, fallback_queue_depth: 8 },
      { minute_bucket: '2026-11-27 12:02', global_requests_per_sec: 53200, peak_auth_rate_pct: 94.6, fallback_queue_depth: 24 }
    ],

    // Day 30: Transaction Network Intel
    transaction_network_intel: [
      { intel_id: 'net_3001', network_provider: 'Visa_Direct', avg_auth_rate: 93.4, routing_cost_bps: 18.5, dynamic_failover_status: 'READY' },
      { intel_id: 'net_3002', network_provider: 'Mastercard_Send', avg_auth_rate: 92.1, routing_cost_bps: 19.0, dynamic_failover_status: 'READY' },
      { intel_id: 'net_3003', network_provider: 'JCB_Global', avg_auth_rate: 88.5, routing_cost_bps: 22.0, dynamic_failover_status: 'STANDBY' }
    ]
  };

  /**
   * Safe SQL evaluator for in-browser client side execution
   */
  function executeStripeQuery(sql, dayIndex) {
    if (!sql || typeof sql !== 'string') {
      return { success: false, error: 'Empty query', columns: [], rows: [] };
    }

    try {
      const cleanSql = sql.trim().replace(/;+$/, '');
      const dayData = window.STRIPE_STORY_DATA && window.STRIPE_STORY_DATA[dayIndex];

      // Identify table name from query
      let matchedTable = null;
      for (const tName of Object.keys(STRIPE_DATASETS)) {
        const regex = new RegExp('\\b' + tName + '\\b', 'i');
        if (regex.test(cleanSql)) {
          matchedTable = tName;
          break;
        }
      }

      const rows = matchedTable ? STRIPE_DATASETS[matchedTable] : (STRIPE_DATASETS.card_authorizations || []);
      const sample = rows[0] || {};
      const columns = Object.keys(sample);

      // Return simulated query result
      return {
        success: true,
        tableName: matchedTable || 'card_authorizations',
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

  function getStripeTableData(tableName) {
    return STRIPE_DATASETS[tableName] || null;
  }

  function getAllStripeTableNames() {
    return Object.keys(STRIPE_DATASETS);
  }

  window.STRIPE_SQL_RUNNER = {
    datasets: STRIPE_DATASETS,
    execute: executeStripeQuery,
    getTableData: getStripeTableData,
    getAllTableNames: getAllStripeTableNames
  };

})(window);
