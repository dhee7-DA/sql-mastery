/**
 * SQL MASTERY VISUALIZER - RAPID-FIRE MUSCLE MEMORY BLITZ ENGINE
 * -------------------------------------------------------------
 * High-octane 10-drill sprint mode for the 1,700 Syntax Gym micro-drills.
 * Features:
 *   - 15s Per-Drill Countdown Timer with dynamic color transitions
 *   - Instant Keyboard Controls: Keys [1]-[9] slot chips, [Backspace] undoes, [Enter] verifies, [Space] advances
 *   - Combo Fire Streaks: 1.0x -> 1.3x -> 1.8x -> 2.5x Multipliers
 *   - Live Reaction Time & Accuracy Tracker
 *   - Pedagogical Post-Mortem Championship Scorecard
 */

(function(window) {
  'use strict';

  const SPRINT_DRILL_COUNT = 10;
  const TIME_PER_DRILL = 15; // 15 seconds per drill

  const state = {
    active: false,
    currentDrillIndex: 0,
    drills: [],
    timeRemaining: TIME_PER_DRILL,
    timerInterval: null,
    drillStartTime: 0,
    isDrillCompleted: false,
    score: 0,
    streak: 0,
    maxStreak: 0,
    totalXp: 0,
    history: [] // { drill, isCorrect, timeTaken, timedOut }
  };

  function getStreakMultiplier() {
    if (state.streak >= 7) return 2.5;
    if (state.streak >= 4) return 1.8;
    if (state.streak >= 2) return 1.3;
    return 1.0;
  }

  function shuffle(arr) {
    const res = [...arr];
    for (let i = res.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [res[i], res[j]] = [res[j], res[i]];
    }
    return res;
  }

  function isActive() {
    return state.active;
  }

  function toggleBlitzMode() {
    if (state.active) {
      stopSprint();
    } else {
      startSprint();
    }
  }

  function startSprint() {
    // 1. Gather drill candidates from active curriculum filter
    let pool = [];
    if (window.SYNTAX_GYM_DRILLS && window.SYNTAX_GYM_DRILLS.length > 0) {
      const activePillar = window.currentGymPillar || 'all';
      let filtered = window.SYNTAX_GYM_DRILLS.slice();

      if (activePillar === 'select') filtered = filtered.filter(d => d.drillNumber >= 1 && d.drillNumber <= 100);
      else if (activePillar === 'where') filtered = filtered.filter(d => d.drillNumber >= 101 && d.drillNumber <= 200);
      else if (activePillar === 'order') filtered = filtered.filter(d => d.drillNumber >= 201 && d.drillNumber <= 300);
      else if (activePillar === 'aggregate') filtered = filtered.filter(d => d.drillNumber >= 301 && d.drillNumber <= 400);
      else if (activePillar === 'casewhen') filtered = filtered.filter(d => d.drillNumber >= 401 && d.drillNumber <= 500);
      else if (activePillar === 'string') filtered = filtered.filter(d => d.drillNumber >= 501 && d.drillNumber <= 600);
      else if (activePillar === 'join_core') filtered = filtered.filter(d => d.drillNumber >= 601 && d.drillNumber <= 700);
      else if (activePillar === 'join_adv') filtered = filtered.filter(d => d.drillNumber >= 701 && d.drillNumber <= 800);
      else if (activePillar === 'join_agg') filtered = filtered.filter(d => d.drillNumber >= 801 && d.drillNumber <= 900);
      else if (activePillar === 'date_time') filtered = filtered.filter(d => d.drillNumber >= 901 && d.drillNumber <= 1000);
      else if (activePillar === 'subqueries') filtered = filtered.filter(d => d.drillNumber >= 1001 && d.drillNumber <= 1100);
      else if (activePillar === 'ctes') filtered = filtered.filter(d => d.drillNumber >= 1101 && d.drillNumber <= 1200);
      else if (activePillar === 'window_ranking') filtered = filtered.filter(d => d.drillNumber >= 1201 && d.drillNumber <= 1300);
      else if (activePillar === 'window_offsets') filtered = filtered.filter(d => d.drillNumber >= 1301 && d.drillNumber <= 1400);
      else if (activePillar === 'window_running') filtered = filtered.filter(d => d.drillNumber >= 1401 && d.drillNumber <= 1500);
      else if (activePillar === 'set_ops') filtered = filtered.filter(d => d.drillNumber >= 1501 && d.drillNumber <= 1600);
      else if (activePillar === 'ddl_dml') filtered = filtered.filter(d => d.drillNumber >= 1601 && d.drillNumber <= 1700);

      if (window.currentGymTable && window.currentGymTable !== 'all') {
        filtered = filtered.filter(d => d.table && d.table.toLowerCase() === window.currentGymTable.toLowerCase());
      }

      if (filtered.length < SPRINT_DRILL_COUNT) {
        filtered = window.SYNTAX_GYM_DRILLS;
      }

      pool = filtered.map((d, index) => {
        const num = d.drillNumber || (index + 1);
        return {
          id: `gym_${num}`,
          drillNumber: num,
          isGymDrill: true,
          section: "Section 0: Foundations & Syntax Gym",
          title: d.title,
          industry: "Foundations",
          table: d.table,
          difficulty: "Easy",
          scenario: d.scenario,
          businessObjective: d.businessObjective,
          schemaSnippet: d.schemaSnippet,
          targetQuery: d.targetQuery,
          syntaxBlueprint: d.syntaxBlueprint,
          syntaxRule: d.syntaxRule,
          syntaxTrap: d.syntaxTrap,
          subcluster: d.subcluster,
          topicName: d.topicName,
          eli5Story: d.eli5Story || `[RULE]: ${d.syntaxRule}\n\n[TRAP]: ${d.syntaxTrap}`,
          commonMistakes: d.commonMistakes,
          learningOutcomes: d.learningOutcomes,
          challengeSlots: d.challengeSlots
        };
      });
    }

    if (pool.length === 0) {
      alert("No drills available to start Blitz Sprint.");
      return;
    }

    state.active = true;
    state.drills = shuffle(pool).slice(0, SPRINT_DRILL_COUNT);
    state.currentDrillIndex = 0;
    state.score = 0;
    state.streak = 0;
    state.maxStreak = 0;
    state.totalXp = 0;
    state.history = [];

    // UI Updates
    const btnToggle = document.getElementById('btnToggleBlitzMode');
    if (btnToggle) {
      btnToggle.classList.add('active');
      btnToggle.innerHTML = `🛑 Exit Blitz Sprint`;
    }

    const tablesBrowser = document.getElementById('gymTablesBrowser');
    if (tablesBrowser) tablesBrowser.style.display = 'none';

    const gymGrid = document.getElementById('syntaxGymGrid');
    if (gymGrid) gymGrid.style.display = 'none';

    const arenaWrapper = document.getElementById('blitzArenaWrapper');
    if (arenaWrapper) arenaWrapper.style.display = 'block';

    if (window.soundFX) {
      window.soundFX.playWhoosh();
      window.soundFX.playChordChime();
    }

    renderCurrentDrill();
  }

  function stopSprint() {
    clearInterval(state.timerInterval);
    state.active = false;
    state.isDrillCompleted = true;

    const btnToggle = document.getElementById('btnToggleBlitzMode');
    if (btnToggle) {
      btnToggle.classList.remove('active');
      btnToggle.innerHTML = `⚡ Rapid-Fire Blitz (10-Drill Sprint)`;
    }

    const arenaWrapper = document.getElementById('blitzArenaWrapper');
    if (arenaWrapper) arenaWrapper.style.display = 'none';

    const tablesBrowser = document.getElementById('gymTablesBrowser');
    if (tablesBrowser) tablesBrowser.style.display = '';

    const gymGrid = document.getElementById('syntaxGymGrid');
    if (gymGrid) gymGrid.style.display = 'grid';

    if (typeof window.renderSyntaxGym === 'function') {
      window.renderSyntaxGym();
    }
  }

  function renderCurrentDrill() {
    clearInterval(state.timerInterval);

    if (state.currentDrillIndex >= state.drills.length) {
      renderScorecard();
      return;
    }

    const drill = state.drills[state.currentDrillIndex];
    state.timeRemaining = TIME_PER_DRILL;
    state.drillStartTime = Date.now();
    state.isDrillCompleted = false;

    // Reset card slots in case blanks engine
    if (window.CASE_BLANKS_ENGINE) {
      window.CASE_BLANKS_ENGINE.clearCaseState(drill.id);
    }

    const arenaWrapper = document.getElementById('blitzArenaWrapper');
    if (!arenaWrapper) return;

    // Build HUD
    const dotsHtml = state.drills.map((d, idx) => {
      let cls = 'blitz-dot';
      if (idx < state.history.length) {
        cls += state.history[idx].isCorrect ? ' completed' : ' failed';
      } else if (idx === state.currentDrillIndex) {
        cls += ' current';
      }
      return `<div class="${cls}"></div>`;
    }).join('');

    const multiplier = getStreakMultiplier();
    const streakHtml = `
      <div class="blitz-streak-pill ${state.streak >= 3 ? 'on-fire' : ''}">
        🔥 ${state.streak}x Streak ${state.streak >= 2 ? `(${multiplier}x)` : ''}
      </div>
    `;

    const hudHtml = `
      <div class="blitz-hud-bar">
        <div class="blitz-hud-left">
          <div class="blitz-round-indicator">Drill ${state.currentDrillIndex + 1} of ${SPRINT_DRILL_COUNT}</div>
          <div class="blitz-dots-container">${dotsHtml}</div>
        </div>
        <div class="blitz-hud-center">
          <div class="blitz-timer-container">
            <div class="blitz-timer-track">
              <div class="blitz-timer-fill" id="blitzTimerFill" style="width: 100%;"></div>
            </div>
            <div class="blitz-timer-seconds" id="blitzTimerSecs">15s</div>
          </div>
        </div>
        <div class="blitz-hud-right">
          ${streakHtml}
          <div class="blitz-xp-pill">⚡ +${state.totalXp} XP</div>
          <button class="card-nav-btn" style="padding: 4px 10px; font-size: 11px;" onclick="window.GYM_BLITZ_ENGINE.stopSprint()">✕ Exit</button>
        </div>
      </div>
      <div id="blitzCardHost">
        ${typeof window.renderGymDrillCardHtml === 'function' ? window.renderGymDrillCardHtml(drill, true) : ''}
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; padding: 0 4px;">
        <div style="font-size: 11px; color: #94a3b8;">
          💡 <em>Pro Tip: Use number keys [1]-[9] to slot chips instantly without dragging!</em>
        </div>
        <button class="micro-text-btn" style="color: #f87171; font-weight: 700; font-size: 11.5px;" onclick="window.GYM_BLITZ_ENGINE.skipCurrentDrill()">
          Skip Drill ⏭
        </button>
      </div>
    `;

    arenaWrapper.innerHTML = hudHtml;

    // Start 100ms interval timer
    state.timerInterval = setInterval(() => {
      state.timeRemaining = Math.max(0, state.timeRemaining - 0.1);
      const fill = document.getElementById('blitzTimerFill');
      const secs = document.getElementById('blitzTimerSecs');

      if (fill) {
        const pct = (state.timeRemaining / TIME_PER_DRILL) * 100;
        fill.style.width = `${pct}%`;
        fill.className = 'blitz-timer-fill';
        if (state.timeRemaining <= 4.5) {
          fill.classList.add('timer-danger');
        } else if (state.timeRemaining <= 7.5) {
          fill.classList.add('timer-warning');
        }
      }

      if (secs) {
        secs.textContent = `${Math.ceil(state.timeRemaining)}s`;
      }

      if (state.timeRemaining <= 0) {
        clearInterval(state.timerInterval);
        handleTimeout();
      }
    }, 100);
  }

  function handleTimeout() {
    if (state.isDrillCompleted) return;
    state.isDrillCompleted = true;
    state.streak = 0;

    const drill = state.drills[state.currentDrillIndex];
    state.history.push({
      drill: drill,
      isCorrect: false,
      timeTaken: TIME_PER_DRILL,
      timedOut: true
    });

    if (window.soundFX) window.soundFX.playError();

    // Reveal solution
    if (typeof window.toggleCaseSolution === 'function') {
      const sol = document.getElementById(`solution_${drill.id}`);
      if (sol) sol.style.display = 'block';
    }

    const fb = document.getElementById(`feedback_${drill.id}`);
    if (fb) {
      fb.className = 'case-feedback-banner feedback-error';
      fb.style.display = 'block';
      fb.innerHTML = `
        <div style="font-size: 13px; font-weight: 900; color: #ef4444; margin-bottom: 4px;">⏰ TIME EXPIRED!</div>
        <div style="font-size: 11.5px; color: #cbd5e1; margin-bottom: 8px;">
          Streak reset to 0. The verified SQL blueprint is revealed in the yellow shield below.
        </div>
        <div style="font-size: 11px; color: #38bdf8; font-weight: 700;">Advancing to next drill in 2.5s (or press [Space])...</div>
      `;
    }

    setTimeout(() => {
      if (state.active && state.isDrillCompleted) {
        advanceDrill();
      }
    }, 2500);
  }

  function onDrillSuccess(caseId, cs, feedbackEl) {
    if (!state.active || state.isDrillCompleted) return;
    clearInterval(state.timerInterval);
    state.isDrillCompleted = true;

    const elapsedSec = Math.max(1, Math.round((Date.now() - state.drillStartTime) / 1000));
    state.score++;
    state.streak++;
    if (state.streak > state.maxStreak) {
      state.maxStreak = state.streak;
    }

    const multiplier = getStreakMultiplier();
    const speedBonus = elapsedSec <= 5 ? 15 : (elapsedSec <= 8 ? 8 : 0);
    const earnedXp = Math.round((20 * multiplier) + speedBonus);
    state.totalXp += earnedXp;

    state.history.push({
      drill: cs,
      isCorrect: true,
      timeTaken: elapsedSec,
      speedBonus: speedBonus > 0
    });

    if (window.soundFX) {
      window.soundFX.playSuccess();
      window.soundFX.playChordChime();
      if (typeof window.soundFX.addXP === 'function') {
        window.soundFX.addXP(earnedXp, 'Blitz Sprint Solved!');
      }
    }

    if (feedbackEl) {
      feedbackEl.className = 'case-feedback-banner feedback-success';
      feedbackEl.style.display = 'block';
      feedbackEl.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 6px;">
          <div style="font-size: 14px; font-weight: 900; color: #22c55e;">
            ⚡ LIGHTNING SOLVE! +${earnedXp} XP
          </div>
          <div style="font-size: 11.5px; font-weight: 800; color: #fbbf24;">
            ${multiplier > 1.0 ? `🔥 ${multiplier}x Streak Multiplier!` : ''} ${speedBonus > 0 ? `⚡ +${speedBonus}XP Speed Bonus (${elapsedSec}s)` : ''}
          </div>
        </div>
        <div style="font-size: 11px; color: #94a3b8;">Advancing to next drill in 1.2s (or press [Space])...</div>
      `;
    }

    setTimeout(() => {
      if (state.active && state.isDrillCompleted) {
        advanceDrill();
      }
    }, 1200);
  }

  function onDrillFailure(caseId, cs, result, feedbackEl) {
    if (!state.active) return;
    // On mistake, streak resets to 0
    state.streak = 0;
    if (window.soundFX) window.soundFX.playError();

    // Re-render HUD streak live
    const streakEl = document.querySelector('.blitz-streak-pill');
    if (streakEl) {
      streakEl.className = 'blitz-streak-pill';
      streakEl.innerHTML = `🔥 0x Streak`;
    }
  }

  function skipCurrentDrill() {
    if (!state.active) return;
    clearInterval(state.timerInterval);
    state.isDrillCompleted = true;
    state.streak = 0;

    const drill = state.drills[state.currentDrillIndex];
    state.history.push({
      drill: drill,
      isCorrect: false,
      timeTaken: TIME_PER_DRILL,
      skipped: true
    });

    advanceDrill();
  }

  function advanceDrill() {
    clearInterval(state.timerInterval);
    state.currentDrillIndex++;
    if (state.currentDrillIndex < state.drills.length) {
      renderCurrentDrill();
    } else {
      renderScorecard();
    }
  }

  function renderScorecard() {
    clearInterval(state.timerInterval);
    state.isDrillCompleted = true;

    const arenaWrapper = document.getElementById('blitzArenaWrapper');
    if (!arenaWrapper) return;

    const totalDrills = state.drills.length;
    const accuracy = Math.round((state.score / totalDrills) * 100);
    const avgTime = state.history.length > 0 
      ? (state.history.reduce((acc, h) => acc + h.timeTaken, 0) / state.history.length).toFixed(1)
      : '0.0';

    const missed = state.history.filter(h => !h.isCorrect);

    let weaknessHtml = '';
    if (missed.length > 0) {
      weaknessHtml = `
        <div class="blitz-weakness-section">
          <div class="blitz-weakness-title">🎯 Syntax Traps &amp; Gotchas Encountered:</div>
          ${missed.map(m => `
            <div class="blitz-weakness-item">
              <strong>${m.drill.title} (${m.drill.table})</strong>: 
              ${m.drill.syntaxTrap ? escapeHtml(m.drill.syntaxTrap) : (m.drill.syntaxRule ? escapeHtml(m.drill.syntaxRule) : 'Review execution order.')}
            </div>
          `).join('')}
        </div>
      `;
    } else {
      weaknessHtml = `
        <div style="background: rgba(34, 197, 94, 0.12); border: 2px solid #22c55e; border-radius: 10px; padding: 14px; margin: 18px 0; color: #4ade80; font-weight: 800; font-size: 13px;">
          🌟 FLAWLESS EXECUTION! Zero syntax traps triggered across all 10 drills!
        </div>
      `;
    }

    const scorecardHtml = `
      <div class="blitz-scorecard">
        <div class="blitz-scorecard-header">
          <div style="font-size: 38px; margin-bottom: 6px;">🏆</div>
          <div class="blitz-scorecard-title">10-Drill Sprint Complete!</div>
          <div class="blitz-scorecard-subtitle">Rapid-fire clause &amp; punctuation muscle memory summary</div>
        </div>

        <div class="blitz-metrics-grid">
          <div class="blitz-metric-card">
            <div class="blitz-metric-val" style="color: ${accuracy >= 80 ? '#22c55e' : (accuracy >= 50 ? '#fbbf24' : '#f87171')};">
              ${accuracy}%
            </div>
            <div class="blitz-metric-lbl">Precision (${state.score}/${totalDrills})</div>
          </div>

          <div class="blitz-metric-card">
            <div class="blitz-metric-val" style="color: #38bdf8;">
              ${avgTime}s
            </div>
            <div class="blitz-metric-lbl">Avg Reaction Time</div>
          </div>

          <div class="blitz-metric-card">
            <div class="blitz-metric-val" style="color: #fb923c;">
              🔥 ${state.maxStreak}x
            </div>
            <div class="blitz-metric-lbl">Max Combo Streak</div>
          </div>

          <div class="blitz-metric-card">
            <div class="blitz-metric-val" style="color: #34d399;">
              ⚡ +${state.totalXp}
            </div>
            <div class="blitz-metric-lbl">Total Sprint XP</div>
          </div>
        </div>

        ${weaknessHtml}

        <div class="blitz-scorecard-actions">
          <button class="btn-case-action" style="background: #fbbf24; color: #000; font-weight: 900; font-size: 13px; padding: 10px 20px;" onclick="window.GYM_BLITZ_ENGINE.startSprint()">
            🚀 Play Another 10-Drill Sprint
          </button>
          <button class="btn-case-action" style="background: #1e293b; color: #fff; font-size: 13px; padding: 10px 18px;" onclick="window.GYM_BLITZ_ENGINE.stopSprint()">
            🏋️ Return to Standard Gym
          </button>
        </div>
      </div>
    `;

    arenaWrapper.innerHTML = scorecardHtml;

    if (window.soundFX) {
      window.soundFX.playSuccess();
      window.soundFX.playChordChime();
    }
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

  // Global Keyboard Navigation
  window.addEventListener('keydown', (e) => {
    if (!state.active) return;
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    const currentDrill = state.drills[state.currentDrillIndex];
    if (!currentDrill) return;
    const caseId = currentDrill.id;

    // Keys 1 to 9: Click the corresponding chip
    if (e.key >= '1' && e.key <= '9') {
      const chipIdx = parseInt(e.key, 10) - 1;
      const chips = Array.from(document.querySelectorAll(`#chips_grid_${caseId} .token-chip:not(.placed):not(.eliminated)`));
      if (chips[chipIdx]) {
        e.preventDefault();
        chips[chipIdx].click();
      }
      return;
    }

    // Backspace: Undo last placed chip
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (window.CASE_BLANKS_ENGINE) {
        const cState = window.CASE_BLANKS_ENGINE.getCaseState(caseId);
        const filled = Object.keys(cState.slots || {}).filter(k => Boolean(cState.slots[k]));
        if (filled.length > 0) {
          window.handleSlotEject(caseId, filled[filled.length - 1]);
        }
      }
      return;
    }

    // Enter: Verify query
    if (e.key === 'Enter') {
      e.preventDefault();
      window.handleVerifyCase(caseId);
      return;
    }

    // Space or ArrowRight: Advance drill if completed
    if (e.key === ' ' || e.key === 'ArrowRight') {
      if (state.isDrillCompleted) {
        e.preventDefault();
        advanceDrill();
      }
      return;
    }

    // Escape: Exit sprint
    if (e.key === 'Escape') {
      e.preventDefault();
      stopSprint();
    }
  });

  window.GYM_BLITZ_ENGINE = {
    isActive: isActive,
    toggleBlitzMode: toggleBlitzMode,
    startSprint: startSprint,
    stopSprint: stopSprint,
    renderCurrentDrill: renderCurrentDrill,
    onDrillSuccess: onDrillSuccess,
    onDrillFailure: onDrillFailure,
    skipCurrentDrill: skipCurrentDrill,
    advanceDrill: advanceDrill
  };

  // Global toggle function bound to UI button
  window.toggleGymBlitzMode = toggleBlitzMode;

})(window);
