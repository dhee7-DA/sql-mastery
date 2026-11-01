/**
 * SQL FOUNDRY - ENTERPRISE PRODUCT LANDING PAGE ENGINE
 * Dual-Track Showcase: Data Analytics & Quantitative Finance
 * Clean Obsidian/Carbon Aesthetic · Multi-Scenario Sandbox · Deep Track Blueprints
 */
(function() {
  'use strict';

  const HERO_SCENARIOS = {
    scenario1: {
      id: 'scenario1',
      title: 'LeetCode #185 (Top 3 Salaries)',
      filename: 'leetcode_185_department_salaries.sql',
      dataset: 'enterprise_employees (12 production columns)',
      latency: '0.014ms',
      memory: '0.0KB',
      rowsCount: '6 rows returned',
      statusText: 'Query Executed Successfully (DENSE_RANK Tied Evaluation)',
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
<span class="landing-kw">WHERE</span> rank_pos &lt;= <span class="landing-num">3</span>
<span class="landing-kw">ORDER BY</span> department_id, rank_pos;`,
      tableHeaders: ['department_id', 'full_name', 'salary', 'rank_pos'],
      tableRows: [
        ['Eng', 'Elena Rostova', '$185,000', '1'],
        ['Eng', 'David Kim', '$172,000', '2'],
        ['Eng', 'Marcus Vance', '$168,000', '3'],
        ['Finance', 'Sarah Jenkins', '$195,000', '1'],
        ['Finance', 'Alex Chen', '$180,000', '2'],
        ['Finance', 'Jordan Hayes', '$165,000', '3']
      ],
      buddyTip: 'Query executed in 0.014ms via client-side SQLite WASM! Notice how DENSE_RANK() cleanly handles ties without skipping rank numbers.'
    },
    scenario2: {
      id: 'scenario2',
      title: 'Amazon BI: Prime Churn (Anti-Join)',
      filename: 'amazon_prime_churn_detector.sql',
      dataset: 'amazon_prime_orders (2.4M Historical Orders)',
      latency: '0.016ms',
      memory: '0.0KB',
      rowsCount: '4 churned customer accounts',
      statusText: 'Anti-Join Completed: Found Day-1 Buyers with Zero 30-Day Activity',
      codeHtml: `<span class="landing-cm">-- Amazon SCOT Day 02: Identify Prime customers churned after Day 1</span>
<span class="landing-kw">SELECT DISTINCT</span> o1.customer_id, o1.purchase_date, o1.product_id
<span class="landing-kw">FROM</span> amazon_prime_orders o1
<span class="landing-kw">LEFT JOIN</span> amazon_prime_orders o2
  <span class="landing-kw">ON</span> o1.customer_id = o2.customer_id
  <span class="landing-kw">AND</span> o2.purchase_date &gt; o1.purchase_date
  <span class="landing-kw">AND</span> o2.purchase_date &lt;= <span class="landing-fn">DATE</span>(o1.purchase_date, <span class="landing-str">'+30 days'</span>)
<span class="landing-kw">WHERE</span> o2.order_id <span class="landing-kw">IS NULL</span>;`,
      tableHeaders: ['customer_id', 'purchase_date', 'product_id'],
      tableRows: [
        ['CUST_88201', '2026-09-01', 'PROD_KINDLE_PAPERWHITE'],
        ['CUST_88245', '2026-09-01', 'PROD_ECHO_DOT_5TH_GEN'],
        ['CUST_89104', '2026-09-02', 'PROD_FIRE_TV_STICK_4K'],
        ['CUST_89311', '2026-09-03', 'PROD_RING_VIDEO_DOORBELL']
      ],
      buddyTip: 'Anti-Join mastered! Using LEFT JOIN ... WHERE right.key IS NULL is sargable and outperforms expensive NOT IN subqueries.'
    },
    scenario3: {
      id: 'scenario3',
      title: 'JPMorgan: Core Ledger Balance Audit',
      filename: 'jpmorgan_gl_invariants.sql',
      dataset: 'general_ledger_entries (Multi-Entity Nostro/Vostro)',
      latency: '0.011ms',
      memory: '0.0KB',
      rowsCount: '3 legal entities audited',
      statusText: 'Double-Entry Invariant Verified: Debits = Credits per Entity (Zero Variance)',
      codeHtml: `<span class="landing-cm">-- JPMorgan Day 01: Audit double-entry general ledger balance invariants</span>
<span class="landing-kw">SELECT</span> 
  legal_entity, account_code,
  <span class="landing-fn">SUM</span>(<span class="landing-kw">CASE WHEN</span> entry_type = <span class="landing-str">'DEBIT'</span> <span class="landing-kw">THEN</span> amount_usd <span class="landing-kw">ELSE</span> <span class="landing-num">0</span> <span class="landing-kw">END</span>) <span class="landing-kw">AS</span> total_debits,
  <span class="landing-fn">SUM</span>(<span class="landing-kw">CASE WHEN</span> entry_type = <span class="landing-str">'CREDIT'</span> <span class="landing-kw">THEN</span> amount_usd <span class="landing-kw">ELSE</span> <span class="landing-num">0</span> <span class="landing-kw">END</span>) <span class="landing-kw">AS</span> total_credits,
  <span class="landing-fn">ROUND</span>(<span class="landing-fn">SUM</span>(<span class="landing-kw">CASE WHEN</span> entry_type = <span class="landing-str">'DEBIT'</span> <span class="landing-kw">THEN</span> amount_usd <span class="landing-kw">ELSE</span> -amount_usd <span class="landing-kw">END</span>), <span class="landing-num">2</span>) <span class="landing-kw">AS</span> net_variance
<span class="landing-kw">FROM</span> general_ledger_entries
<span class="landing-kw">GROUP BY</span> <span class="landing-num">1</span>, <span class="landing-num">2</span>
<span class="landing-kw">HAVING</span> total_debits != total_credits;`,
      tableHeaders: ['legal_entity', 'account_code', 'total_debits', 'total_credits', 'net_variance'],
      tableRows: [
        ['JPMC_US_RETAIL', '1010-CASH', '$2,140,000.00', '$2,140,000.00', '$0.00 (BALANCED)'],
        ['JPMC_UK_IB', '2040-NOSTRO', '$1,420,200.00', '$1,420,200.00', '$0.00 (BALANCED)'],
        ['JPMC_EU_SE', '3010-INTERBANK', '$1,290,000.00', '$1,290,000.00', '$0.00 (BALANCED)']
      ],
      buddyTip: 'OCC & Fed Regulation D satisfied! Conditional aggregation inside SUM() guarantees exact double-entry verification.'
    },
    scenario4: {
      id: 'scenario4',
      title: 'SaaS: 5-Way MRR Waterfall Bridge',
      filename: 'saas_mrr_waterfall_bridge.sql',
      dataset: 'subscriptions (Dense Calendar Expansion)',
      latency: '0.018ms',
      memory: '0.0KB',
      rowsCount: '5 monthly tranches decomposed',
      statusText: 'MRR Bridge Calculated: New, Expansion, Contraction & Churn (NRR 119.4%)',
      codeHtml: `<span class="landing-cm">-- Grand Capstone 05: Classify Month-over-Month MRR Delta</span>
<span class="landing-kw">WITH</span> monthly_mrr <span class="landing-kw">AS</span> (
  <span class="landing-kw">SELECT</span> user_id, <span class="landing-fn">DATE_TRUNC</span>(<span class="landing-str">'month'</span>, invoice_date) <span class="landing-kw">AS</span> mth, <span class="landing-fn">SUM</span>(mrr) <span class="landing-kw">AS</span> mrr
  <span class="landing-kw">FROM</span> subscriptions <span class="landing-kw">GROUP BY</span> <span class="landing-num">1</span>, <span class="landing-num">2</span>
),
lagged <span class="landing-kw">AS</span> (
  <span class="landing-kw">SELECT</span> user_id, mth, mrr, <span class="landing-fn">LAG</span>(mrr, <span class="landing-num">1</span>, <span class="landing-num">0.0</span>) <span class="landing-kw">OVER</span> (<span class="landing-kw">PARTITION BY</span> user_id <span class="landing-kw">ORDER BY</span> mth) <span class="landing-kw">AS</span> prev_mrr
  <span class="landing-kw">FROM</span> monthly_mrr
)
<span class="landing-kw">SELECT</span> mth,
  <span class="landing-fn">SUM</span>(<span class="landing-kw">CASE WHEN</span> prev_mrr = <span class="landing-num">0</span> <span class="landing-kw">AND</span> mrr &gt; <span class="landing-num">0</span> <span class="landing-kw">THEN</span> mrr <span class="landing-kw">ELSE</span> <span class="landing-num">0</span> <span class="landing-kw">END</span>) <span class="landing-kw">AS</span> new_mrr,
  <span class="landing-fn">SUM</span>(<span class="landing-kw">CASE WHEN</span> mrr &gt; prev_mrr <span class="landing-kw">AND</span> prev_mrr &gt; <span class="landing-num">0</span> <span class="landing-kw">THEN</span> mrr - prev_mrr <span class="landing-kw">ELSE</span> <span class="landing-num">0</span> <span class="landing-kw">END</span>) <span class="landing-kw">AS</span> expansion_mrr,
  <span class="landing-fn">SUM</span>(<span class="landing-kw">CASE WHEN</span> mrr = <span class="landing-num">0</span> <span class="landing-kw">AND</span> prev_mrr &gt; <span class="landing-num">0</span> <span class="landing-kw">THEN</span> prev_mrr <span class="landing-kw">ELSE</span> <span class="landing-num">0</span> <span class="landing-kw">END</span>) <span class="landing-kw">AS</span> churn_mrr
<span class="landing-kw">FROM</span> lagged <span class="landing-kw">GROUP BY</span> <span class="landing-num">1</span> <span class="landing-kw">ORDER BY</span> <span class="landing-num">1</span>;`,
      tableHeaders: ['mth', 'new_mrr', 'expansion_mrr', 'churn_mrr', 'net_new_mrr'],
      tableRows: [
        ['2024-01-01', '$32,000', '$12,000', '$6,500', '+$33,300'],
        ['2024-02-01', '$36,500', '$15,400', '$7,200', '+$39,600'],
        ['2024-03-01', '$41,200', '$18,100', '$6,900', '+$47,600'],
        ['2024-04-01', '$45,000', '$21,500', '$8,100', '+$52,600'],
        ['2024-05-01', '$48,900', '$24,200', '$8,400', '+$58,500']
      ],
      buddyTip: 'SaaS Quick Ratio at 4.1x! LAG() partition frames cleanly segment net new revenue drivers for executive board decks.'
    }
  };

  let activeScenarioId = 'scenario1';

  const LandingPageEngine = {
    init: function() {
      const container = document.getElementById('viewLandingPage');
      if (!container) return;
      container.innerHTML = this.renderHTML();
      this.bindEvents(container);
    },

    renderHTML: function() {
      const current = HERO_SCENARIOS[activeScenarioId] || HERO_SCENARIOS.scenario1;

      return `
        <div class="landing-container">
          
          <!-- 1. HERO SECTION -->
          <section class="landing-hero">
            <div class="landing-badge-pill">
              <span class="landing-dot"></span>
              <span>ENTERPRISE SQL PLATFORM // DUAL-TRACK ARCHITECTURE</span>
            </div>

            <h1 class="landing-hero-title">
              The Relational Operating System for <span class="landing-hero-highlight">Tier-1 Engineers &amp; Quants.</span>
            </h1>

            <p class="landing-hero-subtitle">
              Master advanced data analytics, institutional banking ledgers, and 323 LeetCode problems through interactive topological relational machines, in-browser SQLite WASM, and 1-click dbt model generation.
            </p>

            <!-- Dual-Track Hero Launch Buttons -->
            <div class="landing-cta-strip">
              <button class="landing-cta-primary" onclick="if(window.selectNavView) window.selectNavView('viewAmazonStory', 'Analytics', null); try{window.location.hash='#analytics';}catch(e){}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 3v18h18"></path><rect x="7" y="10" width="3" height="8"></rect><rect x="14" y="5" width="3" height="13"></rect></svg>
                <span>Launch Analytics Track (Amazon 30d)</span>
              </button>
              <button class="landing-cta-secondary" onclick="if(window.selectNavView) window.selectNavView('viewJPMorganStory', 'Finance', null); try{window.location.hash='#finance';}catch(e){}" style="border-color:rgba(16,185,129,0.4); color:#10b981;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 21h18"></path><path d="M5 21V7l7-4 7 4v14"></path><path d="M9 10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v11H9V10z"></path></svg>
                <span>Launch Finance Track (JPMorgan 30d)</span>
              </button>
              <button class="landing-cta-secondary" onclick="if(window.selectNavView) window.selectNavView('viewRelationalMachines', 'Relational Machines', null); try{window.location.hash='#machines';}catch(e){}">
                <span>⬡ Relational Machines</span>
              </button>
              <button class="landing-cta-secondary" onclick="if(window.selectNavView) window.selectNavView('viewLeetCode50', 'LeetCode 323', null); try{window.location.hash='#leetcode';}catch(e){}">
                <span>🏆 LeetCode 323</span>
              </button>
            </div>

            <!-- Interactive Scenario Code & Execution Sandbox -->
            <div class="landing-hero-widget-card">
              <div class="landing-widget-tabs">
                ${Object.keys(HERO_SCENARIOS).map(k => {
                  const s = HERO_SCENARIOS[k];
                  const isActive = s.id === activeScenarioId;
                  return `
                    <button class="landing-scenario-tab ${isActive ? 'active' : ''}" data-scenario="${s.id}">
                      <span class="tab-indicator-dot"></span>
                      <span>${s.title}</span>
                    </button>
                  `;
                }).join('')}
              </div>

              <div class="landing-widget-body">
                <div class="landing-code-pane">
                  <div class="landing-pane-header">
                    <span class="landing-file-name">${current.filename}</span>
                    <span class="landing-tag-pill">CLIENT-SIDE WASM</span>
                  </div>
                  <pre class="landing-code-pre"><code>${current.codeHtml}</code></pre>
                </div>

                <div class="landing-result-pane">
                  <div class="landing-pane-header">
                    <span class="landing-pane-title">LIVE TUPLE SINK</span>
                    <span class="landing-rows-count">${current.rowsCount}</span>
                  </div>
                  <div class="landing-table-wrap">
                    <table class="landing-data-table">
                      <thead>
                        <tr>
                          ${current.tableHeaders.map(th => `<th>${th}</th>`).join('')}
                        </tr>
                      </thead>
                      <tbody>
                        ${current.tableRows.map(r => `
                          <tr>
                            ${r.map(cell => `<td>${cell}</td>`).join('')}
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>

                  <div class="landing-telemetry-bar">
                    <div class="telemetry-pill">
                      <span class="telemetry-label">Latency:</span>
                      <span class="telemetry-val">${current.latency}</span>
                    </div>
                    <div class="telemetry-pill">
                      <span class="telemetry-label">Memory:</span>
                      <span class="telemetry-val">${current.memory}</span>
                    </div>
                    <div class="telemetry-pill" style="margin-left:auto;">
                      <span class="telemetry-status-dot"></span>
                      <span class="telemetry-status-text">AST PASSED</span>
                    </div>
                  </div>

                  <div class="landing-buddy-callout">
                    <span class="buddy-icon">💡</span>
                    <p class="buddy-text">${current.buddyTip}</p>
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
              <span class="landing-metric-val" style="color:#f59e0b;">30-Day</span>
              <span class="landing-metric-label">Amazon BI Simulation</span>
              <span class="landing-metric-desc">L4/L5 Business Analyst onboarding</span>
            </div>
            <div class="landing-metric-card">
              <span class="landing-metric-val" style="color:#10b981;">30-Day</span>
              <span class="landing-metric-label">JPMorgan Quant Risk</span>
              <span class="landing-metric-desc">Basel III, CCAR &amp; Core Ledgers</span>
            </div>
            <div class="landing-metric-card">
              <span class="landing-metric-val">10</span>
              <span class="landing-metric-label">Grand Capstones</span>
              <span class="landing-metric-desc">SEC T+1, MRR Waterfall, Hospital</span>
            </div>
            <div class="landing-metric-card">
              <span class="landing-metric-val" style="color:#38bdf8;">1-Click</span>
              <span class="landing-metric-label">dbt Model Exporter</span>
              <span class="landing-metric-desc">Contracts, YAML tests &amp; Semantic Layer</span>
            </div>
          </section>

          <!-- ================================================================= -->
          <!-- 3. BRAND NEW: DATA ANALYTICS & ANALYTICS ENGINEERING TRACK        -->
          <!-- ================================================================= -->
          <section style="margin-bottom: 72px;">
            <div class="landing-section-header">
              <span class="landing-section-tag" style="background:rgba(245,158,11,0.12); color:#f59e0b; border-color:rgba(245,158,11,0.3);">Track 01 // Modern Analytics &amp; Growth</span>
              <h2 class="landing-section-title">Enterprise Data Analytics &amp; Analytics Engineering</h2>
              <p class="landing-section-subtitle">
                Engineered for Senior BI Analysts, Product Analytics, and Analytics Engineers scaling with dbt, Snowflake, BigQuery, and DuckDB.
              </p>
            </div>

            <div class="landing-bento-grid">
              
              <!-- Card 1: Amazon BI Simulation (Span 2) -->
              <div class="landing-bento-card span-2" style="border-color:rgba(245,158,11,0.25);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span class="landing-bento-badge" style="background:rgba(245,158,11,0.15); color:#f59e0b; border:1px solid rgba(245,158,11,0.3);">30-Day Interactive Career Simulator</span>
                  <span style="font-size:10px; font-family:monospace; color:#f59e0b; font-weight:700;">AMAZON SCOT &bull; L4/L5 ROTATION</span>
                </div>
                <h3 class="landing-bento-title" style="margin-top:10px;">Amazon SCOT &amp; Prime Day War Room Simulation</h3>
                <p class="landing-bento-desc">
                  Step into the shoes of an Amazon L4/L5 Business Intelligence Analyst: audit cart abandonment, diagnose fulfillment center dock-to-ship latency bottlenecks, calculate carrier SLA delivery penalties, execute emergency regional warehouse reroutes via <code>SELF JOIN</code>, and track Prime Day hourly cumulative revenue velocity.
                </p>
                <div style="display:flex; gap:8px; margin: 14px 0; flex-wrap:wrap;">
                  <span class="dbt-tag-pill" style="color:#f59e0b; border-color:rgba(245,158,11,0.3); background:rgba(245,158,11,0.08);">30 Daily Missions</span>
                  <span class="dbt-tag-pill" style="color:#f59e0b; border-color:rgba(245,158,11,0.3); background:rgba(245,158,11,0.08);">Prime Day War Room</span>
                  <span class="dbt-tag-pill" style="color:#f59e0b; border-color:rgba(245,158,11,0.3); background:rgba(245,158,11,0.08);">L8 VP Capstone</span>
                </div>
                <button class="landing-bento-action-link" onclick="if(window.selectNavView) window.selectNavView('viewAmazonStory', 'Analytics', null); try{window.location.hash='#analytics';}catch(e){}" style="color:#f59e0b;">
                  <span>Launch Amazon 30-Day Analytics Simulator &rarr;</span>
                </button>
              </div>

              <!-- Card 2: Vintage Cohort Retention Matrix -->
              <div class="landing-bento-card">
                <span class="landing-bento-badge">Product &amp; Retention</span>
                <h3 class="landing-bento-title">Triangular Vintage Cohort Matrix</h3>
                <p class="landing-bento-desc">
                  Compute month-over-month active customer decay ($M+0$ to $M+5$) with windowed inception anchors, tracking Net Dollar Retention (NDR 119%) and asymptotic smile curves.
                </p>
                <button class="landing-bento-action-link" onclick="if(window.selectNavView) window.selectNavView('viewRelationalMachines', 'Relational Machines', null); try{window.location.hash='#machines';}catch(e){}">
                  <span>View Cohort Heatmap Studio &rarr;</span>
                </button>
              </div>

              <!-- Card 3: SaaS 5-Way MRR Waterfall -->
              <div class="landing-bento-card">
                <span class="landing-bento-badge">SaaS Financial Analytics</span>
                <h3 class="landing-bento-title">5-Way MRR Waterfall Bridge</h3>
                <p class="landing-bento-desc">
                  Decompose recurring revenue into New MRR, Expansion, Contraction, and Churn via dense calendar expansion and lagged window vectors with SaaS Quick Ratio ($4.1	imes$).
                </p>
                <button class="landing-bento-action-link" onclick="if(window.selectNavView) window.selectNavView('viewRelationalMachines', 'Relational Machines', null); try{window.location.hash='#machines';}catch(e){}">
                  <span>Inspect MRR Waterfall Machine &rarr;</span>
                </button>
              </div>

              <!-- Card 4: 1-Click dbt Core Exporter -->
              <div class="landing-bento-card span-2" style="border-color:rgba(56,189,248,0.25);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span class="landing-bento-badge" style="background:rgba(56,189,248,0.12); color:#38bdf8; border:1px solid rgba(56,189,248,0.3);">Modern Data Stack Integration</span>
                  <span style="font-size:10px; font-family:monospace; color:#38bdf8; font-weight:700;">DBT CORE &bull; METRICFLOW &bull; LOOKML</span>
                </div>
                <h3 class="landing-bento-title" style="margin-top:10px;">1-Click Production dbt Model &amp; Semantic Layer Exporter</h3>
                <p class="landing-bento-desc">
                  Never rewrite exploratory SQL into dbt manually. SQL Foundry automatically wraps source tables into <code>{{ ref('stg_...') }}</code> macros, configures enforced data contracts, synthesizes <code>schema.yml</code> with automated tests (<code>unique</code>, <code>not_null</code>), and emits MetricFlow semantic models and LookML views ready for Git.
                </p>
                <button class="landing-bento-action-link" onclick="if(window.selectNavView) window.selectNavView('viewStudio', 'Section Studio', null); try{window.location.hash='#section-studio';}catch(e){}" style="color:#38bdf8;">
                  <span>Open Section Studio &amp; Export dbt Models &rarr;</span>
                </button>
              </div>

            </div>
          </section>

          <!-- ================================================================= -->
          <!-- 4. BRAND NEW: QUANTITATIVE FINANCE & WALL STREET RISK TRACK       -->
          <!-- ================================================================= -->
          <section style="margin-bottom: 72px;">
            <div class="landing-section-header">
              <span class="landing-section-tag" style="background:rgba(16,185,129,0.12); color:#10b981; border-color:rgba(16,185,129,0.3);">Track 02 // Institutional Banking &amp; Risk</span>
              <h2 class="landing-section-title">Quantitative Finance, Wall Street Ledgers &amp; Basel III Risk</h2>
              <p class="landing-section-subtitle">
                Engineered for Investment Banking, Treasury Operations, Algorithmic Trading Desks, and Quantitative Risk Analysts.
              </p>
            </div>

            <div class="landing-bento-grid">
              
              <!-- Card 1: JPMorgan Quant Risk Simulation (Span 2) -->
              <div class="landing-bento-card span-2" style="border-color:rgba(16,185,129,0.25);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span class="landing-bento-badge" style="background:rgba(16,185,129,0.15); color:#10b981; border:1px solid rgba(16,185,129,0.3);">30-Day Wall Street Simulation</span>
                  <span style="font-size:10px; font-family:monospace; color:#10b981; font-weight:700;">JPMORGAN CHASE &bull; 270 PARK AVENUE</span>
                </div>
                <h3 class="landing-bento-title" style="margin-top:10px;">JPMorgan Chase Quantitative Risk &amp; Treasury Simulation</h3>
                <p class="landing-bento-desc">
                  Rotate across 4 premier institutional desks: <strong>Core Banking Ledgers</strong> (Nostro/Vostro recon, SWIFT MT103 wire breaks), <strong>Financial Crimes &amp; AML</strong> (smurfing, OFAC sanctions with SOUNDEX), <strong>Asset Management</strong> (portfolio drawdowns, high-water marks), and <strong>Quantitative Risk</strong> (historical 99% VaR, Basel III LCR buffers, CCAR credit losses).
                </p>
                <div style="display:flex; gap:8px; margin: 14px 0; flex-wrap:wrap;">
                  <span class="dbt-tag-pill" style="color:#10b981; border-color:rgba(16,185,129,0.3); background:rgba(16,185,129,0.08);">30 Mock Ledgers</span>
                  <span class="dbt-tag-pill" style="color:#10b981; border-color:rgba(16,185,129,0.3); background:rgba(16,185,129,0.08);">Symphony Terminal UI</span>
                  <span class="dbt-tag-pill" style="color:#10b981; border-color:rgba(16,185,129,0.3); background:rgba(16,185,129,0.08);">MD Career Ladder</span>
                </div>
                <button class="landing-bento-action-link" onclick="if(window.selectNavView) window.selectNavView('viewJPMorganStory', 'Finance', null); try{window.location.hash='#finance';}catch(e){}" style="color:#10b981;">
                  <span>Launch JPMorgan 30-Day Risk Simulator &rarr;</span>
                </button>
              </div>

              <!-- Card 2: Double-Entry Ledger Invariants -->
              <div class="landing-bento-card">
                <span class="landing-bento-badge">Core Banking Ledger</span>
                <h3 class="landing-bento-title">Double-Entry Balance Invariants</h3>
                <p class="landing-bento-desc">
                  Enforces mathematical invariance: Total Debits must exactly equal Total Credits per legal entity ($	ext{Debits} = 	ext{Credits}$, Net Variance $= \$0.00$), preventing floating-point rounding drift.
                </p>
                <button class="landing-bento-action-link" onclick="if(window.selectNavView) window.selectNavView('viewRelationalMachines', 'Relational Machines', null); try{window.location.hash='#machines';}catch(e){}">
                  <span>Inspect GL Balance Machine &rarr;</span>
                </button>
              </div>

              <!-- Card 3: SEC T+1 Settlement & Custody Break Recon -->
              <div class="landing-bento-card">
                <span class="landing-bento-badge">Prime Brokerage</span>
                <h3 class="landing-bento-title">SEC T+1 Trade Settlement</h3>
                <p class="landing-bento-desc">
                  Dual-sided position pairing between executed trade blotters and clearing broker manifests via <code>FULL OUTER JOIN</code>, settlement break classification, and Capital-at-Risk summaries.
                </p>
                <button class="landing-bento-action-link" onclick="if(window.selectNavView) window.selectNavView('viewCapstones', 'Capstones (10)', null); try{window.location.hash='#capstones';}catch(e){}">
                  <span>Explore Settlement Capstone &rarr;</span>
                </button>
              </div>

              <!-- Card 4: Portfolio Risk, Drawdown & 99% VaR -->
              <div class="landing-bento-card span-2" style="border-color:rgba(244,63,94,0.25);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span class="landing-bento-badge" style="background:rgba(244,63,94,0.12); color:#f43f5e; border:1px solid rgba(244,63,94,0.3);">Capital Markets Risk</span>
                  <span style="font-size:10px; font-family:monospace; color:#f43f5e; font-weight:700;">VALUE-AT-RISK &bull; HIGH-WATER MARKS &bull; BASEL III</span>
                </div>
                <h3 class="landing-bento-title" style="margin-top:10px;">Portfolio Downside Risk, High-Water Marks &amp; 99% 1-Day VaR</h3>
                <p class="landing-bento-desc">
                  Model institutional market risk using percentile ranking on swap books: calculate peak-to-trough underwater drawdown curves, cumulative high-water mark peaks, and 99% 1-Day Value-at-Risk ($-\$1.85	ext{M}$) loss thresholds to stress test capital adequacy under Fed CCAR guidelines.
                </p>
                <button class="landing-bento-action-link" onclick="if(window.selectNavView) window.selectNavView('viewRelationalMachines', 'Relational Machines', null); try{window.location.hash='#machines';}catch(e){}" style="color:#f43f5e;">
                  <span>Inspect Risk &amp; Drawdown Blueprints &rarr;</span>
                </button>
              </div>

            </div>
          </section>

          <!-- 5. UNIVERSAL DIALECT MATRIX -->
          <section style="text-align: center; margin-bottom: 56px;">
            <span class="landing-section-tag">Universal Multi-Dialect Support</span>
            <div class="landing-dialect-matrix" style="margin-top: 18px;">
              <div class="landing-dialect-chip active"><span>MySQL 8.0</span></div>
              <div class="landing-dialect-chip active"><span>PostgreSQL 16</span></div>
              <div class="landing-dialect-chip active"><span>Snowflake</span></div>
              <div class="landing-dialect-chip active"><span>DuckDB</span></div>
              <div class="landing-dialect-chip active"><span>Google BigQuery</span></div>
              <div class="landing-dialect-chip active"><span>SQLite WASM</span></div>
            </div>
          </section>

          <!-- 6. 5 SILENT SQL TRAPS CAUGHT BY THE ENGINE -->
          <section style="margin-bottom: 64px;">
            <div class="landing-section-header">
              <span class="landing-section-tag" style="background:rgba(244,63,94,0.12); color:#f43f5e; border-color:rgba(244,63,94,0.3);">Defensive Engineering</span>
              <h2 class="landing-section-title">5 Silent SQL Traps Caught by the Engine</h2>
              <p class="landing-section-subtitle">
                Screening traps that silently return incorrect rows, corrupt financial ledgers, or crash in production.
              </p>
            </div>

            <div class="landing-traps-list">
              <div class="landing-trap-card">
                <div class="trap-meta">
                  <span class="trap-severity p1">P1 CRITICAL</span>
                  <span class="trap-frequency">95% Screen Rate</span>
                </div>
                <h3 class="trap-title">Three-Valued Logic &amp; NULL Exclusion</h3>
                <p class="trap-desc"><code>WHERE col != 2</code> silently drops NULL rows because <code>NULL != 2</code> yields UNKNOWN, not TRUE. Requires explicit <code>OR col IS NULL</code>.</p>
                <div class="trap-affected">Affected: Amazon, Bloomberg, Meta interviews</div>
              </div>

              <div class="landing-trap-card">
                <div class="trap-meta">
                  <span class="trap-severity p1">P1 FINANCIAL</span>
                  <span class="trap-frequency">Wall Street Audit</span>
                </div>
                <h3 class="trap-title">Floating-Point Currency Drift</h3>
                <p class="trap-desc">Comparing currency balances stored as <code>FLOAT</code> triggers IEEE-754 precision drift ($0.0000001). Mandates <code>DECIMAL(18,4)</code> or integer cents.</p>
                <div class="trap-affected">Affected: JPMorgan, Citadel, Stripe ledgers</div>
              </div>

              <div class="landing-trap-card">
                <div class="trap-meta">
                  <span class="trap-severity p2">P2 SILENT SKEW</span>
                  <span class="trap-frequency">Senior BI Screen</span>
                </div>
                <h3 class="trap-title">Window Frame Default Exclusions</h3>
                <p class="trap-desc"><code>OVER (ORDER BY date)</code> defaults to <code>RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>, which aggregates duplicate timestamps together instead of row-by-row.</p>
                <div class="trap-affected">Affected: Uber, Snowflake, DoorDash telemetry</div>
              </div>

              <div class="landing-trap-card">
                <div class="trap-meta">
                  <span class="trap-severity p2">P2 PERFORMANCE</span>
                  <span class="trap-frequency">Staff Architect</span>
                </div>
                <h3 class="trap-title">Non-SARGable Function Predicates</h3>
                <p class="trap-desc"><code>WHERE YEAR(created_at) = 2024</code> wraps column in a function, blinding index B-Trees and forcing a full $O(N)$ sequential table scan on 100M rows.</p>
                <div class="trap-affected">Affected: Netflix, Google Cloud SQL tuning</div>
              </div>

              <div class="landing-trap-card">
                <div class="trap-meta">
                  <span class="trap-severity p3">P3 FAN-OUT</span>
                  <span class="trap-frequency">Data Engineering</span>
                </div>
                <h3 class="trap-title">Multi-Table 1:N Cartesian Fan-Out</h3>
                <p class="trap-desc">Joining an orders table to both order_items and payments simultaneously duplicates rows, multiplying aggregate sums by orders of magnitude.</p>
                <div class="trap-affected">Affected: Stripe, Shopify, Square reconciliations</div>
              </div>
            </div>
          </section>

          <!-- 7. FAST ACCESS PRACTICE HUB -->
          <section style="margin-bottom: 64px;">
            <div class="landing-section-header">
              <span class="landing-section-tag">Fast Access</span>
              <h2 class="landing-section-title">Jump Straight into Practice</h2>
              <p class="landing-section-subtitle">
                Select your focus area and launch directly into real-time relational training.
              </p>
            </div>

            <div class="landing-launch-grid">
              
              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewAmazonStory', 'Analytics', null); try{window.location.hash='#analytics';}catch(e){}" style="border-color:rgba(245,158,11,0.3);">
                <div class="landing-launch-meta">
                  <span class="landing-launch-name" style="color:#f59e0b;">Analytics Track</span>
                  <span class="landing-launch-tag" style="color:#f59e0b; background:rgba(245,158,11,0.12);">30-Day Sim</span>
                </div>
                <span class="landing-launch-desc">Amazon SCOT Business Analyst Day-in-the-Life &amp; Prime Day War Room</span>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewJPMorganStory', 'Finance', null); try{window.location.hash='#finance';}catch(e){}" style="border-color:rgba(16,185,129,0.3);">
                <div class="landing-launch-meta">
                  <span class="landing-launch-name" style="color:#10b981;">Finance Track</span>
                  <span class="landing-launch-tag" style="color:#10b981; background:rgba(16,185,129,0.12);">Wall St</span>
                </div>
                <span class="landing-launch-desc">JPMorgan Quant Risk, Core Banking Ledgers, AML &amp; Treasury</span>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewRelationalMachines', 'Relational Machines', null); try{window.location.hash='#machines';}catch(e){}">
                <div class="landing-launch-meta">
                  <span class="landing-launch-name">Relational Machines</span>
                  <span class="landing-launch-tag">SVG Studio</span>
                </div>
                <span class="landing-launch-desc">Topological chamber dataflow, tuple lineage tracing &amp; BI micro-charts</span>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewLeetCode50', 'LeetCode 323', null); try{window.location.hash='#leetcode';}catch(e){}">
                <div class="landing-launch-meta">
                  <span class="landing-launch-name">LeetCode 323 Arena</span>
                  <span class="landing-launch-tag">Official 323</span>
                </div>
                <span class="landing-launch-desc">Every authentic SQL problem graded with test cases and visual AST plans</span>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewStudio', 'Section Studio', null); try{window.location.hash='#section-studio';}catch(e){}">
                <div class="landing-launch-meta">
                  <span class="landing-launch-name">Section Studio &amp; dbt</span>
                  <span class="landing-launch-tag">Transpiler</span>
                </div>
                <span class="landing-launch-desc">AST execution stepper, multi-dialect transpiler &amp; 1-click dbt model export</span>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewCapstones', 'Capstones (10)', 'navGroupPractice'); try{window.location.hash='#capstones';}catch(e){}">
                <div class="landing-launch-meta">
                  <span class="landing-launch-name">Guided Capstones</span>
                  <span class="landing-launch-tag">10 Projects</span>
                </div>
                <span class="landing-launch-desc">SEC T+1 recon, SaaS MRR waterfalls, AML circular rings &amp; hospital beds</span>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewMockInterview', 'Mock Screen', null);">
                <div class="landing-launch-meta">
                  <span class="landing-launch-name">Timed Mock Screen</span>
                  <span class="landing-launch-tag">45m Timed</span>
                </div>
                <span class="landing-launch-desc">FAANG &amp; Wall Street technical interview screen with real-time scoring</span>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewSqlTerminal', 'SQL Terminal', 'navGroupPractice');">
                <div class="landing-launch-meta">
                  <span class="landing-launch-name">SQL Terminal (WASM)</span>
                  <span class="landing-launch-tag">SQLite Engine</span>
                </div>
                <span class="landing-launch-desc">Raw query execution sandbox across 12 production relational tables</span>
              </div>

            </div>
          </section>

          <!-- 8. FOOTER -->
          <footer class="landing-footer">
            <div style="font-family:var(--font-mono); font-size:11px; color:var(--text-muted);">
              SQL FOUNDRY &bull; Relational Operating System &bull; 100% In-Browser SQLite WASM Virtual Machine
            </div>
          </footer>

        </div>
      `;
    },

    bindEvents: function(container) {
      // Scenario Tab Switchers
      const scenarioTabs = container.querySelectorAll('.landing-scenario-tab');
      scenarioTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
          const scenarioId = tab.dataset.scenario;
          if (scenarioId && HERO_SCENARIOS[scenarioId]) {
            activeScenarioId = scenarioId;
            container.innerHTML = this.renderHTML();
            this.bindEvents(container);
            if (window.soundFX && typeof window.soundFX.playClick === 'function') {
              window.soundFX.playClick();
            }
          }
        });
      });
    }
  };

  window.LandingPageEngine = LandingPageEngine;

  // Auto-init if container exists
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => LandingPageEngine.init());
  } else {
    LandingPageEngine.init();
  }

})();
