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
6. **The Dressing Room (Accessories)**:
   - Dynamic 3D accessories mapped onto active head geometry:
     - 👓 **Smart Specs**: Dual lenses + bridge + temples tilting in 3D perspective with eye level.
     - 🎓 **Master Cap**: Diamond mortarboard + golden tassel + skullcap anchored atop shape apex.
     - 👑 **SQL Crown**: Golden 3-jeweled peaks with drop shadow and sparkling gems.
     - 🎧 **Dev Headset**: Full wrap headband with left & right cushioned earcups hugging the silhouette.
7. **Autonomous Web Audio Pop Synth**:
   - Integrated zero-dependency Web Audio synthesizer with mute toggle (`🔊 / 🔇`).
   - Tactile bubble pops (`460Hz -> 880Hz`), morph sweeps, victory chimes (C5->E5->G5->C6), and diagnostic caution tones.
8. **Tactile Slime / Jelly Drag Physics**:
   - Pointer-down dragging stretches avatar body toward cursor like elastic slime.
   - Pointer-up release triggers high-elasticity decaying spring bounce (`velocityY = -0.38`).
9. **Interactive Particles & Snooze**:
   - 🎊 **Micro-Confetti**: 24 vector particles + SQL keyword chips (`SELECT`, `JOIN`, `★`, `100%`) burst on query success & quiz pass.
   - 💤 **Idle Snooze**: Auto-dozes after 75s of inactivity with rising Zzz bubbles, waking with a surprised bounce on mouse move or keypress.
10. **Context-Aware IDE Awareness & Theme Sync**:
    - Typing into `#sqlInput` shifts the mascot's gaze to the editor in a `"thinking"` pose with micro-nods.
    - Hovering `#btnRunQuery` triggers an alert anticipatory stance.
    - Successful query runs trigger celebration bounces, smiling eyes, victory chimes, and row counts.
    - Theme Sync mode automatically adapts skin color to the active visualizer theme.

---

## 🗂️ UI Architecture (5 Dedicated Customizer Sections & 4-Tool Dock)
1. **Top Floating Dock (`.buddy-controls-bar`)**:
   - `🎨` DNA Customizer
   - `👑` Quick Wardrobe Cycle
   - `🔊` Sound FX Toggle
   - `💤` Sleep Mode Toggle
2. **Master Customizer Panel (`#bloubCustomizerPanel`)**:
   - 👑 **SECTION 1: WARDROBE**: None, Specs, Master Cap, Crown, Headset
   - ⚙️ **SECTION 2: BEHAVIOR**: Audio FX, Auto-Snooze (75s), Theme Sync
   - 🪨 **SECTION 3: MORPH SHAPE**: 8 Authentic shapes (Pebble, Squircle, Circle, Capsule, Triangle, Hexagon, Cloud, Droplet)
   - 🎨 **SECTION 4: COLOR PALETTE**: 12 Authentic skins
   - 😄 **SECTION 5: EXPRESSIONS & PARTICLES**: 5 moods + Launch Confetti Burst button

---

## 🗂️ Files in this Feature
- `visualizer/buddy_engine.js`: The standalone avatar engine.
- `visualizer/style.css`: Transparent layout, dressing room, and floating dock styles.
- `visualizer/app.js`: Telemetry and query pipeline integration hooks.
- `visualizer/index.html`: DOM mount container and script cache busting.
- `.agents/skills/bloub-avatar-engine/SKILL.md`: Reusable workspace agent skill.
