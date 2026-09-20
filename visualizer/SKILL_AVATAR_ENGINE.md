# Bloub Mascot Engine Specification & Skill Reference

A reference guide for the living SVG morphing companion mascot in the SQL Mastery Visualizer.

---

## 📐 Design Architecture
The avatar engine (`buddy_engine.js`) implements a living vector character rooted in the bottom-right corner of the visualizer.

### Key Specifications:
1. **100% Clean Silhouette (Zero Head Clutter)**:
   - Zero floating buttons or icons on top of the avatar's head.
   - Zero background disks, boxes, or halos.
   - Transparent SVG viewport (`viewBox="-158 -158 316 316"`).
2. **Fixed Body Anchor (Zero Floating / Drift)**:
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
   - Integrated zero-dependency Web Audio synthesizer with mute toggle (`🔊 / 🔇`).
   - Tactile bubble pops (`460Hz -> 880Hz`), morph sweeps, victory chimes (C5->E5->G5->C6), and diagnostic caution tones.
7. **Tactile Slime / Jelly Drag Physics**:
   - Pointer-down dragging stretches avatar body toward cursor like elastic slime.
   - Pointer-up release triggers high-elasticity decaying spring bounce (`velocityY = -0.38`).
8. **Interactive Particles & Snooze**:
   - 🎊 **Micro-Confetti**: 24 vector particles + SQL keyword chips (`SELECT`, `JOIN`, `★`, `100%`) burst on query success & quiz pass.
   - 💤 **Idle Snooze**: Auto-dozes after 75s of inactivity with rising Zzz bubbles, waking with a surprised bounce on mouse move or keypress.
9. **Context-Aware IDE Awareness & Theme Sync**:
   - Typing into `#sqlInput` shifts the mascot's gaze to the editor in a `"thinking"` pose with micro-nods.
   - Hovering `#btnRunQuery` triggers an alert anticipatory stance.
   - Successful query runs trigger celebration bounces, smiling eyes, victory chimes, and row counts.
   - Theme Sync mode automatically adapts skin color to the active visualizer theme.

---

## 🎛️ Settings UI Architecture
- **Header Settings Button (`#btnCompanionTrigger`)**: Located in the application header right next to the Theme Selector (`🎨 Mascot`), providing instantaneous access without cluttering the avatar.
- **Dedicated Mascot Settings Card (`#bloubCustomizerPanel`)**:
  - Docked cleanly beside the avatar (`bottom: 0px; right: 155px;`) so the avatar remains fully visible and unobstructed while customizing.
  - Divided into 4 distinct sections:
    - **SECTION 1: CONTROLS & BEHAVIOR**: Audio Effects (`🔊 / 🔇`), Auto-Snooze (`💤 / 🚫`), Theme Sync (`🎨 / 🔒`), and Sleep Mode.
    - **SECTION 2: MORPH SHAPE**: 8 Authentic shapes (Pebble, Squircle, Circle, Capsule, Triangle, Hexagon, Cloud, Droplet).
    - **SECTION 3: COLOR PALETTE**: 12 Authentic skins (Ink, Cream, Emerald, Azure, Amber, Purple, Crimson, Flame, Turquoise, Pink, Grey, Brown).
    - **SECTION 4: EXPRESSIONS & CELEBRATION**: 5 moods (Neutral, Happy, Wink, Thinking, Alert) + **🎊 Launch Confetti Burst** button.

---

## 🗂️ Files in this Feature
- `visualizer/buddy_engine.js`: Mascot engine, physics, Web Audio synth, and reactions.
- `visualizer/style.css`: Clean SVG styles, header button, and docked settings card.
- `visualizer/app.js`: Query execution pipeline hooks (`onQueryRunSuccess`).
- `visualizer/index.html`: Header mascot button and DOM mount.
- `.agents/skills/bloub-avatar-engine/SKILL.md`: Workspace agent skill.
