// =============================================================================
// DAILY CHALLENGE & STREAK CALENDAR ENGINE
// Duolingo-style daily habit loop with streak preservation and calendar modal
// =============================================================================

class DailyStreakEngine {
  constructor() {
    this.todayStr = this.getTodayDateString();
    this.history = this.loadHistory();
    this.streak = this.calculateStreak();
  }

  getTodayDateString() {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  }

  loadHistory() {
    try {
      const raw = localStorage.getItem('sql_streak_history');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  saveHistory() {
    try {
      localStorage.setItem('sql_streak_history', JSON.stringify(this.history));
    } catch (e) {}
  }

  calculateStreak() {
    if (!this.history || this.history.length === 0) return 0;
    const sorted = [...new Set(this.history)].sort().reverse();
    let count = 0;
    let checkDate = new Date();

    // Check if today is completed
    const today = this.getTodayDateString();
    let hasToday = sorted.includes(today);

    if (!hasToday) {
      // Check if yesterday was completed
      checkDate.setDate(checkDate.getDate() - 1);
      const yesterday = checkDate.toISOString().slice(0, 10);
      if (!sorted.includes(yesterday)) {
        return 0; // streak broken
      }
    }

    // Count backwards consecutive days
    let cur = new Date(hasToday ? today : checkDate.toISOString().slice(0, 10));
    while (true) {
      const curStr = cur.toISOString().slice(0, 10);
      if (sorted.includes(curStr)) {
        count++;
        cur.setDate(cur.getDate() - 1);
      } else {
        break;
      }
    }

    return count;
  }

  completeTodayChallenge() {
    if (!this.history.includes(this.todayStr)) {
      this.history.push(this.todayStr);
      this.saveHistory();
      this.streak = this.calculateStreak();

      if (window.soundFX) {
        window.soundFX.addXP(50, 'Daily Challenge Conquered! 🔥');
        window.soundFX.playSuccess();
      }
      if (window.SQL_BUDDY) {
        window.SQL_BUDDY.say(`🔥 STREAK EXTENDED! You've maintained a ${this.streak}-day SQL habit! +50 Daily Bonus XP!`, 5500, 'celebrate');
      }
      this.updateHeaderUI();
    }
  }

  open() {
    let modal = document.getElementById('streakCalendarModal');
    if (!modal) {
      this.createModalHtml();
      modal = document.getElementById('streakCalendarModal');
    }
    modal.style.display = 'flex';
    this.renderCalendarGrid();
    if (window.AudioFX) window.AudioFX.playClick();
  }

  close() {
    const modal = document.getElementById('streakCalendarModal');
    if (modal) modal.style.display = 'none';
  }

  createModalHtml() {
    const div = document.createElement('div');
    div.id = 'streakCalendarModal';
    div.className = 'blitz-modal-overlay';
    div.style.display = 'none';
    div.innerHTML = `
      <div class="blitz-modal-card" style="max-width: 680px; width: 95vw; max-height: 90vh; overflow-y: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 26px;">🔥</span>
            <div>
              <h2 style="font-size: 18px; margin: 0; color: #ffffff;">Daily Practice &amp; Streak Calendar</h2>
              <div style="font-size: 11px; color: var(--text-secondary);">Daily Spaced Habit Loop &bull; Consecutive Completion Flame Multiplier</div>
            </div>
          </div>
          <button class="card-nav-btn" onclick="window.dailyStreak.close()">&times; Close</button>
        </div>

        <!-- Streak Stats Banner -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px;">
          <div style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 8px; padding: 12px; text-align: center;">
            <div style="font-size: 11px; color: #f59e0b; font-weight: 700; text-transform: uppercase;">Current Streak</div>
            <div style="font-size: 24px; font-weight: 800; color: #ffffff; margin-top: 4px;">
              🔥 <span id="streakModalCount">0</span> Days
            </div>
          </div>
          <div style="background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 8px; padding: 12px; text-align: center;">
            <div style="font-size: 11px; color: #38bdf8; font-weight: 700; text-transform: uppercase;">XP Multiplier</div>
            <div style="font-size: 24px; font-weight: 800; color: #ffffff; margin-top: 4px;">
              ⚡ <span id="streakModalMultiplier">1.0x</span>
            </div>
          </div>
          <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 12px; text-align: center;">
            <div style="font-size: 11px; color: #10b981; font-weight: 700; text-transform: uppercase;">Streak Status</div>
            <div id="streakStatusToday" style="font-size: 13px; font-weight: 700; color: #10b981; margin-top: 8px;">
              Ready for Today
            </div>
          </div>
        </div>

        <!-- Today's Featured Challenge Card -->
        <div style="background: rgba(0,0,0,0.5); border: 1px solid var(--border-color); border-radius: 8px; padding: 14px; margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 11px; font-family: var(--font-mono); color: #38bdf8; font-weight: 700;">TODAY'S FEATURED SPRINT</span>
            <span style="font-size: 10px; color: #10b981; background: rgba(16, 185, 129, 0.15); padding: 2px 8px; border-radius: 12px;">+50 Bonus XP</span>
          </div>
          <div style="font-size: 14px; font-weight: 600; color: #ffffff; margin-bottom: 4px;">Mastery Retrieval: Filter &amp; Group Aggregates</div>
          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">Solve today's randomized challenge to keep your streak flame blazing!</div>
          <button class="btn-blitz-start" onclick="window.dailyStreak.launchTodayQuest()" style="padding: 7px 16px; font-size: 12px;">🔥 Launch Today's Challenge</button>
        </div>

        <!-- 30-Day Activity Heatmap Matrix -->
        <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); border-radius: 8px; padding: 14px;">
          <div style="font-size: 12px; font-weight: 700; color: #ffffff; margin-bottom: 10px;">Current Month Activity Log</div>
          <div id="streakDaysGrid" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; text-align: center;"></div>
        </div>
      </div>
    `;
    document.body.appendChild(div);
  }

  renderCalendarGrid() {
    const grid = document.getElementById('streakDaysGrid');
    const countEl = document.getElementById('streakModalCount');
    const multEl = document.getElementById('streakModalMultiplier');
    const statusEl = document.getElementById('streakStatusToday');
    if (!grid) return;

    const streakCount = this.calculateStreak();
    if (countEl) countEl.textContent = streakCount;
    if (multEl) multEl.textContent = `${(1.0 + Math.min(0.5, streakCount * 0.1)).toFixed(1)}x`;

    const isDoneToday = this.history.includes(this.todayStr);
    if (statusEl) {
      statusEl.textContent = isDoneToday ? '✓ Conquered Today!' : '🔥 Pending for Today';
      statusEl.style.color = isDoneToday ? '#10b981' : '#f59e0b';
    }

    // Days of week header
    const daysHeader = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    let html = daysHeader.map(d => `<div style="font-size: 10px; color: var(--text-secondary); font-weight: 700; padding: 4px 0;">${d}</div>`).join('');

    // Generate current month days
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Empty lead cells
    for (let i = 0; i < firstDay; i++) {
      html += `<div style="height: 34px;"></div>`;
    }

    for (let day = 1; day <= totalDays; day++) {
      const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isCompleted = this.history.includes(dStr);
      const isToday = (dStr === this.todayStr);

      let bg = 'rgba(255,255,255,0.03)';
      let border = '1px solid rgba(255,255,255,0.06)';
      let text = `<span style="font-size: 11px;">${day}</span>`;

      if (isCompleted) {
        bg = 'rgba(245, 158, 11, 0.2)';
        border = '1px solid rgba(245, 158, 11, 0.6)';
        text = `<span>🔥</span>`;
      } else if (isToday) {
        border = '1px dashed #38bdf8';
      }

      html += `
        <div style="height: 34px; background: ${bg}; border: ${border}; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-family: var(--font-mono);">
          ${text}
        </div>
      `;
    }

    grid.innerHTML = html;
  }

  launchTodayQuest() {
    this.close();
    // Switch to section 4 and complete quest on check
    if (typeof switchQuestSection === 'function') {
      switchQuestSection('section4');
    }
    this.completeTodayChallenge();
  }

  updateHeaderUI() {
    const badge = document.getElementById('userStreakBadge');
    if (badge) {
      badge.innerHTML = `🔥 <span style="font-weight: 700;">${this.streak}</span>`;
      badge.title = `Daily Streak: ${this.streak} days active! Click to view calendar.`;
    }
  }
}

window.dailyStreak = new DailyStreakEngine();
window.openStreakCalendarModal = () => window.dailyStreak.open();
