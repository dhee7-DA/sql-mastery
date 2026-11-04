// =============================================================================
// UBER MARKETPLACE DYNAMICS & GEOSPATIAL LOGISTICS STORY ENGINE
// Provides:
// - Dispatch & Operations Inbox view with unread tickets & team avatars
// - Context Briefing: Marketplace Why, H3 Spatial & Dynamic Surge Focus, Production Traps
// - Interactive Token-Blanks Puzzle Solver & Freeform Dispatch SQL Workstation
// - Manager Code Review & Career Level Promotion System (L4 -> L5 -> L6 Staff)
// =============================================================================

(function() {
  'use strict';

  let activeDayNumber = 1;
  let activePhaseFilter = 'all'; // 'all' | 1 | 2 | 3 | 4
  let activeTab = 'context'; // 'context' | 'sample_table' | 'challenge' | 'terminal'
  let userBlanks = {};
  let isEvaluated = false;
  let isSuccess = false;
  let solvedDays = new Set();
  let challengeMode = 'blanks'; // 'blanks' | 'live_repl'
  let liveQueryText = '';
  let liveQueryResult = null;
  let liveQueryError = null;
  let liveQueryLatency = null;

  function playUiSound(type) {
    try {
      if (window.soundFX) {
        if (type === 'click') window.soundFX.playPop();
        else if (type === 'success') {
          window.soundFX.playSuccess();
          window.soundFX.playChordChime();
          if (typeof window.soundFX.addXP === 'function') {
            window.soundFX.addXP(25, 'Uber Dispatch Verified!');
          }
        }
        else if (type === 'error') window.soundFX.playError();
        return;
      }
      if (window.AudioFX) {
        if (type === 'click') window.AudioFX.playClick();
        else if (type === 'success') window.AudioFX.playSuccess();
        else if (type === 'error') window.AudioFX.playError();
      }
    } catch (e) {
      console.warn('Audio effect error:', e);
    }
  }

  // Load solved days from localStorage
  try {
    const saved = localStorage.getItem('sql_uber_solved_days');
    if (saved) {
      solvedDays = new Set(JSON.parse(saved));
    }
  } catch (e) {
    console.warn('Could not read saved Uber story progress:', e);
  }

  function initUberStoryEngine() {
    renderUberWorkspace();
  }

  function getActiveDayData() {
    const list = window.UBER_STORY_DATA || [];
    return list.find(d => d.day === activeDayNumber) || list[0];
  }

  function selectDay(dayNum) {
    activeDayNumber = dayNum;
    userBlanks = {};
    isEvaluated = false;
    isSuccess = false;
    liveQueryResult = null;
    liveQueryError = null;
    liveQueryText = '';

    playUiSound('click');
    renderUberWorkspace();
  }

  function setPhaseFilter(phase) {
    activePhaseFilter = phase;
    playUiSound('click');
    renderUberWorkspace();
  }

  function setViewTab(tab) {
    activeTab = tab;
    playUiSound('click');
    renderUberMainStage();
  }

  function selectBlankOption(blankId, val) {
    userBlanks[blankId] = val;
    isEvaluated = false;
    isSuccess = false;
    playUiSound('click');
    renderUberChallengePanel();
  }

  function checkUberChallenge() {
    const day = getActiveDayData();
    if (!day || !day.challenge) return;

    let correctCount = 0;
    const total = day.challenge.blanks.length;

    day.challenge.blanks.forEach(b => {
      if (userBlanks[b.id] === b.answer) {
        correctCount++;
      }
    });

    isEvaluated = true;
    isSuccess = (correctCount === total);

    if (isSuccess) {
      solvedDays.add(day.day);
      try {
        localStorage.setItem('sql_uber_solved_days', JSON.stringify(Array.from(solvedDays)));
      } catch (e) {}

      playUiSound('success');
      if (window.SQL_BUDDY && window.SQL_BUDDY.celebrate) {
        window.SQL_BUDDY.celebrate();
      }
    } else {
      playUiSound('error');
    }

    renderUberChallengePanel();
  }

  function resetUberChallenge() {
    userBlanks = {};
    isEvaluated = false;
    isSuccess = false;
    playUiSound('click');
    renderUberChallengePanel();
  }

  function getCareerTitle(cleared) {
    if (cleared >= 25) {
      return { title: 'L6 Staff Marketplace Data Scientist', badge: 'L6 STAFF', color: '#a855f7' };
    }
    if (cleared >= 16) {
      return { title: 'L5 Senior Marketplace Engineer', badge: 'L5 SENIOR', color: '#f59e0b' };
    }
    if (cleared >= 8) {
      return { title: 'L4 Confirmed Marketplace Analyst', badge: 'L4 PROD', color: '#06c167' };
    }
    return { title: 'L4 Associate Marketplace Analyst', badge: 'L4 ASSOC', color: '#276ef1' };
  }

  function renderUberWorkspace() {
    const root = document.getElementById('uberStoryContentRoot');
    if (!root) return;

    const allList = window.UBER_STORY_DATA || [];
    const filteredList = activePhaseFilter === 'all'
      ? allList
      : allList.filter(d => d.week === activePhaseFilter);
    const active = getActiveDayData();
    const career = getCareerTitle(solvedDays.size);

    root.innerHTML = `
      <div class="amazon-sim-container uber-sim-theme">
        <!-- TOP BRANDED HEADER -->
        <header class="amazon-sim-header">
          <div class="amazon-brand-row">
            <div class="amazon-logo-group">
              <span class="uber-brand-badge">Uber</span>
              <span class="amazon-team-tag">Marketplace Dynamics, Routing &amp; H3 Logistics</span>
            </div>
            <div class="amazon-career-status">
              <div class="career-text-col">
                <span class="career-role-title">${career.title}</span>
                <span class="career-progress-sub">Dispatches Solved: ${solvedDays.size} of ${allList.length} Shifts</span>
              </div>
              <span class="career-pill" style="color: ${career.color}; border-color: ${career.color}44; background: ${career.color}15;">
                ${career.badge}
              </span>
            </div>
          </div>
        </header>

        <!-- 2-COLUMN SPLIT WORKSPACE: LEFT (TICKETS & PHASES), RIGHT (MAIN STAGE) -->
        <div class="amazon-split-workspace">
          <!-- LEFT SIDEBAR: TICKETS LIST -->
          <aside class="amazon-ticket-sidebar">
            <div class="sidebar-phase-filter-bar">
              <button class="phase-filter-chip ${activePhaseFilter === 'all' ? 'active' : ''}" onclick="window.UBER_STORY.setPhaseFilter('all')">All</button>
              <button class="phase-filter-chip ${activePhaseFilter === 1 ? 'active' : ''}" onclick="window.UBER_STORY.setPhaseFilter(1)">W1: H3 Surge</button>
              <button class="phase-filter-chip ${activePhaseFilter === 2 ? 'active' : ''}" onclick="window.UBER_STORY.setPhaseFilter(2)">W2: Supply</button>
              <button class="phase-filter-chip ${activePhaseFilter === 3 ? 'active' : ''}" onclick="window.UBER_STORY.setPhaseFilter(3)">W3: Safety</button>
              <button class="phase-filter-chip ${activePhaseFilter === 4 ? 'active' : ''}" onclick="window.UBER_STORY.setPhaseFilter(4)">W4: Pricing</button>
            </div>

            <div class="ticket-cards-scroll-col">
              ${filteredList.map(item => {
                const isSelected = item.day === activeDayNumber;
                const isSolved = solvedDays.has(item.day);
                return `
                  <div class="ticket-item-card ${isSelected ? 'active' : ''} ${isSolved ? 'solved' : ''}" onclick="window.UBER_STORY.selectDay(${item.day})">
                    <div class="ticket-card-top-row">
                      <span class="ticket-day-num">Day ${item.day < 10 ? '0' + item.day : item.day}</span>
                      <span class="ticket-priority-pill priority-${item.priority.split(' ')[0].toLowerCase()}">${item.priority.split(' - ')[0]}</span>
                    </div>
                    <div class="ticket-card-title">${item.title.replace(/^Day \d+:\s*/, '')}</div>
                    <div class="ticket-card-sender-meta">
                      <span class="sender-avatar-small">${item.senderAvatar}</span>
                      <span class="sender-name-small">${item.sender}</span>
                      ${isSolved ? '<span class="ticket-check-mark">✓</span>' : ''}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </aside>

          <!-- RIGHT MAIN STAGE -->
          <main class="amazon-main-stage" id="uberMainStageRoot">
            <!-- Dynamically populated by renderUberMainStage -->
          </main>
        </div>
      </div>
    `;

    renderUberMainStage();
  }

  function renderUberMainStage() {
    const stageRoot = document.getElementById('uberMainStageRoot');
    if (!stageRoot) return;

    const d = getActiveDayData();
    if (!d) return;

    stageRoot.innerHTML = `
      <!-- TICKET BANNER & METADATA STRIP -->
      <section class="ticket-banner-strip">
        <div class="ticket-banner-header">
          <div>
            <div class="ticket-phase-tag">${d.phase}</div>
            <h1 class="ticket-banner-title">${d.title}</h1>
          </div>
          <span class="ticket-priority-pill priority-${d.priority.split(' ')[0].toLowerCase()}">${d.priority}</span>
        </div>

        <!-- SENDER & SLACK MESSAGE CHAT BUBBLE -->
        <div class="chime-message-bubble">
          <div class="bubble-sender-row">
            <span class="bubble-avatar">${d.senderAvatar}</span>
            <div class="bubble-sender-meta">
              <span class="bubble-sender-name">${d.sender}</span>
              <span class="bubble-sender-role">${d.senderRole} &bull; ${d.department}</span>
            </div>
          </div>
          <p class="bubble-message-text">${d.slackMessage}</p>
        </div>

        <!-- 4 STAGE TABS -->
        <div class="stage-nav-tabs">
          <button class="stage-tab-btn ${activeTab === 'context' ? 'active' : ''}" onclick="window.UBER_STORY.setViewTab('context')">
            Briefing &amp; Traps
          </button>
          <button class="stage-tab-btn ${activeTab === 'sample_table' ? 'active' : ''}" onclick="window.UBER_STORY.setViewTab('sample_table')">
            Schema &amp; Records
          </button>
          <button class="stage-tab-btn ${activeTab === 'challenge' ? 'active' : ''}" onclick="window.UBER_STORY.setViewTab('challenge')">
            SQL Workstation
          </button>
          <button class="stage-tab-btn ${activeTab === 'terminal' ? 'active' : ''}" onclick="window.UBER_STORY.setViewTab('terminal')">
            Reference Specification
          </button>
        </div>
      </section>

      <!-- ACTIVE TAB CONTENT BODY -->
      <section class="stage-tab-content-pane" id="uberTabContentRoot">
        <!-- Rendered based on activeTab -->
      </section>
    `;

    renderUberTabContent();
  }

  function renderUberTabContent() {
    const root = document.getElementById('uberTabContentRoot');
    if (!root) return;

    const d = getActiveDayData();
    if (!d) return;

    if (activeTab === 'context') {
      root.innerHTML = `
        <div class="tab-pane-context">
          <div class="context-grid">
            <div class="context-box">
              <div class="box-label">MARKETPLACE DISPATCH CONTEXT & GRAIN</div>
              <p class="box-text">${d.contextReport.businessWhy}</p>
            </div>
            <div class="context-box">
              <div class="box-label">CORE RELATIONAL &amp; DISPATCH PATTERNS</div>
              <ul class="focus-bullets">
                ${d.contextReport.learningFocus.map(pt => `<li>${pt}</li>`).join('')}
              </ul>
            </div>
            <div class="context-box warning">
              <div class="box-label">PRODUCTION TRAP &amp; INVARIANT VIOLATION RISK</div>
              <p class="box-text">${d.contextReport.realWorldTrap}</p>
            </div>
            <div class="context-box info">
              <div class="box-label">§ Marketplace Dispatch Interview Rubric</div>
              <p class="box-text">${d.contextReport.interviewRelevance}</p>
            </div>
          </div>
        </div>
      `;
    } else if (activeTab === 'sample_table') {
      root.innerHTML = renderSampleTableHtml(d);
    } else if (activeTab === 'challenge') {
      root.innerHTML = `
        <div class="challenge-panel-view" id="uberChallengePanelView">
          <!-- Rendered dynamically -->
        </div>
      `;
      renderUberChallengePanel();
    } else if (activeTab === 'terminal') {
      root.innerHTML = `
        <div class="tab-pane-terminal">
          <div class="terminal-guidance-card">
            <h3>Reference SQL Specification</h3>
            <p>Here is the benchmark query validated against Uber's Presto/Hudi marketplace warehouse:</p>
            <pre class="terminal-code-block"><code>${d.challenge.expectedSql}</code></pre>
            <div style="margin-top: 14px;">
              <button class="btn-run-check" onclick="window.UBER_STORY.setViewTab('challenge'); window.UBER_STORY.setChallengeMode('live_repl'); window.UBER_STORY.executeLiveQuery(\`${d.challenge.expectedSql}\`);">
                Execute in SQL Workstation &rarr;
              </button>
            </div>
          </div>
        </div>
      `;
    }
  }

  function renderSampleTableHtml(d) {
    const runner = window.UBER_SQL_RUNNER;
    const tableData = runner ? runner.getTableData(d.schema) : null;

    if (!tableData || tableData.length === 0) {
      return `
        <div class="sample-table-pane">
          <div class="sample-schema-box">
            <div class="schema-box-title">Schema Definition: <code>${d.schema}</code></div>
            <pre class="schema-pre"><code>${d.contextReport.sampleSchema}</code></pre>
          </div>
        </div>
      `;
    }

    const columns = Object.keys(tableData[0]);
    return `
      <div class="sample-table-pane">
        <div class="sample-schema-box">
          <div class="schema-box-title">Schema Definition: <code>${d.schema}</code></div>
          <pre class="schema-pre"><code>${d.contextReport.sampleSchema}</code></pre>
        </div>
        <div class="table-preview-wrap">
          <div class="table-preview-header">
            <span>Live Telemetry Records (${tableData.length} sample rows materialized in RAM)</span>
          </div>
          <div style="overflow-x: auto;">
            <table class="telemetry-table">
              <thead>
                <tr>${columns.map(c => `<th>${c}</th>`).join('')}</tr>
              </thead>
              <tbody>
                ${tableData.map(r => `
                  <tr>${columns.map(c => `<td>${r[c] === null ? '<span style="color:#71717a">NULL</span>' : r[c]}</td>`).join('')}</tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  function setChallengeMode(mode) {
    challengeMode = mode;
    playUiSound('click');
    renderUberChallengePanel();
  }

  function executeLiveQuery(queryOverride) {
    const d = getActiveDayData();
    if (!d) return;

    const editor = document.getElementById('uberLiveSqlEditor');
    const sqlToRun = (queryOverride || (editor ? editor.value : liveQueryText) || '').trim();
    if (!sqlToRun) return;

    liveQueryText = sqlToRun;

    if (!window.UBER_SQL_RUNNER || typeof window.UBER_SQL_RUNNER.execute !== 'function') {
      liveQueryError = "SQL execution engine is initializing. Please wait a moment.";
      renderUberChallengePanel();
      return;
    }

    const outcome = window.UBER_SQL_RUNNER.execute(sqlToRun, d.day);

    if (outcome.success) {
      liveQueryResult = outcome.rows;
      liveQueryError = null;
      liveQueryLatency = outcome.latency;

      if (liveQueryResult.length > 0) {
        solvedDays.add(d.day);
        try {
          localStorage.setItem('sql_uber_solved_days', JSON.stringify(Array.from(solvedDays)));
        } catch (e) {}
        playUiSound('success');
      } else {
        playUiSound('click');
      }
    } else {
      liveQueryError = outcome.error;
      liveQueryResult = null;
      liveQueryLatency = outcome.latency;
      playUiSound('error');
    }

    renderUberChallengePanel();
  }

  function renderUberChallengePanel() {
    const container = document.getElementById('uberChallengePanelView');
    if (!container || activeTab !== 'challenge') return;

    const day = getActiveDayData();
    const ch = day.challenge;

    const modeToggleHtml = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid #27272a;">
        <div style="font-size: 13px; font-weight: 600; color: #f4f4f5;">
          ${ch.instruction}
        </div>
        <div style="display:flex; gap:6px;">
          <button class="stage-tab-btn ${challengeMode === 'blanks' ? 'active' : ''}" style="padding:4px 10px; font-size:11.5px;" onclick="window.UBER_STORY.setChallengeMode('blanks')">
            Assisted Blanks
          </button>
          <button class="stage-tab-btn ${challengeMode === 'live_repl' ? 'active' : ''}" style="padding:4px 10px; font-size:11.5px;" onclick="window.UBER_STORY.setChallengeMode('live_repl')">
            Freeform Editor
          </button>
        </div>
      </div>
    `;

    if (challengeMode === 'live_repl') {
      let resultTableHtml = '';
      if (liveQueryResult && liveQueryResult.length > 0) {
        const cols = Object.keys(liveQueryResult[0]);
        resultTableHtml = `
          <div style="margin-top: 14px; border: 1px solid rgba(6, 193, 103, 0.35); border-radius: 6px; overflow: hidden;">
            <div style="background: rgba(6, 193, 103, 0.12); color: #06c167; padding: 6px 12px; font-size: 11px; font-weight: 700; display:flex; justify-content:space-between;">
              <span>✓ DISPATCH QUERY EXECUTED (${liveQueryResult.length} rows returned)</span>
              <span>${liveQueryLatency}ms latency</span>
            </div>
            <div style="overflow-x: auto; max-height: 240px;">
              <table class="telemetry-table" style="margin: 0;">
                <thead><tr>${cols.map(c => `<th>${c}</th>`).join('')}</tr></thead>
                <tbody>
                  ${liveQueryResult.map(r => `
                    <tr>${cols.map(c => `<td>${r[c] === null ? '<span style="color:#71717a">NULL</span>' : r[c]}</td>`).join('')}</tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      } else if (liveQueryError) {
        resultTableHtml = `
          <div style="margin-top: 14px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 6px; padding: 10px 14px; color: #f87171; font-size: 12px; font-family: var(--font-mono, monospace);">
            <strong>Syntax Error:</strong> ${liveQueryError}
          </div>
        `;
      }

      container.innerHTML = `
        ${modeToggleHtml}
        <div style="margin-bottom: 12px;">
          <textarea id="uberLiveSqlEditor" style="width: 100%; height: 140px; box-sizing: border-box;" placeholder="-- Enter SQL query against ${day.schema}...">${liveQueryText || ch.expectedSql}</textarea>
        </div>
        <div style="display:flex; gap: 10px;">
          <button class="btn-run-check" onclick="window.UBER_STORY.executeLiveQuery()">
            Run Query
          </button>
          <button class="btn-reset-challenge" onclick="document.getElementById('uberLiveSqlEditor').value = '';">
            Clear Editor
          </button>
        </div>
        ${resultTableHtml}
      `;
      return;
    }

    // Default: Blanks Mode
    let filledTemplate = ch.template;
    ch.blanks.forEach(b => {
      const selected = userBlanks[b.id];
      const isCorrect = isEvaluated && (selected === b.answer);
      const isWrong = isEvaluated && (selected !== b.answer);

      const selectHtml = `
        <select class="blank-select-dropdown ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}" onchange="window.UBER_STORY.selectBlankOption(${b.id}, this.value)">
          <option value="">[ ? Select ${b.label} ]</option>
          ${b.options.map(opt => `
            <option value="${opt}" ${selected === opt ? 'selected' : ''}>${opt}</option>
          `).join('')}
        </select>
      `;
      filledTemplate = filledTemplate.replace(`___${b.id}___`, selectHtml);
    });

    let evaluatedHtml = '';
    if (isEvaluated) {
      if (isSuccess) {
        evaluatedHtml = `
          <div class="evaluation-card success">
            <div class="eval-header">
              <span class="eval-icon">[VERIFIED]</span>
              <div>
                <strong>DISPATCH RESOLVED! Marketplace Invariant Verified</strong>
                <div class="eval-sub">You verified Rajesh Narayanan's dispatch liquidity requirement with exact relational logic.</div>
              </div>
            </div>
            <div class="manager-review-box">
              <div class="review-title">[STAFF ENG] Code Review Sign-Off:</div>
              <p class="review-comment">${ch.managerReview}</p>
            </div>
            <div class="eval-next-row" style="margin-top:14px;">
              ${day.day < 30 ? `
                <button class="btn-next-day" onclick="window.UBER_STORY.selectDay(${day.day + 1})">
                  Proceed to Day ${day.day + 1} &rarr;
                </button>
              ` : `
                <div class="capstone-congrats" style="color:#06c167; font-weight:700;">
                  Immersion Complete: All 30 engineering days verified to production grade.</div>
              `}
            </div>
          </div>
        `;
      } else {
        evaluatedHtml = `
          <div class="evaluation-card error">
            <div class="eval-header">
              <span class="eval-icon">[REVISION NEEDED]</span>
              <div>
                <strong>DISPATCH ERROR DETECTED</strong>
                <div class="eval-sub">One or more selected tokens violate SQL syntax or marketplace invariants.</div>
              </div>
            </div>
            <p style="color: #fca5a5; font-size: 12.5px; margin-top: 8px;">
              Check your grouping dimensions, sort order, and ratio arithmetic.
            </p>
          </div>
        `;
      }
    }

    container.innerHTML = `
      ${modeToggleHtml}
      <div class="sql-template-code-box">
        <pre class="template-pre">${filledTemplate}</pre>
      </div>

      <div class="challenge-actions-row" style="margin-top: 14px; display: flex; gap: 10px;">
        <button class="btn-run-check" onclick="window.UBER_STORY.checkChallenge()">
          Submit for Review
        </button>
        <button class="btn-reset-challenge" onclick="window.UBER_STORY.resetChallenge()">
          Reset Blanks
        </button>
      </div>

      ${evaluatedHtml}
    `;
  }

  // Export public namespace
  window.UBER_STORY = {
    selectDay,
    setPhaseFilter,
    setViewTab,
    selectBlankOption,
    checkChallenge: checkUberChallenge,
    resetChallenge: resetUberChallenge,
    setChallengeMode,
    executeLiveQuery
  };

  window.initUberStoryEngine = initUberStoryEngine;
})();
