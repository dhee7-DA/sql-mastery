---
name: shift-nudge
description: Professional interface design craft, visual review, and fluidity refinement based on Matt D. Smith's 16 Core Principles of Shift Nudge. Use when reviewing UI designs, improving visual hierarchy, typography, grids, micro-interactions, fluidity, spacing, optical alignment, and contrast.
metadata:
  origin: community
---

# Shift Nudge: 16 Core Interface Design Principles

Use this skill to elevate user interfaces from functional/generic AI templates to polished, intentional, and fluid production designs.

Created from the design canon of **Matt D. Smith (MDS)** at [shiftnudge.com](https://shiftnudge.com/skill).

---

## When to Use

- The user asks for a design review or critique of a UI screen, component, or layout.
- The UI feels "off", flat, generic, cramped, visually noisy, or unpolished.
- Improving fluidity, transitions, typography scale, spacing rhythm, and micro-interactions.
- Refining dark mode depth, surface elevation, concentric corner radii, and optical alignment.
- You are reviewing or implementing buttons, cards, dashboards, navigation, tables, data visualizations, and interactive toolbars.

---

## The 16 Core Principles

### 1. Typography
- **Type Scale**: Establish an intentional modular scale (e.g. 1.25 Major Third or 1.2 Minor Third). Avoid arbitrary font sizes.
- **Line Height**: Tighter for large headings (`1.1` - `1.2`), generous for body copy (`1.5` - `1.65`), compact for dense data labels (`1.2` - `1.3`).
- **Measure (Line Length)**: Keep reading text between 45–75 characters per line (approx. 500–680px max-width).
- **Letter Spacing**: Tighten tracking on large display headings (`-0.02em` to `-0.03em`), open tracking on small all-caps metadata (`+0.05em` to `+0.08em`).
- **Tabular Figures**: Always use `font-variant-numeric: tabular-nums` for timers, financial figures, row counters, telemetry, and live metrics to prevent text jitter.
- **Text Wrapping**: Use `text-wrap: balance` on section headings and `text-wrap: pretty` on short descriptions and card copy to eliminate orphan words.

### 2. Grids & Spatial Rhythm
- **4px / 8px Baseline Grid**: All paddings, margins, heights, and gaps must be multiples of 4px (4, 8, 12, 16, 20, 24, 32, 48, 64px).
- **Edge Alignment**: Every visual boundary should snap to an edge. Do not float elements with irregular 7px or 13px offsets.
- **Consistent Gutters**: Maintain uniform column and row gaps across similar card grids.

### 3. Color & Contrast
- **Functional Assignment**: Color must convey meaning, not decoration. Reserve vibrant hues for semantic status (Emerald for success, Amber for warning, Crimson for error/bottleneck, Sky Blue for active selection).
- **Multi-Layered Dark Surfaces**: Never use flat pure black everywhere. Build elevation with layered dark tones:
  - Base canvas: `#000000` or `#050608`
  - Container / Card: `#090a0d` or `#0e1015`
  - Elevated Popover / Toolbar: `#121318` or `#16181f`
  - Hover / Active Surface: `#1c1e26` or `#27272a`
- **Contrast Ratios**: Body text must achieve at least 4.5:1 against the surface (WCAG AA). Secondary labels should remain above 3:1. Avoid muddy, washed-out grays.

### 4. Communication & Scannability
- **Immediate Intent**: A user scanning for 3 seconds should know exactly what the screen does and what action is expected.
- **Progressive Disclosure**: Show high-signal summary metrics upfront; place deep technical or secondary data in expandable drawers or tabs.
- **Labels That Speak**: Button labels should be specific action verbs ("Analyze & Profile Execution Tree", "Run Query", "Simulate Index") rather than vague words ("Submit", "Go").

### 5. Proportion & Visual Weight
- **Scale Hierarchy**: The most important element (hero metric, active query, primary action) must command the greatest visual weight.
- **De-emphasizing Metadata**: Recede metadata, timestamps, and secondary captions using smaller font size (10–11px), uppercase letter-spacing, and muted tones (`#71717a`).

### 6. Clarity & Decluttering
- **Whitespace Over Borders**: Use spatial padding and subtle background contrast to separate sections before reaching for borders.
- **Hairline Borders**: When borders are needed, use semi-transparent hairlines (`rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.12)`) rather than heavy opaque strokes.
- **No Cards-Inside-Cards**: Avoid gratuitous nested containers that create box-in-a-box visual clutter.

### 7. Precision & Optical Geometry
- **Concentric Radius**: When nesting rounded containers:
  $$\text{radius}_{\text{outer}} = \text{radius}_{\text{inner}} + \text{padding}$$
- **Optical Centering**: Triangle play icons, chevrons, and asymmetric icons need a 1–2px optical adjustment to appear centered to the human eye.
- **Sub-pixel Hygiene**: Ensure border-box sizing and integer pixel alignment to avoid blurry borders on low-DPI displays.

### 8. Order & Flow
- **Natural Eye Path**: Design for intuitive reading flow (Z-pattern or F-pattern).
- **Logical Tab Navigation**: Interactive tab lists and breadcrumbs should progress logically from input to processing to output.

### 9. Affordance & Hit Targets
- **Interactive Appearance**: Clickable elements must look clickable with clear boundaries, hover highlights, and active press states.
- **Minimum Hit Area**: Maintain a minimum 40×40px (ideally 44×44px) touch target, expanding with pseudo-elements if the visible icon is small.
- **Cursor Feedback**: Always assign `cursor: pointer` to buttons, tabs, pills, and interactive table rows.

### 10. Motion & Fluidity
- **No `transition: all`**: Always specify explicit transition properties:
  ```css
  transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1),
              background-color 150ms ease,
              border-color 150ms ease,
              box-shadow 180ms ease;
  ```
- **Spring / Smooth Easing**: Use cubic bezier curves like `cubic-bezier(0.16, 1, 0.3, 1)` or `cubic-bezier(0.2, 0.8, 0.2, 1)` for snappy, fluid response.
- **Tactile Active Press**: Provide subtle scale feedback on click:
  ```css
  .button:active, .card-interactive:active {
    transform: scale(0.98);
  }
  ```
- **Staggered Reveals**: Reveal multi-row lists or cards with a slight stagger (15–30ms delay per row).
- **Fast Interruptible Transitions**: UI transitions should complete in 120–220ms. Never make the user wait for decorative animations.

### 11. Efficiency
- **Information Density**: For developer, finance, and data tools, prefer dense, compact tables and toolbars over sprawling whitespace.
- **Keyboard Shortcuts**: Surface accessible shortcuts (<kbd>Ctrl</kbd> + <kbd>Enter</kbd>, <kbd>Esc</kbd>) directly in the UI.

### 12. Restraint
- **Visual Volume**: Not every feature can be loud. If everything is bold or highlighted, nothing is.
- **Muted Backgrounds**: Avoid loud background gradients, large saturated blobs, or distracting glow effects behind readable data.

### 13. Visuals & Iconography
- **Stroke Weight Coherence**: Ensure all icons in a toolbar share the same stroke weight (e.g. 1.5px or 2px) and style (outline vs filled).
- **High-Signal Data Vis**: Render charts and execution trees with clear hairline connecting lines, visible node labels, and meaningful color coding.

### 14. Universal & Responsive Design
- **Fluid Layouts**: Use CSS Grid and Flexbox with `minmax()` and `clamp()` to adapt smoothly from mobile (375px) to ultrawide (2560px).
- **System Font Smoothing**:
  ```css
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  ```

### 15. Accessibility (WCAG 2.2 AA)
- Text contrast $\ge 4.5:1$ against adjacent backgrounds.
- High-visibility keyboard focus rings:
  ```css
  :focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
  }
  ```

### 16. Responsibility & Performance
- Zero Cumulative Layout Shift (CLS): reserve explicit dimensions (`width`, `height`, `aspect-ratio`) for images, charts, and tree nodes.
- Respect user motion preference:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```

---

## Shift Nudge AI Review Format

When evaluating a screen or providing UI design feedback, format the critique using the official Shift Nudge structure:

```markdown
### Summary
What I think you're going for. Who it's for and what it needs to do.

### What's off
- [Visible fact and what it costs the user] (Anchored in specific principles like *Order*, *Typography*, *Precision*, or *Motion*).
- [Second visible fact and friction introduced].

### Questions to push it
1. [Question that makes you look at the layout again with fresh eyes] (e.g. *Clarity*, *Communication*).
2. [Question challenging visual density or hierarchy].

### One thing to try
[One concrete experiment, small enough to try in 10 minutes].

### Working well
[One specific strength to preserve and build upon].
```
