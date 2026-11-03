// =============================================================================
// SPOTIFY AUDIO STREAMING & CREATOR ECONOMY STORY ENGINE
// Provides:
// - Audio Telemetry & Royalty Inbox view with unread tickets & team avatars
// - Context Briefing: Streaming Telemetry, Collaborative Filtering & Pro-Rata Royalty Architecture, Production Traps
// - Interactive Token-Blanks Puzzle Solver & Freeform Audio Telemetry & Royalty SQL Workstation
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
            window.soundFX.addXP(25, 'Spotify Dispatch Verified!');
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
    const saved = localStorage.getItem('sql_spotify_solved_days');
    if (saved) {
      solvedDays = new Set(JSON.parse(saved));
    }
  } catch (e) {
    console.warn('Could not read saved Spotify story progress:', e);
  }

  function initSpotifyStoryEngine() {
    renderSpotifyWorkspace();
  }

  function getActiveDayData() {
    const list = window.SPOTIFY_STORY_DATA || [];
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
    renderSpotifyWorkspace();
  }

  function setPhaseFilter(phase) {
    activePhaseFilter = phase;
    playUiSound('click');
    renderSpotifyWorkspace();
  }

  function setViewTab(tab) {
    activeTab = tab;
    playUiSound('click');
    renderSpotifyMainStage();
  }

  function selectBlankOption(blankId, val) {
    userBlanks[blankId] = val;
    isEvaluated = false;
    isSuccess = false;
    playUiSound('click');
    renderSpotifyChallengePanel();
  }

  function checkSpotifyChallenge() {
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
        localStorage.setItem('sql_spotify_solved_days', JSON.stringify(Array.from(solvedDays)));
      } catch (e) {}

      playUiSound('success');
      if (window.SQL_BUDDY && window.SQL_BUDDY.celebrate) {
        window.SQL_BUDDY.celebrate();
      }
    } else {
      playUiSound('error');
    }

    renderSpotifyChallengePanel();
  }

  function resetSpotifyChallenge() {
    userBlanks = {};
    isEvaluated = false;
    isSuccess = false;
    playUiSound('click');
    renderSpotifyChallengePanel();
  }

  function getCareerTitle(cleared) {
    if (cleared >= 25) {
      return { title: 'L6 Staff Audio Platform Architect', badge: 'L6 STAFF', color: '#a855f7' };
    }
    if (cleared >= 16) {
      return { title: 'L5 Senior Playlist & Discovery Quant', badge: 'L5 SENIOR', color: '#f59e0b' };
    }
    if (cleared >= 8) {
      return { title: 'L4 Confirmed Audio Telemetry Analyst', badge: 'L4 PROD', color: '#06c167' };
    }
    return { title: 'L4 Associate Audio Telemetry Analyst', badge: 'L4 ASSOC', color: '#276ef1' };
  }

  function renderSpotifyWorkspace() {
    const root = document.getElementById('spotifyStoryContentRoot');
    if (!root) return;

    const allList = window.SPOTIFY_STORY_DATA || [];
    const filteredList = activePhaseFilter === 'all'
      ? allList
      : allList.filter(d => d.week === activePhaseFilter);
    const active = getActiveDayData();
    const career = getCareerTitle(solvedDays.size);

    root.innerHTML = `
      <div class="amazon-sim-container spotify-sim-theme">
        <!-- TOP BRANDED HEADER -->
        <header class="amazon-sim-header">
          <div class="amazon-brand-row">
            <div class="amazon-logo-group">
              <span class="spotify-brand-badge">Spotify</span>
              <span class="amazon-team-tag">Payments Infrastructure, Radar ML &amp; Global Treasury</span>
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
              <button class="phase-filter-chip ${activePhaseFilter === 'all' ? 'active' : ''}" onclick="window.SPOTIFY_STORY.setPhaseFilter('all')">All</button>
              <button class="phase-filter-chip ${activePhaseFilter === 1 ? 'active' : ''}" onclick="window.SPOTIFY_STORY.setPhaseFilter(1)">W1: H3 Surge</button>
              <button class="phase-filter-chip ${activePhaseFilter === 2 ? 'active' : ''}" onclick="window.SPOTIFY_STORY.setPhaseFilter(2)">W2: Supply</button>
              <button class="phase-filter-chip ${activePhaseFilter === 3 ? 'active' : ''}" onclick="window.SPOTIFY_STORY.setPhaseFilter(3)">W3: Safety</button>
              <button class="phase-filter-chip ${activePhaseFilter === 4 ? 'active' : ''}" onclick="window.SPOTIFY_STORY.setPhaseFilter(4)">W4: Pricing</button>
            </div>

            <div class="ticket-cards-scroll-col">
              ${filteredList.map(item => {
                const isSelected = item.day === activeDayNumber;
                const isSolved = solvedDays.has(item.day);
                return `
                  <div class="ticket-item-card ${isSelected ? 'active' : ''} ${isSolved ? 'solved' : ''}" onclick="window.SPOTIFY_STORY.selectDay(${item.day})">
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
          <main class="amazon-main-stage" id="spotifyMainStageRoot">
            <!-- Dynamically populated by renderSpotifyMainStage -->
          </main>
        </div>
      </div>
    `;

    renderSpotifyMainStage();
  }

  function renderSpotifyMainStage() {
    const stageRoot = document.getElementById('spotifyMainStageRoot');
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
          <button class="stage-tab-btn ${activeTab === 'context' ? 'active' : ''}" onclick="window.SPOTIFY_STORY.setViewTab('context')">
            🎧 Audio Platform Briefing &amp; Streaming Invariants
          </button>
          <button class="stage-tab-btn ${activeTab === 'sample_table' ? 'active' : ''}" onclick="window.SPOTIFY_STORY.setViewTab('sample_table')">
            📊 Live Sample Telemetry &amp; Schema
          </button>
          <button class="stage-tab-btn ${activeTab === 'challenge' ? 'active' : ''}" onclick="window.SPOTIFY_STORY.setViewTab('challenge')">
            ⚡ SQL Workstation (Day Challenge)
          </button>
          <button class="stage-tab-btn ${activeTab === 'terminal' ? 'active' : ''}" onclick="window.SPOTIFY_STORY.setViewTab('terminal')">
            💻 Reference Query &amp; Expected SQL
          </button>
        </div>
      </section>

      <!-- ACTIVE TAB CONTENT BODY -->
      <section class="stage-tab-content-pane" id="spotifyTabContentRoot">
        <!-- Rendered based on activeTab -->
      </section>
    `;

    renderSpotifyTabContent();
  }

  function renderSpotifyTabContent() {
    const root = document.getElementById('spotifyTabContentRoot');
    if (!root) return;

    const d = getActiveDayData();
    if (!d) return;

    if (activeTab === 'context') {
      const cr = d.contextReport;
      const businessWhy = (typeof cr === 'object' && cr && cr.businessWhy)
        ? cr.businessWhy
        : (typeof cr === 'string' ? cr : `Essential audio playback telemetry and 30-second monetization invariants for ${d.title}.`);
      
      const tableName = (typeof d.schema === 'object' && d.schema) ? d.schema.tableName : (d.schema || 'audio_playback_sessions');
      const learningFocus = (typeof cr === 'object' && cr && Array.isArray(cr.learningFocus))
        ? cr.learningFocus
        : [
            `Targeting table \`${tableName}\` for streaming telemetry`,
            `Applying 30-second qualifying stream thresholds and aggregation rules`,
            `Auditing royalty distribution and recommendation metrics without skew`
          ];
      
      const realWorldTrap = (typeof cr === 'object' && cr && cr.realWorldTrap)
        ? cr.realWorldTrap
        : 'Never aggregate playback metrics without verifying duration thresholds; skips under 30 seconds distort royalty payouts.';
      
      const interviewRelevance = (typeof cr === 'object' && cr && cr.interviewRelevance)
        ? cr.interviewRelevance
        : 'High-frequency streaming data engineering and analytics question asked at Spotify, SoundCloud, and Apple Music.';

      root.innerHTML = `
        <div class="tab-pane-context">
          <div class="context-grid">
            <div class="context-box">
              <div class="box-label">🎧 Why This Matters in Music Streaming &amp; Creator Economics</div>
              <p class="box-text">${businessWhy}</p>
            </div>
            <div class="context-box">
              <div class="box-label">🎯 Key Learning &amp; Dispatch Focus</div>
              <ul class="focus-bullets">
                ${learningFocus.map(pt => `<li>${pt}</li>`).join('')}
              </ul>
            </div>
            <div class="context-box warning">
              <div class="box-label">⚠️ Production Trap &amp; Dispatch Invariant Risk</div>
              <p class="box-text">${realWorldTrap}</p>
            </div>
            <div class="context-box info">
              <div class="box-label">💼 Spotify &amp; Streaming Audio Interview Relevance</div>
              <p class="box-text">${interviewRelevance}</p>
            </div>
          </div>
        </div>
      `;
    } else if (activeTab === 'sample_table') {
      root.innerHTML = renderSampleTableHtml(d);
    } else if (activeTab === 'challenge') {
      root.innerHTML = `
        <div class="challenge-panel-view" id="spotifyChallengePanelView">
          <!-- Rendered dynamically -->
        </div>
      `;
      renderSpotifyChallengePanel();
    } else if (activeTab === 'terminal') {
      root.innerHTML = `
        <div class="tab-pane-terminal">
          <div class="terminal-guidance-card">
            <h3>💻 Production Reference SQL</h3>
            <p>Here is the benchmark query validated against Spotify's BigQuery &amp; Scio telemetry warehouse:</p>
            <pre class="terminal-code-block"><code>${d.challenge.expectedSql}</code></pre>
            <div style="margin-top: 14px;">
              <button class="btn-run-check" onclick="window.SPOTIFY_STORY.setViewTab('challenge'); window.SPOTIFY_STORY.setChallengeMode('live_repl'); window.SPOTIFY_STORY.executeLiveQuery(\`${d.challenge.expectedSql}\`);">
                Execute in SQL Workstation &rarr;
              </button>
            </div>
          </div>
        </div>
      `;
    }
  }

  function renderSampleTableHtml(d) {
    const tableName = (typeof d.schema === 'object' && d.schema) ? d.schema.tableName : (d.schema || '');
    const runner = window.SPOTIFY_SQL_RUNNER;
    const tableData = runner ? runner.getTableData(tableName) : null;

    let schemaPre = '';
    if (typeof d.schema === 'object' && d.schema && Array.isArray(d.schema.columns)) {
      schemaPre = `${tableName} (\n` + d.schema.columns.map(c => `  ${c.name} ${c.type} -- ${c.desc || ''}`).join('\n') + `\n)`;
    } else if (d.contextReport && d.contextReport.sampleSchema) {
      schemaPre = d.contextReport.sampleSchema;
    } else {
      schemaPre = `${tableName} (\n  -- Materialized in-memory dataset\n)`;
    }

    if (!tableData || tableData.length === 0) {
      return `
        <div class="sample-table-pane">
          <div class="sample-schema-box">
            <div class="schema-box-title">Schema Definition: <code>${tableName}</code></div>
            <pre class="schema-pre"><code>${schemaPre}</code></pre>
          </div>
          <div style="padding: 16px; color: #a1a1aa; font-size: 13px;">No sample rows materialized for table: <code>${tableName}</code></div>
        </div>
      `;
    }

    const columns = Object.keys(tableData[0]);
    return `
      <div class="sample-table-pane">
        <div class="sample-schema-box">
          <div class="schema-box-title">Schema Definition: <code>${tableName}</code></div>
          <pre class="schema-pre"><code>${schemaPre}</code></pre>
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
    renderSpotifyChallengePanel();
  }

  function executeLiveQuery(queryOverride) {
    const d = getActiveDayData();
    if (!d) return;

    const editor = document.getElementById('spotifyLiveSqlEditor');
    const sqlToRun = (queryOverride || (editor ? editor.value : liveQueryText) || '').trim();
    if (!sqlToRun) return;

    liveQueryText = sqlToRun;

    if (!window.SPOTIFY_SQL_RUNNER || typeof window.SPOTIFY_SQL_RUNNER.execute !== 'function') {
      liveQueryError = "SQL execution engine is initializing. Please wait a moment.";
      renderSpotifyChallengePanel();
      return;
    }

    const outcome = window.SPOTIFY_SQL_RUNNER.execute(sqlToRun, d.day);

    if (outcome.success) {
      liveQueryResult = outcome.rows;
      liveQueryError = null;
      liveQueryLatency = outcome.latency;

      if (liveQueryResult.length > 0) {
        solvedDays.add(d.day);
        try {
          localStorage.setItem('sql_spotify_solved_days', JSON.stringify(Array.from(solvedDays)));
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

    renderSpotifyChallengePanel();
  }

  function renderSpotifyChallengePanel() {
    const container = document.getElementById('spotifyChallengePanelView');
    if (!container || activeTab !== 'challenge') return;

    const day = getActiveDayData();
    const ch = day.challenge;

    const modeToggleHtml = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid #27272a;">
        <div style="font-size: 13px; font-weight: 600; color: #f4f4f5;">
          ${ch.instruction}
        </div>
        <div style="display:flex; gap:6px;">
          <button class="stage-tab-btn ${challengeMode === 'blanks' ? 'active' : ''}" style="padding:4px 10px; font-size:11.5px;" onclick="window.SPOTIFY_STORY.setChallengeMode('blanks')">
            🧩 Guided Blanks
          </button>
          <button class="stage-tab-btn ${challengeMode === 'live_repl' ? 'active' : ''}" style="padding:4px 10px; font-size:11.5px;" onclick="window.SPOTIFY_STORY.setChallengeMode('live_repl')">
            💻 Freeform REPL
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
              <span>✓ AUDIO TELEMETRY QUERY EXECUTED (${liveQueryResult.length} rows returned)</span>
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
          <textarea id="spotifyLiveSqlEditor" style="width: 100%; height: 140px; box-sizing: border-box;" placeholder="-- Enter SQL query against ${(typeof day.schema === 'object' && day.schema) ? day.schema.tableName : day.schema}...">${liveQueryText || ch.expectedSql}</textarea>
        </div>
        <div style="display:flex; gap: 10px;">
          <button class="btn-run-check" onclick="window.SPOTIFY_STORY.executeLiveQuery()">
            ▶ Execute Query
          </button>
          <button class="btn-reset-challenge" onclick="document.getElementById('spotifyLiveSqlEditor').value = '';">
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
        <select class="blank-select-dropdown ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}" onchange="window.SPOTIFY_STORY.selectBlankOption(${b.id}, this.value)">
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
              <span class="eval-icon">🎧</span>
              <div>
                <strong>STREAMING LOGIC VERIFIED! 30s Monetization &amp; Royalty Invariant Holds</strong>
                <div class="eval-sub">You verified Johan Lindqvist's playback telemetry requirement with exact relational logic.</div>
              </div>
            </div>
            <div class="manager-review-box">
              <div class="review-title">👨‍💻 Johan's Code Review:</div>
              <p class="review-comment">${ch.managerReview}</p>
            </div>
            <div class="eval-next-row" style="margin-top:14px;">
              ${day.day < 30 ? `
                <button class="btn-next-day" onclick="window.SPOTIFY_STORY.selectDay(${day.day + 1})">
                  Proceed to Day ${day.day + 1} &rarr;
                </button>
              ` : `
                <div class="capstone-congrats" style="color:#06c167; font-weight:700;">
                  🏆 You completed all 30 days of the Spotify Audio Telemetry &amp; Streaming Infrastructure Track!
                </div>
              `}
            </div>
          </div>
        `;
      } else {
        evaluatedHtml = `
          <div class="evaluation-card error">
            <div class="eval-header">
              <span class="eval-icon">⚠️</span>
              <div>
                <strong>AUDIO STREAMING OR SCHEMA ERROR DETECTED</strong>
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
        <button class="btn-run-check" onclick="window.SPOTIFY_STORY.checkChallenge()">
          ▶ Verify Dispatch Solution
        </button>
        <button class="btn-reset-challenge" onclick="window.SPOTIFY_STORY.resetChallenge()">
          Reset Blanks
        </button>
      </div>

      ${evaluatedHtml}
    `;
  }

  // Export public namespace
  window.SPOTIFY_STORY = {
    selectDay,
    setPhaseFilter,
    setViewTab,
    selectBlankOption,
    checkChallenge: checkSpotifyChallenge,
    resetChallenge: resetSpotifyChallenge,
    setChallengeMode,
    executeLiveQuery
  };

  window.initSpotifyStoryEngine = initSpotifyStoryEngine;
})();
