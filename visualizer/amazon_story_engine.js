// =============================================================================
// AMAZON STORY ENGINE: INTERACTIVE DAY-IN-THE-LIFE AT AMAZON SIMULATOR
// Provides:
// - Chime / Slack Inbox view with unread tickets & team avatars
// - Deep Context Report Viewer: "Why this matters", "Learning Focus", "Pitfalls & Traps"
// - Interactive Token-Blanks Puzzle Solver with Immediate Evaluation & Audio FX
// - Freeform SQL Terminal for testing queries against live dummy data
// - Manager Code Review & Career Level Promotion System (L4 -> L4 Confirmed -> L5)
// =============================================================================

(function() {
  let activeDayNumber = 1;
  let activeTab = 'context'; // 'context' | 'challenge' | 'terminal'
  let userBlanks = {};
  let isEvaluated = false;
  let isSuccess = false;
  let solvedDays = new Set();

  // Load solved days from localStorage if available
  try {
    const saved = localStorage.getItem('sql_amazon_solved_days');
    if (saved) {
      solvedDays = new Set(JSON.parse(saved));
    }
  } catch (e) {
    console.warn('Could not read saved Amazon story progress:', e);
  }

  function initAmazonStoryEngine() {
    renderAmazonWorkspace();
  }

  function getActiveDayData() {
    const list = window.AMAZON_ANALYST_STORY_DATA || [];
    return list.find(d => d.day === activeDayNumber) || list[0];
  }

  function selectDay(dayNum) {
    activeDayNumber = dayNum;
    userBlanks = {};
    isEvaluated = false;
    isSuccess = false;
    renderAmazonWorkspace();
    if (window.AudioFX) window.AudioFX.playClick();
  }

  function setViewTab(tabKey) {
    activeTab = tabKey;
    renderAmazonMainStage();
    if (window.AudioFX) window.AudioFX.playClick();
  }

  function selectBlankOption(blankId, chosenOption) {
    userBlanks[blankId] = chosenOption;
    renderAmazonChallengePanel();
  }

  function checkAmazonChallenge() {
    const dayData = getActiveDayData();
    if (!dayData || !dayData.challenge) return;

    let correctCount = 0;
    const total = dayData.challenge.blanks.length;

    dayData.challenge.blanks.forEach(b => {
      if (userBlanks[b.id] === b.answer) {
        correctCount++;
      }
    });

    isEvaluated = true;
    isSuccess = (correctCount === total);

    if (isSuccess) {
      solvedDays.add(dayData.day);
      try {
        localStorage.setItem('sql_amazon_solved_days', JSON.stringify(Array.from(solvedDays)));
      } catch (e) {}

      if (window.AudioFX) window.AudioFX.playSuccess();
      if (window.SQL_BUDDY && window.SQL_BUDDY.celebrate) {
        window.SQL_BUDDY.celebrate();
      }
    } else {
      if (window.AudioFX) window.AudioFX.playError();
    }

    renderAmazonChallengePanel();
  }

  function resetAmazonChallenge() {
    userBlanks = {};
    isEvaluated = false;
    isSuccess = false;
    renderAmazonChallengePanel();
  }

  function getCareerTitle(solvedCount) {
    if (solvedCount >= 30) return { title: "L5 Senior Business Intelligence Engineer", badge: "🏆 L5 PROMOTED", color: "#10b981" };
    if (solvedCount >= 21) return { title: "L4 Prime Day War Room Hero", badge: "⭐ WAR ROOM LEAD", color: "#f59e0b" };
    if (solvedCount >= 14) return { title: "L4 WBR Metrics Specialist", badge: "📈 WBR CONTRIBUTOR", color: "#38bdf8" };
    if (solvedCount >= 7) return { title: "L4 Confirmed Data Analyst", badge: "✅ L4 CONFIRMED", color: "#a855f7" };
    return { title: "L4 Apprentice Analyst (Onboarding)", badge: "🌱 ONBOARDING", color: "#94a3b8" };
  }

  function renderAmazonWorkspace() {
    const root = document.getElementById('amazonStoryContentRoot');
    if (!root) return;

    const list = window.AMAZON_ANALYST_STORY_DATA || [];
    const active = getActiveDayData();
    const career = getCareerTitle(solvedDays.size);

    root.innerHTML = `
      <div class="amazon-sim-container">
        <!-- TOP BRANDED HEADER -->
        <header class="amazon-sim-header">
          <div class="amazon-brand-row">
            <div class="amazon-logo-group">
              <span class="amazon-prime-badge">amazon</span>
              <span class="amazon-team-tag">Retail &amp; Operations Data Analytics</span>
            </div>
            <div class="amazon-career-status">
              <div class="career-text-col">
                <span class="career-role-title">${career.title}</span>
                <span class="career-progress-sub">Solved ${solvedDays.size} of 30 Work Days</span>
              </div>
              <span class="career-pill" style="color: ${career.color}; border-color: ${career.color}44; background: ${career.color}15;">
                ${career.badge}
              </span>
            </div>
          </div>
        </header>

        <!-- 3-PANE WORKSPACE: LEFT (TICKETS), CENTER (STAGE), RIGHT (SCHEMA) -->
        <div class="amazon-workspace-grid">
          <!-- LEFT COLUMN: 30-DAY CHIME INBOX -->
          <aside class="amazon-tickets-sidebar">
            <div class="sidebar-header-box">
              <div class="sidebar-title-row">
                <span>💬 Chime Inbox</span>
                <span class="inbox-count-pill">${list.length} Tickets</span>
              </div>
              <div class="sidebar-phase-desc">Phase: ${active.phase}</div>
            </div>

            <div class="amazon-tickets-list">
              ${list.map(d => {
                const isSelected = d.day === activeDayNumber;
                const isDone = solvedDays.has(d.day);
                return `
                  <button class="amazon-ticket-card ${isSelected ? 'active' : ''} ${isDone ? 'completed' : ''}" onclick="window.AMAZON_STORY.selectDay(${d.day})">
                    <div class="ticket-card-top">
                      <span class="ticket-day-badge ${isDone ? 'done' : ''}">Day ${String(d.day).padStart(2, '0')}</span>
                      <span class="ticket-priority-pill priority-${d.priority.split(' ')[0].toLowerCase()}">${d.priority}</span>
                      ${isDone ? '<span class="ticket-check-mark">✓</span>' : ''}
                    </div>
                    <div class="ticket-sender-row">
                      <span class="ticket-avatar">${d.senderAvatar}</span>
                      <div class="ticket-sender-info">
                        <span class="ticket-sender-name">${d.sender}</span>
                        <span class="ticket-dept-text">${d.department}</span>
                      </div>
                    </div>
                    <div class="ticket-subject-title">${d.title.split(': ')[1] || d.title}</div>
                  </button>
                `;
              }).join('')}
            </div>
          </aside>

          <!-- CENTER COLUMN: MAIN STAGE (TICKET MESSAGE + CONTEXT REPORT + CHALLENGE) -->
          <main class="amazon-main-stage" id="amazonMainStage">
            <!-- Dynamically populated by renderAmazonMainStage() -->
          </main>
        </div>
      </div>
    `;

    renderAmazonMainStage();
  }

  function renderAmazonMainStage() {
    const stage = document.getElementById('amazonMainStage');
    if (!stage) return;

    const day = getActiveDayData();
    if (!day) return;

    stage.innerHTML = `
      <!-- ACTIVE TICKET HERO CARD (SLACK / CHIME MEMO) -->
      <section class="chime-memo-card">
        <div class="chime-memo-header">
          <div class="chime-sender-block">
            <span class="chime-avatar-large">${day.senderAvatar}</span>
            <div>
              <div class="chime-sender-name-row">
                <span class="chime-name">${day.sender}</span>
                <span class="chime-role-badge">${day.senderRole}</span>
                <span class="chime-timestamp">Today at 09:14 AM</span>
              </div>
              <div class="chime-dept-label">Direct message via Amazon Chime &bull; <strong>${day.department}</strong></div>
            </div>
          </div>
          <div class="chime-priority-badge">${day.priority}</div>
        </div>

        <div class="chime-speech-bubble">
          <p class="chime-message-text">"${day.chimeMessage}"</p>
        </div>
      </section>

      <!-- NAVIGATION TABS: CONTEXT REPORT vs INTERACTIVE CHALLENGE -->
      <div class="amazon-tabs-bar">
        <button class="amazon-tab-btn ${activeTab === 'context' ? 'active' : ''}" onclick="window.AMAZON_STORY.setViewTab('context')">
          📋 Deep Context Report &amp; Briefing
        </button>
        <button class="amazon-tab-btn ${activeTab === 'challenge' ? 'active' : ''}" onclick="window.AMAZON_STORY.setViewTab('challenge')">
          ⚡ Interactive SQL Challenge &amp; Manager Review
        </button>
      </div>

      <!-- TAB CONTENT AREA -->
      <div class="amazon-tab-panel" id="amazonTabPanel">
        ${activeTab === 'context' ? renderContextReportHtml(day) : renderChallengeHtml(day)}
      </div>
    `;
  }

  function renderContextReportHtml(day) {
    const report = day.contextReport;
    return `
      <div class="context-report-view">
        <!-- SECTION 1: BUSINESS WHY -->
        <div class="report-box why-box">
          <div class="report-box-title">
            <span>🎯 Why This Day Matters at Amazon (The Business Context)</span>
          </div>
          <p class="report-box-text">${report.businessWhy}</p>
        </div>

        <!-- SECTION 2: LEARNING FOCUS & TOPICS -->
        <div class="report-box focus-box">
          <div class="report-box-title">
            <span>🧠 What You Should Learn &amp; Focus On Today</span>
          </div>
          <ul class="report-bullets-list">
            ${report.learningFocus.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>

        <!-- TWO COLUMN ROW: PITFALLS & SCHEMA -->
        <div class="report-dual-grid">
          <!-- PITFALLS & TRAPS -->
          <div class="report-box trap-box">
            <div class="report-box-title" style="color: #f59e0b;">
              <span>⚠️ Real-World Traps &amp; Silent Gotchas</span>
            </div>
            <p class="report-box-text" style="color: #fde68a;">${report.realWorldTrap}</p>
            <div class="interview-note">
              <strong>💼 Interview Relevance:</strong> ${report.interviewRelevance}
            </div>
          </div>

          <!-- TARGET SCHEMA -->
          <div class="report-box schema-box">
            <div class="report-box-title" style="color: #38bdf8;">
              <span>🗄️ Amazon Redshift Sample Table Schema</span>
            </div>
            <pre class="schema-code-block"><code>${report.sampleSchema}</code></pre>
          </div>
        </div>

        <!-- CALL TO ACTION BUTTON -->
        <div class="report-action-row">
          <button class="btn-launch-challenge" onclick="window.AMAZON_STORY.setViewTab('challenge')">
            <span>Ready! Solve Today's Ticket Challenge &rarr;</span>
          </button>
        </div>
      </div>
    `;
  }

  function renderChallengeHtml(day) {
    return `
      <div class="challenge-panel-view" id="challengePanelView">
        <!-- Rendered dynamically -->
      </div>
    `;
  }

  function renderAmazonChallengePanel() {
    const container = document.getElementById('challengePanelView') || document.getElementById('amazonTabPanel');
    if (!container || activeTab !== 'challenge') return;

    const day = getActiveDayData();
    const ch = day.challenge;

    let evaluatedHtml = '';
    if (isEvaluated) {
      if (isSuccess) {
        evaluatedHtml = `
          <div class="evaluation-card success">
            <div class="eval-header">
              <span class="eval-icon">🎉</span>
              <div>
                <strong>TICKET RESOLVED! Manager Approval Granted</strong>
                <div class="eval-sub">You successfully answered Sarah's business request with correct SQL syntax.</div>
              </div>
            </div>
            <div class="manager-review-box">
              <div class="review-title">👩‍💼 Sarah's Code Review:</div>
              <p class="review-comment">${ch.managerReview}</p>
            </div>
            <div class="eval-next-row">
              ${day.day < 30 ? `
                <button class="btn-next-day" onclick="window.AMAZON_STORY.selectDay(${day.day + 1})">
                  Proceed to Day ${day.day + 1} &rarr;
                </button>
              ` : `
                <div class="capstone-congrats">
                  🏆 You completed all 30 days of the Amazon Data Analyst Immersion!
                </div>
              `}
            </div>
          </div>
        `;
      } else {
        evaluatedHtml = `
          <div class="evaluation-card error">
            <div class="eval-header">
              <span class="eval-icon">❌</span>
              <div>
                <strong>QUERY FAILED CODE REVIEW</strong>
                <div class="eval-sub">One or more blanks do not match the required operational logic. Check your inputs and try again!</div>
              </div>
            </div>
          </div>
        `;
      }
    }

    // Build the template code block with interactive blank drop-zones
    let queryDisplay = ch.template;
    ch.blanks.forEach(b => {
      const selected = userBlanks[b.id];
      const isBlankCorrect = isEvaluated && (selected === b.answer);
      const isBlankWrong = isEvaluated && (selected !== b.answer);

      let blankClass = "code-blank-slot";
      if (selected) blankClass += " filled";
      if (isBlankCorrect) blankClass += " correct";
      if (isBlankWrong) blankClass += " wrong";

      const tokenText = selected ? selected : `[ ${b.label} ]`;
      queryDisplay = queryDisplay.replace(`___${b.id}___`, `<span class="${blankClass}">${tokenText}</span>`);
    });

    container.innerHTML = `
      <div class="challenge-inner-wrap">
        <div class="challenge-instruction-card">
          <span class="instruction-lead">🎯 Ticket Goal:</span> ${ch.instruction}
        </div>

        <!-- CODE EDITOR WORKSPACE -->
        <div class="amazon-code-terminal">
          <div class="terminal-bar">
            <div class="terminal-dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <span class="terminal-title">amazon_redshift_dw &bull; day_${String(day.day).padStart(2, '0')}_query.sql</span>
          </div>
          <pre class="terminal-editor-body"><code>${queryDisplay}</code></pre>
        </div>

        <!-- BLANK SELECTOR TRAYS -->
        <div class="blank-options-tray-section">
          <div class="tray-label">Select Options for Each Blank:</div>
          <div class="blank-selectors-grid">
            ${ch.blanks.map(b => {
              const currentVal = userBlanks[b.id] || '';
              return `
                <div class="blank-selector-card">
                  <div class="blank-card-title">${b.label}:</div>
                  <div class="blank-pill-options">
                    ${b.options.map(opt => {
                      const isPicked = currentVal === opt;
                      return `
                        <button class="blank-choice-pill ${isPicked ? 'active' : ''}" onclick="window.AMAZON_STORY.selectBlankOption(${b.id}, '${opt.replace(/'/g, "\\'")}')">
                          ${opt}
                        </button>
                      `;
                    }).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- ACTION BUTTONS -->
        <div class="challenge-actions-bar">
          <button class="btn-verify-query" onclick="window.AMAZON_STORY.checkAmazonChallenge()">
            <span>⚡ Run Query &amp; Submit to Lead</span>
          </button>
          <button class="btn-reset-query" onclick="window.AMAZON_STORY.resetAmazonChallenge()">
            <span>↺ Reset Blanks</span>
          </button>
        </div>

        <!-- EVALUATION FEEDBACK -->
        ${evaluatedHtml}
      </div>
    `;
  }

  // Export to global window
  window.AMAZON_STORY = {
    init: initAmazonStoryEngine,
    selectDay: selectDay,
    setViewTab: setViewTab,
    selectBlankOption: selectBlankOption,
    checkAmazonChallenge: checkAmazonChallenge,
    resetAmazonChallenge: resetAmazonChallenge
  };

  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAmazonStoryEngine);
  } else {
    initAmazonStoryEngine();
  }
})();
