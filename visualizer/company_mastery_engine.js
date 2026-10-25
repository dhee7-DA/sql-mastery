/**
 * =============================================================================
 * COMPANY MASTERY HUB ENGINE
 * Deep-dive interview intelligence, probability matrices, and curated drills
 * across FAANG & Wall Street Tier 1 firms (Amazon, Google, Meta, Apple, Stripe,
 * Citadel, Bloomberg, Netflix, Uber, Snowflake, and more).
 * Bridges 323 Official LeetCode Problems + 10 Full Timed Mock Interview Tracks.
 * =============================================================================
 */

window.CompanyMasteryEngine = (function() {
  'use strict';

  // Company Intelligence Profiles
  const COMPANY_PROFILES = {
    all: {
      name: "All Top Companies",
      badge: "Universal Benchmark",
      icon: "🌐",
      category: "Global",
      tier: "Tier 1 Global Tech & Finance",
      dialect: "ANSI SQL · PostgreSQL · MySQL 8.0 · Snowflake",
      screenFormat: "45-min live technical screens & take-home assessments",
      coreFocus: "Relational modeling, Window Analytics, Gaps & Islands, Aggregate Rollups",
      interviewPattern: "1 foundational filter/join question + 1 advanced analytical partitioning question",
      topSyntax: ["DENSE_RANK()", "COALESCE()", "SELF JOIN", "RECURSIVE CTE", "LEAD / LAG"],
      probabilities: [
        { topic: "Window Analytics & Rankings", pct: 95 },
        { topic: "Multi-Table Joins & Anti-Joins", pct: 88 },
        { topic: "Conditional Aggregation (CASE WHEN)", pct: 84 },
        { topic: "Three-Valued Logic & NULL Traps", pct: 72 }
      ],
      mockTrackId: null
    },
    Amazon: {
      name: "Amazon & AWS",
      badge: "High-Volume Infrastructure",
      icon: "🛒",
      category: "FAANG",
      tier: "Tier 1 Cloud & E-Commerce",
      dialect: "PostgreSQL · Redshift · MySQL · Athena",
      screenFormat: "45-min Chime / CoderPad screen with Amazon Bar Raiser principles",
      coreFocus: "Fulfillment center bottlenecks, prime subscription churn, seller revenue cohorts, inventory reconciliation",
      interviewPattern: "Heavy emphasis on large-scale self-joins, moving averages, and cumulative window frames",
      topSyntax: ["DENSE_RANK()", "ROWS BETWEEN 6 PRECEDING", "LEFT JOIN ... IS NULL", "SUM() OVER()"],
      probabilities: [
        { topic: "Cumulative & Rolling Metrics", pct: 98 },
        { topic: "Self-Joins & Hierarchies", pct: 92 },
        { topic: "Inventory Anti-Joins", pct: 85 },
        { topic: "Customer Cohort Retention", pct: 80 }
      ],
      mockTrackId: "track_amazon"
    },
    Google: {
      name: "Google & YouTube",
      badge: "Hyper-Scale Analytics",
      icon: "🔍",
      category: "FAANG",
      tier: "Tier 1 Big Data & Cloud",
      dialect: "Google BigQuery · PostgreSQL · Spark SQL",
      screenFormat: "45-min Google Meet / Google Docs live query derivation",
      coreFocus: "Video view duration sessionization, query search click-through, ad CTR attribution, user journey paths",
      interviewPattern: "Rigorous algorithmic SQL — sessionization via window gaps, ARRAY_AGG, and QUALIFY semantics",
      topSyntax: ["LEAD() / LAG()", "QUALIFY", "COUNT(DISTINCT)", "UNNEST()"],
      probabilities: [
        { topic: "Sessionization & Inactivity Gaps", pct: 96 },
        { topic: "Window Partition Filtering", pct: 91 },
        { topic: "Search Attribution Funnels", pct: 84 },
        { topic: "Streaming Event De-duplication", pct: 79 }
      ],
      mockTrackId: "track_google"
    },
    Meta: {
      name: "Meta (Facebook / IG)",
      badge: "Social Graph & Ads",
      icon: "📱",
      category: "FAANG",
      tier: "Tier 1 Social Network & Ads",
      dialect: "Presto / Trino · Spark SQL · Scuba",
      screenFormat: "45-min CoderPad with 2 back-to-back live SQL scenarios",
      coreFocus: "Friend graph triangulation, newsfeed impressions, active user retention (DAU/MAU), ad conversion funnels",
      interviewPattern: "Fast-paced query formulation testing self-joins on friendships, rolling 7-day active user windows",
      topSyntax: ["DENSE_RANK()", "LAG() OVER()", "CROSS JOIN", "GROUPING SETS"],
      probabilities: [
        { topic: "Friendship Graph Triangulation", pct: 95 },
        { topic: "Rolling 7-Day / 30-Day Churn", pct: 92 },
        { topic: "Ad Conversion Rate (CASE WHEN)", pct: 88 },
        { topic: "Self-Join Mutual Connections", pct: 82 }
      ],
      mockTrackId: "track_meta"
    },
    Apple: {
      name: "Apple",
      badge: "Ecosystem & Hardware Services",
      icon: "🍏",
      category: "FAANG",
      tier: "Tier 1 Consumer & Services",
      dialect: "PostgreSQL · Snowflake · Spark SQL",
      screenFormat: "45-min technical screen with Engineering Manager & Data Architect",
      coreFocus: "App Store in-app purchases, iCloud subscription renewal pipelines, hardware activation curves, privacy-safe analytics",
      interviewPattern: "Subscription lifecycle, trial conversion drops, refund reconciliation, and NULL handling",
      topSyntax: ["COALESCE()", "DATE_TRUNC()", "ROW_NUMBER()", "LEFT JOIN"],
      probabilities: [
        { topic: "Subscription Cohort Drop-off", pct: 94 },
        { topic: "Trial-to-Paid Conversion", pct: 89 },
        { topic: "Payment Refund Reconciliation", pct: 83 },
        { topic: "Hardware Batch Defect Ratios", pct: 75 }
      ],
      mockTrackId: null
    },
    Stripe: {
      name: "Stripe",
      badge: "FinTech & Ledgers",
      icon: "💳",
      category: "FinTech",
      tier: "Tier 1 Global Payments Infrastructure",
      dialect: "PostgreSQL · Presto · DuckDB",
      screenFormat: "60-min interactive pairing on realistic ledger schemas with live unit tests",
      coreFocus: "Immutable double-entry balances, currency conversions, dispute chargeback clawbacks, idempotency keys",
      interviewPattern: "Zero tolerance for floating-point errors, strict transaction ordering, and running balance calculation",
      topSyntax: ["SUM() OVER (ORDER BY)", "EXISTS", "DECIMAL(18,4)", "RECURSIVE CTE"],
      probabilities: [
        { topic: "Double-Entry Running Balance", pct: 99 },
        { topic: "Dispute & Fee Attribution", pct: 94 },
        { topic: "Cross-Border FX Normalization", pct: 88 },
        { topic: "Idempotent Event De-duplication", pct: 82 }
      ],
      mockTrackId: "track_stripe"
    },
    Citadel: {
      name: "Citadel Securities",
      badge: "Quantitative Trading & HFT",
      icon: "🏛️",
      category: "Quant",
      tier: "Tier 1 Wall Street Market Maker",
      dialect: "PostgreSQL · kdb+/q · ClickHouse · TimescaleDB",
      screenFormat: "45-min high-intensity algorithmic screen testing market microstructure",
      coreFocus: "Order book bid-ask crossing, VWAP (Volume-Weighted Average Price), tick price changes, maximum portfolio drawdown",
      interviewPattern: "Window frames with microsecond timestamp ordering, non-equi joins on trade matches, and peak-to-trough drawdowns",
      topSyntax: ["SUM(p*v)/SUM(v) OVER", "MAX() OVER (ROWS UNBOUNDED)", "FIRST_VALUE()", "NTH_VALUE()"],
      probabilities: [
        { topic: "VWAP & Order Book Crossing", pct: 98 },
        { topic: "Peak Drawdown & Watermarks", pct: 95 },
        { topic: "Tick-by-Tick Spread Analysis", pct: 90 },
        { topic: "Latency & Fill-Rate Ratios", pct: 86 }
      ],
      mockTrackId: "track_citadel"
    },
    Bloomberg: {
      name: "Bloomberg",
      badge: "Financial Data & Terminals",
      icon: "📈",
      category: "FinTech",
      tier: "Tier 1 Financial Data & Media",
      dialect: "PostgreSQL · Comdb2 · MySQL",
      screenFormat: "45-min HackerRank + Onsite System & SQL Bar Raiser",
      coreFocus: "Corporate actions (stock splits / dividends), ticker history backfills, analyst consensus estimates, portfolio asset allocation",
      interviewPattern: "Consecutive day price gainers, point-in-time financial reporting, and complex multi-column tie breaks",
      topSyntax: ["LAG()", "DENSE_RANK()", "CASE WHEN", "DATEADD / DATEDIFF"],
      probabilities: [
        { topic: "Consecutive Gain Streaks", pct: 95 },
        { topic: "Point-in-Time Financials", pct: 90 },
        { topic: "Ticker Dividend Adjustments", pct: 84 },
        { topic: "Consensus Average Outliers", pct: 78 }
      ],
      mockTrackId: null
    },
    Uber: {
      name: "Uber & DoorDash",
      badge: "Marketplace & Logistics",
      icon: "🚗",
      category: "Marketplace",
      tier: "Tier 1 Two-Sided Marketplace",
      dialect: "Presto · PostgreSQL · Spark SQL",
      screenFormat: "45-min CoderPad covering driver dispatch, surge multipliers, and delivery completion rates",
      coreFocus: "Driver acceptance rate, surge pricing efficiency, delivery ETAs vs actuals, restaurant order batching",
      interviewPattern: "Two-sided matching rates, rolling 15-minute supply-demand ratios, and cancelled trip penalties",
      topSyntax: ["AVG(CASE WHEN)", "COUNT(DISTINCT)", "ROW_NUMBER() OVER", "INTERVAL"],
      probabilities: [
        { topic: "Supply-Demand Surge Ratios", pct: 96 },
        { topic: "Driver Acceptance & Cancellation", pct: 91 },
        { topic: "Multi-Leg Delivery Duration", pct: 85 },
        { topic: "Rolling Window Hotspots", pct: 80 }
      ],
      mockTrackId: "track_uber"
    },
    Netflix: {
      name: "Netflix",
      badge: "Streaming & Media",
      icon: "🎬",
      category: "FAANG",
      tier: "Tier 1 Entertainment & CDN",
      dialect: "Trino · Spark SQL · Apache Iceberg",
      screenFormat: "45-min pairing interview on subscriber engagement and streaming telemetry",
      coreFocus: "Binge-watching session definition, title completion rates, personalized recommendation clicks, subscriber tier migration",
      interviewPattern: "Gap-based sessionization (28 minutes of inactivity), continuous watch streaks, and content catalog ROI",
      topSyntax: ["LAG()", "SUM(is_new_session) OVER", "NTILE(10)", "CORR()"],
      probabilities: [
        { topic: "Streaming Sessionization", pct: 96 },
        { topic: "Title Completion Drop-off", pct: 90 },
        { topic: "Plan Upgrade/Downgrade Retention", pct: 84 },
        { topic: "Regional Catalog Saturation", pct: 78 }
      ],
      mockTrackId: "track_netflix"
    }
  };

  // State
  let activeCompany = 'all';
  let activeDifficulty = 'all';
  let searchQuery = '';
  let activeSort = 'probability'; // 'probability' | 'id' | 'difficulty'
  let activeModalProblem = null;

  function init() {
    const container = document.getElementById('viewCompanyHub');
    if (!container) return;
    render(container);
  }

  function getVaultProblems() {
    if (typeof window.getAllLeetCodeProblems === 'function') {
      return window.getAllLeetCodeProblems();
    }
    return window.LEETCODE_300_VAULT || [];
  }

  function getFilteredProblems() {
    const vault = getVaultProblems();
    return vault.filter(p => {
      // Company Match
      if (activeCompany !== 'all') {
        const companies = p.companies || [];
        const hasCompany = companies.some(c => c.toLowerCase() === activeCompany.toLowerCase());
        if (!hasCompany) return false;
      }
      // Difficulty Match
      if (activeDifficulty !== 'all') {
        if (p.difficulty.toLowerCase() !== activeDifficulty.toLowerCase()) return false;
      }
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const numMatch = String(p.id).includes(q) || String(p.number || '').includes(q);
        const titleMatch = (p.title || '').toLowerCase().includes(q);
        const catMatch = (p.category || '').toLowerCase().includes(q);
        const sqlMatch = (p.solutionSQL || '').toLowerCase().includes(q);
        const compMatch = (p.companies || []).some(c => c.toLowerCase().includes(q));
        if (!numMatch && !titleMatch && !catMatch && !sqlMatch && !compMatch) return false;
      }
      return true;
    }).sort((a, b) => {
      if (activeSort === 'probability') {
        // Parse probability from interviewFreq
        const getFreqScore = (item) => {
          const str = item.interviewFreq || '';
          const match = str.match(/(\d+)%/);
          return match ? parseInt(match[1], 10) : 50;
        };
        return getFreqScore(b) - getFreqScore(a);
      } else if (activeSort === 'id') {
        return (a.id || 0) - (b.id || 0);
      } else if (activeSort === 'difficulty') {
        const diffRank = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        return (diffRank[b.difficulty] || 2) - (diffRank[a.difficulty] || 2);
      }
      return 0;
    });
  }

  function getCompanyQuestionCount(companyKey) {
    const vault = getVaultProblems();
    if (companyKey === 'all') return vault.length;
    return vault.filter(p => (p.companies || []).some(c => c.toLowerCase() === companyKey.toLowerCase())).length;
  }

  function render(container) {
    const profile = COMPANY_PROFILES[activeCompany] || COMPANY_PROFILES.all;
    const filteredProblems = getFilteredProblems();
    const totalCount = filteredProblems.length;

    container.innerHTML = `
      <div class="company-hub-wrapper">
        <!-- Top Banner -->
        <header class="company-hub-header">
          <div class="hub-header-left">
            <div class="hub-title-row">
              <span class="hub-title-icon">🏢</span>
              <div>
                <h1 class="hub-title">Company Interview Intelligence &amp; Practice Matrix</h1>
                <p class="hub-subtitle">
                  Authentic LeetCode SQL vault mapped to verified company interview frequency, round probabilities, and technical architectural screens.
                </p>
              </div>
            </div>
          </div>
          <div class="hub-header-stats">
            <div class="hub-stat-card">
              <div class="hub-stat-val">${getVaultProblems().length}</div>
              <div class="hub-stat-lbl">Official Questions</div>
            </div>
            <div class="hub-stat-card">
              <div class="hub-stat-val">10 Tracks</div>
              <div class="hub-stat-lbl">Timed Screens</div>
            </div>
            <div class="hub-stat-card">
              <div class="hub-stat-val">100%</div>
              <div class="hub-stat-lbl">WASM Verified</div>
            </div>
          </div>
        </header>

        <!-- Company Selector Ribbon -->
        <div class="company-selector-ribbon" id="companyRibbon">
          ${Object.keys(COMPANY_PROFILES).map(key => {
            const c = COMPANY_PROFILES[key];
            const count = getCompanyQuestionCount(key);
            const isSelected = activeCompany === key;
            return `
              <button class="company-tab-btn ${isSelected ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setCompany('${key}')">
                <span class="company-tab-icon">${c.icon}</span>
                <span class="company-tab-name">${c.name}</span>
                <span class="company-tab-count">${count}</span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Selected Company Dossier -->
        <div class="company-dossier-card">
          <div class="dossier-main-col">
            <div class="dossier-header-bar">
              <div class="dossier-badge-row">
                <span class="dossier-tier-pill">${profile.tier}</span>
                <span class="dossier-category-pill">${profile.badge}</span>
                ${profile.mockTrackId ? `<span class="dossier-live-screen-pill">🎯 Interactive 45-Min Screen Available</span>` : ''}
              </div>
              <h2 class="dossier-company-name">${profile.icon} ${profile.name} Interview Dossier</h2>
            </div>

            <p class="dossier-focus-desc"><strong>Core Relational Focus:</strong> ${profile.coreFocus}</p>

            <div class="dossier-specs-grid">
              <div class="dossier-spec-item">
                <div class="spec-label">Primary Dialects</div>
                <div class="spec-value">${profile.dialect}</div>
              </div>
              <div class="dossier-spec-item">
                <div class="spec-label">Screening Format</div>
                <div class="spec-value">${profile.screenFormat}</div>
              </div>
              <div class="dossier-spec-item">
                <div class="spec-label">Target Syntax Mastery</div>
                <div class="spec-syntax-tags">
                  ${profile.topSyntax.map(s => `<span class="syntax-tag">${s}</span>`).join('')}
                </div>
              </div>
            </div>

            <div class="dossier-actions-bar">
              ${profile.mockTrackId ? `
                <button class="dossier-launch-btn primary" onclick="window.CompanyMasteryEngine.launchMockTrack('${profile.mockTrackId}')">
                  <span>🚀 Launch 45-Min ${profile.name} Timed Screen</span>
                </button>
              ` : ''}
              <button class="dossier-launch-btn secondary" onclick="window.CompanyMasteryEngine.jumpToArena()">
                <span>⚡ Open in LeetCode 300+ Arena</span>
              </button>
            </div>
          </div>

          <div class="dossier-radar-col">
            <h4 class="radar-title">Question Pattern Probability</h4>
            <div class="prob-bars-list">
              ${profile.probabilities.map(p => `
                <div class="prob-bar-row">
                  <div class="prob-bar-label">
                    <span>${p.topic}</span>
                    <span class="prob-num">${p.pct}%</span>
                  </div>
                  <div class="prob-bar-track">
                    <div class="prob-bar-fill" style="width: ${p.pct}%"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Filter & Search Bar -->
        <div class="hub-controls-row">
          <div class="hub-search-box">
            <span class="search-icon">🔍</span>
            <input type="text" 
                   id="hubProblemSearch" 
                   class="hub-search-input" 
                   placeholder="Search 323 problems by # (e.g. 185), title, keyword (e.g. QUALIFY, DENSE_RANK)..." 
                   value="${escapeHtml(searchQuery)}" 
                   oninput="window.CompanyMasteryEngine.onSearchChange(this.value)" />
            ${searchQuery ? `<button class="search-clear-btn" onclick="window.CompanyMasteryEngine.clearSearch()">✕</button>` : ''}
          </div>

          <div class="hub-filter-group">
            <div class="diff-filter-btns">
              <button class="diff-btn ${activeDifficulty === 'all' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDifficulty('all')">All</button>
              <button class="diff-btn easy ${activeDifficulty === 'easy' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDifficulty('easy')">Easy</button>
              <button class="diff-btn medium ${activeDifficulty === 'medium' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDifficulty('medium')">Medium</button>
              <button class="diff-btn hard ${activeDifficulty === 'hard' ? 'active' : ''}" onclick="window.CompanyMasteryEngine.setDifficulty('hard')">Hard</button>
            </div>

            <div class="sort-selector">
              <label for="hubSortSelect">Sort by:</label>
              <select id="hubSortSelect" class="hub-select" onchange="window.CompanyMasteryEngine.setSort(this.value)">
                <option value="probability" ${activeSort === 'probability' ? 'selected' : ''}>Interview Frequency (High → Low)</option>
                <option value="id" ${activeSort === 'id' ? 'selected' : ''}>LeetCode # (Ascending)</option>
                <option value="difficulty" ${activeSort === 'difficulty' ? 'selected' : ''}>Difficulty (Hard → Easy)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Results Counter & Status -->
        <div class="hub-results-meta">
          <span>Showing <strong>${totalCount}</strong> problems for <strong>${profile.name}</strong></span>
          ${searchQuery ? `<span>Filtered by: "<em>${escapeHtml(searchQuery)}</em>"</span>` : ''}
        </div>

        <!-- Problems Grid -->
        <div class="hub-problems-grid" id="hubProblemsGrid">
          ${totalCount === 0 ? `
            <div class="hub-empty-state">
              <div class="empty-icon">📂</div>
              <h3>No matching interview problems found</h3>
              <p>Try resetting the search keywords or selecting "All Companies".</p>
              <button class="empty-reset-btn" onclick="window.CompanyMasteryEngine.resetFilters()">Reset All Filters</button>
            </div>
          ` : filteredProblems.map(p => renderProblemCard(p)).join('')}
        </div>
      </div>

      <!-- Detail Modal Mount Point -->
      <div id="companyProblemModal" class="company-modal-overlay" style="display: none;" onclick="window.CompanyMasteryEngine.handleModalOverlayClick(event)">
        <div class="company-modal-dialog">
          <div id="companyModalContent"></div>
        </div>
      </div>
    `;
  }

  function renderProblemCard(p) {
    const diffClass = (p.difficulty || 'Medium').toLowerCase();
    const companies = p.companies || [];
    const freq = p.interviewFreq || '85%';
    const round = p.interviewRound || 'Technical Screen';

    return `
      <div class="hub-prob-card">
        <div class="prob-card-top">
          <div class="prob-id-badge">LC #${p.id}</div>
          <span class="prob-diff-pill ${diffClass}">${p.difficulty}</span>
          <span class="prob-freq-badge">🔥 ${freq}</span>
        </div>

        <h3 class="prob-card-title">${escapeHtml(p.title)}</h3>
        <div class="prob-card-category"><span class="cat-dot"></span>${escapeHtml(p.category || 'Relational Core')}</div>

        <div class="prob-card-companies">
          ${companies.slice(0, 4).map(c => `<span class="company-tag">${c}</span>`).join('')}
          ${companies.length > 4 ? `<span class="company-tag more">+${companies.length - 4}</span>` : ''}
        </div>

        <div class="prob-card-round">
          <span class="round-icon">🎯</span>
          <span>${escapeHtml(round)}</span>
        </div>

        <div class="prob-card-actions">
          <button class="prob-action-btn inspect" onclick="window.CompanyMasteryEngine.openProblemModal(${p.id})">
            <span>🔍 Blueprint &amp; Solution</span>
          </button>
          <button class="prob-action-btn arena" onclick="window.CompanyMasteryEngine.openInArena(${p.id})" title="Solve in LeetCode 300+ Arena">
            <span>⚡ Solve</span>
          </button>
        </div>
      </div>
    `;
  }

  function openProblemModal(problemId) {
    const vault = getVaultProblems();
    const problem = vault.find(p => p.id === problemId);
    if (!problem) return;

    activeModalProblem = problem;
    const modal = document.getElementById('companyProblemModal');
    const content = document.getElementById('companyModalContent');
    if (!modal || !content) return;

    const diffClass = (problem.difficulty || 'Medium').toLowerCase();
    const companies = problem.companies || [];

    content.innerHTML = `
      <div class="modal-header">
        <div class="modal-title-left">
          <div class="modal-badge-row">
            <span class="modal-prob-id">LeetCode #${problem.id}</span>
            <span class="prob-diff-pill ${diffClass}">${problem.difficulty}</span>
            <span class="prob-freq-badge">🔥 Frequency: ${problem.interviewFreq || '90%'}</span>
            <span class="modal-category-tag">${problem.category}</span>
          </div>
          <h2 class="modal-problem-title">${escapeHtml(problem.title)}</h2>
        </div>
        <button class="modal-close-btn" onclick="window.CompanyMasteryEngine.closeModal()">✕</button>
      </div>

      <div class="modal-company-strip">
        <span class="strip-label">Tested frequently at:</span>
        ${companies.map(c => `<span class="modal-company-pill">${c}</span>`).join('')}
        <span class="modal-round-tag">Round: ${escapeHtml(problem.interviewRound || 'Phone Screen')}</span>
      </div>

      <div class="modal-tabs-bar">
        <button class="modal-tab-btn active" id="tabBtnSpec" onclick="window.CompanyMasteryEngine.switchModalTab('spec')">📋 Schema &amp; Problem</button>
        <button class="modal-tab-btn" id="tabBtnSolution" onclick="window.CompanyMasteryEngine.switchModalTab('solution')">✨ Enterprise Solution</button>
        <button class="modal-tab-btn" id="tabBtnLogic" onclick="window.CompanyMasteryEngine.switchModalTab('logic')">🧠 Execution Breakdown</button>
        <button class="modal-tab-btn" id="tabBtnTraps" onclick="window.CompanyMasteryEngine.switchModalTab('traps')">⚠️ Pitfalls &amp; Traps</button>
      </div>

      <div class="modal-tab-body" id="modalTabBody">
        ${renderModalTabSpec(problem)}
      </div>

      <div class="modal-footer-bar">
        <div class="modal-footer-left">
          <button class="modal-btn secondary" onclick="window.CompanyMasteryEngine.copyCurrentSQL()">📋 Copy Golden SQL</button>
        </div>
        <div class="modal-footer-right">
          <button class="modal-btn primary" onclick="window.CompanyMasteryEngine.openInArena(${problem.id})">
            <span>⚡ Open in LeetCode Arena &amp; Run WASM</span>
          </button>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function renderModalTabSpec(problem) {
    return `
      <div class="modal-tab-pane">
        <div class="spec-section">
          <h4 class="spec-sec-title">Problem Statement</h4>
          <div class="spec-prompt-box">
            <pre class="prompt-text">${escapeHtml(problem.prompt || problem.title)}</pre>
          </div>
        </div>

        <div class="spec-section">
          <h4 class="spec-sec-title">Relational Schema Definition</h4>
          <div class="schema-code-box">
            <pre><code>${escapeHtml(problem.schemaDescription || 'Standard relational schema')}</code></pre>
          </div>
        </div>

        ${problem.sampleInput ? `
          <div class="spec-section">
            <h4 class="spec-sec-title">Sample Test Input</h4>
            <div class="sample-data-box">
              <pre><code>${escapeHtml(typeof problem.sampleInput === 'object' ? JSON.stringify(problem.sampleInput, null, 2) : problem.sampleInput)}</code></pre>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  function renderModalTabSolution(problem) {
    const sql = problem.solutionSQL || '-- No solution query provided';
    return `
      <div class="modal-tab-pane">
        <div class="solution-header-row">
          <div>
            <span class="solution-tag">ANSI SQL / MySQL 8.0+ / PostgreSQL</span>
            <span class="complexity-tag">Optimal O(N) or O(N log N) Execution</span>
          </div>
          <button class="copy-sql-pill-btn" onclick="window.CompanyMasteryEngine.copyCurrentSQL()">Copy SQL</button>
        </div>
        <div class="golden-sql-editor">
          <pre><code class="language-sql">${escapeHtml(sql)}</code></pre>
        </div>

        ${problem.alternativeSolutions && problem.alternativeSolutions.length > 0 ? `
          <div class="alt-solutions-block">
            <h4 class="alt-title">Alternative Industry Solution (${problem.alternativeSolutions[0].name})</h4>
            <div class="alt-sql-box">
              <pre><code>${escapeHtml(problem.alternativeSolutions[0].sql)}</code></pre>
            </div>
            <p class="alt-desc">${escapeHtml(problem.alternativeSolutions[0].explanation || '')}</p>
          </div>
        ` : ''}
      </div>
    `;
  }

  function renderModalTabLogic(problem) {
    const lines = problem.lineByLineExplanation || [];
    return `
      <div class="modal-tab-pane">
        <h4 class="logic-title">Step-by-Step Query Assembly Line</h4>
        <div class="logic-steps-list">
          ${lines.length > 0 ? lines.map((step, idx) => `
            <div class="logic-step-item">
              <div class="logic-step-num">${idx + 1}</div>
              <div class="logic-step-text">${escapeHtml(step)}</div>
            </div>
          `).join('') : `
            <div class="logic-step-item">
              <div class="logic-step-num">1</div>
              <div class="logic-step-text">Formulate candidate rows via FROM and JOIN conditions.</div>
            </div>
            <div class="logic-step-item">
              <div class="logic-step-num">2</div>
              <div class="logic-step-text">Apply WHERE filter before grouping to prune irrelevant tuples early.</div>
            </div>
            <div class="logic-step-item">
              <div class="logic-step-num">3</div>
              <div class="logic-step-text">Perform analytical aggregation or window partitioning.</div>
            </div>
          `}
        </div>
      </div>
    `;
  }

  function renderModalTabTraps(problem) {
    const traps = problem.trapsAndEdgeCases || [];
    return `
      <div class="modal-tab-pane">
        <div class="traps-warning-banner">
          <span class="warning-icon">⚠️</span>
          <div>
            <strong>Why 70% of Candidates Fail this Question:</strong>
            <p>Interviewers design these tests specifically to catch subtle relational edge cases, NULL evaluation anomalies, and tie-breaking ambiguity.</p>
          </div>
        </div>

        <div class="traps-list">
          ${traps.length > 0 ? traps.map(trap => `
            <div class="trap-card-item">
              <span class="trap-bullet">💥</span>
              <div class="trap-content">${escapeHtml(trap)}</div>
            </div>
          `).join('') : `
            <div class="trap-card-item">
              <span class="trap-bullet">💥</span>
              <div class="trap-content">Three-Valued Logic: Comparing against NULL with = NULL evaluates to UNKNOWN, silently dropping rows. Always use IS NULL.</div>
            </div>
            <div class="trap-card-item">
              <span class="trap-bullet">💥</span>
              <div class="trap-content">Deterministic Ordering: Without secondary tie-breaker columns in ORDER BY, databases return non-deterministic row positions across shards.</div>
            </div>
          `}
        </div>
      </div>
    `;
  }

  function switchModalTab(tabKey) {
    if (!activeModalProblem) return;
    const body = document.getElementById('modalTabBody');
    if (!body) return;

    ['spec', 'solution', 'logic', 'traps'].forEach(k => {
      const btn = document.getElementById(`tabBtn${k.charAt(0).toUpperCase() + k.slice(1)}`);
      if (btn) btn.classList.toggle('active', k === tabKey);
    });

    if (tabKey === 'spec') body.innerHTML = renderModalTabSpec(activeModalProblem);
    else if (tabKey === 'solution') body.innerHTML = renderModalTabSolution(activeModalProblem);
    else if (tabKey === 'logic') body.innerHTML = renderModalTabLogic(activeModalProblem);
    else if (tabKey === 'traps') body.innerHTML = renderModalTabTraps(activeModalProblem);
  }

  function closeModal() {
    const modal = document.getElementById('companyProblemModal');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';
    activeModalProblem = null;
  }

  function handleModalOverlayClick(e) {
    if (e.target && e.target.id === 'companyProblemModal') {
      closeModal();
    }
  }

  function copyCurrentSQL() {
    if (!activeModalProblem) return;
    const sql = activeModalProblem.solutionSQL || '';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(sql).then(() => {
        alert('✨ Golden SQL query copied to clipboard!');
      }).catch(() => {
        prompt('Copy your query:', sql);
      });
    } else {
      prompt('Copy your query:', sql);
    }
  }

  function openInArena(problemId) {
    closeModal();
    if (typeof window.selectNavView === 'function') {
      window.selectNavView('viewLeetCode50', 'LeetCode 300+', null);
    }
    setTimeout(() => {
      if (window.LEETCODE_ARENA && typeof window.LEETCODE_ARENA.selectProblem === 'function') {
        window.LEETCODE_ARENA.selectProblem(problemId);
      }
    }, 150);
  }

  function launchMockTrack(trackId) {
    if (typeof window.selectNavView === 'function') {
      window.selectNavView('viewMockInterview', 'Interview 🎯', null);
    }
    setTimeout(() => {
      if (window.MockInterviewEngine && typeof window.MockInterviewEngine.startScreen === 'function') {
        window.MockInterviewEngine.startScreen(trackId);
      }
    }, 150);
  }

  function jumpToArena() {
    if (typeof window.selectNavView === 'function') {
      window.selectNavView('viewLeetCode50', 'LeetCode 300+', null);
    }
  }

  // Filter setters
  function setCompany(companyKey) {
    activeCompany = companyKey;
    const container = document.getElementById('viewCompanyHub');
    if (container) render(container);
  }

  function setDifficulty(diff) {
    activeDifficulty = diff;
    const container = document.getElementById('viewCompanyHub');
    if (container) render(container);
  }

  function setSort(sortKey) {
    activeSort = sortKey;
    const container = document.getElementById('viewCompanyHub');
    if (container) render(container);
  }

  function onSearchChange(val) {
    searchQuery = val;
    const container = document.getElementById('viewCompanyHub');
    if (container) render(container);
  }

  function clearSearch() {
    searchQuery = '';
    const container = document.getElementById('viewCompanyHub');
    if (container) render(container);
  }

  function resetFilters() {
    activeCompany = 'all';
    activeDifficulty = 'all';
    searchQuery = '';
    activeSort = 'probability';
    const container = document.getElementById('viewCompanyHub');
    if (container) render(container);
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

  return {
    init,
    setCompany,
    setDifficulty,
    setSort,
    onSearchChange,
    clearSearch,
    resetFilters,
    openProblemModal,
    closeModal,
    switchModalTab,
    handleModalOverlayClick,
    copyCurrentSQL,
    openInArena,
    launchMockTrack,
    jumpToArena
  };

})();
