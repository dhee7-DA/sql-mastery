/**
 * SQL FOUNDRY: TIMED FAANG & WALL STREET MOCK TECHNICAL SCREEN ENGINE
 * 45-Minute Live Interview Screen Simulation with Automated WASM Test Judge,
 * Sir Bloop Interactive Interviewer, Hints System, and Hiring Committee Report Card.
 */

window.MockInterviewEngine = (function() {
  'use strict';

  let SQL = null;
  let db = null;
  let isInitialized = false;

  // Interview Session State
  let activeTrack = null;
  let currentRoundIndex = 0;
  let timeRemaining = 45 * 60; // 45:00 in seconds
  let timerInterval = null;
  let isPaused = false;
  let activeCategoryFilter = 'all';
  let roundSubmissions = {}; // { 0: { sql, passed, durationSec, hints } }

  function setCategoryFilter(category) {
    activeCategoryFilter = category;
    const container = document.getElementById('viewMockInterview');
    if (container && !activeTrack) {
      renderLobby(container);
    }
  }

  /**
   * Root DOM initialization
   */
  async function init() {
    const container = document.getElementById('viewMockInterview');
    if (!container) return;

    if (!activeTrack) {
      renderLobby(container);
    } else {
      renderCockpit(container);
    }

    if (!SQL && typeof window.initSqlJs === 'function') {
      try {
        SQL = await window.initSqlJs({ locateFile: f => f });
      } catch (e) {
        console.warn('WASM pre-load note:', e);
      }
    }

    isInitialized = true;
  }

  /**
   * Render Track Selection Lobby
   */
  function renderLobby(container) {
    const allTracks = (window.MOCK_INTERVIEW_DATA && window.MOCK_INTERVIEW_DATA.tracks) || [];
    
    const faangCount = allTracks.filter(t => (t.badge || '').includes('FAANG')).length;
    const quantCount = allTracks.filter(t => (t.badge || '').includes('Wall Street') || (t.badge || '').includes('HFT')).length;
    const logCount = allTracks.filter(t => (t.badge || '').includes('Logistics') || (t.badge || '').includes('Marketplace')).length;
    const finCount = allTracks.filter(t => (t.badge || '').includes('Fintech')).length;

    const filteredTracks = allTracks.filter(t => {
      if (activeCategoryFilter === 'all') return true;
      if (activeCategoryFilter === 'faang') return (t.badge || '').includes('FAANG');
      if (activeCategoryFilter === 'quant') return (t.badge || '').includes('Wall Street') || (t.badge || '').includes('HFT');
      if (activeCategoryFilter === 'logistics') return (t.badge || '').includes('Logistics') || (t.badge || '').includes('Marketplace');
      if (activeCategoryFilter === 'fintech') return (t.badge || '').includes('Fintech');
      return true;
    });

    container.innerHTML = `
      <div class="interview-lobby">
        <!-- Hero Header -->
        <div class="interview-hero">
          <div class="interview-hero-left">
            <div class="interview-hero-icon">🎯</div>
            <div>
              <h1 class="interview-hero-title">
                FAANG &amp; Wall Street Technical Screen
                <span class="interview-timer-badge">⏱️ 45-Min Timed Simulator</span>
              </h1>
              <div class="interview-hero-desc">
                Realistic Senior &amp; Staff Data Engineering live coding interviews across 7 industry tracks. Solve 3 progressive query rounds against in-memory WebAssembly databases with test assertions and Sir Bloop grading.
              </div>
            </div>
          </div>
        </div>

        <!-- Rules & Scoring Briefing -->
        <div class="interview-rules-strip">
          <div class="interview-rule-card">
            <div class="interview-rule-icon">⏱️</div>
            <div>
              <div class="interview-rule-title">45-Minute Total Clock</div>
              <div class="interview-rule-text">Manage your cadence across 3 rounds (Warmup 10m, Core 15m, Staff 20m).</div>
            </div>
          </div>
          <div class="interview-rule-card">
            <div class="interview-rule-icon">🧪</div>
            <div>
              <div class="interview-rule-title">Live Test Assertion Judge</div>
              <div class="interview-rule-text">Instant evaluation of row counts, column projections, and value diffs.</div>
            </div>
          </div>
          <div class="interview-rule-card">
            <div class="interview-rule-icon">💡</div>
            <div>
              <div class="interview-rule-title">Hints with Tradeoffs</div>
              <div class="interview-rule-text">Request hints when stuck; each hint deducts 5 points from the final committee rubric.</div>
            </div>
          </div>
          <div class="interview-rule-card">
            <div class="interview-rule-icon">📋</div>
            <div>
              <div class="interview-rule-title">Formal Committee Rubric</div>
              <div class="interview-rule-text">Receive an L4–L6 verdict (Strong Hire, Hire, Leaning Hire, No Hire) upon completion.</div>
            </div>
          </div>
        </div>

        <!-- Sector Filter Pills -->
        <div class="interview-filter-bar">
          <button class="interview-filter-pill ${activeCategoryFilter === 'all' ? 'active' : ''}" onclick="window.MockInterviewEngine.setCategoryFilter('all')">
            All Tracks (${allTracks.length})
          </button>
          <button class="interview-filter-pill ${activeCategoryFilter === 'faang' ? 'active' : ''}" onclick="window.MockInterviewEngine.setCategoryFilter('faang')">
            FAANG &amp; Big Tech (${faangCount})
          </button>
          <button class="interview-filter-pill ${activeCategoryFilter === 'quant' ? 'active' : ''}" onclick="window.MockInterviewEngine.setCategoryFilter('quant')">
            Wall Street &amp; Quant (${quantCount})
          </button>
          <button class="interview-filter-pill ${activeCategoryFilter === 'logistics' ? 'active' : ''}" onclick="window.MockInterviewEngine.setCategoryFilter('logistics')">
            Marketplaces &amp; Logistics (${logCount})
          </button>
          <button class="interview-filter-pill ${activeCategoryFilter === 'fintech' ? 'active' : ''}" onclick="window.MockInterviewEngine.setCategoryFilter('fintech')">
            Fintech &amp; Ledgers (${finCount})
          </button>
        </div>

        <!-- Company Tracks Grid -->
        <div class="interview-tracks-grid">
          ${filteredTracks.map(t => `
            <div class="interview-track-card">
              <div class="interview-track-top">
                <div class="interview-track-icon-group">
                  <div class="interview-track-icon">${t.icon}</div>
                  <div>
                    <h3 class="interview-track-company">${escapeHtml(t.company)}</h3>
                    <div class="interview-track-role">${escapeHtml(t.role)}</div>
                  </div>
                </div>
                <div style="display: flex; gap: 0.4rem; align-items: center;">
                  <span class="interview-badge-sector">${escapeHtml(t.badge || '')}</span>
                  <span class="interview-badge-hard">${t.difficulty}</span>
                </div>
              </div>
              <div class="interview-track-desc">${escapeHtml(t.description)}</div>
              <div class="interview-track-meta">
                <span>Interviewer: <strong>${t.interviewer.avatar} ${escapeHtml(t.interviewer.name)}</strong></span>
                <span class="interview-track-comp">${escapeHtml(t.compensationRange)}</span>
              </div>
              <button class="interview-btn-start" onclick="window.MockInterviewEngine.startScreen('${t.id}')">
                Begin 45-Min Screen 🎯
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  /**
   * Start 45-Minute Interview Screen
   */
  async function startScreen(trackId) {
    const tracks = (window.MOCK_INTERVIEW_DATA && window.MOCK_INTERVIEW_DATA.tracks) || [];
    const t = tracks.find(item => item.id === trackId);
    if (!t) return;

    activeTrack = t;
    currentRoundIndex = 0;
    timeRemaining = (t.timeLimitMinutes || 45) * 60;
    hintsUsedCount = 0;
    roundSubmissions = {};
    isPaused = false;

    // Initialize WASM DB for track
    if (!SQL && typeof window.initSqlJs === 'function') {
      SQL = await window.initSqlJs({ locateFile: f => f });
    }
    if (SQL) {
      db = new SQL.Database();
      db.run(activeTrack.seedSql);
    }

    const container = document.getElementById('viewMockInterview');
    renderCockpit(container);
    startTimer();
    loadRound(0);

    if (window.soundFX && typeof window.soundFX.playClick === 'function') {
      window.soundFX.playClick();
    }
  }

  /**
   * Render Active Interview Cockpit
   */
  function renderCockpit(container) {
    container.innerHTML = `
      <div class="interview-cockpit active">
        <!-- Top Sticky HUD -->
        <div class="interview-hud">
          <div class="interview-hud-left">
            <div class="interview-hud-company">
              <span>${activeTrack.icon}</span>
              <span>${escapeHtml(activeTrack.company)}</span>
              <span class="terminal-table-badge">${escapeHtml(activeTrack.role)}</span>
            </div>

            <!-- Round Navigator Pills -->
            <div class="interview-rounds-nav">
              ${activeTrack.rounds.map((r, idx) => `
                <button 
                  class="interview-round-pill ${idx === currentRoundIndex ? 'active' : ''}" 
                  id="roundPill_${idx}" 
                  onclick="window.MockInterviewEngine.selectRound(${idx})"
                >
                  Round ${r.roundNum} (${r.timeBudgetMinutes}m)
                </button>
              `).join('')}
            </div>
          </div>

          <div class="interview-hud-right">
            <div class="interview-clock-widget" id="interviewClockDisplay">
              ⏱️ <span id="clockMinutes">45</span>:<span id="clockSeconds">00</span>
            </div>
            <button class="interview-btn-hud" id="btnPauseClock" onclick="window.MockInterviewEngine.togglePause()">
              ⏸️ Pause
            </button>
            <button class="interview-btn-hud" onclick="window.MockInterviewEngine.quitScreen()" style="color: #dc2626;">
              ✕ End Screen
            </button>
          </div>
        </div>

        <!-- Main Split Screen -->
        <div class="interview-split">
          <!-- Left: Prompt & Sir Bloop Dialogue -->
          <div class="interview-prompt-pane">
            <!-- Sir Bloop Dialogue -->
            <div class="interview-bloop-speech">
              <div class="interview-bloop-avatar" id="interviewBloopAvatar">
                ${activeTrack.interviewer.avatar}
              </div>
              <div class="interview-bloop-text">
                <h4 id="interviewInterviewerHeader">${escapeHtml(activeTrack.interviewer.name)} (${escapeHtml(activeTrack.interviewer.title)})</h4>
                <p id="interviewBloopSpeechText">Welcome to the technical screen! Let's examine the first problem.</p>
              </div>
            </div>

            <!-- Problem Card -->
            <div class="interview-problem-card">
              <h2 class="interview-problem-title" id="interviewProblemTitle">Round 1</h2>
              <div class="interview-problem-body" id="interviewProblemBody">
                <!-- Prompt HTML populated dynamically -->
              </div>

              <!-- Hints Accordion -->
              <div class="interview-hints-box" id="interviewHintsBox">
                <div class="interview-hints-header" onclick="window.MockInterviewEngine.toggleHints()">
                  <span>💡 Interviewer Hints (<span id="hintsUsedCountBadge">0</span> used)</span>
                  <span id="hintsChevron">▼</span>
                </div>
                <div class="interview-hints-body" id="interviewHintsContent">
                  <!-- Dynamically populated -->
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Editor & Test Assertion Runner -->
          <div class="interview-editor-pane">
            <!-- Code Editor Card -->
            <div class="interview-editor-card">
              <div class="interview-editor-toolbar">
                <span class="interview-toolbar-title" id="interviewEditorTitle">SQL Solution Console</span>
                <div class="interview-editor-btns">
                  <button class="interview-btn-run" onclick="window.MockInterviewEngine.runTestCases()">
                    ▶ Test Code (⌘⏎)
                  </button>
                  <button class="interview-btn-submit" onclick="window.MockInterviewEngine.submitRound()">
                    ✓ Submit Round
                  </button>
                </div>
              </div>

              <div class="interview-code-wrap">
                <div class="interview-gutters" id="interviewGutters">1</div>
                <textarea 
                  class="interview-textarea" 
                  id="interviewTextarea" 
                  spellcheck="false" 
                  placeholder="-- Write your SQL solution here..."
                ></textarea>
              </div>
            </div>

            <!-- Test Assertion Runner Card -->
            <div class="interview-test-card">
              <div class="interview-test-header">
                <span class="interview-test-status" id="interviewTestStatus">
                  <span>⚪</span> No tests executed yet. Click "Test Code" to verify against test suite.
                </span>
                <span class="terminal-table-badge" id="interviewAssertionMeta">0 / 0 passed</span>
              </div>
              <div class="interview-test-diff-wrap" id="interviewTestDiffWrap">
                <div class="terminal-empty-state">
                  <div class="terminal-empty-icon">🧪</div>
                  <div>Run tests to see live comparison against target result set.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Report Card Modal (Rendered on Completion) -->
      <div class="interview-report-modal" id="interviewReportModal">
        <div class="interview-report-card" id="interviewReportContent"></div>
      </div>
    `;

    setupCockpitEvents();
  }

  function setupCockpitEvents() {
    const textarea = document.getElementById('interviewTextarea');
    const gutters = document.getElementById('interviewGutters');

    if (textarea) {
      textarea.addEventListener('input', () => updateGutters(textarea, gutters));
      textarea.addEventListener('scroll', () => {
        if (gutters) gutters.scrollTop = textarea.scrollTop;
      });

      textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          e.preventDefault();
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          textarea.value = textarea.value.substring(0, start) + '  ' + textarea.value.substring(end);
          textarea.selectionStart = textarea.selectionEnd = start + 2;
          updateGutters(textarea, gutters);
        }

        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          runTestCases();
        }
      });
    }
  }

  function updateGutters(textarea, gutters) {
    if (!textarea || !gutters) return;
    const lines = (textarea.value.match(/\n/g) || []).length + 1;
    let gutterHtml = '';
    for (let i = 1; i <= lines; i++) {
      gutterHtml += i + '<br>';
    }
    gutters.innerHTML = gutterHtml;
  }

  /**
   * Load Round by Index
   */
  function loadRound(roundIdx) {
    currentRoundIndex = roundIdx;
    const round = activeTrack.rounds[roundIdx];
    if (!round) return;

    // Update Pills
    activeTrack.rounds.forEach((r, idx) => {
      const pill = document.getElementById(`roundPill_${idx}`);
      if (pill) {
        pill.className = `interview-round-pill ${idx === currentRoundIndex ? 'active' : ''} ${roundSubmissions[idx] && roundSubmissions[idx].passed ? 'passed' : ''}`;
      }
    });

    // Update Problem Card
    const titleEl = document.getElementById('interviewProblemTitle');
    const bodyEl = document.getElementById('interviewProblemBody');
    const editorTitleEl = document.getElementById('interviewEditorTitle');
    const speechEl = document.getElementById('interviewBloopSpeechText');

    if (titleEl) titleEl.textContent = round.title;
    if (bodyEl) bodyEl.innerHTML = formatMarkdown(round.prompt);
    if (editorTitleEl) editorTitleEl.textContent = `${activeTrack.company} &mdash; Round ${round.roundNum}`;
    if (speechEl) speechEl.innerHTML = round.bloopGreeting || "Let's examine this round's requirements.";

    // Update Editor content
    const textarea = document.getElementById('interviewTextarea');
    const gutters = document.getElementById('interviewGutters');
    if (textarea) {
      const saved = roundSubmissions[roundIdx] ? roundSubmissions[roundIdx].sql : round.starterSql;
      textarea.value = saved || '';
      updateGutters(textarea, gutters);
    }

    // Reset Test status for new round if unsubmitted
    const statusEl = document.getElementById('interviewTestStatus');
    const diffWrap = document.getElementById('interviewTestDiffWrap');
    const metaEl = document.getElementById('interviewAssertionMeta');

    if (roundSubmissions[roundIdx] && roundSubmissions[roundIdx].passed) {
      if (statusEl) statusEl.innerHTML = `<span style="color:#16a34a;">✅</span> Round ${round.roundNum} Passed!`;
      if (metaEl) metaEl.textContent = 'All assertions verified';
    } else {
      if (statusEl) statusEl.innerHTML = `<span>⚪</span> Ready for testing. Press ⌘⏎ to evaluate.`;
      if (metaEl) metaEl.textContent = '0 / 0 passed';
      if (diffWrap) {
        diffWrap.innerHTML = `
          <div class="terminal-empty-state">
            <div class="terminal-empty-icon">🧪</div>
            <div>Run tests to see live comparison against target result set.</div>
          </div>
        `;
      }
    }

    renderHints(round);
  }

  function selectRound(roundIdx) {
    // Save current textarea code into memory
    const textarea = document.getElementById('interviewTextarea');
    if (textarea && roundSubmissions[currentRoundIndex]) {
      roundSubmissions[currentRoundIndex].sql = textarea.value;
    }
    loadRound(roundIdx);
  }

  function renderHints(round) {
    const hintsContent = document.getElementById('interviewHintsContent');
    const hintsCountBadge = document.getElementById('hintsUsedCountBadge');
    if (!hintsContent) return;

    if (hintsCountBadge) hintsCountBadge.textContent = hintsUsedCount;

    hintsContent.innerHTML = `
      <div style="font-size: 0.74rem; color: #71717a; margin-bottom: 0.35rem;">
        Requesting a hint simulates asking your interviewer for help (-5 points on rubric).
      </div>
      ${round.hints.map((hint, idx) => `
        <div style="padding: 0.5rem; background: var(--bg-surface, #ffffff); border: 1px solid var(--border-default, #d4d4d8); border-radius: 4px; font-size: 0.78rem;">
          <strong>Hint ${idx + 1}:</strong> ${escapeHtml(hint)}
        </div>
      `).join('')}
    `;
  }

  function toggleHints() {
    const box = document.getElementById('interviewHintsBox');
    const chevron = document.getElementById('hintsChevron');
    if (box) {
      box.classList.toggle('open');
      if (box.classList.contains('open')) {
        hintsUsedCount++;
        const hintsCountBadge = document.getElementById('hintsUsedCountBadge');
        if (hintsCountBadge) hintsCountBadge.textContent = hintsUsedCount;
        if (chevron) chevron.textContent = '▲';
        setSpeech("Interviewer Hint applied. (-5 pts on technical rubric)", "thinking");
      } else {
        if (chevron) chevron.textContent = '▼';
      }
    }
  }

  /**
   * Run Test Cases against SQLite WASM
   */
  function runTestCases() {
    const textarea = document.getElementById('interviewTextarea');
    if (!textarea || !db) return;

    const round = activeTrack.rounds[currentRoundIndex];
    const userSql = textarea.value.trim();
    if (!userSql) {
      alert('Please write an SQL query before testing.');
      return;
    }

    const statusEl = document.getElementById('interviewTestStatus');
    const diffWrap = document.getElementById('interviewTestDiffWrap');
    const metaEl = document.getElementById('interviewAssertionMeta');

    const startTime = performance.now();
    try {
      // 1. Execute User SQL
      const userRes = db.exec(userSql);
      const userElapsed = (performance.now() - startTime).toFixed(1);

      // 2. Execute Expected Solution SQL
      const expectedRes = db.exec(round.solutionSql);

      if (!userRes || userRes.length === 0) {
        throw new Error('Query executed but returned no result set (0 rows).');
      }

      const userCols = userRes[0].columns;
      const userRows = userRes[0].values;
      const expectedCols = expectedRes[0].columns;
      const expectedRows = expectedRes[0].values;

      // 3. Assertions
      const colMismatch = userCols.length !== expectedCols.length;
      const rowMismatch = userRows.length !== expectedRows.length;
      let valuesMatch = true;

      if (!rowMismatch && !colMismatch) {
        for (let i = 0; i < expectedRows.length; i++) {
          for (let j = 0; j < expectedRows[i].length; j++) {
            const exp = expectedRows[i][j];
            const act = userRows[i][j];
            if (typeof exp === 'number' && typeof act === 'number') {
              if (Math.abs(exp - act) > 0.05) valuesMatch = false;
            } else if (String(exp).toLowerCase().trim() !== String(act).toLowerCase().trim()) {
              valuesMatch = false;
            }
          }
        }
      } else {
        valuesMatch = false;
      }

      const isPass = !rowMismatch && valuesMatch;

      if (isPass) {
        if (statusEl) {
          statusEl.className = 'interview-test-status passed';
          statusEl.innerHTML = `<span>✅</span> PASS: All ${expectedRows.length} rows and calculations match expected output! (${userElapsed}ms)`;
        }
        if (metaEl) metaEl.textContent = `${expectedRows.length} / ${expectedRows.length} passed`;

        renderDiffTable(diffWrap, userCols, userRows, expectedRows, true);
        setSpeech(`Spot on! Your query matched all test cases in ${userElapsed}ms. Click <strong>Submit Round</strong> to lock in your score!`, 'celebrate');

        if (window.soundFX && typeof window.soundFX.playSuccess === 'function') {
          window.soundFX.playSuccess();
        }
      } else {
        if (statusEl) {
          statusEl.className = 'interview-test-status failed';
          statusEl.innerHTML = `<span>❌</span> FAIL: Output mismatch. Returned ${userRows.length} rows (expected ${expectedRows.length}).`;
        }
        if (metaEl) metaEl.textContent = `0 / ${expectedRows.length} passed`;

        renderDiffTable(diffWrap, userCols, userRows, expectedRows, false);
        setSpeech(`Hmm, not quite. Double-check your column formulas, NULL handling, or GROUP BY clauses.`, 'thinking');

        if (window.soundFX && typeof window.soundFX.playError === 'function') {
          window.soundFX.playError();
        }
      }

      // Record submission attempt
      roundSubmissions[currentRoundIndex] = {
        sql: userSql,
        passed: isPass,
        elapsedMs: userElapsed
      };
    } catch (err) {
      if (statusEl) {
        statusEl.className = 'interview-test-status failed';
        statusEl.innerHTML = `<span>❌</span> SQL Syntax / Execution Error`;
      }
      if (diffWrap) {
        diffWrap.innerHTML = `
          <div class="terminal-error-card">
            <strong>Runtime Error:</strong> ${escapeHtml(err.message)}
          </div>
        `;
      }
      setSpeech(`Syntax error in your query: <em>${escapeHtml(err.message)}</em>. Check for missing commas or unclosed brackets.`, 'thinking');

      if (window.soundFX && typeof window.soundFX.playError === 'function') {
        window.soundFX.playError();
      }
    }
  }

  function renderDiffTable(container, cols, actualRows, expectedRows, isPass) {
    if (!container) return;
    let html = `
      <table class="terminal-table" style="font-size: 0.74rem;">
        <thead>
          <tr>
            <th class="terminal-row-num">#</th>
            ${cols.map(c => `<th>${escapeHtml(c)}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
    `;

    actualRows.slice(0, 15).forEach((row, idx) => {
      html += `<tr><td class="terminal-row-num">${idx + 1}</td>`;
      row.forEach(val => {
        html += `<td>${val === null ? '<span class="terminal-null-tag">NULL</span>' : escapeHtml(String(val))}</td>`;
      });
      html += `</tr>`;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
  }

  /**
   * Submit Round and Advance
   */
  function submitRound() {
    const sub = roundSubmissions[currentRoundIndex];
    if (!sub || !sub.passed) {
      if (!confirm('Your query has not passed all test cases yet. Submitting now will award 0 points for this round. Advance anyway?')) {
        return;
      }
    }

    // Mark current pill passed
    const pill = document.getElementById(`roundPill_${currentRoundIndex}`);
    if (pill) {
      pill.className = `interview-round-pill passed`;
    }

    if (currentRoundIndex < activeTrack.rounds.length - 1) {
      loadRound(currentRoundIndex + 1);
      setSpeech(`Round ${currentRoundIndex} submitted! Moving forward to Round ${currentRoundIndex + 1}.`, 'happy');
    } else {
      // Completed all 3 rounds!
      finishInterview();
    }
  }

  /**
   * Countdown Timer
   */
  function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (isPaused) return;

      timeRemaining--;
      updateClockUI();

      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        alert('Time is up for this interview screen!');
        finishInterview();
      }
    }, 1000);
  }

  function updateClockUI() {
    const minEl = document.getElementById('clockMinutes');
    const secEl = document.getElementById('clockSeconds');
    const clockWidget = document.getElementById('interviewClockDisplay');

    if (!minEl || !secEl) return;

    const mins = Math.floor(timeRemaining / 60);
    const secs = timeRemaining % 60;

    minEl.textContent = String(mins).padStart(2, '0');
    secEl.textContent = String(secs).padStart(2, '0');

    if (clockWidget) {
      if (timeRemaining <= 300) {
        clockWidget.className = 'interview-clock-widget danger';
      } else if (timeRemaining <= 600) {
        clockWidget.className = 'interview-clock-widget warning';
      } else {
        clockWidget.className = 'interview-clock-widget';
      }
    }
  }

  function togglePause() {
    isPaused = !isPaused;
    const btn = document.getElementById('btnPauseClock');
    if (btn) {
      btn.textContent = isPaused ? '▶ Resume' : '⏸️ Pause';
    }
    setSpeech(isPaused ? "Interview paused. Timer stopped." : "Interview resumed! Keep going.", 'happy');
  }

  function quitScreen() {
    if (!confirm('Are you sure you want to end this interview screen? Your session will be evaluated as-is.')) {
      return;
    }
    finishInterview();
  }

  /**
   * Finish Interview & Render Report Card
   */
  function finishInterview() {
    clearInterval(timerInterval);

    // Calculate Rubric Score
    let roundPoints = 0;
    let passedCount = 0;

    activeTrack.rounds.forEach((r, idx) => {
      const sub = roundSubmissions[idx];
      if (sub && sub.passed) {
        passedCount++;
        roundPoints += (idx === 0 ? 30 : 35);
      }
    });

    // Time remaining bonus (up to 10 points)
    const timeBonus = Math.min(10, Math.floor(timeRemaining / 300));
    
    // Hint penalty
    const hintPenalty = hintsUsedCount * 5;

    let finalScore = Math.max(0, Math.min(100, roundPoints + timeBonus - hintPenalty));

    // Verdict Matrix
    let verdict = 'NO HIRE';
    let verdictClass = 'no-hire';
    if (finalScore >= 88) {
      verdict = 'STRONG HIRE (L6 Staff / VP)';
      verdictClass = 'strong-hire';
    } else if (finalScore >= 72) {
      verdict = 'HIRE (L5 Senior)';
      verdictClass = 'strong-hire';
    } else if (finalScore >= 55) {
      verdict = 'LEANING HIRE (L4 Mid-Level)';
      verdictClass = 'strong-hire';
    }

    renderReportCard(finalScore, verdict, verdictClass, passedCount, timeBonus, hintPenalty);

    if (window.soundFX && typeof window.soundFX.playCelebrate === 'function') {
      window.soundFX.playCelebrate();
    }
  }

  function renderReportCard(finalScore, verdict, verdictClass, passedCount, timeBonus, hintPenalty) {
    const modal = document.getElementById('interviewReportModal');
    const content = document.getElementById('interviewReportContent');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="interview-report-header">
        <div style="font-size: 2.5rem;">${finalScore >= 70 ? '🎉' : '📋'}</div>
        <div class="interview-report-verdict-badge ${verdictClass}">${escapeHtml(verdict)}</div>
        <h2 style="margin: 0.2rem 0; font-family: var(--font-mono, monospace); font-size: 1.25rem;">
          ${escapeHtml(activeTrack.company)} &bull; Technical Debrief
        </h2>
        <div style="font-size: 0.8rem; color: #71717a;">
          Candidate assessed across 3 algorithmic data pipeline challenges.
        </div>
      </div>

      <div class="interview-report-score-row">
        <div class="interview-score-item">
          <strong>${finalScore} / 100</strong>
          <span>Final Rubric Score</span>
        </div>
        <div class="interview-score-item">
          <strong>${passedCount} / 3</strong>
          <span>Rounds Passed</span>
        </div>
        <div class="interview-score-item">
          <strong>+${timeBonus}</strong>
          <span>Time Bonus</span>
        </div>
        <div class="interview-score-item">
          <strong style="color: ${hintPenalty > 0 ? '#dc2626' : 'inherit'};">-${hintPenalty}</strong>
          <span>Hint Penalty</span>
        </div>
      </div>

      <div class="interview-report-rounds-list">
        ${activeTrack.rounds.map((r, idx) => {
          const sub = roundSubmissions[idx];
          const passed = sub && sub.passed;
          return `
            <div class="interview-report-round-item">
              <div>
                <strong>Round ${r.roundNum}:</strong> ${escapeHtml(r.title)}
              </div>
              <span class="terminal-table-badge" style="color: ${passed ? '#16a34a' : '#dc2626'};">
                ${passed ? '✓ PASSED' : '✕ INCOMPLETE'}
              </span>
            </div>
          `;
        }).join('')}
      </div>

      <div class="interview-report-actions">
        <button class="terminal-btn" onclick="window.MockInterviewEngine.closeReportAndLobby()">
          Try Another Company Track
        </button>
        <button class="terminal-btn terminal-btn-primary" onclick="window.MockInterviewEngine.closeReportAndLobby()">
          Return to Lobby
        </button>
      </div>
    `;

    modal.classList.add('open');
  }

  function closeReportAndLobby() {
    const modal = document.getElementById('interviewReportModal');
    if (modal) modal.classList.remove('open');
    activeTrack = null;
    init();
  }

  function setSpeech(html, mood = 'happy') {
    const el = document.getElementById('interviewBloopSpeechText');
    if (el) el.innerHTML = html;
    if (window.SQL_BUDDY && typeof window.SQL_BUDDY.say === 'function') {
      window.SQL_BUDDY.say(stripHtml(html), 4500, mood);
    }
  }

  function formatMarkdown(md) {
    if (!md) return '';
    return md
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
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

  function stripHtml(html) {
    return html.replace(/<[^>]*>?/gm, '');
  }

  return {
    init,
    startScreen,
    selectRound,
    toggleHints,
    runTestCases,
    submitRound,
    togglePause,
    quitScreen,
    closeReportAndLobby,
    setCategoryFilter
  };
})();
