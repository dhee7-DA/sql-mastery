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
  let activePhaseFilter = 'all'; // 'all' | 1 | 2 | 3 | 4
  let activeTab = 'context';
  let activeAmazonStep = 0; // 'context' | 'challenge' | 'terminal'
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
            window.soundFX.addXP(25, 'Amazon Ticket Verified!');
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
    playUiSound('click');
  }

  function setPhaseFilter(phaseVal) {
    activePhaseFilter = phaseVal;
    renderAmazonWorkspace();
    playUiSound('click');
  }

  function setViewTab(tabKey) {
    activeTab = tabKey;
    renderAmazonMainStage();
    playUiSound('click');
  }

  function selectBlankOption(blankId, chosenOption) {
    userBlanks[blankId] = chosenOption;
    renderAmazonChallengePanel();
    playUiSound('click');
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

      playUiSound('success');
      if (window.SQL_BUDDY && window.SQL_BUDDY.celebrate) {
        window.SQL_BUDDY.celebrate();
      }
    } else {
      playUiSound('error');
    }

    renderAmazonChallengePanel();
  }

  function resetAmazonChallenge() {
    userBlanks = {};
    isEvaluated = false;
    isSuccess = false;
    renderAmazonChallengePanel();
    playUiSound('click');
  }

  function getCareerTitle(solvedCount) {
    if (solvedCount >= 30) return { title: "L5 Senior Business Intelligence Engineer", badge: "PRINCIPAL · BIE", color: "#ffffff" };
    if (solvedCount >= 21) return { title: "L4 Prime Day War Room Hero", badge: "STAFF · WAR ROOM", color: "#ffffff" };
    if (solvedCount >= 14) return { title: "L4 WBR Metrics Specialist", badge: "P0 · METRICS LEAD", color: "#a1a1aa" };
    if (solvedCount >= 7) return { title: "L4 Confirmed Data Analyst", badge: "P1 · CERTIFIED", color: "#a1a1aa" };
    return { title: "Beginner Data Analyst (Day 1)", badge: "P2 · ONBOARDING", color: "#71717a" };
  }

  function renderAmazonWorkspace() {
    const root = document.getElementById('amazonStoryContentRoot');
    if (!root) return;

    const allList = window.AMAZON_ANALYST_STORY_DATA || [];
    const filteredList = activePhaseFilter === 'all' 
      ? allList 
      : allList.filter(d => d.week === activePhaseFilter);
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
              <span class="career-pill">
                ${career.badge}
              </span>
            </div>
          </div>
        </header>

        <!-- 2-COLUMN SPLIT WORKSPACE: LEFT (TICKETS & PHASES), RIGHT (MAIN STAGE) -->
        <div class="amazon-workspace-grid">
          <!-- LEFT COLUMN: 30-DAY CHIME INBOX -->
          <aside class="amazon-tickets-sidebar">
            <div class="sidebar-header-box">
              <div class="sidebar-title-row">
                <span>Chime Tickets</span>
                <span class="inbox-count-pill">${filteredList.length} of ${allList.length} Tickets</span>
              </div>
              <!-- Phase Filter Pills -->
              <div class="amazon-phase-filter-tabs">
                <button class="phase-pill-btn ${activePhaseFilter === 'all' ? 'active' : ''}" onclick="window.AMAZON_STORY.setPhaseFilter('all')">
                  All
                </button>
                <button class="phase-pill-btn ${activePhaseFilter === 1 ? 'active' : ''}" onclick="window.AMAZON_STORY.setPhaseFilter(1)" title="Week 1: Onboarding">
                  Wk 1
                </button>
                <button class="phase-pill-btn ${activePhaseFilter === 2 ? 'active' : ''}" onclick="window.AMAZON_STORY.setPhaseFilter(2)" title="Week 2: Logistics &amp; JOINs">
                  Wk 2
                </button>
                <button class="phase-pill-btn ${activePhaseFilter === 3 ? 'active' : ''}" onclick="window.AMAZON_STORY.setPhaseFilter(3)" title="Week 3: Aggregations &amp; WBR">
                  Wk 3
                </button>
                <button class="phase-pill-btn ${activePhaseFilter === 4 ? 'active' : ''}" onclick="window.AMAZON_STORY.setPhaseFilter(4)" title="Week 4: War Room">
                  Wk 4
                </button>
              </div>
            </div>

            <div class="amazon-tickets-list">
              ${filteredList.map(d => {
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
    if (window.OvioMotion && typeof window.OvioMotion.refresh === "function") setTimeout(() => window.OvioMotion.refresh(), 30);
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
          📖 Lesson &amp; Explanation
        </button>
        <button class="amazon-tab-btn ${activeTab === 'challenge' ? 'active' : ''}" onclick="window.AMAZON_STORY.setViewTab('challenge')">
          💻 SQL Practice Editor
        </button>
        <button class="amazon-tab-btn ${activeTab === 'stepper' ? 'active' : ''}" onclick="window.AMAZON_STORY.setViewTab('stepper')">
          🚶 Step-by-Step Breakdown <span style="font-size:9.5px; padding:1px 5px; border-radius:3px; background:rgba(56,189,248,0.15); color:#38bdf8; font-weight:700;">5 Steps</span>
        </button>
      </div>

      <!-- TAB CONTENT AREA -->
      <div class="amazon-tab-panel" id="amazonTabPanel">
        ${activeTab === 'context' ? renderContextReportHtml(day) : (activeTab === 'stepper' ? renderAmazonStepperHtml(day) : renderChallengeHtml(day))}
      </div>
    `;
    if (window.OvioMotion && typeof window.OvioMotion.refresh === "function") setTimeout(() => window.OvioMotion.refresh(), 30);
  }

  function renderContextReportHtml(day) {
    const report = day.contextReport;
    return `
      <div class="context-report-view">
        <!-- SECTION 1: BUSINESS WHY -->
        <div class="report-box why-box">
          <div class="report-box-title">
            <span>💡 Why This Query Matters</span>
          </div>
          <p class="report-box-text">${report.businessWhy}</p>
        </div>

        <!-- SECTION 2: LEARNING FOCUS & TOPICS -->
        <div class="report-box focus-box">
          <div class="report-box-title">
            <span>🎯 What You'll Learn (Step-by-Step)</span>
          </div>
          <ul class="report-bullets-list">
            ${report.learningFocus.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>

        <!-- TWO COLUMN ROW: PITFALLS & SCHEMA -->
        <div class="report-dual-grid">
          <!-- PITFALLS & TRAPS -->
          <div class="report-box trap-box">
            <div class="report-box-title">
              <span>⚠️ Common Mistake to Avoid</span>
            </div>
            <p class="report-box-text">${report.realWorldTrap}</p>
            <div class="interview-note">
              <strong>💡 Practical Tip:</strong> ${report.interviewRelevance}
            </div>
          </div>

          <!-- TARGET SCHEMA -->
          <div class="report-box schema-box">
            <div class="report-box-title">
              <span>📋 Table Structure (Columns &amp; Types)</span>
            </div>
            <pre class="schema-code-block"><code>${report.sampleSchema}</code></pre>
          </div>
        </div>

        <!-- CALL TO ACTION BUTTON -->
        <div class="report-action-row">
          <button class="btn-launch-challenge" onclick="window.AMAZON_STORY.setViewTab('challenge')">
            <span>Ready! Start Ticket Challenge &rarr;</span>
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
              <span class="eval-icon">[PASS]</span>
              <div>
                <strong>TICKET RESOLVED! Manager Approval Granted</strong>
                <div class="eval-sub">You successfully answered Sarah's business request with correct SQL syntax.</div>
              </div>
            </div>
            <div class="manager-review-box">
              <div class="review-title">[LEAD BIE] Code Review Sign-Off:</div>
              <p class="review-comment">${ch.managerReview}</p>
            </div>
            <div class="eval-next-row">
              ${day.day < 30 ? `
                <button class="btn-next-day" onclick="window.AMAZON_STORY.selectDay(${day.day + 1})">
                  Proceed to Day ${day.day + 1} &rarr;
                </button>
              ` : `
                <div class="capstone-congrats">
                  Immersion Complete: All 30 engineering days verified to production grade.</div>
              `}
            </div>
          </div>
        `;
      } else {
        evaluatedHtml = `
          <div class="evaluation-card error">
            <div class="eval-header">
              <span class="eval-icon">[FAIL]</span>
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
          <span class="instruction-lead">§ Ticket Specification:</span> ${ch.instruction}
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
            <span>Submit for Review</span>
          </button>
          <button class="btn-reset-query" onclick="window.AMAZON_STORY.resetAmazonChallenge()">
            <span>Reset</span>
          </button>
        </div>

        <!-- EVALUATION FEEDBACK -->
        ${evaluatedHtml}
      </div>
    `;
  }

  function setAmazonStep(idx) {
    activeAmazonStep = Math.max(0, Math.min(idx, AMAZON_DAY1_STEPS.length - 1));
    renderAmazonMainStage();
    playUiSound('click');
  }

const AMAZON_DAY1_STEPS = [
    {
      clause: 'FROM',
      title: '1. Load the Entire Catalog',
      badge: '350M ASINs Available',
      explanation: 'SQL begins by opening the products_catalog table. Before applying any filters or choosing columns, the database establishes connection to the physical product table.',
      rule: 'SQL always starts with FROM. It cannot filter or sort until it knows which table to read.',
      code: 'FROM products_catalog',
      transform: {
        stat: '350M catalog products loaded into buffer pool',
        headers: ['Status', 'asin', 'product_name', 'department', 'price_usd'],
        rows: [
          { status: 'KEPT', cells: ['B07VGRJDFY', 'Smart LED TV 55 Inch', 'Electronics', '1200000.00'] },
          { status: 'KEPT', cells: ['B08N5WRWNW', 'Wireless Noise Cancelling Headphones', 'Electronics', '349.99'] },
          { status: 'KEPT', cells: ['B09B2W5KHW', 'Cotton Casual Crew T-Shirt', 'Apparel', '19.99'] },
          { status: 'KEPT', cells: ['B01DFKC2SO', 'Organic Fair Trade Whole Bean Coffee', 'Grocery', '14.50'] }
        ]
      }
    },
    {
      clause: 'WHERE',
      title: '2. Filter to Electronics Only',
      badge: 'Discards Non-Electronics',
      explanation: 'SQL scans each row and checks whether department equals Electronics. All books, clothing, and groceries are thrown out immediately, saving memory.',
      rule: 'Filtering early with WHERE prevents massive memory spills in AWS Redshift.',
      code: "WHERE department = 'Electronics'",
      transform: {
        stat: 'Filtered: Non-Electronics discarded · Electronics retained',
        headers: ['Filter Status', 'asin', 'product_name', 'department', 'price_usd'],
        rows: [
          { status: 'kept', cells: ['B08N5WRWNW', 'Sony Bravia 4K TV (Anomaly)', 'Electronics', '$1,200,000.00'] },
          { status: 'discarded', cells: ['B01M3WNZ65', 'Kindle Paperwhite E-Reader', 'Books & Media', '$129.99'] },
          { status: 'kept', cells: ['B09X43F291', 'Apple MacBook Pro 16"', 'Electronics', '$2,499.00'] },
          { status: 'discarded', cells: ['B0050SYZ80', 'Organic Whole Bean Coffee', 'Grocery', '$24.50'] },
          { status: 'discarded', cells: ['B07ABC1234', 'Levis Denim Jacket', 'Apparel', '$89.00'] }
        ]
      }
    },
    {
      clause: 'SELECT',
      title: '3. Pick Only the 3 Key Columns',
      badge: 'Reduces Data Width',
      explanation: 'Instead of loading all 50 columns with SELECT *, SQL isolates just asin, product_name, and price_usd.',
      rule: 'SELECT runs after WHERE. The database filters rows first, then slices columns.',
      code: 'SELECT asin, product_name, price_usd',
      transform: {
        stat: '3 requested columns kept · 47 unused catalog columns stripped',
        headers: ['Column Status', 'asin', 'product_name', 'price_usd'],
        rows: [
          { status: 'OUTPUT', cells: ['B07VGRJDFY', 'Smart LED TV 55 Inch', '$1,200,000.00'] },
          { status: 'OUTPUT', cells: ['B08N5WRWNW', 'Wireless Headphones', '$349.99'] }
        ]
      }
    },
    {
      clause: 'ORDER BY',
      title: '4. Sort from Highest to Lowest Price',
      badge: 'Price Anomaly Surfaced to Top',
      explanation: 'SQL sorts the filtered rows in descending order (DESC). This immediately pushes the accidental $1,200,000 television error right to Row 1!',
      rule: 'ORDER BY DESC is the analyst superpower to spot pricing bugs and outliers.',
      code: 'ORDER BY price_usd DESC',
      transform: {
        stat: 'Rows reordered by price_usd DESC · Anomaly is now Row 1',
        headers: ['Rank', 'asin', 'product_name', 'price_usd', 'audit_note'],
        rows: [
          { status: 'OUTPUT', cells: ['B07VGRJDFY', 'Smart LED TV 55 Inch', '$1,200,000.00', '⚠️ ANOMALY DETECTED (Row 1)'] },
          { status: 'KEPT', cells: ['B08N5WRWNW', 'Wireless Headphones', '$349.99', 'Normal pricing'] }
        ]
      }
    },
    {
      clause: 'LIMIT',
      title: '5. Stop After the Top 10 Items',
      badge: 'Safe Bounded Output',
      explanation: 'Finally, SQL cuts off after returning 10 rows. This delivers an instant report to Category Management without pulling millions of rows into your browser.',
      rule: 'Never run SELECT without LIMIT on massive warehouse tables.',
      code: 'LIMIT 10;',
      transform: {
        stat: 'Bounded output: Exactly 10 rows sent to Sarah Jenkins',
        headers: ['Limit Verdict', 'asin', 'product_name', 'price_usd'],
        rows: [
          { status: 'OUTPUT', cells: ['B07VGRJDFY', 'Smart LED TV 55 Inch', '$1,200,000.00'] },
          { status: 'OUTPUT', cells: ['B08N5WRWNW', 'Wireless Headphones', '$349.99'] }
        ]
      }
    }
  ];

  function renderAmazonStepperHtml(day) {
    const steps = AMAZON_DAY1_STEPS;
    const curIdx = Math.min(Math.max(activeAmazonStep, 0), steps.length - 1);
    const st = steps[curIdx];

    return `
      <div class="amazon-stepper-container" style="background:#141416; border:1px solid #27272a; border-radius:8px; padding:20px; display:flex; flex-direction:column; gap:16px;">
        
        <!-- Stepper Top Bar -->
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #27272a; padding-bottom:12px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-family:monospace; font-size:11px; font-weight:700; color:#38bdf8; background:rgba(56,189,248,0.12); border:1px solid rgba(56,189,248,0.25); padding:3px 8px; border-radius:4px;">
              STEP ${curIdx + 1} OF ${steps.length}
            </span>
            <strong style="font-size:14px; color:#ffffff;">How SQL Solves Day 1's Audit Query</strong>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="koma-step-nav-btn" onclick="window.AMAZON_STORY.setAmazonStep(${curIdx - 1})" ${curIdx === 0 ? 'disabled' : ''} style="background:#27272a; border:1px solid #3f3f46; color:#e4e4e7; padding:4px 10px; border-radius:4px; font-size:11px; cursor:pointer;">
              ◀ Previous
            </button>
            <button class="koma-step-nav-btn" onclick="window.AMAZON_STORY.setAmazonStep(${curIdx + 1})" ${curIdx === steps.length - 1 ? 'disabled' : ''} style="background:#38bdf8; border:1px solid #38bdf8; color:#000000; font-weight:700; padding:4px 12px; border-radius:4px; font-size:11px; cursor:pointer;">
              Next Step ▶
            </button>
          </div>
        </div>

        <!-- Progress Track -->
        <div style="display:flex; align-items:center; justify-content:space-between; background:#18181b; padding:10px 14px; border-radius:6px; border:1px solid #27272a;">
          ${steps.map((s, i) => `
            <div onclick="window.AMAZON_STORY.setAmazonStep(${i})" style="display:flex; align-items:center; gap:6px; cursor:pointer; padding:4px 8px; border-radius:4px; ${i === curIdx ? 'background:rgba(56,189,248,0.15); border:1px solid rgba(56,189,248,0.35);' : ''}">
              <span style="font-family:monospace; font-size:10px; font-weight:700; width:18px; height:18px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; ${i === curIdx ? 'background:#38bdf8; color:#000;' : (i < curIdx ? 'background:rgba(16,185,129,0.2); color:#10b981;' : 'background:#27272a; color:#71717a;')}">${i + 1}</span>
              <span style="font-family:monospace; font-size:11px; font-weight:600; color:${i === curIdx ? '#38bdf8' : (i < curIdx ? '#a1a1aa' : '#71717a')};">${s.clause}</span>
            </div>
            ${i < steps.length - 1 ? `<div style="flex:1; height:2px; background:${i < curIdx ? 'rgba(16,185,129,0.4)' : '#27272a'}; margin:0 6px;"></div>` : ''}
          `).join('')}
        </div>

        <!-- Step Detail Card -->
        <div style="background:#18181c; border:1px solid #27272a; border-radius:8px; padding:18px; display:flex; flex-direction:column; gap:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3 style="font-size:15px; font-weight:700; color:#ffffff; margin:0;">${st.title}</h3>
            <span style="font-family:monospace; font-size:10.5px; font-weight:600; color:#34d399; background:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.25); padding:2px 8px; border-radius:4px;">
              ${st.badge}
            </span>
          </div>

          <p style="font-size:13px; line-height:1.6; color:#d4d4d8; margin:0;">
            ${st.explanation}
          </p>

          <div style="display:flex; align-items:center; gap:10px; background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.22); border-radius:6px; padding:10px 14px;">
            <span style="font-size:16px;">💡</span>
            <div style="font-size:12px; color:#fde68a;">
              <strong>Beginner Rule:</strong> ${st.rule}
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:6px; background:#0c0c0e; border:1px solid #27272a; border-radius:6px; padding:10px 14px;">
            <div style="font-family:monospace; font-size:10px; font-weight:700; color:#71717a;">SQL CLAUSE EXECUTING:</div>
            <pre style="margin:0; font-family:monospace; font-size:12px; color:#38bdf8;"><code>${st.code}</code></pre>
          </div>

          <!-- Live Table Transformation (Data Shrink) -->
          ${st.transform ? `
            <div class="koma-step-transform-box">
              <div class="koma-step-transform-header">
                <div class="koma-transform-label">
                  <span>📊 LIVE DATA TRANSFORMATION (WATCH ROWS SHRINK)</span>
                </div>
                <span class="koma-transform-pill">${st.transform.stat}</span>
              </div>
              <table class="koma-transform-table">
                <thead>
                  <tr>${st.transform.headers.map(h => `<th>${h}</th>`).join('')}</tr>
                </thead>
                <tbody>
                  ${st.transform.rows.map(r => {
                    let rCls = 'transform-row-kept';
                    let badgeCls = 'status-kept';
                    let badgeText = '✓ KEPT';
                    if (String(r.status).toLowerCase() === 'discarded' || String(r.status).toLowerCase() === 'filtered') {
                      rCls = 'transform-row-discarded';
                      badgeCls = 'status-discarded';
                      badgeText = '✕ FILTERED';
                    } else if (String(r.status).toLowerCase() === 'output') {
                      rCls = 'transform-row-output';
                      badgeCls = 'status-output';
                      badgeText = '★ OUTPUT';
                    }
                    return `
                      <tr class="${rCls}">
                        <td><span class="transform-status-badge ${badgeCls}">${badgeText}</span></td>
                        ${r.cells.map(c => `<td>${c}</td>`).join('')}
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          ` : ''}
        </div>

        <!-- Footer Actions -->
        <div style="display:flex; justify-content:space-between; align-items:center; padding-top:6px;">
          <button onclick="window.AMAZON_STORY.setViewTab('context')" style="background:transparent; border:1px solid #33333a; color:#94a3b8; font-family:monospace; font-size:11px; padding:6px 14px; border-radius:4px; cursor:pointer;">
            📖 Back to Lesson & Explanation
          </button>
          <button onclick="window.AMAZON_STORY.setViewTab('challenge')" style="background:#22c55e; border:none; color:#000000; font-weight:700; font-family:monospace; font-size:11.5px; padding:7px 16px; border-radius:4px; cursor:pointer;">
            Ready! Open SQL Practice Editor &rarr;
          </button>
        </div>

      </div>
    `;
  }

  // Export to global window
  window.AMAZON_STORY = {
    init: initAmazonStoryEngine,
    selectDay: selectDay,
    setPhaseFilter: setPhaseFilter,
    setViewTab: setViewTab,
    setAmazonStep: setAmazonStep,
    init: initAmazonStoryEngine,
    selectDay: selectDay,
    setPhaseFilter: setPhaseFilter,
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
