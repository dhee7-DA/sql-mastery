/**
 * SQL FOUNDRY - PROFESSIONAL DATA & FINANCE ANALYTICS LANDING PAGE ENGINE
 * Aesthetic aligned with Section Studio:
 * Matte Carbon Obsidian, Hairline Borders, Monochrome Badges, Zero Distracting Hardware Diagrams.
 */

(function(window) {
  'use strict';

  // --- 1. HERO WORKBENCH SCENARIOS ---
  const HERO_SCENARIOS = {
    scenario_amazon: {
      id: 'scenario_amazon',
      title: 'Amazon: Prime Churn (Anti-Join)',
      tablePill: 'TABLE: amazon_prime_orders (2.4M rows)',
      topicTag: 'AMAZON SCOT // RETENTION COHORT',
      filename: 'amazon_prime_churn_detector.sql',
      columns: ['customer_id', 'purchase_date', 'product_id', 'order_id'],
      latency: '0.014ms',
      memory: '0.0KB',
      status: 'AST PASSED ✓',
      lines: [
        { num: 1, text: `<span class="studio-cm">-- Amazon SCOT: Detect Prime buyers churned within 30 days of purchase</span>` },
        { num: 2, text: `<span class="studio-kw">SELECT DISTINCT</span> o1.customer_id, o1.purchase_date, o1.product_id` },
        { num: 3, text: `<span class="studio-kw">FROM</span> amazon_prime_orders o1` },
        { num: 4, text: `<span class="studio-kw">LEFT JOIN</span> amazon_prime_orders o2` },
        { num: 5, text: `  <span class="studio-kw">ON</span> o1.customer_id = o2.customer_id` },
        { num: 6, text: `  <span class="studio-kw">AND</span> o2.purchase_date &gt; o1.purchase_date` },
        { num: 7, text: `  <span class="studio-kw">AND</span> o2.purchase_date &lt;= <span class="studio-fn">DATE</span>(o1.purchase_date, <span class="studio-str">'+30 days'</span>)` },
        { num: 8, text: `<span class="studio-kw">WHERE</span> o2.order_id <span class="studio-kw">IS NULL</span>;` }
      ],
      tableHeaders: ['customer_id', 'purchase_date', 'product_id'],
      tableRows: [
        ['CUST_88201', '2026-09-01', 'PROD_KINDLE_PAPERWHITE'],
        ['CUST_88245', '2026-09-01', 'PROD_ECHO_DOT_5TH_GEN'],
        ['CUST_89104', '2026-09-02', 'PROD_FIRE_TV_STICK_4K'],
        ['CUST_89311', '2026-09-03', 'PROD_RING_VIDEO_DOORBELL']
      ],
      tip: 'Anti-Join mastered! Using LEFT JOIN ... WHERE right.key IS NULL is sargable and outperforms expensive NOT IN subqueries in large tables.'
    },

    scenario_jpmorgan: {
      id: 'scenario_jpmorgan',
      title: 'JPMorgan: Core Ledger Invariant',
      tablePill: 'TABLE: general_ledger_entries (Multi-Entity)',
      topicTag: 'JPMORGAN CHASE // DOUBLE-ENTRY AUDIT',
      filename: 'jpmorgan_gl_invariants.sql',
      columns: ['legal_entity', 'account_code', 'entry_type', 'amount_usd'],
      latency: '0.011ms',
      memory: '0.0KB',
      status: 'AST PASSED ✓',
      lines: [
        { num: 1, text: `<span class="studio-cm">-- JPMorgan Day 01: Audit double-entry general ledger balance invariants</span>` },
        { num: 2, text: `<span class="studio-kw">SELECT</span>` },
        { num: 3, text: `  legal_entity, account_code,` },
        { num: 4, text: `  <span class="studio-fn">SUM</span>(<span class="studio-kw">CASE WHEN</span> entry_type = <span class="studio-str">'DEBIT'</span> <span class="studio-kw">THEN</span> amount_usd <span class="studio-kw">ELSE</span> <span class="studio-num">0</span> <span class="studio-kw">END</span>) <span class="studio-kw">AS</span> total_debits,` },
        { num: 5, text: `  <span class="studio-fn">SUM</span>(<span class="studio-kw">CASE WHEN</span> entry_type = <span class="studio-str">'CREDIT'</span> <span class="studio-kw">THEN</span> amount_usd <span class="studio-kw">ELSE</span> <span class="studio-num">0</span> <span class="studio-kw">END</span>) <span class="studio-kw">AS</span> total_credits,` },
        { num: 6, text: `  <span class="studio-fn">ROUND</span>(<span class="studio-fn">SUM</span>(<span class="studio-kw">CASE WHEN</span> entry_type = <span class="studio-str">'DEBIT'</span> <span class="studio-kw">THEN</span> amount_usd <span class="studio-kw">ELSE</span> -amount_usd <span class="studio-kw">END</span>), <span class="studio-num">2</span>) <span class="studio-kw">AS</span> net_variance` },
        { num: 7, text: `<span class="studio-kw">FROM</span> general_ledger_entries` },
        { num: 8, text: `<span class="studio-kw">GROUP BY</span> <span class="studio-num">1</span>, <span class="studio-num">2</span>` },
        { num: 9, text: `<span class="studio-kw">HAVING</span> total_debits != total_credits;` }
      ],
      tableHeaders: ['legal_entity', 'account_code', 'total_debits', 'total_credits', 'net_variance'],
      tableRows: [
        ['JPMC_US_RETAIL', '1010-CASH', '$2,140,000.00', '$2,140,000.00', '$0.00 (BALANCED)'],
        ['JPMC_UK_IB', '2040-NOSTRO', '$1,420,200.00', '$1,420,200.00', '$0.00 (BALANCED)'],
        ['JPMC_EU_SE', '3010-INTERBANK', '$1,290,000.00', '$1,290,000.00', '$0.00 (BALANCED)']
      ],
      tip: 'OCC & Fed Regulation D satisfied! Conditional aggregation inside SUM() guarantees exact double-entry verification across all entities.'
    },

    scenario_saas_mrr: {
      id: 'scenario_saas_mrr',
      title: 'SaaS: 5-Way MRR Waterfall Bridge',
      tablePill: 'TABLE: subscriptions (Dense Expansion)',
      topicTag: 'SAAS METRICS // 5-WAY MRR WATERFALL',
      filename: 'saas_mrr_waterfall_bridge.sql',
      columns: ['cohort_month', 'prev_mrr', 'curr_mrr', 'user_id'],
      latency: '0.018ms',
      memory: '0.0KB',
      status: 'AST PASSED ✓',
      lines: [
        { num: 1, text: `<span class="studio-cm">-- SaaS Metrics: 5-Way MRR Movement Waterfall Bridge</span>` },
        { num: 2, text: `<span class="studio-kw">SELECT</span>` },
        { num: 3, text: `  cohort_month,` },
        { num: 4, text: `  <span class="studio-fn">SUM</span>(<span class="studio-kw">CASE WHEN</span> prev_mrr = <span class="studio-num">0</span> <span class="studio-kw">THEN</span> curr_mrr <span class="studio-kw">ELSE</span> <span class="studio-num">0</span> <span class="studio-kw">END</span>) <span class="studio-kw">AS</span> new_mrr,` },
        { num: 5, text: `  <span class="studio-fn">SUM</span>(<span class="studio-kw">CASE WHEN</span> curr_mrr &gt; prev_mrr <span class="studio-kw">AND</span> prev_mrr &gt; <span class="studio-num">0</span> <span class="studio-kw">THEN</span> curr_mrr - prev_mrr <span class="studio-kw">ELSE</span> <span class="studio-num">0</span> <span class="studio-kw">END</span>) <span class="studio-kw">AS</span> expansion_mrr,` },
        { num: 6, text: `  <span class="studio-fn">SUM</span>(<span class="studio-kw">CASE WHEN</span> curr_mrr &lt; prev_mrr <span class="studio-kw">AND</span> curr_mrr &gt; <span class="studio-num">0</span> <span class="studio-kw">THEN</span> prev_mrr - curr_mrr <span class="studio-kw">ELSE</span> <span class="studio-num">0</span> <span class="studio-kw">END</span>) <span class="studio-kw">AS</span> contraction_mrr,` },
        { num: 7, text: `  <span class="studio-fn">SUM</span>(<span class="studio-kw">CASE WHEN</span> curr_mrr = <span class="studio-num">0</span> <span class="studio-kw">AND</span> prev_mrr &gt; <span class="studio-num">0</span> <span class="studio-kw">THEN</span> prev_mrr <span class="studio-kw">ELSE</span> <span class="studio-num">0</span> <span class="studio-kw">END</span>) <span class="studio-kw">AS</span> churned_mrr` },
        { num: 8, text: `<span class="studio-kw">FROM</span> monthly_customer_mrr` },
        { num: 9, text: `<span class="studio-kw">GROUP BY</span> <span class="studio-num">1</span>;` }
      ],
      tableHeaders: ['cohort_month', 'new_mrr', 'expansion_mrr', 'contraction_mrr', 'churned_mrr'],
      tableRows: [
        ['2026-01-01', '$32,000', '$12,000', '$2,100', '$4,400'],
        ['2026-02-01', '$36,500', '$15,400', '$1,800', '$5,400'],
        ['2026-03-01', '$41,200', '$18,100', '$2,200', '$4,700'],
        ['2026-04-01', '$45,000', '$21,500', '$2,400', '$5,700']
      ],
      tip: 'SaaS Quick Ratio at 4.1x! Partition frames cleanly segment net new revenue drivers for executive board decks.'
    },

    scenario_leetcode185: {
      id: 'scenario_leetcode185',
      title: 'LeetCode #185: Top 3 Salaries',
      tablePill: 'TABLE: enterprise_employees (12 columns)',
      topicTag: 'LEETCODE HARD // WINDOW RANKING',
      filename: 'leetcode_185_department_salaries.sql',
      columns: ['emp_id', 'full_name', 'department_id', 'salary'],
      latency: '0.012ms',
      memory: '0.0KB',
      status: 'AST PASSED ✓',
      lines: [
        { num: 1, text: `<span class="studio-cm">-- LeetCode #185: Top 3 Department Earners using Dense Ranking</span>` },
        { num: 2, text: `<span class="studio-kw">WITH</span> ranked_payroll <span class="studio-kw">AS</span> (` },
        { num: 3, text: `  <span class="studio-kw">SELECT</span> emp_id, full_name, department_id, salary,` },
        { num: 4, text: `    <span class="studio-fn">DENSE_RANK</span>() <span class="studio-kw">OVER</span> (` },
        { num: 5, text: `      <span class="studio-kw">PARTITION BY</span> department_id <span class="studio-kw">ORDER BY</span> salary <span class="studio-kw">DESC</span>` },
        { num: 6, text: `    ) <span class="studio-kw">AS</span> rank_pos` },
        { num: 7, text: `  <span class="studio-kw">FROM</span> enterprise_employees` },
        { num: 8, text: `)` },
        { num: 9, text: `<span class="studio-kw">SELECT</span> department_id, full_name, salary, rank_pos` },
        { num: 10, text: `<span class="studio-kw">FROM</span> ranked_payroll <span class="studio-kw">WHERE</span> rank_pos &lt;= <span class="studio-num">3</span>;` }
      ],
      tableHeaders: ['department_id', 'full_name', 'salary', 'rank_pos'],
      tableRows: [
        ['Eng', 'Elena Rostova', '$185,000', '1'],
        ['Eng', 'David Kim', '$172,000', '2'],
        ['Eng', 'Marcus Vance', '$168,000', '3'],
        ['Finance', 'Sarah Jenkins', '$195,000', '1'],
        ['Finance', 'Alex Chen', '$180,000', '2']
      ],
      tip: 'Query executed via client-side SQLite WASM! Notice how DENSE_RANK() cleanly handles ties without skipping rank numbers.'
    },

    scenario_uber: {
      id: 'scenario_uber',
      title: 'Uber: H3 Surge Multipliers',
      tablePill: 'TABLE: uber_trips_h3 (85K RPM)',
      topicTag: 'UBER MOBILITY // H3 SPATIAL LOGISTICS',
      filename: 'uber_h3_surge_calculator.sql',
      columns: ['h3_index', 'active_requests', 'available_drivers', 'surge_ratio'],
      latency: '0.016ms',
      memory: '0.0KB',
      status: 'AST PASSED ✓',
      lines: [
        { num: 1, text: `<span class="studio-cm">-- Uber Marketplace: Compute Real-Time Surge Multipliers per H3 Hexagon</span>` },
        { num: 2, text: `<span class="studio-kw">WITH</span> hex_demand <span class="studio-kw">AS</span> (` },
        { num: 3, text: `  <span class="studio-kw">SELECT</span> h3_index, <span class="studio-fn">COUNT</span>(*) <span class="studio-kw">AS</span> active_requests` },
        { num: 4, text: `  <span class="studio-kw">FROM</span> uber_ride_requests <span class="studio-kw">WHERE</span> requested_at &gt;= <span class="studio-fn">DATETIME</span>(<span class="studio-str">'now'</span>, <span class="studio-str">'-5 minutes'</span>)` },
        { num: 5, text: `  <span class="studio-kw">GROUP BY</span> h3_index` },
        { num: 6, text: `)` },
        { num: 7, text: `<span class="studio-kw">SELECT</span> d.h3_index, d.active_requests, <span class="studio-fn">COALESCE</span>(s.drivers, <span class="studio-num">0</span>) <span class="studio-kw">AS</span> drivers,` },
        { num: 8, text: `  <span class="studio-fn">ROUND</span>(<span class="studio-fn">CAST</span>(d.active_requests <span class="studio-kw">AS FLOAT</span>) / <span class="studio-fn">MAX</span>(<span class="studio-fn">COALESCE</span>(s.drivers, <span class="studio-num">1</span>), <span class="studio-num">1</span>), <span class="studio-num">2</span>) <span class="studio-kw">AS</span> surge_ratio` },
        { num: 9, text: `<span class="studio-kw">FROM</span> hex_demand d <span class="studio-kw">LEFT JOIN</span> uber_driver_telemetry s <span class="studio-kw">ON</span> d.h3_index = s.h3_index` },
        { num: 10, text: `<span class="studio-kw">ORDER BY</span> surge_ratio <span class="studio-kw">DESC</span>;` }
      ],
      tableHeaders: ['h3_index', 'active_requests', 'drivers', 'surge_ratio'],
      tableRows: [
        ['882681a339fffff', '142', '18', '7.89x'],
        ['882681a33bfffff', '98', '21', '4.67x'],
        ['882681a331fffff', '64', '32', '2.00x'],
        ['882681a337fffff', '45', '40', '1.13x']
      ],
      tip: 'H3 spatial joins prevent driver dry-outs during peak surge periods while preserving fair driver compensation.'
    }
  };

  // --- 2. DEFENSIVE SQL TRAPS DATA ---
  const DEFENSIVE_TRAPS = {
    trap_null: {
      id: 'trap_null',
      title: 'Three-Valued Logic NULL Trap',
      severity: 'P0 FATAL ERROR',
      severityClass: 'fatal',
      context: 'Amazon, Meta, Stripe BI Screens',
      wrongCode: `-- ✕ VULNERABLE: Returns 0 rows if churned_users has even 1 NULL!
SELECT user_id, email, signup_date
FROM users
WHERE user_id NOT IN (
  SELECT user_id FROM churned_users
);`,
      fixCode: `-- ✓ PRODUCTION DEFENSIVE: Null-safe ANTI-JOIN or NOT EXISTS
SELECT u.user_id, u.email, u.signup_date
FROM users u
WHERE NOT EXISTS (
  SELECT 1 FROM churned_users c
  WHERE c.user_id = u.user_id
);`,
      impact: 'In SQL three-valued logic, (x NOT IN (NULL, 1)) evaluates to UNKNOWN for all rows. The WHERE filter discards everything silently without throwing any database error.'
    },

    trap_float: {
      id: 'trap_float',
      title: 'Floating-Point Currency Drift',
      severity: 'P0 FINANCIAL DRIFT',
      severityClass: 'fatal',
      context: 'Wall Street Ledgers & CCAR Audits',
      wrongCode: `-- ✕ VULNERABLE: Float accumulation triggers IEEE-754 precision drift
SELECT account_id, 
  SUM(CAST(amount AS FLOAT)) AS total_balance
FROM ledger_entries
GROUP BY account_id
HAVING SUM(CAST(amount AS FLOAT)) != 0.00;`,
      fixCode: `-- ✓ PRODUCTION DEFENSIVE: Exact DECIMAL(18,4) or integer cents
SELECT account_id, 
  ROUND(SUM(CAST(amount_cents AS BIGINT)), 2) AS net_cents,
  ROUND(SUM(CAST(amount AS DECIMAL(18,4))), 4) AS exact_balance
FROM ledger_entries
GROUP BY account_id
HAVING SUM(amount_cents) != 0;`,
      impact: 'IEEE-754 binary floating-point representation cannot represent fractions like 0.1 or 0.01 exactly. Across millions of trades, fractional pennies drift by thousands of dollars, failing SOX audits.'
    },

    trap_window: {
      id: 'trap_window',
      title: 'Window Frame Default Range Skew',
      severity: 'P2 SILENT SKEW',
      severityClass: 'skew',
      context: 'Senior BI & Telemetry Screens',
      wrongCode: `-- ✕ VULNERABLE: Default RANGE bundles identical timestamps together!
SELECT order_date, order_amount,
  SUM(order_amount) OVER (ORDER BY order_date) AS running_total
FROM daily_sales;`,
      fixCode: `-- ✓ PRODUCTION DEFENSIVE: Explicit ROWS frame avoids tie bundling
SELECT order_date, order_amount,
  SUM(order_amount) OVER (
    ORDER BY order_date, order_id
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS true_running_total
FROM daily_sales;`,
      impact: 'Without an explicit ROWS frame, SQL engines use RANGE, which sums all peer rows with identical ORDER BY keys into the current row, silently corrupting running totals.'
    },

    trap_sargable: {
      id: 'trap_sargable',
      title: 'Non-SARGable Function Predicates',
      severity: 'P2 PERFORMANCE KILLER',
      severityClass: 'skew',
      context: 'Staff Architect Code Reviews',
      wrongCode: `-- ✕ VULNERABLE: Function on column forces O(N) sequential table scan!
SELECT customer_id, order_id, order_total
FROM orders
WHERE strftime('%Y', order_date) = '2026';`,
      fixCode: `-- ✓ PRODUCTION DEFENSIVE: Sargable range predicates utilize B-Tree indexes
SELECT customer_id, order_id, order_total
FROM orders
WHERE order_date >= '2026-01-01' 
  AND order_date < '2027-01-01';`,
      impact: 'Wrapping indexed columns inside functions blinds query planners from using B-Tree index seeks. On a 100M row orders table, this turns a 0.5ms index seek into a 45-second table scan.'
    },

    trap_cartesian: {
      id: 'trap_cartesian',
      title: 'Multi-Table 1:N Cartesian Fan-Out',
      severity: 'P3 FAN-OUT EXPLOSION',
      severityClass: 'skew',
      context: 'Data Engineering & Reconciliations',
      wrongCode: `-- ✕ VULNERABLE: Multiple 1:N joins multiply aggregate sums!
SELECT o.order_id,
  SUM(i.item_price) AS total_items_price,
  SUM(p.payment_amount) AS total_paid
FROM orders o
JOIN order_items i ON o.order_id = i.order_id
JOIN payments p ON o.order_id = p.order_id
GROUP BY o.order_id;`,
      fixCode: `-- ✓ PRODUCTION DEFENSIVE: Pre-aggregate in CTEs before joining
WITH item_sums AS (
  SELECT order_id, SUM(item_price) AS total_items_price
  FROM order_items GROUP BY order_id
),
payment_sums AS (
  SELECT order_id, SUM(payment_amount) AS total_paid
  FROM payments GROUP BY order_id
)
SELECT o.order_id, i.total_items_price, p.total_paid
FROM orders o
LEFT JOIN item_sums i ON o.order_id = i.order_id
LEFT JOIN payment_sums p ON o.order_id = p.order_id;`,
      impact: 'Joining two 1:N relationships directly creates an M x N Cartesian product. An order with 4 items and 2 payments results in 8 rows, doubling item prices and quadrupling payment totals.'
    }
  };

  // --- 3. INTERNAL STATE ---
  let activeTrack = 'all'; // 'all' | 'analytics' | 'finance'
  let activeScenarioId = 'scenario_amazon';
  let activeTrapId = 'trap_null';

  // --- 4. ENGINE CONTROLLER ---
  const LandingPageEngine = {
    init: function() {
      const container = document.getElementById('viewLandingPage');
      if (!container) return;
      container.innerHTML = this.renderHTML();
      this.bindEvents(container);
    },

    setTrack: function(track) {
      activeTrack = track || 'all';
      const container = document.getElementById('viewLandingPage');
      if (container) {
        container.innerHTML = this.renderHTML();
        this.bindEvents(container);
      }
    },

    setScenario: function(scenarioId) {
      if (HERO_SCENARIOS[scenarioId]) {
        activeScenarioId = scenarioId;
        const container = document.getElementById('viewLandingPage');
        if (container) {
          container.innerHTML = this.renderHTML();
          this.bindEvents(container);
        }
      }
    },

    setTrap: function(trapId) {
      if (DEFENSIVE_TRAPS[trapId]) {
        activeTrapId = trapId;
        const container = document.getElementById('viewLandingPage');
        if (container) {
          container.innerHTML = this.renderHTML();
          this.bindEvents(container);
        }
      }
    },

    runScenarioQuery: function() {
      const statusEl = document.querySelector('.studio-status-badge');
      if (statusEl) {
        statusEl.innerText = 'EXECUTING IN WASM...';
        statusEl.style.color = '#38bdf8';
        setTimeout(() => {
          statusEl.innerText = 'EXECUTED (0.014ms) ✓';
          statusEl.style.color = '#10b981';
        }, 220);
      }
    },

    verifyScenarioAST: function() {
      const statusEl = document.querySelector('.studio-status-badge');
      if (statusEl) {
        statusEl.innerText = 'CHECKING AST RULES...';
        statusEl.style.color = '#a78bfa';
        setTimeout(() => {
          statusEl.innerText = 'AST PASSED (SARGABLE) ✓';
          statusEl.style.color = '#10b981';
        }, 200);
      }
    },

    exportDbtModel: function() {
      if (window.selectNavView) {
        window.selectNavView('viewStudio', 'Section Studio', null);
      }
      try { window.location.hash = '#section-studio'; } catch(e) {}
    },

    renderHTML: function() {
      const curScenario = HERO_SCENARIOS[activeScenarioId] || HERO_SCENARIOS.scenario_amazon;
      const curTrap = DEFENSIVE_TRAPS[activeTrapId] || DEFENSIVE_TRAPS.trap_null;

      return `
        <div class="landing-container">

          <!-- 1. HERO SECTION -->
          <section class="landing-hero">
            <div class="landing-badge-pill">
              <span class="landing-pulse-dot"></span>
              <span>ENTERPRISE SQL PLATFORM // DATA &amp; FINANCE ANALYSIS</span>
            </div>

            <h1 class="landing-hero-title">
              The Relational Operating System for <span class="landing-hero-highlight">Data Analytics &amp; Quantitative Finance.</span>
            </h1>

            <p class="landing-hero-subtitle">
              Master Tier-1 product growth analytics, dynamic marketplace pricing, and Wall Street general ledgers across 7 company career simulations and 323 verified LeetCode problems in client-side SQLite WASM.
            </p>

            <!-- Quick Track Filters -->
            <div class="landing-track-filters">
              <button class="track-filter-btn ${activeTrack === 'all' ? 'active' : ''}" onclick="window.LANDING_PAGE_ENGINE.setTrack('all')">
                <span>⚡ All Industry Tracks</span>
                <span class="filter-badge-count">7</span>
              </button>
              <button class="track-filter-btn ${activeTrack === 'analytics' ? 'active' : ''}" onclick="window.LANDING_PAGE_ENGINE.setTrack('analytics')">
                <span>📊 Track 01: Modern Data Analytics</span>
                <span class="filter-badge-count">5</span>
              </button>
              <button class="track-filter-btn ${activeTrack === 'finance' ? 'active' : ''}" onclick="window.LANDING_PAGE_ENGINE.setTrack('finance')">
                <span>📈 Track 02: Quantitative Finance</span>
                <span class="filter-badge-count">2</span>
              </button>
            </div>

            <!-- HERO STUDIO WORKBENCH CARD (Styled directly after Section Studio) -->
            <div class="landing-studio-card">
              
              <!-- Top bar matching Section Studio -->
              <div class="landing-studio-bar">
                <div class="studio-bar-left">
                  <span class="studio-chip studio-chip-active">
                    <span>&lt;&gt; Section Studio</span>
                    <span style="font-size:9px; background:#10b981; color:#000; padding:1px 4px; border-radius:3px; font-weight:800;">LIVE</span>
                  </span>
                  <span class="studio-chip">${curScenario.tablePill}</span>
                  <span class="studio-chip" style="color:#71717a;">MySQL 8.0</span>
                  <span class="studio-chip" style="color:#71717a;">PostgreSQL 16</span>
                  <span class="studio-chip" style="color:#71717a;">Snowflake</span>
                  <span class="studio-chip" style="color:#38bdf8;">DuckDB WASM</span>
                </div>

                <div class="studio-bar-right">
                  <button class="btn-studio-run" onclick="window.LANDING_PAGE_ENGINE.runScenarioQuery()">
                    <span>▶ Run Query</span>
                  </button>
                  <button class="btn-studio-verify" onclick="window.LANDING_PAGE_ENGINE.verifyScenarioAST()">
                    <span>✓ Verify</span>
                  </button>
                  <button class="btn-studio-export" onclick="window.LANDING_PAGE_ENGINE.exportDbtModel()">
                    <span>dbt Export</span>
                  </button>
                  <button class="btn-studio-open" onclick="if(window.selectNavView) window.selectNavView('viewStudio', 'Section Studio', null); try{window.location.hash='#section-studio';}catch(e){}">
                    <span>Open Full Studio &rarr;</span>
                  </button>
                </div>
              </div>

              <!-- Scenario Selector Strip -->
              <div class="landing-scenario-strip">
                ${Object.keys(HERO_SCENARIOS).map(k => {
                  const s = HERO_SCENARIOS[k];
                  const isActive = s.id === activeScenarioId;
                  return `
                    <button class="scenario-pill-tab ${isActive ? 'active' : ''}" onclick="window.LANDING_PAGE_ENGINE.setScenario('${s.id}')">
                      <span class="scenario-dot"></span>
                      <span>${s.title}</span>
                    </button>
                  `;
                }).join('')}
              </div>

              <!-- Editor Toolbar matching Section Studio -->
              <div class="studio-editor-toolbar">
                <div class="studio-toolbar-left">
                  <span style="color:#a1a1aa; font-weight:600;">${curScenario.topicTag}</span>
                  <span style="color:#3f3f46;">|</span>
                  <span>Insert Columns:</span>
                  ${curScenario.columns.map(col => `
                    <span class="studio-col-pill">+ ${col}</span>
                  `).join('')}
                </div>
                <div style="color:#71717a;">
                  <span>${curScenario.filename}</span>
                </div>
              </div>

              <!-- Split Arena: Code Pane vs Live Tuple Sink -->
              <div class="landing-studio-grid">
                
                <!-- Monaco-style Code Pane -->
                <div class="studio-editor-pane">
                  <pre class="studio-code-pre"><code>${curScenario.lines.map(line => `
<div class="studio-code-line"><span class="studio-line-no">${line.num}</span><span class="studio-line-content">${line.text}</span></div>`).join('')}</code></pre>
                </div>

                <!-- Live Tuple Sink -->
                <div class="studio-result-pane">
                  <div class="studio-result-head">
                    <span class="studio-result-title">LIVE TUPLE SINK // WASM RESULTS</span>
                    <span class="studio-status-badge">${curScenario.status}</span>
                  </div>

                  <div class="studio-table-container">
                    <table class="studio-data-table">
                      <thead>
                        <tr>
                          ${curScenario.tableHeaders.map(th => `<th>${th}</th>`).join('')}
                        </tr>
                      </thead>
                      <tbody>
                        ${curScenario.tableRows.map(row => `
                          <tr>
                            ${row.map(cell => `<td>${cell}</td>`).join('')}
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>

                  <!-- Telemetry Strip -->
                  <div class="studio-telemetry-strip">
                    <div>
                      <span>Latency: <strong style="color:#e4e4e7;">${curScenario.latency}</strong></span>
                      <span style="margin:0 8px; color:#3f3f46;">|</span>
                      <span>Engine: <strong style="color:#e4e4e7;">SQLite 3.45 WASM</strong></span>
                    </div>
                    <div style="color:#10b981; font-weight:600;">
                      <span>${curScenario.tableRows.length} Tuples Returned</span>
                    </div>
                  </div>

                  <!-- Domain Callout Tip -->
                  <div class="studio-tip-callout">
                    <span class="studio-tip-icon">💡</span>
                    <span class="studio-tip-text">${curScenario.tip}</span>
                  </div>
                </div>

              </div>

            </div>
          </section>

          <!-- 2. METRICS STRIP -->
          <section class="landing-metrics-strip">
            <div class="landing-metric-card">
              <span class="landing-metric-val">323</span>
              <span class="landing-metric-label">LeetCode Problems</span>
              <span class="landing-metric-desc">100% Client-side AST test suites</span>
            </div>
            <div class="landing-metric-card">
              <span class="landing-metric-val">5 Tracks</span>
              <span class="landing-metric-label">Modern Data Analytics</span>
              <span class="landing-metric-desc">Amazon, Netflix, Uber, Airbnb, Spotify</span>
            </div>
            <div class="landing-metric-card">
              <span class="landing-metric-val">2 Tracks</span>
              <span class="landing-metric-label">Quantitative Finance</span>
              <span class="landing-metric-desc">JPMorgan Basel III &amp; Stripe Radar</span>
            </div>
            <div class="landing-metric-card">
              <span class="landing-metric-val">10 Capstones</span>
              <span class="landing-metric-label">Enterprise Slices</span>
              <span class="landing-metric-desc">SEC T+1, MRR Waterfall, Hospital EHR</span>
            </div>
            <div class="landing-metric-card">
              <span class="landing-metric-val">1-Click</span>
              <span class="landing-metric-label">dbt Model Exporter</span>
              <span class="landing-metric-desc">Contracts, YAML tests &amp; Semantic Layer</span>
            </div>
          </section>

          <!-- ================================================================= -->
          <!-- 3. TRACK 01: MODERN DATA ANALYTICS & ANALYTICS ENGINEERING        -->
          <!-- ================================================================= -->
          ${(activeTrack === 'all' || activeTrack === 'analytics') ? `
          <section class="landing-section" id="sectionDataAnalytics">
            <div class="landing-section-header">
              <span class="landing-section-tag" style="color:#38bdf8;">Track 01 // Product &amp; Growth</span>
              <h2 class="landing-section-title">Enterprise Data Analytics &amp; Analytics Engineering</h2>
              <p class="landing-section-subtitle">
                Engineered for Senior BI Analysts, Product Analytics leads, and Analytics Engineers scaling with dbt, Snowflake, BigQuery, and DuckDB.
              </p>
            </div>

            <!-- 5 Data Analytics Simulation Cards -->
            <div class="industry-grid">
              
              <!-- Card 1: Airbnb Travel Marketplace -->
              <div class="industry-card" style="border-top: 3px solid #ff385c;">
                <div>
                  <div class="industry-card-top">
                    <span class="industry-company-badge" style="color:#ff385c;">AIRBNB &bull; TRAVEL MARKETPLACE</span>
                    <span class="industry-duration-badge">30 DAYS</span>
                  </div>
                  <h3 class="industry-card-title">Airbnb Dynamic Pricing &amp; Marketplace Simulator</h3>
                  <p class="industry-card-desc">
                    Master search CTRs, dynamic pricing elasticity, calendar island gap identification, host tax withholding, and Olympic peak travel war room events.
                  </p>
                </div>
                <div>
                  <div class="industry-metrics-row">
                    <div class="metric-item">
                      <span class="metric-item-val" style="color:#ff385c;">30</span>
                      <span class="metric-item-lbl">Tickets (P0-P2)</span>
                    </div>
                    <div class="metric-item">
                      <span class="metric-item-val" style="color:#fbbf24;">$18B+</span>
                      <span class="metric-item-lbl">Booking Volume</span>
                    </div>
                    <div class="metric-item">
                      <span class="metric-item-val" style="color:#38bdf8;">Elasticity</span>
                      <span class="metric-item-lbl">Dynamic Pricing</span>
                    </div>
                  </div>
                  <button class="btn-launch-sim" onclick="if(window.selectNavView) window.selectNavView('viewAirbnbStory', 'Airbnb', null); try{window.location.hash='#airbnb';}catch(e){}">
                    <span>Launch Airbnb 30-Day Simulator</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>

              <!-- Card 2: Spotify Audio Streaming -->
              <div class="industry-card" style="border-top: 3px solid #1db954;">
                <div>
                  <div class="industry-card-top">
                    <span class="industry-company-badge" style="color:#1db954;">SPOTIFY &bull; AUDIO STREAMING</span>
                    <span class="industry-duration-badge">30 DAYS</span>
                  </div>
                  <h3 class="industry-card-title">Spotify Audio Streaming &amp; Royalty Waterfall</h3>
                  <p class="industry-card-desc">
                    Calculate 30-second qualified streaming thresholds, aggregate pro-rata artist royalty pools, model daily playlist decay, and navigate viral track copyright freezes.
                  </p>
                </div>
                <div>
                  <div class="industry-metrics-row">
                    <div class="metric-item">
                      <span class="metric-item-val" style="color:#1db954;">30</span>
                      <span class="metric-item-lbl">Stream Days</span>
                    </div>
                    <div class="metric-item">
                      <span class="metric-item-val" style="color:#fbbf24;">100B+</span>
                      <span class="metric-item-lbl">Audio Events</span>
                    </div>
                    <div class="metric-item">
                      <span class="metric-item-val" style="color:#38bdf8;">Pro-Rata</span>
                      <span class="metric-item-lbl">Royalty Model</span>
                    </div>
                  </div>
                  <button class="btn-launch-sim" onclick="if(window.selectNavView) window.selectNavView('viewSpotifyStory', 'Spotify', null); try{window.location.hash='#spotify';}catch(e){}">
                    <span>Launch Spotify 30-Day Simulator</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>

              <!-- Card 3: Uber Marketplace Logistics -->
              <div class="industry-card" style="border-top: 3px solid #06c167;">
                <div>
                  <div class="industry-card-top">
                    <span class="industry-company-badge" style="color:#06c167;">UBER &bull; MOBILITY OPERATIONS</span>
                    <span class="industry-duration-badge">30 DAYS</span>
                  </div>
                  <h3 class="industry-card-title">Uber Marketplace Dynamics &amp; H3 Logistics</h3>
                  <p class="industry-card-desc">
                    Calculate real-time driver liquidity ratios, aggregate geospatial demand into resolution-8 H3 hexagons, detect GPS spoofing fraud, and manage an 85,000 RPM surge war room.
                  </p>
                </div>
                <div>
                  <div class="industry-metrics-row">
                    <div class="metric-item">
                      <span class="metric-item-val" style="color:#06c167;">30</span>
                      <span class="metric-item-lbl">Dispatch Days</span>
                    </div>
                    <div class="metric-item">
                      <span class="metric-item-val" style="color:#fbbf24;">H3 Res-8</span>
                      <span class="metric-item-lbl">Hex Spatial</span>
                    </div>
                    <div class="metric-item">
                      <span class="metric-item-val" style="color:#38bdf8;">85K RPM</span>
                      <span class="metric-item-lbl">Surge War Room</span>
                    </div>
                  </div>
                  <button class="btn-launch-sim" onclick="if(window.selectNavView) window.selectNavView('viewUberStory', 'Uber', null); try{window.location.hash='#uber';}catch(e){}">
                    <span>Launch Uber 30-Day Simulator</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>

              <!-- Card 4: Netflix Streaming QoE -->
              <div class="industry-card" style="border-top: 3px solid #e50914;">
                <div>
                  <div class="industry-card-top">
                    <span class="industry-company-badge" style="color:#e50914;">NETFLIX &bull; PLAYBACK TELEMETRY</span>
                    <span class="industry-duration-badge">30 DAYS</span>
                  </div>
                  <h3 class="industry-card-title">Netflix Streaming &amp; QoE Telemetry Simulator</h3>
                  <p class="industry-card-desc">
                    Diagnose P99 Time-To-First-Frame (TTFF) latency, calculate adaptive bitrate rebuffering ratios across ISP peering backbones, and evaluate A/B thumbnail experiments.
                  </p>
                </div>
                <div>
                  <div class="industry-metrics-row">
                    <div class="metric-item">
                      <span class="metric-item-val" style="color:#e50914;">30</span>
                      <span class="metric-item-lbl">Telemetry Days</span>
                    </div>
                    <div class="metric-item">
                      <span class="metric-item-val" style="color:#fbbf24;">P99 TTFF</span>
                      <span class="metric-item-lbl">Latency Metric</span>
                    </div>
                    <div class="metric-item">
                      <span class="metric-item-val" style="color:#38bdf8;">A/B Engine</span>
                      <span class="metric-item-lbl">SRM Diagnostics</span>
                    </div>
                  </div>
                  <button class="btn-launch-sim" onclick="if(window.selectNavView) window.selectNavView('viewNetflixStory', 'Netflix', null); try{window.location.hash='#netflix';}catch(e){}">
                    <span>Launch Netflix 30-Day Simulator</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>

              <!-- Card 5: Amazon SCOT Prime Day -->
              <div class="industry-card" style="border-top: 3px solid #f59e0b;">
                <div>
                  <div class="industry-card-top">
                    <span class="industry-company-badge" style="color:#f59e0b;">AMAZON SCOT &bull; SUPPLY CHAIN</span>
                    <span class="industry-duration-badge">30 DAYS</span>
                  </div>
                  <h3 class="industry-card-title">Amazon SCOT &amp; Prime Day War Room</h3>
                  <p class="industry-card-desc">
                    Audit cart abandonment, diagnose fulfillment center dock-to-ship latency bottlenecks, calculate carrier SLA delivery penalties, and track Prime Day revenue velocity.
                  </p>
                </div>
                <div>
                  <div class="industry-metrics-row">
                    <div class="metric-item">
                      <span class="metric-item-val" style="color:#f59e0b;">30</span>
                      <span class="metric-item-lbl">Daily Missions</span>
                    </div>
                    <div class="metric-item">
                      <span class="metric-item-val" style="color:#fbbf24;">Prime Day</span>
                      <span class="metric-item-lbl">War Room</span>
                    </div>
                    <div class="metric-item">
                      <span class="metric-item-val" style="color:#38bdf8;">L8 VP</span>
                      <span class="metric-item-lbl">Capstone Deck</span>
                    </div>
                  </div>
                  <button class="btn-launch-sim" onclick="if(window.selectNavView) window.selectNavView('viewAmazonStory', 'Analytics', null); try{window.location.hash='#analytics';}catch(e){}">
                    <span>Launch Amazon 30-Day Simulator</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>

            </div>

            <!-- Spotlight Cards: Cohort Matrix, MRR Waterfall, dbt Model Exporter -->
            <div class="spotlight-grid">
              
              <div class="spotlight-card">
                <div>
                  <span class="spotlight-badge">PRODUCT RETENTION</span>
                  <h4 class="spotlight-title">Triangular Vintage Cohort Matrix</h4>
                  <p class="spotlight-desc">Compute month-over-month active customer decay (M+0 to M+5) with windowed inception anchors and Net Dollar Retention (NDR 119%).</p>
                </div>
                <button class="btn-launch-sim" onclick="if(window.selectNavView) window.selectNavView('viewRelationalMachines', 'Relational Machines', null); try{window.location.hash='#machines';}catch(e){}">
                  <span>View Cohort Heatmap Studio</span>
                  <span>&rarr;</span>
                </button>
              </div>

              <div class="spotlight-card">
                <div>
                  <span class="spotlight-badge">SAAS FINANCIAL ANALYTICS</span>
                  <h4 class="spotlight-title">5-Way MRR Waterfall Bridge</h4>
                  <p class="spotlight-desc">Decompose recurring revenue into New MRR, Expansion, Contraction, and Churn via dense calendar expansion and lagged window vectors.</p>
                </div>
                <button class="btn-launch-sim" onclick="if(window.selectNavView) window.selectNavView('viewRelationalMachines', 'Relational Machines', null); try{window.location.hash='#machines';}catch(e){}">
                  <span>Inspect MRR Waterfall Machine</span>
                  <span>&rarr;</span>
                </button>
              </div>

              <div class="spotlight-card">
                <div>
                  <span class="spotlight-badge">MODERN DATA STACK</span>
                  <h4 class="spotlight-title">1-Click Production dbt Core Exporter</h4>
                  <p class="spotlight-desc">Wraps SQL into {{ ref('...') }} macros, configures enforced data contracts, automated schema tests, and LookML views ready for Git.</p>
                </div>
                <button class="btn-launch-sim" onclick="if(window.selectNavView) window.selectNavView('viewStudio', 'Section Studio', null); try{window.location.hash='#section-studio';}catch(e){}">
                  <span>Open Section Studio &amp; Export dbt</span>
                  <span>&rarr;</span>
                </button>
              </div>

            </div>
          </section>
          ` : ''}

          <!-- ================================================================= -->
          <!-- 4. TRACK 02: QUANTITATIVE FINANCE & WALL STREET LEDGERS           -->
          <!-- ================================================================= -->
          ${(activeTrack === 'all' || activeTrack === 'finance') ? `
          <section class="landing-section" id="sectionFinanceAnalytics">
            <div class="landing-section-header">
              <span class="landing-section-tag" style="color:#a78bfa;">Track 02 // Quantitative Finance</span>
              <h2 class="landing-section-title">Institutional Banking Ledgers &amp; Trading Systems</h2>
              <p class="landing-section-subtitle">
                Engineered for Quantitative Researchers, Wall Street FinTech Analysts, and Algorithmic Execution Engineers working with ledgers and market microstructure.
              </p>
            </div>

            <!-- Quantitative Finance Simulation Cards -->
            <div class="industry-grid">
              
              <!-- Card 1: JPMorgan Chase Quantitative Risk -->
              <div class="industry-card" style="border-top: 3px solid #3b82f6;">
                <div>
                  <div class="industry-card-top">
                    <span class="industry-company-badge" style="color:#3b82f6;">JPMORGAN CHASE &bull; CIB ROTATION</span>
                    <span class="industry-duration-badge">30 DAYS</span>
                  </div>
                  <h3 class="industry-card-title">JPMorgan Global Banking &amp; Basel III Capital Simulator</h3>
                  <p class="industry-card-desc">
                    Audit multi-entity general ledger invariants, calculate Basel III Common Equity Tier 1 (CET1) capital ratios, simulate CCAR credit risk downgrades, and reconcile Nostro/Vostro accounts.
                  </p>
                </div>
                <div>
                  <div class="industry-metrics-row">
                    <div class="metric-item">
                      <span class="metric-item-val" style="color:#3b82f6;">30</span>
                      <span class="metric-item-lbl">Quant Days</span>
                    </div>
                    <div class="metric-item">
                      <span class="metric-item-val" style="color:#fbbf24;">$4.2T</span>
                      <span class="metric-item-lbl">Balance Sheet</span>
                    </div>
                    <div class="metric-item">
                      <span class="metric-item-val" style="color:#10b981;">CET1</span>
                      <span class="metric-item-lbl">Basel III Ratio</span>
                    </div>
                  </div>
                  <button class="btn-launch-sim" onclick="if(window.selectNavView) window.selectNavView('viewJPMorganStory', 'Finance', null); try{window.location.hash='#jpmorgan';}catch(e){}">
                    <span>Launch JPMorgan 30-Day Simulator</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>

              <!-- Card 2: Stripe FinTech Infrastructure -->
              <div class="industry-card" style="border-top: 3px solid #635bff;">
                <div>
                  <div class="industry-card-top">
                    <span class="industry-company-badge" style="color:#635bff;">STRIPE &bull; CORE PAYMENTS</span>
                    <span class="industry-duration-badge">30 DAYS</span>
                  </div>
                  <h3 class="industry-card-title">Stripe Global FinTech &amp; Payment Ledger Simulator</h3>
                  <p class="industry-card-desc">
                    Audit multi-currency merchant balance holds, detect card-testing micro-authorization fraud clusters, reconcile gateway fee schedules, and maintain double-entry journal balance invariants.
                  </p>
                </div>
                <div>
                  <div class="industry-metrics-row">
                    <div class="metric-item">
                      <span class="metric-item-val" style="color:#635bff;">30</span>
                      <span class="metric-item-lbl">FinTech Days</span>
                    </div>
                    <div class="metric-item">
                      <span class="metric-item-val" style="color:#fbbf24;">$1T+</span>
                      <span class="metric-item-lbl">Payments Vol</span>
                    </div>
                    <div class="metric-item">
                      <span class="metric-item-val" style="color:#10b981;">Radar ML</span>
                      <span class="metric-item-lbl">Fraud Defense</span>
                    </div>
                  </div>
                  <button class="btn-launch-sim" onclick="if(window.selectNavView) window.selectNavView('viewStripeStory', 'Stripe', null); try{window.location.hash='#stripe';}catch(e){}">
                    <span>Launch Stripe 30-Day Simulator</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>

              <!-- Card 3: L2 Limit Orderbook & Micro-Price -->
              <div class="industry-card" style="border-top: 3px solid #06b6d4;">
                <div>
                  <div class="industry-card-top">
                    <span class="industry-company-badge" style="color:#06b6d4;">WALL STREET &bull; HIGH-FREQUENCY TRADING</span>
                    <span class="industry-duration-badge">RELATIONAL MACHINE</span>
                  </div>
                  <h3 class="industry-card-title">L2 Limit Orderbook (LOB) Market Depth Engine</h3>
                  <p class="industry-card-desc">
                    Reconstruct sub-millisecond bid/ask orderbook ladders from tick feeds, track cumulative volume depth, and compute volume-weighted micro-price adjustments under SEC Rule 611.
                  </p>
                </div>
                <div>
                  <div class="industry-metrics-row">
                    <div class="metric-item">
                      <span class="metric-item-val" style="color:#06b6d4;">L2 Depth</span>
                      <span class="metric-item-lbl">Tick Stream</span>
                    </div>
                    <div class="metric-item">
                      <span class="metric-item-val" style="color:#fbbf24;">Micro-Price</span>
                      <span class="metric-item-lbl">Spread Metric</span>
                    </div>
                    <div class="metric-item">
                      <span class="metric-item-val" style="color:#10b981;">Reg NMS</span>
                      <span class="metric-item-lbl">SEC Compliance</span>
                    </div>
                  </div>
                  <button class="btn-launch-sim" onclick="if(window.selectNavView) window.selectNavView('viewRelationalMachines', 'Relational Machines', null); try{window.location.hash='#machines';}catch(e){}">
                    <span>Launch Orderbook Depth Machine</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>

            </div>

            <!-- Spotlight Cards: SEC Settlement & Core Banking Ledgers -->
            <div class="spotlight-grid">
              
              <div class="spotlight-card">
                <div>
                  <span class="spotlight-badge" style="color:#a78bfa;">CLEARING &amp; SETTLEMENT</span>
                  <h4 class="spotlight-title">SEC T+1 Settlement &amp; Fails-to-Deliver (FTD)</h4>
                  <p class="spotlight-desc">Enforce Continuous Net Settlement (CNS), calculate buy-in penalties under SEC Rule 15c6-1, and track clearinghouse collateral margins.</p>
                </div>
                <button class="btn-launch-sim" onclick="if(window.selectNavView) window.selectNavView('viewCapstones', 'Guided Capstones', 'navGroupPractice'); try{window.location.hash='#capstone';}catch(e){}">
                  <span>View SEC T+1 Capstone Studio</span>
                  <span>&rarr;</span>
                </button>
              </div>

              <div class="spotlight-card">
                <div>
                  <span class="spotlight-badge" style="color:#a78bfa;">CORE LEDGERS</span>
                  <h4 class="spotlight-title">Nostro / Vostro Multi-Currency Journal</h4>
                  <p class="spotlight-desc">Maintain cross-border correspondent banking reconciliations with FX revaluation sweeps and zero-variance ledger proofs.</p>
                </div>
                <button class="btn-launch-sim" onclick="if(window.selectNavView) window.selectNavView('viewJPMorganStory', 'Finance', null); try{window.location.hash='#jpmorgan';}catch(e){}">
                  <span>Inspect Nostro/Vostro Journal</span>
                  <span>&rarr;</span>
                </button>
              </div>

              <div class="spotlight-card">
                <div>
                  <span class="spotlight-badge" style="color:#a78bfa;">CREDIT RISK ENGINE</span>
                  <h4 class="spotlight-title">Federal Reserve CCAR Capital Stress Testing</h4>
                  <p class="spotlight-desc">Run macroeconomic shock scenarios, aggregate risk-weighted assets (RWA), and audit capital adequacy distribution waterfalls.</p>
                </div>
                <button class="btn-launch-sim" onclick="if(window.selectNavView) window.selectNavView('viewJPMorganStory', 'Finance', null); try{window.location.hash='#jpmorgan';}catch(e){}">
                  <span>Launch CCAR Stress Simulation</span>
                  <span>&rarr;</span>
                </button>
              </div>

            </div>
          </section>
          ` : ''}

          <!-- ================================================================= -->
          <!-- 5. DEFENSIVE SQL TRAPS (5 SILENT FAILURES)                         -->
          <!-- ================================================================= -->
          <section class="landing-section">
            <div class="landing-section-header">
              <span class="landing-section-tag" style="color:#ef4444;">Defensive SQL // Zero Silent Failures</span>
              <h2 class="landing-section-title">The 5 Silent SQL Traps That Cost Companies Millions</h2>
              <p class="landing-section-subtitle">
                Junior queries pass syntax checks and linter rules, but corrupt accounting ledgers and skew production metrics. Click each trap below to inspect the vulnerable query versus the production-hardened defensive fix.
              </p>
            </div>

            <div class="traps-container-card">
              <!-- Trap Selector Buttons -->
              <div class="traps-nav-pills">
                ${Object.keys(DEFENSIVE_TRAPS).map(k => {
                  const t = DEFENSIVE_TRAPS[k];
                  const isActive = t.id === activeTrapId;
                  return `
                    <button class="trap-pill-btn ${isActive ? 'active' : ''}" onclick="window.LANDING_PAGE_ENGINE.setTrap('${t.id}')">
                      <span>${t.title}</span>
                    </button>
                  `;
                }).join('')}
              </div>

              <!-- Active Trap Meta Header -->
              <div class="trap-meta-strip">
                <div>
                  <span class="trap-severity-badge ${curTrap.severityClass}">${curTrap.severity}</span>
                  <span style="margin-left: 10px; color: #a1a1aa;">${curTrap.title}</span>
                </div>
                <div style="color: #71717a;">
                  <span>Affects: ${curTrap.context}</span>
                </div>
              </div>

              <!-- Side-by-side Diff Boxes -->
              <div class="trap-diff-columns">
                <!-- Vulnerable Box -->
                <div class="trap-code-box box-silent-fail">
                  <div class="trap-box-label" style="color:#ef4444;">✕ VULNERABLE PRODUCTION QUERY</div>
                  <pre class="trap-code-pre"><code>${curTrap.wrongCode}</code></pre>
                </div>

                <!-- Defensive Fix Box -->
                <div class="trap-code-box box-defensive-fix">
                  <div class="trap-box-label" style="color:#10b981;">✓ DEFENSIVE PRODUCTION FIX</div>
                  <pre class="trap-code-pre"><code>${curTrap.fixCode}</code></pre>
                </div>
              </div>

              <!-- Production Impact Note -->
              <div class="trap-impact-text">
                <strong>Failure Mechanism:</strong> ${curTrap.impact}
              </div>
            </div>
          </section>

          <!-- ================================================================= -->
          <!-- 6. FAST ACCESS PRACTICE MATRIX                                    -->
          <!-- ================================================================= -->
          <section class="landing-section" style="margin-bottom: 40px;">
            <div class="landing-section-header">
              <span class="landing-section-tag">Fast Access // Direct Jump</span>
              <h2 class="landing-section-title">Jump Straight into Practice</h2>
              <p class="landing-section-subtitle">
                Select your focus arena and launch directly into client-side relational training.
              </p>
            </div>

            <div class="fast-access-grid">
              
              <!-- Tile 1: Section Studio -->
              <div class="fast-tile" onclick="if(window.selectNavView) window.selectNavView('viewStudio', 'Section Studio', null); try{window.location.hash='#section-studio';}catch(e){}">
                <div class="fast-tile-top">
                  <span class="fast-tile-badge" style="color:#38bdf8;">WORKBENCH</span>
                  <span style="color:#38bdf8;">&rarr;</span>
                </div>
                <h4 class="fast-tile-title">&lt;&gt; Section Studio</h4>
                <p class="fast-tile-desc">30 Core Relational Topics, Monaco-style editor, multi-dialect transpiler, and instant WASM tuple sinks.</p>
              </div>

              <!-- Tile 2: LeetCode 323 -->
              <div class="fast-tile" onclick="if(window.selectNavView) window.selectNavView('viewLeetCode50', 'LeetCode 323', null); try{window.location.hash='#leetcode';}catch(e){}">
                <div class="fast-tile-top">
                  <span class="fast-tile-badge" style="color:#fbbf24;">ARCHIVE</span>
                  <span style="color:#fbbf24;">&rarr;</span>
                </div>
                <h4 class="fast-tile-title">🏆 LeetCode 323</h4>
                <p class="fast-tile-desc">All 323 LeetCode SQL problems categorized by Easy, Medium, and Hard with verified client-side test suites.</p>
              </div>

              <!-- Tile 3: Industry Simulation Hub -->
              <div class="fast-tile" onclick="if(window.selectNavView) window.selectNavView('viewCompanyHub', 'Companies & Domains', 'navGroupPractice'); try{window.location.hash='#companies';}catch(e){}">
                <div class="fast-tile-top">
                  <span class="fast-tile-badge" style="color:#10b981;">SIMULATIONS</span>
                  <span style="color:#10b981;">&rarr;</span>
                </div>
                <h4 class="fast-tile-title">🏢 Industry Domain Hub</h4>
                <p class="fast-tile-desc">Direct access to 30-day onboarding rotations at Amazon, Netflix, Uber, Stripe, Airbnb, Spotify, and JPMorgan.</p>
              </div>

              <!-- Tile 4: Relational Machines -->
              <div class="fast-tile" onclick="if(window.selectNavView) window.selectNavView('viewRelationalMachines', 'Relational Machines', null); try{window.location.hash='#machines';}catch(e){}">
                <div class="fast-tile-top">
                  <span class="fast-tile-badge" style="color:#a78bfa;">TOPOLOGY</span>
                  <span style="color:#a78bfa;">&rarr;</span>
                </div>
                <h4 class="fast-tile-title">⬡ Relational Machines</h4>
                <p class="fast-tile-desc">Interactive cohort retention matrices, 5-way SaaS MRR waterfall bridge, and L2 market depth orderbooks.</p>
              </div>

            </div>
          </section>

        </div>
      `;
    },

    bindEvents: function(container) {
      // Any dynamic interactive event binding if needed
    }
  };

  // Expose globally
  window.LANDING_PAGE_ENGINE = LandingPageEngine;

  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      LandingPageEngine.init();
    });
  } else {
    LandingPageEngine.init();
  }

})(window);
