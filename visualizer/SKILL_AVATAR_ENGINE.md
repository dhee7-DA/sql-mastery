# Bloub Avatar Engine Specification & Architectural Skill

A reference guide for the living SVG morphing companion mascot in the SQL Mastery Visualizer.

---

## 📐 High-Level Design Architecture
The avatar engine (`buddy_engine.js`) implements a living vector character rooted in the bottom-right corner of the visualizer.

### Key Specifications:
1. **Zero Canvas Halos**:
   - Zero drop shadows, boxes, background disks, or halos.
   - Transparent SVG viewport (`viewBox="-158 -158 316 316"`).
2. **Fixed Body Anchor**:
   - Body center: `(cx: 0, cy: 0)` with fixed scale `(sx: 1, sy: 1)`.
   - Motion is strictly decoupled: eyes track the cursor across 3D spherical space while the body remains rooted.
3. **3D Spherical Gaze Tracking**:
   - Cursor screen coordinates are normalized against the window center.
   - Rotations are computed in 3D (`yaw: ±36°`, `pitch: ±24°`, `roll: ±6°`) and mapped onto the curved surface of whatever active shape is chosen.
4. **Kawaii & Pixar Eye Proportions**:
   - Eye capsules: `26px × 56px` with vertical elevation offset `-6px`.
   - Angular eye split: `16.8°` for optimal cute separation.
   - Dual-point specular catchlights (upper-right glint + lower-left micro-sparkle) that squash realistically with eyelids.
   - Smiling eye arches `^ ^` (`Ws` Bézier path) when celebrating or hovered.
5. **3D Blushing Cheeks**:
   - Positioned in 3D spherical space at `27.5°`, rotating around the head with foreshortening.
   - Rendered using radial gradients (`#bloubCheekGrad0` / `#bloubCheekGrad1`).
   - Opacity smoothly fades in (`blushOpacity -> 0.65 – 0.80`) on hover, success, and praise.
6. **Autonomous Web Audio Pop Synth**:
   - Integrated zero-dependency Web Audio synthesizer.
   - Tactile bubble pops (`460Hz -> 880Hz`), morph sweeps, victory chimes (C5->E5->G5->C6), and diagnostic caution tones.
7. **Context-Aware IDE Awareness**:
   - Typing into `#sqlInput` shifts the mascot's gaze to the editor in a `"thinking"` pose with micro-nods.
   - Hovering `#btnRunQuery` triggers an alert anticipatory stance.
   - Successful query runs trigger celebration bounces, smiling eyes, victory chimes, and row counts.
   - Syntax errors trigger supportive hints and alert expressions.

---

## 🗂️ Files in this Feature
- `visualizer/buddy_engine.js`: The standalone avatar engine.
- `visualizer/style.css`: Transparent layout and floating customizer panel.
- `visualizer/app.js`: Telemetry and query pipeline integration hooks.
- `visualizer/index.html`: DOM mount container and script cache busting.
- `.agents/skills/bloub-avatar-engine/SKILL.md`: Reusable workspace agent skill.
