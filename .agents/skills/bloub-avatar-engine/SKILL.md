---
name: bloub-avatar-engine
description: Design, implement, and customize living SVG morphing mascots (Bloub / Grok bot architecture) with 3D spherical gaze projection, Pixar/Kawaii depth catchlights, soft 3D blushing cheeks, autonomous Web Audio sound synthesis, slime drag physics, and context-aware IDE reactions.
---

# Bloub Living Avatar & Mascot Engine

A complete guide and technical reference for implementing, customizing, and scaling living vector mascots based on the reverse-engineered architectures of `bloub.vercel.app` (x.ai / Grok bot) and `avatars.bible-strong.app` (Bible Strong Avatar Lab).

---

## 1. Core Architecture Principles

1. **Pure Vector Geometry & Clean Silhouette**:
   - Zero background boxes, zero shadow circles, and zero glowing halos.
   - Zero floating buttons or icons on top of the mascot's head.
   - Transparent SVG canvas (`viewBox="-158 -158 316 316"`).
2. **Fixed Body Anchor (Zero Drift)**:
   - Body center stays firmly anchored at `(cx = 0, cy = 0)` with resting scale `(sx = 1, sy = 1)`.
   - Motion is strictly decoupled: eyes track the cursor across 3D spherical space while the body remains rooted.
3. **Decoupled Eyelids & Gaze**:
   - Gaze yaw/pitch/roll interpolate independently from eyelid blinking and squashing.
4. **Autonomous Tactility**:
   - Jelly squash-and-stretch physics (`targetScaleY = 0.72`) on poke or click.
   - Slime drag and snap-back elastic bounce physics on pointer interactions.
   - Built-in zero-dependency Web Audio synthesizer for bloop pops and chimes with mute toggle.

---

## 2. Mathematical Foundations

### 64-Point Spline Body Generation
A silhouette is defined by 64 polar radii normalized around `1.0`.

```javascript
const N_PTS = 64;
const Ts = Array.from({ length: N_PTS }, (_, t) => (t / N_PTS) * (Math.PI * 2));
const Es = Ts.map(Math.cos);
const Ds = Ts.map(Math.sin);

// Transform polar radii to 2D Cartesian spline control points
function js(sil, scale, out = []) {
  const cosR = Math.cos(sil.rot || 0);
  const sinR = Math.sin(sil.rot || 0);
  const sx = sil.sx || 1, sy = sil.sy || 1;
  const cx = sil.cx || 0, cy = sil.cy || 0;

  for (let a = 0; a < N_PTS; a++) {
    const r = sil.radii[a] ?? 1;
    const x0 = r * Es[a];
    const y0 = r * Ds[a];
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

// Convert 64 control points into a smooth Catmull-Rom / Cubic Bézier SVG path
function Ms(points, tension = 1 / 6) {
  const n = points.length;
  if (n < 3) return "";
  let d = `M${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let i = 0; i < n; i++) {
    const prev = points[(i - 1 + n) % n];
    const curr = points[i];
    const next = points[(i + 1) % n];
    const nextNext = points[(i + 2) % n];
    const cp1x = curr.x + (next.x - prev.x) * tension;
    const cp1y = curr.y + (next.y - prev.y) * tension;
    const cp2x = next.x - (nextNext.x - curr.x) * tension;
    const cp2y = next.y - (nextNext.y - curr.y) * tension;
    d += `C${cp1x.toFixed(2)} ${cp1y.toFixed(2)} ${cp2x.toFixed(2)} ${cp2y.toFixed(2)} ${next.x.toFixed(2)} ${next.y.toFixed(2)}`;
  }
  return `${d}Z`;
}
```

### 3D Spherical Gaze Projection
Maps cursor coordinates to 3D rotation angles (`yaw`, `pitch`, `roll`) and projects eye & cheek positions onto the curved surface of the avatar's body:

```javascript
function ls(e, t, n) {
  const r = Math.cos(n), i = Math.sin(n);
  return [
    [e[0] * r + t[0] * i, e[1] * r + t[1] * i, e[2] * r + t[2] * i],
    [t[0] * r - e[0] * i, t[1] * r - e[1] * i, t[2] * r - e[2] * i]
  ];
}

function us(gaze, t, split = 16.8) {
  let r = [0, 0, 1], i = [1, 0, 0], a = [0, 1, 0];
  const cs = deg => deg * Math.PI / 180;
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
```

---

## 3. Eye Anatomy & Proportions

1. **Grok / Freddy Capsule Ratio**:
   - Width: `26px`, Height: `56px` (at `baseScale = 100`).
   - Angular split: `16.8°` (balanced cute separation).
   - Vertical elevation: `-6px` offset above equator for an alert, intelligent look.
2. **Capsule Pill Path (`Vs`)**:
   - `M -rw, -rh+r A r,r ... L rw-r, -rh ...` centered perfectly at `(0, 0)`.
3. **Kawaii Happy Arch (`Ws`)**:
   - Transforms into an upward smiling crescent `^ ^` on celebrations, quiz passes, and hover:
   ```javascript
   function Ws(w, h) {
     const rw = Math.max(w, 0.01) / 2;
     return `M${-rw} 8 Q0 -12 ${rw} 8 Q0 -4 ${-rw} 8Z`;
   }
   ```
4. **Specular Eye Catchlights**:
   - Primary glint: `rx: 3.5, ry: 5.5` at `(4, -14)`.
   - Secondary sparkle: `r: 1.8` at `(-3, 8)`.
   - Embedded within each `<g id="bloubEyeGroup">` so highlights foreshorten and squash together with blinking and matrix perspective.

---

## 4. Slime Drag Physics & Confetti Particles

- **Slime Drag**: Pointer-down dragging applies proportional strain to `targetScaleY` and `scaleX`. On pointer-up release, a negative momentum impulse (`velocityY = -0.38`) triggers an organic decaying oscillation wobble.
- **Confetti Engine**: Spawns 24 lightweight floating particles (circles, squares, and keyword badges `SELECT`, `JOIN`, `★`) with initial velocity and gravity on query success and quiz completions.

---

## 5. Autonomous Web Audio Synth (`SOUNDS`)

Zero-dependency audio engine utilizing native `AudioContext` with mute toggle:

```javascript
const SOUNDS = (() => {
  let ctx = null;
  let isMuted = localStorage.getItem("sql_mascot_sound_muted") === "true";

  function getContext() {
    if (isMuted) return null;
    if (!ctx && (window.AudioContext || window.webkitAudioContext)) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctx && ctx.state === "suspended") ctx.resume().catch(() => {});
    return ctx;
  }

  function toggleMute() {
    isMuted = !isMuted;
    localStorage.setItem("sql_mascot_sound_muted", isMuted.toString());
    return !isMuted;
  }

  function playBloop(pitch = 1.0) {
    const ac = getContext();
    if (!ac) return;
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
  }

  function playSuccess() {
    const ac = getContext();
    if (!ac) return;
    const now = ac.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
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
  }

  return { playBloop, playSuccess, toggleMute };
})();
```

---

## 6. Public API Methods

| Method | Parameters | Description |
|---|---|---|
| `SQL_BUDDY.say(msg, duration, expr)` | `(string, number, string)` | Show speech bubble with expression |
| `SQL_BUDDY.poke()` | `()` | Trigger jelly bounce, bloop pop, and random tip |
| `SQL_BUDDY.celebrate()` | `()` | Trigger confetti burst, victory chime, and smile |
| `SQL_BUDDY.setShape(shapeId)` | `('galet'\|'squircle'\|...)` | Morph to one of 8 authentic shapes |
| `SQL_BUDDY.setColor(colorId)` | `('encre'\|'creme'\|...)` | Smoothly lerp body RGB and eye fill |
| `SQL_BUDDY.toggleSound()` | `()` | Toggle mute state for audio effects |
| `SQL_BUDDY.toggleThemeSync()` | `()` | Toggle auto theme palette matching |
| `SQL_BUDDY.toggleIdleSnooze()`| `()` | Toggle 75s auto-sleep timer |
| `SQL_BUDDY.toggleMinimize()` | `()` | Toggle sleep mode |
| `SQL_BUDDY.onCorrectAnswer(topic)`| `(string)` | Celebrate quiz or gym challenge pass |
| `SQL_BUDDY.onQueryRunSuccess(rows)`| `(number)` | Execution plan success celebration |
| `SQL_BUDDY.onQueryRunError(err)` | `(string)` | Diagnostic expression on syntax error |
