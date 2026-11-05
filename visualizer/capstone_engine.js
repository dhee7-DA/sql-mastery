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
    const container = document.getElementById('viewCapstones');
    if (!container) return;

    const list = window.CAPSTONES_DATA || [];
    const domains = {};
    list.forEach(c => {
      if (!domains[c.domain]) domains[c.domain] = [];
      domains[c.domain].push(c);
    });

    let domainCardsHtml = '';
    Object.keys(domains).forEach(domName => {
      const projs = domains[domName];
      const domainShort = domName.split('&')[0].trim().toUpperCase();

      domainCardsHtml += `
        <div class="capstone-domain-group" style="margin-bottom: 24px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; background: #18181b; color: #ffffff; padding: 2px 7px; border: 1px solid rgba(255,255,255,0.2); border-radius: 3px;">${escapeHtml(domainShort)}</span>
            <span style="font-size: 13px; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 0.05em; font-family: 'JetBrains Mono', monospace;">${escapeHtml(domName)}</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 12px;">
            ${projs.map(p => {
              const isSelected = p.id === activeCapstoneId;
              return `
                <div class="capstone-project-card ${isSelected ? 'active' : ''}" onclick="window.selectCapstone('${p.id}')" style="cursor: pointer; padding: 16px; border-radius: 8px; border: 1px solid ${isSelected ? '#ffffff' : 'rgba(255,255,255,0.12)'}; background: ${isSelected ? '#141418' : '#0c0d10'}; transition: all 0.15s ease;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="font-size: 10px; font-weight: 700; color: #ffffff; background: #18181b; border: 1px solid rgba(255,255,255,0.18); padding: 2px 7px; border-radius: 3px; font-family: 'JetBrains Mono', monospace;">[${p.steps.length} GUIDED STEPS]</span>
                    <span style="font-size: 10px; font-family: 'JetBrains Mono', monospace; color: #a1a1aa;">${escapeHtml(p.estimatedTime)}</span>
                  </div>
                  <h4 style="font-size: 13px; font-weight: 700; color: #ffffff; margin: 0 0 6px 0; line-height: 1.35;">${escapeHtml(p.title)}</h4>
                  <p style="font-size: 11px; color: #a1a1aa; margin: 0; line-height: 1.45;">${escapeHtml(p.subtitle)}</p>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="capstone-container" style="display: flex; flex-direction: column; gap: 16px;">
        <!-- Top Domain Selection Bar -->
        <div class="capstone-header-card" style="padding: 20px; border-radius: 8px; background: #0c0d10; border: 1px solid rgba(255,255,255,0.12);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
            <div>
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: #18181b; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; color: #ffffff;">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                </span>
                <h2 style="font-size: 15px; font-weight: 700; color: #ffffff; margin: 0; letter-spacing: 0.04em; font-family: 'JetBrains Mono', monospace;">REAL-WORLD GUIDED CAPSTONES ARENA</h2>
                <span class="badge" style="background: #18181b; color: #ffffff; border: 1px solid rgba(255,255,255,0.22); font-size: 9.5px; font-family: 'JetBrains Mono', monospace; font-weight: 700; padding: 2px 7px; border-radius: 3px;">TOP 5 HIRING DOMAINS &bull; 10 PROJECTS</span>
              </div>
              <p style="font-size: 12px; color: #a1a1aa; margin: 6px 0 0 0;">
                Production multi-step financial &amp; analytics challenges. If you need to master a concept before writing the query, click the prerequisite topic tag to jump straight into the matching lesson.
              </p>
            </div>
          </div>
          ${domainCardsHtml}
        </div>

        <!-- Active Capstone Project Workspace -->
        <div id="capstoneActiveWorkspace" style="background: #0c0d10; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 20px;">
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
        <button class="choice-pill" onclick="window.jumpToCapstoneTopic('${pr.sectionKey}')" style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; font-size: 11px; font-family: 'JetBrains Mono', monospace; border: 1px solid rgba(255,255,255,0.2); background: #141418; color: #ffffff; cursor: pointer; border-radius: 4px;" title="${escapeHtml(pr.tip)}">
          <span style="font-weight: 700;">[${escapeHtml(pr.label)}]</span>
          <span style="font-size: 10px; color: #71717a;">&rarr; Review Topic</span>
        </button>
      `;
    });

    // Step Stepper bar
    let stepperHtml = '';
    cap.steps.forEach((s, idx) => {
      const isActive = idx === activeStepIndex;
      const isPast = idx < activeStepIndex;
      stepperHtml += `
        <button class="card-nav-btn" onclick="window.selectCapstoneStep(${idx})" style="padding: 5px 12px; font-size: 11px; font-family: 'JetBrains Mono', monospace; font-weight: ${isActive ? '700' : '500'}; display: flex; align-items: center; gap: 6px; background: ${isActive ? '#ffffff' : '#141418'}; color: ${isActive ? '#000000' : '#a1a1aa'}; border: 1px solid ${isActive ? '#ffffff' : 'rgba(255,255,255,0.12)'}; border-radius: 4px; cursor: pointer;">
          <span>${isPast ? '[PASS]' : `[0${idx + 1}]`}</span>
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
        codeHtml += `<span class="blank-slot ${stateClass}" onclick="window.clearCapstoneSlot('${item.slotId}')" title="${currentVal ? 'Click to clear' : ''}" style="background: ${currentVal ? '#1f1f23' : '#141418'}; color: #ffffff; border: 1px dashed rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 3px; font-family: 'JetBrains Mono', monospace;">${escapeHtml(currentVal || item.placeholder)}</span>`;
      } else {
        codeHtml += escapeHtml(item.text);
      }
    });

    // Choices rows
    let choicesHtml = '';
    Object.keys(step.slots || {}).forEach((slotKey, idx) => {
      const slotInfo = step.slots[slotKey];
      choicesHtml += `
        <div class="slot-choice-row" style="margin-top: 10px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <span class="choice-label" style="font-size: 10px; color: #a1a1aa; font-weight: 700; font-family: 'JetBrains Mono', monospace;">SLOT ${idx + 1}:</span>
          ${slotInfo.options.map((opt, optIdx) => `
            <button class="choice-pill ${userCapstoneSlots[slotKey] === opt ? 'selected' : ''}" onclick="window.selectCapstoneSlotChoice('${slotKey}', '${escapeHtml(opt)}')" style="font-size: 11px; padding: 4px 10px; font-family: 'JetBrains Mono', monospace; background: ${userCapstoneSlots[slotKey] === opt ? '#ffffff' : '#141418'}; color: ${userCapstoneSlots[slotKey] === opt ? '#000000' : '#ffffff'}; border: 1px solid ${userCapstoneSlots[slotKey] === opt ? '#ffffff' : 'rgba(255,255,255,0.18)'}; border-radius: 4px; cursor: pointer;">
              <span>${escapeHtml(opt)}</span>
            </button>
          `).join('')}
        </div>
      `;
    });

    root.innerHTML = `
      <!-- Project Title & Stepper Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 14px; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
        <div>
          <span style="font-size: 10px; font-family: 'JetBrains Mono', monospace; color: #ffffff; font-weight: 700; text-transform: uppercase; background: #18181b; border: 1px solid rgba(255,255,255,0.18); padding: 2px 7px; border-radius: 3px;">[${escapeHtml(cap.domain.toUpperCase())}]</span>
          <h3 style="font-size: 16px; font-weight: 700; color: #ffffff; margin: 6px 0 0 0; font-family: 'JetBrains Mono', monospace;">${escapeHtml(cap.title)}</h3>
        </div>
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          ${stepperHtml}
        </div>
      </div>

      <!-- Sir Bloops Coaching Advice -->
      <div style="display: flex; gap: 12px; background: #141418; border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; padding: 14px; margin-bottom: 16px;">
        <span style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; background: #18181b; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; color: #ffffff; font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700;">SB</span>
        <div>
          <div style="font-size: 10px; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 0.05em; font-family: 'JetBrains Mono', monospace;">ANALYTICAL FIELD COACH // SIR BLOOP</div>
          <div style="font-size: 12px; color: #d4d4d8; margin-top: 3px; line-height: 1.45;">${escapeHtml(step.bloopsAdvice)}</div>
        </div>
      </div>

      <!-- Step Brief & Prerequisites -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
        <div style="background: #090a0d; padding: 14px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">
          <div style="font-size: 10px; font-weight: 700; color: #a1a1aa; text-transform: uppercase; margin-bottom: 4px; font-family: 'JetBrains Mono', monospace;">STEP ${step.stepNumber} OF ${totalSteps}: BUSINESS DIRECTIVE</div>
          <div style="font-size: 13px; font-weight: 700; color: #ffffff; margin-bottom: 6px;">${escapeHtml(step.title)}</div>
          <div style="font-size: 11.5px; color: #a1a1aa; line-height: 1.5;">${escapeHtml(step.businessBrief)}</div>
          <div style="font-size: 10px; font-family: 'JetBrains Mono', monospace; color: #ffffff; margin-top: 10px; background: #141418; border: 1px solid rgba(255,255,255,0.1); padding: 6px 10px; border-radius: 4px;">
            SCHEMA: ${escapeHtml(step.schemaSnippet)}
          </div>
        </div>

        <div style="background: #090a0d; padding: 14px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">
          <div style="font-size: 10px; font-weight: 700; color: #a1a1aa; text-transform: uppercase; margin-bottom: 4px; font-family: 'JetBrains Mono', monospace;">RELATIONAL FOUNDATIONS PREREQUISITES</div>
          <div style="font-size: 11px; color: #a1a1aa; margin-bottom: 8px;">Click any topic tag below to jump directly into the interactive visualizer lesson:</div>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${prereqHtml}
          </div>
        </div>
      </div>

      <!-- Interactive Query Workspace -->
      <div style="background: #000000; border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <span style="font-size: 10px; font-family: 'JetBrains Mono', monospace; color: #a1a1aa; font-weight: 700; letter-spacing: 0.05em;">STEP ${step.stepNumber} TARGET SQL PIPELINE</span>
          <button class="card-nav-btn" onclick="window.resetCapstoneSlots()" style="font-size: 10px; padding: 3px 8px; font-family: 'JetBrains Mono', monospace; background: #141418; color: #ffffff; border: 1px solid rgba(255,255,255,0.18); border-radius: 3px; cursor: pointer;">Reset Slots</button>
        </div>
        <pre class="quest-code-view" style="margin: 0; background: transparent; padding: 0; font-size: 12.5px; line-height: 1.6; font-family: 'JetBrains Mono', monospace; color: #ffffff; overflow-x: auto;"><code>${codeHtml}</code></pre>
      </div>

      <!-- Choice Bank Tray -->
      <div style="background: #090a0d; border: 1px solid rgba(255,255,255,0.12); border-radius: 6px; padding: 14px; margin-bottom: 16px;">
        <div style="font-size: 10px; font-weight: 700; color: #a1a1aa; text-transform: uppercase; margin-bottom: 6px; font-family: 'JetBrains Mono', monospace;">SYNTAX OPTIONS TRAY // CLICK TO FILL TARGET BLANK</div>
        ${choicesHtml}
      </div>

      <!-- Action Buttons -->
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <button class="card-nav-btn" onclick="window.selectCapstoneStep(${Math.max(0, activeStepIndex - 1)})" ${activeStepIndex === 0 ? 'disabled style="opacity: 0.4; cursor: not-allowed;"' : 'style="background: #141418; color: #ffffff; border: 1px solid rgba(255,255,255,0.18); padding: 8px 16px; font-family: JetBrains Mono, monospace; border-radius: 4px; cursor: pointer;"'}>
          &larr; Previous Step
        </button>

        <div style="display: flex; gap: 10px;">
          <button class="action-btn-primary" onclick="window.checkCapstoneStep()" style="padding: 8px 20px; font-size: 12px; font-weight: 700; font-family: 'JetBrains Mono', monospace; background: #ffffff; color: #000000; border: 1px solid #ffffff; border-radius: 4px; cursor: pointer;">
            Verify Step Query (⌘⏎)
          </button>
          ${activeStepIndex < totalSteps - 1 ? `
            <button class="card-nav-btn" onclick="window.selectCapstoneStep(${activeStepIndex + 1})" style="padding: 8px 16px; font-size: 12px; font-family: 'JetBrains Mono', monospace; background: #141418; color: #ffffff; border: 1px solid rgba(255,255,255,0.18); border-radius: 4px; cursor: pointer;">
              Next Step &rarr;
            </button>
          ` : `
            <button class="action-btn-primary" style="background: #ffffff; color: #000000; border: 1px solid #ffffff; padding: 8px 20px; font-size: 12px; font-family: 'JetBrains Mono', monospace; font-weight: 700; border-radius: 4px; cursor: pointer;" onclick="window.completeCapstoneProject()">
              Complete Capstone Project
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
        window.SQL_BUDDY.say(`[VERIFIED] Step ${step.stepNumber} Verified! Clean analytical pipeline execution!`, 4000, 'celebrate');
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
      window.SQL_BUDDY.say(`[COMPLETED] Incredible Work! You completed the full production capstone! This is real-world enterprise SQL!", 5000, 'celebrate');
    }
  }

  function jumpToCapstoneTopic(sectionKey) {
    if (typeof window.switchMainView === 'function') {
      window.switchMainView('viewQuests');
    } else {
      const questsTabBtn = document.querySelector('[data-view="viewQuests"]') || document.querySelector('[data-view="quests"]');
      if (questsTabBtn) questsTabBtn.click();
    }
    if (typeof switchQuestSection === 'function') {
      switchQuestSection(sectionKey);
    }
    if (window.SQL_BUDDY) {
      window.SQL_BUDDY.say(`Navigated to ${sectionKey.toUpperCase()} for prerequisite review! Master this topic and return to the capstone!`, 4500, 'happy');
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
