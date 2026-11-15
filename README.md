# SAP MDG Learning Lab

A beginner-friendly, local-first learning companion and interview bank for **SAP S/4HANA Master Data Governance (MDG)**, covering **MDG-M (Materials)** and **MDG-F (Financials)**.

**Live site:** https://krrivats.github.io/sap-mdg/

The goal: explain the *why* before the *how*, in simple words, with examples, diagrams, memory tricks, hands-on runbooks, and a full interview bank.

## Open it

Double-click `index.html`. It works directly from disk (the app uses a pre-built classic-script bundle, so no server is required).

If you change anything in `src/`, rebuild and test:

```bash
npm run build   # writes app.bundle.js
npm test        # unit tests for search, progress, and the interview bank
```

## Features

- **26 lessons** across Foundations, Data modeling, UI modeling, Process modeling, MDG-M, MDG-F, and System practice.
- **Deep data modeling**: model anatomy, reuse vs flex, the four storage/use types, attributes, leading/qualifying/referencing relationships, cardinality and type-4 rules, associations, hierarchies, check tables and search helps, SPRO steps, a worked example, and a review checklist.
- **Interview Q&A tab**: 83 questions, filterable by topic, searchable, with plain-English answers, a real example, and a memory trick. Flashcard-style reveal, "show all", shuffle, and mark-as-mastered.
- **19 inline SVG diagrams** (no external assets), so it still works on GitHub Pages.
- **Mobile-first**: compact layout, slide-in menu drawer, bottom tab bar (Home / Learn / Interview / Search), swipeable diagrams, and 16px inputs so iOS does not auto-zoom.
- **Mobile-first layout**: slide-in module drawer, bottom tab bar (Home / Learn / Interview / Search), compact cards, and 16px inputs so iOS does not auto-zoom.
- **Dark and light themes**, persisted locally.
- **Command palette** (`Ctrl/Cmd + K`) to jump to any lesson or interview question.
- **Progress ring**, lesson completion, and field notes saved in `localStorage`.
- **Print-friendly** styles for offline study.
- Responsive, keyboard-usable, and accessible.

## Deploy to GitHub Pages

1. Push this folder to a repository.
2. In GitHub, go to **Settings → Pages** and choose **Deploy from a branch** (root of `main`).
3. The site is served at `https://<user>.github.io/<repo>/`.

All paths are relative, so it works under a project subpath.

## Structure

```
index.html          app shell
styles.css          design system + themes
app.bundle.js       generated classic-script bundle
build.mjs           bundles src/ into app.bundle.js
src/learning.js     search + progress helpers (tested)
src/content.js      lesson content
src/interview.js    interview question bank
src/diagrams.js     inline SVG diagrams
src/app.js          renderer, navigation, palette
tests/              node:test unit tests
```

## Notes

- Progress, notes, mastered questions, and theme are stored in your browser. Nothing is sent anywhere.
- Configuration paths and screen names can differ by release and customer setup. Lessons say when to verify in your system.
- This is a learning aid, not an official SAP document.
