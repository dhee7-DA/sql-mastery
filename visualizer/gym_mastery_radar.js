/**
 * SQL MASTERY VISUALIZER - TOPIC MASTERY METERS & WEAKNESS RADAR (ENHANCEMENT #5)
 * ------------------------------------------------------------------------------
 * Spaced repetition tracking and pedagogical weakness heatmaps for the 1,700 drills.
 * Features:
 *   - 17 Pillar Mastery Meters (% solved, status tiers: Novice, Practicing, Proficient, Mastered)
 *   - Syntax Fluidity Index calculated across all 17 topics
 *   - Weakness Radar tracking high-risk syntax traps and mistake frequencies
 *   - 1-Click "Drill My Weaknesses" auto-filtering
 *   - Browser localStorage persistence
 */

(function(window) {
  'use strict';

  const STORAGE_KEY = 'SQL_GYM_WEAKNESS_PROFILE';

  const PILLARS_META = [
    { key: 'select', name: 'Topic 1: SELECT & Projections', start: 1, end: 100, color: '#38bdf8' },
    { key: 'where', name: 'Topic 2: WHERE & Predicates', start: 101, end: 200, color: '#fbbf24' },
    { key: 'order', name: 'Topic 3: ORDER BY & LIMIT Slicing', start: 201, end: 300, color: '#c084fc' },
    { key: 'aggregate', name: 'Topic 4: Aggregations & GROUP BY', start: 301, end: 400, color: '#f472b6' },
    { key: 'casewhen', name: 'Topic 5: CASE WHEN & Conditionals', start: 401, end: 500, color: '#34d399' },
    { key: 'string', name: 'Topic 6: String Manipulation', start: 501, end: 600, color: '#22d3ee' },
    { key: 'join_core', name: 'Topic 7: Relational Joins Core', start: 601, end: 700, color: '#818cf8' },
    { key: 'join_adv', name: 'Topic 8: Advanced Joins & Structures', start: 701, end: 800, color: '#fb7185' },
    { key: 'join_agg', name: 'Topic 9: Multi-Table Chains & Aggs', start: 801, end: 900, color: '#f59e0b' },
    { key: 'date_time', name: 'Topic 10: Date, Time & Temporal', start: 901, end: 1000, color: '#a78bfa' },
    { key: 'subqueries', name: 'Topic 11: Subqueries & Derived', start: 1001, end: 1100, color: '#2dd4bf' },
    { key: 'ctes', name: 'Topic 12: Modular CTEs & Pipelines', start: 1101, end: 1200, color: '#fb923c' },
    { key: 'window_ranking', name: 'Topic 13: Window Ranking & Percentiles', start: 1201, end: 1300, color: '#38bdf8' },
    { key: 'window_offsets', name: 'Topic 14: Value Offsets & Deltas', start: 1301, end: 1400, color: '#34d399' },
    { key: 'window_running', name: 'Topic 15: Running Balances & Frames', start: 1401, end: 1500, color: '#a78bfa' },
    { key: 'set_ops', name: 'Topic 16: Set Operations & Combined', start: 1501, end: 1600, color: '#fb7185' },
    { key: 'ddl_dml', name: 'Topic 17: DDL & DML Mutations', start: 1601, end: 1700, color: '#facc15' }
  ];

  function getStoredProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : { traps: {}, attempts: 0, mistakes: 0 };
    } catch (e) {
      return { traps: {}, attempts: 0, mistakes: 0 };
    }
  }

  function saveStoredProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {}
  }

  function recordMistake(caseId, chosenKw, correctKw, drillTitle, trapAlert) {
    const profile = getStoredProfile();
    profile.attempts = (profile.attempts || 0) + 1;
    profile.mistakes = (profile.mistakes || 0) + 1;

    const trapKey = `${chosenKw || 'WRONG'} ➔ ${correctKw}`;
    if (!profile.traps[trapKey]) {
      profile.traps[trapKey] = {
        key: trapKey,
        chosen: chosenKw,
        correct: correctKw,
        count: 0,
        lastCaseId: caseId,
        lastTitle: drillTitle,
        trapAlert: trapAlert || 'Verify execution phase ordering.'
      };
    }
    profile.traps[trapKey].count += 1;
    profile.traps[trapKey].lastOccurred = Date.now();
    saveStoredProfile(profile);
  }

  function recordSuccess(caseId) {
    const profile = getStoredProfile();
    profile.attempts = (profile.attempts || 0) + 1;
    saveStoredProfile(profile);
  }

  function getPillarStats() {
    if (!window.CASE_BLANKS_ENGINE) return [];

    return PILLARS_META.map(p => {
      let solvedCount = 0;
      const total = p.end - p.start + 1;
      for (let i = p.start; i <= p.end; i++) {
        if (window.CASE_BLANKS_ENGINE.isSolved(`gym_${i}`)) {
          solvedCount++;
        }
      }
      const pct = Math.round((solvedCount / total) * 100);
      let tier = 'Novice';
      let tierColor = '#94a3b8';
      if (pct >= 90) { tier = 'Mastered'; tierColor = '#22c55e'; }
      else if (pct >= 60) { tier = 'Proficient'; tierColor = '#38bdf8'; }
      else if (pct >= 25) { tier = 'Practicing'; tierColor = '#facc15'; }
      else if (pct > 0) { tier = 'Started'; tierColor = '#fb923c'; }

      return {
        ...p,
        solved: solvedCount,
        total: total,
        pct: pct,
        tier: tier,
        tierColor: tierColor
      };
    });
  }

  function calculateFluidityIndex(stats) {
    if (!stats || stats.length === 0) return 0;
    const totalSolved = stats.reduce((acc, s) => acc + s.solved, 0);
    const totalPossible = stats.reduce((acc, s) => acc + s.total, 0);
    return Math.round((totalSolved / totalPossible) * 100);
  }

  function toggleMasteryRadar() {
    const dash = document.getElementById('gymRadarDashboard');
    const btn = document.getElementById('btnToggleMasteryRadar');
    if (!dash) return;

    if (dash.style.display === 'none' || !dash.style.display) {
      renderMasteryRadar();
      dash.style.display = 'block';
      if (btn) btn.classList.add('active');
      if (window.soundFX) window.soundFX.playPop();
    } else {
      dash.style.display = 'none';
      if (btn) btn.classList.remove('active');
      if (window.soundFX) window.soundFX.playClick();
    }
  }

  function drillWeaknesses() {
    const profile = getStoredProfile();
    const trapList = Object.values(profile.traps || {}).sort((a, b) => b.count - a.count);

    if (trapList.length === 0) {
      alert("No mistakes logged yet! Play some drills or Blitz sprints to generate your weakness radar.");
      return;
    }

    const worstTrap = trapList[0];
    const searchTerm = worstTrap.correct || worstTrap.chosen || 'WHERE';

    if (window.soundFX) window.soundFX.playWhoosh();

    // Set search in gym to target the worst trap
    const searchInput = document.getElementById('gymSearchInput');
    if (searchInput) {
      searchInput.value = searchTerm;
    }
    window.currentGymSearch = searchTerm;
    window.currentGymPillar = 'all';

    // Hide radar and render filtered drills
    const dash = document.getElementById('gymRadarDashboard');
    if (dash) dash.style.display = 'none';

    const btn = document.getElementById('btnToggleMasteryRadar');
    if (btn) btn.classList.remove('active');

    if (typeof window.renderSyntaxGym === 'function') {
      window.renderSyntaxGym();
    }
  }

  function filterGymToPillar(pillarKey) {
    if (window.soundFX) window.soundFX.playPop();
    window.currentGymPillar = pillarKey;

    // Update pillar filter buttons in UI
    document.querySelectorAll('#gymPillarFilters .case-section-btn').forEach(b => {
      if (b.dataset.pillar === pillarKey) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    if (typeof window.renderSyntaxGym === 'function') {
      window.renderSyntaxGym();
    }

    // Smooth scroll down to grid
    const grid = document.getElementById('syntaxGymGrid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth' });
  }

  function renderMasteryRadar() {
    const dash = document.getElementById('gymRadarDashboard');
    if (!dash) return;

    const stats = getPillarStats();
    const fluidity = calculateFluidityIndex(stats);
    const totalSolved = stats.reduce((acc, s) => acc + s.solved, 0);
    const profile = getStoredProfile();
    const trapList = Object.values(profile.traps || {}).sort((a, b) => b.count - a.count).slice(0, 3);

    let fluidityTier = 'Novice (Beginner Foundations)';
    let fluidityBadgeColor = '#94a3b8';
    if (fluidity >= 90) { fluidityTier = 'Grandmaster (Senior SQL Architect)'; fluidityBadgeColor = '#22c55e'; }
    else if (fluidity >= 60) { fluidityTier = 'Proficient (Production Ready)'; fluidityBadgeColor = '#38bdf8'; }
    else if (fluidity >= 25) { fluidityTier = 'Apprentice (Intermediate)'; fluidityBadgeColor = '#facc15'; }

    const topWeakness = trapList.length > 0 ? trapList[0] : null;

    dash.innerHTML = `
      <div class="radar-container">
        <!-- Radar Top Header -->
        <div class="radar-header">
          <div class="radar-header-left">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span style="font-size: 20px;">📊</span>
              <h3 class="radar-title">Topic Mastery Meters &amp; Weakness Radar</h3>
              <span class="status-pill" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1.5px solid #38bdf8;">17 Pillars</span>
            </div>
            <div class="radar-subtitle">
              Live relational mastery tracking, mistake frequency radar, and spaced repetition.
            </div>
          </div>
          <div class="radar-header-right">
            <div class="fluidity-score-box">
              <div class="fluidity-score-val" style="color: ${fluidityBadgeColor};">${fluidity}%</div>
              <div class="fluidity-score-label">Fluidity Index</div>
            </div>
            <button class="card-nav-btn" style="padding: 6px 12px; font-size: 11px;" onclick="window.GYM_MASTERY_RADAR.toggleMasteryRadar()">✕ Close</button>
          </div>
        </div>

        <!-- Radar Quick Stats Strip -->
        <div class="radar-stats-strip">
          <div class="radar-stat-chip">
            <span class="stat-chip-label">Total Drills Solved:</span>
            <span class="stat-chip-val" style="color: #4ade80;">${totalSolved} / 1,700 (${((totalSolved/1700)*100).toFixed(1)}%)</span>
          </div>
          <div class="radar-stat-chip">
            <span class="stat-chip-label">Current Tier:</span>
            <span class="stat-chip-val" style="color: ${fluidityBadgeColor};">${fluidityTier}</span>
          </div>
          <div class="radar-stat-chip">
            <span class="stat-chip-label">Top Focus Trap:</span>
            <span class="stat-chip-val" style="color: #f87171;">${topWeakness ? topWeakness.key : 'None Logged Yet'}</span>
          </div>
          ${topWeakness ? `
            <button class="btn-drill-weakness" onclick="window.GYM_MASTERY_RADAR.drillWeaknesses()">
              🎯 Drill My Weaknesses
            </button>
          ` : ''}
        </div>

        <!-- Weakness Traps Radar Section (if any mistakes logged) -->
        ${trapList.length > 0 ? `
          <div class="radar-traps-card">
            <div class="radar-traps-header">
              <span style="font-size: 14px;">⚠️</span>
              <strong>Active Syntax Traps Radar (High-Frequency Misconceptions):</strong>
            </div>
            <div class="radar-traps-grid">
              ${trapList.map(t => `
                <div class="trap-radar-item">
                  <div class="trap-radar-item-top">
                    <span class="trap-badge">${escapeHtml(t.key)}</span>
                    <span class="trap-count-pill">${t.count} mistake${t.count > 1 ? 's' : ''}</span>
                  </div>
                  <div class="trap-pedagogy-tip">${escapeHtml(t.trapAlert)}</div>
                  <div class="trap-drill-ref">Triggered in: ${escapeHtml(t.lastTitle || 'Foundations')}</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- 17 Pillars Grid Meters -->
        <div class="radar-pillars-grid">
          ${stats.map(p => `
            <div class="pillar-meter-card" onclick="window.GYM_MASTERY_RADAR.filterGymToPillar('${p.key}')" title="Click to filter gym to ${escapeHtml(p.name)}">
              <div class="pillar-meter-header">
                <span class="pillar-meter-name" style="color: ${p.color};">${escapeHtml(p.name)}</span>
                <span class="pillar-tier-pill" style="color: ${p.tierColor}; border-color: ${p.tierColor}44;">${p.tier}</span>
              </div>
              <div class="pillar-meter-bar-track">
                <div class="pillar-meter-bar-fill" style="width: ${p.pct}%; background: ${p.color};"></div>
              </div>
              <div class="pillar-meter-footer">
                <span>${p.solved} / ${p.total} Solved</span>
                <strong>${p.pct}%</strong>
              </div>
            </div>
          `).join('')}
        </div>
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

  window.GYM_MASTERY_RADAR = {
    recordMistake: recordMistake,
    recordSuccess: recordSuccess,
    getPillarStats: getPillarStats,
    calculateFluidityIndex: calculateFluidityIndex,
    toggleMasteryRadar: toggleMasteryRadar,
    renderMasteryRadar: renderMasteryRadar,
    drillWeaknesses: drillWeaknesses,
    filterGymToPillar: filterGymToPillar
  };

  window.toggleMasteryRadar = toggleMasteryRadar;

})(window);
