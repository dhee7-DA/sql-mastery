// =============================================================================
// WEB AUDIO PROCEDURAL SOUND & GAMIFICATION SOUNDSCAPE STUDIO
// Zero external sound dependencies - 100% native Web Audio API synthesis
// Features: 3 Sound Themes (8-Bit Arcade, Synthwave, Clean Minimal) + Sir Bloops Voice (TTS)
// =============================================================================

class SoundFXEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.enabled = localStorage.getItem('sqlmastery_sound_enabled') !== 'false';
    this.voiceEnabled = localStorage.getItem('sqlmastery_voice_enabled') === 'true';
    this.theme = localStorage.getItem('sqlmastery_sound_theme') || 'arcade_8bit';
    this.volume = parseFloat(localStorage.getItem('sqlmastery_sound_volume') || '0.7');
    this.xp = parseInt(localStorage.getItem('sqlmastery_user_xp') || '60', 10);
    this.streak = this.calculateStreak();
    this.initAudioContextOnInteraction();
  }

  initAudioContextOnInteraction() {
    const unlock = () => {
      this.ensureContext();
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('click', unlock, { once: false });
    window.addEventListener('keydown', unlock, { once: false });
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, parseFloat(vol)));
    localStorage.setItem('sqlmastery_sound_volume', this.volume.toString());
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  setTheme(newTheme) {
    if (['arcade_8bit', 'synthwave', 'clean_minimal'].includes(newTheme)) {
      this.theme = newTheme;
      localStorage.setItem('sqlmastery_sound_theme', newTheme);
      this.playSuccess();
    }
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

  toggleVoice() {
    this.voiceEnabled = !this.voiceEnabled;
    localStorage.setItem('sqlmastery_voice_enabled', this.voiceEnabled ? 'true' : 'false');
    if (this.voiceEnabled) {
      this.speakBloops("Sir Bloops voice synthesizer activated! Let's write some SQL!");
    }
    return this.voiceEnabled;
  }

  // --- SIR BLOOPS WEB SPEECH API SYNTHESIZER ---
  speakBloops(text) {
    if (!this.voiceEnabled || !window.speechSynthesis) return;

    try {
      window.speechSynthesis.cancel(); // cancel any active speech

      // Clean text of emojis, markdown, and code blocks
      const clean = text
        .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '')
        .replace(/[`*#_~[\]()]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      if (!clean) return;

      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.pitch = 1.35; // cute, slightly squeaky gremlin mascot pitch
      utterance.rate = 1.15;  // energetic tempo

      // Attempt to pick a smooth English voice
      const voices = window.speechSynthesis.getVoices();
      const englishVoices = voices.filter(v => v.lang && v.lang.startsWith('en'));
      if (englishVoices.length > 0) {
        // Prefer natural voices if present
        const natural = englishVoices.find(v => v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha'));
        utterance.voice = natural || englishVoices[0];
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {}
  }

  // --- PROCEDURAL SOUND GENERATORS (THEMED) ---

  // Tactile click / selection
  playPop(pitch = 520) {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const gain = ctx.createGain();

      if (this.theme === 'arcade_8bit') {
        // 8-Bit Square Wave Blip
        const osc = ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.setValueAtTime(pitch * 1.2, now);
        osc.frequency.setValueAtTime(pitch * 1.8, now + 0.03);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.065);
      } else if (this.theme === 'synthwave') {
        // Smooth chorus sine duo
        [pitch, pitch * 1.01].forEach(f => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now);
          osc.frequency.exponentialRampToValueAtTime(f * 0.8, now + 0.1);
          gain.gain.setValueAtTime(0.07, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(now);
          osc.stop(now + 0.11);
        });
      } else {
        // Clean Minimal: Soft tactile pop
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(pitch, now);
        osc.frequency.exponentialRampToValueAtTime(pitch * 0.5, now + 0.05);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.065);
      }
    } catch (e) {}
  }

  // Victorious Fanfare on level completion
  playSuccess() {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      if (this.theme === 'arcade_8bit') {
        // Retro NES 8-bit victory arpeggio: C5 -> E5 -> G5 -> C6 -> E6
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        notes.forEach((freq, idx) => {
          const start = now + idx * 0.065;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(freq, start);
          const dur = idx === notes.length - 1 ? 0.45 : 0.08;
          gain.gain.setValueAtTime(0.09, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(start);
          osc.stop(start + dur + 0.02);
        });
      } else if (this.theme === 'synthwave') {
        // Lush analog synth chords wash
        const triad = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
        triad.forEach(f => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now);
          osc.frequency.exponentialRampToValueAtTime(f * 1.02, now + 0.6);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(now);
          osc.stop(now + 0.65);
        });
      } else {
        // Clean Minimal: Crystal chime
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const start = now + idx * 0.07;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, start);
          const dur = idx === 3 ? 0.5 : 0.18;
          gain.gain.setValueAtTime(0.1, start);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(start);
          osc.stop(start + dur + 0.02);
        });
      }
    } catch (e) {}
  }

  // Soft warning buzz for mistake
  playError() {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (this.theme === 'arcade_8bit') {
        // Retro 8-bit down-buzz
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.setValueAtTime(110, now + 0.08);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      } else if (this.theme === 'synthwave') {
        // Analog tape stop drop
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.22);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      } else {
        // Clean Minimal: Gentle thump
        osc.type = 'sine';
        osc.frequency.setValueAtTime(130, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.15);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      }

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.22);
    } catch (e) {}
  }

  // Harmonic link chime
  playConnect() {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.03);
        gain.gain.setValueAtTime(0.04, now + i * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.03 + 0.25);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now + i * 0.03);
        osc.stop(now + i * 0.03 + 0.26);
      });
    } catch (e) {}
  }

  // Whoosh transition
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
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch (e) {}
  }

  // --- GAMIFICATION & XP ---
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
    const valEl = document.getElementById('xpPointsVal');
    if (valEl) {
      valEl.textContent = this.xp;
    } else {
      const xpBadge = document.getElementById('userXpCounter');
      if (xpBadge) {
        xpBadge.innerHTML = `<span class="stat-icon">⚡</span> <span class="stat-val" id="xpPointsVal">${this.xp}</span><span class="stat-unit">XP</span>`;
      }
    }
  }

  updateSoundButtonUI() {
    const btn = document.getElementById('btnSoundToggle');
    if (btn) {
      btn.innerHTML = this.enabled 
        ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`
        : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
      btn.title = this.enabled ? 'Sound FX: ON (Click to configure studio)' : 'Sound FX: Muted';
      btn.setAttribute('aria-label', btn.title);
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

  openStudioModal() {
    let modal = document.getElementById('soundStudioModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'soundStudioModal';
      modal.className = 'blitz-modal-overlay';
      modal.innerHTML = `
        <div class="blitz-modal-card" style="max-width: 580px; width: 95vw;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; margin-bottom: 16px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 24px;">🔊</span>
              <div>
                <h2 style="font-size: 18px; margin: 0; color: #ffffff;">Soundscape Studio &amp; Voice Controls</h2>
                <div style="font-size: 11px; color: var(--text-secondary);">Procedural Web Audio Presets &bull; Sir Bloops Web Speech Synthesizer</div>
              </div>
            </div>
            <button class="card-nav-btn" onclick="window.soundFX.closeStudioModal()">&times; Close</button>
          </div>

          <!-- Sound FX Toggle & Volume Slider -->
          <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--border-color); border-radius: 8px; padding: 14px; margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <span style="font-size: 13px; font-weight: 600; color: #ffffff;">Master Audio FX</span>
              <button class="choice-pill ${this.enabled ? 'selected' : ''}" id="studioFxToggleBtn" onclick="window.soundFX.toggleSound(); window.soundFX.updateStudioModalUI();">
                ${this.enabled ? '✓ Enabled' : 'Muted'}
              </button>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 11px; color: var(--text-secondary); width: 55px;">Volume:</span>
              <input type="range" min="0" max="1" step="0.05" value="${this.volume}" onchange="window.soundFX.setVolume(this.value)" oninput="window.soundFX.setVolume(this.value)" style="flex: 1; accent-color: #38bdf8;">
            </div>
          </div>

          <!-- 3 Soundscape Themes -->
          <div style="margin-bottom: 14px;">
            <div style="font-size: 12px; font-weight: 700; color: #38bdf8; margin-bottom: 8px;">CHOOSE SOUNDSCAPE PRESET</div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
              <button class="choice-pill ${this.theme === 'arcade_8bit' ? 'selected' : ''}" id="themeBtn8Bit" onclick="window.soundFX.setTheme('arcade_8bit'); window.soundFX.updateStudioModalUI();" style="flex-direction: column; padding: 12px 8px; text-align: center;">
                <span style="font-size: 20px; margin-bottom: 4px;">🕹️</span>
                <span style="font-weight: 700; font-size: 12px;">8-Bit Arcade</span>
                <span style="font-size: 10px; color: var(--text-secondary); margin-top: 2px;">NES Chiptune</span>
              </button>
              <button class="choice-pill ${this.theme === 'synthwave' ? 'selected' : ''}" id="themeBtnSynth" onclick="window.soundFX.setTheme('synthwave'); window.soundFX.updateStudioModalUI();" style="flex-direction: column; padding: 12px 8px; text-align: center;">
                <span style="font-size: 20px; margin-bottom: 4px;">🌆</span>
                <span style="font-weight: 700; font-size: 12px;">Synthwave</span>
                <span style="font-size: 10px; color: var(--text-secondary); margin-top: 2px;">Analog Saw/Sine</span>
              </button>
              <button class="choice-pill ${this.theme === 'clean_minimal' ? 'selected' : ''}" id="themeBtnMinimal" onclick="window.soundFX.setTheme('clean_minimal'); window.soundFX.updateStudioModalUI();" style="flex-direction: column; padding: 12px 8px; text-align: center;">
                <span style="font-size: 20px; margin-bottom: 4px;">✨</span>
                <span style="font-weight: 700; font-size: 12px;">Clean Minimal</span>
                <span style="font-size: 10px; color: var(--text-secondary); margin-top: 2px;">Soft Chimes</span>
              </button>
            </div>
          </div>

          <!-- Sir Bloops Voice Synthesizer Toggle -->
          <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--border-color); border-radius: 8px; padding: 14px; margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 13px; font-weight: 600; color: #ffffff;">Sir Bloops Mascot Voice (TTS)</div>
                <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">Speaks hints &amp; celebrations out loud using Web Speech API</div>
              </div>
              <button class="choice-pill ${this.voiceEnabled ? 'selected' : ''}" id="studioVoiceToggleBtn" onclick="window.soundFX.toggleVoice(); window.soundFX.updateStudioModalUI();">
                ${this.voiceEnabled ? '🗣️ Voice ON' : 'Muted'}
              </button>
            </div>
          </div>

          <!-- Test Audio Actions -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 14px;">
            <button class="card-nav-btn" onclick="window.soundFX.playPop()">▶ Test Pop</button>
            <button class="card-nav-btn" onclick="window.soundFX.playSuccess()">▶ Test Fanfare</button>
            <button class="card-nav-btn" onclick="window.soundFX.speakBloops('Sir Bloops is ready to query!')">🗣️ Test Voice</button>
            <button class="btn-blitz-start" onclick="window.soundFX.closeStudioModal()" style="padding: 6px 16px; font-size: 12px;">Save &amp; Done</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    modal.style.display = 'flex';
    this.updateStudioModalUI();
  }

  closeStudioModal() {
    const modal = document.getElementById('soundStudioModal');
    if (modal) modal.style.display = 'none';
  }

  updateStudioModalUI() {
    const fxBtn = document.getElementById('studioFxToggleBtn');
    const voiceBtn = document.getElementById('studioVoiceToggleBtn');
    const b8 = document.getElementById('themeBtn8Bit');
    const bSyn = document.getElementById('themeBtnSynth');
    const bMin = document.getElementById('themeBtnMinimal');

    if (fxBtn) {
      fxBtn.classList.toggle('selected', this.enabled);
      fxBtn.textContent = this.enabled ? '✓ Enabled' : 'Muted';
    }
    if (voiceBtn) {
      voiceBtn.classList.toggle('selected', this.voiceEnabled);
      voiceBtn.textContent = this.voiceEnabled ? '🗣️ Voice ON' : 'Muted';
    }
    if (b8) b8.classList.toggle('selected', this.theme === 'arcade_8bit');
    if (bSyn) bSyn.classList.toggle('selected', this.theme === 'synthwave');
    if (bMin) bMin.classList.toggle('selected', this.theme === 'clean_minimal');
  }
}

// Global instances
window.soundFX = new SoundFXEngine();
window.openSoundStudioModal = () => window.soundFX.openStudioModal();
window.AudioFX = {
  playClick: (pitch) => window.soundFX.playPop(pitch),
  playSuccess: () => window.soundFX.playSuccess(),
  playError: () => window.soundFX.playError(),
  playConnect: () => window.soundFX.playConnect(),
  playWhoosh: () => window.soundFX.playWhoosh(),
  addXP: (amt, r) => window.soundFX.addXP(amt, r)
};

// Also hook voice into Sir Bloops
if (window.soundFX) {
  window.speakBloops = (text) => window.soundFX.speakBloops(text);
}
