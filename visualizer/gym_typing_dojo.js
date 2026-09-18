/**
 * SQL MASTERY VISUALIZER - SPEED TYPER DOJO ENGINE (FEATURE #4)
 * --------------------------------------------------------------
 * MonkeyType / Keybr-style muscle memory practice for SQL syntax.
 * Tracks live WPM, Accuracy, Streak combos, and provides mechanical
 * audio-tactile keystroke feedback.
 */

(function(window) {
  'use strict';

  const dojoSessions = {};

  /**
   * Cleans / normalizes target query for typing practice.
   */
  function cleanQueryForTyping(query) {
    if (!query) return 'SELECT * FROM records;';
    return query.replace(/\r\n/g, '\n').trim();
  }

  /**
   * Renders the Speed Typer Dojo drawer HTML.
   */
  function renderDojoDrawerHtml(caseId, targetQuery, table) {
    const text = cleanQueryForTyping(targetQuery);

    return `
      <div class="gym-dojo-drawer" id="dojo_drawer_${caseId}" style="display: none;">
        <!-- Telemetry Header -->
        <div class="dojo-header">
          <div class="dojo-title-group">
            <span class="dojo-icon">⌨️</span>
            <div>
              <div class="dojo-title">Speed Typer Dojo</div>
              <div class="dojo-sub">Muscle Memory Keystroke Trainer • Type without looking</div>
            </div>
          </div>
          <div class="dojo-stats-strip">
            <div class="dojo-stat-pill">
              <span class="stat-lbl">WPM</span>
              <span class="stat-val text-cyan" id="dojo_wpm_${caseId}">0</span>
            </div>
            <div class="dojo-stat-pill">
              <span class="stat-lbl">ACC</span>
              <span class="stat-val text-green" id="dojo_acc_${caseId}">100%</span>
            </div>
            <div class="dojo-stat-pill">
              <span class="stat-lbl">STREAK</span>
              <span class="stat-val text-amber" id="dojo_streak_${caseId}">0</span>
            </div>
            <div class="dojo-stat-pill">
              <span class="stat-lbl">TIME</span>
              <span class="stat-val" id="dojo_time_${caseId}">0.0s</span>
            </div>
          </div>
        </div>

        <!-- Typing Arena Box -->
        <div class="dojo-arena" 
             id="dojo_arena_${caseId}" 
             tabindex="0"
             onclick="window.GYM_TYPING_DOJO && window.GYM_TYPING_DOJO.focusArena('${caseId}')"
             onkeydown="window.GYM_TYPING_DOJO && window.GYM_TYPING_DOJO.handleKeyDown(event, '${caseId}')">
          <div class="dojo-text-display" id="dojo_text_${caseId}">
            ${renderCharSpans(caseId, text)}
          </div>
          <div class="dojo-arena-hint" id="dojo_hint_${caseId}">
            <span>Click here or press any key to start typing • Press <kbd>ESC</kbd> to exit</span>
          </div>
        </div>

        <!-- Completion Scorecard Modal -->
        <div class="dojo-scorecard-panel" id="dojo_scorecard_${caseId}" style="display: none;"></div>
      </div>
    `;
  }

  function renderCharSpans(caseId, text) {
    let html = '';
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const isFirst = i === 0;
      let displayChar = ch;
      if (ch === ' ') displayChar = '&nbsp;';
      else if (ch === '\n') displayChar = '↵<br/>';
      else displayChar = escapeHtml(ch);

      html += `<span class="dojo-char ${isFirst ? 'current' : 'pending'}" id="dchar_${caseId}_${i}">${displayChar}</span>`;
    }
    return html;
  }

  function initSession(caseId) {
    const cardEl = document.getElementById(`case_card_${caseId}`) || document.getElementById(`dock_${caseId}`)?.closest('.case-study-card');
    const targetQuery = cardEl ? (cardEl.dataset.targetQuery || '') : '';
    const text = cleanQueryForTyping(targetQuery);

    if (dojoSessions[caseId] && dojoSessions[caseId].timerInterval) {
      clearInterval(dojoSessions[caseId].timerInterval);
    }

    dojoSessions[caseId] = {
      text: text,
      index: 0,
      errors: 0,
      totalKeystrokes: 0,
      streak: 0,
      maxStreak: 0,
      startTime: null,
      endTime: null,
      timerInterval: null,
      isFinished: false
    };

    // Reset character spans in DOM
    const textEl = document.getElementById(`dojo_text_${caseId}`);
    if (textEl) {
      textEl.innerHTML = renderCharSpans(caseId, text);
    }

    // Reset stats
    updateStatDisplay(caseId, 0, 100, 0, 0);

    // Hide scorecard
    const sc = document.getElementById(`dojo_scorecard_${caseId}`);
    if (sc) sc.style.display = 'none';

    // Show arena hint
    const hint = document.getElementById(`dojo_hint_${caseId}`);
    if (hint) hint.style.display = 'block';
  }

  function updateStatDisplay(caseId, wpm, acc, streak, timeSec) {
    const wpmEl = document.getElementById(`dojo_wpm_${caseId}`);
    const accEl = document.getElementById(`dojo_acc_${caseId}`);
    const streakEl = document.getElementById(`dojo_streak_${caseId}`);
    const timeEl = document.getElementById(`dojo_time_${caseId}`);

    if (wpmEl) wpmEl.textContent = Math.round(wpm);
    if (accEl) accEl.textContent = `${Math.round(acc)}%`;
    if (streakEl) streakEl.textContent = streak;
    if (timeEl) timeEl.textContent = `${timeSec.toFixed(1)}s`;
  }

  function handleKeyDown(event, caseId) {
    const session = dojoSessions[caseId];
    if (!session || session.isFinished) return;

    if (event.key === 'Escape') {
      toggleDojo(caseId);
      return;
    }

    // Ignore modifier keys
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(event.key)) {
      return;
    }

    event.preventDefault();

    // Start timer on first printable keystroke
    if (!session.startTime) {
      session.startTime = Date.now();
      const hint = document.getElementById(`dojo_hint_${caseId}`);
      if (hint) hint.style.display = 'none';

      session.timerInterval = setInterval(() => {
        if (!session.startTime || session.isFinished) return;
        const elapsedSec = (Date.now() - session.startTime) / 1000;
        const words = (session.index / 5);
        const minutes = elapsedSec / 60;
        const currentWpm = minutes > 0 ? (words / minutes) : 0;
        const currentAcc = session.totalKeystrokes > 0 
          ? Math.max(0, (1 - (session.errors / session.totalKeystrokes)) * 100) 
          : 100;

        updateStatDisplay(caseId, currentWpm, currentAcc, session.streak, elapsedSec);
      }, 200);
    }

    // Handle Backspace
    if (event.key === 'Backspace') {
      if (session.index > 0) {
        const prevCharEl = document.getElementById(`dchar_${caseId}_${session.index - 1}`);
        const currCharEl = document.getElementById(`dchar_${caseId}_${session.index}`);
        if (currCharEl) currCharEl.className = 'dojo-char pending';
        if (prevCharEl) {
          prevCharEl.className = 'dojo-char current';
          session.index--;
        }
      }
      return;
    }

    const expectedChar = session.text[session.index];
    session.totalKeystrokes++;

    let isMatch = false;
    if (event.key === 'Enter' && expectedChar === '\n') isMatch = true;
    else if (event.key === expectedChar) isMatch = true;

    const charEl = document.getElementById(`dchar_${caseId}_${session.index}`);

    if (isMatch) {
      if (charEl) charEl.className = 'dojo-char correct';
      session.streak++;
      if (session.streak > session.maxStreak) session.maxStreak = session.streak;
      session.index++;

      if (window.soundFX) window.soundFX.playPop();
    } else {
      if (charEl) charEl.className = 'dojo-char incorrect';
      session.errors++;
      session.streak = 0;

      if (window.soundFX) window.soundFX.playError();
    }

    // Advance cursor to next char
    if (session.index < session.text.length) {
      const nextCharEl = document.getElementById(`dchar_${caseId}_${session.index}`);
      if (nextCharEl) nextCharEl.classList.add('current');
    } else {
      // Completed!
      finishSession(caseId);
    }
  }

  function finishSession(caseId) {
    const session = dojoSessions[caseId];
    if (!session) return;

    session.isFinished = true;
    session.endTime = Date.now();
    if (session.timerInterval) clearInterval(session.timerInterval);

    const elapsedSec = Math.max(0.5, (session.endTime - session.startTime) / 1000);
    const words = session.text.length / 5;
    const finalWpm = Math.round((words / (elapsedSec / 60)));
    const finalAcc = Math.max(0, Math.round((1 - (session.errors / session.totalKeystrokes)) * 100));

    updateStatDisplay(caseId, finalWpm, finalAcc, session.streak, elapsedSec);

    // Determine Tier Badge
    let tierBadge = '⚡ GRANDMASTER TYPER';
    let tierClass = 'tier-grandmaster';
    if (finalWpm < 40) {
      tierBadge = '🌱 APPRENTICE TYPER';
      tierClass = 'tier-apprentice';
    } else if (finalWpm < 70) {
      tierBadge = '🔥 SENIOR RACER';
      tierClass = 'tier-senior';
    }

    const sc = document.getElementById(`dojo_scorecard_${caseId}`);
    if (sc) {
      sc.innerHTML = `
        <div class="scorecard-content ${tierClass}">
          <div class="scorecard-header">
            <span style="font-size: 24px;">🏆</span>
            <div>
              <div class="scorecard-title">Typing Dojo Mastery Achieved!</div>
              <div class="scorecard-tier-pill">${tierBadge}</div>
            </div>
            <span class="scorecard-xp-badge">+50 XP</span>
          </div>

          <div class="scorecard-stats-grid">
            <div class="sc-stat-box">
              <span class="sc-stat-num text-cyan">${finalWpm}</span>
              <span class="sc-stat-label">Net Words / Min</span>
            </div>
            <div class="sc-stat-box">
              <span class="sc-stat-num text-green">${finalAcc}%</span>
              <span class="sc-stat-label">Keystroke Accuracy</span>
            </div>
            <div class="sc-stat-box">
              <span class="sc-stat-num text-amber">${session.maxStreak}</span>
              <span class="sc-stat-label">Max Streak Combo</span>
            </div>
            <div class="sc-stat-box">
              <span class="sc-stat-num">${elapsedSec.toFixed(1)}s</span>
              <span class="sc-stat-label">Elapsed Time</span>
            </div>
          </div>

          <div class="scorecard-actions">
            <button class="btn-dojo-action btn-retry" onclick="window.GYM_TYPING_DOJO && window.GYM_TYPING_DOJO.resetDojo('${caseId}')">
              ↺ Practice Again
            </button>
            <button class="btn-dojo-action" onclick="navigator.clipboard.writeText(decodeURIComponent('${encodeURIComponent(session.text)}')); alert('SQL copied!');">
              📋 Copy SQL
            </button>
            <button class="btn-dojo-action btn-close-dojo" onclick="window.GYM_TYPING_DOJO && window.GYM_TYPING_DOJO.toggleDojo('${caseId}')">
              ✕ Close Dojo
            </button>
          </div>
        </div>
      `;
      sc.style.display = 'block';
    }

    if (window.soundFX) window.soundFX.playSuccess();
  }

  function focusArena(caseId) {
    const arena = document.getElementById(`dojo_arena_${caseId}`);
    if (arena) arena.focus();
  }

  function resetDojo(caseId) {
    initSession(caseId);
    focusArena(caseId);
  }

  function toggleDojo(caseId) {
    const el = document.getElementById(`dojo_drawer_${caseId}`);
    if (!el) return;
    const isShowing = el.style.display === 'block';
    el.style.display = isShowing ? 'none' : 'block';

    if (!isShowing) {
      initSession(caseId);
      setTimeout(() => focusArena(caseId), 50);
      if (window.soundFX) window.soundFX.playWhoosh();
    } else {
      if (dojoSessions[caseId] && dojoSessions[caseId].timerInterval) {
        clearInterval(dojoSessions[caseId].timerInterval);
      }
      if (window.soundFX) window.soundFX.playClick();
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

  window.GYM_TYPING_DOJO = {
    renderDojoDrawerHtml,
    toggleDojo,
    handleKeyDown,
    focusArena,
    resetDojo
  };

})(window);
