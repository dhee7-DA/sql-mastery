/**
 * SQL FOUNDRY - ENTERPRISE DUAL-TRACK LANDING PAGE ENGINE
 * -----------------------------------------------------------------------------
 * Shift Nudge Typography • Apple Liquid Glass • Aceternity Bento Architecture
 * Track 01: Modern Data Analytics & Product Growth
 * Track 02: Quantitative Finance, Ledgers & Market Microstructure
 */

(function(window) {
  'use strict';

  // --- STATE ---
  const State = {
    activeTrack: 'analytics', // 'analytics' | 'finance'
    activeScenarioId: 'scenario_amazon',
    cohortDisplayMode: 'percent', // 'percent' | 'absolute'
    activeTrapId: 'trap_three_valued_null',
    orderSize: 1500,
    bentoAnimId: null,
    bentoParticles: []
  };

  // --- 1. HERO SCENARIOS (DUAL-TRACK) ---
  const SCENARIOS = {
    analytics: [
      {
        id: 'scenario_amazon',
        title: 'Amazon: Prime Churn (Anti-Join)',
        filename: 'amazon_prime_churn_detector.sql',
        latency: '0.014ms',
        rowsCount: '4 churned customers',
        codeHtml: `<span class="landing-cm">-- Amazon SCOT: Detect Prime buyers churned within 30 days of purchase</span>
<span class="landing-kw">SELECT DISTINCT</span> o1.customer_id, o1.purchase_date, o1.product_id
<span class="landing-kw">FROM</span> amazon_prime_orders o1
<span class="landing-kw">LEFT JOIN</span> amazon_prime_orders o2
  <span class="landing-kw">ON</span> o1.customer_id = o2.customer_id
  <span class="landing-kw">AND</span> o2.purchase_date &gt; o1.purchase_date
  <span class="landing-kw">AND</span> o2.purchase_date &lt;= <span class="landing-fn">DATE</span>(o1.purchase_date, <span class="landing-str">'+30 days'</span>)
<span class="landing-kw">WHERE</span> o2.order_id <span class="landing-kw">IS NULL</span>;`,
        sql: `SELECT DISTINCT o1.customer_id, o1.purchase_date, o1.product_id
FROM amazon_prime_orders o1
LEFT JOIN amazon_prime_orders o2
  ON o1.customer_id = o2.customer_id
  AND o2.purchase_date > o1.purchase_date
  AND o2.purchase_date <= DATE(o1.purchase_date, '+30 days')
WHERE o2.order_id IS NULL;`,
        tableHeaders: ['customer_id', 'purchase_date', 'product_id'],
        tableRows: [
          ['CUST_88201', '2026-09-01', 'PROD_KINDLE_PAPERWHITE'],
          ['CUST_88245', '2026-09-01', 'PROD_ECHO_DOT_5TH_GEN'],
          ['CUST_89104', '2026-09-02', 'PROD_FIRE_TV_STICK_4K'],
          ['CUST_89311', '2026-09-03', 'PROD_RING_VIDEO_DOORBELL']
        ],
        tip: 'Anti-Join mastered! Using LEFT JOIN ... WHERE right.key IS NULL is sargable and avoids expensive correlated subqueries.'
      },
      {
        id: 'scenario_saas_mrr',
        title: 'SaaS: 5-Way MRR Movement',
        filename: 'saas_mrr_waterfall_bridge.sql',
        latency: '0.018ms',
        rowsCount: '5 movement categories',
        codeHtml: `<span class="landing-cm">-- SaaS Metrics: 5-Way MRR Movement Waterfall Bridge</span>
<span class="landing-kw">SELECT</span>
  cohort_month,
  <span class="landing-fn">SUM</span>(<span class="landing-kw">CASE WHEN</span> prev_mrr = <span class="landing-num">0</span> <span class="landing-kw">THEN</span> curr_mrr <span class="landing-kw">ELSE</span> <span class="landing-num">0</span> <span class="landing-kw">END</span>) <span class="landing-kw">AS</span> new_mrr,
  <span class="landing-fn">SUM</span>(<span class="landing-kw">CASE WHEN</span> curr_mrr &gt; prev_mrr <span class="landing-kw">AND</span> prev_mrr &gt; <span class="landing-num">0</span> <span class="landing-kw">THEN</span> curr_mrr - prev_mrr <span class="landing-kw">ELSE</span> <span class="landing-num">0</span> <span class="landing-kw">END</span>) <span class="landing-kw">AS</span> expansion_mrr,
  <span class="landing-fn">SUM</span>(<span class="landing-kw">CASE WHEN</span> curr_mrr &lt; prev_mrr <span class="landing-kw">AND</span> curr_mrr &gt; <span class="landing-num">0</span> <span class="landing-kw">THEN</span> prev_mrr - curr_mrr <span class="landing-kw">ELSE</span> <span class="landing-num">0</span> <span class="landing-kw">END</span>) <span class="landing-kw">AS</span> contraction_mrr,
  <span class="landing-fn">SUM</span>(<span class="landing-kw">CASE WHEN</span> curr_mrr = <span class="landing-num">0</span> <span class="landing-kw">AND</span> prev_mrr &gt; <span class="landing-num">0</span> <span class="landing-kw">THEN</span> prev_mrr <span class="landing-kw">ELSE</span> <span class="landing-num">0</span> <span class="landing-kw">END</span>) <span class="landing-kw">AS</span> churned_mrr
<span class="landing-kw">FROM</span> monthly_customer_mrr
<span class="landing-kw">GROUP BY</span> <span class="landing-num">1</span>;`,
        sql: `SELECT
  cohort_month,
  SUM(CASE WHEN prev_mrr = 0 THEN curr_mrr ELSE 0 END) AS new_mrr,
  SUM(CASE WHEN curr_mrr > prev_mrr AND prev_mrr > 0 THEN curr_mrr - prev_mrr ELSE 0 END) AS expansion_mrr,
  SUM(CASE WHEN curr_mrr < prev_mrr AND curr_mrr > 0 THEN prev_mrr - curr_mrr ELSE 0 END) AS contraction_mrr,
  SUM(CASE WHEN curr_mrr = 0 AND prev_mrr > 0 THEN prev_mrr ELSE 0 END) AS churned_mrr
FROM monthly_customer_mrr
GROUP BY 1;`,
        tableHeaders: ['cohort_month', 'new_mrr', 'expansion_mrr', 'contraction_mrr', 'churned_mrr'],
        tableRows: [
          ['2026-09', '$142,500', '$38,200', '$12,400', '$18,900'],
          ['2026-10', '$168,000', '$44,100', '$14,000', '$16,200'],
          ['2026-11', '$189,400', '$52,800', '$11,900', '$14,500']
        ],
        tip: 'Net New MRR = New + Expansion - Contraction - Churn. Pure conditional aggregation handles dense temporal cohorts.'
      },
      {
        id: 'scenario_leetcode_185',
        title: 'LeetCode #185 (Dense Rank Salaries)',
        filename: 'leetcode_185_department_salaries.sql',
        latency: '0.012ms',
        rowsCount: '6 rows returned',
        codeHtml: `<span class="landing-cm">-- LeetCode #185: Top 3 Department Earners using Dense Ranking</span>
<span class="landing-kw">WITH</span> ranked_payroll <span class="landing-kw">AS</span> (
  <span class="landing-kw">SELECT</span> 
    emp_id, full_name, department_id, salary,
    <span class="landing-fn">DENSE_RANK</span>() <span class="landing-kw">OVER</span> (
      <span class="landing-kw">PARTITION BY</span> department_id 
      <span class="landing-kw">ORDER BY</span> salary <span class="landing-kw">DESC</span>
    ) <span class="landing-kw">AS</span> rank_pos
  <span class="landing-kw">FROM</span> enterprise_employees
)
<span class="landing-kw">SELECT</span> department_id, full_name, salary, rank_pos
<span class="landing-kw">FROM</span> ranked_payroll
<span class="landing-kw">WHERE</span> rank_pos &lt;= <span class="landing-num">3</span>;`,
        sql: `WITH ranked_payroll AS (
  SELECT emp_id, full_name, department_id, salary,
    DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rank_pos
  FROM enterprise_employees
)
SELECT department_id, full_name, salary, rank_pos
FROM ranked_payroll
WHERE rank_pos <= 3;`,
        tableHeaders: ['department_id', 'full_name', 'salary', 'rank_pos'],
        tableRows: [
          ['Eng', 'Elena Rostova', '$185,000', '1'],
          ['Eng', 'David Kim', '$172,000', '2'],
          ['Eng', 'Marcus Vance', '$168,000', '3'],
          ['Product', 'Sarah Jenkins', '$195,000', '1'],
          ['Product', 'Alex Chen', '$180,000', '2']
        ],
        tip: 'DENSE_RANK() prevents rank holes when salaries tie, ensuring the top 3 unique compensation tiers are always retrieved.'
      }
    ],
    finance: [
      {
        id: 'scenario_jpmorgan_ledger',
        title: 'JPMorgan: General Ledger Invariant',
        filename: 'jpmorgan_gl_invariants.sql',
        latency: '0.011ms',
        rowsCount: '3 legal entities audited',
        codeHtml: `<span class="landing-cm">-- JPMorgan: Verify double-entry balance invariant (Debits = Credits)</span>
<span class="landing-kw">SELECT</span> 
  legal_entity, account_code,
  <span class="landing-fn">SUM</span>(<span class="landing-kw">CASE WHEN</span> entry_type = <span class="landing-str">'DEBIT'</span> <span class="landing-kw">THEN</span> amount_usd <span class="landing-kw">ELSE</span> <span class="landing-num">0</span> <span class="landing-kw">END</span>) <span class="landing-kw">AS</span> total_debits,
  <span class="landing-fn">SUM</span>(<span class="landing-kw">CASE WHEN</span> entry_type = <span class="landing-str">'CREDIT'</span> <span class="landing-kw">THEN</span> amount_usd <span class="landing-kw">ELSE</span> <span class="landing-num">0</span> <span class="landing-kw">END</span>) <span class="landing-kw">AS</span> total_credits,
  <span class="landing-fn">ROUND</span>(<span class="landing-fn">SUM</span>(<span class="landing-kw">CASE WHEN</span> entry_type = <span class="landing-str">'DEBIT'</span> <span class="landing-kw">THEN</span> amount_usd <span class="landing-kw">ELSE</span> -amount_usd <span class="landing-kw">END</span>), <span class="landing-num">2</span>) <span class="landing-kw">AS</span> net_variance
<span class="landing-kw">FROM</span> general_ledger_entries
<span class="landing-kw">GROUP BY</span> <span class="landing-num">1</span>, <span class="landing-num">2</span>;`,
        sql: `SELECT legal_entity, account_code,
  SUM(CASE WHEN entry_type = 'DEBIT' THEN amount_usd ELSE 0 END) AS total_debits,
  SUM(CASE WHEN entry_type = 'CREDIT' THEN amount_usd ELSE 0 END) AS total_credits,
  ROUND(SUM(CASE WHEN entry_type = 'DEBIT' THEN amount_usd ELSE -amount_usd END), 2) AS net_variance
FROM general_ledger_entries
GROUP BY 1, 2;`,
        tableHeaders: ['legal_entity', 'account_code', 'total_debits', 'total_credits', 'net_variance'],
        tableRows: [
          ['JPMC_US_RETAIL', '1010-CASH', '$2,140,000.00', '$2,140,000.00', '$0.00 (BALANCED)'],
          ['JPMC_UK_IB', '2040-NOSTRO', '$1,420,200.00', '$1,420,200.00', '$0.00 (BALANCED)'],
          ['JPMC_EU_SE', '3010-INTERBANK', '$1,290,000.00', '$1,290,000.00', '$0.00 (BALANCED)']
        ],
        tip: 'OCC & Fed Regulation D satisfied! Zero net variance confirms all concurrent multi-currency book transfers balance exactly.'
      },
      {
        id: 'scenario_orderbook_depth',
        title: 'Quant LOB: Cumulative Market Depth',
        filename: 'limit_order_book_depth_window.sql',
        latency: '0.015ms',
        rowsCount: '6 depth price levels',
        codeHtml: `<span class="landing-cm">-- Wall St Microstructure: Compute cumulative liquidity on limit order book</span>
<span class="landing-kw">SELECT</span> 
  symbol, side, price, shares,
  <span class="landing-fn">SUM</span>(shares) <span class="landing-kw">OVER</span> (
    <span class="landing-kw">PARTITION BY</span> symbol, side 
    <span class="landing-kw">ORDER BY</span> <span class="landing-kw">CASE WHEN</span> side = <span class="landing-str">'BID'</span> <span class="landing-kw">THEN</span> -price <span class="landing-kw">ELSE</span> price <span class="landing-kw">END</span>
    <span class="landing-kw">ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</span>
  ) <span class="landing-kw">AS</span> cum_depth_shares,
  <span class="landing-fn">ROUND</span>(<span class="landing-fn">SUM</span>(price * shares) <span class="landing-kw">OVER</span> (
    <span class="landing-kw">PARTITION BY</span> symbol, side 
    <span class="landing-kw">ORDER BY</span> <span class="landing-kw">CASE WHEN</span> side = <span class="landing-str">'BID'</span> <span class="landing-kw">THEN</span> -price <span class="landing-kw">ELSE</span> price <span class="landing-kw">END</span>
    <span class="landing-kw">ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</span>
  ) / <span class="landing-fn">SUM</span>(shares) <span class="landing-kw">OVER</span> (
    <span class="landing-kw">PARTITION BY</span> symbol, side 
    <span class="landing-kw">ORDER BY</span> <span class="landing-kw">CASE WHEN</span> side = <span class="landing-str">'BID'</span> <span class="landing-kw">THEN</span> -price <span class="landing-kw">ELSE</span> price <span class="landing-kw">END</span>
    <span class="landing-kw">ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</span>
  ), <span class="landing-num">3</span>) <span class="landing-kw">AS</span> vwap_execution_price
<span class="landing-kw">FROM</span> market_limit_orders
<span class="landing-kw">WHERE</span> symbol = <span class="landing-str">'NVDA'</span>;`,
        sql: `SELECT symbol, side, price, shares,
  SUM(shares) OVER (
    PARTITION BY symbol, side 
    ORDER BY CASE WHEN side = 'BID' THEN -price ELSE price END
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS cum_depth_shares
FROM market_limit_orders
WHERE symbol = 'NVDA';`,
        tableHeaders: ['symbol', 'side', 'price', 'shares', 'cum_depth_shares', 'vwap_execution_price'],
        tableRows: [
          ['NVDA', 'ASK', '$138.45', '800', '800', '$138.450'],
          ['NVDA', 'ASK', '$138.50', '1,200', '2,000', '$138.480'],
          ['NVDA', 'ASK', '$138.55', '2,500', '4,500', '$138.519'],
          ['NVDA', 'BID', '$138.40', '1,100', '1,100', '$138.400'],
          ['NVDA', 'BID', '$138.35', '1,800', '2,900', '$138.369']
        ],
        tip: 'VWAP Execution Windowing! Computing running volume-weighted price lets algorithmic desks simulate market impact before firing.'
      },
      {
        id: 'scenario_var_stress',
        title: 'Portfolio: 95% Value-at-Risk (VaR)',
        filename: 'portfolio_var_percentile.sql',
        latency: '0.019ms',
        rowsCount: '1 portfolio metric',
        codeHtml: `<span class="landing-cm">-- Citadel / Bridgewater Risk: Historical 95% Value-at-Risk (VaR)</span>
<span class="landing-kw">WITH</span> daily_returns <span class="landing-kw">AS</span> (
  <span class="landing-kw">SELECT</span> trade_date,
    (portfolio_nav - <span class="landing-fn">LAG</span>(portfolio_nav) <span class="landing-kw">OVER</span> (<span class="landing-kw">ORDER BY</span> trade_date)) / <span class="landing-fn">LAG</span>(portfolio_nav) <span class="landing-kw">OVER</span> (<span class="landing-kw">ORDER BY</span> trade_date) <span class="landing-kw">AS</span> daily_pnl_pct
  <span class="landing-kw">FROM</span> portfolio_daily_nav
)
<span class="landing-kw">SELECT</span>
  <span class="landing-fn">ROUND</span>(<span class="landing-fn">PERCENTILE_CONT</span>(<span class="landing-num">0.05</span>) <span class="landing-kw">WITHIN GROUP</span> (<span class="landing-kw">ORDER BY</span> daily_pnl_pct) * <span class="landing-num">100</span>, <span class="landing-num">2</span>) <span class="landing-kw">AS</span> var_95_pct,
  <span class="landing-fn">ROUND</span>(<span class="landing-fn">MIN</span>(daily_pnl_pct) * <span class="landing-num">100</span>, <span class="landing-num">2</span>) <span class="landing-kw">AS</span> max_historical_drawdown
<span class="landing-kw">FROM</span> daily_returns;`,
        sql: `WITH daily_returns AS (
  SELECT trade_date,
    (portfolio_nav - LAG(portfolio_nav) OVER (ORDER BY trade_date)) / LAG(portfolio_nav) OVER (ORDER BY trade_date) AS daily_pnl_pct
  FROM portfolio_daily_nav
)
SELECT ROUND(MIN(daily_pnl_pct) * 100, 2) AS max_historical_drawdown FROM daily_returns;`,
        tableHeaders: ['metric', 'confidence', 'loss_threshold_pct', 'capital_at_risk_100m'],
        tableRows: [
          ['1-Day Parametric VaR', '95.0%', '-2.14%', '$2,140,000'],
          ['1-Day Historical VaR', '99.0%', '-3.85%', '$3,850,000'],
          ['Max Tail Loss (COVID)', 'Worst Day', '-7.42%', '$7,420,000']
        ],
        tip: 'Basel III compliant! 95% 1-day VaR indicates that 95 out of 100 trading sessions will experience portfolio losses no worse than 2.14%.'
      }
    ]
  };

  // --- 2. COHORT HEATMAP DATA ---
  const COHORT_DATA = [
    { cohort: '2026-01', size: 1200, decay: [100, 84, 73, 67, 63, 60, 58, 56, 55, 54, 53, 52] },
    { cohort: '2026-02', size: 1350, decay: [100, 82, 71, 65, 61, 58, 56, 54, 53, 52, 51] },
    { cohort: '2026-03', size: 1500, decay: [100, 86, 75, 69, 65, 62, 60, 58, 57, 56] },
    { cohort: '2026-04', size: 1620, decay: [100, 85, 74, 68, 64, 61, 59, 57, 56] },
    { cohort: '2026-05', size: 1780, decay: [100, 83, 72, 66, 62, 59, 57, 55] },
    { cohort: '2026-06', size: 1950, decay: [100, 87, 77, 71, 67, 64, 62] },
    { cohort: '2026-07', size: 2100, decay: [100, 84, 73, 67, 63, 60] },
    { cohort: '2026-08', size: 2280, decay: [100, 86, 76, 70, 66] }
  ];

  // --- 3. LIMIT ORDER BOOK DATA ---
  const ORDER_BOOK = {
    asks: [
      { price: 138.65, shares: 3200, depthPct: 95 },
      { price: 138.60, shares: 2800, depthPct: 80 },
      { price: 138.55, shares: 2500, depthPct: 65 },
      { price: 138.50, shares: 1200, depthPct: 35 },
      { price: 138.45, shares: 800,  depthPct: 18 }
    ],
    bids: [
      { price: 138.40, shares: 1100, depthPct: 22 },
      { price: 138.35, shares: 1800, depthPct: 45 },
      { price: 138.30, shares: 2400, depthPct: 68 },
      { price: 138.25, shares: 3100, depthPct: 85 },
      { price: 138.20, shares: 4200, depthPct: 100 }
    ]
  };

  // --- 4. DEFENSIVE SQL TRAPS DATA ---
  const DEFENSIVE_TRAPS = [
    {
      id: 'trap_three_valued_null',
      name: 'Three-Valued Logic NULL Trap',
      category: 'Correctness / Defensive SQL',
      desc: 'In SQL, NULL is neither true nor false — comparisons evaluate to UNKNOWN and are silently dropped by WHERE clauses.',
      wrongSql: `-- FAILS SILENTLY: Misses all employees with NULL bonus!
SELECT emp_id, salary, bonus
FROM employees
WHERE bonus > 0 OR bonus <= 0;`,
      fixedSql: `-- CORRECT: Explicit IS NULL defense
SELECT emp_id, salary, bonus
FROM employees
WHERE bonus > 0 OR bonus <= 0 OR bonus IS NULL;`,
      impact: 'Silently excludes 15-20% of customer/compensation rows from audits and reporting pipelines.'
    },
    {
      id: 'trap_nonsargable_fn',
      name: 'Non-Sargable Function Index Killer',
      category: 'Performance / Storage Engine',
      desc: 'Wrapping indexed columns in functions (e.g. YEAR(), DATE(), LOWER()) forces a full table scan and destroys B+Tree index lookups.',
      wrongSql: `-- RUINS PERFORMANCE: Full Table Scan on 20M rows
SELECT order_id, amount
FROM orders
WHERE YEAR(created_at) = 2026;`,
      fixedSql: `-- SARGABLE B+TREE RANGE SCAN: Sub-millisecond index seek
SELECT order_id, amount
FROM orders
WHERE created_at >= '2026-01-01' AND created_at < '2027-01-01';`,
      impact: 'Transforms a 0.05ms index range seek into an expensive 14-second disk scan.'
    },
    {
      id: 'trap_cartesian_join',
      name: 'Cartesian Product Multi-Row Fanout',
      category: 'Financial Accuracy / Integrity',
      desc: 'Joining two 1-to-many child tables against a parent multiplies rows and artificially inflates financial SUM() balances.',
      wrongSql: `-- SILENTLY MULTIPLIES BALANCES: Cartesian inflation!
SELECT u.user_id, SUM(p.amount) AS total_payments, SUM(c.credits) AS total_credits
FROM users u
LEFT JOIN payments p ON u.user_id = p.user_id
LEFT JOIN credits c ON u.user_id = c.user_id
GROUP BY 1;`,
      fixedSql: `-- CORRECT: Aggregate in subqueries or CTEs before joining
WITH pay AS (SELECT user_id, SUM(amount) AS tot_pay FROM payments GROUP BY 1),
     cred AS (SELECT user_id, SUM(credits) AS tot_cred FROM credits GROUP BY 1)
SELECT u.user_id, COALESCE(pay.tot_pay, 0), COALESCE(cred.tot_cred, 0)
FROM users u
LEFT JOIN pay ON u.user_id = pay.user_id
LEFT JOIN cred ON u.user_id = cred.user_id;`,
      impact: 'Creates phantom revenue figures and fails external financial audits.'
    }
  ];

  /**
   * Main Render Function
   */
  function renderLandingPage(containerId = 'viewLandingPage') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const scenarios = SCENARIOS[State.activeTrack];
    const currentScenario = scenarios.find(s => s.id === State.activeScenarioId) || scenarios[0];
    State.activeScenarioId = currentScenario.id;

    const isFinance = State.activeTrack === 'finance';

    container.classList.add('view-panel', 'active', 'landing-container');
    container.classList.toggle('track-finance-active', isFinance);
    container.innerHTML = `
      <!-- Ambient Lighting -->
      <div class="landing-ambient-glow"></div>

      <!-- 1. HERO SECTION -->
      <section class="landing-hero">
        <!-- Status Pill -->
        <div class="landing-badge-pill">
          <span class="landing-pulse-dot"></span>
          <span>SQL FOUNDRY // DUAL-TRACK ARCHITECTURE</span>
        </div>

        <!-- Segmented Control Dual-Track Switcher -->
        <div class="landing-track-switcher-wrap">
          <button class="track-switch-btn btn-track-analytics ${!isFinance ? 'active' : ''}" onclick="window.LANDING_PAGE_ENGINE.setTrack('analytics')">
            <span>📊</span>
            <span>Data Analytics & Growth</span>
            <span class="track-btn-badge">Product · SaaS</span>
          </button>
          <button class="track-switch-btn btn-track-finance ${isFinance ? 'active' : ''}" onclick="window.LANDING_PAGE_ENGINE.setTrack('finance')">
            <span>📈</span>
            <span>Quantitative Finance & Risk</span>
            <span class="track-btn-badge">Wall St · Ledgers</span>
          </button>
        </div>

        <!-- Headline (Shift Nudge Hierarchy) -->
        <h1 class="landing-hero-title">
          Master SQL for <span class="landing-hero-highlight">${isFinance ? 'Wall Street Ledgers, Order Books & Risk' : 'Advanced Data Analytics, SaaS Cohorts & Funnels'}</span>.
        </h1>

        <!-- Subtitle -->
        <p class="landing-hero-subtitle">
          ${isFinance 
            ? 'Execute double-entry general ledger audits, high-frequency limit order book depth calculations, and 95% Value-at-Risk percentiles against real Wall Street datasets in client-side SQLite WASM.' 
            : 'Master cohort retention decay, 5-way MRR movement waterfalls, user funnel step-lag, and 323 LeetCode interviews with 60fps relational algebra particle physics.'}
        </p>

        <!-- CTAs -->
        <div class="landing-cta-strip">
          <button class="landing-cta-primary" onclick="window.LANDING_PAGE_ENGINE.launchActiveScenarioInStudio()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <span>Run Query in Studio Workbench (⌘Enter)</span>
          </button>
          <button class="landing-cta-secondary" onclick="if(window.selectNavView) window.selectNavView('viewRelationalCollider', 'Relational Collider', 'navGroupExplore'); try{window.location.hash='#collider';}catch(e){}">
            <span>⚡ 60fps Particle Collider</span>
          </button>
          <button class="landing-cta-secondary" onclick="if(window.selectNavView) window.selectNavView('viewHardwareStrata', '3D Hardware Strata', 'navGroupExplore'); try{window.location.hash='#strata';}catch(e){}">
            <span>⬡ 3D Hardware Strata</span>
          </button>
        </div>

        <!-- Interactive Hero Sandbox Card -->
        <div class="landing-hero-widget-card">
          <!-- Window Header Bar -->
          <div class="landing-widget-window-bar">
            <div class="window-dots">
              <span class="window-dot dot-red"></span>
              <span class="window-dot dot-yellow"></span>
              <span class="window-dot dot-green"></span>
            </div>
            <div class="window-meta-strip">
              <span class="window-file-name font-mono">${escapeHtml(currentScenario.filename)}</span>
              <span class="window-badge-wasm font-mono">CLIENT-SIDE WASM</span>
            </div>
          </div>

          <!-- Scenario Tabs -->
          <div class="landing-widget-tabs">
            ${scenarios.map(s => `
              <button class="landing-scenario-tab ${s.id === State.activeScenarioId ? 'active' : ''}" onclick="window.LANDING_PAGE_ENGINE.selectScenario('${s.id}')">
                <span class="tab-indicator-dot"></span>
                <span>${escapeHtml(s.title)}</span>
              </button>
            `).join('')}
          </div>

          <!-- Sandbox Split Body -->
          <div class="landing-widget-body">
            <!-- Left Code Pane -->
            <div class="landing-code-pane">
              <pre class="landing-code-pre font-mono"><code>${currentScenario.codeHtml}</code></pre>
            </div>

            <!-- Right Result Pane -->
            <div class="landing-result-pane">
              <div class="landing-result-pane-header">
                <span class="landing-pane-title">LIVE TUPLE SINK</span>
                <span class="landing-rows-count">${escapeHtml(currentScenario.rowsCount)}</span>
              </div>

              <div class="landing-table-wrap">
                <table class="landing-data-table">
                  <thead>
                    <tr>${currentScenario.tableHeaders.map(th => `<th>${escapeHtml(th)}</th>`).join('')}</tr>
                  </thead>
                  <tbody>
                    ${currentScenario.tableRows.map(row => `
                      <tr>${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>

              <!-- Bottom Telemetry Bar -->
              <div class="landing-telemetry-bar">
                <div class="telemetry-group">
                  <span class="telemetry-pill">LATENCY: <span class="telemetry-val">${currentScenario.latency}</span></span>
                  <span class="telemetry-pill">ENGINE: <span class="telemetry-val" style="color:#38bdf8;">SQLite 3.45</span></span>
                </div>
                <button class="btn-sandbox-studio" onclick="window.LANDING_PAGE_ENGINE.launchActiveScenarioInStudio()">
                  <span>🚀 Open in Studio</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. INSTITUTIONAL METRICS & SOCIAL PROOF -->
      <section class="landing-metrics-strip">
        <div class="landing-metric-card">
          <span class="metric-card-val font-mono">10</span>
          <span class="metric-card-label">Industry Domains</span>
          <span class="metric-card-desc">Wall St, Big Tech, Payments &amp; Cloud Marketplaces</span>
        </div>
        <div class="landing-metric-card">
          <span class="metric-card-val font-mono">323</span>
          <span class="metric-card-label">LeetCode Solutions</span>
          <span class="metric-card-desc">Graded SQL challenges with interactive AST diagrams</span>
        </div>
        <div class="landing-metric-card">
          <span class="metric-card-val font-mono">0.01ms</span>
          <span class="metric-card-label">Client Latency</span>
          <span class="metric-card-desc">100% In-Browser SQLite WASM. Zero cloud dependencies.</span>
        </div>
        <div class="landing-metric-card">
          <span class="metric-card-val font-mono">100%</span>
          <span class="metric-card-label">Private &amp; Local</span>
          <span class="metric-card-desc">Zero telemetry tracking. Your code never leaves the browser.</span>
        </div>
      </section>

      <!-- Employer Marquee -->
      <div class="landing-employer-marquee font-mono">
        <span class="employer-pill">Amazon</span>
        <span class="employer-pill">Netflix</span>
        <span class="employer-pill">Uber</span>
        <span class="employer-pill">Stripe</span>
        <span class="employer-pill">JPMorgan</span>
        <span class="employer-pill">Citadel</span>
        <span class="employer-pill">Jane Street</span>
        <span class="employer-pill">Airbnb</span>
        <span class="employer-pill">Spotify</span>
      </div>

      <!-- 3. INTERACTIVE SPATIAL BENTO GRID SHOWCASE -->
      <section class="landing-bento-section">
        <div class="landing-section-header">
          <span class="landing-section-tag">SPATIAL COMPUTING &amp; PHYSICS</span>
          <h2 class="landing-section-title">The Four Interactive Relational Visualizers</h2>
          <p class="landing-section-subtitle">Experience relational algebra and hardware storage engines through 60fps particle dynamics, 3D exploded spatial computing, and live execution trees.</p>
        </div>

        <div class="landing-bento-grid">
          <!-- Cell 1: Particle Collider (7 cols) -->
          <div class="bento-card bento-card-collider">
            <div class="bento-card-header">
              <div>
                <h3 class="bento-card-title">Relational Particle Collider</h3>
                <p class="bento-card-desc">Watch physical query execution physics in real time: tuples emit from table heap blocks and collide with predicate lasers.</p>
              </div>
              <span class="bento-card-badge badge-collider font-mono">60FPS CANVAS</span>
            </div>
            <div class="bento-preview-wrap">
              <canvas id="bentoColliderCanvas"></canvas>
            </div>
            <div class="bento-card-footer">
              <span style="font-size: 12px; color: #64748b; font-family: monospace;">PREDICATE LASER GATE // VOLUMETRIC CYLINDERS</span>
              <button class="btn-bento-launch" onclick="if(window.selectNavView) window.selectNavView('viewRelationalCollider', 'Relational Collider', 'navGroupExplore'); try{window.location.hash='#collider';}catch(e){}">
                <span>Launch Collider Chamber ⚡</span>
              </button>
            </div>
          </div>

          <!-- Cell 2: 3D Hardware Strata (5 cols) -->
          <div class="bento-card bento-card-strata">
            <div class="bento-card-header">
              <div>
                <h3 class="bento-card-title">3D Hardware Storage Strata</h3>
                <p class="bento-card-desc">5-layer isometric database storage hierarchy from Client AST to NVMe page blocks.</p>
              </div>
              <span class="bento-card-badge badge-strata font-mono">EXPLODED 3D</span>
            </div>
            <div class="bento-preview-wrap" style="background: radial-gradient(circle, rgba(6,182,212,0.15) 0%, #040509 70%);">
              <div style="text-align: center;">
                <div style="font-size: 32px; margin-bottom: 8px;">⬡ ⬢ ⬡</div>
                <span class="font-mono" style="font-size: 11px; color: #22d3ee;">OPT // BUFFER POOL // WAL // NVMe</span>
              </div>
            </div>
            <div class="bento-card-footer">
              <span style="font-size: 12px; color: #64748b; font-family: monospace;">LATENCY SPECTRUM (0.5ns - 100μs)</span>
              <button class="btn-bento-launch" onclick="if(window.selectNavView) window.selectNavView('viewHardwareStrata', '3D Hardware Strata', 'navGroupExplore'); try{window.location.hash='#strata';}catch(e){}">
                <span>Explode 3D Strata ⬡</span>
              </button>
            </div>
          </div>

          <!-- Cell 3: Visual Query Profiler (5 cols) -->
          <div class="bento-card bento-card-profiler">
            <div class="bento-card-header">
              <div>
                <h3 class="bento-card-title">Visual Query Profiler</h3>
                <p class="bento-card-desc">Interactive execution trees, operator cost nodes, row estimates, and What-If index simulator.</p>
              </div>
              <span class="bento-card-badge badge-profiler font-mono">EXPLAIN TREE</span>
            </div>
            <div class="bento-preview-wrap" style="background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, #040509 70%);">
              <div style="text-align: center;">
                <div style="font-size: 28px; margin-bottom: 8px;">🌳 ⚡ 🔍</div>
                <span class="font-mono" style="font-size: 11px; color: #a5b4fc;">INDEX SCAN → HASH JOIN → AGGREGATE</span>
              </div>
            </div>
            <div class="bento-card-footer">
              <span style="font-size: 12px; color: #64748b; font-family: monospace;">LATENCY WATERFALL &amp; BOTTLENECKS</span>
              <button class="btn-bento-launch" onclick="if(window.selectNavView) window.selectNavView('viewQueryProfiler', 'Visual Query Profiler', 'navGroupExplore'); try{window.location.hash='#profiler';}catch(e){}">
                <span>Open Tree Profiler 🌳</span>
              </button>
            </div>
          </div>

          <!-- Cell 4: 3D Topic Motion Deck (7 cols) -->
          <div class="bento-card bento-card-deck">
            <div class="bento-card-header">
              <div>
                <h3 class="bento-card-title">Topic Motion Deck</h3>
                <p class="bento-card-desc">3D gyroscopic tilt cards with real-time physics micro-simulations and dual-face trap dossiers.</p>
              </div>
              <span class="bento-card-badge badge-deck font-mono">3D CARDS</span>
            </div>
            <div class="bento-preview-wrap" style="background: radial-gradient(circle, rgba(244,63,94,0.12) 0%, #040509 70%);">
              <div style="text-align: center;">
                <div style="font-size: 28px; margin-bottom: 8px;">🃏 🔄 🛡️</div>
                <span class="font-mono" style="font-size: 11px; color: #fb7185;">3D GYROSCOPIC TILT // DUAL-FACE TRAPS</span>
              </div>
            </div>
            <div class="bento-card-footer">
              <span style="font-size: 12px; color: #64748b; font-family: monospace;">60FPS PHYSICAL STORAGE &amp; JOIN MOTIONS</span>
              <button class="btn-bento-launch" onclick="if(window.selectNavView) window.selectNavView('viewMotionDeck', 'Topic Motion Deck', 'navGroupExplore'); try{window.location.hash='#motion-deck';}catch(e){}">
                <span>Launch Motion Deck 🃏</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. TRACK 01 DEEP-DIVE: MODERN DATA ANALYTICS & COHORTS -->
      <section class="landing-track-section" id="sectionTrackDataAnalytics">
        <div class="landing-section-header">
          <span class="landing-section-tag" style="color: #34d399; border-color: rgba(16,185,129,0.3); background: rgba(16,185,129,0.1);">TRACK 01 // MODERN DATA ANALYTICS</span>
          <h2 class="landing-section-title">Product Analytics, Cohort Retention &amp; SaaS Metrics</h2>
          <p class="landing-section-subtitle">Real-world customer lifecycle analysis, triangle cohort decay heatmaps, and 5-way MRR movement waterfalls.</p>
        </div>

        <!-- Interactive Cohort Retention Heatmap -->
        <div class="cohort-cockpit-preview-card">
          <div class="cockpit-preview-top">
            <div>
              <h3 style="font-size: 18px; font-weight: 700; color: #f8fafc; margin: 0 0 4px 0;">Interactive Cohort Retention Heatmap (Month 0 to Month 11 Decay)</h3>
              <span style="font-size: 13px; color: #94a3b8;">Click any cell to inspect cohort size and retained user count.</span>
            </div>
            <div class="cockpit-mode-toggle">
              <button class="btn-cockpit-toggle ${State.cohortDisplayMode === 'percent' ? 'active' : ''}" onclick="window.LANDING_PAGE_ENGINE.setCohortMode('percent')">% Percentage</button>
              <button class="btn-cockpit-toggle ${State.cohortDisplayMode === 'absolute' ? 'active' : ''}" onclick="window.LANDING_PAGE_ENGINE.setCohortMode('absolute')"># Raw Users</button>
            </div>
          </div>

          <div class="cohort-heatmap-table-wrap">
            <table class="cohort-heatmap-table">
              <thead>
                <tr>
                  <th style="text-align: left;">Cohort</th>
                  <th>Size</th>
                  <th>M0</th><th>M1</th><th>M2</th><th>M3</th><th>M4</th><th>M5</th><th>M6</th><th>M7</th><th>M8</th><th>M9</th><th>M10</th><th>M11</th>
                </tr>
              </thead>
              <tbody>
                ${COHORT_DATA.map(c => `
                  <tr>
                    <td style="text-align: left; font-weight: 700; color: #38bdf8;">${c.cohort}</td>
                    <td style="color: #94a3b8;">${c.size.toLocaleString()}</td>
                    ${Array.from({ length: 12 }).map((_, mIdx) => {
                      const val = c.decay[mIdx];
                      if (val === undefined) return `<td style="background: transparent; border: none;"></td>`;
                      const displayVal = State.cohortDisplayMode === 'percent' 
                        ? `${val}%` 
                        : Math.round((c.size * val) / 100).toLocaleString();
                      const alpha = Math.max(0.12, (val / 100) * 0.7);
                      return `
                        <td style="background: rgba(16, 185, 129, ${alpha});" onclick="window.LANDING_PAGE_ENGINE.inspectCohortCell('${c.cohort}', ${mIdx}, ${val}, ${c.size})">
                          ${displayVal}
                        </td>
                      `;
                    }).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- 3-Col Features -->
        <div class="track-features-grid">
          <div class="track-feature-card">
            <div class="feature-card-icon">🌪️</div>
            <h4 class="feature-card-title">Funnel Conversion Step Lag</h4>
            <p class="feature-card-desc">Calculate step-to-step drop-offs across signup, onboarding, checkout, and activation using <code>LAG()</code> and <code>LEAD()</code> windowing.</p>
          </div>
          <div class="track-feature-card">
            <div class="feature-card-icon">📈</div>
            <h4 class="feature-card-title">Net Revenue Retention (NRR %)</h4>
            <p class="feature-card-desc">Dollar-weighted retention tracking upsells, expansion, contraction, and gross revenue retention over dense subscription periods.</p>
          </div>
          <div class="track-feature-card">
            <div class="feature-card-icon">🧪</div>
            <h4 class="feature-card-title">A/B Testing &amp; SRM Telemetry</h4>
            <p class="feature-card-desc">Chi-square test of sample ratio mismatch (SRM) and difference-in-proportions p-values to validate experimentation integrity.</p>
          </div>
        </div>
      </section>

      <!-- 5. TRACK 02 DEEP-DIVE: QUANTITATIVE FINANCE & ORDER BOOK -->
      <section class="landing-track-section" id="sectionTrackFinance">
        <div class="landing-section-header">
          <span class="landing-section-tag" style="color: #fbbf24; border-color: rgba(245,158,11,0.3); background: rgba(245,158,11,0.1);">TRACK 02 // QUANTITATIVE FINANCE &amp; RISK</span>
          <h2 class="landing-section-title">Limit Order Books, Ledger Invariants &amp; Risk</h2>
          <p class="landing-section-subtitle">High-frequency microstructure depth, double-entry general ledger audits, and Basel III Value-at-Risk modeling.</p>
        </div>

        <!-- Interactive Limit Order Book Depth Ladder -->
        <div class="orderbook-preview-card">
          <div class="orderbook-grid">
            <!-- Left: Ladder -->
            <div class="orderbook-ladder">
              <div style="display: flex; justify-content: space-between; font-weight: 700; color: #94a3b8; margin-bottom: 8px; padding: 0 8px;">
                <span>SIDE // PRICE</span>
                <span>SHARES</span>
              </div>

              <!-- Asks -->
              ${ORDER_BOOK.asks.map(a => `
                <div class="ob-row ob-ask">
                  <div class="ob-bar" style="width: ${a.depthPct}%;"></div>
                  <span>ASK $${a.price.toFixed(2)}</span>
                  <span>${a.shares.toLocaleString()}</span>
                </div>
              `).join('')}

              <div class="ob-spread-bar font-mono">
                SPREAD: $0.05 (3.6 bps) · MID: $138.425
              </div>

              <!-- Bids -->
              ${ORDER_BOOK.bids.map(b => `
                <div class="ob-row ob-bid">
                  <div class="ob-bar" style="width: ${b.depthPct}%;"></div>
                  <span>BID $${b.price.toFixed(2)}</span>
                  <span>${b.shares.toLocaleString()}</span>
                </div>
              `).join('')}
            </div>

            <!-- Right: Interactive Order Simulator -->
            <div class="orderbook-calculator">
              <div class="calc-box">
                <h4 style="font-size: 15px; font-weight: 700; color: #fbbf24; margin: 0 0 6px 0;">Institutional Block Order Simulator</h4>
                <p style="font-size: 12px; color: #94a3b8; margin: 0;">Simulate market impact and VWAP slippage on sweeping the order book.</p>
                
                <div class="calc-slider-row">
                  <div style="display: flex; justify-content: space-between; font-size: 12px; font-family: monospace;">
                    <span>Order Size:</span>
                    <span style="color: #fbbf24; font-weight: 700;" id="txtOrderSizeVal">${State.orderSize.toLocaleString()} Shares</span>
                  </div>
                  <input type="range" min="500" max="6000" step="250" value="${State.orderSize}" 
                         style="accent-color: #f59e0b; width: 100%; cursor: pointer;"
                         oninput="window.LANDING_PAGE_ENGINE.updateOrderSize(this.value)">
                </div>

                <div class="calc-results-grid">
                  <div>
                    <span style="font-size: 10px; color: #64748b; font-family: monospace; text-transform: uppercase;">Estimated VWAP</span>
                    <div class="calc-stat-val font-mono" id="txtCalcVwap">$138.472</div>
                  </div>
                  <div>
                    <span style="font-size: 10px; color: #64748b; font-family: monospace; text-transform: uppercase;">Market Slippage</span>
                    <div class="calc-stat-val font-mono" id="txtCalcSlippage" style="color: #ef4444;">+1.6 bps</div>
                  </div>
                </div>
              </div>

              <div style="margin-top: 14px;">
                <button class="landing-cta-secondary" style="width: 100%; justify-content: center;" onclick="if(window.selectNavView) window.selectNavView('viewJPMorganStory', 'Finance', null); try{window.location.hash='#finance';}catch(e){}">
                  <span>Explore JPMorgan 30-Day Treasury Simulation →</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 3-Col Finance Features -->
        <div class="track-features-grid">
          <div class="track-feature-card">
            <div class="feature-card-icon">⚖️</div>
            <h4 class="feature-card-title">Zero-Sum Ledger Integrity</h4>
            <p class="feature-card-desc">Verify double-entry invariants ($\sum \text{Debit} - \sum \text{Credit} = 0$) across multi-entity interbank transfers and Nostro/Vostro accounts.</p>
          </div>
          <div class="track-feature-card">
            <div class="feature-card-icon">🕸️</div>
            <h4 class="feature-card-title">AML Recursive Graph Layering</h4>
            <p class="feature-card-desc">Detect circular money-laundering routes and smurfing rings across shell accounts using <code>WITH RECURSIVE</code> cycle detection.</p>
          </div>
          <div class="track-feature-card">
            <div class="feature-card-icon">📉</div>
            <h4 class="feature-card-title">Value-at-Risk (VaR) &amp; Drawdowns</h4>
            <p class="feature-card-desc">Compute 95% and 99% portfolio VaR, asset correlation matrices, and historical stress tests (Lehman 2008, COVID 2020).</p>
          </div>
        </div>
      </section>

      <!-- 6. DEFENSIVE SQL TRAPS ACCORDION -->
      <section class="landing-traps-section">
        <div class="landing-section-header">
          <span class="landing-section-tag" style="color: #fb7185; border-color: rgba(244,63,94,0.3); background: rgba(244,63,94,0.1);">DEFENSIVE SQL ENGINEERING</span>
          <h2 class="landing-section-title">Caught by the Engine: Silent SQL Traps</h2>
          <p class="landing-section-subtitle">The subtle traps that pass code review, produce incorrect data, and fail production audits.</p>
        </div>

        <div class="traps-tabs-bar">
          ${DEFENSIVE_TRAPS.map(t => `
            <button class="trap-tab-btn ${t.id === State.activeTrapId ? 'active' : ''}" onclick="window.LANDING_PAGE_ENGINE.selectTrap('${t.id}')">
              <span>${escapeHtml(t.name)}</span>
            </button>
          `).join('')}
        </div>

        <div class="trap-display-card">
          ${(() => {
            const trap = DEFENSIVE_TRAPS.find(t => t.id === State.activeTrapId) || DEFENSIVE_TRAPS[0];
            return `
              <h3 style="font-size: 18px; font-weight: 700; color: #f8fafc; margin: 0 0 6px 0;">${escapeHtml(trap.name)}</h3>
              <p style="font-size: 13px; color: #94a3b8; line-height: 1.5; margin: 0 0 16px 0;">${escapeHtml(trap.desc)}</p>
              
              <div class="trap-diff-grid">
                <div class="trap-code-box box-wrong">
                  <div style="font-size: 10px; font-weight: 700; color: #ef4444; margin-bottom: 8px;">❌ WRONG (SILENT FAILURE)</div>
                  <pre style="margin: 0; color: #fca5a5; line-height: 1.5;"><code>${escapeHtml(trap.wrongSql)}</code></pre>
                </div>
                <div class="trap-code-box box-fixed">
                  <div style="font-size: 10px; font-weight: 700; color: #10b981; margin-bottom: 8px;">✓ DEFENSIVE FIX</div>
                  <pre style="margin: 0; color: #86efac; line-height: 1.5;"><code>${escapeHtml(trap.fixedSql)}</code></pre>
                </div>
              </div>

              <div style="margin-top: 14px; font-size: 12px; color: #fb7185; font-family: monospace;">
                IMPACT: ${escapeHtml(trap.impact)}
              </div>
            `;
          })()}
        </div>
      </section>

      <!-- 7. FAST-ACCESS ACTION MATRIX -->
      <section style="margin-bottom: 60px;">
        <div class="landing-section-header">
          <span class="landing-section-tag">FAST ACCESS</span>
          <h2 class="landing-section-title">Jump Directly into Any Interactive Workspace</h2>
        </div>

        <div class="landing-launch-grid">
          <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewStudio', 'Section Studio', null); try{window.location.hash='#studio';}catch(e){}" style="border-color: rgba(99,102,241,0.4);">
            <div class="landing-launch-meta">
              <span class="landing-launch-name" style="color: #818cf8;">Query Studio</span>
              <span class="landing-launch-tag" style="background: rgba(99,102,241,0.15); color: #a5b4fc;">IDE</span>
            </div>
            <span class="landing-launch-desc">Monaco SQL editor, schema explorer, and client-side SQLite WASM execution engine.</span>
          </div>

          <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewRelationalCollider', 'Relational Collider', 'navGroupExplore'); try{window.location.hash='#collider';}catch(e){}" style="border-color: rgba(16,185,129,0.4);">
            <div class="landing-launch-meta">
              <span class="landing-launch-name" style="color: #34d399;">Particle Collider</span>
              <span class="landing-launch-tag" style="background: rgba(16,185,129,0.15); color: #34d399;">60FPS</span>
            </div>
            <span class="landing-launch-desc">60fps HTML5 Canvas physics chamber with predicate laser gates &amp; glass accumulators.</span>
          </div>

          <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewHardwareStrata', '3D Hardware Strata', 'navGroupExplore'); try{window.location.hash='#strata';}catch(e){}" style="border-color: rgba(6,182,212,0.4);">
            <div class="landing-launch-meta">
              <span class="landing-launch-name" style="color: #22d3ee;">3D Hardware Strata</span>
              <span class="landing-launch-tag" style="background: rgba(6,182,212,0.15); color: #22d3ee;">EXPLODED 3D</span>
            </div>
            <span class="landing-launch-desc">5-layer isometric storage engine hierarchy, LSN WAL conduits, and NVMe page blocks.</span>
          </div>

          <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewQueryProfiler', 'Visual Query Profiler', 'navGroupExplore'); try{window.location.hash='#profiler';}catch(e){}" style="border-color: rgba(245,158,11,0.4);">
            <div class="landing-launch-meta">
              <span class="landing-launch-name" style="color: #fbbf24;">Query Profiler</span>
              <span class="landing-launch-tag" style="background: rgba(245,158,11,0.15); color: #fbbf24;">EXPLAIN TREE</span>
            </div>
            <span class="landing-launch-desc">Execution tree cost nodes, scan bottlenecks, and What-If B+Tree simulator.</span>
          </div>
        </div>
      </section>
    `;

    // Initialize Bento Particle Collider Micro Canvas
    initBentoColliderCanvas();
  }

  /**
   * Set Track: 'analytics' | 'finance'
   */
  function setTrack(trackKey) {
    if (State.activeTrack === trackKey) return;
    State.activeTrack = trackKey;
    const scenarios = SCENARIOS[trackKey];
    State.activeScenarioId = scenarios[0].id;
    renderLandingPage('viewLandingPage');
    if (window.soundFX && window.soundFX.playPop) window.soundFX.playPop();
  }

  /**
   * Select Scenario in Hero Sandbox
   */
  function selectScenario(scenarioId) {
    if (State.activeScenarioId === scenarioId) return;
    State.activeScenarioId = scenarioId;
    renderLandingPage('viewLandingPage');
    if (window.soundFX && window.soundFX.playClick) window.soundFX.playClick();
  }

  /**
   * Launch Current Scenario in Studio Workbench
   */
  function launchActiveScenarioInStudio() {
    const scenarios = SCENARIOS[State.activeTrack];
    const scenario = scenarios.find(s => s.id === State.activeScenarioId) || scenarios[0];
    
    if (typeof window.selectNavView === 'function') {
      window.selectNavView('viewStudio', 'Section Studio', null);
    } else if (typeof window.switchMainView === 'function') {
      window.switchMainView('viewStudio');
    }

    setTimeout(() => {
      const sqlInput = document.getElementById('sqlInput') || document.getElementById('sqlQueryInput');
      if (sqlInput) {
        sqlInput.value = scenario.sql;
        if (typeof window.runQueryManual === 'function') {
          setTimeout(window.runQueryManual, 140);
        }
      }
      if (window.SQL_BUDDY) {
        window.SQL_BUDDY.say(`🚀 Loaded ${scenario.title} into Studio Workbench!`, 4000, 'celebrate');
      }
    }, 120);
  }

  /**
   * Toggle Cohort Mode: 'percent' | 'absolute'
   */
  function setCohortMode(mode) {
    State.cohortDisplayMode = mode;
    renderLandingPage('viewLandingPage');
  }

  /**
   * Inspect Cohort Cell
   */
  function inspectCohortCell(cohort, mIdx, pct, size) {
    const retained = Math.round((size * pct) / 100);
    if (window.SQL_BUDDY) {
      window.SQL_BUDDY.say(`📊 Cohort ${cohort} at Month ${mIdx}: ${pct}% retained (${retained.toLocaleString()} / ${size.toLocaleString()} users)`, 4500, 'happy');
    }
  }

  /**
   * Update Order Book Block Size
   */
  function updateOrderSize(val) {
    State.orderSize = parseInt(val, 10);
    const txtSize = document.getElementById('txtOrderSizeVal');
    const txtVwap = document.getElementById('txtCalcVwap');
    const txtSlip = document.getElementById('txtCalcSlippage');

    if (txtSize) txtSize.textContent = `${State.orderSize.toLocaleString()} Shares`;

    // Dynamic calculation: simulate sweep
    let remaining = State.orderSize;
    let totalCost = 0;
    const baseMid = 138.425;

    for (const ask of ORDER_BOOK.asks) {
      const fill = Math.min(remaining, ask.shares);
      totalCost += fill * ask.price;
      remaining -= fill;
      if (remaining <= 0) break;
    }

    const vwap = totalCost / State.orderSize;
    const slippageBps = ((vwap - baseMid) / baseMid) * 10000;

    if (txtVwap) txtVwap.textContent = `$${vwap.toFixed(3)}`;
    if (txtSlip) txtSlip.textContent = `+${slippageBps.toFixed(1)} bps`;
  }

  /**
   * Select Defensive Trap
   */
  function selectTrap(trapId) {
    State.activeTrapId = trapId;
    renderLandingPage('viewLandingPage');
  }

  /**
   * Embedded Micro Particle Collider for Bento Card
   */
  function initBentoColliderCanvas() {
    const canvas = document.getElementById('bentoColliderCanvas');
    if (!canvas) return;

    if (State.bentoAnimId) cancelAnimationFrame(State.bentoAnimId);

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = rect.width || 600;
    const h = 180;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Initial micro particles
    State.bentoParticles = [
      { x: 30, y: 90, vx: 2.8, color: '#38bdf8', label: '101 $320' },
      { x: 120, y: 90, vx: 2.8, color: '#38bdf8', label: '102 $85' },
      { x: 210, y: 90, vx: 2.8, color: '#ec4899', label: 'NULL_POISON' },
      { x: 300, y: 90, vx: 2.8, color: '#38bdf8', label: '103 $450' }
    ];

    const laserX = w * 0.52;

    function microLoop() {
      ctx.clearRect(0, 0, w, h);

      // Track line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 18;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(30, 90);
      ctx.lineTo(w - 30, 90);
      ctx.stroke();

      // Laser Gate
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(laserX, 20);
      ctx.lineTo(laserX, 160);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Particles
      State.bentoParticles.forEach(p => {
        p.x += p.vx;
        if (p.x >= laserX && p.vx > 0) {
          if (p.label.includes('85') || p.label.includes('POISON')) {
            // Deflect
            p.vx = 1.2;
            p.y += 1.8;
            p.color = '#ef4444';
          } else {
            p.color = '#10b981';
          }
        }

        if (p.x > w + 40 || p.y > h + 20) {
          p.x = 20;
          p.y = 90;
          p.vx = 2.8;
          p.color = p.label.includes('POISON') ? '#ec4899' : '#38bdf8';
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.roundRect(p.x - 24, p.y - 10, 48, 20, 10);
        ctx.fill();

        ctx.font = 'bold 9px monospace';
        ctx.fillStyle = '#0f172a';
        ctx.textAlign = 'center';
        ctx.fillText(p.label.split(' ')[0], p.x, p.y + 3);
      });

      State.bentoAnimId = requestAnimationFrame(microLoop);
    }

    State.bentoAnimId = requestAnimationFrame(microLoop);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Public API
  window.LANDING_PAGE_ENGINE = {
    renderLandingPage,
    setTrack,
    selectScenario,
    launchActiveScenarioInStudio,
    setCohortMode,
    inspectCohortCell,
    updateOrderSize,
    selectTrap,
    getState: () => State
  };

  // Backward compatibility
  window.LandingPageEngine = window.LANDING_PAGE_ENGINE;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => renderLandingPage());
  } else {
    setTimeout(() => renderLandingPage(), 100);
  }

})(window);
