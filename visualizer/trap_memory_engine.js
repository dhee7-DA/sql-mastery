/**
 * ============================================================================
 * 🧠 SQL TRAP SPACED REPETITION (SRS) ENGINE
 * ============================================================================
 * Implements Leitner Box scheduling (Box 1-4) with localStorage persistence,
 * mistake auto-capture hooks from Quests/MCQs, and 3D flip card interactions.
 * ============================================================================
 */

(function (window) {
  'use strict';

  const STORAGE_KEY = 'SQL_TRAP_SRS_STATE_V1';
  const DAY_MS = 24 * 60 * 60 * 1000;

  // Leitner review intervals by box level
  const BOX_CONFIG = {
    1: { name: 'Learning', label: 'Box 1', intervalDays: 0, color: '#ef4444', desc: 'Due Daily / Immediate' },
    2: { name: 'Developing', label: 'Box 2', intervalDays: 1, color: '#f59e0b', desc: 'Review in 1 Day' },
    3: { name: 'Retained', label: 'Box 3', intervalDays: 3, color: '#10b981', desc: 'Review in 3 Days' },
    4: { name: 'Mastered', label: 'Box 4', intervalDays: 7, color: '#38bdf8', desc: 'Review in 7 Days' }
  };

  class TrapMemoryEngine {
    constructor() {
      this.state = this.loadState();
      this.currentCategory = 'all';
      this.mode = 'due'; // 'due' or 'all'
      this.currentCardIndex = 0;
      this.isFlipped = false;
      this.sessionStats = { reviewedThisSession: 0, correctThisSession: 0 };
    }

    loadState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.cards) return parsed;
        }
      } catch (err) {
        console.warn('[TrapSRS] Failed to parse saved state, resetting', err);
      }
      return {
        cards: {},
        totalReviewsCount: 0,
        goodReviewsCount: 0,
        mistakesLoggedCount: 0
      };
    }

    saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (err) {
        console.error('[TrapSRS] Failed to persist state', err);
      }
    }

    getCardState(cardId) {
      if (!this.state.cards[cardId]) {
        // Unseen cards start in Box 1 and are DUE immediately
        this.state.cards[cardId] = {
          box: 1,
          lastReviewed: 0,
          nextReview: 0, // 0 means due right now
          reviewCount: 0,
          streak: 0,
          mistakeHits: 0
        };
      }
      return this.state.cards[cardId];
    }

    getStats() {
      const allCards = window.MASTER_TRAP_FLASHCARDS || [];
      const now = Date.now();
      let dueCount = 0;
      const boxCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };

      allCards.forEach(c => {
        const cs = this.getCardState(c.id);
        boxCounts[cs.box] = (boxCounts[cs.box] || 0) + 1;
        if (cs.nextReview <= now) {
          dueCount++;
        }
      });

      const totalReviews = this.state.totalReviewsCount || 0;
      const goodReviews = this.state.goodReviewsCount || 0;
      const retentionRate = totalReviews > 0 ? Math.round((goodReviews / totalReviews) * 100) : 100;

      return {
        totalCards: allCards.length,
        dueCount,
        boxCounts,
        masteredCount: boxCounts[4],
        retentionRate,
        mistakesLogged: this.state.mistakesLoggedCount || 0
      };
    }

    getActiveDeck() {
      const allCards = window.MASTER_TRAP_FLASHCARDS || [];
      const now = Date.now();

      return allCards.filter(c => {
        // 1. Category check
        if (this.currentCategory !== 'all' && c.category !== this.currentCategory) {
          return false;
        }
        // 2. Mode check
        if (this.mode === 'due') {
          const cs = this.getCardState(c.id);
          return cs.nextReview <= now;
        }
        return true;
      });
    }

    recordReview(cardId, rating) {
      const cs = this.getCardState(cardId);
      const now = Date.now();
      cs.reviewCount = (cs.reviewCount || 0) + 1;
      cs.lastReviewed = now;
      this.state.totalReviewsCount = (this.state.totalReviewsCount || 0) + 1;
      this.sessionStats.reviewedThisSession++;

      if (rating === 'again') {
        // Regress to Box 1, due in 5 minutes
        cs.box = 1;
        cs.streak = 0;
        cs.nextReview = now + (5 * 60 * 1000); // 5 minutes
      } else if (rating === 'hard') {
        // Stay in Box 1 or Box 2, due tomorrow
        cs.box = Math.max(1, Math.min(cs.box, 2));
        cs.nextReview = now + (1 * DAY_MS);
      } else if (rating === 'good') {
        // Advance 1 Box up to Box 4
        cs.box = Math.min(4, cs.box + 1);
        cs.streak = (cs.streak || 0) + 1;
        this.state.goodReviewsCount = (this.state.goodReviewsCount || 0) + 1;
        this.sessionStats.correctThisSession++;
        const interval = BOX_CONFIG[cs.box].intervalDays * DAY_MS;
        cs.nextReview = now + Math.max(interval, DAY_MS);
      } else if (rating === 'easy') {
        // Jump directly to Box 4 (Mastered)
        cs.box = 4;
        cs.streak = (cs.streak || 0) + 2;
        this.state.goodReviewsCount = (this.state.goodReviewsCount || 0) + 1;
        this.sessionStats.correctThisSession++;
        cs.nextReview = now + (7 * DAY_MS);
      }

      this.saveState();
      this.updateGlobalBadge();
    }

    recordMistake(trapKey, contextInfo) {
      if (!trapKey) return;
      const allCards = window.MASTER_TRAP_FLASHCARDS || [];
      const match = allCards.find(c => 
        (c.trapKey && c.trapKey.toUpperCase() === trapKey.toUpperCase()) ||
        (c.trapTitle && c.trapTitle.toUpperCase().includes(trapKey.toUpperCase()))
      );

      this.state.mistakesLoggedCount = (this.state.mistakesLoggedCount || 0) + 1;

      if (match) {
        const cs = this.getCardState(match.id);
        cs.box = 1; // Demote to Box 1 immediately
        cs.nextReview = Date.now(); // Due immediately
        cs.mistakeHits = (cs.mistakeHits || 0) + 1;
        this.saveState();
        this.updateGlobalBadge();

        // Dispatch notification
        window.dispatchEvent(new CustomEvent('sql-trap-captured', {
          detail: {
            cardId: match.id,
            trapTitle: match.trapTitle,
            context: contextInfo
          }
        }));
      }
    }

    resetAllProgress() {
      if (confirm('Reset all Spaced Repetition flashcard progress back to Box 1?')) {
        this.state = {
          cards: {},
          totalReviewsCount: 0,
          goodReviewsCount: 0,
          mistakesLoggedCount: 0
        };
        this.saveState();
        this.currentCardIndex = 0;
        this.isFlipped = false;
        this.updateGlobalBadge();
        this.renderView();
      }
    }

    updateGlobalBadge() {
      const stats = this.getStats();
      const badgePill = document.getElementById('trapSrsNavBadge');
      if (badgePill) {
        badgePill.textContent = stats.dueCount > 0 ? `🔥 ${stats.dueCount} Due` : `✅ Up to Date`;
        badgePill.className = stats.dueCount > 0 ? 'nav-item-tag accent pulse' : 'nav-item-tag';
      }
      const headerPill = document.getElementById('currentPracticePill');
      if (headerPill && stats.dueCount > 0) {
        headerPill.title = `${stats.dueCount} SQL Traps Due for Review`;
      }
    }

    // =========================================================================
    // UI RENDERING
    // =========================================================================

    renderView() {
      const container = document.getElementById('viewTrapGym');
      if (!container) return;

      const stats = this.getStats();
      const deck = this.getActiveDeck();
      if (this.currentCardIndex >= deck.length) {
        this.currentCardIndex = Math.max(0, deck.length - 1);
      }
      const activeCard = deck[this.currentCardIndex] || null;
      const cardState = activeCard ? this.getCardState(activeCard.id) : null;

      container.innerHTML = `
        <div class="trap-gym-container">
          <!-- 1. HEADER & SRS PROGRESS MATRIX -->
          <div class="trap-gym-header">
            <div class="trap-gym-title-col">
              <div class="trap-title-row">
                <span class="trap-main-icon">🧠</span>
                <div>
                  <h1 class="trap-title-text">SQL Production Trap Memory Gym</h1>
                  <p class="trap-subtitle">Leitner Spaced Repetition (SRS) Engine &bull; Inoculate against silent bugs, 3VL flaws, and Cartesian explosions</p>
                </div>
              </div>
            </div>

            <div class="trap-actions-col">
              <button class="btn btn-secondary btn-sm" onclick="window.trapSRS.resetAllProgress()" title="Reset memory scheduling">
                🔄 Reset Memory Deck
              </button>
            </div>
          </div>

          <!-- 2. LEITNER BOXES HEATMAP -->
          <div class="leitner-matrix-bar">
            <div class="leitner-box-tile ${stats.dueCount > 0 ? 'has-due' : ''}">
              <div class="leitner-tile-top">
                <span class="leitner-tile-title">🔥 Due For Review</span>
                <span class="leitner-tile-count text-amber">${stats.dueCount}</span>
              </div>
              <div class="leitner-tile-sub">Needs practice today</div>
            </div>

            <div class="leitner-box-tile" style="border-top: 3px solid #ef4444;">
              <div class="leitner-tile-top">
                <span class="leitner-tile-title">Box 1: Learning</span>
                <span class="leitner-tile-count" style="color: #ef4444;">${stats.boxCounts[1]}</span>
              </div>
              <div class="leitner-tile-sub">Daily review (0d)</div>
            </div>

            <div class="leitner-box-tile" style="border-top: 3px solid #f59e0b;">
              <div class="leitner-tile-top">
                <span class="leitner-tile-title">Box 2: Developing</span>
                <span class="leitner-tile-count" style="color: #f59e0b;">${stats.boxCounts[2]}</span>
              </div>
              <div class="leitner-tile-sub">Every 1 day</div>
            </div>

            <div class="leitner-box-tile" style="border-top: 3px solid #10b981;">
              <div class="leitner-tile-top">
                <span class="leitner-tile-title">Box 3: Retained</span>
                <span class="leitner-tile-count" style="color: #10b981;">${stats.boxCounts[3]}</span>
              </div>
              <div class="leitner-tile-sub">Every 3 days</div>
            </div>

            <div class="leitner-box-tile" style="border-top: 3px solid #38bdf8;">
              <div class="leitner-tile-top">
                <span class="leitner-tile-title">Box 4: Mastered</span>
                <span class="leitner-tile-count" style="color: #38bdf8;">${stats.boxCounts[4]}</span>
              </div>
              <div class="leitner-tile-sub">Weekly review (7d)</div>
            </div>

            <div class="leitner-box-tile">
              <div class="leitner-tile-top">
                <span class="leitner-tile-title">Retention Accuracy</span>
                <span class="leitner-tile-count text-cyan">${stats.retentionRate}%</span>
              </div>
              <div class="leitner-tile-sub">${stats.mistakesLogged} Traps Logged</div>
            </div>
          </div>

          <!-- 3. CONTROLS BAR: CATEGORY FILTER + MODE TOGGLE -->
          <div class="trap-controls-row">
            <div class="trap-category-chips">
              ${(window.TRAP_CATEGORIES || []).map(cat => `
                <button class="trap-chip-btn ${this.currentCategory === cat.id ? 'active' : ''}" 
                        onclick="window.trapSRS.setCategory('${cat.id}')">
                  <span class="chip-icon">${cat.icon}</span>
                  <span>${cat.name}</span>
                </button>
              `).join('')}
            </div>

            <div class="trap-mode-toggle">
              <button class="mode-pill-btn ${this.mode === 'due' ? 'active' : ''}" 
                      onclick="window.trapSRS.setMode('due')">
                🔥 Due Only (${deck.length})
              </button>
              <button class="mode-pill-btn ${this.mode === 'all' ? 'active' : ''}" 
                      onclick="window.trapSRS.setMode('all')">
                📖 Browse All (36)
              </button>
            </div>
          </div>

          <!-- 4. ACTIVE FLASHCARD ARENA -->
          <div class="trap-flashcard-stage">
            ${activeCard ? this.renderActiveCardHtml(activeCard, cardState, deck.length) : this.renderEmptyStateHtml()}
          </div>

          <!-- 5. QUICK-JUMP DRAWER / CATALOG OF ALL 36 TRAPS -->
          <div class="trap-catalog-drawer">
            <div class="trap-drawer-header">
              <div class="drawer-header-title">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
                <span>Deck Directory &bull; ${deck.length} Traps in Current View</span>
              </div>
              <span class="drawer-header-hint">Click any trap card to jump directly into practice</span>
            </div>

            <div class="trap-drawer-grid">
              ${deck.map((c, idx) => {
                const cs = this.getCardState(c.id);
                const isSelected = idx === this.currentCardIndex;
                const isDue = cs.nextReview <= Date.now();
                return `
                  <div class="trap-catalog-card ${isSelected ? 'selected' : ''} ${isDue ? 'is-due' : ''}" 
                       onclick="window.trapSRS.jumpToCard(${idx})">
                    <div class="tcat-card-top">
                      <span class="tcat-box-badge" style="background: ${BOX_CONFIG[cs.box].color}22; color: ${BOX_CONFIG[cs.box].color}; border: 1px solid ${BOX_CONFIG[cs.box].color}55;">
                        Box ${cs.box}
                      </span>
                      ${isDue ? '<span class="tcat-due-pill">🔥 DUE</span>' : ''}
                      <span class="tcat-severity ${c.severity.toLowerCase()}">${c.severity}</span>
                    </div>
                    <div class="tcat-card-title">${c.trapTitle}</div>
                    <div class="tcat-card-sub">${c.summary}</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      `;
    }

    renderActiveCardHtml(card, cs, totalInDeck) {
      const boxCfg = BOX_CONFIG[cs.box];
      const isDue = cs.nextReview <= Date.now();

      return `
        <div class="srs-card-wrapper ${this.isFlipped ? 'is-flipped' : ''}" id="srsActiveCard">
          
          <!-- CARD NAVIGATION STEPPER -->
          <div class="srs-nav-header">
            <div class="srs-step-info">
              <button class="btn btn-secondary btn-xs" onclick="window.trapSRS.prevCard()" ${this.currentCardIndex === 0 ? 'disabled' : ''}>
                &larr; Prev
              </button>
              <span class="srs-counter-text">Trap <strong>${this.currentCardIndex + 1}</strong> of <strong>${totalInDeck}</strong></span>
              <button class="btn btn-secondary btn-xs" onclick="window.trapSRS.nextCard()" ${this.currentCardIndex >= totalInDeck - 1 ? 'disabled' : ''}>
                Next &rarr;
              </button>
            </div>

            <div class="srs-badge-row">
              <span class="srs-status-badge" style="background: ${boxCfg.color}22; color: ${boxCfg.color}; border: 1px solid ${boxCfg.color}66;">
                ● ${boxCfg.label}: ${boxCfg.name} (${boxCfg.desc})
              </span>
              ${isDue ? '<span class="srs-due-badge">🔥 DUE TODAY</span>' : '<span class="srs-reviewed-badge">✓ SCHEDULED</span>'}
              <span class="srs-freq-badge">${card.frequency}</span>
            </div>
          </div>

          <!-- FRONT OF FLASHCARD (QUESTION & FLAWED QUERY) -->
          <div class="srs-card-front" style="display: ${this.isFlipped ? 'none' : 'block'};">
            <div class="srs-front-body">
              <div class="srs-trap-tag-row">
                <span class="srs-cat-badge">${card.category.toUpperCase()}</span>
                <span class="srs-trap-key-badge">${card.trapKey}</span>
                <span class="srs-severity-badge ${card.severity.toLowerCase()}">${card.severity} RISK</span>
              </div>

              <h2 class="srs-trap-headline">${card.trapTitle}</h2>
              <p class="srs-scenario-text"><strong>Real-World Scenario:</strong> ${card.scenario}</p>

              <div class="srs-code-container">
                <div class="srs-code-header">
                  <span class="srs-code-label">🚨 Flawed Production Query (Can you spot the trap?)</span>
                  <span class="srs-code-sub">Look for silent filters, type coercion, or Cartesian fan-out</span>
                </div>
                <pre class="srs-code-block"><code>${this.escapeHtml(card.flawedCode)}</code></pre>
              </div>

              <div class="srs-flip-cta-box">
                <button class="btn btn-primary btn-lg srs-reveal-btn" onclick="window.trapSRS.flipCard()">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  <span>Reveal Production Dissection &amp; Bulletproof Fix</span>
                  <kbd class="srs-kbd">Space</kbd>
                </button>
                <div class="srs-flip-hint">Test your brain first: What happens at runtime? Why does this fail or return corrupted numbers?</div>
              </div>
            </div>
          </div>

          <!-- BACK OF FLASHCARD (DISSECTION, IMPACT, FIX & MNEMONIC) -->
          <div class="srs-card-back" style="display: ${this.isFlipped ? 'block' : 'none'};">
            <div class="srs-back-body">
              <div class="srs-back-header">
                <div>
                  <span class="srs-dissect-label">🛡️ PRODUCTION DISSECTION &amp; POST-MORTEM</span>
                  <h2 class="srs-trap-headline" style="color: #38bdf8;">${card.trapTitle}</h2>
                </div>
                <button class="btn btn-secondary btn-xs" onclick="window.trapSRS.flipCard()">
                  ↩ Flip Back to Question
                </button>
              </div>

              <!-- ANALYSIS GRID -->
              <div class="srs-dissection-grid">
                <div class="srs-dissect-card flaw-card">
                  <div class="srs-dissect-title">
                    <span class="dissect-icon">💀</span>
                    <span>The Fatal Flaw (Why It Fails)</span>
                  </div>
                  <div class="srs-dissect-text">${card.revealedAnalysis.fatalFlaw}</div>
                </div>

                <div class="srs-dissect-card impact-card">
                  <div class="srs-dissect-title">
                    <span class="dissect-icon">💥</span>
                    <span>Production Business &amp; Dollar Impact</span>
                  </div>
                  <div class="srs-dissect-text">${card.revealedAnalysis.businessImpact}</div>
                </div>
              </div>

              <!-- CORRECT CODE -->
              <div class="srs-code-container correct">
                <div class="srs-code-header">
                  <span class="srs-code-label" style="color: #10b981;">✅ Bulletproof Corrected Production Query</span>
                  <button class="btn btn-secondary btn-xs" onclick="window.trapSRS.copyCode('${card.id}')">
                    📋 Copy SQL
                  </button>
                </div>
                <pre class="srs-code-block correct"><code>${this.escapeHtml(card.revealedAnalysis.correctCode)}</code></pre>
              </div>

              <!-- MEMORY MNEMONIC / RULE OF THUMB -->
              <div class="srs-mnemonic-box">
                <div class="srs-mnemonic-icon">💡</div>
                <div class="srs-mnemonic-body">
                  <div class="srs-mnemonic-title">Mental Anchor / Rule of Thumb for Memory:</div>
                  <div class="srs-mnemonic-quote">"${card.revealedAnalysis.memoryMnemonic}"</div>
                </div>
              </div>

              <!-- LEITNER RATING ACTIONS -->
              <div class="srs-rating-container">
                <div class="srs-rating-prompt">
                  How well did you recall this trap? Grade yourself to update Leitner spacing:
                </div>
                <div class="srs-rating-buttons">
                  <button class="srs-grade-btn again" onclick="window.trapSRS.gradeCard('${card.id}', 'again')">
                    <div class="grade-label">🔴 Again</div>
                    <div class="grade-sub">Box 1 &bull; Due in 5m</div>
                  </button>
                  <button class="srs-grade-btn hard" onclick="window.trapSRS.gradeCard('${card.id}', 'hard')">
                    <div class="grade-label">🟡 Hard</div>
                    <div class="grade-sub">Box 2 &bull; 1 day</div>
                  </button>
                  <button class="srs-grade-btn good" onclick="window.trapSRS.gradeCard('${card.id}', 'good')">
                    <div class="grade-label">🟢 Good</div>
                    <div class="grade-sub">Box 3 &bull; 3 days</div>
                  </button>
                  <button class="srs-grade-btn easy" onclick="window.trapSRS.gradeCard('${card.id}', 'easy')">
                    <div class="grade-label">🔵 Easy</div>
                    <div class="grade-sub">Box 4 &bull; 7 days</div>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      `;
    }

    renderEmptyStateHtml() {
      return `
        <div class="srs-empty-card">
          <div class="srs-empty-icon">🎉</div>
          <h2 class="srs-empty-title">All Caught Up! Zero Traps Due Today</h2>
          <p class="srs-empty-desc">
            You have reviewed all scheduled traps in this category. Your memory retention is solid!
          </p>
          <div class="srs-empty-actions">
            <button class="btn btn-primary" onclick="window.trapSRS.setMode('all')">
              📖 Browse &amp; Practice All 36 Traps
            </button>
            <button class="btn btn-secondary" onclick="window.trapSRS.setCategory('all')">
              🌐 View All Categories
            </button>
          </div>
        </div>
      `;
    }

    // =========================================================================
    // USER ACTIONS & CONTROLS
    // =========================================================================

    setCategory(catId) {
      this.currentCategory = catId;
      this.currentCardIndex = 0;
      this.isFlipped = false;
      this.renderView();
    }

    setMode(mode) {
      this.mode = mode;
      this.currentCardIndex = 0;
      this.isFlipped = false;
      this.renderView();
    }

    flipCard() {
      this.isFlipped = !this.isFlipped;
      this.renderView();
    }

    prevCard() {
      if (this.currentCardIndex > 0) {
        this.currentCardIndex--;
        this.isFlipped = false;
        this.renderView();
      }
    }

    nextCard() {
      const deck = this.getActiveDeck();
      if (this.currentCardIndex < deck.length - 1) {
        this.currentCardIndex++;
        this.isFlipped = false;
        this.renderView();
      }
    }

    jumpToCard(index) {
      this.currentCardIndex = index;
      this.isFlipped = false;
      this.renderView();
      const el = document.getElementById('srsActiveCard');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    gradeCard(cardId, rating) {
      this.recordReview(cardId, rating);
      const deck = this.getActiveDeck();
      // If there are still cards in the active deck, proceed to next
      if (this.currentCardIndex >= deck.length) {
        this.currentCardIndex = Math.max(0, deck.length - 1);
      }
      this.isFlipped = false;
      this.renderView();
    }

    copyCode(cardId) {
      const allCards = window.MASTER_TRAP_FLASHCARDS || [];
      const card = allCards.find(c => c.id === cardId);
      if (card && card.revealedAnalysis && card.revealedAnalysis.correctCode) {
        navigator.clipboard.writeText(card.revealedAnalysis.correctCode)
          .then(() => alert('✅ Corrected SQL copied to clipboard!'))
          .catch(() => {});
      }
    }

    escapeHtml(str) {
      if (!str) return '';
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  }

  // Instantiate and bind to window
  const engine = new TrapMemoryEngine();
  window.trapSRS = engine;

  // Global key listener for spacebar card flip
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && document.getElementById('viewTrapGym') && document.getElementById('viewTrapGym').classList.contains('active')) {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) return;
      e.preventDefault();
      window.trapSRS.flipCard();
    }
  });

  // Listen for auto-captured mistakes
  window.addEventListener('sql-trap-logged', (e) => {
    if (e.detail && e.detail.trapKey) {
      window.trapSRS.recordMistake(e.detail.trapKey, e.detail.context);
    }
  });

})(window);
