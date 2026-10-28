/**
 * ============================================================================
 * 📅 DAILY PRACTICE ACTIVITY HEATMAP & STREAK ENGINE
 * ============================================================================
 * An interactive, persistent, GitHub/LeetCode-style deliberate practice heatmap
 * featuring:
 *   - True 16-Week (112-Day) Chronological Calendar Matrix
 *   - Month Header Axis (Aligned to week columns) & Weekday Labels (Mon, Wed, Fri)
 *   - Framer Motion-Style Spring Physics & Bouncy Cell Hover Squish
 *   - Reactive Animated Emoticons (🔥 Pulsing Flame, 🌱 🌿 ⚡ 🚀 Level Indicators)
 *   - Floating Glassmorphism Day Activity Dossier Popover
 *   - Persistent LocalStorage State & Real-Time Practice Logging
 *   - Interactive Quick Simulation / Log Controls (+1 Drill, Seed, Reset)
 * ============================================================================
 */

(function (window) {
  'use strict';

  const STORAGE_KEY = 'sql_mastery_activity_log_v2';
  const WEEKS_TO_SHOW = 16; // 16 weeks = 112 days
  const DAYS_TOTAL = WEEKS_TO_SHOW * 7;

  // Level thresholds (drills + queries + MCQs solved)
  const THRESHOLDS = {
    lvl1: 1,   // 🌱 1 - 3 problems
    lvl2: 4,   // 🌿 4 - 7 problems
    lvl3: 8,   // ⚡ 8 - 12 problems
    lvl4: 13   // 🚀 13+ problems
  };

  const TOPIC_PRESETS = [
    'Basic SELECT & WHERE Predicates',
    'String Slicing (LEFT, RIGHT, SUBSTRING)',
    'Statistical Aggregates & GROUP BY',
    'Relational JOINs & Anti-Joins',
    'Subqueries & Derived Tables',
    'Modular CTEs & Multi-Step Pipelines',
    'Window Ranking (ROW_NUMBER, DENSE_RANK)',
    'Sliding Frames & Running Totals',
    'Value Offsets (LAG & LEAD Deltas)',
    'Set Operations & Sargability'
  ];

  // Helper: Format Date as YYYY-MM-DD
  function toDateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // --- STATE & PERSISTENCE ---
  const state = {
    activityMap: {}, // key: 'YYYY-MM-DD' -> { count, xp, mcqs, drills, cases, studio, topics: [] }
    currentStreak: 1,
    longestStreak: 14,
    totalXP: 0,
    totalProblems: 0,
    activeDossierDate: null,
    isInitialized: false
  };

  // Pre-seed realistic activity for Days 1 through 12
  function generateDefaultHistory() {
    const map = {};
    const today = new Date();

    // Generate activity over the past 45 days matching the intensive's progress
    for (let i = 0; i < 45; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = toDateKey(d);

      // Give recent days high activity, older days realistic clusters
      let count = 0;
      if (i === 0) {
        count = 6; // Today
      } else if (i <= 7) {
        // Last 7 days: active daily practice
        count = [12, 16, 9, 14, 8, 15, 11][i - 1];
      } else if (i % 7 === 1 || i % 7 === 2 || i % 7 === 4 || i % 7 === 5) {
        count = (i % 3 === 0) ? 10 : (i % 2 === 0) ? 6 : 3;
      }

      if (count > 0) {
        const mcqs = Math.floor(count * 0.4);
        const drills = Math.floor(count * 0.4);
        const cases = count - mcqs - drills;
        const xp = mcqs * 15 + drills * 20 + cases * 30;
        const topic = TOPIC_PRESETS[i % TOPIC_PRESETS.length];

        map[key] = {
          count,
          xp,
          mcqs,
          drills,
          cases,
          studio: Math.max(1, Math.floor(count * 0.3)),
          topics: [topic]
        };
      }
    }

    return map;
  }

  function loadActivityStore() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        state.activityMap = JSON.parse(raw);
      } else {
        state.activityMap = generateDefaultHistory();
        saveActivityStore();
      }
    } catch (e) {
      console.warn('[ActivityHeatmap] Falling back to default state:', e);
      state.activityMap = generateDefaultHistory();
    }
    recalculateMetrics();
  }

  function saveActivityStore() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.activityMap));
    } catch (e) {
      console.warn('[ActivityHeatmap] Failed to persist:', e);
    }
  }

  function recalculateMetrics() {
    let xp = 0;
    let problems = 0;
    Object.values(state.activityMap).forEach(day => {
      xp += (day.xp || 0);
      problems += (day.count || 0);
    });
    state.totalXP = xp;
    state.totalProblems = problems;

    // Calculate current streak
    const today = new Date();
    let streak = 0;
    let checkDate = new Date(today);

    // If today has no activity yet, check starting from yesterday for streak retention
    const todayKey = toDateKey(today);
    if (!state.activityMap[todayKey] || state.activityMap[todayKey].count === 0) {
      checkDate.setDate(checkDate.getDate() - 1);
    }

    while (true) {
      const key = toDateKey(checkDate);
      if (state.activityMap[key] && state.activityMap[key].count > 0) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    state.currentStreak = Math.max(1, streak);
    state.longestStreak = Math.max(state.longestStreak, state.currentStreak);
  }

  // --- ENGINE API OBJECT ---
  const ActivityHeatmapEngine = {
    getState: function () {
      if (!state.isInitialized) loadActivityStore();
      return state;
    },

    init: function () {
      loadActivityStore();
      state.isInitialized = true;
      this.render();
      this.bindWindowEvents();
    },

    // Log practice action in real-time
    logActivity: function (type, amount, xpGain, topicName) {
      if (!state.isInitialized) loadActivityStore();

      const todayKey = toDateKey(new Date());
      if (!state.activityMap[todayKey]) {
        state.activityMap[todayKey] = {
          count: 0,
          xp: 0,
          mcqs: 0,
          drills: 0,
          cases: 0,
          studio: 0,
          topics: []
        };
      }

      const day = state.activityMap[todayKey];
      const count = amount || 1;
      const xp = xpGain || (type === 'mcq' ? 15 : type === 'drill' ? 20 : 25);

      day.count += count;
      day.xp += xp;

      if (type === 'mcq') day.mcqs = (day.mcqs || 0) + count;
      else if (type === 'drill') day.drills = (day.drills || 0) + count;
      else if (type === 'case') day.cases = (day.cases || 0) + count;
      else if (type === 'studio') day.studio = (day.studio || 0) + count;

      if (topicName && !day.topics.includes(topicName)) {
        day.topics.push(topicName);
      }

      saveActivityStore();
      recalculateMetrics();
      this.render();

      // Trigger celebratory spring pulse on today's cell
      const todayCell = document.querySelector(`.heatmap-cell[data-date="${todayKey}"]`);
      if (todayCell) {
        todayCell.classList.remove('wf-cell-pulse');
        void todayCell.offsetWidth; // Trigger reflow
        todayCell.classList.add('wf-cell-pulse');
      }

      if (window.AudioFX) window.AudioFX.playSuccess();
    },

    // Quick Test / Simulation Buttons
    simulatePractice: function () {
      const randomTopic = TOPIC_PRESETS[Math.floor(Math.random() * TOPIC_PRESETS.length)];
      this.logActivity('drill', 1, 20, randomTopic);
      if (window.SQL_BUDDY) {
        window.SQL_BUDDY.say(`⚡ Great job! +1 Practice Drill logged on ${randomTopic}! (+20 XP)`, 3500, 'celebrate');
      }
    },

    seedHistory: function () {
      state.activityMap = generateDefaultHistory();
      saveActivityStore();
      recalculateMetrics();
      this.render();
      if (window.AudioFX) window.AudioFX.playSuccess();
      if (window.SQL_BUDDY) {
        window.SQL_BUDDY.say('🌱 45-day deliberate practice history seeded across Days 1 through 12!', 4000, 'happy');
      }
    },

    resetHistory: function () {
      state.activityMap = {};
      const todayKey = toDateKey(new Date());
      state.activityMap[todayKey] = { count: 1, xp: 20, mcqs: 0, drills: 1, cases: 0, studio: 0, topics: ['Basic SELECT'] };
      saveActivityStore();
      recalculateMetrics();
      this.render();
      if (window.AudioFX) window.AudioFX.playClick();
    },

    // --- HTML RENDER PIPELINE ---
    render: function () {
      const container = document.getElementById('curriculumActivityHeatmap');
      if (!container) return;

      const gridData = this.buildCalendarMatrix();

      // Render calendar grid with header months and weekday markers
      container.innerHTML = `
        <div class="activity-heatmap-wrapper">
          <!-- TOP METRICS & STREAK BANNER -->
          ${this.renderStreakHUD()}

          <!-- MAIN CALENDAR CANVAS -->
          <div class="calendar-canvas-container">
            <!-- Left Weekday Axis -->
            <div class="calendar-weekday-axis">
              <span class="weekday-label">Mon</span>
              <span class="weekday-label">Wed</span>
              <span class="weekday-label">Fri</span>
            </div>

            <!-- Month Headers + Grid Columns -->
            <div class="calendar-matrix-column-wrap">
              <!-- Month Header Track -->
              <div class="calendar-month-track">
                ${gridData.months.map(m => `
                  <span class="month-label" style="grid-column: ${m.startCol} / span ${m.span};">
                    ${m.name}
                  </span>
                `).join('')}
              </div>

              <!-- 16-Week Grid Columns -->
              <div class="calendar-grid-cells">
                ${gridData.weeks.map((week, wIdx) => `
                  <div class="calendar-week-col" data-week="${wIdx}">
                    ${week.map(day => {
                      if (!day) return '<div class="heatmap-cell empty"></div>';
                      return `
                        <div class="heatmap-cell lvl-${day.level} ${day.isToday ? 'is-today' : ''}"
                             data-date="${day.dateStr}"
                             onclick="ActivityHeatmapEngine.handleCellClick('${day.dateStr}', event)"
                             onmouseenter="ActivityHeatmapEngine.handleCellHover('${day.dateStr}', event)"
                             onmouseleave="ActivityHeatmapEngine.handleCellLeave()">
                          ${day.level === 4 ? '<span class="cell-fire-spark">✨</span>' : ''}
                        </div>
                      `;
                    }).join('')}
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- BOTTOM LEGEND & INTERACTIVE CONTROLS -->
          <div class="heatmap-footer-controls">
            <div class="heatmap-legend-group">
              <span class="legend-caption">Less</span>
              <div class="legend-scale-boxes">
                <span class="legend-box lvl-0" title="0 queries"></span>
                <span class="legend-box lvl-1" title="1-3 queries (🌱 Seedling)"></span>
                <span class="legend-box lvl-2" title="4-7 queries (🌿 Growing)"></span>
                <span class="legend-box lvl-3" title="8-12 queries (⚡ High Intensity)"></span>
                <span class="legend-box lvl-4" title="13+ queries (🚀 Supernova)"></span>
              </div>
              <span class="legend-caption">More</span>
            </div>

            <div class="heatmap-action-buttons">
              <button class="heatmap-btn-log" onclick="ActivityHeatmapEngine.simulatePractice()" title="Log a practice drill right now">
                <span class="btn-emoji">⚡</span>
                <span>+1 Practice Drill</span>
              </button>
              <button class="heatmap-btn-subtle" onclick="ActivityHeatmapEngine.seedHistory()" title="Reload 45-day intensive history">
                <span>Seed History</span>
              </button>
              <button class="heatmap-btn-subtle" onclick="ActivityHeatmapEngine.resetHistory()" title="Reset practice data">
                <span>Reset</span>
              </button>
            </div>
          </div>

          <!-- FLOATING DAY ACTIVITY DOSSIER (POPOVER) -->
          <div id="heatmapDayDossier" class="heatmap-dossier-popover"></div>
        </div>
      `;

      // Update external streak badge in header if it exists
      const streakBadge = document.getElementById('heatmapStreakBadge');
      if (streakBadge) {
        streakBadge.innerHTML = `
          <span class="flame-icon-bounce">🔥</span>
          <strong>${state.currentStreak} Day Streak</strong> &bull; ${state.totalXP.toLocaleString()} XP
        `;
      }
    },

    // Build the 16-week matrix aligned to days of the week (Monday = row 0, Sunday = row 6)
    buildCalendarMatrix: function () {
      const today = new Date();
      // Find Sunday of the current week (end of week)
      const currentDayOfWeek = (today.getDay() + 6) % 7; // 0 = Mon, 6 = Sun
      const daysToSunday = 6 - currentDayOfWeek;

      const endDate = new Date(today);
      endDate.setDate(endDate.getDate() + daysToSunday);

      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - (DAYS_TOTAL - 1));

      const weeks = [];
      const months = [];
      let currentMonth = null;
      let monthStartCol = 1;

      const cursor = new Date(startDate);

      for (let w = 0; w < WEEKS_TO_SHOW; w++) {
        const week = [];
        for (let d = 0; d < 7; d++) {
          const dateStr = toDateKey(cursor);
          const isToday = dateStr === toDateKey(today);
          const isFuture = cursor > today;

          let dayData = null;
          if (!isFuture) {
            const entry = state.activityMap[dateStr] || { count: 0, xp: 0 };
            const count = entry.count || 0;

            let level = 0;
            if (count >= THRESHOLDS.lvl4) level = 4;
            else if (count >= THRESHOLDS.lvl3) level = 3;
            else if (count >= THRESHOLDS.lvl2) level = 2;
            else if (count >= THRESHOLDS.lvl1) level = 1;

            dayData = {
              dateStr,
              date: new Date(cursor),
              count,
              xp: entry.xp || 0,
              level,
              isToday,
              entry
            };
          }

          week.push(dayData);

          // Track Month labels for columns
          if (d === 0) { // Check month on first day of week
            const mName = cursor.toLocaleString('default', { month: 'short' });
            if (mName !== currentMonth) {
              if (currentMonth !== null) {
                months.push({
                  name: currentMonth,
                  startCol: monthStartCol,
                  span: w + 1 - monthStartCol
                });
              }
              currentMonth = mName;
              monthStartCol = w + 1;
            }
          }

          cursor.setDate(cursor.getDate() + 1);
        }
        weeks.push(week);
      }

      // Add final month
      if (currentMonth !== null) {
        months.push({
          name: currentMonth,
          startCol: monthStartCol,
          span: WEEKS_TO_SHOW + 1 - monthStartCol
        });
      }

      return { weeks, months };
    },

    renderStreakHUD: function () {
      const activeDaysCount = Object.keys(state.activityMap).filter(k => (state.activityMap[k].count || 0) > 0).length;
      const consistencyPct = Math.round((activeDaysCount / 45) * 100);

      return `
        <div class="heatmap-hud-banner">
          <div class="hud-streak-main">
            <span class="hud-flame-hero">🔥</span>
            <div class="hud-streak-text">
              <div class="hud-streak-count-row">
                <span class="hud-streak-num">${state.currentStreak}</span>
                <span class="hud-streak-unit">DAY STREAK</span>
                <span class="hud-active-pill">ACTIVE</span>
              </div>
              <span class="hud-streak-sub">You're in the top 5% of consistent SQL practitioners!</span>
            </div>
          </div>

          <div class="hud-stats-quad">
            <div class="hud-stat-item">
              <span class="hud-stat-icon">💎</span>
              <div class="hud-stat-meta">
                <span class="hud-stat-val">${state.totalXP.toLocaleString()}</span>
                <span class="hud-stat-lbl">Practice XP</span>
              </div>
            </div>
            <div class="hud-stat-item">
              <span class="hud-stat-icon">⚡</span>
              <div class="hud-stat-meta">
                <span class="hud-stat-val">${state.totalProblems}</span>
                <span class="hud-stat-lbl">Queries Solved</span>
              </div>
            </div>
            <div class="hud-stat-item">
              <span class="hud-stat-icon">🏆</span>
              <div class="hud-stat-meta">
                <span class="hud-stat-val">${state.longestStreak} Days</span>
                <span class="hud-stat-lbl">Longest Streak</span>
              </div>
            </div>
            <div class="hud-stat-item">
              <span class="hud-stat-icon">🎯</span>
              <div class="hud-stat-meta">
                <span class="hud-stat-val">${consistencyPct}%</span>
                <span class="hud-stat-lbl">Consistency</span>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    // --- INTERACTIVE DAY DOSSIER (POPOVER) ---
    handleCellClick: function (dateStr, event) {
      if (event) event.stopPropagation();
      this.showDayDossier(dateStr, event.currentTarget);
      if (window.AudioFX) window.AudioFX.playClick();
    },

    handleCellHover: function (dateStr, event) {
      // Light feedback
      if (window.AudioFX) window.AudioFX.playBlip();
    },

    handleCellLeave: function () {
      // Let user click to keep open, or hover away
    },

    showDayDossier: function (dateStr, anchorEl) {
      const dossier = document.getElementById('heatmapDayDossier');
      if (!dossier) return;

      const entry = state.activityMap[dateStr] || { count: 0, xp: 0, mcqs: 0, drills: 0, cases: 0, studio: 0, topics: [] };
      const d = new Date(dateStr + 'T00:00:00');
      const dateFormatted = d.toLocaleDateString('default', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

      let moodEmoji = '🌱';
      let moodTitle = 'Consistent Review';
      if (entry.count >= 13) {
        moodEmoji = '🚀';
        moodTitle = 'Supernova Day!';
      } else if (entry.count >= 8) {
        moodEmoji = '⚡';
        moodTitle = 'High-Intensity Drill';
      } else if (entry.count >= 4) {
        moodEmoji = '🌿';
        moodTitle = 'Solid Practice';
      } else if (entry.count === 0) {
        moodEmoji = '💤';
        moodTitle = 'Rest Day';
      }

      dossier.innerHTML = `
        <div class="dossier-inner">
          <div class="dossier-header">
            <span class="dossier-mood">${moodEmoji}</span>
            <div>
              <div class="dossier-title-row">
                <h4 class="dossier-title">${moodTitle}</h4>
                <span class="dossier-date">${dateFormatted}</span>
              </div>
              <span class="dossier-xp-badge">+${entry.xp || 0} XP Earned</span>
            </div>
            <button class="dossier-close-btn" onclick="ActivityHeatmapEngine.hideDayDossier()">&times;</button>
          </div>

          <div class="dossier-grid">
            <div class="dossier-metric">
              <span class="metric-num">${entry.count || 0}</span>
              <span class="metric-label">Total Queries</span>
            </div>
            <div class="dossier-metric">
              <span class="metric-num">${entry.drills || 0}</span>
              <span class="metric-label">Syntax Drills</span>
            </div>
            <div class="dossier-metric">
              <span class="metric-num">${entry.mcqs || 0}</span>
              <span class="metric-label">MCQs Solved</span>
            </div>
            <div class="dossier-metric">
              <span class="metric-num">${entry.cases || 0}</span>
              <span class="metric-label">Cases &amp; Quests</span>
            </div>
          </div>

          ${entry.topics && entry.topics.length ? `
            <div class="dossier-topics">
              <span class="topics-title">🎯 Covered Concepts:</span>
              <div class="topics-list">
                ${entry.topics.map(t => `<span class="topic-tag">${t}</span>`).join('')}
              </div>
            </div>
          ` : '<p class="dossier-empty-note">No specific problem tracks logged on this date.</p>'}
        </div>
      `;

      // Position popover near anchor
      dossier.classList.add('visible');

      if (anchorEl) {
        const rect = anchorEl.getBoundingClientRect();
        const wrapper = document.querySelector('.activity-heatmap-wrapper');
        const wrapperRect = wrapper ? wrapper.getBoundingClientRect() : { left: 0, top: 0 };

        let left = rect.left - wrapperRect.left - 130;
        let top = rect.top - wrapperRect.top - 180;

        // Boundaries
        if (left < 10) left = 10;
        if (left > (wrapperRect.width - 320)) left = wrapperRect.width - 330;
        if (top < 10) top = rect.bottom - wrapperRect.top + 10;

        dossier.style.left = `${left}px`;
        dossier.style.top = `${top}px`;
      }
    },

    hideDayDossier: function () {
      const dossier = document.getElementById('heatmapDayDossier');
      if (dossier) dossier.classList.remove('visible');
    },

    bindWindowEvents: function () {
      if (this._eventsBound) return;
      this._eventsBound = true;

      // Close dossier when clicking outside
      if (typeof window !== 'undefined' && window.addEventListener) {
        window.addEventListener('click', (e) => {
          const dossier = document.getElementById('heatmapDayDossier');
          if (dossier && !dossier.contains(e.target) && !e.target.closest('.heatmap-cell')) {
            this.hideDayDossier();
          }
        });
      }
    }
  };

  // Expose to window
  window.ActivityHeatmapEngine = ActivityHeatmapEngine;

})(window);
