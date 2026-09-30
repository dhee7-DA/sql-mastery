// =============================================================================
// GUIDED CAPSTONE ENGINE: STEP-BY-STEP FINANCIAL & ANALYTICS PROJECTS
// Bridges Capstones, Sir Bloops Guidance & Interactive Topic Bridges
// =============================================================================

(function() {
  let activeCapstoneId = "capstone_ib_01";
  let activeStepIndex = 0;
  let userCapstoneSlots = {};
  let capstoneChecked = false;
  let capstonePassed = false;

  function initCapstoneEngine() {
    renderCapstoneHub();
  }

  function getActiveCapstone() {
    const list = window.CAPSTONES_DATA || [];
    return list.find(c => c.id === activeCapstoneId) || list[0];
  }

  function selectCapstone(capId) {
    activeCapstoneId = capId;
    activeStepIndex = 0;
    userCapstoneSlots = {};
    capstoneChecked = false;
    capstonePassed = false;
    renderCapstoneHub();
    if (window.AudioFX) window.AudioFX.playClick();
  }

  function selectStep(stepIdx) {
    activeStepIndex = stepIdx;
    userCapstoneSlots = {};
    capstoneChecked = false;
    capstonePassed = false;
    renderCapstoneActiveStep();
    if (window.AudioFX) window.AudioFX.playClick();
  }

  function renderCapstoneHub() {
    const container = document.getElementById('capstoneContentRoot');
    if (!container) return;

    const list = window.CAPSTONES_DATA || [];
    const activeCap = getActiveCapstone();

    // Group by Domain
    const domains = {};
    list.forEach(c => {
      if (!domains[c.domain]) domains[c.domain] = [];
      domains[c.domain].push(c);
    });

    let domainCardsHtml = '';
    Object.keys(domains).forEach(domName => {
      const projs = domains[domName];
      const icon = projs[0].domainIcon;
      const color = projs[0].domainColor;

      domainCardsHtml += `
        <div class="capstone-domain-group" style="margin-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
            <span style="font-size: 18px;">${icon}</span>
            <span style="font-size: 13px; font-weight: 700; color: ${color}; text-transform: uppercase; letter-spacing: 0.5px;">${escapeHtml(domName)}</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 12px;">
            ${projs.map(p => `
              <div class="capstone-project-card ${p.id === activeCapstoneId ? 'active' : ''}" onclick="window.selectCapstone('${p.id}')" style="cursor: pointer; padding: 14px; border-radius: 8px; border: 1px solid ${p.id === activeCapstoneId ? color : 'var(--border-subtle)'}; background: ${p.id === activeCapstoneId ? 'rgba(56, 189, 248, 0.05)' : 'var(--bg-card)'};">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                  <span style="font-size: 11px; font-weight: 600; color: ${color}; background: ${color}15; padding: 2px 6px; border-radius: 4px;">${p.steps.length} Guided Steps</span>
                  <span style="font-size: 10px; color: var(--text-muted);">${p.estimatedTime}</span>
                </div>
                <h4 style="font-size: 13px; font-weight: 700; color: #fff; margin: 0 0 4px 0; line-height: 1.3;">${escapeHtml(p.title)}</h4>
                <p style="font-size: 11px; color: var(--text-secondary); margin: 0; line-height: 1.4;">${escapeHtml(p.subtitle)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="capstone-container" style="display: flex; flex-direction: column; gap: 16px;">
        <!-- Top Domain Selection Bar -->
        <div class="capstone-header-card" style="padding: 18px; border-radius: 10px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 20px;">🎓</span>
                <h2 style="font-size: 16px; font-weight: 800; color: #fff; margin: 0;">REAL-WORLD GUIDED CAPSTONES ARENA</h2>
                <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); font-size: 10px;">Top 5 Hiring Domains &bull; 10 Projects</span>
              </div>
              <p style="font-size: 12px; color: var(--text-secondary); margin: 4px 0 0 0;">
                Production multi-step financial & analytics challenges. If you need to master a concept before writing the query, click the prerequisite topic tag to jump straight into the matching lesson!
              </p>
            </div>
          </div>
          ${domainCardsHtml}
        </div>

        <!-- Active Capstone Project Workspace -->
        <div id="capstoneActiveWorkspace" style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 18px;">
          <!-- Loaded dynamically -->
        </div>
      </div>
    `;

    renderCapstoneActiveStep();
  }

  function renderCapstoneActiveStep() {
    const root = document.getElementById('capstoneActiveWorkspace');
    if (!root) return;

    const cap = getActiveCapstone();
    const step = cap.steps[activeStepIndex] || cap.steps[0];
    const totalSteps = cap.steps.length;

    // Prerequisite topic pills HTML
    let prereqHtml = '';
    (step.prerequisites || []).forEach(pr => {
      prereqHtml += `
        <button class="choice-pill" onclick="window.jumpToCapstoneTopic('${pr.sectionKey}')" style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; font-size: 11px; border-color: rgba(56, 189, 248, 0.4); background: rgba(56, 189, 248, 0.08); cursor: pointer;" title="${escapeHtml(pr.tip)}">
          <span style="color: #38bdf8; font-weight: 700;">🏷️ ${escapeHtml(pr.label)}</span>
          <span style="font-size: 10px; color: var(--text-muted);">&rarr; Learn Topic</span>
        </button>
      `;
    });

    // Step Stepper bar
    let stepperHtml = '';
    cap.steps.forEach((s, idx) => {
      const isActive = idx === activeStepIndex;
      const isPast = idx < activeStepIndex;
      stepperHtml += `
        <button class="card-nav-btn ${isActive ? 'action-btn-primary' : ''}" onclick="window.selectCapstoneStep(${idx})" style="padding: 4px 12px; font-size: 11px; display: flex; align-items: center; gap: 6px;">
          <span>${isPast ? '✓' : idx + 1}</span>
          <span>Step ${idx + 1}</span>
        </button>
      `;
    });

    // Code template rendering
    let codeHtml = '';
    const tmpl = step.template || [];
    tmpl.forEach(item => {
      if (item.isBlank) {
        const currentVal = userCapstoneSlots[item.slotId];
        let stateClass = '';
        if (currentVal) stateClass = 'filled';
        if (capstoneChecked) {
          stateClass = (currentVal === step.slots[item.slotId].correct) ? 'correct' : 'incorrect';
        }
        codeHtml += `<span class="blank-slot ${stateClass}" onclick="window.clearCapstoneSlot('${item.slotId}')" title="${currentVal ? 'Click to clear' : ''}">${escapeHtml(currentVal || item.placeholder)}</span>`;
      } else {
        codeHtml += escapeHtml(item.text);
      }
    });

    // Choices rows
    let choicesHtml = '';
    Object.keys(step.slots || {}).forEach((slotKey, idx) => {
      const slotInfo = step.slots[slotKey];
      choicesHtml += `
        <div class="slot-choice-row" style="margin-top: 10px;">
          <span class="choice-label" style="font-size: 11px; color: var(--text-muted); font-weight: 700;">BLANK #${idx + 1}:</span>
          ${slotInfo.options.map((opt, optIdx) => `
            <button class="choice-pill ${userCapstoneSlots[slotKey] === opt ? 'selected' : ''}" onclick="window.selectCapstoneSlotChoice('${slotKey}', '${escapeHtml(opt)}')" style="font-size: 11px; padding: 4px 10px;">
              <span class="choice-key-tag">${optIdx + 1}</span>
              <span>${escapeHtml(opt)}</span>
            </button>
          `).join('')}
        </div>
      `;
    });

    root.innerHTML = `
      <!-- Project Title & Stepper Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; margin-bottom: 16px;">
        <div>
          <span style="font-size: 11px; color: ${cap.domainColor}; font-weight: 700; text-transform: uppercase;">${escapeHtml(cap.domain)}</span>
          <h3 style="font-size: 16px; font-weight: 800; color: #fff; margin: 2px 0 0 0;">${escapeHtml(cap.title)}</h3>
        </div>
        <div style="display: flex; gap: 6px;">
          ${stepperHtml}
        </div>
      </div>

      <!-- Sir Bloops Coaching Advice -->
      <div style="display: flex; gap: 12px; background: rgba(56, 189, 248, 0.05); border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 8px; padding: 12px; margin-bottom: 16px;">
        <span style="font-size: 24px;">🫧</span>
        <div>
          <div style="font-size: 11px; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.5px;">Sir Bloops-a-Lot &bull; Analytical Field Coach</div>
          <div style="font-size: 12px; color: #e2e8f0; margin-top: 2px; line-height: 1.4;">${escapeHtml(step.bloopsAdvice)}</div>
        </div>
      </div>

      <!-- Step Brief & Prerequisites -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
        <div style="background: var(--bg-surface); padding: 12px; border-radius: 6px; border: 1px solid var(--border-subtle);">
          <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 4px;">Step ${step.stepNumber} of ${totalSteps}: Business Directive</div>
          <div style="font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 6px;">${escapeHtml(step.title)}</div>
          <div style="font-size: 11.5px; color: var(--text-secondary); line-height: 1.45;">${escapeHtml(step.businessBrief)}</div>
          <div style="font-size: 10px; font-family: var(--font-mono); color: #38bdf8; margin-top: 8px; background: rgba(56, 189, 248, 0.08); padding: 4px 8px; border-radius: 4px;">
            Input Schema: ${escapeHtml(step.schemaSnippet)}
          </div>
        </div>

        <div style="background: var(--bg-surface); padding: 12px; border-radius: 6px; border: 1px solid var(--border-subtle);">
          <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 4px;">Need to Learn or Review the Concept First?</div>
          <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 8px;">Click any topic tag below to jump directly to its interactive visualizer section:</div>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${prereqHtml}
          </div>
        </div>
      </div>

      <!-- Interactive Query Workspace -->
      <div style="background: #090d16; border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 11px; font-family: var(--font-mono); color: var(--text-muted);">STEP ${step.stepNumber} TARGET SQL PIPELINE</span>
          <button class="card-nav-btn" onclick="window.resetCapstoneSlots()" style="font-size: 10px; padding: 2px 8px;">↺ Reset Slots</button>
        </div>
        <pre class="quest-code-view" style="margin: 0; background: transparent; padding: 0; font-size: 12.5px; line-height: 1.6; font-family: var(--font-mono); color: #f8fafc; overflow-x: auto;"><code>${codeHtml}</code></pre>
      </div>

      <!-- Choice Bank Tray -->
      <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 14px; margin-bottom: 16px;">
        <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">Syntax Options Tray (Click to fill blank)</div>
        ${choicesHtml}
      </div>

      <!-- Action Buttons -->
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <button class="card-nav-btn" onclick="window.selectCapstoneStep(${Math.max(0, activeStepIndex - 1)})" ${activeStepIndex === 0 ? 'disabled style="opacity: 0.4;"' : ''}>
          &larr; Previous Step
        </button>

        <div style="display: flex; gap: 10px;">
          <button class="action-btn-primary" onclick="window.checkCapstoneStep()" style="padding: 8px 18px; font-size: 12px; font-weight: 700;">
            ✓ Verify Query Step
          </button>
          ${activeStepIndex < totalSteps - 1 ? `
            <button class="card-nav-btn" onclick="window.selectCapstoneStep(${activeStepIndex + 1})" style="padding: 8px 16px; font-size: 12px;">
              Next Step &rarr;
            </button>
          ` : `
            <button class="action-btn-primary" style="background: #10b981; border-color: #10b981; padding: 8px 18px; font-size: 12px;" onclick="window.completeCapstoneProject()">
              🏆 Complete Project
            </button>
          `}
        </div>
      </div>
    `;
  }

  function selectCapstoneSlotChoice(slotId, optValue) {
    userCapstoneSlots[slotId] = optValue;
    capstoneChecked = false;
    renderCapstoneActiveStep();
    if (window.AudioFX) window.AudioFX.playClick();
  }

  function clearCapstoneSlot(slotId) {
    delete userCapstoneSlots[slotId];
    capstoneChecked = false;
    renderCapstoneActiveStep();
  }

  function resetCapstoneSlots() {
    userCapstoneSlots = {};
    capstoneChecked = false;
    renderCapstoneActiveStep();
  }

  function checkCapstoneStep() {
    const cap = getActiveCapstone();
    const step = cap.steps[activeStepIndex];
    const totalSlots = Object.keys(step.slots || {}).length;
    const filledCount = Object.keys(userCapstoneSlots).length;

    if (filledCount < totalSlots) {
      if (window.SQL_BUDDY) {
        window.SQL_BUDDY.say("Please fill all syntax blanks before verifying!", 3000, 'curious');
      }
      return;
    }

    let allCorrect = true;
    Object.keys(step.slots).forEach(sId => {
      if (userCapstoneSlots[sId] !== step.slots[sId].correct) {
        allCorrect = false;
      }
    });

    capstoneChecked = true;
    capstonePassed = allCorrect;
    renderCapstoneActiveStep();

    if (allCorrect) {
      if (window.AudioFX) window.AudioFX.playSuccess();
      if (window.SQL_BUDDY) {
        window.SQL_BUDDY.say(`🎉 Step ${step.stepNumber} Verified! Clean analytical pipeline execution!`, 4000, 'celebrate');
      }
    } else {
      if (window.AudioFX) window.AudioFX.playError();
      if (window.SQL_BUDDY) {
        window.SQL_BUDDY.say("Almost there! Check the highlighted red blanks or click the topic tag above for a refresher.", 4000, 'sad');
      }
    }
  }

  function completeCapstoneProject() {
    if (window.AudioFX) window.AudioFX.playLevelUp();
    if (window.SQL_BUDDY) {
      window.SQL_BUDDY.say("🏆 Incredible Work! You completed the full production capstone! This is real-world enterprise SQL!", 5000, 'celebrate');
    }
  }

  function jumpToCapstoneTopic(sectionKey) {
    if (typeof switchQuestSection === 'function') {
      // Switch tab in main navigation to quests
      const questsTabBtn = document.querySelector('[data-view="quests"]') || document.querySelector('.nav-tab[data-tab="quests"]');
      if (questsTabBtn) questsTabBtn.click();
      switchQuestSection(sectionKey);
      if (window.SQL_BUDDY) {
        window.SQL_BUDDY.say(`Navigated to ${sectionKey.toUpperCase()} for prerequisite review! Master this topic and return to the capstone!`, 4500, 'happy');
      }
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Window exposures
  window.initCapstoneEngine = initCapstoneEngine;
  window.selectCapstone = selectCapstone;
  window.selectCapstoneStep = selectStep;
  window.selectCapstoneSlotChoice = selectCapstoneSlotChoice;
  window.clearCapstoneSlot = clearCapstoneSlot;
  window.resetCapstoneSlots = resetCapstoneSlots;
  window.checkCapstoneStep = checkCapstoneStep;
  window.completeCapstoneProject = completeCapstoneProject;
  window.jumpToCapstoneTopic = jumpToCapstoneTopic;

  document.addEventListener('DOMContentLoaded', () => {
    // If capstone root exists, initialize
    if (document.getElementById('capstoneContentRoot')) {
      initCapstoneEngine();
    }
  });
})();
