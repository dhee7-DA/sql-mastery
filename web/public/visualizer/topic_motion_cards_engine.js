/**
 * SQL MASTERY - TACTILE MOTION TOPIC CARDS ENGINE
 * ------------------------------------------------------------------------
 * 60fps GPU-accelerated motion cards with 3D gyroscopic perspective tilt,
 * dynamic cursor spotlights, live SVG micro-simulations, dual-faced 3D flip,
 * and FLIP layout transitions across curriculum domains.
 */

(function(window) {
  'use strict';

  const State = {
    activeDomain: 'all', // 'all' | 'storage' | 'relational' | 'analytic' | 'concurrency'
    flippedCards: new Set(),
    isAnimatingFlip: false
  };

  /**
   * Initialize Motion Cards in the target container
   */
  function init(targetContainerId = 'viewMotionDeck') {
    const container = document.getElementById(targetContainerId);
    if (!container) return;

    renderDeckSkeleton(container);
    setupCardInteractions(container);
  }

  /**
   * Render the complete Deck Layout
   */
  function renderDeckSkeleton(container) {
    const allTopics = window.TOPIC_MOTION_CARDS_DATA || [];
    const filteredTopics = State.activeDomain === 'all'
      ? allTopics
      : allTopics.filter(t => t.domain === State.activeDomain);

    container.innerHTML = `
      <div class="motion-deck-container">
        <!-- Top Ambient Glow -->
        <div class="motion-deck-ambient-glow"></div>

        <!-- Header Hero -->
        <header class="motion-deck-hero">
          <div class="motion-hero-title-group">
            <div class="motion-hero-badge">
              <span class="motion-pulse-gem"></span>
              <span class="motion-hero-tag">TOPIC MOTION DECK // 3D CARDS</span>
            </div>
            <h1 class="motion-hero-title">Interactive Motion Topic Cards</h1>
            <p class="motion-hero-sub">Explore physical storage mechanics, relational algebra, and concurrency physics through 3D tilt cards, live micro-simulations, and dual-face production traps.</p>
          </div>

          <!-- Domain Filter Tabs -->
          <div class="motion-domain-tabs-wrapper">
            <div class="motion-domain-tabs-bar" id="motionDomainTabsBar">
              <button class="motion-domain-tab ${State.activeDomain === 'all' ? 'active' : ''}" onclick="window.TOPIC_MOTION_CARDS_ENGINE.switchDomain('all', this)">
                All Domains (${allTopics.length})
              </button>
              <button class="motion-domain-tab ${State.activeDomain === 'storage' ? 'active' : ''}" onclick="window.TOPIC_MOTION_CARDS_ENGINE.switchDomain('storage', this)">
                Physical Storage &amp; B+Trees
              </button>
              <button class="motion-domain-tab ${State.activeDomain === 'relational' ? 'active' : ''}" onclick="window.TOPIC_MOTION_CARDS_ENGINE.switchDomain('relational', this)">
                Relational Joins &amp; Aggregates
              </button>
              <button class="motion-domain-tab ${State.activeDomain === 'analytic' ? 'active' : ''}" onclick="window.TOPIC_MOTION_CARDS_ENGINE.switchDomain('analytic', this)">
                Window Frames &amp; Graphs
              </button>
              <button class="motion-domain-tab ${State.activeDomain === 'concurrency' ? 'active' : ''}" onclick="window.TOPIC_MOTION_CARDS_ENGINE.switchDomain('concurrency', this)">
                Transactions, MVCC &amp; Locks
              </button>
            </div>
          </div>
        </header>

        <!-- Bento Grid of 3D Cards -->
        <div class="motion-bento-grid" id="motionBentoGrid">
          ${filteredTopics.map(topic => renderTopicCardHtml(topic)).join('')}
        </div>
      </div>
    `;
  }

  /**
   * Render individual dual-faced card HTML
   */
  function renderTopicCardHtml(t) {
    const isFlipped = State.flippedCards.has(t.id);

    return `
      <div class="motion-card-wrapper" id="card_${t.id}" data-topic-id="${t.id}">
        <div class="motion-card-inner ${isFlipped ? 'is-flipped' : ''}">
          <!-- Dynamic Cursor Spotlight Layer -->
          <div class="motion-card-spotlight"></div>

          <!-- FRONT FACE: Concept & Live Micro-Simulation -->
          <div class="motion-card-face motion-card-front">
            <!-- Top Metadata Header -->
            <div class="mcard-header">
              <div class="mcard-meta-left">
                <span class="mcard-num">${escapeHtml(t.number)}</span>
                <span class="mcard-domain-badge domain-${t.domain}">${escapeHtml(t.domainLabel)}</span>
              </div>
              <div class="mcard-meta-right">
                <span class="mcard-diff-tag diff-${t.difficultyBadge}">${escapeHtml(t.difficulty)}</span>
                <span class="mcard-time font-mono">${escapeHtml(t.estimatedTime)}</span>
              </div>
            </div>

            <!-- Live Animated Micro-Simulation Canvas -->
            <div class="mcard-micro-canvas">
              ${t.svgAnimation}
            </div>

            <!-- Title & Subtitle -->
            <div class="mcard-title-block">
              <h3 class="mcard-title">${escapeHtml(t.title)}</h3>
              <p class="mcard-sub">${escapeHtml(t.subtitle)}</p>
            </div>

            <!-- Concepts Checklist -->
            <ul class="mcard-concepts-list">
              ${t.concepts.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
            </ul>

            <!-- Front Action Footer -->
            <div class="mcard-footer">
              <button class="btn-mcard-flip" onclick="window.TOPIC_MOTION_CARDS_ENGINE.flipCard('${t.id}')">
                <span class="flip-sparkle">⚡</span>
                <span>Production Trap &amp; Gotcha</span>
              </button>
              <button class="btn-mcard-launch" onclick="window.TOPIC_MOTION_CARDS_ENGINE.launchInStudio('${t.id}')" title="Launch Interactive Lab in Studio">
                <span>Studio</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>

          <!-- BACK FACE: Production Trap, Gotcha & Fix -->
          <div class="motion-card-face motion-card-back">
            <div class="mcard-header-back">
              <div class="mcard-trap-badge">
                <span class="trap-warning-dot"></span>
                <span>PRODUCTION INCIDENT DOSSIER</span>
              </div>
              <button class="btn-flip-back" onclick="window.TOPIC_MOTION_CARDS_ENGINE.flipCard('${t.id}')" title="Flip back to concept">
                ↺ Concept
              </button>
            </div>

            <div class="mcard-trap-body">
              <h4 class="mcard-trap-title">${escapeHtml(t.productionTrap.title)}</h4>
              <p class="mcard-trap-desc">${escapeHtml(t.productionTrap.gotcha)}</p>

              <!-- Anti-Pattern vs Production Fix SQL Comparison -->
              <div class="mcard-code-diff">
                <div class="mcard-code-box box-danger">
                  <span class="code-box-label label-danger">🔴 High-Latency Anti-Pattern</span>
                  <pre class="mcard-code-pre"><code>${escapeHtml(t.productionTrap.faultySql)}</code></pre>
                </div>
                <div class="mcard-code-box box-success">
                  <span class="code-box-label label-success">🟢 Production Optimized Pattern</span>
                  <pre class="mcard-code-pre"><code>${escapeHtml(t.productionTrap.fixedSql)}</code></pre>
                </div>
              </div>

              <div class="mcard-speedup-banner">
                <span class="speedup-icon">⚡</span>
                <span class="speedup-val font-mono">${escapeHtml(t.productionTrap.speedup)}</span>
              </div>
            </div>

            <!-- Back Action Footer -->
            <div class="mcard-footer-back">
              <button class="btn-back-action btn-copy-sql" onclick="window.TOPIC_MOTION_CARDS_ENGINE.copySql('${encodeURIComponent(t.productionTrap.fixedSql)}', this)">
                📋 Copy Pattern
              </button>
              <button class="btn-back-action btn-profiler-link" onclick="window.TOPIC_MOTION_CARDS_ENGINE.launchInProfiler('${t.id}')">
                🌳 Profile in Tree
              </button>
              <button class="btn-back-action btn-studio-link" onclick="window.TOPIC_MOTION_CARDS_ENGINE.launchInStudio('${t.id}')">
                ⚡ Launch Studio
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Bind 3D perspective tilt and mouse tracking listeners
   */
  function setupCardInteractions(container) {
    const cardWrappers = container.querySelectorAll('.motion-card-wrapper');

    cardWrappers.forEach(card => {
      const inner = card.querySelector('.motion-card-inner');
      const spotlight = card.querySelector('.motion-card-spotlight');

      let isHovered = false;

      card.addEventListener('mouseenter', () => {
        isHovered = true;
        card.classList.add('is-hovering');
      });

      card.addEventListener('mousemove', (e) => {
        if (!isHovered) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Normalized offsets from center (-0.5 to +0.5)
        const normX = (x / rect.width) - 0.5;
        const normY = (y / rect.height) - 0.5;

        // Spot position
        const pctX = ((x / rect.width) * 100).toFixed(1);
        const pctY = ((y / rect.height) * 100).toFixed(1);

        card.style.setProperty('--mouse-x', `${pctX}%`);
        card.style.setProperty('--mouse-y', `${pctY}%`);

        // Check if flipped - invert X rotation if flipped
        const isFlipped = card.querySelector('.motion-card-inner.is-flipped');
        const rotY = (normX * 10).toFixed(2);
        const rotX = (-normY * 10).toFixed(2);
        const flipBaseY = isFlipped ? 180 : 0;

        inner.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${parseFloat(rotY) + flipBaseY}deg) scale3d(1.018, 1.018, 1.018)`;
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        card.classList.remove('is-hovering');
        const isFlipped = card.querySelector('.motion-card-inner.is-flipped');
        const flipBaseY = isFlipped ? 180 : 0;
        inner.style.transform = `perspective(1000px) rotateX(0deg) rotateY(${flipBaseY}deg) scale3d(1, 1, 1)`;
      });
    });
  }

  /**
   * 3D Card Flip Handler
   */
  function flipCard(topicId) {
    const cardWrapper = document.getElementById(`card_${topicId}`);
    if (!cardWrapper) return;
    const inner = cardWrapper.querySelector('.motion-card-inner');
    if (!inner) return;

    if (window.soundFX && window.soundFX.playPop) {
      window.soundFX.playPop();
    }

    if (State.flippedCards.has(topicId)) {
      State.flippedCards.delete(topicId);
      inner.classList.remove('is-flipped');
      inner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    } else {
      State.flippedCards.add(topicId);
      inner.classList.add('is-flipped');
      inner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(180deg) scale3d(1, 1, 1)';
    }
  }

  /**
   * FLIP Layout Domain Filter Transition
   */
  function switchDomain(domain, btn) {
    if (State.activeDomain === domain) return;
    State.activeDomain = domain;

    if (window.soundFX && window.soundFX.playClick) {
      window.soundFX.playClick();
    }

    // Update active tab buttons
    const tabs = document.querySelectorAll('.motion-domain-tab');
    tabs.forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const grid = document.getElementById('motionBentoGrid');
    if (!grid) return;

    // FLIP Animation: 1. FIRST
    const allWrappers = Array.from(grid.querySelectorAll('.motion-card-wrapper'));
    const firstPositions = new Map();
    allWrappers.forEach(w => {
      firstPositions.set(w.id, w.getBoundingClientRect());
    });

    // Re-render grid
    const allTopics = window.TOPIC_MOTION_CARDS_DATA || [];
    const filteredTopics = State.activeDomain === 'all'
      ? allTopics
      : allTopics.filter(t => t.domain === State.activeDomain);

    grid.innerHTML = filteredTopics.map(topic => renderTopicCardHtml(topic)).join('');
    setupCardInteractions(document.getElementById('viewMotionDeck'));

    // FLIP Animation: 2. LAST & INVERT & PLAY
    const newWrappers = Array.from(grid.querySelectorAll('.motion-card-wrapper'));
    newWrappers.forEach(w => {
      const first = firstPositions.get(w.id);
      if (first) {
        const last = w.getBoundingClientRect();
        const dx = first.left - last.left;
        const dy = first.top - last.top;

        if (dx !== 0 || dy !== 0) {
          w.style.transform = `translate(${dx}px, ${dy}px)`;
          w.style.transition = 'none';

          requestAnimationFrame(() => {
            w.style.transition = 'transform 320ms cubic-bezier(0.16, 1, 0.3, 1)';
            w.style.transform = 'translate(0, 0)';
          });
        }
      } else {
        // Newly appearing element: soft fade and rise
        w.style.opacity = '0';
        w.style.transform = 'translateY(12px)';
        requestAnimationFrame(() => {
          w.style.transition = 'opacity 250ms ease, transform 280ms cubic-bezier(0.16, 1, 0.3, 1)';
          w.style.opacity = '1';
          w.style.transform = 'translateY(0)';
        });
      }
    });
  }

  /**
   * Launch directly into Studio Workbench
   */
  function launchInStudio(topicId) {
    const topic = (window.TOPIC_MOTION_CARDS_DATA || []).find(t => t.id === topicId);
    if (!topic) return;

    if (window.soundFX && window.soundFX.playWhoosh) {
      window.soundFX.playWhoosh();
    }

    if (typeof window.selectNavView === 'function') {
      window.selectNavView('viewStudio', 'Section Studio', null);
    } else if (typeof window.switchMainView === 'function') {
      window.switchMainView('viewStudio');
    }

    // Set SQL into editor
    const sqlInput = document.getElementById('sqlInput');
    if (sqlInput) {
      sqlInput.value = topic.productionTrap.fixedSql;
      if (typeof window.runQueryManual === 'function') {
        setTimeout(window.runQueryManual, 120);
      }
    }
  }

  /**
   * Launch directly into Visual Query Profiler
   */
  function launchInProfiler(topicId) {
    const topic = (window.TOPIC_MOTION_CARDS_DATA || []).find(t => t.id === topicId);
    if (!topic) return;

    if (window.soundFX && window.soundFX.playWhoosh) {
      window.soundFX.playWhoosh();
    }

    if (typeof window.selectNavView === 'function') {
      window.selectNavView('viewQueryProfiler', 'Visual Query Profiler', 'navGroupExplore');
    } else if (typeof window.switchMainView === 'function') {
      window.switchMainView('viewQueryProfiler');
    }

    if (window.QUERY_PROFILER_ENGINE) {
      if (topic.profilerPresetId) {
        window.QUERY_PROFILER_ENGINE.selectPreset(topic.profilerPresetId);
      } else {
        window.QUERY_PROFILER_ENGINE.openWithSql(topic.productionTrap.fixedSql);
      }
    }
  }

  /**
   * Copy Production SQL Pattern
   */
  function copySql(encodedSql, btn) {
    const sql = decodeURIComponent(encodedSql);
    navigator.clipboard.writeText(sql).then(() => {
      if (window.soundFX && window.soundFX.playPop) window.soundFX.playPop();
      if (btn) {
        btn.textContent = '✓ Copied SQL!';
        setTimeout(() => { btn.textContent = '📋 Copy Pattern'; }, 1800);
      }
    });
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

  // Public API
  window.TOPIC_MOTION_CARDS_ENGINE = {
    init,
    switchDomain,
    flipCard,
    launchInStudio,
    launchInProfiler,
    copySql,
    getState: () => State
  };

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init('viewMotionDeck'));
  } else {
    setTimeout(() => init('viewMotionDeck'), 100);
  }

})(window);
