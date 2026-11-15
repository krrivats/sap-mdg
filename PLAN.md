# SAP MDG Learning Lab — build plan

## Goal
A local-first, GitHub Pages-compatible learning companion for a beginner with ECC/ABAP experience who is learning SAP S/4HANA MDG techno-functionally across MDG-M and MDG-F.

## Current state (v2)
- 26 lessons across Foundations, Data modeling, UI modeling, Process modeling, MDG-M, MDG-F, and System practice.
- Deep data-modeling track: model anatomy, reuse vs flex, four storage/use types, attributes/data elements, leading/qualifying/referencing relationships, cardinality and type-4 rules, associations, hierarchies, check tables/value tables/search helps, SPRO steps, worked example, review checklist.
- Every lesson: explanation, visual, "why it matters", key terms, active recall, interview Q&A, and a hands-on practice card with verification and traps.
- Inline SVG diagrams (no external assets), emoji cues, tables, callouts, mnemonics.
- Local progress and notes via `localStorage`; no backend.
- Classic-script bundle (`app.bundle.js`) so `index.html` works when opened directly from disk; `npm run build` regenerates it from `src/`.
- Unit tests for search, lesson lookup, and progress.

## Build sequence
1. `src/learning.js` — pure search/progress helpers (tested).
2. `src/content.js` — lesson content.
3. `src/diagrams.js` — inline SVG diagrams.
4. `src/app.js` — renderer and navigation.
5. `build.mjs` — concatenates modules into `app.bundle.js`.
6. `styles.css` — responsive, compact, print-friendly UI.

## Next steps
1. Deepen **UI modeling** the same way (screen anatomy, field groups, role-based views, Fiori vs Web Dynpro, validation messages).
2. Deepen **process modeling** (CR type configuration, agent determination, BRFplus examples, parallel steps, escalation).
3. After the first real SAP session, replace generic steps with the exact app/transaction names and screens seen in the system.
4. Add a printable one-page cheat sheet per track.

## Accuracy boundary
Configuration paths and screen names vary by release and customer setup. Lessons label version-dependent points and say when to verify in the system. The app is a learning aid, not an official SAP document.
