/**
 * SQL MASTERY VISUALIZER - SPACED REPETITION FLASHCARD VAULT (FEATURE #5)
 * -----------------------------------------------------------------------
 * SuperMemo-2 (SM-2) Spaced Repetition algorithm for long-term SQL syntax retention.
 * Curates a personalized "Daily 5 Workout" queue, tracks Ease Factors (EF),
 * intervals, and offers 3D flippable flashcard review.
 */

(function(window) {
  'use strict';

  const STORAGE_KEY = 'sql_mastery_sm2_cards';
  const STREAK_KEY = 'sql_mastery_sm2_streak';

  function loadCards() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  function saveCards(cards) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    } catch (e) {
      console.warn('Failed to save SM-2 cards', e);
    }
  }

  function getStreak() {
    try {
      const s = localStorage.getItem(STREAK_KEY);
      return s ? JSON.parse(s) : { currentStreak: 0, lastDate: null };
    } catch (e) {
      return { currentStreak: 0, lastDate: null };
    }
  }

  function recordStreakDay() {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const streak = getStreak();
      if (streak.lastDate !== today) {
        if (streak.lastDate) {
          const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
          if (streak.lastDate === yesterday) streak.currentStreak++;
          else streak.currentStreak = 1;
        } else {
          streak.currentStreak = 1;
        }
        streak.lastDate = today;
        localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
      }
    } catch (e) {}
  }

  /**
   * SuperMemo-2 (SM-2) Algorithm implementation.
   * quality: 0 (Again), 3 (Hard), 4 (Good), 5 (Easy)
   */
  function calculateSM2(card, quality) {
    let ef = card.ef || 2.5;
    let repetitions = card.repetitions || 0;
    let interval = card.interval || 0;

    // Update Ease Factor
    ef = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (ef < 1.3) ef = 1.3;

    if (quality < 3) {
      repetitions = 0;
      interval = 1;
    } else {
      if (repetitions === 0) interval = 1;
      else if (repetitions === 1) interval = 6;
      else interval = Math.round(interval * ef);
      repetitions++;
    }

    const dueDate = Date.now() + (interval * 86400000);

    return {
      ef: Math.round(ef * 100) / 100,
      repetitions,
      interval,
      dueDate,
      lastReviewed: Date.now()
    };
  }

  /**
   * Returns a card's current SM-2 record or creates an initialized default.
   */
  function getCardRecord(caseId) {
    const cards = loadCards();
    return cards[caseId] || {
      ef: 2.5,
      repetitions: 0,
      interval: 0,
      dueDate: Date.now() - 1000, // Due immediately
      lastReviewed: null
    };
  }

  /**
   * Returns up to 5 drill cards due for review today.
   */
  function getDaily5DueQueue() {
    const cards = loadCards();
    const now = Date.now();
    const dueQueue = [];

    // First collect any cards in storage that are due
    Object.entries(cards).forEach(([caseId, card]) => {
      if (card.dueDate <= now) {
        dueQueue.push({ caseId, card });
      }
    });

    // If queue has fewer than 5 items, seed from available drills/case studies
    if (dueQueue.length < 5) {
      const candidates = (window.SYNTAX_GYM_DRILLS || []).map(d => ({
        id: `gym_${d.drillNumber}`,
        title: d.title,
        query: d.targetQuery,
        table: d.table
      }));

      for (let i = 0; i < candidates.length && dueQueue.length < 5; i++) {
        const c = candidates[i];
        if (!dueQueue.some(item => item.caseId === c.id)) {
          const card = getCardRecord(c.id);
          dueQueue.push({ caseId: c.id, card });
        }
      }
    }

    return dueQueue.slice(0, 5);
  }

  let activeWorkoutQueue = [];
  let activeIndex = 0;
  let isFlipped = false;

  /**
   * Opens the full-screen / centered Daily 5 Workout Modal.
   */
  function openDailyWorkoutModal() {
    activeWorkoutQueue = getDaily5DueQueue();
    activeIndex = 0;
    isFlipped = false;

    let modal = document.getElementById('daily_workout_modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'daily_workout_modal';
      modal.className = 'daily-workout-modal-backdrop';
      document.body.appendChild(modal);
    }

    renderModalContent();
    modal.style.display = 'flex';

    if (window.soundFX) window.soundFX.playWhoosh();
  }

  function closeDailyWorkoutModal() {
    const modal = document.getElementById('daily_workout_modal');
    if (modal) modal.style.display = 'none';
    if (window.soundFX) window.soundFX.playClick();
  }

  function renderModalContent() {
    const modal = document.getElementById('daily_workout_modal');
    if (!modal) return;

    if (activeIndex >= activeWorkoutQueue.length) {
      // Workout completed!
      recordStreakDay();
      const streak = getStreak();

      modal.innerHTML = `
        <div class="workout-modal-card workout-celebration">
          <div class="celebration-icon">🎉</div>
          <h2 class="celebration-title">Daily 5 Workout Complete!</h2>
          <div class="celebration-sub">Your brain memory pathways have been consolidated via SM-2 spaced repetition.</div>

          <div class="celebration-stats-strip">
            <div class="cel-stat-pill">
              <span class="cel-lbl">REVIEWS CLEARED</span>
              <span class="cel-val text-green">5 / 5</span>
            </div>
            <div class="cel-stat-pill">
              <span class="cel-lbl">DAILY STREAK</span>
              <span class="cel-val text-amber">🔥 ${streak.currentStreak} Days</span>
            </div>
            <div class="cel-stat-pill">
              <span class="cel-lbl">XP AWARDED</span>
              <span class="cel-val text-cyan">+100 XP</span>
            </div>
          </div>

          <div class="celebration-actions">
            <button class="btn-cel-done" onclick="window.GYM_SPACED_REPETITION && window.GYM_SPACED_REPETITION.closeDailyWorkoutModal()">
              🚀 Finish &amp; Return to Visualizer
            </button>
          </div>
        </div>
      `;
      if (window.soundFX) window.soundFX.playSuccess();
      return;
    }

    const currentItem = activeWorkoutQueue[activeIndex];
    const caseId = currentItem.caseId;
    const cardEl = document.getElementById(`case_card_${caseId}`) || document.getElementById(`dock_${caseId}`)?.closest('.case-study-card');
    
    // Extract metadata
    const title = cardEl?.querySelector('.case-study-title')?.textContent?.trim() || `SQL Drill #${activeIndex + 1}`;
    const desc = cardEl?.querySelector('.case-study-desc')?.textContent?.trim() || 'Construct the high-performance production query.';
    const query = cardEl?.dataset?.targetQuery || 'SELECT * FROM records;';
    const table = cardEl?.dataset?.table || 'records';
    const streak = getStreak();

    modal.innerHTML = `
      <div class="workout-modal-card">
        <!-- Header -->
        <div class="workout-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 20px;">🗂️</span>
            <div>
              <div class="workout-top-title">SuperMemo-2 Spaced Repetition Vault</div>
              <div class="workout-top-sub">Card ${activeIndex + 1} of ${activeWorkoutQueue.length} • Daily 5 Workout</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="workout-streak-pill">🔥 ${streak.currentStreak}d Streak</span>
            <button class="workout-close-btn" onclick="window.GYM_SPACED_REPETITION && window.GYM_SPACED_REPETITION.closeDailyWorkoutModal()">✕</button>
          </div>
        </div>

        <!-- 3D Flippable Flashcard Arena -->
        <div class="flashcard-scene" onclick="window.GYM_SPACED_REPETITION && window.GYM_SPACED_REPETITION.flipCard()">
          <div class="flashcard-flipper ${isFlipped ? 'flipped' : ''}" id="flashcard_flipper">
            <!-- FRONT SIDE -->
            <div class="flashcard-face flashcard-front">
              <div class="face-tag-row">
                <span class="face-tag prompt-tag">PROMPT • RECALL CHALLENGE</span>
                <span class="face-hint">Click card to Flip ↻</span>
              </div>
              <div class="face-title">${escapeHtml(title)}</div>
              <div class="face-desc">${escapeHtml(desc)}</div>
              <div class="face-table-pill">Target Table: <code>${escapeHtml(table)}</code></div>
              <div class="face-prompt-cta">
                <span>🧠 Mentally assemble the exact SQL clauses, join predicates, and window logic...</span>
              </div>
            </div>

            <!-- BACK SIDE -->
            <div class="flashcard-face flashcard-back">
              <div class="face-tag-row">
                <span class="face-tag answer-tag">✅ SURGICAL SOLUTION &amp; SYNTAX</span>
                <span class="face-hint">Click card to Flip ↻</span>
              </div>
              <div class="face-solution-box">
                <pre><code>${escapeHtml(query)}</code></pre>
              </div>
              <div class="face-physics-box">
                <span style="font-size: 13px;">⚡</span>
                <span style="font-size: 11px; color: #cbd5e1;">Evaluates with zero memory spills; leverages indexed range seek and deterministic ordering.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Controls: Flip button or SM-2 Recall Rating -->
        <div class="workout-controls-dock">
          ${!isFlipped ? `
            <button class="btn-flip-trigger" onclick="window.GYM_SPACED_REPETITION && window.GYM_SPACED_REPETITION.flipCard()">
              🔄 Reveal Answer &amp; Solution (Space / Click)
            </button>
          ` : `
            <div class="rating-buttons-group">
              <button class="btn-rate-sm2 rate-again" onclick="window.GYM_SPACED_REPETITION && window.GYM_SPACED_REPETITION.rateCard(0)">
                <span class="rate-key">[1]</span>
                <span class="rate-title">Again</span>
                <span class="rate-int">&lt; 1d</span>
              </button>
              <button class="btn-rate-sm2 rate-hard" onclick="window.GYM_SPACED_REPETITION && window.GYM_SPACED_REPETITION.rateCard(3)">
                <span class="rate-key">[2]</span>
                <span class="rate-title">Hard</span>
                <span class="rate-int">2d</span>
              </button>
              <button class="btn-rate-sm2 rate-good" onclick="window.GYM_SPACED_REPETITION && window.GYM_SPACED_REPETITION.rateCard(4)">
                <span class="rate-key">[3]</span>
                <span class="rate-title">Good</span>
                <span class="rate-int">5d</span>
              </button>
              <button class="btn-rate-sm2 rate-easy" onclick="window.GYM_SPACED_REPETITION && window.GYM_SPACED_REPETITION.rateCard(5)">
                <span class="rate-key">[4]</span>
                <span class="rate-title">Easy</span>
                <span class="rate-int">10d</span>
              </button>
            </div>
          `}
        </div>
      </div>
    `;
  }

  function flipCard() {
    isFlipped = !isFlipped;
    const flipper = document.getElementById('flashcard_flipper');
    if (flipper) {
      if (isFlipped) flipper.classList.add('flipped');
      else flipper.classList.remove('flipped');
    }
    renderModalContent();
    if (window.soundFX) window.soundFX.playPop();
  }

  function rateCard(quality) {
    const currentItem = activeWorkoutQueue[activeIndex];
    if (!currentItem) return;

    const cards = loadCards();
    const existing = cards[currentItem.caseId] || getCardRecord(currentItem.caseId);
    const updated = calculateSM2(existing, quality);
    cards[currentItem.caseId] = updated;
    saveCards(cards);

    activeIndex++;
    isFlipped = false;
    renderModalContent();

    if (window.soundFX) {
      if (quality >= 4) window.soundFX.playSuccess();
      else window.soundFX.playClick();
    }
  }

  /**
   * Renders the inline retention pill badge on a drill card.
   */
  function renderCardBadgeHtml(caseId) {
    const card = getCardRecord(caseId);
    const now = Date.now();
    const isDue = card.dueDate <= now;

    let badgeText = '🗂️ SM-2: Due Today';
    let badgeClass = 'sm2-due';
    if (!isDue) {
      const daysLeft = Math.max(1, Math.ceil((card.dueDate - now) / 86400000));
      badgeText = `🗂️ In Vault • Review in ${daysLeft}d`;
      badgeClass = 'sm2-scheduled';
    }

    return `
      <div class="sm2-card-badge ${badgeClass}" 
           onclick="window.GYM_SPACED_REPETITION && window.GYM_SPACED_REPETITION.openDailyWorkoutModal()"
           title="SuperMemo-2 Spaced Repetition Flashcard Vault (Click to start Daily 5 Workout)">
        <span>${escapeHtml(badgeText)}</span>
      </div>
    `;
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

  window.GYM_SPACED_REPETITION = {
    openDailyWorkoutModal,
    closeDailyWorkoutModal,
    flipCard,
    rateCard,
    renderCardBadgeHtml,
    getDaily5DueQueue,
    getStreak
  };

})(window);
