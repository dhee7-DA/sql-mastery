/**
 * ============================================================================
 * 📊 SAAS BUSINESS ANALYTICS & COHORT COCKPIT (Day 13 Engine)
 * ============================================================================
 * An interactive, visual, and physics-driven analytics cockpit covering:
 *   1. Cohort Retention Heatmap: Triangle matrix with Month 0 to Month 11 decay
 *   2. Net Revenue Retention (NRR %): Dollar-weighted retention with expansion/upsell
 *   3. Logo & Revenue Churn Analyzer: Monthly churn rates, hazard rates & half-life
 *   4. MRR Waterfall & Movement: New, Expansion, Contraction, Churn & Net New
 *   5. Unit Economics & LTV Calculator: ARPU, CAC Payback, LTV:CAC ratios
 *   6. Production SQL Code Inspector with "Run in Studio" dynamic execution
 *   7. Executive Traps & Anti-Patterns breakdown
 * ============================================================================
 */

(function (window) {
  'use strict';

  // --- 1. DATA MODELS & COHORT SIMULATION DATA ---
  const CHANNELS = [
    { id: 'all', name: 'All Acquisition Channels', icon: '🌐' },
    { id: 'organic', name: 'Organic & Direct', icon: '🌱' },
    { id: 'paid', name: 'Paid Ads (SEM / Social)', icon: '🎯' },
    { id: 'sales', name: 'Outbound Enterprise', icon: '🤝' },
    { id: 'plg', name: 'Product-Led Growth (PLG)', icon: '🚀' }
  ];

  const TIERS = [
    { id: 'all', name: 'All Plan Tiers', icon: '📦', arpu: 149 },
    { id: 'starter', name: 'Starter ($49/mo)', icon: '🥉', arpu: 49 },
    { id: 'pro', name: 'Professional ($199/mo)', icon: '🥈', arpu: 199 },
    { id: 'enterprise', name: 'Enterprise ($999/mo)', icon: '🥇', arpu: 999 }
  ];

  // Base 12 monthly cohorts (Jan 2026 to Dec 2026)
  // Each cohort has starting size and retention curve multiplier
  const RAW_COHORT_BASE = [
    { month: '2026-01', name: 'Jan 2026', size: 1200, baseMrr: 178800, decay: [1.0, 0.84, 0.73, 0.67, 0.63, 0.60, 0.58, 0.56, 0.55, 0.54, 0.53, 0.52], nrr: [1.0, 0.92, 0.89, 0.94, 0.98, 1.03, 1.07, 1.11, 1.14, 1.17, 1.20, 1.22] },
    { month: '2026-02', name: 'Feb 2026', size: 1350, baseMrr: 201150, decay: [1.0, 0.82, 0.71, 0.65, 0.61, 0.58, 0.56, 0.54, 0.53, 0.52, 0.51], nrr: [1.0, 0.90, 0.87, 0.92, 0.97, 1.01, 1.05, 1.08, 1.12, 1.15, 1.18] },
    { month: '2026-03', name: 'Mar 2026', size: 1500, baseMrr: 223500, decay: [1.0, 0.86, 0.75, 0.69, 0.65, 0.62, 0.60, 0.58, 0.57, 0.56], nrr: [1.0, 0.94, 0.91, 0.96, 1.01, 1.06, 1.10, 1.14, 1.18, 1.21] },
    { month: '2026-04', name: 'Apr 2026', size: 1620, baseMrr: 241380, decay: [1.0, 0.85, 0.74, 0.68, 0.64, 0.61, 0.59, 0.57, 0.56], nrr: [1.0, 0.93, 0.90, 0.95, 1.00, 1.04, 1.08, 1.12, 1.16] },
    { month: '2026-05', name: 'May 2026', size: 1780, baseMrr: 265220, decay: [1.0, 0.83, 0.72, 0.66, 0.62, 0.59, 0.57, 0.55], nrr: [1.0, 0.91, 0.88, 0.93, 0.97, 1.02, 1.05, 1.09] },
    { month: '2026-06', name: 'Jun 2026', size: 1950, baseMrr: 290550, decay: [1.0, 0.87, 0.77, 0.71, 0.67, 0.64, 0.62], nrr: [1.0, 0.96, 0.93, 0.98, 1.03, 1.08, 1.12] },
    { month: '2026-07', name: 'Jul 2026', size: 2100, baseMrr: 312900, decay: [1.0, 0.84, 0.73, 0.67, 0.63, 0.60], nrr: [1.0, 0.92, 0.89, 0.94, 0.99, 1.03] },
    { month: '2026-08', name: 'Aug 2026', size: 2280, baseMrr: 339720, decay: [1.0, 0.86, 0.76, 0.70, 0.66], nrr: [1.0, 0.95, 0.92, 0.97, 1.02] },
    { month: '2026-09', name: 'Sep 2026', size: 2450, baseMrr: 365050, decay: [1.0, 0.85, 0.74, 0.68], nrr: [1.0, 0.93, 0.90, 0.95] },
    { month: '2026-10', name: 'Oct 2026', size: 2600, baseMrr: 387400, decay: [1.0, 0.88, 0.78], nrr: [1.0, 0.97, 0.94] },
    { month: '2026-11', name: 'Nov 2026', size: 2850, baseMrr: 424650, decay: [1.0, 0.86], nrr: [1.0, 0.94] },
    { month: '2026-12', name: 'Dec 2026', size: 3100, baseMrr: 461900, decay: [1.0], nrr: [1.0] }
  ];

  // Channel & Tier modifier weights
  const CHANNEL_WEIGHTS = {
    all: { sizeMult: 1.0, retMult: 1.0, nrrMult: 1.0 },
    organic: { sizeMult: 0.35, retMult: 1.06, nrrMult: 1.03 },
    paid: { sizeMult: 0.30, retMult: 0.92, nrrMult: 0.94 },
    sales: { sizeMult: 0.15, retMult: 1.12, nrrMult: 1.18 },
    plg: { sizeMult: 0.20, retMult: 0.98, nrrMult: 1.05 }
  };

  const TIER_WEIGHTS = {
    all: { sizeMult: 1.0, arpu: 149 },
    starter: { sizeMult: 0.60, arpu: 49, retMult: 0.92, nrrMult: 0.88 },
    pro: { sizeMult: 0.32, arpu: 199, retMult: 1.04, nrrMult: 1.08 },
    enterprise: { sizeMult: 0.08, arpu: 999, retMult: 1.15, nrrMult: 1.25 }
  };

  // --- 2. STATE ---
  let activeTab = 'cohorts'; // 'cohorts', 'nrr', 'churn', 'mrr_waterfall', 'unit_economics'
  let activeChannel = 'all';
  let activeTier = 'all';
  let displayMode = 'percent'; // 'percent' or 'absolute'
  let selectedCellInfo = null;

  // --- 3. PRODUCTION SQL QUERIES PER TAB ---
  const SQL_TEMPLATES = {
    cohorts: `-- =============================================================================
-- PRODUCTION SQL: COHORT USER RETENTION HEATMAP (ANSI / MYSQL 8.0+)
-- =============================================================================
WITH user_first_touch AS (
    -- Step 1: Identify the absolute birth cohort for each subscriber
    SELECT 
        user_id,
        DATE_FORMAT(signup_date, '%Y-%m-01') AS cohort_month
    FROM subscriptions
    GROUP BY user_id, DATE_FORMAT(signup_date, '%Y-%m-01')
),
monthly_activity AS (
    -- Step 2: Track distinct active billing months per subscriber
    SELECT DISTINCT
        user_id,
        DATE_FORMAT(invoice_date, '%Y-%m-01') AS activity_month
    FROM invoices
    WHERE payment_status = 'PAID'
),
cohort_lifecycle AS (
    -- Step 3: Compute elapsed months between cohort month and activity month
    SELECT 
        c.cohort_month,
        TIMESTAMPDIFF(MONTH, STR_TO_DATE(c.cohort_month, '%Y-%m-%d'), STR_TO_DATE(a.activity_month, '%Y-%m-%d')) AS month_number,
        COUNT(DISTINCT a.user_id) AS active_users
    FROM user_first_touch c
    JOIN monthly_activity a ON c.user_id = a.user_id
    GROUP BY c.cohort_month, month_number
),
cohort_sizes AS (
    -- Step 4: Extract Month 0 base denominator for each cohort
    SELECT 
        cohort_month,
        active_users AS cohort_size
    FROM cohort_lifecycle
    WHERE month_number = 0
)
-- Step 5: Pivot into classic retention triangle matrix
SELECT 
    l.cohort_month,
    s.cohort_size,
    ROUND(100.0 * MAX(CASE WHEN l.month_number = 0 THEN l.active_users END) / s.cohort_size, 1) AS m0_pct,
    ROUND(100.0 * MAX(CASE WHEN l.month_number = 1 THEN l.active_users END) / s.cohort_size, 1) AS m1_pct,
    ROUND(100.0 * MAX(CASE WHEN l.month_number = 2 THEN l.active_users END) / s.cohort_size, 1) AS m2_pct,
    ROUND(100.0 * MAX(CASE WHEN l.month_number = 3 THEN l.active_users END) / s.cohort_size, 1) AS m3_pct,
    ROUND(100.0 * MAX(CASE WHEN l.month_number = 4 THEN l.active_users END) / s.cohort_size, 1) AS m4_pct,
    ROUND(100.0 * MAX(CASE WHEN l.month_number = 5 THEN l.active_users END) / s.cohort_size, 1) AS m5_pct,
    ROUND(100.0 * MAX(CASE WHEN l.month_number = 6 THEN l.active_users END) / s.cohort_size, 1) AS m6_pct
FROM cohort_lifecycle l
JOIN cohort_sizes s ON l.cohort_month = s.cohort_month
GROUP BY l.cohort_month, s.cohort_size
ORDER BY l.cohort_month ASC;`,

    nrr: `-- =============================================================================
-- PRODUCTION SQL: NET REVENUE RETENTION (NRR %) HEATMAP & EXPANSION
-- =============================================================================
WITH customer_cohort AS (
    SELECT 
        customer_id,
        DATE_FORMAT(MIN(start_date), '%Y-%m-01') AS cohort_month
    FROM subscriptions
    GROUP BY customer_id
),
monthly_billed_revenue AS (
    SELECT 
        c.cohort_month,
        DATE_FORMAT(i.invoice_date, '%Y-%m-01') AS billed_month,
        TIMESTAMPDIFF(MONTH, STR_TO_DATE(c.cohort_month, '%Y-%m-%d'), STR_TO_DATE(DATE_FORMAT(i.invoice_date, '%Y-%m-01'), '%Y-%m-%d')) AS month_number,
        SUM(i.billed_amount) AS total_revenue
    FROM invoices i
    JOIN customer_cohort c ON i.customer_id = c.customer_id
    WHERE i.payment_status = 'PAID'
    GROUP BY c.cohort_month, billed_month, month_number
),
cohort_base_mrr AS (
    SELECT 
        cohort_month,
        total_revenue AS base_mrr
    FROM monthly_billed_revenue
    WHERE month_number = 0
)
SELECT 
    r.cohort_month,
    b.base_mrr,
    ROUND(100.0 * MAX(CASE WHEN r.month_number = 0 THEN r.total_revenue END) / b.base_mrr, 1) AS nrr_m0,
    ROUND(100.0 * MAX(CASE WHEN r.month_number = 1 THEN r.total_revenue END) / b.base_mrr, 1) AS nrr_m1,
    ROUND(100.0 * MAX(CASE WHEN r.month_number = 2 THEN r.total_revenue END) / b.base_mrr, 1) AS nrr_m2,
    ROUND(100.0 * MAX(CASE WHEN r.month_number = 3 THEN r.total_revenue END) / b.base_mrr, 1) AS nrr_m3,
    ROUND(100.0 * MAX(CASE WHEN r.month_number = 6 THEN r.total_revenue END) / b.base_mrr, 1) AS nrr_m6,
    ROUND(100.0 * MAX(CASE WHEN r.month_number = 12 THEN r.total_revenue END) / b.base_mrr, 1) AS nrr_m12
FROM monthly_billed_revenue r
JOIN cohort_base_mrr b ON r.cohort_month = b.cohort_month
GROUP BY r.cohort_month, b.base_mrr
ORDER BY r.cohort_month ASC;`,

    churn: `-- =============================================================================
-- PRODUCTION SQL: MONTHLY LOGO & REVENUE CHURN ANALYSIS
-- =============================================================================
WITH monthly_subscriber_status AS (
    SELECT 
        DATE_FORMAT(month_date, '%Y-%m-01') AS report_month,
        COUNT(DISTINCT CASE WHEN status = 'ACTIVE' THEN subscription_id END) AS active_subs_start,
        COUNT(DISTINCT CASE WHEN status = 'CANCELLED' AND DATE_FORMAT(cancelled_at, '%Y-%m-01') = DATE_FORMAT(month_date, '%Y-%m-01') THEN subscription_id END) AS churned_subs,
        SUM(CASE WHEN status = 'ACTIVE' THEN monthly_amount ELSE 0 END) AS active_mrr_start,
        SUM(CASE WHEN status = 'CANCELLED' AND DATE_FORMAT(cancelled_at, '%Y-%m-01') = DATE_FORMAT(month_date, '%Y-%m-01') THEN monthly_amount ELSE 0 END) AS churned_mrr
    FROM subscription_daily_snapshots
    GROUP BY DATE_FORMAT(month_date, '%Y-%m-01')
)
SELECT 
    report_month,
    active_subs_start,
    churned_subs,
    -- Logo Churn Rate: Churned Logos / Beginning Active Logos
    ROUND(100.0 * churned_subs / NULLIF(active_subs_start, 0), 2) AS logo_churn_pct,
    -- Revenue Churn Rate: Churned MRR / Beginning Active MRR
    ROUND(100.0 * churned_mrr / NULLIF(active_mrr_start, 0), 2) AS revenue_churn_pct,
    -- Annualized Churn Projection: 1 - (1 - Monthly Churn)^12
    ROUND(100.0 * (1.0 - POWER(1.0 - (churned_subs / NULLIF(active_subs_start, 0)), 12)), 1) AS annualized_logo_churn_pct
FROM monthly_subscriber_status
ORDER BY report_month DESC;`,

    mrr_waterfall: `-- =============================================================================
-- PRODUCTION SQL: SAAS MRR WATERFALL & MOVEMENT RECONCILIATION
-- =============================================================================
WITH monthly_customer_mrr AS (
    -- Compute monthly MRR per customer
    SELECT 
        customer_id,
        DATE_FORMAT(invoice_date, '%Y-%m-01') AS billing_month,
        SUM(amount) AS mrr
    FROM invoices
    WHERE payment_status = 'PAID'
    GROUP BY customer_id, DATE_FORMAT(invoice_date, '%Y-%m-01')
),
mrr_with_lag AS (
    -- Compare current month MRR vs previous month MRR
    SELECT 
        customer_id,
        billing_month,
        mrr AS current_mrr,
        COALESCE(LAG(mrr) OVER (PARTITION BY customer_id ORDER BY billing_month), 0) AS prev_mrr
    FROM monthly_customer_mrr
),
mrr_movements AS (
    -- Classify each customer delta into SaaS standard categories
    SELECT 
        billing_month,
        -- New MRR: customer was $0 last month, >$0 this month
        SUM(CASE WHEN prev_mrr = 0 AND current_mrr > 0 THEN current_mrr ELSE 0 END) AS new_mrr,
        -- Expansion MRR: customer paid more this month than last month
        SUM(CASE WHEN prev_mrr > 0 AND current_mrr > prev_mrr THEN (current_mrr - prev_mrr) ELSE 0 END) AS expansion_mrr,
        -- Contraction MRR: customer downgraded but did not churn
        SUM(CASE WHEN current_mrr > 0 AND current_mrr < prev_mrr THEN (prev_mrr - current_mrr) ELSE 0 END) AS contraction_mrr,
        -- Churn MRR: customer paid $0 this month after paying >$0 last month
        SUM(CASE WHEN current_mrr = 0 AND prev_mrr > 0 THEN prev_mrr ELSE 0 END) AS churn_mrr
    FROM mrr_with_lag
    GROUP BY billing_month
)
SELECT 
    billing_month,
    new_mrr,
    expansion_mrr,
    contraction_mrr,
    churn_mrr,
    (new_mrr + expansion_mrr - contraction_mrr - churn_mrr) AS net_new_mrr,
    SUM(new_mrr + expansion_mrr - contraction_mrr - churn_mrr) OVER (ORDER BY billing_month) AS cumulative_ending_mrr
FROM mrr_movements
ORDER BY billing_month ASC;`,

    unit_economics: `-- =============================================================================
-- PRODUCTION SQL: UNIT ECONOMICS (ARPU, LTV, CAC PAYBACK VELOCITY)
-- =============================================================================
WITH core_metrics AS (
    SELECT 
        DATE_FORMAT(date, '%Y-%m-01') AS metric_month,
        AVG(mrr_per_active_account) AS arpu,
        AVG(gross_margin_pct) AS gross_margin,
        AVG(monthly_logo_churn_rate) AS monthly_churn,
        AVG(blended_cac) AS blended_cac
    FROM financial_ledger_monthly
    GROUP BY DATE_FORMAT(date, '%Y-%m-01')
)
SELECT 
    metric_month,
    ROUND(arpu, 2) AS arpu_usd,
    ROUND(gross_margin * 100, 1) AS gross_margin_pct,
    ROUND(monthly_churn * 100, 2) AS monthly_churn_pct,
    -- Customer Lifetime (Months) = 1 / Monthly Churn
    ROUND(1.0 / NULLIF(monthly_churn, 0), 1) AS avg_customer_lifetime_months,
    -- Customer Lifetime Value (LTV) = (ARPU * Gross Margin) / Churn Rate
    ROUND((arpu * gross_margin) / NULLIF(monthly_churn, 0), 2) AS customer_ltv_usd,
    ROUND(blended_cac, 2) AS blended_cac_usd,
    -- LTV : CAC Ratio (Healthy benchmark >= 3.0x)
    ROUND(((arpu * gross_margin) / NULLIF(monthly_churn, 0)) / NULLIF(blended_cac, 0), 2) AS ltv_to_cac_ratio,
    -- CAC Payback Period (Months) = CAC / (ARPU * Gross Margin) (Healthy benchmark <= 12 mos)
    ROUND(blended_cac / NULLIF(arpu * gross_margin, 0), 1) AS cac_payback_months
FROM core_metrics
ORDER BY metric_month DESC;`
  };

  // --- 4. ENGINE CORE & CALCULATION ---
  function getComputedCohorts() {
    const chWeight = CHANNEL_WEIGHTS[activeChannel] || CHANNEL_WEIGHTS.all;
    const tierWeight = TIER_WEIGHTS[activeTier] || TIER_WEIGHTS.all;

    const sizeMult = chWeight.sizeMult * tierWeight.sizeMult;
    const retMult = (chWeight.retMult || 1.0) * (tierWeight.retMult || 1.0);
    const nrrMult = (chWeight.nrrMult || 1.0) * (tierWeight.nrrMult || 1.0);
    const effectiveArpu = tierWeight.arpu;

    return RAW_COHORT_BASE.map(cohort => {
      const scaledSize = Math.max(10, Math.round(cohort.size * sizeMult));
      const startingMrr = Math.round(scaledSize * effectiveArpu);

      const retentionPcts = cohort.decay.map((d, idx) => {
        if (idx === 0) return 100.0;
        const val = d * retMult * 100.0;
        return Math.min(100.0, Math.max(5.0, Math.round(val * 10) / 10));
      });

      const retainedUsers = retentionPcts.map(pct => {
        return Math.round((pct / 100.0) * scaledSize);
      });

      const nrrPcts = cohort.nrr.map((n, idx) => {
        if (idx === 0) return 100.0;
        const val = n * nrrMult * 100.0;
        return Math.max(10.0, Math.round(val * 10) / 10);
      });

      const nrrRevenue = nrrPcts.map(pct => {
        return Math.round((pct / 100.0) * startingMrr);
      });

      const churnPcts = retentionPcts.map((pct, idx) => {
        if (idx === 0) return 0.0;
        const prev = retentionPcts[idx - 1];
        if (prev <= 0) return 0.0;
        const ch = ((prev - pct) / prev) * 100.0;
        return Math.max(0.0, Math.round(ch * 10) / 10);
      });

      return {
        month: cohort.month,
        name: cohort.name,
        size: scaledSize,
        startingMrr: startingMrr,
        retentionPcts: retentionPcts,
        retainedUsers: retainedUsers,
        nrrPcts: nrrPcts,
        nrrRevenue: nrrRevenue,
        churnPcts: churnPcts
      };
    });
  }

  // Helper for heatmap cell color interpolation
  function getHeatmapBgColor(pct, type) {
    if (type === 'retention') {
      // 100% is vibrant teal/emerald, 50% is dark cyan/slate, 20% is dark navy
      if (pct >= 85) return 'background: #065f46; color: #a7f3d0;'; // emerald-800
      if (pct >= 70) return 'background: #047857; color: #d1fae5;'; // emerald-700
      if (pct >= 60) return 'background: #0f766e; color: #ccfbf1;'; // teal-700
      if (pct >= 50) return 'background: #115e59; color: #e6fffa;'; // teal-800
      if (pct >= 40) return 'background: #1e3a5f; color: #bfdbfe;'; // blue-900
      if (pct >= 30) return 'background: #1e293b; color: #94a3b8;'; // slate-800
      return 'background: #0f172a; color: #64748b;';
    } else if (type === 'nrr') {
      // NRR can exceed 100% (green/purple) or drop below 80% (amber/red)
      if (pct >= 115) return 'background: #4c1d95; color: #ddd6fe; font-weight: 700;'; // violet-900
      if (pct >= 100) return 'background: #065f46; color: #a7f3d0; font-weight: 600;'; // emerald-800
      if (pct >= 90) return 'background: #1e3a5f; color: #bfdbfe;';
      if (pct >= 80) return 'background: #78350f; color: #fde68a;'; // amber-900
      return 'background: #7f1d1d; color: #fecaca;'; // red-900
    } else if (type === 'churn') {
      // Churn: lower is better (slate/dark), higher is dangerous (orange/red)
      if (pct >= 15) return 'background: #7f1d1d; color: #fecaca; font-weight: 700;';
      if (pct >= 10) return 'background: #9a3412; color: #ffedd5; font-weight: 600;';
      if (pct >= 6) return 'background: #78350f; color: #fef3c7;';
      if (pct >= 3) return 'background: #1e293b; color: #cbd5e1;';
      return 'background: #0f172a; color: #64748b;';
    }
    return '';
  }

  // --- 5. RENDER FUNCTIONS ---
  function renderAnalyticsCockpit() {
    const container = document.getElementById('viewAnalyticsCockpit');
    if (!container) return;

    const cohorts = getComputedCohorts();

    container.innerHTML = `
      <div class="analytics-cockpit-wrap">
        <!-- Cockpit Header Banner -->
        <div class="analytics-banner">
          <div class="analytics-banner-left">
            <div class="analytics-badge-row">
              <span class="analytics-badge-pill">📊 DAY 13 MASTER ARENA</span>
              <span class="analytics-badge-pill accent">SaaS &amp; Churn Analytics</span>
              <span class="analytics-badge-pill" style="border-color: #38bdf8; color: #38bdf8;">Production SQL Studio Linked</span>
            </div>
            <h1 class="analytics-heading">SaaS Business Analytics, Cohort Heatmap &amp; Churn Engine</h1>
            <p class="analytics-subheading">
              Explore dynamic cohort retention decay, Net Revenue Retention (NRR) expansion, monthly logo churn, and unit economics. Click any cell to inspect the mathematical formula and view production-ready ANSI SQL queries.
            </p>
          </div>
          <div class="analytics-banner-right">
            <button class="analytics-btn-primary" onclick="window.AnalyticsCockpitEngine.openInStudio()">
              <span>⚡ Run Day 13 Schema in Studio</span>
            </button>
            <button class="analytics-btn-secondary" onclick="window.AnalyticsCockpitEngine.copyActiveSql()">
              <span>📋 Copy Active SQL Query</span>
            </button>
          </div>
        </div>

        <!-- Controls Toolbar: Tabs, Channel Filter, Tier Filter & Display Mode -->
        <div class="analytics-toolbar">
          <div class="analytics-tabs-group">
            <button class="analytics-tab-btn ${activeTab === 'cohorts' ? 'active' : ''}" onclick="window.AnalyticsCockpitEngine.setTab('cohorts')">
              <span>👥 User Retention Heatmap</span>
            </button>
            <button class="analytics-tab-btn ${activeTab === 'nrr' ? 'active' : ''}" onclick="window.AnalyticsCockpitEngine.setTab('nrr')">
              <span>💰 Net Revenue Retention (NRR)</span>
            </button>
            <button class="analytics-tab-btn ${activeTab === 'churn' ? 'active' : ''}" onclick="window.AnalyticsCockpitEngine.setTab('churn')">
              <span>📉 Monthly Churn Hazard</span>
            </button>
            <button class="analytics-tab-btn ${activeTab === 'mrr_waterfall' ? 'active' : ''}" onclick="window.AnalyticsCockpitEngine.setTab('mrr_waterfall')">
              <span>🌊 MRR Waterfall &amp; Movement</span>
            </button>
            <button class="analytics-tab-btn ${activeTab === 'unit_economics' ? 'active' : ''}" onclick="window.AnalyticsCockpitEngine.setTab('unit_economics')">
              <span>🎯 LTV &amp; CAC Unit Economics</span>
            </button>
          </div>

          <div class="analytics-filters-group">
            <!-- Channel Filter -->
            <div class="analytics-select-wrap">
              <label>CHANNEL:</label>
              <select onchange="window.AnalyticsCockpitEngine.setChannel(this.value)">
                ${CHANNELS.map(ch => `
                  <option value="${ch.id}" ${activeChannel === ch.id ? 'selected' : ''}>${ch.icon} ${ch.name}</option>
                `).join('')}
              </select>
            </div>

            <!-- Tier Filter -->
            <div class="analytics-select-wrap">
              <label>PLAN TIER:</label>
              <select onchange="window.AnalyticsCockpitEngine.setTier(this.value)">
                ${TIERS.map(t => `
                  <option value="${t.id}" ${activeTier === t.id ? 'selected' : ''}>${t.icon} ${t.name}</option>
                `).join('')}
              </select>
            </div>

            <!-- Display Mode Toggle -->
            <div class="analytics-toggle-wrap">
              <button class="analytics-toggle-btn ${displayMode === 'percent' ? 'active' : ''}" onclick="window.AnalyticsCockpitEngine.setDisplayMode('percent')">% Pct</button>
              <button class="analytics-toggle-btn ${displayMode === 'absolute' ? 'active' : ''}" onclick="window.AnalyticsCockpitEngine.setDisplayMode('absolute')"># Raw</button>
            </div>
          </div>
        </div>

        <!-- Main Workspace: Matrix Grid on Left, Inspector & SQL on Right -->
        <div class="analytics-workspace-grid">
          <!-- Left: Matrix Table or Visual Chart -->
          <div class="analytics-canvas-panel">
            ${renderTabContent(cohorts)}
          </div>

          <!-- Right: Formula Inspector, Executive Gotchas & Production SQL -->
          <div class="analytics-sidebar-panel">
            ${renderInspectorPanel(cohorts)}
          </div>
        </div>
      </div>
    `;
  }

  function renderTabContent(cohorts) {
    if (activeTab === 'cohorts') {
      return renderCohortHeatmapTable(cohorts, 'retention');
    } else if (activeTab === 'nrr') {
      return renderCohortHeatmapTable(cohorts, 'nrr');
    } else if (activeTab === 'churn') {
      return renderCohortHeatmapTable(cohorts, 'churn');
    } else if (activeTab === 'mrr_waterfall') {
      return renderMrrWaterfallView(cohorts);
    } else if (activeTab === 'unit_economics') {
      return renderUnitEconomicsView(cohorts);
    }
    return '';
  }

  // --- COHORT RETENTION & NRR MATRIX TABLE ---
  function renderCohortHeatmapTable(cohorts, type) {
    const maxMonths = 12;
    const headerCols = Array.from({ length: maxMonths }, (_, i) => `M+${i}`);

    let tableRowsHtml = '';
    cohorts.forEach(c => {
      const dataArr = type === 'retention' ? c.retentionPcts : (type === 'nrr' ? c.nrrPcts : c.churnPcts);
      const rawArr = type === 'retention' ? c.retainedUsers : (type === 'nrr' ? c.nrrRevenue : c.retainedUsers);

      let cellsHtml = '';
      for (let i = 0; i < maxMonths; i++) {
        if (i < dataArr.length) {
          const pctVal = dataArr[i];
          const rawVal = rawArr[i];
          const bgStyle = getHeatmapBgColor(pctVal, type);
          const formattedVal = displayMode === 'percent' 
            ? `${pctVal.toFixed(1)}%` 
            : (type === 'nrr' ? `$${(rawVal / 1000).toFixed(1)}k` : rawVal.toLocaleString());

          const isSelected = selectedCellInfo && selectedCellInfo.cohort === c.month && selectedCellInfo.monthIdx === i;

          cellsHtml += `
            <td class="heatmap-cell ${isSelected ? 'cell-selected' : ''}" style="${bgStyle}" onclick="window.AnalyticsCockpitEngine.selectCell('${c.month}', ${i}, '${type}')">
              <span>${formattedVal}</span>
            </td>
          `;
        } else {
          cellsHtml += `<td class="heatmap-cell-empty"></td>`;
        }
      }

      tableRowsHtml += `
        <tr>
          <td class="cohort-name-col">
            <div style="font-weight: 700; color: #f1f5f9;">${c.name}</div>
            <div style="font-size: 10px; color: #64748b;">${c.month}</div>
          </td>
          <td class="cohort-size-col">
            <span style="font-weight: 600; color: #93c5fd;">${type === 'nrr' ? `$${(c.startingMrr / 1000).toFixed(1)}k` : c.size.toLocaleString()}</span>
          </td>
          ${cellsHtml}
        </tr>
      `;
    });

    return `
      <div class="heatmap-table-container">
        <div class="heatmap-table-title-row">
          <div>
            <span class="heatmap-title">
              ${type === 'retention' ? '👥 Active User Retention Rate (%) Triangle Matrix' : (type === 'nrr' ? '💰 Net Revenue Retention (NRR %) Expansion Matrix' : '📉 Monthly Churn Hazard Rate (%) Matrix')}
            </span>
            <span class="status-pill" style="font-size: 10px; margin-left: 8px;">12 Cohorts • Real-Time Model</span>
          </div>
          <div style="font-size: 11px; color: #94a3b8;">
            <em>Click any cell to inspect retention math &amp; SQL logic.</em>
          </div>
        </div>

        <div class="heatmap-scroll-wrap">
          <table class="heatmap-table">
            <thead>
              <tr>
                <th style="width: 110px;">Cohort Month</th>
                <th style="width: 90px;">${type === 'nrr' ? 'Base MRR' : 'Cohort Size'}</th>
                ${headerCols.map(h => `<th>${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${tableRowsHtml}
            </tbody>
          </table>
        </div>

        <!-- Heatmap Legend -->
        <div class="heatmap-legend-row">
          <span style="font-size: 11px; font-weight: 700; color: #64748b; font-family: var(--font-mono);">RETENTION SCALE:</span>
          ${type === 'retention' ? `
            <span class="legend-swatch" style="background: #065f46; color: #a7f3d0;">&ge; 85% (High)</span>
            <span class="legend-swatch" style="background: #047857; color: #d1fae5;">70% - 84%</span>
            <span class="legend-swatch" style="background: #0f766e; color: #ccfbf1;">60% - 69%</span>
            <span class="legend-swatch" style="background: #115e59; color: #e6fffa;">50% - 59%</span>
            <span class="legend-swatch" style="background: #1e3a5f; color: #bfdbfe;">40% - 49%</span>
            <span class="legend-swatch" style="background: #1e293b; color: #94a3b8;">&lt; 40% (At Risk)</span>
          ` : (type === 'nrr' ? `
            <span class="legend-swatch" style="background: #4c1d95; color: #ddd6fe;">&ge; 115% (Hyper-Expansion)</span>
            <span class="legend-swatch" style="background: #065f46; color: #a7f3d0;">100% - 114% (Net Positive)</span>
            <span class="legend-swatch" style="background: #1e3a5f; color: #bfdbfe;">90% - 99% (Mild Decay)</span>
            <span class="legend-swatch" style="background: #78350f; color: #fde68a;">80% - 89% (Contraction)</span>
            <span class="legend-swatch" style="background: #7f1d1d; color: #fecaca;">&lt; 80% (Revenue Leak)</span>
          ` : `
            <span class="legend-swatch" style="background: #0f172a; color: #64748b;">&lt; 3% (Healthy)</span>
            <span class="legend-swatch" style="background: #1e293b; color: #cbd5e1;">3% - 5%</span>
            <span class="legend-swatch" style="background: #78350f; color: #fef3c7;">6% - 9% (Elevated)</span>
            <span class="legend-swatch" style="background: #9a3412; color: #ffedd5;">10% - 14%</span>
            <span class="legend-swatch" style="background: #7f1d1d; color: #fecaca;">&ge; 15% (Critical Churn)</span>
          `)}
        </div>
      </div>
    `;
  }

  // --- MRR WATERFALL VIEW ---
  function renderMrrWaterfallView(cohorts) {
    // Generate synthetic monthly MRR movement based on cohorts
    const monthlyMovements = cohorts.map((c, i) => {
      const newMrr = Math.round(c.startingMrr * 0.45);
      const expansionMrr = Math.round(c.startingMrr * 0.12 * (1 + i * 0.05));
      const contractionMrr = Math.round(c.startingMrr * 0.04);
      const churnMrr = Math.round(c.startingMrr * 0.08);
      const netNew = newMrr + expansionMrr - contractionMrr - churnMrr;
      return {
        month: c.month,
        name: c.name,
        newMrr,
        expansionMrr,
        contractionMrr,
        churnMrr,
        netNew
      };
    });

    let cumulativeEnding = 500000;

    return `
      <div class="waterfall-container">
        <div class="heatmap-table-title-row">
          <div>
            <span class="heatmap-title">🌊 Monthly Recurring Revenue (MRR) Waterfall Ledger</span>
            <span class="status-pill" style="font-size: 10px; margin-left: 8px;">SaaS Revenue Movement</span>
          </div>
          <div style="font-size: 11px; color: #94a3b8;">
            Formula: Ending MRR = Starting + New + Expansion - Contraction - Churn
          </div>
        </div>

        <div class="waterfall-cards-grid">
          ${monthlyMovements.slice(-4).map(m => {
            cumulativeEnding += m.netNew;
            return `
              <div class="waterfall-card">
                <div class="wf-header">
                  <span class="wf-month">${m.name}</span>
                  <span class="wf-net ${m.netNew >= 0 ? 'pos' : 'neg'}">${m.netNew >= 0 ? '+' : ''}$${Math.round(m.netNew / 1000)}k Net</span>
                </div>
                <div class="wf-rows">
                  <div class="wf-row"><span class="wf-label green">🟢 New MRR:</span><span class="wf-val">+$${Math.round(m.newMrr / 1000)}k</span></div>
                  <div class="wf-row"><span class="wf-label purple">🟣 Expansion:</span><span class="wf-val">+$${Math.round(m.expansionMrr / 1000)}k</span></div>
                  <div class="wf-row"><span class="wf-label amber">🟡 Contraction:</span><span class="wf-val">-$${Math.round(m.contractionMrr / 1000)}k</span></div>
                  <div class="wf-row"><span class="wf-label red">🔴 Churn:</span><span class="wf-val">-$${Math.round(m.churnMrr / 1000)}k</span></div>
                </div>
                <div class="wf-footer">
                  <span>Ending MRR:</span>
                  <strong>$${(cumulativeEnding / 1000).toFixed(1)}k</strong>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="heatmap-scroll-wrap" style="margin-top: 14px;">
          <table class="heatmap-table">
            <thead>
              <tr>
                <th>Billing Month</th>
                <th style="color: #4ade80;">+ New MRR</th>
                <th style="color: #c084fc;">+ Expansion MRR</th>
                <th style="color: #fbbf24;">- Contraction MRR</th>
                <th style="color: #f87171;">- Churn MRR</th>
                <th style="color: #38bdf8;">= Net New MRR</th>
              </tr>
            </thead>
            <tbody>
              ${monthlyMovements.map(m => `
                <tr>
                  <td style="font-weight: 700; color: #f1f5f9;">${m.name}</td>
                  <td style="color: #4ade80; font-family: var(--font-mono);">+$${m.newMrr.toLocaleString()}</td>
                  <td style="color: #c084fc; font-family: var(--font-mono);">+$${m.expansionMrr.toLocaleString()}</td>
                  <td style="color: #fbbf24; font-family: var(--font-mono);">-$${m.contractionMrr.toLocaleString()}</td>
                  <td style="color: #f87171; font-family: var(--font-mono);">-$${m.churnMrr.toLocaleString()}</td>
                  <td style="font-weight: 800; color: ${m.netNew >= 0 ? '#38bdf8' : '#f87171'}; font-family: var(--font-mono);">
                    ${m.netNew >= 0 ? '+' : ''}$${m.netNew.toLocaleString()}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // --- UNIT ECONOMICS VIEW ---
  function renderUnitEconomicsView(cohorts) {
    const tierWeight = TIER_WEIGHTS[activeTier] || TIER_WEIGHTS.all;
    const arpu = tierWeight.arpu;
    const grossMargin = 0.82; // 82% SaaS Gross Margin
    const monthlyChurn = (activeTier === 'enterprise' ? 0.015 : (activeTier === 'starter' ? 0.045 : 0.028));
    const blendedCac = (activeTier === 'enterprise' ? 4200 : (activeTier === 'starter' ? 240 : 850));

    const avgLifetimeMonths = (1.0 / monthlyChurn).toFixed(1);
    const ltv = Math.round((arpu * grossMargin) / monthlyChurn);
    const ltvCacRatio = (ltv / blendedCac).toFixed(2);
    const cacPaybackMonths = (blendedCac / (arpu * grossMargin)).toFixed(1);

    return `
      <div class="unit-economics-wrap">
        <div class="heatmap-table-title-row">
          <div>
            <span class="heatmap-title">🎯 SaaS Unit Economics &amp; LTV:CAC Velocity</span>
            <span class="status-pill" style="font-size: 10px; margin-left: 8px;">Executive Formula Suite</span>
          </div>
          <div style="font-size: 11px; color: #94a3b8;">
            Evaluates pricing health, lifetime payback and acquisition efficiency.
          </div>
        </div>

        <div class="kpi-scorecard-grid">
          <div class="kpi-card">
            <span class="kpi-card-label">ARPU (AVG REVENUE / USER)</span>
            <div class="kpi-card-value" style="color: #38bdf8;">$${arpu} <span style="font-size: 12px; color: #64748b;">/ mo</span></div>
            <div class="kpi-card-sub">Weighted across active subscriptions</div>
          </div>
          <div class="kpi-card">
            <span class="kpi-card-label">MONTHLY LOGO CHURN</span>
            <div class="kpi-card-value" style="color: #f87171;">${(monthlyChurn * 100).toFixed(1)}%</div>
            <div class="kpi-card-sub">Expected Customer Lifetime: <strong>${avgLifetimeMonths} mos</strong></div>
          </div>
          <div class="kpi-card">
            <span class="kpi-card-label">CUSTOMER LIFETIME VALUE (LTV)</span>
            <div class="kpi-card-value" style="color: #4ade80;">$${ltv.toLocaleString()}</div>
            <div class="kpi-card-sub">Formula: (ARPU &times; Gross Margin) / Churn</div>
          </div>
          <div class="kpi-card">
            <span class="kpi-card-label">LTV : CAC RATIO</span>
            <div class="kpi-card-value" style="color: ${parseFloat(ltvCacRatio) >= 3.0 ? '#4ade80' : '#fbbf24'};">${ltvCacRatio}x</div>
            <div class="kpi-card-sub">Benchmark: &ge; 3.0x (Current CAC: $${blendedCac})</div>
          </div>
          <div class="kpi-card">
            <span class="kpi-card-label">CAC PAYBACK PERIOD</span>
            <div class="kpi-card-value" style="color: #c084fc;">${cacPaybackMonths} <span style="font-size: 12px; color: #64748b;">mos</span></div>
            <div class="kpi-card-sub">Months of gross profit to repay sales/marketing</div>
          </div>
          <div class="kpi-card">
            <span class="kpi-card-label">GROSS MARGIN %</span>
            <div class="kpi-card-value" style="color: #f1f5f9;">82.0%</div>
            <div class="kpi-card-sub">Revenue after cloud hosting &amp; payment fees</div>
          </div>
        </div>

        <!-- Analytical Deep-Dive Table -->
        <div style="background: #0e121a; border: 1px solid #1a2230; border-radius: 6px; padding: 14px; margin-top: 14px;">
          <h4 style="font-size: 12px; color: #e2e8f0; margin: 0 0 8px 0; font-family: var(--font-mono);">
            📐 MATHEMATICAL DEFINITIONS &amp; SQL RELATIONSHIPS
          </h4>
          <ul style="font-size: 11.5px; line-height: 1.7; color: #94a3b8; margin: 0; padding-left: 18px;">
            <li><strong>LTV (Customer Lifetime Value)</strong>: <code style="color: #93c5fd;">LTV = (ARPU * Gross_Margin) / Monthly_Churn_Rate</code>. For a $199 Pro customer with 2.8% churn and 82% margin, LTV is $5,827.</li>
            <li><strong>CAC Payback Period</strong>: <code style="color: #93c5fd;">Months = CAC / (ARPU * Gross_Margin)</code>. Tells finance when a customer turns cash-flow positive.</li>
            <li><strong>Magic Number (Sales Efficiency)</strong>: <code style="color: #93c5fd;">(Net_New_ARR_Qtr * 4) / Sales_Marketing_Expense_Prior_Qtr</code>. Measures if $1 invested yields &gt; $1 in new ARR.</li>
          </ul>
        </div>
      </div>
    `;
  }

  // --- INSPECTOR SIDEBAR: CELL DETAILS, TRAPS & SQL VIEWER ---
  function renderInspectorPanel(cohorts) {
    const activeSql = SQL_TEMPLATES[activeTab] || SQL_TEMPLATES.cohorts;

    return `
      <!-- 1. CELL INSPECTOR / KPI CALLOUT -->
      <div class="inspector-card">
        <div class="inspector-header">
          <span style="font-size: 13px;">🔍</span>
          <span class="inspector-title">COGNITIVE CELL INSPECTOR</span>
        </div>
        ${selectedCellInfo ? `
          <div class="cell-inspector-body">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="color: #38bdf8; font-family: var(--font-mono); font-size: 13px;">${selectedCellInfo.cohort} &bull; Month +${selectedCellInfo.monthIdx}</strong>
              <span class="status-pill">${selectedCellInfo.type.toUpperCase()}</span>
            </div>
            <div style="margin-top: 8px; font-size: 11.5px; color: #cbd5e1; line-height: 1.5;">
              <div>Cohort Starting Size: <strong>${selectedCellInfo.size.toLocaleString()}</strong></div>
              <div>Elapsed Months: <strong>${selectedCellInfo.monthIdx} months</strong></div>
              <div>Active in M+${selectedCellInfo.monthIdx}: <strong>${selectedCellInfo.retainedVal.toLocaleString()} (${selectedCellInfo.pct.toFixed(1)}%)</strong></div>
              <div>Cumulative Churned: <strong style="color: #f87171;">${(selectedCellInfo.size - selectedCellInfo.retainedVal).toLocaleString()}</strong></div>
            </div>
            <div class="inspector-formula-box">
              <span style="color: #64748b; font-size: 10px;">FORMULA EVALUATION:</span>
              <div style="color: #a7f3d0; font-family: var(--font-mono); font-size: 11px; margin-top: 2px;">
                ${selectedCellInfo.retainedVal} &divide; ${selectedCellInfo.size} &times; 100 = ${selectedCellInfo.pct.toFixed(1)}%
              </div>
            </div>
          </div>
        ` : `
          <div style="font-size: 11px; color: #64748b; font-style: italic; padding: 4px 0;">
            Click on any cell in the cohort matrix above to inspect exact subscriber headcounts, churn volume, and execution math.
          </div>
        `}
      </div>

      <!-- 2. SILENT ANALYTICS TRAPS & ANTI-PATTERNS -->
      <div class="inspector-card">
        <div class="inspector-header">
          <span style="font-size: 13px;">⚠️</span>
          <span class="inspector-title">EXECUTIVE TRAPS &amp; GOTCHAS</span>
        </div>
        <div class="trap-accordion">
          <div class="trap-item">
            <div class="trap-title">1. The Incomplete Calendar Month Trap</div>
            <div class="trap-desc">
              Computing churn or retention mid-month before recurring renewal webhooks trigger causes artificial 80-90% drop-offs on the final column. Always filter out <code style="color: #93c5fd;">WHERE activity_month &lt; DATE_FORMAT(CURRENT_DATE, '%Y-%m-01')</code>.
            </div>
          </div>
          <div class="trap-item">
            <div class="trap-title">2. Net vs. Gross Retention Illusion</div>
            <div class="trap-desc">
              Net Revenue Retention (NRR) can sit at 120% even when 40% of small customers are churning, because a handful of expanding enterprise accounts mask the leaky bucket. Always report Logo Churn side-by-side with NRR.
            </div>
          </div>
          <div class="trap-item">
            <div class="trap-title">3. Accidental Cartesian Fan-Out on Daily Invoices</div>
            <div class="trap-desc">
              Joining subscriber cohorts to an un-aggregated <code style="color: #93c5fd;">invoices</code> table multiplies customer rows when customers have multiple add-on invoices or refunds. Deduplicate to <code style="color: #93c5fd;">COUNT(DISTINCT user_id)</code> before calculating ratios.
            </div>
          </div>
        </div>
      </div>

      <!-- 3. PRODUCTION SQL CODE VIEWER -->
      <div class="inspector-card" style="flex: 1; display: flex; flex-direction: column;">
        <div class="inspector-header" style="justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 13px;">💻</span>
            <span class="inspector-title">PRODUCTION SQL QUERY</span>
          </div>
          <div style="display: flex; gap: 4px;">
            <button class="card-nav-btn" style="padding: 2px 8px; font-size: 10px;" onclick="window.AnalyticsCockpitEngine.copyActiveSql()">
              📋 Copy
            </button>
            <button class="card-nav-btn action-btn-primary" style="padding: 2px 8px; font-size: 10px;" onclick="window.AnalyticsCockpitEngine.openInStudio()">
              ⚡ Run
            </button>
          </div>
        </div>
        <div class="sql-code-terminal">
          <pre class="sql-code-content"><code>${escapeHtml(activeSql)}</code></pre>
        </div>
      </div>
    `;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- 6. PUBLIC INTERACTION METHODS ---
  const AnalyticsCockpitEngine = {
    init: function () {
      renderAnalyticsCockpit();
    },

    setTab: function (tabKey) {
      activeTab = tabKey;
      selectedCellInfo = null;
      renderAnalyticsCockpit();
      if (window.soundFX) window.soundFX.playClick();
    },

    setChannel: function (chId) {
      activeChannel = chId;
      renderAnalyticsCockpit();
      if (window.soundFX) window.soundFX.playPop();
    },

    setTier: function (tId) {
      activeTier = tId;
      renderAnalyticsCockpit();
      if (window.soundFX) window.soundFX.playPop();
    },

    setDisplayMode: function (mode) {
      displayMode = mode;
      renderAnalyticsCockpit();
      if (window.soundFX) window.soundFX.playClick();
    },

    selectCell: function (cohortMonth, monthIdx, type) {
      const cohorts = getComputedCohorts();
      const cohort = cohorts.find(c => c.month === cohortMonth);
      if (!cohort) return;

      const pct = type === 'retention' ? cohort.retentionPcts[monthIdx] : (type === 'nrr' ? cohort.nrrPcts[monthIdx] : cohort.churnPcts[monthIdx]);
      const retainedVal = type === 'nrr' ? cohort.nrrRevenue[monthIdx] : cohort.retainedUsers[monthIdx];

      selectedCellInfo = {
        cohort: cohortMonth,
        monthIdx: monthIdx,
        type: type,
        pct: pct,
        retainedVal: retainedVal,
        size: type === 'nrr' ? cohort.startingMrr : cohort.size
      };

      renderAnalyticsCockpit();
      if (window.soundFX) window.soundFX.playClick();

      if (window.SQL_BUDDY) {
        window.SQL_BUDDY.say(
          `Inspecting ${cohortMonth} (Month +${monthIdx}): ${pct.toFixed(1)}% active! Formula: ${retainedVal} / ${selectedCellInfo.size}`,
          4000,
          'thinking'
        );
      }
    },

    copyActiveSql: function () {
      const sql = SQL_TEMPLATES[activeTab] || SQL_TEMPLATES.cohorts;
      navigator.clipboard.writeText(sql).then(() => {
        if (window.SQL_BUDDY) {
          window.SQL_BUDDY.say("📋 Production SQL Query copied to clipboard!", 3000, 'celebrate');
        }
        if (window.soundFX) window.soundFX.playSuccess();
      }).catch(err => {
        console.error('Clipboard copy failed:', err);
      });
    },

    openInStudio: function () {
      const sql = SQL_TEMPLATES[activeTab] || SQL_TEMPLATES.cohorts;
      if (typeof window.switchMainView === 'function') {
        window.switchMainView('viewStudio');
      }

      setTimeout(() => {
        const sqlInput = document.getElementById('sqlQueryInput');
        if (sqlInput) {
          sqlInput.value = sql;
        }
        const btnRun = document.getElementById('btnRunSQL');
        if (btnRun) {
          btnRun.click();
        }
        if (window.SQL_BUDDY) {
          window.SQL_BUDDY.say("🚀 Loaded Day 13 Business Analytics query into Studio!", 4000, 'happy');
        }
      }, 100);
    }
  };

  window.AnalyticsCockpitEngine = AnalyticsCockpitEngine;

})(window);
