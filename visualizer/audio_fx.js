// =============================================================================
// WEB AUDIO PROCEDURAL SOUND & GAMIFICATION ENGINE
// Zero external sound dependencies - 100% native Web Audio API synthesis
// =============================================================================

class SoundFXEngine {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem('sqlmastery_sound_enabled') !== 'false';
    this.xp = parseInt(localStorage.getItem('sqlmastery_user_xp') || '60', 10);
    this.streak = this.calculateStreak();
    this.initAudioContextOnInteraction();
  }

  initAudioContextOnInteraction() {
    const unlock = () => {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('click', unlock, { once: false });
    window.addEventListener('keydown', unlock, { once: false });
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  toggleSound() {
    this.enabled = !this.enabled;
    localStorage.setItem('sqlmastery_sound_enabled', this.enabled ? 'true' : 'false');
    this.updateSoundButtonUI();
    if (this.enabled) {
      this.playPop();
    }
    return this.enabled;
  }

  // --- PROCEDURAL SOUND GENERATORS ---

  // Tactile bubble click (for pills, tabs, buttons)
  playPop(pitch = 520) {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, now + 0.04);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.4, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}
  }

  // Harmonic relational link chime (for JOIN hover bridge)
  playConnect() {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, i) => { // C5, E5, G5 major triad
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.03);

        gain.gain.setValueAtTime(0.04, now + i * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.03 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.03);
        osc.stop(now + i * 0.03 + 0.26);
      });
    } catch (e) {}
  }

  // Soft warning buzz for orphan record / mistake
  playError() {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.18);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {}
  }

  // Victorious Duolingo-style fanfare on quest completion
  playSuccess() {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Arpeggio: C5 -> E5 -> G5 -> C6
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const start = now + idx * 0.08;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = idx === 3 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, start);

        const duration = idx === 3 ? 0.6 : 0.2;
        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + duration + 0.05);
      });
    } catch (e) {}
  }

  // Gentle low whoosh on track / tab switch
  playWhoosh() {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.12);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch (e) {}
  }

  // --- GAMIFICATION & XP SYSTEM ---

  calculateStreak() {
    const lastLogin = localStorage.getItem('sqlmastery_last_login');
    let streak = parseInt(localStorage.getItem('sqlmastery_streak') || '1', 10);
    const today = new Date().toISOString().slice(0, 10);

    if (lastLogin) {
      const last = new Date(lastLogin);
      const curr = new Date(today);
      const diffDays = Math.round((curr - last) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        streak += 1;
        localStorage.setItem('sqlmastery_streak', streak.toString());
      } else if (diffDays > 1) {
        streak = 1;
        localStorage.setItem('sqlmastery_streak', '1');
      }
    }
    localStorage.setItem('sqlmastery_last_login', today);
    return streak;
  }

  addXP(amount, reason = 'Quest Completed!') {
    this.xp += amount;
    localStorage.setItem('sqlmastery_user_xp', this.xp.toString());
    this.updateXPBadgeUI();
    this.showFloatingXPBadge(amount, reason);
  }

  updateXPBadgeUI() {
    const xpBadge = document.getElementById('userXpCounter');
    if (xpBadge) {
      xpBadge.innerHTML = `⚡ ${this.xp} <span style="font-size: 10px; color: var(--text-muted);">XP</span>`;
    }
  }

  updateSoundButtonUI() {
    const btn = document.getElementById('btnSoundToggle');
    if (btn) {
      btn.innerHTML = this.enabled 
        ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg> Sound ON`
        : `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg> Muted`;
      btn.classList.toggle('muted', !this.enabled);
    }
  }

  showFloatingXPBadge(amount, reason) {
    const toast = document.createElement('div');
    toast.className = 'xp-floating-particle';
    toast.innerHTML = `<span>+${amount} XP</span> <span style="font-size: 11px; opacity: 0.8;">${reason}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 600);
    }, 1400);
  }
}

// Global singleton instance
window.soundFX = new SoundFXEngine();
