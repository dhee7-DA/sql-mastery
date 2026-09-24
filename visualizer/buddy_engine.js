// =============================================================================
// BLOUB COMPANION ENGINE: PURE FLUID MORPHING MASCOT
// - Pure Vector Geometry: Zero background boxes, zero shadow circles, zero halos
// - 100% Clean Silhouette: Zero floating buttons on top of head, zero accessories
// - Authentic 3D Spherical Gaze Projection: Sleek pill capsule eyes track cursor in 3D
// - Original Authentic Silhouette: Clean minimalist vector design from bloub.vercel.app
// - Authentic 8 Shapes & 12 Colors from bloub.vercel.app
// - Tactile Slime Physics: Drag & snap-back jelly elasticity
// - Interactive Particles: 🎊 Micro-confetti bursts on query success & quiz pass
// - Organic Idle Snooze: Gentle Zzz sleep on inactivity & surprised wake-up bounce
// - Autonomous Web Audio Synth: Bloop pops, morph sweeps, victory chimes & mute toggle
// - Visualizer Theme Sync: Auto-adapts skin color to active IDE theme
// - Dedicated Mascot Settings Panel: Docked cleanly beside the avatar
// =============================================================================

const SQL_BUDDY = (() => {
  const Y = Math.PI * 2;
  const N_PTS = 64;
  const Ts = Array.from({ length: N_PTS }, (_, t) => (t / N_PTS) * Y);
  const Es = Ts.map(Math.cos);
  const Ds = Ts.map(Math.sin);
  const Q = e => Math.round(e * 100) / 100;
  const clamp = (val, min = 0, max = 1) => Math.min(max, Math.max(min, val));
  const Z = (a, b, t) => a + (b - a) * t;

  // ---------------------------------------------------------------------------
  // 1. ALL 8 AUTHENTIC SHAPES (64 radial points from bloub.vercel.app)
  // ---------------------------------------------------------------------------
  const SHAPES = {
    galet: {
      id: "galet",
      name: "Pebble",
      icon: "🪨",
      radii: [0.977, 0.961, 0.946, 0.932, 0.919, 0.908, 0.9, 0.894, 0.89, 0.888, 0.888, 0.889, 0.891, 0.893, 0.895, 0.897, 0.899, 0.9, 0.902, 0.904, 0.908, 0.912, 0.918, 0.925, 0.934, 0.944, 0.955, 0.967, 0.979, 0.99, 0.999, 1.006, 1.009, 1.009, 1.005, 0.996, 0.984, 0.968, 0.949, 0.928, 0.906, 0.886, 0.867, 0.851, 0.839, 0.831, 0.83, 0.833, 0.842, 0.856, 0.874, 0.894, 0.916, 0.939, 0.961, 0.98, 0.997, 1.009, 1.017, 1.02, 1.018, 1.013, 1.003, 0.991]
    },
    squircle: {
      id: "squircle",
      name: "Squircle",
      icon: "⬛",
      radii: [0.959, 0.964, 0.978, 1.001, 1.032, 1.07, 1.108, 1.138, 1.15, 1.138, 1.108, 1.07, 1.032, 1.001, 0.978, 0.964, 0.959, 0.964, 0.978, 1.001, 1.032, 1.07, 1.108, 1.138, 1.15, 1.138, 1.108, 1.07, 1.032, 1.001, 0.978, 0.964, 0.959, 0.964, 0.978, 1.001, 1.032, 1.07, 1.108, 1.138, 1.15, 1.138, 1.108, 1.07, 1.032, 1.001, 0.978, 0.964, 0.959, 0.964, 0.978, 1.001, 1.032, 1.07, 1.108, 1.138, 1.15, 1.138, 1.108, 1.07, 1.032, 1.001, 0.978, 0.964]
    },
    cercle: {
      id: "cercle",
      name: "Circle",
      icon: "⭕",
      radii: Array(64).fill(1)
    },
    capsule: {
      id: "capsule",
      name: "Capsule",
      icon: "💊",
      radii: [1.04, 1.036, 1.026, 1.009, 0.987, 0.958, 0.923, 0.884, 0.841, 0.795, 0.746, 0.703, 0.671, 0.648, 0.632, 0.623, 0.62, 0.623, 0.632, 0.648, 0.671, 0.703, 0.746, 0.795, 0.841, 0.884, 0.923, 0.958, 0.987, 1.009, 1.026, 1.036, 1.04, 1.036, 1.026, 1.009, 0.987, 0.958, 0.923, 0.884, 0.841, 0.795, 0.746, 0.703, 0.671, 0.648, 0.632, 0.623, 0.62, 0.623, 0.632, 0.648, 0.671, 0.703, 0.746, 0.795, 0.841, 0.884, 0.923, 0.958, 0.987, 1.009, 1.026, 1.036]
    },
    triangle: {
      id: "triangle",
      name: "Triangle",
      icon: "▲",
      radii: [0.843, 0.898, 0.971, 1.048, 1.097, 1.117, 1.114, 1.083, 1.025, 0.944, 0.878, 0.828, 0.79, 0.763, 0.744, 0.734, 0.73, 0.734, 0.744, 0.763, 0.79, 0.828, 0.878, 0.944, 1.025, 1.083, 1.114, 1.117, 1.097, 1.048, 0.971, 0.898, 0.843, 0.801, 0.771, 0.75, 0.736, 0.73, 0.732, 0.74, 0.756, 0.78, 0.814, 0.86, 0.92, 0.999, 1.068, 1.106, 1.12, 1.106, 1.068, 0.999, 0.92, 0.86, 0.814, 0.78, 0.756, 0.74, 0.732, 0.73, 0.736, 0.75, 0.771, 0.801]
    },
    hexagone: {
      id: "hexagone",
      name: "Hexagon",
      icon: "⬡",
      radii: [1.04, 1.025, 0.988, 0.961, 0.944, 0.936, 0.938, 0.948, 0.969, 1, 1.033, 1.038, 1.013, 0.978, 0.954, 0.94, 0.935, 0.94, 0.954, 0.978, 1.013, 1.038, 1.033, 1, 0.969, 0.948, 0.938, 0.936, 0.944, 0.961, 0.988, 1.025, 1.04, 1.025, 0.988, 0.961, 0.944, 0.936, 0.938, 0.948, 0.969, 1, 1.033, 1.038, 1.013, 0.978, 0.954, 0.94, 0.935, 0.94, 0.954, 0.978, 1.013, 1.038, 1.033, 1, 0.969, 0.948, 0.938, 0.936, 0.944, 0.961, 0.988, 1.025]
    },
    nuage: {
      id: "nuage",
      name: "Cloud",
      icon: "☁️",
      radii: [0.916, 0.95, 0.976, 0.992, 0.999, 0.996, 0.983, 0.961, 0.929, 0.889, 0.84, 0.859, 0.875, 0.887, 0.894, 0.898, 0.897, 0.892, 0.883, 0.869, 0.852, 0.835, 0.884, 0.927, 0.963, 0.99, 1.009, 1.019, 1.02, 1.013, 0.996, 0.972, 0.939, 0.898, 0.851, 0.796, 0.777, 0.806, 0.83, 0.847, 0.858, 0.862, 0.859, 0.85, 0.835, 0.813, 0.785, 0.752, 0.714, 0.671, 0.656, 0.697, 0.734, 0.764, 0.788, 0.806, 0.818, 0.822, 0.819, 0.81, 0.794, 0.771, 0.82, 0.872]
    },
    goutte: {
      id: "goutte",
      name: "Droplet",
      icon: "💧",
      radii: [0.615, 0.644, 0.674, 0.704, 0.735, 0.766, 0.795, 0.825, 0.852, 0.877, 0.9, 0.92, 0.936, 0.95, 0.96, 0.965, 0.968, 0.965, 0.96, 0.95, 0.936, 0.92, 0.9, 0.877, 0.852, 0.825, 0.795, 0.766, 0.735, 0.704, 0.674, 0.644, 0.615, 0.588, 0.566, 0.551, 0.542, 0.538, 0.539, 0.546, 0.558, 0.577, 0.602, 0.637, 0.683, 0.743, 0.824, 0.935, 1.04, 0.935, 0.824, 0.743, 0.683, 0.637, 0.602, 0.577, 0.558, 0.546, 0.539, 0.538, 0.542, 0.551, 0.566, 0.588]
    }
  };

  // ---------------------------------------------------------------------------
  // 2. ALL 12 AUTHENTIC COLORS (bloub.vercel.app palette)
  // ---------------------------------------------------------------------------
  const COLORS = {
    encre:     { id: "encre",     name: "Ink",       hex: "#0a0a0c", eyeColor: "#ffffff", isDark: true },
    creme:     { id: "creme",     name: "Cream",     hex: "#f1efe9", eyeColor: "#0a0a0c", isDark: false },
    vert:      { id: "vert",      name: "Emerald",   hex: "#3ecf8e", eyeColor: "#ffffff", isDark: true },
    bleu:      { id: "bleu",      name: "Azure",     hex: "#3b93f0", eyeColor: "#ffffff", isDark: true },
    ambre:     { id: "ambre",     name: "Amber",     hex: "#f0b429", eyeColor: "#ffffff", isDark: true },
    violet:    { id: "violet",    name: "Purple",    hex: "#8b5cf6", eyeColor: "#ffffff", isDark: true },
    rouge:     { id: "rouge",     name: "Crimson",   hex: "#e8483f", eyeColor: "#ffffff", isDark: true },
    orange:    { id: "orange",    name: "Flame",     hex: "#f08a24", eyeColor: "#ffffff", isDark: true },
    turquoise: { id: "turquoise", name: "Turquoise", hex: "#2fbfa0", eyeColor: "#ffffff", isDark: true },
    rose:      { id: "rose",      name: "Pink",      hex: "#e152b0", eyeColor: "#ffffff", isDark: true },
    gris:      { id: "gris",      name: "Grey",      hex: "#a3a3a3", eyeColor: "#ffffff", isDark: true },
    brun:      { id: "brun",      name: "Brown",     hex: "#8b5e3c", eyeColor: "#ffffff", isDark: true }
  };

  // ---------------------------------------------------------------------------
  // 3. CURATED SQL PRO-TIPS
  // ---------------------------------------------------------------------------
  const PRO_TIPS = [
    "Psst! Never compare NULL using '='. Always use 'IS NULL' or 'IS NOT NULL'!",
    "Remember: WHERE filters individual rows BEFORE grouping, HAVING filters summary buckets AFTER!",
    "Row_Number() gives 1, 2, 3... Rank skips ties: 1, 2, 2, 4... Dense_Rank never skips: 1, 2, 2, 3!",
    "Beware 3VL! If your subquery inside 'NOT IN' returns even one NULL, the whole predicate evaluates to UNKNOWN!",
    "Always default to UNION ALL unless you explicitly need deduplication! UNION incurs a heavy sort/hash cost.",
    "Did you know? In standard SQL, aliases created in SELECT cannot be used in WHERE because WHERE executes at Step 2 and SELECT runs at Step 5!",
    "Last_Value() default frame trap: Always specify 'ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING'!",
    "Want blazing fast queries? Keep your predicates sargable! Avoid wrapping indexed columns in functions like DATE(col).",
    "In recursive CTEs, always CAST() your string accumulator column to avoid type truncation on deeper recursion levels!",
    "GROUPING(col) returns 1 if a NULL was generated by ROLLUP/CUBE aggregation, and 0 if it's an actual table NULL!"
  ];

  // ---------------------------------------------------------------------------
  // 4. AUTONOMOUS WEB AUDIO SYNTHESIZER (With Mute Support)
  // ---------------------------------------------------------------------------
  const SOUNDS = (() => {
    let ctx = null;
    let isMuted = localStorage.getItem("sql_mascot_sound_muted") === "true";

    function getContext() {
      if (isMuted) return null;
      if (!ctx && (window.AudioContext || window.webkitAudioContext)) {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (ctx && ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      return ctx;
    }

    function toggleMute() {
      isMuted = !isMuted;
      localStorage.setItem("sql_mascot_sound_muted", isMuted.toString());
      updateSettingsUI();
      if (!isMuted) playBloop(1.2);
      return !isMuted;
    }

    function isAudioEnabled() {
      return !isMuted;
    }

    function playBloop(pitch = 1.0) {
      const ac = getContext();
      if (!ac) return;
      try {
        const now = ac.currentTime;
        const osc = ac.createOscillator();
        const gain = ac.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(460 * pitch, now);
        osc.frequency.exponentialRampToValueAtTime(880 * pitch, now + 0.065);

        gain.gain.setValueAtTime(0.32, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.085);

        osc.connect(gain);
        gain.connect(ac.destination);

        osc.start(now);
        osc.stop(now + 0.09);
      } catch (e) {}
    }

    function playMorph() {
      const ac = getContext();
      if (!ac) return;
      try {
        const now = ac.currentTime;
        [520, 740].forEach((freq, i) => {
          const osc = ac.createOscillator();
          const gain = ac.createGain();
          osc.type = "sine";
          const startT = now + i * 0.035;
          osc.frequency.setValueAtTime(freq, startT);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.35, startT + 0.075);
          gain.gain.setValueAtTime(0.22, startT);
          gain.gain.exponentialRampToValueAtTime(0.001, startT + 0.095);
          osc.connect(gain);
          gain.connect(ac.destination);
          osc.start(startT);
          osc.stop(startT + 0.11);
        });
      } catch (e) {}
    }

    function playSuccess() {
      const ac = getContext();
      if (!ac) return;
      try {
        const now = ac.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
          const osc = ac.createOscillator();
          const gain = ac.createGain();
          osc.type = "triangle";
          const startT = now + i * 0.065;
          osc.frequency.setValueAtTime(freq, startT);
          gain.gain.setValueAtTime(0.2, startT);
          gain.gain.exponentialRampToValueAtTime(0.001, startT + 0.22);
          osc.connect(gain);
          gain.connect(ac.destination);
          osc.start(startT);
          osc.stop(startT + 0.25);
        });
      } catch (e) {}
    }

    function playAlert() {
      const ac = getContext();
      if (!ac) return;
      try {
        const now = ac.currentTime;
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.16);
        gain.gain.setValueAtTime(0.24, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.17);
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.start(now);
        osc.stop(now + 0.18);
      } catch (e) {}
    }

    return { playBloop, playMorph, playSuccess, playAlert, toggleMute, isAudioEnabled };
  })();

  // ---------------------------------------------------------------------------
  // 5. MATHEMATICAL HARMONICS & 3D GEOMETRY
  // ---------------------------------------------------------------------------
  function Lo(e, t, n = 0) {
    const r = (e / t) * Y;
    return 0.55 * Math.sin(r + n) + 0.3 * Math.sin(2 * r + n * 1.7 + 1.1) + 0.15 * Math.sin(3 * r + n * 2.3 + 2.4);
  }

  function Fs(radii, angle) {
    const n = radii.length;
    const r = (((angle / Y) % 1) + 1) % 1 * n;
    const i = Math.floor(r);
    return Z(radii[i % n] ?? 1, radii[(i + 1) % n] ?? 1, r - i);
  }

  function js(sil, scale, out = []) {
    const cosR = Math.cos(sil.rot || 0);
    const sinR = Math.sin(sil.rot || 0);
    const sx = sil.sx || 1;
    const sy = sil.sy || 1;
    const cx = sil.cx || 0;
    const cy = sil.cy || 0;

    for (let a = 0; a < N_PTS; a++) {
      const r = sil.radii[a] ?? 1;
      const x0 = r * (Es[a] ?? 0);
      const y0 = r * (Ds[a] ?? 0);
      const rx = x0 * cosR - y0 * sinR;
      const ry = x0 * sinR + y0 * cosR;
      const pt = out[a] ?? { x: 0, y: 0 };
      pt.x = (rx * sx + cx) * scale;
      pt.y = (ry * sy + cy) * scale;
      out[a] = pt;
    }
    out.length = N_PTS;
    return out;
  }

  function Ms(points, tension = 1 / 6) {
    const n = points.length;
    if (n < 3) return "";
    const p0 = points[0];
    let d = `M${Q(p0.x)} ${Q(p0.y)}`;
    for (let i = 0; i < n; i++) {
      const prev = points[(i - 1 + n) % n];
      const curr = points[i];
      const next = points[(i + 1) % n];
      const nextNext = points[(i + 2) % n];
      const cp1x = curr.x + (next.x - prev.x) * tension;
      const cp1y = curr.y + (next.y - prev.y) * tension;
      const cp2x = next.x - (nextNext.x - curr.x) * tension;
      const cp2y = next.y - (nextNext.y - curr.y) * tension;
      d += `C${Q(cp1x)} ${Q(cp1y)} ${Q(cp2x)} ${Q(cp2y)} ${Q(next.x)} ${Q(next.y)}`;
    }
    return `${d}Z`;
  }

  function ls(e, t, n) {
    const r = Math.cos(n), i = Math.sin(n);
    return [
      [e[0] * r + t[0] * i, e[1] * r + t[1] * i, e[2] * r + t[2] * i],
      [t[0] * r - e[0] * i, t[1] * r - e[1] * i, t[2] * r - e[2] * i]
    ];
  }

  function cs(deg) {
    return deg * Math.PI / 180;
  }

  function us(gaze, t, split = 16.8) {
    let r = [0, 0, 1], i = [1, 0, 0], a = [0, 1, 0];
    [r, i] = ls(r, i, cs(gaze.yaw));
    [a, r] = ls(a, r, cs(gaze.pitch));
    [i, a] = ls(i, a, cs(gaze.roll));
    const sideEye = side => {
      const [eyePos, eyeDir] = ls(r, i, cs(split * side));
      return {
        x: eyePos[0] * t,
        y: eyePos[1] * t,
        a: eyeDir[0],
        b: eyeDir[1],
        c: a[0],
        d: a[1],
        depth: eyePos[2]
      };
    };
    return [sideEye(-1), sideEye(1)];
  }

  function Vs(w, h) {
    const rw = Math.max(w, 0.01) / 2;
    const rh = Math.max(h, 0.01) / 2;
    const r = Math.min(rw, rh);
    return `M${Q(-rw)} ${Q(-rh + r)}A${Q(r)} ${Q(r)} 0 0 1 ${Q(-rw + r)} ${Q(-rh)}L${Q(rw - r)} ${Q(-rh)}A${Q(r)} ${Q(r)} 0 0 1 ${Q(rw)} ${Q(-rh + r)}L${Q(rw)} ${Q(rh - r)}A${Q(r)} ${Q(r)} 0 0 1 ${Q(rw - r)} ${Q(rh)}L${Q(-rw + r)} ${Q(rh)}A${Q(r)} ${Q(r)} 0 0 1 ${Q(-rw)} ${Q(rh - r)}Z`;
  }

  function Ws(w, h) {
    const rw = Math.max(w, 0.01) / 2;
    const topArcY = -12;
    const botArcY = -4;
    const baseLine = 8;
    return `M${Q(-rw)} ${baseLine} Q0 ${topArcY} ${Q(rw)} ${baseLine} Q0 ${botArcY} ${Q(-rw)} ${baseLine}Z`;
  }

  function gs(e) {
    return 0.06 + 0.94 * clamp(e, 0, 1);
  }

  // ---------------------------------------------------------------------------
  // 6. ENGINE STATE & PERSISTENCE
  // ---------------------------------------------------------------------------
  let activeShapeId = localStorage.getItem("sql_mascot_shape") || "galet";
  if (!SHAPES[activeShapeId]) activeShapeId = "galet";

  let activeColorId = localStorage.getItem("sql_mascot_color") || "encre";
  if (!COLORS[activeColorId]) activeColorId = "encre";

  let isIdleSnoozeEnabled = localStorage.getItem("sql_mascot_idle_snooze") !== "disabled";
  let isThemeSyncEnabled = localStorage.getItem("sql_mascot_theme_sync") === "true";

  let currentState = "idle"; // 'idle' | 'happy' | 'thinking' | 'wink' | 'wide' | 'alert' | 'sleep'
  let currentRadii = [...SHAPES[activeShapeId].radii];
  let targetRadii = [...SHAPES[activeShapeId].radii];

  function hexToRgb(hex) {
    const num = parseInt(hex.replace("#", ""), 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }

  function rgbToHex(rgb) {
    return "#" + rgb.map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, "0")).join("");
  }

  let currentRGB = hexToRgb(COLORS[activeColorId].hex);
  let targetRGB = hexToRgb(COLORS[activeColorId].hex);

  const NEUTRAL_GAZE = { yaw: 0, pitch: 0, roll: 0 };
  let currentGaze = { ...NEUTRAL_GAZE };
  let targetGaze = { ...NEUTRAL_GAZE };
  let pointerActive = false;
  let nextBlinkTime = performance.now() + 3200;

  // Elastic Physics (squash and stretch)
  let scaleX = 1;
  let scaleY = 1;
  let targetScaleY = 1;
  let velocityY = 0;

  // Blinking
  let blinkProgress = 0;
  let isBlinking = false;

  // Dragging & Idle Snooze
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let lastUserActivity = performance.now();
  let isAutoSleeping = false;
  const initializedAt = performance.now();

  let animFrameId = null;
  let bubbleTimeout = null;
  let isMinimized = false;
  let isCustomizerOpen = false;
  let isHovered = false;

  // ---------------------------------------------------------------------------
  // 7. REAL-TIME CURSOR & INTERACTION LISTENERS
  // ---------------------------------------------------------------------------
  function registerUserActivity() {
    lastUserActivity = performance.now();
    if (isAutoSleeping) {
      isAutoSleeping = false;
      setExpression("idle");
      targetScaleY = 1.25; // Surprised wake bounce!
      SOUNDS.playBloop(1.4);
      say("⚡ I'm awake! Ready for more SQL queries!", 4000, "happy");
    }
  }

  function initPointerListener() {
    window.addEventListener("pointermove", e => {
      registerUserActivity();
      if (currentState === "sleep" || isMinimized || isDragging) return;

      const sqlInput = document.getElementById("sqlInput");
      if (sqlInput && document.activeElement === sqlInput) return;

      const mascotEl = document.getElementById("sqlBuddyContainer");
      if (!mascotEl) return;

      const rect = mascotEl.getBoundingClientRect();
      const mascotCenterX = rect.left + rect.width / 2;
      const mascotCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - mascotCenterX;
      const dy = e.clientY - mascotCenterY;

      const halfW = Math.max(1, window.innerWidth * 0.5);
      const halfH = Math.max(1, window.innerHeight * 0.5);

      const nx = clamp(dx / halfW, -1, 1);
      const ny = clamp(dy / halfH, -1, 1);

      targetGaze.yaw = nx * 36;
      targetGaze.pitch = -ny * 24;
      targetGaze.roll = -nx * 6;

      pointerActive = true;
    });

    document.addEventListener("pointerleave", () => {
      pointerActive = false;
      targetGaze = { ...NEUTRAL_GAZE };
    });

    ["keydown", "click", "scroll"].forEach(evt => {
      window.addEventListener(evt, registerUserActivity, { passive: true });
    });
  }

  function initDragAndSquashListeners(unit) {
    if (!unit) return;

    unit.addEventListener("pointerdown", e => {
      if (e.target.closest(".bloub-customizer-card")) return;
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      unit.setPointerCapture(e.pointerId);
    });

    unit.addEventListener("pointermove", e => {
      if (!isDragging) return;
      const ddx = e.clientX - dragStartX;
      const ddy = e.clientY - dragStartY;
      targetScaleY = clamp(1 + ddy * 0.006 - Math.abs(ddx) * 0.002, 0.6, 1.45);
      scaleX = clamp(1 - ddy * 0.003 + Math.abs(ddx) * 0.005, 0.7, 1.4);
    });

    const finishDrag = e => {
      if (!isDragging) return;
      isDragging = false;
      try { unit.releasePointerCapture(e.pointerId); } catch (err) {}
      velocityY = -0.38; // Organic snap-back elastic bounce!
      targetScaleY = 1.0;
      SOUNDS.playBloop(0.85);
    };

    unit.addEventListener("pointerup", finishDrag);
    unit.addEventListener("pointercancel", finishDrag);
  }

  function initContextListeners() {
    // 1. SQL Editor focus, blur & typing
    const sqlInput = document.getElementById("sqlInput");
    if (sqlInput) {
      sqlInput.addEventListener("focus", () => {
        if (isMinimized) return;
        setExpression("thinking");
        targetGaze.yaw = -26;
        targetGaze.pitch = 20;
        targetGaze.roll = -5;
      });

      sqlInput.addEventListener("blur", () => {
        if (isMinimized) return;
        if (currentState === "thinking") setExpression("idle");
        targetGaze = { ...NEUTRAL_GAZE };
      });

      sqlInput.addEventListener("input", () => {
        if (isMinimized) return;
        targetScaleY = 0.94; // Micro-nod
      });
    }

    // 2. Run Query Button anticipation
    const btnRun = document.getElementById("btnRunQuery");
    if (btnRun) {
      btnRun.addEventListener("mouseenter", () => {
        if (isMinimized) return;
        setExpression("alert");
        targetGaze.yaw = -20;
        targetGaze.pitch = -8;
      });

      btnRun.addEventListener("mouseleave", () => {
        if (isMinimized) return;
        if (currentState === "alert") setExpression("idle");
      });
    }

    // 3. Execution Pipeline Stepper controls
    ["btnNextStep", "btnPrevStep", "btnPlayPause"].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener("click", () => {
          if (isMinimized) return;
          targetScaleY = 0.92;
        });
      }
    });

    // 4. MutationObserver for Theme Sync Mode
    if (window.MutationObserver) {
      const observer = new MutationObserver(() => {
        if (isThemeSyncEnabled) syncThemeColor();
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    }
  }

  // ---------------------------------------------------------------------------
  // 8. REAL-TIME 60 FPS ANIMATION LOOP
  // ---------------------------------------------------------------------------
  function update() {
    const now = performance.now();

    // 1. Idle Snooze Check
    if (isIdleSnoozeEnabled && !isMinimized && !isAutoSleeping && currentState !== "sleep") {
      if (now - lastUserActivity > 75000) {
        isAutoSleeping = true;
        setExpression("sleep");
        say("💤 Dozing off... Move your mouse or type when you need me!", 4000, "sleep");
      }
    }

    // 2. Smoothly morph shape radii
    for (let i = 0; i < N_PTS; i++) {
      currentRadii[i] += (targetRadii[i] - currentRadii[i]) * 0.12;
    }

    // 3. Smoothly morph body color
    for (let c = 0; c < 3; c++) {
      currentRGB[c] += (targetRGB[c] - currentRGB[c]) * 0.12;
    }

    // 4. Smooth spring interpolation for 3D gaze
    currentGaze.yaw += (targetGaze.yaw - currentGaze.yaw) * 0.16;
    currentGaze.pitch += (targetGaze.pitch - currentGaze.pitch) * 0.16;
    currentGaze.roll += (targetGaze.roll - currentGaze.roll) * 0.16;

    // 5. Natural Periodic Blink
    if (isBlinking) {
      blinkProgress += 0.09;
      if (blinkProgress >= 1) {
        blinkProgress = 0;
        isBlinking = false;
        nextBlinkTime = now + 3500 + Math.random() * 2500;
      }
    } else if (now > nextBlinkTime && currentState === "idle") {
      isBlinking = true;
      blinkProgress = 0;
    }
    const lid = isBlinking ? Math.max(0, 1 - Math.sin(blinkProgress * Math.PI)) : 1;

    // 6. Tactile Squash & Stretch Physics
    const spring = 0.18;
    const damping = 0.78;
    const forceY = (targetScaleY - scaleY) * spring;
    velocityY = (velocityY + forceY) * damping;
    scaleY += velocityY;
    targetScaleY += (1.0 - targetScaleY) * 0.1;
    scaleX = 1 / Math.sqrt(Math.max(0.2, scaleY));

    // 7. Shape Body is firmly ROOTED at (0, 0): zero floating, zero drift!
    const rot = 0;
    const cx = 0;
    const cy = (currentState === "sleep" ? 14 : 0);
    const sx = scaleX;
    const sy = scaleY;

    // 8. Render Spline Body Path
    const baseScale = 100;
    const sil = { radii: currentRadii, rot, cx, cy, sx, sy };
    const pts = js(sil, baseScale);
    const bodyD = Ms(pts);

    const bodyEl = document.getElementById("bloubBodyPath");
    const eyeGroup0 = document.getElementById("bloubEyeGroup0");
    const eyeGroup1 = document.getElementById("bloubEyeGroup1");
    const eye0El = document.getElementById("bloubEye0");
    const eye1El = document.getElementById("bloubEye1");

    if (bodyEl && eyeGroup0 && eyeGroup1 && eye0El && eye1El) {
      const activeColor = COLORS[activeColorId] || COLORS.encre;
      const currentHex = rgbToHex(currentRGB);

      bodyEl.setAttribute("d", bodyD);
      bodyEl.setAttribute("fill", currentHex);

      // 9. Authentic Original Proportion Eyes: 20px wide x 44px tall
      let baseW = 20;
      let baseH = 44;
      let open0 = 1;
      let open1 = 1;
      let tilt0 = 0;
      let tilt1 = 0;
      let isHappyArch0 = false;
      let isHappyArch1 = false;

      // Expressions & Reactions
      if (currentState === "happy") {
        isHappyArch0 = true;
        isHappyArch1 = true;
        baseW = 22;
        baseH = 38;
        tilt0 = -3;
        tilt1 = 3;
      } else if (isHovered && currentState === "idle") {
        tilt0 = -6;
        tilt1 = 6;
        baseW = 21;
      } else if (currentState === "sleep" || isMinimized) {
        open0 = 0.08;
        open1 = 0.08;
        baseH = 40;
      } else if (currentState === "wink") {
        open0 = 1;
        isHappyArch1 = true;
        baseW = 21;
      } else if (currentState === "wide") {
        baseW = 22;
        baseH = 50;
        tilt0 = -3;
        tilt1 = 3;
      } else if (currentState === "thinking") {
        baseW = 18;
        baseH = 38;
        tilt0 = -6;
        tilt1 = -6;
      } else if (currentState === "alert") {
        baseW = 19;
        baseH = 34;
      }

      open0 *= lid;
      open1 *= lid;

      // 10. 3D Spherical Eye Projection (16.8° split)
      const split = 16.8;
      const eyes3D = us(currentGaze, baseScale, split);

      for (let n = 0; n < 2; n++) {
        const eye3D = eyes3D[n];
        const eyeGroup = n === 0 ? eyeGroup0 : eyeGroup1;
        const eyeEl = n === 0 ? eye0El : eye1El;
        const isArch = n === 0 ? isHappyArch0 : isHappyArch1;

        if (!eyeGroup || !eyeEl) continue;

        if (eye3D.depth <= 0.02) {
          eyeGroup.setAttribute("opacity", "0");
          continue;
        }

        const s = Fs(currentRadii, Math.atan2(eye3D.y, eye3D.x) - rot);
        const posX = eye3D.x * s;
        const posY = eye3D.y * s;

        const tilt = (n === 0 ? tilt0 : tilt1) * Math.PI / 180;
        const cosT = Math.cos(tilt);
        const sinT = Math.sin(tilt);

        const d_m = eye3D.a * cosT + eye3D.c * sinT;
        const f_m = eye3D.b * cosT + eye3D.d * sinT;
        const p_m = -eye3D.a * sinT + eye3D.c * cosT;
        const m_m = -eye3D.b * sinT + eye3D.d * cosT;

        const openVal = gs(n === 0 ? open0 : open1);
        const alpha = clamp(eye3D.depth / 0.12, 0, 1);

        eyeGroup.setAttribute("transform", `matrix(${Q(d_m)},${Q(f_m * openVal)},${Q(p_m)},${Q(m_m * openVal)},${Q(posX)},${Q(posY + cy)})`);
        eyeGroup.setAttribute("opacity", Q(alpha));

        if (isArch) {
          eyeEl.setAttribute("d", Ws(baseW, baseH));
        } else {
          eyeEl.setAttribute("d", Vs(baseW, baseH));
        }

        eyeEl.setAttribute("fill", activeColor.eyeColor || "#ffffff");
      }
    }

    animFrameId = requestAnimationFrame(update);
  }

  // ---------------------------------------------------------------------------
  // 9. CONFETTI PARTICLE BURST SYSTEM
  // ---------------------------------------------------------------------------
  function triggerConfetti() {
    const container = document.getElementById("sqlBuddyContainer");
    if (!container) return;

    let wrap = document.getElementById("bloubConfettiWrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "bloubConfettiWrap";
      wrap.style.cssText = "position:absolute;bottom:65px;right:65px;width:0;height:0;pointer-events:none;z-index:10005;";
      container.appendChild(wrap);
    }

    const colors = ["#38bdf8", "#ec4899", "#f59e0b", "#10b981", "#8b5cf6", "#ef4444", "#3ecf8e", "#f1f5f9"];
    const words = ["★", "⚡", "SQL", "JOIN", "SELECT", "100%", "✨"];

    for (let i = 0; i < 24; i++) {
      const el = document.createElement("div");
      const isWord = Math.random() > 0.65;
      const color = colors[Math.floor(Math.random() * colors.length)];
      el.className = "bloub-confetti-particle";

      if (isWord) {
        el.innerText = words[Math.floor(Math.random() * words.length)];
        el.style.cssText = `position:absolute;color:${color};font-size:${10 + Math.random() * 4}px;font-weight:800;font-family:monospace;white-space:nowrap;`;
      } else {
        const size = 6 + Math.random() * 6;
        el.style.cssText = `position:absolute;width:${size}px;height:${size}px;background:${color};border-radius:${Math.random() > 0.5 ? "50%" : "2px"};`;
      }

      wrap.appendChild(el);

      let px = 0;
      let py = 0;
      let vx = (Math.random() - 0.5) * 13;
      let vy = -(Math.random() * 9 + 8);
      let rot = Math.random() * 360;
      let rotSpeed = (Math.random() - 0.5) * 18;
      const startT = performance.now();

      function step() {
        const elapsed = performance.now() - startT;
        if (elapsed > 1800) {
          el.remove();
          return;
        }
        px += vx;
        py += vy;
        vy += 0.38; // gravity
        rot += rotSpeed;
        el.style.transform = `translate(${px}px, ${py}px) rotate(${rot}deg)`;
        el.style.opacity = Math.max(0, 1 - elapsed / 1800);
        requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
  }

  // ---------------------------------------------------------------------------
  // 10. THEME SYNC ENGINE
  // ---------------------------------------------------------------------------
  function syncThemeColor() {
    if (!isThemeSyncEnabled) return;
    const theme = document.documentElement.getAttribute("data-theme") || "default";
    let matchedColor = "encre";

    if (theme.includes("pomegranate")) matchedColor = "rose";
    else if (theme.includes("jade")) matchedColor = "vert";
    else if (theme.includes("petrol")) matchedColor = "orange";
    else matchedColor = "encre";

    if (matchedColor !== activeColorId) {
      setColor(matchedColor);
    }
  }

  function toggleThemeSync() {
    isThemeSyncEnabled = !isThemeSyncEnabled;
    localStorage.setItem("sql_mascot_theme_sync", isThemeSyncEnabled.toString());
    if (isThemeSyncEnabled) {
      syncThemeColor();
      say("🎨 Theme Sync active! I'll auto-match the visualizer palette!", 3500, "happy");
    } else {
      say("🔒 Manual skin mode active.", 2500, "idle");
    }
    updateSettingsUI();
  }

  function toggleIdleSnooze() {
    isIdleSnoozeEnabled = !isIdleSnoozeEnabled;
    localStorage.setItem("sql_mascot_idle_snooze", isIdleSnoozeEnabled ? "enabled" : "disabled");
    say(isIdleSnoozeEnabled ? "💤 Auto-Snooze enabled (75s idle)." : "👁️ Always-awake mode active.", 3000, "idle");
    updateSettingsUI();
  }

  function toggleSound() {
    const unmuted = SOUNDS.toggleMute();
    say(unmuted ? "🔊 Audio sound FX enabled!" : "🔇 Audio muted.", 2500, "idle");
    updateSettingsUI();
  }

  // ---------------------------------------------------------------------------
  // 11. CONTROLS & SELECTION API
  // ---------------------------------------------------------------------------
  function setShape(shapeId) {
    if (!SHAPES[shapeId]) return;
    activeShapeId = shapeId;
    localStorage.setItem("sql_mascot_shape", shapeId);
    targetRadii = [...SHAPES[shapeId].radii];
    targetScaleY = 0.76;
    updateSettingsUI();
    SOUNDS.playMorph();
  }

  function setColor(colorId) {
    if (!COLORS[colorId]) return;
    activeColorId = colorId;
    localStorage.setItem("sql_mascot_color", colorId);
    targetRGB = hexToRgb(COLORS[colorId].hex);
    updateSettingsUI();
    SOUNDS.playBloop(0.9);
  }

  function setExpression(state) {
    currentState = state;
    if (state === "wide" || state === "happy") {
      targetScaleY = 1.25;
    } else if (state === "alert") {
      targetScaleY = 0.82;
    } else if (state === "sleep") {
      targetScaleY = 0.75;
    }
  }

  function toggleCustomizer(forceOpen) {
    if (typeof forceOpen === "boolean") {
      isCustomizerOpen = forceOpen;
    } else {
      isCustomizerOpen = !isCustomizerOpen;
    }
    if (isCustomizerOpen && isMinimized) {
      toggleMinimize();
    }
    const panel = document.getElementById("bloubCustomizerPanel");
    if (panel) {
      panel.style.display = isCustomizerOpen ? "block" : "none";
      if (isCustomizerOpen) {
        panel.classList.remove("fade-in");
        void panel.offsetWidth;
        panel.classList.add("fade-in");
        updateSettingsUI();
        SOUNDS.playBloop(1.2);
      }
    }
  }

  function updateSettingsUI() {
    document.querySelectorAll(".bloub-shape-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.shape === activeShapeId);
    });
    document.querySelectorAll(".bloub-color-swatch").forEach(swatch => {
      swatch.classList.toggle("active", swatch.dataset.color === activeColorId);
    });

    const sndPill = document.getElementById("bloubSoundPill");
    if (sndPill) {
      sndPill.innerText = SOUNDS.isAudioEnabled() ? "🔊 Sound: ON" : "🔇 Muted";
      sndPill.classList.toggle("active", SOUNDS.isAudioEnabled());
    }

    const snoozePill = document.getElementById("bloubSnoozePill");
    if (snoozePill) {
      snoozePill.innerText = isIdleSnoozeEnabled ? "💤 Snooze: ON" : "🚫 Always On";
      snoozePill.classList.toggle("active", isIdleSnoozeEnabled);
    }

    const themePill = document.getElementById("bloubThemePill");
    if (themePill) {
      themePill.innerText = isThemeSyncEnabled ? "🎨 Theme Sync: ON" : "🔒 Manual";
      themePill.classList.toggle("active", isThemeSyncEnabled);
    }

    const sleepPill = document.getElementById("bloubSleepPill");
    if (sleepPill) {
      sleepPill.innerText = isMinimized ? "💤 Sleeping" : "👁️ Active";
      sleepPill.classList.toggle("active", isMinimized);
    }
  }

  // ---------------------------------------------------------------------------
  // 12. HTML BUILDER (CLEAN DEDICATED SECTIONS)
  // ---------------------------------------------------------------------------
  function buildCustomizerHTML() {
    // 1. Shape Buttons
    const shapeButtons = Object.values(SHAPES).map(s => `
      <button class="bloub-shape-btn ${s.id === activeShapeId ? "active" : ""}" 
              data-shape="${s.id}" 
              title="${s.name}" 
              onclick="event.stopPropagation(); SQL_BUDDY.setShape('${s.id}')">
        <span class="bloub-shape-icon">${s.icon}</span>
        <span class="bloub-shape-label">${s.name}</span>
      </button>
    `).join("");

    // 2. Color Swatches
    const colorSwatches = Object.values(COLORS).map(c => `
      <button class="bloub-color-swatch ${c.id === activeColorId ? "active" : ""}" 
              data-color="${c.id}" 
              title="${c.name} (${c.hex})" 
              style="background-color: ${c.hex};" 
              onclick="event.stopPropagation(); SQL_BUDDY.setColor('${c.id}')">
      </button>
    `).join("");

    return `
      <div id="bloubCustomizerPanel" class="bloub-customizer-card" style="display: none;">
        <!-- Header -->
        <div class="bloub-customizer-header">
          <div class="bloub-customizer-title-wrap">
            <span class="bloub-dna-icon">✨</span>
            <span class="bloub-customizer-title">MASCOT & COMPANION SETTINGS</span>
          </div>
          <button class="bloub-customizer-close" onclick="event.stopPropagation(); SQL_BUDDY.toggleCustomizer()">&times;</button>
        </div>

        <!-- SECTION 1: CONTROLS & BEHAVIOR -->
        <div class="bloub-section-header">
          <div class="bloub-section-title"><span>⚙️</span> SECTION 1: CONTROLS & BEHAVIOR</div>
          <span class="bloub-section-badge">AUTONOMOUS</span>
        </div>
        <div class="bloub-settings-list">
          <div class="bloub-setting-item">
            <div class="bloub-setting-info"><span>🔊</span> Audio Effects</div>
            <button id="bloubSoundPill" class="bloub-toggle-pill ${SOUNDS.isAudioEnabled() ? "active" : ""}" onclick="event.stopPropagation(); SQL_BUDDY.toggleSound();">
              ${SOUNDS.isAudioEnabled() ? "🔊 Sound: ON" : "🔇 Muted"}
            </button>
          </div>
          <div class="bloub-setting-item">
            <div class="bloub-setting-info"><span>💤</span> Auto-Snooze (75s)</div>
            <button id="bloubSnoozePill" class="bloub-toggle-pill ${isIdleSnoozeEnabled ? "active" : ""}" onclick="event.stopPropagation(); SQL_BUDDY.toggleIdleSnooze();">
              ${isIdleSnoozeEnabled ? "💤 Snooze: ON" : "🚫 Always On"}
            </button>
          </div>
          <div class="bloub-setting-item">
            <div class="bloub-setting-info"><span>🎨</span> Theme Sync</div>
            <button id="bloubThemePill" class="bloub-toggle-pill ${isThemeSyncEnabled ? "active" : ""}" onclick="event.stopPropagation(); SQL_BUDDY.toggleThemeSync();">
              ${isThemeSyncEnabled ? "🎨 Theme Sync: ON" : "🔒 Manual"}
            </button>
          </div>
          <div class="bloub-setting-item">
            <div class="bloub-setting-info"><span>😴</span> Sleep Mode</div>
            <button id="bloubSleepPill" class="bloub-toggle-pill ${isMinimized ? "active" : ""}" onclick="event.stopPropagation(); SQL_BUDDY.toggleMinimize();">
              ${isMinimized ? "💤 Sleeping" : "👁️ Active"}
            </button>
          </div>
        </div>

        <!-- SECTION 2: MORPH SHAPE -->
        <div class="bloub-section-header">
          <div class="bloub-section-title"><span>🪨</span> SECTION 2: MORPH SHAPE</div>
          <span class="bloub-section-badge">${Object.keys(SHAPES).length} SHAPES</span>
        </div>
        <div class="bloub-shapes-grid">
          ${shapeButtons}
        </div>

        <!-- SECTION 3: COLOR PALETTE -->
        <div class="bloub-section-header">
          <div class="bloub-section-title"><span>🎨</span> SECTION 3: COLOR PALETTE</div>
          <span class="bloub-section-badge">${Object.keys(COLORS).length} SKINS</span>
        </div>
        <div class="bloub-colors-grid">
          ${colorSwatches}
        </div>

        <!-- SECTION 4: EXPRESSIONS & CELEBRATION -->
        <div class="bloub-section-header">
          <div class="bloub-section-title"><span>😄</span> SECTION 4: EXPRESSIONS</div>
          <span class="bloub-section-badge">INTERACTION</span>
        </div>
        <div class="bloub-expr-row">
          <button class="bloub-expr-btn" onclick="event.stopPropagation(); SQL_BUDDY.setExpression('idle')">Neutral</button>
          <button class="bloub-expr-btn" onclick="event.stopPropagation(); SQL_BUDDY.setExpression('happy')">Happy</button>
          <button class="bloub-expr-btn" onclick="event.stopPropagation(); SQL_BUDDY.setExpression('wink')">Wink</button>
          <button class="bloub-expr-btn" onclick="event.stopPropagation(); SQL_BUDDY.setExpression('thinking')">Thinking</button>
          <button class="bloub-expr-btn" onclick="event.stopPropagation(); SQL_BUDDY.setExpression('alert')">Alert</button>
        </div>

        <button class="bloub-celebrate-btn" onclick="event.stopPropagation(); SQL_BUDDY.celebrate();">
          <span>🎊</span> Launch Confetti Burst
        </button>
      </div>
    `;
  }

  // ---------------------------------------------------------------------------
  // 13. INITIALIZATION & MOUNT
  // ---------------------------------------------------------------------------
  function init() {
    let container = document.getElementById("sqlBuddyContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "sqlBuddyContainer";
      container.className = "sql-buddy-container";
      document.body.appendChild(container);
    }

    container.innerHTML = `
      ${buildCustomizerHTML()}

      <!-- Speech Bubble -->
      <div id="buddySpeechBubble" class="buddy-speech-bubble" style="display: none;">
        <div class="buddy-bubble-header">
          <div class="buddy-header-left">
            <span class="buddy-avatar-dot"></span>
            <span class="buddy-name">Sir Bloops-a-Lot</span>
            <span class="buddy-badge">Chief Query Gremlin</span>
          </div>
          <button class="buddy-close-speech" onclick="SQL_BUDDY.hideSpeech()">&times;</button>
        </div>
        <div id="buddySpeechText" class="buddy-speech-text">Ready to master SQL? Click me for tips or 🎨 in the header to customize!</div>
      </div>

      <!-- Clean Living Avatar Unit (Authentic Original Bloub Silhouette) -->
      <div class="buddy-interactive-unit" onclick="SQL_BUDDY.poke()">
        <div class="buddy-svg-wrapper">
          <svg class="bloub-svg" viewBox="-158 -158 316 316" width="140" height="140" xmlns="http://www.w3.org/2000/svg">
            <!-- Body Spline (Firmly rooted at 0, 0) -->
            <path id="bloubBodyPath" d="" fill="#0a0a0c" />

            <!-- Authentic Minimalist 3D Spherical Pill Eyes -->
            <g id="bloubEyeGroup0">
              <path id="bloubEye0" d="" fill="#ffffff" />
            </g>
            <g id="bloubEyeGroup1">
              <path id="bloubEye1" d="" fill="#ffffff" />
            </g>
          </svg>
        </div>
      </div>
    `;

    initPointerListener();
    initContextListeners();

    const unit = container.querySelector(".buddy-interactive-unit");
    if (unit) {
      initDragAndSquashListeners(unit);
      unit.addEventListener("mouseenter", () => {
        isHovered = true;
        SOUNDS.playBloop(1.3);
      });
      unit.addEventListener("mouseleave", () => {
        isHovered = false;
      });
    }

    // Direct listener for header Mascot settings button
    const btnTrigger = document.getElementById("btnCompanionTrigger");
    if (btnTrigger) {
      btnTrigger.onclick = function (e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        toggleCustomizer();
      };
    }

    // Start 60fps Living Mascot Animation Loop
    if (animFrameId) cancelAnimationFrame(animFrameId);
    animFrameId = requestAnimationFrame(update);

    // Initial Greeting
    setTimeout(() => {
      say("👋 Ahoy! I'm Sir Bloops-a-Lot, your living SQL companion! Let's conquer Section 01 together!", 6000, "happy");
    }, 1200);

    // If theme sync active, sync now
    if (isThemeSyncEnabled) syncThemeColor();
  }

  // ---------------------------------------------------------------------------
  // 14. SPEECH & EVENT ACTIONS
  // ---------------------------------------------------------------------------
  function say(message, duration = 5000, expression = "happy") {
    if (isMinimized && expression !== "sleep") return;
    setExpression(expression);

    // Sync with sidebar companion station if present
    const sidebarSpeech = document.getElementById("companionSpeechContent");
    if (sidebarSpeech) sidebarSpeech.textContent = message;

    const bubble = document.getElementById("buddySpeechBubble");
    const textEl = document.getElementById("buddySpeechText");
    if (!bubble || !textEl) return;

    textEl.innerText = message;
    bubble.style.display = "block";
    bubble.classList.remove("pop-anim");
    void bubble.offsetWidth;
    bubble.classList.add("pop-anim");

    if (bubbleTimeout) clearTimeout(bubbleTimeout);
    if (duration > 0) {
      bubbleTimeout = setTimeout(() => {
        hideSpeech();
        if (currentState !== "sleep") setExpression("idle");
      }, duration);
    }
  }

  function hideSpeech() {
    const bubble = document.getElementById("buddySpeechBubble");
    if (bubble) bubble.style.display = "none";
  }

  let questStreak = 0;

  const POKE_QUIPS = [
    "Squish! 🫧 Hey, that tickles my relational B-tree indexes!",
    "Boing! 🎾 Warning: Poking the Gremlin may cause unexpected table locks!",
    "Ayo! 🐙 Keep your cursor on the query terminal, human!",
    "Bloop! 💧 I'm 90% jelly, 10% pure ANSI SQL compliance!",
    "Ouch! ⚡ Don't poke me or I'll DROP your temporary tables!",
    "Giggle! 🪼 That's a primary key violation on my personal space!",
    "Squishy squish! 🍮 Chief Query Gremlin reporting for duty!",
    "Hehehe! 🚀 Feed me valid SQL syntax and I'll jump even higher!",
    "Whoa! 🌪️ My coordinates just drifted by 14 float points!",
    "Bzzzt! 🐝 Gremlin status: fully operational and caffeinated!"
  ];

  function poke() {
    if (isDragging) return;
    targetScaleY = 0.64;
    scaleX = 1.36;
    velocityY = -0.18;

    const quip = POKE_QUIPS[Math.floor(Math.random() * POKE_QUIPS.length)];
    const expressions = ["wide", "wink", "happy"];
    const chosenExp = expressions[Math.floor(Math.random() * expressions.length)];

    SOUNDS.playBloop(0.8 + Math.random() * 0.8);
    say(quip, 5000, chosenExp);
  }

  function celebrate() {
    targetScaleY = 1.45;
    velocityY = -0.4;
    SOUNDS.playSuccess();
    triggerConfetti();
    say("🎉 Woohoo! Let's celebrate relational data mastery!", 4500, "happy");
  }

  function onCorrectQuestAnswer(questTitle) {
    questStreak++;
    let praise = "";
    let isSuperCombo = false;

    if (questStreak === 3) {
      praise = "⚡ COMBO x3! You're on fire! Sir Bloops is vibrating with pure relational energy! 🔥";
      targetScaleY = 1.6;
      velocityY = -0.55;
    } else if (questStreak === 5) {
      praise = "🔥 5-IN-A-ROW! UNSTOPPABLE STREAK! 💥 Sir Bloops is doing backflips in the query cache!";
      targetScaleY = 1.75;
      velocityY = -0.65;
      isSuperCombo = true;
    } else if (questStreak === 10) {
      praise = "👑 10-QUEST STREAK OF THE GODS! 🏆 YOU ARE AN ABSOLUTE SQL DEITY! Sir Bloops is weeping tears of joy!";
      targetScaleY = 1.95;
      velocityY = -0.78;
      isSuperCombo = true;
    } else {
      const woohooPraises = [
        "HAPPY WOOHOO! 🎉 Nailed it! Look at that relational beauty! You're a SQL wizard!",
        "WOOHOO! 🚀 Zero syntax errors! The query optimizer is weeping tears of pure joy!",
        "HAPPY WOOHOO! ⚡ That's how it's done! Pure algorithmic brilliance!",
        "WOOHOO! 🌟 Flawless projection logic! 100% certified database sorcery!",
        "HAPPY WOOHOO! 🏆 Boom! Level conquered! Keep that streak rolling!"
      ];
      praise = woohooPraises[Math.floor(Math.random() * woohooPraises.length)];
      targetScaleY = 1.48; // High joyful bounce!
      velocityY = -0.46;
    }

    setExpression("happy");
    SOUNDS.playSuccess();
    triggerConfetti();

    if (isSuperCombo) {
      setTimeout(triggerConfetti, 350);
      setTimeout(() => SOUNDS.playBloop(1.5), 300);
    }

    say(praise, 5500, "happy");

    const moodTag = document.getElementById("companionMoodTag");
    if (moodTag) {
      moodTag.textContent = questStreak >= 3 
        ? `Mood: MEGA WOOHOO! 🔥 (Streak: ${questStreak})` 
        : `Mood: HAPPY WOOHOO! 🎉 (Streak: ${questStreak})`;
    }
  }

  function onIncorrectQuestAnswer() {
    questStreak = 0; // Reset combo streak
    const oopsLines = [
      "Oof! My jelly hurts! 😭 Not quite right! Check the red blanks and try another keyword!",
      "Awww nope! 🙈 Even the best query engines stumble! Swap those tokens and try again!",
      "Yikes! Syntax police just pulled us over! 🚨 Take another look at the blank options!",
      "Ouch! 💔 Almost had it! Remember the keyword execution order and give it another shot!",
      "Uh oh! 🌧️ My slime senses a logic mismatch! Try checking the schema hint!"
    ];
    const line = oopsLines[Math.floor(Math.random() * oopsLines.length)];
    targetScaleY = 0.62; // Sad droop squish
    scaleX = 1.38;
    setExpression("alert");
    SOUNDS.playAlert();
    say(line, 6000, "alert");

    const moodTag = document.getElementById("companionMoodTag");
    if (moodTag) moodTag.textContent = "Mood: Ouch! 🤕 (Streak reset)";
  }

  function onCorrectAnswer(contextName) {
    const praises = [
      `🎉 BOOM! 100% Correct on ${contextName || "that question"}! Pure database elegance!`,
      `⭐ Flawless relational logic! Keep that streak rolling!`,
      `🔥 Outstanding! The query execution planner bows before you!`,
      `⚡ Verified & Passed! Your SQL mastery level is skyrocketing!`
    ];
    const praise = praises[Math.floor(Math.random() * praises.length)];
    targetScaleY = 1.32;
    SOUNDS.playSuccess();
    triggerConfetti();
    say(praise, 5500, "happy");
  }

  function onIncorrectAnswer(hintText) {
    const msg = hintText ? `🤔 Not quite! Hint: ${hintText}` : `😅 Close one! Review the execution lifecycle order and try again!`;
    SOUNDS.playAlert();
    say(msg, 6000, "alert");
  }

  function onQueryRunSuccess(rowCount) {
    if (performance.now() - initializedAt < 2500) return;
    targetScaleY = 1.28;
    SOUNDS.playSuccess();
    triggerConfetti();
    say(`🚀 Query executed successfully! Returned ${rowCount} row${rowCount === 1 ? "" : "s"}. Clean execution plan!`, 4500, "happy");
  }

  function onQueryRunError(errorMsg) {
    if (performance.now() - initializedAt < 2500) return;
    const trimmed = (errorMsg || "Syntax error").substring(0, 65);
    SOUNDS.playAlert();
    say(`⚠️ Engine caught an error: "${trimmed}". Check your aliases and clauses!`, 6000, "alert");
  }

  function toggleMinimize() {
    isMinimized = !isMinimized;
    const container = document.getElementById("sqlBuddyContainer");
    if (container) {
      container.classList.toggle("minimized", isMinimized);
      if (isMinimized) {
        hideSpeech();
        setExpression("sleep");
      } else {
        SOUNDS.playBloop(1.0);
        setExpression("idle");
      }
    }
    updateSettingsUI();
  }

  return {
    init,
    say,
    poke,
    celebrate,
    triggerConfetti,
    setShape,
    setColor,
    toggleSound,
    toggleIdleSnooze,
    toggleThemeSync,
    setExpression,
    hideSpeech,
    toggleCustomizer,
    toggleMinimize,
    onCorrectAnswer,
    onIncorrectAnswer,
    onCorrectQuestAnswer,
    onIncorrectQuestAnswer,
    onQueryRunSuccess,
    onQueryRunError,
    SHAPES,
    COLORS
  };
})();

// Export to global window object
window.SQL_BUDDY = SQL_BUDDY;

// Auto-mount
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", SQL_BUDDY.init);
} else {
  SQL_BUDDY.init();
}
