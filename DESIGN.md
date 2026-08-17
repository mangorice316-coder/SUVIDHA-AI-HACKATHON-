# Design System: SUVIDHA Universal Learning Access Engine (Project BRIDGE)
*Semantic Design System Specification for Google Stitch ([labs.google/stitch](https://labs.google/stitch)) & Antigravity*

---

## 1. Visual Theme & Atmosphere
- **Atmosphere:** High-agency STEM laboratory terminal fused with high-contrast accessibility clarity.
- **Density:** *Cockpit Balanced* (Level 6) — High information density without visual clutter; generous vertical leading on academic text blocks.
- **Variance:** *Offset Structured* (Level 6) — Asymmetrical two-column layouts pairing dense curriculum passages with interactive conceptual scaffolding cards.
- **Motion:** *Fluid Spring Physics* (Level 6) — Instant 150ms transitions, perpetual WebGL 3D floating rotation, and spring-damped tab switching (`stiffness: 120, damping: 18`).

---

## 2. Calibrated Color Palette & Functional Roles
- **Obsidian Canvas (`#090d16` / `hsl(222, 47%, 6%)`):** Deep, distraction-free backdrop.
- **Charcoal Surface (`#111827` / `hsl(222, 47%, 11%)`):** Elevated container and component card fill.
- **Surface Hover (`#1f293d` / `hsl(217, 33%, 17%)`):** Interactive card focus and hover states.
- **Cyan Signal (`#00e5ff` / `hsl(190, 95%, 45%)`):** Primary interactive accent for physics terms, active tabs, and primary action buttons.
- **Emerald Scaffolding (`#10b981` / `hsl(152, 76%, 45%)`):** Conceptual mother-tongue explanations, successful task checks, and audio waveforms.
- **Amber Warning (`#f59e0b` / `hsl(43, 96%, 56%)`):** Concrete physical analogies, impedance resistances, and term highlights.
- **Purple Academic Register (`#a855f7` / `hsl(270, 91%, 65%)`):** Formal academic English derivation connections and theorem logic.
- **Rose Error (`#f43f5e` / `hsl(348, 83%, 60%)`):** Translation failure warnings and diagnostic mismatch indicators.
- **Text Primary (`#f8fafc` / `hsl(210, 40%, 98%)`):** High-contrast readable typography ($> 7:1$ WCAG AAA contrast ratio).
- **Text Muted (`#94a3b8` / `hsl(215, 20%, 65%)`):** Secondary metadata, curriculum sources, and annotations.
- **Structural Border (`rgba(51, 65, 85, 0.4)`):** 1px subtle boundary dividers.

---

## 3. Typographic Architecture
- **Display & Headings:** `Space Grotesk`, sans-serif — Track-tight (`letter-spacing: -0.02em`), geometric, authoritative, and scientific.
- **Body & Academic Text:** `Plus Jakarta Sans`, sans-serif — Open letterforms, generous line-height (`1.75`), maximum legibility for multilingual readers.
- **Monospace & Formulas:** `JetBrains Mono`, monospace — For calculus derivations, circuit impedances, and system state values.
- **Regional Languages:** System-native unicode font rendering (`Latha`/`Tamil Sangam MN` for Tamil, `Noto Sans Devanagari` for Hindi, `Gautami` for Telugu).

---

## 4. Component Behaviors & Micro-Interactions

### A. The 5-Section Concept Bridge Card
1. **Academic Term:** Large cyan accent headline with 1-click audio phonetic pronunciation button.
2. **The Concept (Familiar Language):** Emerald left-accent border (`4px solid #10b981`), clear mother-tongue physical explanation.
3. **Think of It As (Concrete Analogy):** Amber left-accent border (`4px solid #f59e0b`), everyday relatable physical model.
4. **The Connection (Academic Register):** Purple left-accent border (`4px solid #a855f7`), mapping from familiar intuition to formal exam formula with 1-click $\LaTeX$ copy button.
5. **In Your Lesson:** Monospace-accented container displaying the unedited textbook source sentence as the permanent source of truth.

### B. Interactive Buttons & Controls
- **Tactile Feedback:** `-1px translateY` on `:active` with smooth `150ms cubic-bezier(0.16, 1, 0.3, 1)` easing.
- **No Outer Glows / AI Clichés:** Clean border highlights and high-contrast text fills; no blurry neon radial glows.

### C. 3D WebGL Canvas
- **Rendering:** Responsive `@react-three/fiber` canvas with clamped DPR (`dpr={[1, 2]}`) and ambient particle sparkles.
- **Hover Responsiveness:** Pointer hovering accelerates rotation speed and scales core geometry smoothly.

---

## 5. Layout Principles & Accessibility (WCAG 2.1 AAA)
- **Asymmetric Side-by-Side:** Left column houses original curriculum passage + interactive proof builder; right column displays real-time Academic Register Scorer and language selector.
- **Strict Mobile Collapse (< 768px):** Clean single-column vertical cascade with 44px minimum tap targets.
- **Keyboard Traversal:** Complete keyboard shortcut navigation (`1` for TopoSTEM, `2` for TransLangua, `3` for PathWeaver, `?` for Cheat Sheet, `Arrow Keys` for Circuit navigation).

---

## 6. Explicit Anti-Pattern Bans (Anti-Slop Guardrails)
- ❌ No generic AI purple gradients across dark backgrounds.
- ❌ No floating circular spinners (use animated skeleton bars and real-time audio oscilloscopes).
- ❌ No hiding or rewriting the original textbook passage.
- ❌ No generic filler text ("Scroll to explore", "Unleash your potential").
- ❌ No ungrounded statistical exaggerations ("99.9% effective").
