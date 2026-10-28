/**
 * SQL FOUNDRY - PRODUCT LANDING PAGE ENGINE
 * Modulify Hybrid (Vesper + Black Plus) Showcase
 * Laser Neon Red Edition • Clean Solid Typography • Multi-Scenario Hero Sandbox
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
      title: 'Fraud Detection (Gaps & Islands)',
      filename: 'fraud_velocity_burst_detector.sql',
      dataset: 'fraud_audit_stream (High-Frequency Ledger)',
      latency: '0.019ms',
      memory: '0.0KB',
      rowsCount: '3 suspicious bursts flagged',
      statusText: '3 Velocity Bursts Caught (Delta < 120s & Amount >= $5,000)',
      codeHtml: `<span class="landing-cm">-- Detect high-velocity transaction bursts (> $5,000 within 2 minutes)</span>
<span class="landing-kw">WITH</span> numbered_tx <span class="landing-kw">AS</span> (
  <span class="landing-kw">SELECT</span> tx_id, user_id, amount, created_at,
    <span class="landing-fn">LAG</span>(created_at) <span class="landing-kw">OVER</span> (
      <span class="landing-kw">PARTITION BY</span> user_id 
      <span class="landing-kw">ORDER BY</span> created_at
    ) <span class="landing-kw">AS</span> prev_tx_time
  <span class="landing-kw">FROM</span> fraud_audit_stream
)
<span class="landing-kw">SELECT</span> user_id, amount, created_at,
  <span class="landing-fn">ROUND</span>((<span class="landing-fn">JULIANDAY</span>(created_at) - <span class="landing-fn">JULIANDAY</span>(prev_tx_time)) * <span class="landing-num">86400</span>) <span class="landing-kw">AS</span> delta_sec
<span class="landing-kw">FROM</span> numbered_tx
<span class="landing-kw">WHERE</span> delta_sec &lt;= <span class="landing-num">120</span> <span class="landing-kw">AND</span> amount &gt;= <span class="landing-num">5000</span>;`,
      tableHeaders: ['user_id', 'amount', 'created_at', 'delta_sec'],
      tableRows: [
        ['USR_9012', '$9,450', '2026-10-25 14:02:11', '34s'],
        ['USR_9012', '$8,900', '2026-10-25 14:03:02', '51s'],
        ['USR_4401', '$12,000', '2026-10-25 16:45:10', '18s']
      ],
      buddyTip: 'Fraud autopsy triggered! LAG() offset vectors detect rapid bursts without expensive self-joins.'
    },
    scenario3: {
      id: 'scenario3',
      title: '7-Day Rolling Revenue (Sliding Frames)',
      filename: 'stripe_rolling_metric_cockpit.sql',
      dataset: 'stripe_billing_metrics (Daily ARR Stream)',
      latency: '0.011ms',
      memory: '0.0KB',
      rowsCount: '5 rows returned',
      statusText: 'Sliding Window Aggregation Calculated (Rows Preceding Frame)',
      codeHtml: `<span class="landing-cm">-- 7-Day Moving Average & Cumulative Revenue Run-Rate</span>
<span class="landing-kw">SELECT</span> 
  order_date, daily_revenue,
  <span class="landing-fn">ROUND</span>(<span class="landing-fn">AVG</span>(daily_revenue) <span class="landing-kw">OVER</span> (
    <span class="landing-kw">ORDER BY</span> order_date 
    <span class="landing-kw">ROWS BETWEEN</span> <span class="landing-num">6</span> <span class="landing-kw">PRECEDING AND CURRENT ROW</span>
  ), <span class="landing-num">2</span>) <span class="landing-kw">AS</span> rolling_7d_avg,
  <span class="landing-fn">SUM</span>(daily_revenue) <span class="landing-kw">OVER</span> (
    <span class="landing-kw">ORDER BY</span> order_date
  ) <span class="landing-kw">AS</span> cumulative_arr
<span class="landing-kw">FROM</span> stripe_billing_metrics
<span class="landing-kw">ORDER BY</span> order_date <span class="landing-kw">DESC</span> <span class="landing-kw">LIMIT</span> <span class="landing-num">5</span>;`,
      tableHeaders: ['order_date', 'daily_revenue', 'rolling_7d_avg', 'cumulative_arr'],
      tableRows: [
        ['2026-10-24', '$48,200', '$44,150.00', '$1,248,500'],
        ['2026-10-23', '$45,800', '$43,210.00', '$1,200,300'],
        ['2026-10-22', '$42,100', '$42,500.00', '$1,154,500'],
        ['2026-10-21', '$41,900', '$41,900.00', '$1,112,400'],
        ['2026-10-20', '$46,300', '$41,200.00', '$1,070,500']
      ],
      buddyTip: 'Moving frame verified! ROWS BETWEEN 6 PRECEDING smooths out daily revenue spikes.'
    },
    scenario4: {
      id: 'scenario4',
      title: 'Amazon Prime Day (Anti-Join Churn)',
      filename: 'amazon_churn_detector.sql',
      dataset: 'amazon_prime_orders (2.4M Historical Orders)',
      latency: '0.016ms',
      memory: '0.0KB',
      rowsCount: '4 churned customer accounts',
      statusText: 'Anti-Join Completed: Found Day-1 Buyers with Zero 30-Day Activity',
      codeHtml: `<span class="landing-cm">-- Find customers who made a Day-1 purchase but 0 purchases in 30 days</span>
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
      buddyTip: 'Anti-Join mastered! Using LEFT JOIN ... WHERE right.key IS NULL is sargable and outperforms NOT IN.'
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
              <span class="landing-pulse-dot"></span>
              <span>Next-Gen SQL Engineering Studio &bull; SQLite WASM 3.45 Ready &bull; Zero Server Latency</span>
            </div>

            <h1 class="landing-hero-title">
              Master Relational Engineering.<br>
              <span class="landing-hero-highlight">Crack Tier-1 SQL Interviews.</span>
            </h1>

            <p class="landing-hero-subtitle">
              The desktop-grade interactive relational workspace. 323 executable LeetCode challenges, 70+ institutional company tracks, in-browser SQLite WASM execution, and Sir Bloops AI co-pilot. Built for engineers who need total SQL mastery.
            </p>

            <div class="landing-cta-strip">
              <button class="landing-cta-primary" id="btnHeroLaunchCourse" onclick="if(window.selectNavView) window.selectNavView('viewMasteryCourse', 'Course', null)">
                <span>10-Phase SQL Mastery Course</span>
              </button>
              <button class="landing-cta-secondary" id="btnHeroLaunchLeetCode" onclick="if(window.selectNavView) window.selectNavView('viewLeetCode50', 'LeetCode 323', null)">
                <span>LeetCode 323 Arena</span>
              </button>
              <button class="landing-cta-secondary" onclick="if(window.selectNavView) window.selectNavView('viewCompanyHub', 'Companies &amp; Domains', null)">
                <span>70+ Company Tracks</span>
              </button>
              <button class="landing-cta-secondary" onclick="if(window.selectNavView) window.selectNavView('viewMockInterview', 'Mock Screen', null)">
                <span>45m Mock Screen</span>
              </button>
              <button class="landing-cta-secondary" id="btnHeroLaunchStudio" onclick="if(window.selectNavView) window.selectNavView('viewStudio', 'Section Studio', null)">
                <span>Section Studio</span>
              </button>
              <button class="landing-cta-secondary" onclick="if(window.selectNavView) window.selectNavView('viewSqlTerminal', 'SQL Terminal', null)">
                <span>SQLite WASM Terminal</span>
              </button>
            </div>

            <!-- INTERACTIVE HERO CODE BENTO CARD WITH MULTI-SCENARIO SWITCHER -->
            <div class="landing-hero-widget-card">
              <!-- Topbar -->
              <div class="landing-widget-topbar">
                <div class="landing-widget-dots">
                  <span class="landing-dot red"></span>
                  <span class="landing-dot yellow"></span>
                  <span class="landing-dot green"></span>
                </div>
                <div class="landing-widget-filename" id="heroWidgetFilename">${current.filename}</div>
                <div class="landing-widget-status-badge">
                  <span>●</span> <span>SQLite WASM Active</span>
                </div>
              </div>

              <!-- Multi-Scenario Switcher Tabs -->
              <div class="landing-scenario-tabs" id="heroScenarioTabs">
                <button class="landing-scenario-btn ${activeScenarioId === 'scenario1' ? 'active' : ''}" data-scenario="scenario1">
                  <span>LeetCode #185</span>
                </button>
                <button class="landing-scenario-btn ${activeScenarioId === 'scenario2' ? 'active' : ''}" data-scenario="scenario2">
                  <span>Fraud Detection</span>
                </button>
                <button class="landing-scenario-btn ${activeScenarioId === 'scenario3' ? 'active' : ''}" data-scenario="scenario3">
                  <span>7-Day Rolling Revenue</span>
                </button>
                <button class="landing-scenario-btn ${activeScenarioId === 'scenario4' ? 'active' : ''}" data-scenario="scenario4">
                  <span>Amazon Churn Anti-Join</span>
                </button>
              </div>

              <div class="landing-widget-body">
                <pre class="landing-code-preview"><code id="heroCodeDisplay">${current.codeHtml}</code></pre>
              </div>

              <div class="landing-widget-action-row">
                <div style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono);" id="heroDatasetLabel">
                  Dataset: <code>${current.dataset}</code>
                </div>
                <div style="display: flex; gap: 8px;">
                  <button class="landing-run-btn" id="btnHeroRunQuery">
                    <span>Run Query Live</span>
                  </button>
                  <button class="landing-cta-secondary" style="padding: 5px 12px; font-size: 11px;" id="btnHeroReset">
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              <!-- Live Execution Result Output -->
              <div class="landing-widget-result-box" id="landingHeroResultBox">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; font-size: 11px; font-family: var(--font-mono);">
                  <span style="color: #10b981; font-weight: 700;" id="heroResultStatus">${current.statusText}</span>
                  <span style="color: var(--text-muted);" id="heroResultMeta">Latency: ${current.latency} &bull; Memory: ${current.memory}</span>
                </div>
                <table class="landing-table" id="heroResultTable">
                  <thead>
                    <tr>${current.tableHeaders.map(h => `<th>${h}</th>`).join('')}</tr>
                  </thead>
                  <tbody>
                    ${current.tableRows.map(row => `<tr>${row.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <!-- 2. METRICS TICKER STRIP -->
          <section class="landing-metrics-strip">
            <div class="landing-metric-card">
              <div class="landing-metric-val">323</div>
              <div class="landing-metric-label">LeetCode SQL Problems</div>
              <div class="landing-metric-desc">100% executable with tests &amp; AST diffs</div>
            </div>
            <div class="landing-metric-card">
              <div class="landing-metric-val">70+</div>
              <div class="landing-metric-label">Top Employer Tracks</div>
              <div class="landing-metric-desc">Meta, Google, Amazon, Citadel, Stripe</div>
            </div>
            <div class="landing-metric-card">
              <div class="landing-metric-val">2,540</div>
              <div class="landing-metric-label">Incident Case Studies</div>
              <div class="landing-metric-desc">Production downtime &amp; forensic dossiers</div>
            </div>
            <div class="landing-metric-card">
              <div class="landing-metric-val">1,850</div>
              <div class="landing-metric-label">Interactive Quests</div>
              <div class="landing-metric-desc">Gamified token trays &amp; logic puzzles</div>
            </div>
            <div class="landing-metric-card">
              <div class="landing-metric-val">0.00ms</div>
              <div class="landing-metric-label">Server Latency</div>
              <div class="landing-metric-desc">100% client-side SQLite WebAssembly</div>
            </div>
          </section>

          <!-- 3. DIALECT COMPATIBILITY MATRIX -->
          <section style="text-align: center; margin-bottom: 48px;">
            <span class="landing-section-tag">Universal Dialect Support</span>
            <div class="landing-dialect-matrix">
              <div class="landing-dialect-chip"><span>MySQL 8.0</span></div>
              <div class="landing-dialect-chip"><span>PostgreSQL 16</span></div>
              <div class="landing-dialect-chip">🪶 <span>SQLite WASM 3.45</span></div>
              <div class="landing-dialect-chip"><span>Snowflake SQL</span></div>
              <div class="landing-dialect-chip"><span>Google BigQuery</span></div>
            </div>
          </section>

          <!-- 4. MODULIFY VESPER BENTO GRID FEATURES SHOWCASE -->
          <section style="margin-bottom: 64px;">
            <div class="landing-section-header">
              <span class="landing-section-tag">Feature Architecture</span>
              <h2 class="landing-section-title">Engineered for Technical Interview Mastery</h2>
              <p class="landing-section-subtitle">
                Everything you need to master production SQL, internal database engines, and technical screening rounds.
              </p>
            </div>

            <div class="landing-bento-grid">
              <!-- Bento Card 1: WASM Engine (Wide Span 2) -->
              <div class="landing-bento-card span-2">
                <div>
                  <span class="landing-bento-badge">Execution Engine</span>
                  <div class="landing-bento-icon" style="display:none;"></div>
                  <h3 class="landing-bento-title">In-Browser SQLite WASM Virtual Machine</h3>
                  <p class="landing-bento-desc">
                    True relational database runtime compiled to WebAssembly. Execute full queries locally inside your browser with zero remote latency, no Docker daemon, and 100% offline capability. Ships with 12 loaded enterprise schema tables.
                  </p>
                </div>
                <button class="landing-bento-action-link" onclick="if(window.selectNavView) window.selectNavView('viewSqlTerminal', 'SQL Terminal', null)">
                  <span>Launch SQLite Terminal &rarr;</span>
                </button>
              </div>

              <!-- Bento Card 2: LeetCode Mega-Vault -->
              <div class="landing-bento-card">
                <div>
                  <span class="landing-bento-badge">Interview Vault</span>
                  <div class="landing-bento-icon" style="display:none;"></div>
                  <h3 class="landing-bento-title">323 LeetCode Problems</h3>
                  <p class="landing-bento-desc">
                    Every official SQL challenge categorized by 11 conceptual pillars. Includes golden canonical solutions, line-by-line clause explanations, and automated test-case evaluation.
                  </p>
                </div>
                <button class="landing-bento-action-link" onclick="if(window.selectNavView) window.selectNavView('viewLeetCode50', 'LeetCode 323', null)">
                  <span>Enter LeetCode Arena &rarr;</span>
                </button>
              </div>

              <!-- Bento Card 3: 70+ Company Tracks -->
              <div class="landing-bento-card">
                <div>
                  <span class="landing-bento-badge">Institutional Prep</span>
                  <div class="landing-bento-icon" style="display:none;"></div>
                  <h3 class="landing-bento-title">70+ Employer Mastery Hub</h3>
                  <p class="landing-bento-desc">
                    10 core business domains (FinTech, Quant, E-Commerce, Social, Streaming, Cloud, HealthTech) with company-specific screening formats and interview defense notes.
                  </p>
                </div>
                <button class="landing-bento-action-link" onclick="if(window.selectNavView) window.selectNavView('viewCompanyHub', 'Companies &amp; Domains', null)">
                  <span>Browse Company Hub &rarr;</span>
                </button>
              </div>

              <!-- Bento Card 4: Mock Screen -->
              <div class="landing-bento-card">
                <div>
                  <span class="landing-bento-badge">Simulation</span>
                  <div class="landing-bento-icon" style="display:none;"></div>
                  <h3 class="landing-bento-title">45-Minute Timed Technical Screen</h3>
                  <p class="landing-bento-desc">
                    Real-time technical interview simulator with countdown clock, randomized problem sets, hidden edge-case traps, and automated scoring rubrics.
                  </p>
                </div>
                <button class="landing-bento-action-link" onclick="if(window.selectNavView) window.selectNavView('viewMockInterview', 'Mock Screen', null)">
                  <span>Start Timed Screen &rarr;</span>
                </button>
              </div>

              <!-- Bento Card 5: Sir Bloops Co-Pilot -->
              <div class="landing-bento-card">
                <div>
                  <span class="landing-bento-badge">AI Co-Pilot</span>
                  <div class="landing-bento-icon" style="display:none;"></div>
                  <h3 class="landing-bento-title">Sir Bloops Diagnostic Autopsy</h3>
                  <p class="landing-bento-desc">
                    Intelligent diagnostic companion that analyzes query execution plans. Catches Three-Valued Logic NULL gotchas, Cartesian explosions, and non-sargable WHERE filters.
                  </p>
                </div>
                <button class="landing-bento-action-link" onclick="if(window.SQL_BUDDY) window.SQL_BUDDY.say('Greetings! I am Sir Bloops, your relational co-pilot. I am ready to inspect any query you write!', 5000, 'celebrate');">
                  <span>Summon Sir Bloops &rarr;</span>
                </button>
              </div>
            </div>
          </section>

          <!-- 5. TOP 5 SILENT SQL TRAPS SECTION -->
          <section style="margin-bottom: 64px;">
            <div class="landing-section-header">
              <span class="landing-section-tag">Defensive Engineering</span>
              <h2 class="landing-section-title">5 Silent SQL Traps Caught by the Engine</h2>
              <p class="landing-section-subtitle">
                Most candidates fail SQL interviews not on syntax, but on silent edge-case traps that return incorrect row counts without producing an error.
              </p>
            </div>

            <div class="landing-traps-grid">
              <!-- Trap 1 -->
              <div class="landing-trap-card">
                <div class="landing-trap-header">
                  <span class="landing-trap-badge">TRAP 01</span>
                  <span class="landing-trap-title">NULL with NOT IN</span>
                </div>
                <p class="landing-trap-desc">
                  If the subquery returns even a single NULL, <code>NOT IN</code> evaluates to UNKNOWN and returns 0 rows! Always use <code>NOT EXISTS</code>.
                </p>
                <div class="landing-trap-code-snip">
                  <span style="color:#ef4444;">-- FAILS:</span> WHERE id NOT IN (SELECT id FROM t)<br>
                  <span style="color:#10b981;">-- SAFE:</span> WHERE NOT EXISTS (...)
                </div>
              </div>

              <!-- Trap 2 -->
              <div class="landing-trap-card">
                <div class="landing-trap-header">
                  <span class="landing-trap-badge">TRAP 02</span>
                  <span class="landing-trap-title">COUNT(*) vs COUNT(col)</span>
                </div>
                <p class="landing-trap-desc">
                  <code>COUNT(*)</code> counts all rows including NULLs. <code>COUNT(col)</code> strictly excludes NULLs, silently skewing ratios.
                </p>
                <div class="landing-trap-code-snip">
                  <span style="color:#ef4444;">-- WRONG RATIO:</span> COUNT(bonus) / COUNT(*)<br>
                  <span style="color:#10b981;">-- CORRECT:</span> AVG(COALESCE(bonus, 0))
                </div>
              </div>

              <!-- Trap 3 -->
              <div class="landing-trap-card">
                <div class="landing-trap-header">
                  <span class="landing-trap-badge">TRAP 03</span>
                  <span class="landing-trap-title">Ties in RANK() vs DENSE_RANK()</span>
                </div>
                <p class="landing-trap-desc">
                  <code>RANK()</code> skips numbers after ties (1, 2, 2, 4), causing <code>WHERE rank = 3</code> to return 0 rows! Use <code>DENSE_RANK()</code>.
                </p>
                <div class="landing-trap-code-snip">
                  <span style="color:#ef4444;">-- SKIPS:</span> 1, 2, 2, 4 (No 3rd place!)<br>
                  <span style="color:#10b981;">-- CONTINUOUS:</span> 1, 2, 2, 3 (Clean top-3)
                </div>
              </div>

              <!-- Trap 4 -->
              <div class="landing-trap-card">
                <div class="landing-trap-header">
                  <span class="landing-trap-badge">TRAP 04</span>
                  <span class="landing-trap-title">Non-Sargable WHERE Functions</span>
                </div>
                <p class="landing-trap-desc">
                  Wrapping indexed columns in functions (like <code>YEAR(created_at)</code>) breaks B-Tree index seeks, forcing a 10M row table scan.
                </p>
                <div class="landing-trap-code-snip">
                  <span style="color:#ef4444;">-- FULL SCAN:</span> WHERE YEAR(dt) = 2026<br>
                  <span style="color:#10b981;">-- INDEX SEEK:</span> WHERE dt &gt;= '2026-01-01'
                </div>
              </div>

              <!-- Trap 5 -->
              <div class="landing-trap-card">
                <div class="landing-trap-header">
                  <span class="landing-trap-badge">TRAP 05</span>
                  <span class="landing-trap-title">Accidental Cartesian Joins</span>
                </div>
                <p class="landing-trap-desc">
                  Joining on non-unique foreign keys without a secondary qualifier blows up row counts exponentially, freezing production servers.
                </p>
                <div class="landing-trap-code-snip">
                  <span style="color:#ef4444;">-- 10k &times; 10k =</span> 100,000,000 rows!<br>
                  <span style="color:#10b981;">-- SAFE:</span> Pre-aggregate via modular CTE
                </div>
              </div>
            </div>
          </section>

          <!-- 6. QUICK-LAUNCH WORKSPACES TILES -->
          <section style="margin-bottom: 64px;">
            <div class="landing-section-header">
              <span class="landing-section-tag">Fast Access</span>
              <h2 class="landing-section-title">Jump Straight into Practice</h2>
              <p class="landing-section-subtitle">
                Select any drill vault or interactive lab to start practicing immediately.
              </p>
            </div>

            <div class="landing-launch-grid">
              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewLeetCode50', 'LeetCode 323', null)">
                <span class="landing-launch-icon" style="opacity:0.4;">&bull;</span>
                <div class="landing-launch-meta">
                  <div class="landing-launch-name">LeetCode 323 Arena</div>
                  <div class="landing-launch-tag">323 Problems &bull; Split IDE</div>
                </div>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewStudio', 'Studio', null)">
                <span class="landing-launch-icon" style="opacity:0.4;">&bull;</span>
                <div class="landing-launch-meta">
                  <div class="landing-launch-name">Query Execution Studio</div>
                  <div class="landing-launch-tag">Monaco &bull; Schema Inspector</div>
                </div>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewSqlTerminal', 'SQL Terminal', null)">
                <span class="landing-launch-icon" style="opacity:0.4;">&bull;</span>
                <div class="landing-launch-meta">
                  <div class="landing-launch-name">SQLite WASM Terminal</div>
                  <div class="landing-launch-tag">12 Enterprise Tables</div>
                </div>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewMcqs', 'MCQs', 'navGroupPractice')">
                <span class="landing-launch-icon" style="opacity:0.4;">&bull;</span>
                <div class="landing-launch-meta">
                  <div class="landing-launch-name">MCQs Vault (2.1k)</div>
                  <div class="landing-launch-tag">Interview Traps &bull; Flashcards</div>
                </div>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewSyntaxGym', 'Syntax Gym', 'navGroupPractice')">
                <span class="landing-launch-icon" style="opacity:0.4;">&bull;</span>
                <div class="landing-launch-meta">
                  <div class="landing-launch-name">Syntax Gym (1.7k)</div>
                  <div class="landing-launch-tag">Muscle Memory Drills</div>
                </div>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewCases', 'Case Studies', 'navGroupPractice')">
                <span class="landing-launch-icon" style="opacity:0.4;">&bull;</span>
                <div class="landing-launch-meta">
                  <div class="landing-launch-name">Case Studies (2,540)</div>
                  <div class="landing-launch-tag">Real Production Incidents</div>
                </div>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewQuests', 'Quests', 'navGroupExplore')">
                <span class="landing-launch-icon" style="opacity:0.4;">&bull;</span>
                <div class="landing-launch-meta">
                  <div class="landing-launch-name">Interactive Quests</div>
                  <div class="landing-launch-tag">1,850 Puzzles &bull; Token Trays</div>
                </div>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewWindowMatrix', 'Window Cockpit', 'navGroupExplore')">
                <span class="landing-launch-icon" style="opacity:0.4;">&bull;</span>
                <div class="landing-launch-meta">
                  <div class="landing-launch-name">Window Functions Cockpit</div>
                  <div class="landing-launch-tag">Sliding Frames &bull; Offsets</div>
                </div>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewTactileEngine', 'SQL Machine', 'navGroupExplore')">
                <span class="landing-launch-icon" style="opacity:0.4;">&bull;</span>
                <div class="landing-launch-meta">
                  <div class="landing-launch-name">Tactile SQL Machine</div>
                  <div class="landing-launch-tag">Fig. 16 Physical Engine</div>
                </div>
              </div>

              <div class="landing-launch-tile" onclick="if(window.openCurriculumReader) window.openCurriculumReader(1)">
                <span class="landing-launch-icon" style="opacity:0.4;">&bull;</span>
                <div class="landing-launch-meta">
                  <div class="landing-launch-name">Theory Compendium</div>
                  <div class="landing-launch-tag">21 In-Depth Modules</div>
                </div>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewLearningJourney', 'Learning Journey', 'navGroupExplore')">
                <span class="landing-launch-icon" style="opacity:0.4;">&bull;</span>
                <div class="landing-launch-meta">
                  <div class="landing-launch-name">20-Day Learning Journey</div>
                  <div class="landing-launch-tag">Systematic Daily Curriculum</div>
                </div>
              </div>

              <div class="landing-launch-tile" onclick="if(window.openFlashcardVault) window.openFlashcardVault()">
                <span class="landing-launch-icon" style="opacity:0.4;">&bull;</span>
                <div class="landing-launch-meta">
                  <div class="landing-launch-name">SRS Trap Memory Gym</div>
                  <div class="landing-launch-tag">Leitner Spaced Repetition</div>
                </div>
              </div>
            </div>
          </section>

          <!-- 7. FOOTER -->
          <footer class="landing-footer">
            <div>
              <strong>SQL Foundry v4.2</strong> &bull; Production Relational Engineering Studio
            </div>
            <div>
              Supported Dialects: <code>MySQL 8.0</code> &bull; <code>PostgreSQL 16</code> &bull; <code>SQLite WASM</code> &bull; <code>Snowflake</code> &bull; <code>BigQuery</code>
            </div>
          </footer>
        </div>
      `;
    },

    bindEvents: function(container) {
      const btnRun = container.querySelector('#btnHeroRunQuery');
      const btnReset = container.querySelector('#btnHeroReset');
      const resultBox = container.querySelector('#landingHeroResultBox');

      // Scenario Switcher Tabs
      container.querySelectorAll('.landing-scenario-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          container.querySelectorAll('.landing-scenario-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const scenarioKey = btn.dataset.scenario;
          const scen = HERO_SCENARIOS[scenarioKey];
          if (!scen) return;
          activeScenarioId = scenarioKey;

          // Update widget contents
          const filenameEl = container.querySelector('#heroWidgetFilename');
          const codeEl = container.querySelector('#heroCodeDisplay');
          const datasetEl = container.querySelector('#heroDatasetLabel');
          const statusEl = container.querySelector('#heroResultStatus');
          const metaEl = container.querySelector('#heroResultMeta');
          const tableEl = container.querySelector('#heroResultTable');

          if (filenameEl) filenameEl.textContent = scen.filename;
          if (codeEl) codeEl.innerHTML = scen.codeHtml;
          if (datasetEl) datasetEl.innerHTML = `Dataset: <code>${scen.dataset}</code>`;
          if (statusEl) statusEl.textContent = scen.statusText;
          if (metaEl) metaEl.innerHTML = `Latency: ${scen.latency} &bull; Memory: ${scen.memory}`;

          if (tableEl) {
            tableEl.innerHTML = `
              <thead>
                <tr>${scen.tableHeaders.map(h => `<th>${h}</th>`).join('')}</tr>
              </thead>
              <tbody>
                ${scen.tableRows.map(row => `<tr>${row.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}
              </tbody>
            `;
          }

          if (resultBox) resultBox.classList.remove('active');
        });
      });

      if (btnRun && resultBox) {
        btnRun.addEventListener('click', () => {
          resultBox.classList.add('active');
          const current = HERO_SCENARIOS[activeScenarioId] || HERO_SCENARIOS.scenario1;
          if (window.soundFX) window.soundFX.playSuccess();
          if (window.SQL_BUDDY && current.buddyTip) {
            window.SQL_BUDDY.say(current.buddyTip, 5500, 'celebrate');
          }
        });
      }

      if (btnReset && resultBox) {
        btnReset.addEventListener('click', () => {
          resultBox.classList.remove('active');
        });
      }
    }
  };

  window.LandingPageEngine = LandingPageEngine;

  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => LandingPageEngine.init());
  } else {
    LandingPageEngine.init();
  }
})();
