/**
 * SQL FOUNDRY - PRODUCT LANDING PAGE ENGINE
 * Modulify Hybrid (Vesper + Black Plus) Showcase
 */
(function() {
  'use strict';

  const LandingPageEngine = {
    init: function() {
      const container = document.getElementById('viewLandingPage');
      if (!container) return;
      container.innerHTML = this.renderHTML();
      this.bindEvents(container);
    },

    renderHTML: function() {
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
              <span class="landing-hero-gradient">Crack Tier-1 SQL Interviews.</span>
            </h1>

            <p class="landing-hero-subtitle">
              The desktop-grade interactive relational workspace. 323 executable LeetCode challenges, 70+ institutional company tracks, in-browser SQLite WASM execution, and Sir Bloops AI co-pilot. Built for engineers who need total SQL mastery.
            </p>

            <div class="landing-cta-strip">
              <button class="landing-cta-primary" id="btnHeroLaunchLeetCode" onclick="if(window.selectNavView) window.selectNavView('viewLeetCode50', 'LeetCode 323', null)">
                <span>⚡ Launch LeetCode 323 Arena</span>
              </button>
              <button class="landing-cta-secondary" onclick="if(window.selectNavView) window.selectNavView('viewCompanyHub', 'Companies &amp; Domains', null)">
                <span>🏛️ 70+ Company Tracks</span>
              </button>
              <button class="landing-cta-secondary" onclick="if(window.selectNavView) window.selectNavView('viewMockInterview', 'Mock Screen', null)">
                <span>🎯 45m Mock Screen</span>
              </button>
              <button class="landing-cta-secondary" onclick="if(window.selectNavView) window.selectNavView('viewSqlTerminal', 'SQL Terminal', null)">
                <span>💻 SQLite WASM Terminal</span>
              </button>
            </div>

            <!-- INTERACTIVE HERO CODE BENTO CARD -->
            <div class="landing-hero-widget-card">
              <div class="landing-widget-topbar">
                <div class="landing-widget-dots">
                  <span class="landing-dot red"></span>
                  <span class="landing-dot yellow"></span>
                  <span class="landing-dot green"></span>
                </div>
                <div class="landing-widget-filename">production_query_sandbox.sql</div>
                <div class="landing-widget-status-badge">
                  <span>●</span> <span>SQLite WASM Active</span>
                </div>
              </div>

              <div class="landing-widget-body">
                <pre class="landing-code-preview"><code><span class="landing-cm">-- Interactive Live Query Sandbox &bull; Click 'Run Query' below to execute</span>
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
<span class="landing-kw">ORDER BY</span> department_id, rank_pos;</code></pre>
              </div>

              <div class="landing-widget-action-row">
                <div style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono);">
                  Dataset: <code>enterprise_employees</code> (12 production columns)
                </div>
                <div style="display: flex; gap: 8px;">
                  <button class="landing-run-btn" id="btnHeroRunQuery">
                    <span>▶ Run Query Live</span>
                  </button>
                  <button class="landing-cta-secondary" style="padding: 5px 12px; font-size: 11px;" id="btnHeroReset">
                    <span>↺ Reset</span>
                  </button>
                </div>
              </div>

              <!-- Live Execution Result Output -->
              <div class="landing-widget-result-box" id="landingHeroResultBox">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; font-size: 11px; font-family: var(--font-mono);">
                  <span style="color: #10b981; font-weight: 700;">🟢 Query Executed Successfully (6 rows returned)</span>
                  <span style="color: var(--text-muted);">Latency: 0.014ms &bull; Memory: 0.0KB</span>
                </div>
                <table class="landing-table">
                  <thead>
                    <tr>
                      <th>department_id</th>
                      <th>full_name</th>
                      <th>salary</th>
                      <th>rank_pos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Eng</td><td>Elena Rostova</td><td>$185,000</td><td>1</td></tr>
                    <tr><td>Eng</td><td>David Kim</td><td>$172,000</td><td>2</td></tr>
                    <tr><td>Eng</td><td>Marcus Vance</td><td>$168,000</td><td>3</td></tr>
                    <tr><td>Finance</td><td>Sarah Jenkins</td><td>$195,000</td><td>1</td></tr>
                    <tr><td>Finance</td><td>Alex Chen</td><td>$180,000</td><td>2</td></tr>
                    <tr><td>Finance</td><td>Jordan Hayes</td><td>$165,000</td><td>3</td></tr>
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

          <!-- 3. MODULIFY VESPER BENTO GRID FEATURES SHOWCASE -->
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
                  <div class="landing-bento-icon">⚡</div>
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
                  <div class="landing-bento-icon">🏆</div>
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
                  <div class="landing-bento-icon">🏛️</div>
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
                  <div class="landing-bento-icon">🎯</div>
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
                  <div class="landing-bento-icon">🐙</div>
                  <h3 class="landing-bento-title">Sir Bloops Diagnostic Autopsy</h3>
                  <p class="landing-bento-desc">
                    Intelligent diagnostic companion that analyzes query execution plans. Catches Three-Valued Logic NULL gotchas, Cartesian explosions, and non-sargable WHERE filters.
                  </p>
                </div>
                <button class="landing-bento-action-link" onclick="if(window.SQL_BUDDY) window.SQL_BUDDY.say('🐙 Greetings! I am Sir Bloops, your relational co-pilot. I am ready to inspect any query you write!', 5000, 'celebrate');">
                  <span>Summon Sir Bloops &rarr;</span>
                </button>
              </div>
            </div>
          </section>

          <!-- 4. QUICK-LAUNCH WORKSPACES TILES -->
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
                <span class="landing-launch-icon">⚡</span>
                <div class="landing-launch-meta">
                  <div class="landing-launch-name">LeetCode 323 Arena</div>
                  <div class="landing-launch-tag">323 Problems &bull; Split IDE</div>
                </div>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewStudio', 'Studio', null)">
                <span class="landing-launch-icon">💻</span>
                <div class="landing-launch-meta">
                  <div class="landing-launch-name">Query Execution Studio</div>
                  <div class="landing-launch-tag">Monaco &bull; Schema Inspector</div>
                </div>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewSqlTerminal', 'SQL Terminal', null)">
                <span class="landing-launch-icon">🖥️</span>
                <div class="landing-launch-meta">
                  <div class="landing-launch-name">SQLite WASM Terminal</div>
                  <div class="landing-launch-tag">12 Enterprise Tables</div>
                </div>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewMcqs', 'MCQs', 'navGroupPractice')">
                <span class="landing-launch-icon">🧠</span>
                <div class="landing-launch-meta">
                  <div class="landing-launch-name">MCQs Vault (2.1k)</div>
                  <div class="landing-launch-tag">Interview Traps &bull; Flashcards</div>
                </div>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewSyntaxGym', 'Syntax Gym', 'navGroupPractice')">
                <span class="landing-launch-icon">⚡</span>
                <div class="landing-launch-meta">
                  <div class="landing-launch-name">Syntax Gym (1.7k)</div>
                  <div class="landing-launch-tag">Muscle Memory Drills</div>
                </div>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewCases', 'Case Studies', 'navGroupPractice')">
                <span class="landing-launch-icon">💼</span>
                <div class="landing-launch-meta">
                  <div class="landing-launch-name">Case Studies (2,540)</div>
                  <div class="landing-launch-tag">Real Production Incidents</div>
                </div>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewQuests', 'Quests', 'navGroupExplore')">
                <span class="landing-launch-icon">🎮</span>
                <div class="landing-launch-meta">
                  <div class="landing-launch-name">Interactive Quests</div>
                  <div class="landing-launch-tag">1,850 Puzzles &bull; Token Trays</div>
                </div>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewWindowMatrix', 'Window Cockpit', 'navGroupExplore')">
                <span class="landing-launch-icon">🪟</span>
                <div class="landing-launch-meta">
                  <div class="landing-launch-name">Window Functions Cockpit</div>
                  <div class="landing-launch-tag">Sliding Frames &bull; Offsets</div>
                </div>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewTactileEngine', 'SQL Machine', 'navGroupExplore')">
                <span class="landing-launch-icon">⚙️</span>
                <div class="landing-launch-meta">
                  <div class="landing-launch-name">Tactile SQL Machine</div>
                  <div class="landing-launch-tag">Fig. 16 Physical Engine</div>
                </div>
              </div>

              <div class="landing-launch-tile" onclick="if(window.openCurriculumReader) window.openCurriculumReader(1)">
                <span class="landing-launch-icon">📖</span>
                <div class="landing-launch-meta">
                  <div class="landing-launch-name">Theory Compendium</div>
                  <div class="landing-launch-tag">21 In-Depth Modules</div>
                </div>
              </div>

              <div class="landing-launch-tile" onclick="if(window.selectNavView) window.selectNavView('viewLearningJourney', 'Learning Journey', 'navGroupExplore')">
                <span class="landing-launch-icon">🗺️</span>
                <div class="landing-launch-meta">
                  <div class="landing-launch-name">20-Day Learning Journey</div>
                  <div class="landing-launch-tag">Systematic Daily Curriculum</div>
                </div>
              </div>

              <div class="landing-launch-tile" onclick="if(window.openFlashcardVault) window.openFlashcardVault()">
                <span class="landing-launch-icon">🗂️</span>
                <div class="landing-launch-meta">
                  <div class="landing-launch-name">SRS Trap Memory Gym</div>
                  <div class="landing-launch-tag">Leitner Spaced Repetition</div>
                </div>
              </div>
            </div>
          </section>

          <!-- 5. FOOTER -->
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

      if (btnRun && resultBox) {
        btnRun.addEventListener('click', () => {
          resultBox.classList.add('active');
          if (window.soundFX) window.soundFX.playSuccess();
          if (window.SQL_BUDDY) {
            window.SQL_BUDDY.say('⚡ Query executed in 0.014ms via client-side SQLite WASM! Notice how DENSE_RANK() cleanly handles ties without skipping rank numbers.', 5000, 'celebrate');
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
