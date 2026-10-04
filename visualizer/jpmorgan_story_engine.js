// =============================================================================
// JPMORGAN CHASE STORY ENGINE: QUANTITATIVE RISK & TREASURY ANALYST SIMULATOR
// Provides:
// - Symphony / Bloomberg Terminal Inbox with Wall Street risk tickets & MD avatars
// - Context Briefing: Business Why, Mathematical/SQL Focus, Pitfalls & Traps
// - Interactive Token-Blanks Puzzle Solver with Immediate AST Validation & Audio FX
// - Auto-logging of failed compliance audits into the Trap SRS Memory Gym
// - Wall Street Career Promotion System (Analyst -> Associate -> VP -> MD)
// =============================================================================

(function() {
  'use strict';

  let activeDayNumber = 1;
  let activePhaseFilter = 'all'; // 'all' | 1 | 2 | 3 | 4
  let activeTab = 'context'; // 'context' | 'challenge' | 'terminal'
  let userBlanks = {};
  let isEvaluated = false;
  let isSuccess = false;
  let solvedDays = new Set();

  function playUiSound(type) {
    try {
      if (window.soundFX) {
        if (type === 'click') window.soundFX.playPop();
        else if (type === 'success') {
          window.soundFX.playSuccess();
          window.soundFX.playChordChime();
          if (typeof window.soundFX.addXP === 'function') {
            window.soundFX.addXP(30, 'Wall St Audit Cleared!');
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
    const saved = localStorage.getItem('sql_jpmorgan_solved_days');
    if (saved) {
      solvedDays = new Set(JSON.parse(saved));
    }
  } catch (e) {
    console.warn('Could not read saved JPMorgan story progress:', e);
  }

  function initJPMorganStoryEngine() {
    renderJPMorganWorkspace();
  }

  function getActiveDayData() {
    const list = window.JPMORGAN_ANALYST_STORY_DATA || [];
    return list.find(d => d.day === activeDayNumber) || list[0];
  }

  function selectDay(dayNum) {
    activeDayNumber = dayNum;
    userBlanks = {};
    isEvaluated = false;
    isSuccess = false;
    renderJPMorganWorkspace();
    playUiSound('click');
  }

  function setPhaseFilter(phaseVal) {
    activePhaseFilter = phaseVal;
    renderJPMorganWorkspace();
    playUiSound('click');
  }

  function setViewTab(tabKey) {
    activeTab = tabKey;
    renderJPMorganMainStage();
    playUiSound('click');
  }

  function selectBlankOption(blankId, chosenOption) {
    userBlanks[blankId] = chosenOption;
    renderJPMorganChallengePanel();
    playUiSound('click');
  }

  function checkJPMorganChallenge() {
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
        localStorage.setItem('sql_jpmorgan_solved_days', JSON.stringify(Array.from(solvedDays)));
      } catch (e) {}

      playUiSound('success');
      if (window.SQL_BUDDY && window.SQL_BUDDY.celebrate) {
        window.SQL_BUDDY.celebrate();
      }
    } else {
      playUiSound('error');

      // Auto-log mistake into Trap SRS Memory Gym
      if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
        window.dispatchEvent(new CustomEvent('sql-trap-logged', {
          detail: {
            trapKey: (dayData.contextReport && dayData.contextReport.realWorldTrap) || dayData.title,
            context: `JPMorgan Chase Day ${dayData.day}: ${dayData.title}`
          }
        }));
      }
    }

    renderJPMorganChallengePanel();
  }

  function resetJPMorganChallenge() {
    userBlanks = {};
    isEvaluated = false;
    isSuccess = false;
    renderJPMorganChallengePanel();
    playUiSound('click');
  }

  function getCareerTitle(solvedCount) {
    if (solvedCount >= 30) return { title: "Managing Director & Global Head of Quantitative Risk", badge: "🏆 MANAGING DIRECTOR", color: "#f59e0b" };
    if (solvedCount >= 21) return { title: "Executive Director, Quantitative Strategy", badge: "⭐ EXEC DIRECTOR", color: "#38bdf8" };
    if (solvedCount >= 14) return { title: "Vice President, Treasury Risk & Analytics", badge: "📈 VICE PRESIDENT", color: "#10b981" };
    if (solvedCount >= 7) return { title: "Associate Analyst, Markets & Liquidity", badge: "✅ ASSOCIATE", color: "#a855f7" };
    return { title: "Junior Analyst, Global Banking Rotation", badge: "🌱 ANALYST", color: "#94a3b8" };
  }

  function renderJPMorganWorkspace() {
    const root = document.getElementById('jpmorganStoryContentRoot');
    if (!root) return;

    const allList = window.JPMORGAN_ANALYST_STORY_DATA || [];
    const filteredList = activePhaseFilter === 'all' 
      ? allList 
      : allList.filter(d => d.week === activePhaseFilter);
    const active = getActiveDayData();
    const career = getCareerTitle(solvedDays.size);

    root.innerHTML = `
      <div class="amazon-sim-container jpmorgan-sim-theme">
        <!-- TOP BRANDED HEADER -->
        <header class="amazon-sim-header" style="border-bottom: 2px solid #b45309; background: linear-gradient(180deg, #0e1726 0%, #080d16 100%);">
          <div class="amazon-brand-row">
            <div class="amazon-logo-group">
              <span class="jpm-brand-badge" style="font-family: serif; font-weight: 900; letter-spacing: 0.08em; color: #f59e0b; font-size: 19px;">J.P. Morgan</span>
              <span class="amazon-team-tag" style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; border-color: rgba(245, 158, 11, 0.3);">Global Banking, Markets &amp; Treasury Risk</span>
            </div>
            <div class="amazon-career-status">
              <div class="career-text-col">
                <span class="career-role-title" style="color: #f1f5f9;">${career.title}</span>
                <span class="career-progress-sub">Audits Cleared: ${solvedDays.size} of ${allList.length} Trading Days</span>
              </div>
              <span class="career-pill" style="color: ${career.color}; border-color: ${career.color}44; background: ${career.color}15;">
                ${career.badge}
              </span>
            </div>
          </div>
        </header>

        <!-- 2-COLUMN SPLIT WORKSPACE: LEFT (TICKETS & PHASES), RIGHT (MAIN STAGE) -->
        <div class="amazon-workspace-grid">
          <!-- LEFT COLUMN: 30-DAY SYMPHONY INBOX -->
          <aside class="amazon-tickets-sidebar">
            <div class="sidebar-header-box">
              <div class="sidebar-title-row">
                <span>🏛️ Symphony Inbox</span>
                <span class="inbox-count-pill">${filteredList.length} Tickets</span>
              </div>
              <!-- Phase Filter Pills -->
              <div class="amazon-phase-filter-tabs">
                <button class="phase-pill-btn ${activePhaseFilter === 'all' ? 'active' : ''}" onclick="window.JPMORGAN_STORY.setPhaseFilter('all')">
                  All
                </button>
                <button class="phase-pill-btn ${activePhaseFilter === 1 ? 'active' : ''}" onclick="window.JPMORGAN_STORY.setPhaseFilter(1)" title="Week 1: Core Ledgers">
                  Wk 1
                </button>
                <button class="phase-pill-btn ${activePhaseFilter === 2 ? 'active' : ''}" onclick="window.JPMORGAN_STORY.setPhaseFilter(2)" title="Week 2: AML &amp; Compliance">
                  Wk 2
                </button>
                <button class="phase-pill-btn ${activePhaseFilter === 3 ? 'active' : ''}" onclick="window.JPMORGAN_STORY.setPhaseFilter(3)" title="Week 3: Asset Management">
                  Wk 3
                </button>
                <button class="phase-pill-btn ${activePhaseFilter === 4 ? 'active' : ''}" onclick="window.JPMORGAN_STORY.setPhaseFilter(4)" title="Week 4: Risk War Room">
                  Wk 4
                </button>
              </div>
            </div>

            <div class="amazon-tickets-list">
              ${filteredList.map(d => {
                const isSelected = d.day === activeDayNumber;
                const isDone = solvedDays.has(d.day);
                return `
                  <button class="amazon-ticket-card ${isSelected ? 'active' : ''} ${isDone ? 'completed' : ''}" onclick="window.JPMORGAN_STORY.selectDay(${d.day})">
                    <div class="ticket-card-top">
                      <span class="ticket-day-badge ${isDone ? 'done' : ''}" style="${isSelected ? 'background: #f59e0b; color: #000;' : ''}">Day ${String(d.day).padStart(2, '0')}</span>
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

          <!-- RIGHT COLUMN: MAIN WORKING STAGE -->
          <main class="amazon-main-stage" id="jpmorganMainStageRoot">
            <!-- Dynamically populated by renderJPMorganMainStage() -->
          </main>
        </div>
      </div>
    `;

    renderJPMorganMainStage();
  }

  function renderJPMorganMainStage() {
    const stageRoot = document.getElementById('jpmorganMainStageRoot');
    if (!stageRoot) return;

    const d = getActiveDayData();
    if (!d) return;

    stageRoot.innerHTML = `
      <!-- TICKET BANNER & METADATA STRIP -->
      <section class="ticket-banner-strip" style="border-left: 4px solid #f59e0b;">
        <div class="ticket-banner-header">
          <div>
            <div class="ticket-phase-tag" style="color: #f59e0b;">${d.phase}</div>
            <h1 class="ticket-banner-title">${d.title}</h1>
          </div>
          <span class="ticket-priority-pill priority-${d.priority.split(' ')[0].toLowerCase()}">${d.priority}</span>
        </div>

        <!-- SENDER & SYMPHONY MESSAGE CHAT BUBBLE -->
        <div class="chime-message-bubble" style="background: rgba(15, 23, 42, 0.7); border-color: rgba(245, 158, 11, 0.25);">
          <div class="bubble-sender-row">
            <span class="bubble-avatar">${d.senderAvatar}</span>
            <div class="bubble-sender-meta">
              <span class="bubble-sender-name" style="color: #fbbf24;">${d.sender}</span>
              <span class="bubble-sender-role">${d.senderRole} &bull; ${d.department}</span>
            </div>
          </div>
          <p class="bubble-message-text">${d.symphonyMessage}</p>
        </div>

        <!-- 3 STAGE TABS -->
        <div class="stage-nav-tabs">
          <button class="stage-tab-btn ${activeTab === 'context' ? 'active' : ''}" onclick="window.JPMORGAN_STORY.setViewTab('context')">
            📋 Executive Briefing &amp; Traps
          </button>
          <button class="stage-tab-btn ${activeTab === 'challenge' ? 'active' : ''}" onclick="window.JPMORGAN_STORY.setViewTab('challenge')">
            ⚡ SQL Workstation (Day Challenge)
          </button>
          <button class="stage-tab-btn ${activeTab === 'terminal' ? 'active' : ''}" onclick="window.JPMORGAN_STORY.setViewTab('terminal')">
            💻 Reference Query &amp; Expected SQL
          </button>
        </div>
      </section>

      <!-- ACTIVE TAB CONTENT BODY -->
      <section class="stage-tab-content-pane" id="jpmorganTabContentRoot">
        <!-- Rendered based on activeTab -->
      </section>
    `;

    renderJPMorganTabContent();
  }

  function renderJPMorganTabContent() {
    const root = document.getElementById('jpmorganTabContentRoot');
    if (!root) return;

    const d = getActiveDayData();
    if (!d) return;

    if (activeTab === 'context') {
      root.innerHTML = `
        <div class="context-report-grid">
          <div class="context-card card-why" style="border-left: 3px solid #38bdf8;">
            <div class="context-card-title" style="color: #38bdf8;">💡 Why This Financial Metric Matters to Leadership</div>
            <p class="context-card-p">${d.contextReport.businessWhy}</p>
          </div>

          <div class="context-card card-focus" style="border-left: 3px solid #10b981;">
            <div class="context-card-title" style="color: #10b981;">🎯 SQL &amp; Quantitative Principles in Focus</div>
            <ul class="context-focus-list">
              ${d.contextReport.learningFocus.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>

          <div class="context-card card-schema" style="border-left: 3px solid #a855f7;">
            <div class="context-card-title" style="color: #c084fc;">🗄️ Relational Ledger Schema Definition</div>
            <pre class="context-schema-code"><code>${d.contextReport.sampleSchema}</code></pre>
          </div>

          <div class="context-card card-trap" style="border-left: 3px solid #ef4444;">
            <div class="context-card-title" style="color: #f87171;">⚠️ Production Trap to Avoid on Wall Street</div>
            <p class="context-card-p" style="color: #fca5a5;">${d.contextReport.realWorldTrap}</p>
          </div>

          <div class="context-card card-interview" style="border-left: 3px solid #f59e0b; grid-column: 1 / -1;">
            <div class="context-card-title" style="color: #fbbf24;">🏛️ Investment Banking Interview Relevance</div>
            <p class="context-card-p">${d.contextReport.interviewRelevance}</p>
          </div>
        </div>

        <div style="margin-top: 18px; display: flex; justify-content: flex-end;">
          <button class="btn btn-primary" style="background: #f59e0b; color: #000; font-weight: 700;" onclick="window.JPMORGAN_STORY.setViewTab('challenge')">
            Launch Day ${d.day} SQL Workstation &rarr;
          </button>
        </div>
      `;
    } else if (activeTab === 'challenge') {
      renderJPMorganChallengePanel();
    } else if (activeTab === 'terminal') {
      root.innerHTML = `
        <div class="terminal-reference-pane">
          <div class="terminal-ref-header">
            <span class="terminal-ref-title">ANSI SQL / MySQL 8.0 Reference Implementation</span>
            <button class="btn btn-secondary btn-xs" onclick="navigator.clipboard.writeText(decodeURIComponent('${encodeURIComponent(d.challenge.expectedSql)}')); alert('SQL copied to clipboard!');">
              📋 Copy SQL
            </button>
          </div>
          <pre class="terminal-ref-code"><code>${d.challenge.expectedSql}</code></pre>

          <div class="terminal-ref-review">
            <div class="review-lead-title" style="color: #f59e0b;">💬 Managing Director Sign-off:</div>
            <p class="review-lead-p">${d.challenge.managerReview}</p>
          </div>
        </div>
      `;
    }
  }

  function renderJPMorganChallengePanel() {
    const root = document.getElementById('jpmorganTabContentRoot');
    if (!root || activeTab !== 'challenge') return;

    const d = getActiveDayData();
    if (!d || !d.challenge) return;

    // Render template with interactive blank slots
    let renderedQuery = d.challenge.template;
    d.challenge.blanks.forEach(b => {
      const chosen = userBlanks[b.id];
      const isCorrect = isEvaluated && chosen === b.answer;
      const isWrong = isEvaluated && chosen !== b.answer;

      let slotClass = "challenge-blank-slot";
      if (chosen) slotClass += " filled";
      if (isCorrect) slotClass += " slot-correct";
      if (isWrong) slotClass += " slot-wrong";

      const slotHtml = `
        <span class="${slotClass}" id="blank_slot_${b.id}">
          ${chosen ? chosen : `___${b.id}: ${b.label}___`}
        </span>
      `;
      renderedQuery = renderedQuery.replace(`___${b.id}___`, slotHtml);
    });

    root.innerHTML = `
      <div class="challenge-workspace-box">
        <!-- Instruction banner -->
        <div class="challenge-instruction-card" style="border-left: 3px solid #f59e0b;">
          <span class="instruction-icon">🎯</span>
          <div>
            <div class="instruction-title" style="color: #fbbf24;">Trading Day Objective:</div>
            <div class="instruction-p">${d.challenge.instruction}</div>
          </div>
        </div>

        <!-- Interactive Query Canvas -->
        <div class="challenge-query-canvas">
          <div class="canvas-header">
            <span>MySQL 8.0 / Fedwire &amp; General Ledger Audit Console</span>
            <button class="card-nav-btn" onclick="window.JPMORGAN_STORY.resetChallenge()">↺ Reset Workstation</button>
          </div>
          <pre class="canvas-code-block"><code>${renderedQuery}</code></pre>
        </div>

        <!-- Token Selection Trays -->
        <div class="challenge-tokens-tray">
          <div class="tray-title" style="color: #94a3b8;">Select candidate SQL tokens for each blank:</div>
          <div class="blanks-picker-grid">
            ${d.challenge.blanks.map(b => {
              const currentVal = userBlanks[b.id];
              return `
                <div class="blank-picker-card">
                  <div class="picker-label">Slot #${b.id}: <strong>${b.label}</strong></div>
                  <div class="picker-options-row">
                    ${b.options.map(opt => {
                      const isSelected = currentVal === opt;
                      return `
                        <button class="token-option-chip ${isSelected ? 'selected' : ''}" 
                                onclick="window.JPMORGAN_STORY.selectBlankOption(${b.id}, '${opt.replace(/'/g, "\\'")}')">
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

        <!-- Evaluation Results & Action Bar -->
        <div class="challenge-action-bar">
          <div class="action-left-col">
            ${isEvaluated ? `
              <div class="eval-result-pill ${isSuccess ? 'eval-pass' : 'eval-fail'}">
                ${isSuccess ? '✅ Audit Clearance Confirmed! Risk ticket marked resolved.' : '❌ Ledger Discrepancy Detected! Review token selections.'}
              </div>
            ` : ''}
          </div>

          <div class="action-right-col">
            <button class="btn btn-secondary" onclick="window.JPMORGAN_STORY.resetChallenge()">
              Clear Slots
            </button>
            <button class="btn btn-primary" style="background: #f59e0b; color: #000; font-weight: 700;" onclick="window.JPMORGAN_STORY.checkChallenge()">
              Validate &amp; Submit Audit &check;
            </button>
          </div>
        </div>

        <!-- Manager Feedback Drawer if solved -->
        ${isSuccess ? `
          <div class="manager-feedback-card" style="border-left: 3px solid #10b981; margin-top: 14px; background: rgba(16, 185, 129, 0.08);">
            <div class="feedback-header">
              <span style="font-size: 18px;">🏛️</span>
              <span class="feedback-title" style="color: #34d399;">Managing Director Sign-off:</span>
            </div>
            <p class="feedback-body">${d.challenge.managerReview}</p>
          </div>
          ${solvedDays.size >= 30 ? `
            <div class="jpmorgan-capstone-banner" style="margin-top: 18px; padding: 20px; border-radius: 12px; background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.25) 100%); border: 2px solid #f59e0b; text-align: center;">
              <div style="font-size: 32px; margin-bottom: 6px;">🏆 🏛️ 📜</div>
              <h3 style="color: #fbbf24; margin: 0 0 8px 0; font-family: serif; font-size: 22px; letter-spacing: 0.04em;">JPMORGAN CHASE &amp; CO. BOARD OF DIRECTORS CITATION</h3>
              <p style="color: #f1f5f9; font-size: 14px; line-height: 1.6; max-width: 680px; margin: 0 auto 12px auto;">
                In recognition of exceptional analytical rigor across 30 days of market volatility, liquidity stress, and regulatory compliance. You have successfully resolved all 30 high-stakes quantitative risk tickets and earned the rank of <strong>Managing Director &amp; Global Head of Quantitative Risk</strong>.
              </p>
              <div style="display: inline-flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
                <span style="background: rgba(0,0,0,0.4); border: 1px solid #f59e0b; color: #fde68a; padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: 700;">✅ Basel III LCR Compliant</span>
                <span style="background: rgba(0,0,0,0.4); border: 1px solid #f59e0b; color: #fde68a; padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: 700;">✅ 99% 1-Day VaR Audited</span>
                <span style="background: rgba(0,0,0,0.4); border: 1px solid #f59e0b; color: #fde68a; padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: 700;">✅ CET1 Ratio 14.85%</span>
              </div>
            </div>
          ` : ''}
        ` : ''}
      </div>
    `;
  }

  // Export to window
  window.JPMORGAN_STORY = {
    init: initJPMorganStoryEngine,
    selectDay: selectDay,
    setPhaseFilter: setPhaseFilter,
    setViewTab: setViewTab,
    selectBlankOption: selectBlankOption,
    checkChallenge: checkJPMorganChallenge,
    resetChallenge: resetJPMorganChallenge
  };

  window.initJPMorganStoryEngine = initJPMorganStoryEngine;

})();
