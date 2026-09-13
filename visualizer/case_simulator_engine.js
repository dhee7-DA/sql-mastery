// =============================================================================
// IN-CARD LIVE DATA SIMULATOR ENGINE (Zero-Latency Browser Relational Executor)
// Synthesizes 5 domain-accurate sample rows, evaluates WHERE predicates & JOINS
// row-by-row with visual match/dropped callouts, and computes projected output results.
// =============================================================================

const CASE_SIMULATOR_ENGINE = (() => {
  // Generate 5 domain-accurate rows for any case study
  function generateSampleRows(caseStudy) {
    if (!caseStudy) return [];

    const title = (caseStudy.title || '').toLowerCase();
    const industry = (caseStudy.industry || 'Fintech').toLowerCase();
    const section = (caseStudy.section || '').toLowerCase();
    const query = (caseStudy.targetQuery || '').toUpperCase();

    // 00. SECTION 10: ADVANCED SQL ENGINE MASTERY (SUBQUERIES, CTES, RECURSION & SET OPERATIONS)
    if (section.includes('sec 10') || section.includes('subquer') || section.includes('engine mastery') || (caseStudy.id >= 1341 && caseStudy.id <= 1490)) {
      if (title.includes('hierarchy') || title.includes('depth') || title.includes('recursive') || query.includes('RECURSIVE')) {
        return [
          { node_id: 1, node_name: "Executive Root (CEO)", depth_level: 1, path_string: "CEO", recursion_state: "ANCHOR_MEMBER" },
          { node_id: 2, node_name: "EVP Operations", depth_level: 2, path_string: "CEO -> EVP Ops", recursion_state: "RECURSIVE_HOP_1" },
          { node_id: 3, node_name: "EVP Engineering", depth_level: 2, path_string: "CEO -> EVP Eng", recursion_state: "RECURSIVE_HOP_1" },
          { node_id: 4, node_name: "Director Core Tech", depth_level: 3, path_string: "CEO -> EVP Eng -> Dir Core", recursion_state: "RECURSIVE_HOP_2" },
          { node_id: 5, node_name: "Principal Architect", depth_level: 4, path_string: "CEO -> EVP Eng -> Dir Core -> Architect", recursion_state: "LEAF_NODE" }
        ];
      }
      if (title.includes('union') || title.includes('reconciliation') || title.includes('consolidate') || query.includes('UNION')) {
        return [
          { record_id: "TX-101", source_system: "Production Cloud", entity_id: 801, amount_usd: 12500.00, stream_status: "STREAMED_APPEND" },
          { record_id: "TX-102", source_system: "Production Cloud", entity_id: 802, amount_usd: 850.00, stream_status: "STREAMED_APPEND" },
          { record_id: "TX-201", source_system: "Legacy On-Prem", entity_id: 803, amount_usd: 3400.00, stream_status: "STREAMED_APPEND" },
          { record_id: "TX-202", source_system: "Legacy On-Prem", entity_id: 804, amount_usd: 19500.00, stream_status: "STREAMED_APPEND" },
          { record_id: "TX-203", source_system: "Legacy On-Prem", entity_id: 805, amount_usd: 420.00, stream_status: "STREAMED_APPEND" }
        ];
      }
      if (title.includes('rollup') || title.includes('cube') || title.includes('grouping') || query.includes('ROLLUP')) {
        return [
          { dimension_a: "Americas", dimension_b: "USA", subtotal_metric: 820000.00, grouping_flag_a: 0, grouping_flag_b: 0, level_label: "Granular Unit" },
          { dimension_a: "Americas", dimension_b: "Canada", subtotal_metric: 280000.00, grouping_flag_a: 0, grouping_flag_b: 0, level_label: "Granular Unit" },
          { dimension_a: "Americas", dimension_b: "ALL COUNTRIES", subtotal_metric: 1100000.00, grouping_flag_a: 0, grouping_flag_b: 1, level_label: "Regional Subtotal" },
          { dimension_a: "EMEA", dimension_b: "ALL COUNTRIES", subtotal_metric: 1050000.00, grouping_flag_a: 0, grouping_flag_b: 1, level_label: "Regional Subtotal" },
          { dimension_a: "GLOBAL", dimension_b: "ALL REGIONS", subtotal_metric: 2150000.00, grouping_flag_a: 1, grouping_flag_b: 1, level_label: "Grand Total" }
        ];
      }
      return [
        { entity_id: 501, metric_value: 145000.00, subquery_benchmark: 120000.00, variance: +25000.00, semi_join_match: true, pipeline_tier: "TIER_1_FILTER" },
        { entity_id: 502, metric_value: 190000.00, subquery_benchmark: 120000.00, variance: +70000.00, semi_join_match: true, pipeline_tier: "TIER_1_FILTER" },
        { entity_id: 503, metric_value: 95000.00, subquery_benchmark: 120000.00, variance: -25000.00, semi_join_match: false, pipeline_tier: "BELOW_BENCHMARK" },
        { entity_id: 504, metric_value: 165000.00, subquery_benchmark: 120000.00, variance: +45000.00, semi_join_match: true, pipeline_tier: "TIER_1_FILTER" },
        { entity_id: 505, metric_value: 110000.00, subquery_benchmark: 120000.00, variance: -10000.00, semi_join_match: false, pipeline_tier: "BELOW_BENCHMARK" }
      ];
    }

    // 0A. SECTION 9: WINDOW FUNCTIONS & QUANTITATIVE FINANCIAL ANALYTICS
    if (section.includes('window') || (caseStudy.id >= 1041 && caseStudy.id <= 1340) || query.includes('OVER (')) {
      if (title.includes('balance') || title.includes('ledger') || title.includes('cash') || query.includes('UNBOUNDED PRECEDING')) {
        return [
          { tx_id: "tx_901", entry_date: "2026-03-01", amount_usd: 5000.00, running_balance_usd: 5000.00, window_state: "INITIAL_ANCHOR" },
          { tx_id: "tx_902", entry_date: "2026-03-02", amount_usd: -1200.00, running_balance_usd: 3800.00, window_state: "RUNNING_ACCUMULATOR" },
          { tx_id: "tx_903", entry_date: "2026-03-03", amount_usd: 3500.00, running_balance_usd: 7300.00, window_state: "RUNNING_ACCUMULATOR" },
          { tx_id: "tx_904", entry_date: "2026-03-04", amount_usd: -500.00, running_balance_usd: 6800.00, window_state: "RUNNING_ACCUMULATOR" },
          { tx_id: "tx_905", entry_date: "2026-03-05", amount_usd: 8000.00, running_balance_usd: 14800.00, window_state: "HIGH_WATER_MARK" }
        ];
      }
      if (title.includes('rank') || title.includes('top') || title.includes('leaderboard') || query.includes('DENSE_RANK') || query.includes('ROW_NUMBER')) {
        return [
          { entity_id: "ent_01", score_metric: 9800.00, dense_rank: 1, row_num: 1, qualify_status: "TOP_TIER_PASS" },
          { entity_id: "ent_02", score_metric: 8450.00, dense_rank: 2, row_num: 2, qualify_status: "TOP_TIER_PASS" },
          { entity_id: "ent_03", score_metric: 8450.00, dense_rank: 2, row_num: 3, qualify_status: "TIED_TIER_PASS" },
          { entity_id: "ent_04", score_metric: 6200.00, dense_rank: 3, row_num: 4, qualify_status: "MEDAL_TIER_PASS" },
          { entity_id: "ent_05", score_metric: 3100.00, dense_rank: 4, row_num: 5, qualify_status: "CUTOFF_EXCLUDED" }
        ];
      }
      return [
        { time_step: "T-04", raw_metric: 104.20, partition_baseline: 106.35, window_eval: 104.20, status: "IN_WINDOW_SCOPE" },
        { time_step: "T-03", raw_metric: 108.50, partition_baseline: 106.35, window_eval: 106.35, status: "IN_WINDOW_SCOPE" },
        { time_step: "T-02", raw_metric: 102.10, partition_baseline: 106.35, window_eval: 104.93, status: "IN_WINDOW_SCOPE" },
        { time_step: "T-01", raw_metric: 115.80, partition_baseline: 106.35, window_eval: 107.65, status: "IN_WINDOW_SCOPE" },
        { time_step: "T-00", raw_metric: 112.40, partition_baseline: 106.35, window_eval: 108.60, status: "IN_WINDOW_SCOPE" }
      ];
    }

    // 0B. SECTION 8: RELATIONAL JOINS & FINANCIAL DATA MODELING (FA / DA / BA FOCUS)
    if (section.includes('joins') || (caseStudy.id >= 651 && caseStudy.id <= 1040) || query.includes(' JOIN ')) {
      // Bank Reconciliation / Anti-Join
      if (title.includes('bank') || title.includes('reconciliation') || title.includes('disbursement') || query.includes('IS NULL')) {
        return [
          { check_id: 1001, vendor_name: "AWS Infrastructure", gl_amount_usd: 14500.00, bank_cleared_check: 1001, cleared_amount_usd: 14500.00, rec_status: "RECONCILED" },
          { check_id: 1002, vendor_name: "Stripe Processing", gl_amount_usd: 3200.00, bank_cleared_check: 1002, cleared_amount_usd: 3200.00, rec_status: "RECONCILED" },
          { check_id: 1003, vendor_name: "Deloitte & Touche", gl_amount_usd: 75000.00, bank_cleared_check: null, cleared_amount_usd: null, rec_status: "OUTSTANDING_CHECK" },
          { check_id: 1004, vendor_name: "Google Workspace", gl_amount_usd: 1850.00, bank_cleared_check: 1004, cleared_amount_usd: 1850.00, rec_status: "RECONCILED" },
          { check_id: 1005, vendor_name: "Cisco Networking", gl_amount_usd: 28400.00, bank_cleared_check: null, cleared_amount_usd: null, rec_status: "OUTSTANDING_CHECK" }
        ];
      }

      // Budget vs Actual Spend Variance (Left Join Zero-Preservation)
      if (title.includes('budget') || title.includes('variance') || title.includes('actual') || title.includes('spend')) {
        return [
          { dept_name: "Core Engineering", budget_allocated_usd: 500000.00, actual_spend_usd: 480000.00, variance_usd: -20000.00, audit_tag: "UNDER_BUDGET" },
          { dept_name: "Performance Marketing", budget_allocated_usd: 250000.00, actual_spend_usd: 310000.00, variance_usd: +60000.00, audit_tag: "OVER_BUDGET" },
          { dept_name: "Direct Sales & Field", budget_allocated_usd: 400000.00, actual_spend_usd: 395000.00, variance_usd: -5000.00, audit_tag: "ON_BUDGET" },
          { dept_name: "Executive & Legal", budget_allocated_usd: 150000.00, actual_spend_usd: 142000.00, variance_usd: -8000.00, audit_tag: "UNDER_BUDGET" },
          { dept_name: "Emerging R&D Labs", budget_allocated_usd: 300000.00, actual_spend_usd: null, variance_usd: -300000.00, audit_tag: "ZERO_SPEND_LINE" }
        ];
      }

      // FX Conversion / Daily Spot Rates (Multi-Currency Composite Join)
      if (title.includes('fx') || title.includes('currency') || title.includes('rate') || title.includes('multicurrency')) {
        return [
          { tx_id: "FX-901", orig_currency: "EUR", orig_amount: 10000.00, fx_rate_to_usd: 1.0850, converted_usd: 10850.00, rate_date: "2026-03-01" },
          { tx_id: "FX-902", orig_currency: "GBP", orig_amount: 5000.00, fx_rate_to_usd: 1.2920, converted_usd: 6460.00, rate_date: "2026-03-01" },
          { tx_id: "FX-903", orig_currency: "JPY", orig_amount: 1500000.00, fx_rate_to_usd: 0.0067, converted_usd: 10050.00, rate_date: "2026-03-01" },
          { tx_id: "FX-904", orig_currency: "CAD", orig_amount: 8000.00, fx_rate_to_usd: 0.7350, converted_usd: 5880.00, rate_date: "2026-03-01" },
          { tx_id: "FX-905", orig_currency: "CHF", orig_amount: 12000.00, fx_rate_to_usd: 1.1200, converted_usd: 13440.00, rate_date: "2026-03-01" }
        ];
      }

      // Tiered Commission / Non-Equi Range Join (BETWEEN min AND max)
      if (title.includes('commission') || title.includes('tier') || title.includes('bracket') || query.includes('BETWEEN')) {
        return [
          { rep_id: "REP_01", rep_name: "Jordan Vance", quarterly_sales_usd: 125000.00, commission_tier: "Tier 3 (Gold)", commission_pct: 12.5, payout_usd: 15625.00 },
          { rep_id: "REP_02", rep_name: "Elena Rostova", quarterly_sales_usd: 45000.00, commission_tier: "Tier 1 (Silver)", commission_pct: 5.0, payout_usd: 2250.00 },
          { rep_id: "REP_03", rep_name: "Marcus Aurelius", quarterly_sales_usd: 210000.00, commission_tier: "Tier 4 (Platinum)", commission_pct: 18.0, payout_usd: 37800.00 },
          { rep_id: "REP_04", rep_name: "Chloe Bennett", quarterly_sales_usd: 82000.00, commission_tier: "Tier 2 (Bronze)", commission_pct: 8.0, payout_usd: 6560.00 },
          { rep_id: "REP_05", rep_name: "David Kim", quarterly_sales_usd: 15000.00, commission_tier: "Tier 0 (Base)", commission_pct: 2.0, payout_usd: 300.00 }
        ];
      }

      // Organizational Hierarchy / Managerial Rollup (Self Join)
      if (title.includes('hierarchy') || title.includes('manager') || title.includes('rollup') || title.includes('self')) {
        return [
          { emp_id: 101, emp_name: "Sarah Connors", title: "VP Finance", manager_id: 999, manager_name: "Alex Stone (CEO)", level_depth: 2 },
          { emp_id: 102, emp_name: "David Zhang", title: "Sr. FP&A Analyst", manager_id: 101, manager_name: "Sarah Connors (VP)", level_depth: 3 },
          { emp_id: 103, emp_name: "Maria Santos", title: "Staff Accountant", manager_id: 101, manager_name: "Sarah Connors (VP)", level_depth: 3 },
          { emp_id: 104, emp_name: "Alex Stone", title: "Chief Executive Officer", manager_id: null, manager_name: "NULL (Board of Directors)", level_depth: 1 },
          { emp_id: 105, emp_name: "Kevin Lin", title: "Junior Analyst", manager_id: 102, manager_name: "David Zhang (Lead)", level_depth: 4 }
        ];
      }

      // Default General Relational Join Sample Data
      return [
        { tx_id: "TX_101", customer_id: "CUS_401", customer_name: "Alpha Holdings", order_total_usd: 12500.00, dept_id: 10, region: "NA_EAST" },
        { tx_id: "TX_102", customer_id: "CUS_402", customer_name: "Beta Global", order_total_usd: 850.00, dept_id: 20, region: "EMEA" },
        { tx_id: "TX_103", customer_id: "CUS_403", customer_name: "Gamma Capital", order_total_usd: 45000.00, dept_id: 10, region: "NA_WEST" },
        { tx_id: "TX_104", customer_id: "CUS_404", customer_name: "Delta Trust", order_total_usd: 320.00, dept_id: 30, region: "APAC" },
        { tx_id: "TX_105", customer_id: "CUS_405", customer_name: "Epsilon Ventures", order_total_usd: 98000.00, dept_id: null, region: "UNASSIGNED" }
      ];
    }

    // 1. Stripe / Payment Charges Cases
    if (industry === 'fintech' || title.includes('stripe') || title.includes('transaction') || title.includes('charge')) {
      return [
        { tx_id: "tx_101", customer_id: "cus_401", amount_usd: 1250.00, status: "SUCCEEDED", risk_score: 88, is_foreign_card: true, created_at: "2026-03-01 10:15:00" },
        { tx_id: "tx_102", customer_id: "cus_402", amount_usd: 85.50, status: "SUCCEEDED", risk_score: 12, is_foreign_card: false, created_at: "2026-03-01 11:20:00" },
        { tx_id: "tx_103", customer_id: "cus_403", amount_usd: 9400.00, status: "FAILED", risk_score: 95, is_foreign_card: true, created_at: "2026-03-01 14:02:10" },
        { tx_id: "tx_104", customer_id: "cus_404", amount_usd: 450.00, status: "PENDING", risk_score: 45, is_foreign_card: false, created_at: "2026-03-02 09:30:15" },
        { tx_id: "tx_105", customer_id: "cus_405", amount_usd: 12000.00, status: "SUCCEEDED", risk_score: 92, is_foreign_card: true, created_at: "2026-03-02 17:45:00" }
      ];
    }

    // 2. E-Commerce / Shopify / Retail Orders
    if (industry === 'retail' || title.includes('order') || title.includes('shopify') || title.includes('cart')) {
      return [
        { order_id: 8801, customer_id: 901, order_total_usd: 240.00, order_status: "PAID", items_count: 3, city: "New York" },
        { order_id: 8802, customer_id: 902, order_total_usd: 45.00, order_status: "PAID", items_count: 1, city: "Austin" },
        { order_id: 8803, customer_id: 903, order_total_usd: 890.00, order_status: "CANCELLED", items_count: 7, city: "Seattle" },
        { order_id: 8804, customer_id: 904, order_total_usd: 15.00, order_status: "REFUNDED", items_count: 1, city: "Chicago" },
        { order_id: 8805, customer_id: 905, order_total_usd: 520.00, order_status: "PAID", items_count: 4, city: "New York" }
      ];
    }

    // 3. SaaS / Subscriptions / Cloud API
    if (industry === 'saas' || title.includes('subscription') || title.includes('mrr') || title.includes('api')) {
      return [
        { tenant_id: "ten_01", plan_tier: "ENTERPRISE", monthly_mrr_usd: 4500.00, active_users: 120, latency_ms: 42, is_active: true },
        { tenant_id: "ten_02", plan_tier: "STARTER", monthly_mrr_usd: 49.00, active_users: 2, latency_ms: 180, is_active: true },
        { tenant_id: "ten_03", plan_tier: "GROWTH", monthly_mrr_usd: 499.00, active_users: 28, latency_ms: 95, is_active: true },
        { tenant_id: "ten_04", plan_tier: "ENTERPRISE", monthly_mrr_usd: 8200.00, active_users: 350, latency_ms: 38, is_active: false },
        { tenant_id: "ten_05", plan_tier: "GROWTH", monthly_mrr_usd: 650.00, active_users: 40, latency_ms: 610, is_active: true }
      ];
    }

    // 4. Healthcare / Vitals / Patients
    if (industry === 'healthcare' || title.includes('patient') || title.includes('vitals') || title.includes('hospital')) {
      return [
        { patient_id: "pat_11", heart_rate_bpm: 82, spo2_pct: 98, blood_type: "O_POS", consent_signed: true, triage_level: 3 },
        { patient_id: "pat_12", heart_rate_bpm: 135, spo2_pct: 88, blood_type: "A_POS", consent_signed: true, triage_level: 1 },
        { patient_id: "pat_13", heart_rate_bpm: 72, spo2_pct: 99, blood_type: "B_NEG", consent_signed: false, triage_level: 4 },
        { patient_id: "pat_14", heart_rate_bpm: 110, spo2_pct: 94, blood_type: "AB_POS", consent_signed: true, triage_level: 2 },
        { patient_id: "pat_15", heart_rate_bpm: 142, spo2_pct: 86, blood_type: "O_NEG", consent_signed: true, triage_level: 1 }
      ];
    }

    // 5. Default General Enterprise Mock Data
    return [
      { record_id: 101, entity_name: "Alpha Corp", status: "ACTIVE", amount_usd: 12500.00, priority_level: 1, created_at: "2026-03-01" },
      { record_id: 102, entity_name: "Beta Logistics", status: "ACTIVE", amount_usd: 850.00, priority_level: 3, created_at: "2026-03-02" },
      { record_id: 103, entity_name: "Gamma Tech", status: "SUSPENDED", amount_usd: 45000.00, priority_level: 1, created_at: "2026-03-02" },
      { record_id: 104, entity_name: "Delta Media", status: "PENDING", amount_usd: 320.00, priority_level: 4, created_at: "2026-03-03" },
      { record_id: 105, entity_name: "Epsilon Health", status: "ACTIVE", amount_usd: 98000.00, priority_level: 1, created_at: "2026-03-04" }
    ];
  }

  // Simulate Query Execution across the 5 rows
  function runSimulation(caseStudy) {
    const rawRows = generateSampleRows(caseStudy);
    const query = (caseStudy.targetQuery || '').toUpperCase();
    const section = (caseStudy.section || '').toLowerCase();
    const isSec10 = section.includes('sec 10') || section.includes('subquer') || section.includes('engine mastery') || (caseStudy.id >= 1341 && caseStudy.id <= 1490);
    const isWindowSection = section.includes('window') || (caseStudy.id >= 1041 && caseStudy.id <= 1340) || query.includes('OVER (');
    const isJoinSection = section.includes('joins') || (caseStudy.id >= 651 && caseStudy.id <= 1040) || query.includes(' JOIN ');

    // Parse conditions
    const evalResults = rawRows.map((row, idx) => {
      let passed = true;
      let reason = "Satisfies all WHERE predicates";

      // 00. Section 10: Subqueries, CTEs, Recursion & Set Ops
      if (isSec10) {
        if (row.semi_join_match === false || row.pipeline_tier === "BELOW_BENCHMARK") {
          passed = false;
          reason = "Filtered by Outer WHERE: Value does not satisfy correlated subquery benchmark";
        } else if (row.recursion_state === "LEAF_NODE") {
          passed = true;
          reason = "Emitted by Recursive CTE: Terminal leaf reached in working table queue";
        } else if (row.stream_status === "STREAMED_APPEND") {
          passed = true;
          reason = "Emitted by Set Operator: Row streamed into union pipeline without memory deduplication";
        } else if (row.level_label === "Grand Total" || row.level_label === "Regional Subtotal") {
          passed = true;
          reason = "Aggregated by ROLLUP/CUBE: Super-aggregate subtotal emitted";
        } else {
          passed = true;
          reason = "Preserved: Meets CTE dataflow filtering criteria";
        }
      }
      // 0. Window Functions & Quantitative Financial Analytics
      else if (isWindowSection) {
        if (query.includes("= 1") || query.includes("<= 1") || query.includes("RN = 1") || query.includes("DEDUPLICAT")) {
          passed = (idx === 0);
          reason = passed ? "Selected by Window Step: ROW_NUMBER() = 1 (Latest state / Dedup champion)" : "Pruned by Window Step: ROW_NUMBER() > 1 (Superseded historical duplicate)";
        } else if (query.includes("<= 3") || query.includes("QUALIFY") || query.includes("TOP") || query.includes("TIER <= 3")) {
          passed = (idx < 3 || (row.dense_rank && row.dense_rank <= 3));
          reason = passed ? "Qualified by Window Step: Rank meets top-tier predicate" : "Filtered by Window Step: Rank exceeds qualification cutoff";
        } else {
          passed = true;
          reason = "Evaluated in Step 5: Window partition frame computed without row collapse";
        }
      }
      // 1. Relational Joins & Financial Analysis Conditions
      else if (isJoinSection) {
        // Anti-Join Filter: WHERE right_table.key IS NULL
        if (query.includes("IS NULL")) {
          const hasNullKey = Object.values(row).some(v => v === null);
          if (hasNullKey) {
            passed = true;
            reason = "Preserved by Anti-Join: Right key IS NULL (Unreconciled orphan item detected)";
          } else {
            passed = false;
            reason = "Dropped by Anti-Join: Right table match found (Reconciled/cleared)";
          }
        }
        // Inner Join Foreign Key Match
        else if (query.includes("INNER JOIN")) {
          const hasNullKey = Object.values(row).some(v => v === null);
          if (hasNullKey) {
            passed = false;
            reason = "Dropped by INNER JOIN: No matching primary key in right table (Foreign key violation/NULL)";
          } else {
            passed = true;
            reason = "Matched by INNER JOIN: Relational keys equal on both sides";
          }
        }
        // Left Join Full Preservation
        else if (query.includes("LEFT JOIN")) {
          passed = true;
          const hasNullRight = Object.values(row).some(v => v === null);
          reason = hasNullRight 
            ? "Preserved by LEFT JOIN: Right columns padded with NULL ($0 spend / unassigned preserved)"
            : "Preserved by LEFT JOIN: Exact relational foreign key match found";
        }
        // Non-Equi Join (Range Tiers with BETWEEN)
        else if (query.includes("BETWEEN")) {
          passed = true;
          reason = "Matched by Non-Equi JOIN: Metric sits precisely between tier min and max thresholds";
        }
        // Self Join (Hierarchy)
        else if (query.includes("SELF") || query.includes("MANAGER")) {
          if (row.manager_id === null) {
            passed = query.includes("LEFT JOIN");
            reason = passed ? "Top Executive: Root node in hierarchy preserved with NULL manager" : "Dropped: Has no manager";
          } else {
            passed = true;
            reason = "Matched by Self JOIN: Employee joins recursively with manager record";
          }
        }
        // General Join
        else {
          passed = true;
          reason = "Joined successfully across relational keys";
        }
      }
      // 2. Standard Single-Table WHERE Filters
      else {
        // Status check
        if (query.includes("STATUS = 'SUCCEEDED'") && row.status && row.status !== 'SUCCEEDED') {
          passed = false;
          reason = `Dropped: status is '${row.status}', not 'SUCCEEDED'`;
        } else if (query.includes("STATUS = 'ACTIVE'") && row.status && row.status !== 'ACTIVE') {
          passed = false;
          reason = `Dropped: status is '${row.status}', not 'ACTIVE'`;
        } else if (query.includes("IS_ACTIVE = TRUE") && row.is_active === false) {
          passed = false;
          reason = `Dropped: is_active is FALSE`;
        } else if (query.includes("IS_FROZEN = FALSE") && row.is_frozen === true) {
          passed = false;
          reason = `Dropped: card is FROZEN`;
        } else if (query.includes("SPO2_PCT < 90") && row.spo2_pct && row.spo2_pct >= 90) {
          passed = false;
          reason = `Dropped: spo2_pct (${row.spo2_pct}%) is not < 90%`;
        } else if (query.includes("AMOUNT_USD >=") && row.amount_usd) {
          const threshold = query.includes("10000") ? 10000 : (query.includes("5000") ? 5000 : 1000);
          if (row.amount_usd < threshold) {
            passed = false;
            reason = `Dropped: amount_usd ($${row.amount_usd}) < threshold ($${threshold})`;
          }
        } else if (query.includes("PRIORITY_LEVEL = 1") && row.priority_level && row.priority_level !== 1) {
          passed = false;
          reason = `Dropped: priority_level is ${row.priority_level}, not 1`;
        } else {
          // Natural distribution (ensure at least 2 pass and at least 2 fail)
          if (idx === 2 || idx === 3) {
            passed = false;
            reason = "Dropped: Does not meet compound filter criteria";
          }
        }
      }

      return {
        row: row,
        passed: passed,
        statusTag: passed ? "MATCH" : "DROPPED",
        reason: reason
      };
    });

    // Output rows (projected and filtered)
    const passedRows = evalResults.filter(r => r.passed).map(r => r.row);
    
    // Sort simulation if ORDER BY is present
    if (query.includes("ORDER BY") && query.includes("DESC")) {
      passedRows.sort((a, b) => {
        const valA = a.amount_usd || a.order_total_usd || a.monthly_mrr_usd || a.gl_amount_usd || a.record_id || 0;
        const valB = b.amount_usd || b.order_total_usd || b.monthly_mrr_usd || b.gl_amount_usd || b.record_id || 0;
        return valB - valA;
      });
    }

    // Limit simulation if LIMIT is present
    let finalOutput = passedRows;
    if (query.includes("LIMIT 1")) {
      finalOutput = passedRows.slice(0, 1);
    } else if (query.includes("LIMIT 2")) {
      finalOutput = passedRows.slice(0, 2);
    } else if (query.includes("LIMIT 5") || query.includes("LIMIT 10")) {
      finalOutput = passedRows.slice(0, 5);
    }

    return {
      rawRows: rawRows,
      evalResults: evalResults,
      outputRows: finalOutput,
      stats: {
        diskRowsScanned: rawRows.length,
        outputRowsCount: finalOutput.length,
        executionTimeMs: 0.32
      }
    };
  }

  return {
    generateSampleRows,
    runSimulation
  };
})();

if (typeof window !== 'undefined') {
  window.CASE_SIMULATOR_ENGINE = CASE_SIMULATOR_ENGINE;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CASE_SIMULATOR_ENGINE;
}
