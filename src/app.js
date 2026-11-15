import { lessons, tracks } from './content.js';
import { interviewQuestions, interviewTracks } from './interview.js';
import { findLesson, searchLessons, summarizeProgress } from './learning.js';
import { renderDiagram } from './diagrams.js';

const STORAGE_KEY = 'mdg-fieldnotes-progress-v3';
const defaults = { completed: [], notes: {}, activeLesson: 'dm-overview', mastered: [], theme: 'light' };
const appContent = document.querySelector('#app-content');
const nav = document.querySelector('#track-navigation');
const searchInput = document.querySelector('#lesson-search');
const breadcrumb = document.querySelector('#breadcrumb-current');
const palette = document.querySelector('#palette');
const paletteInput = document.querySelector('#palette-input');
const paletteResults = document.querySelector('#palette-results');

let state = loadState();
let view = 'overview';          // overview | lesson | interview
let selectedTrack = 'all';
let query = '';
let iqTrack = 'All topics';
let iqQuery = '';
let iqShowAll = false;
let iqOrder = interviewQuestions.map((q) => q.id);
let paletteItems = [];
let paletteIndex = 0;
let iqHighlight = null;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
    if (saved && Array.isArray(saved.completed) && saved.notes && typeof saved.notes === 'object') {
      return { ...defaults, ...saved, mastered: Array.isArray(saved.mastered) ? saved.mastered : [] };
    }
  } catch { /* storage unavailable */ }
  return { ...defaults };
}
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* private browsing */ }
}
function esc(value = '') {
  return String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}
function slug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  const icon = state.theme === 'dark' ? '☀' : '◐';
  document.querySelector('#theme-toggle').textContent = icon;
  const mobile = document.querySelector('#mobile-theme');
  if (mobile) mobile.textContent = icon;
  document.querySelector('meta[name="theme-color"]').setAttribute('content', state.theme === 'dark' ? '#0f1014' : '#f6f5ef');
}
function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  saveState(); applyTheme();
}
function updateProgress() {
  const p = summarizeProgress(lessons, state.completed);
  const circumference = 2 * Math.PI * 18;
  const ring = document.querySelector('#ring-fill');
  ring.style.strokeDasharray = `${circumference}`;
  ring.style.strokeDashoffset = `${circumference * (1 - p.percent / 100)}`;
  document.querySelector('#ring-percent').textContent = `${p.percent}%`;
  document.querySelector('#sidebar-progress-label').textContent = `${p.completed} of ${p.total}`;
  document.querySelector('#interview-count').textContent = `${state.mastered.length}/${interviewQuestions.length}`;
}

/* ── Navigation ──────────────────────────────────────────────── */
function renderNavigation() {
  nav.innerHTML = tracks.map((t) => {
    const active = view !== 'interview' && t.id === selectedTrack;
    return `<button class="track-link ${active ? 'is-active' : ''}" type="button" data-track="${esc(t.id)}" ${active ? 'aria-current="page"' : ''}>
      <span class="track-icon" aria-hidden="true">${esc(t.icon)}</span><span>${esc(t.label)}</span>
    </button>`;
  }).join('');
  nav.querySelectorAll('[data-track]').forEach((b) => b.addEventListener('click', () => {
    selectedTrack = b.dataset.track; query = ''; searchInput.value = ''; view = 'overview'; closeDrawer(); render();
  }));
  document.querySelector('#open-interview').classList.toggle('is-active', view === 'interview');
}

/* ── Block renderers ─────────────────────────────────────────── */
function block(b, i) {
  const id = b.t ? `sec-${slug(b.t)}` : `sec-${i}`;
  switch (b.k) {
    case 'p':
      return `<section class="block" ${b.t ? `id="${id}"` : ''}>${b.t ? `<h2>${esc(b.t)}</h2>` : ''}<p>${esc(b.b)}</p></section>`;
    case 'ul':
      return `<section class="block" id="${id}"><h2>${esc(b.t)}</h2><ul class="bullets">${b.items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></section>`;
    case 'ol':
      return `<section class="block" id="${id}"><h2>${esc(b.t)}</h2><ol class="steps">${b.items.map((x) => `<li>${esc(x)}</li>`).join('')}</ol></section>`;
    case 'table':
      return `<section class="block" id="${id}"><h2>${esc(b.t)}</h2><div class="table-wrap"><table><thead><tr>${b.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section>`;
    case 'note': {
      const icon = { why: '💡', tip: '🧠', warn: '⚠️', exam: '🎯' }[b.tone] || '📌';
      return `<aside class="note note-${esc(b.tone)}"><span class="note-icon" aria-hidden="true">${icon}</span><div><strong>${esc(b.t)}</strong><p>${esc(b.b)}</p></div></aside>`;
    }
    case 'example':
      return `<aside class="example" id="${id}"><span class="example-icon" aria-hidden="true">🌰</span><div><strong>${esc(b.t || 'Example')}</strong><p>${esc(b.b)}</p></div></aside>`;
    case 'diagram':
      return `<figure class="diagram" id="${id}"><div class="diagram-scroll">${renderDiagram(b.name)}</div><figcaption>${esc(b.caption)}</figcaption></figure>`;
    case 'compare':
      return `<section class="block" id="${id}"><h2>${esc(b.t)}</h2><div class="compare">${b.cols.map((c) => `<div class="compare-col"><h3>${esc(c.h)}</h3><ul>${c.items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>`).join('')}</div></section>`;
    case 'terms':
      return `<section class="block" id="${id}"><h2>${esc(b.t)}</h2><dl class="terms">${b.items.map((x) => `<div><dt>${esc(x.term)}</dt><dd>${esc(x.meaning)}</dd></div>`).join('')}</dl></section>`;
    case 'mnemonic':
      return `<aside class="mnemonic"><span class="mn-emoji" aria-hidden="true">🧩</span><div><strong>${esc(b.t)}</strong><ul>${b.lines.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div></aside>`;
    case 'exam':
      return `<section class="block" id="${id}"><h2>${esc(b.t)}</h2>${b.items.map((x) => `<details class="qa"><summary>${esc(x.q)}</summary><p>${esc(x.a)}</p></details>`).join('')}</section>`;
    default:
      return '';
  }
}

function practiceCard(p) {
  if (!p) return '';
  return `<section class="practice" id="practice"><div class="practice-head"><span class="practice-badge">HANDS-ON</span><h2>${esc(p.title)}</h2></div><p class="practice-intro">${esc(p.intro)}</p>
    <ol class="steps">${p.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
    <div class="practice-checks"><div><h3>✅ Verify</h3><ul>${p.verify.map((v) => `<li>${esc(v)}</li>`).join('')}</ul></div><div><h3>⚠️ Traps</h3><ul>${p.traps.map((v) => `<li>${esc(v)}</li>`).join('')}</ul></div></div></section>`;
}
function recallCard(items) {
  if (!items?.length) return '';
  return `<section class="recall"><span class="recall-emoji" aria-hidden="true">🧠</span><div class="recall-body"><p class="eyebrow">ACTIVE RECALL</p><h2>Say it from memory</h2>${items.map((x) => `<details class="qa qa-dark"><summary>${esc(x.q)}</summary><p>${esc(x.a)}</p></details>`).join('')}</div></section>`;
}
function interviewCard(items) {
  if (!items?.length) return '';
  return `<section class="interview"><p class="eyebrow">INTERVIEW PRACTICE</p><h2>Questions you will hear</h2>${items.map((x) => `<details class="qa"><summary>${esc(x.q)}</summary><p>${esc(x.a)}</p></details>`).join('')}</section>`;
}

/* ── Overview ────────────────────────────────────────────────── */
function lessonCard(item, index) {
  const done = state.completed.includes(item.id);
  return `<button class="lesson-card ${done ? 'is-done' : ''}" type="button" data-lesson="${esc(item.id)}">
    <span class="lesson-number">${String(index + 1).padStart(2, '0')}</span>
    <span class="lesson-card-copy"><span class="lesson-card-title">${esc(item.title)}</span><span class="lesson-card-meta">${esc(item.track)} <i>·</i> ${esc(item.duration)}</span></span>
    <span class="lesson-status" aria-label="${done ? 'Completed' : 'Not completed'}">${done ? '✓' : '↗'}</span>
  </button>`;
}

let quickId = null;
function pickQuick() {
  quickId = interviewQuestions[Math.floor(Math.random() * interviewQuestions.length)].id;
}
function quickRecallCard() {
  if (!quickId) pickQuick();
  const q = interviewQuestions.find((x) => x.id === quickId) ?? interviewQuestions[0];
  return `<section class="quick-recall">
    <div class="qr-top"><p class="eyebrow">3-MINUTE RECALL</p><span class="qr-tag">${esc(q.track)}</span></div>
    <h2>${esc(q.q)}</h2>
    <details class="qa qa-dark"><summary>Reveal answer</summary><p>${esc(q.a)}</p><p class="qr-trick">🧠 ${esc(q.trick)}</p></details>
    <div class="qr-actions"><button type="button" class="button button-ghost" id="quick-another">🔀 Another question</button><button type="button" class="text-button qr-open" id="quick-open">Open interview bank →</button></div>
  </section>`;
}

function renderOverview() {
  const p = summarizeProgress(lessons, state.completed);
  const filtered = searchLessons(lessons, query);
  const visible = selectedTrack === 'all' ? filtered : filtered.filter((l) => l.track === selectedTrack);
  const current = findLesson(lessons, state.activeLesson) ?? lessons[0];
  const track = tracks.find((t) => t.id === selectedTrack);
  const heading = query ? 'Search results' : selectedTrack === 'all' ? 'Your field guide to SAP MDG' : track?.label ?? 'Learning path';
  breadcrumb.textContent = query ? 'Search' : selectedTrack === 'all' ? 'Overview' : track?.label ?? 'Overview';
  appContent.innerHTML = `<section class="hero">
    <div class="hero-copy"><p class="eyebrow">A PRACTICAL, BEGINNER-FRIENDLY GUIDE</p><h1>${esc(heading)}</h1><p class="lede">${query ? `Lessons matching “${esc(query)}”.` : selectedTrack === 'all' ? 'Understand the why, learn the how, then practise it in your SAP system.' : esc(track?.description ?? '')}</p>
    <div class="hero-actions"><button class="button button-dark" data-lesson="${esc(current.id)}">Continue: ${esc(current.title.slice(0, 34))}${current.title.length > 34 ? '…' : ''} <span aria-hidden="true">→</span></button><button class="button button-ghost" id="hero-interview">🎤 Interview bank <b>${interviewQuestions.length}</b></button></div></div>
    <div class="hero-art" aria-hidden="true"><div class="orb orb-a"></div><div class="orb orb-b"></div><div class="orbit-card"><span class="orbit-label">PROGRESS</span><strong>${p.percent}%</strong><span class="orbit-sub">${p.completed} of ${p.total} lessons</span></div></div>
  </section>
  ${selectedTrack === 'all' && !query ? `<section class="continue-card"><div class="continue-art" aria-hidden="true"><span>MDG</span><i></i><i></i><i></i></div><div class="continue-copy"><p class="eyebrow">PICK UP WHERE YOU LEFT OFF</p><h2>${esc(current.title)}</h2><p>${esc(current.intro)}</p></div><button type="button" class="button button-dark" data-lesson="${esc(current.id)}">Open lesson <span aria-hidden="true">→</span></button></section>
  <section class="tomorrow-banner"><span class="tomorrow-icon" aria-hidden="true">✳</span><div><strong>Tomorrow in your SAP system</strong><p>Start with the system-orientation checklist. Confirm your system and training scope before making changes.</p></div><button type="button" class="text-button" data-lesson="tomorrow-checklist">Open checklist <span aria-hidden="true">→</span></button></section>
  ${quickRecallCard()}
  <section class="track-overview"><div class="section-heading"><div><p class="eyebrow">THE LEARNING PATH</p><h2>Build understanding, one layer at a time</h2></div><span>${lessons.length} lessons</span></div><div class="track-grid">${tracks.filter((t) => t.id !== 'all').map((t) => {
    const count = lessons.filter((l) => l.track === t.id).length;
    return `<button type="button" class="track-card" data-track="${esc(t.id)}"><span class="track-card-icon">${esc(t.icon)}</span><span class="track-card-title">${esc(t.label)}</span><span class="track-card-description">${esc(t.description)}</span><span class="track-card-count">${count} ${count === 1 ? 'lesson' : 'lessons'} <b aria-hidden="true">↗</b></span></button>`;
  }).join('')}</div></section>` : ''}
  <section class="lesson-list-section"><div class="section-heading"><div><p class="eyebrow">${query ? 'MATCHING LESSONS' : selectedTrack === 'all' ? 'ALL LESSONS' : 'IN THIS MODULE'}</p><h2>${query ? `${visible.length} result${visible.length === 1 ? '' : 's'}` : selectedTrack === 'all' ? 'Explore the lessons' : 'Lessons'}</h2></div></div>
  ${visible.length ? `<div class="lesson-list">${visible.map(lessonCard).join('')}</div>` : `<div class="empty-state"><strong>No lessons found</strong><p>Try another search term or choose a different module.</p></div>`}</section>`;
  appContent.querySelectorAll('[data-lesson]').forEach((b) => b.addEventListener('click', () => openLesson(b.dataset.lesson)));
  appContent.querySelectorAll('[data-track]').forEach((b) => b.addEventListener('click', () => { selectedTrack = b.dataset.track; query = ''; searchInput.value = ''; view = 'overview'; render(); }));
  const heroInterview = document.querySelector('#hero-interview');
  if (heroInterview) heroInterview.addEventListener('click', () => openInterview());
  const quickAnother = document.querySelector('#quick-another');
  if (quickAnother) quickAnother.addEventListener('click', () => { pickQuick(); render(); });
  const quickOpen = document.querySelector('#quick-open');
  if (quickOpen) quickOpen.addEventListener('click', () => openInterview(quickId));
}

/* ── Lesson ──────────────────────────────────────────────────── */
function openLesson(id) {
  const item = findLesson(lessons, id);
  if (!item) return;
  state.activeLesson = item.id;
  saveState();
  view = 'lesson';
  closeDrawer();
  render();
  window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}

function renderLesson(item) {
  breadcrumb.textContent = item.title;
  const index = lessons.findIndex((l) => l.id === item.id);
  const done = state.completed.includes(item.id);
  const toc = item.sections.filter((b) => b.t && !['note', 'mnemonic', 'example'].includes(b.k)).map((b) => ({ id: `sec-${slug(b.t)}`, t: b.t }));
  const mobileToc = toc.length ? `<details class="mobile-toc"><summary>📑 In this lesson</summary><div class="mobile-toc-links"><a href="#practice">Hands-on</a>${toc.map((x) => `<a href="#${x.id}">${esc(x.t)}</a>`).join('')}</div></details>` : '';
  appContent.innerHTML = `<article class="lesson-page">
    <button class="back-link" type="button" id="back-to-module"><span aria-hidden="true">←</span> Back to ${esc(item.track)}</button>
    <header class="lesson-header">
      <div class="lesson-kicker"><span class="badge badge-${esc(item.level.toLowerCase())}">${esc(item.level)}</span><span>${esc(item.module)}</span><span aria-hidden="true">·</span><span>${esc(item.duration)}</span></div>
      <h1>${esc(item.title)}</h1>
      <p class="lesson-intro">${esc(item.intro)}</p>
    </header>
    <div class="lesson-layout">
      <div class="lesson-body">
        ${mobileToc}
        ${item.sections.map(block).join('')}
        ${practiceCard(item.practice)}
        ${recallCard(item.recall)}
        ${interviewCard(item.interview)}
        <section class="notes-panel"><label for="lesson-notes"><span class="eyebrow">YOUR FIELD NOTES</span><span class="notes-hint">Saved on this device</span></label><textarea id="lesson-notes" rows="4" placeholder="What did you observe? What do you want to ask? Explain it in your own words…"></textarea><span class="save-status" id="save-status" role="status" aria-live="polite">Notes are stored locally in this browser.</span></section>
        <div class="lesson-actions"><button class="button ${done ? 'button-complete' : 'button-dark'}" type="button" id="complete-lesson">${done ? '✓ Completed · mark to revisit' : 'Mark lesson complete'}</button><span>Completion is saved in this browser.</span><button class="button button-ghost mobile-next" type="button" id="next-lesson-mobile">Next lesson →</button></div>
      </div>
      <aside class="lesson-aside">
        <div class="aside-card"><p class="eyebrow">LESSON ${String(index + 1).padStart(2, '0')} / ${String(lessons.length).padStart(2, '0')}</p><strong>${esc(item.track)}</strong><span>${esc(item.duration)} read</span>${toc.length ? `<hr><p class="toc-label">IN THIS LESSON</p><a class="toc-link" href="#practice">Hands-on</a>${toc.map((x) => `<a class="toc-link" href="#${x.id}">${esc(x.t)}</a>`).join('')}` : ''}<hr><p>Remember the loop</p><div class="memory-loop"><span>WHAT</span><b>→</b><span>WHY</span><b>→</b><span>HOW</span></div><small>Explain it simply. Connect it to a real task. Then check it in the system.</small></div>
        <button class="aside-next" type="button" id="next-lesson">${index < lessons.length - 1 ? `Next: ${esc(lessons[index + 1].title)} <span aria-hidden="true">→</span>` : 'Back to learning path <span aria-hidden="true">→</span>'}</button>
      </aside>
    </div>
  </article>`;
  document.querySelector('#back-to-module').addEventListener('click', () => { selectedTrack = item.track; view = 'overview'; render(); });
  const notes = document.querySelector('#lesson-notes');
  notes.value = state.notes[item.id] ?? '';
  let timer;
  notes.addEventListener('input', () => {
    state.notes[item.id] = notes.value;
    const status = document.querySelector('#save-status');
    status.textContent = 'Saving…';
    clearTimeout(timer);
    timer = setTimeout(() => { saveState(); status.textContent = 'Saved on this device.'; }, 250);
  });
  document.querySelector('#complete-lesson').addEventListener('click', () => {
    state.completed = done ? state.completed.filter((x) => x !== item.id) : [...new Set([...state.completed, item.id])];
    saveState(); render();
  });
  document.querySelector('#next-lesson').addEventListener('click', () => index < lessons.length - 1 ? openLesson(lessons[index + 1].id) : goHome());
  const mobileNext = document.querySelector('#next-lesson-mobile');
  if (mobileNext) mobileNext.addEventListener('click', () => index < lessons.length - 1 ? openLesson(lessons[index + 1].id) : goHome());
}

/* ── Interview bank ──────────────────────────────────────────── */
function openInterview(id) {
  view = 'interview';
  iqQuery = '';
  iqTrack = 'All topics';
  iqHighlight = id ?? null;
  closeDrawer();
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderInterview() {
  breadcrumb.textContent = 'Interview Q&A';
  const masteredCount = interviewQuestions.filter((q) => state.mastered.includes(q.id)).length;
  const search = iqQuery.trim().toLowerCase();
  const byTrack = iqTrack === 'All topics' ? interviewQuestions : interviewQuestions.filter((q) => q.track === iqTrack);
  const matches = byTrack.filter((q) => !search || `${q.q} ${q.a} ${q.trick} ${q.track} ${q.level}`.toLowerCase().includes(search));
  const ordered = iqOrder.map((id) => matches.find((q) => q.id === id)).filter(Boolean);
  const list = ordered.length === matches.length ? ordered : matches;

  appContent.innerHTML = `<section class="iq-hero">
    <div><p class="eyebrow">INTERVIEW PREPARATION</p><h1>Interview Q&amp;A</h1><p class="lede">${interviewQuestions.length} questions with plain-English answers, a real example, and a memory trick. Filter by topic, search, then reveal.</p></div>
    <div class="iq-stats"><div><strong>${interviewQuestions.length}</strong><span>questions</span></div><div><strong>${masteredCount}</strong><span>mastered</span></div><div><strong>${interviewQuestions.length - masteredCount}</strong><span>to go</span></div></div>
  </section>
  <div class="iq-toolbar">
    <div class="chip-row" role="group" aria-label="Filter interview questions by topic">${interviewTracks.map((t) => `<button type="button" class="chip ${t === iqTrack ? 'is-active' : ''}" data-iq-track="${esc(t)}">${esc(t)}</button>`).join('')}</div>
    <div class="iq-tools">
      <label class="search-box iq-search"><span aria-hidden="true">⌕</span><span class="visually-hidden">Search interview questions</span><input id="iq-search" type="search" placeholder="Search questions or answers…" value="${esc(iqQuery)}"></label>
      <button type="button" class="button button-ghost" id="iq-shuffle">🔀 Shuffle</button>
      <button type="button" class="button button-ghost" id="iq-toggle-all">${iqShowAll ? '🙈 Hide answers' : '👁 Show all answers'}</button>
    </div>
  </div>
  <div class="iq-meta"><span>${list.length} question${list.length === 1 ? '' : 's'}</span><span>Tip: cover the answer, say it out loud, then reveal.</span></div>
  <div class="iq-list">${list.length ? list.map(iqCard).join('') : `<div class="empty-state"><strong>No questions found</strong><p>Try another search term or topic.</p></div>`}</div>`;

  document.querySelectorAll('[data-iq-track]').forEach((b) => b.addEventListener('click', () => { iqTrack = b.dataset.iqTrack; render(); }));
  const iqSearch = document.querySelector('#iq-search');
  iqSearch.addEventListener('input', () => {
    iqQuery = iqSearch.value;
    const pos = iqSearch.selectionStart;
    render();
    const next = document.querySelector('#iq-search');
    next.focus();
    try { next.setSelectionRange(pos, pos); } catch { /* ignore */ }
  });
  document.querySelector('#iq-shuffle').addEventListener('click', () => {
    iqOrder = [...iqOrder].sort(() => Math.random() - 0.5);
    render();
  });
  document.querySelector('#iq-toggle-all').addEventListener('click', () => {
    iqShowAll = !iqShowAll;
    render();
  });
  document.querySelectorAll('[data-master]').forEach((b) => b.addEventListener('click', () => {
    const id = b.dataset.master;
    state.mastered = state.mastered.includes(id) ? state.mastered.filter((x) => x !== id) : [...state.mastered, id];
    saveState(); updateProgress(); render();
  }));
  if (iqHighlight) {
    const card = document.querySelector(`[data-iq="${iqHighlight}"]`);
    if (card) {
      card.classList.add('is-highlight');
      card.querySelector('details')?.setAttribute('open', '');
      card.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
    iqHighlight = null;
  }
}

function iqCard(q) {
  const mastered = state.mastered.includes(q.id);
  return `<article class="iq-card ${mastered ? 'is-mastered' : ''}" data-iq="${esc(q.id)}" id="iq-${esc(q.id)}">
    <div class="iq-top"><span class="iq-level iq-${esc(q.level.toLowerCase())}">${esc(q.level)}</span><span class="iq-track">${esc(q.track)}</span><button type="button" class="master-btn ${mastered ? 'is-on' : ''}" data-master="${esc(q.id)}" aria-pressed="${mastered}">${mastered ? '✓ Mastered' : 'Mark mastered'}</button></div>
    <h3 class="iq-q">${esc(q.q)}</h3>
    <details class="iq-answer" ${iqShowAll ? 'open' : ''}><summary>Show answer</summary>
      <p class="iq-a">${esc(q.a)}</p>
      <p class="iq-eg"><b>Example</b> ${esc(q.example)}</p>
      <p class="iq-trick"><b>🧠 Trick</b> ${esc(q.trick)}</p>
    </details>
  </article>`;
}

/* ── Command palette ─────────────────────────────────────────── */
function paletteSource() {
  const lessonItems = lessons.map((l) => ({ kind: 'lesson', id: l.id, title: l.title, meta: `${l.track} · ${l.duration}` }));
  const questionItems = interviewQuestions.map((q) => ({ kind: 'interview', id: q.id, title: q.q, meta: `Interview · ${q.track}` }));
  return [...lessonItems, ...questionItems];
}
function renderPalette(text = '') {
  const term = text.trim().toLowerCase();
  const all = paletteSource();
  paletteItems = (term ? all.filter((x) => `${x.title} ${x.meta}`.toLowerCase().includes(term)) : all).slice(0, 12);
  paletteIndex = 0;
  paletteResults.innerHTML = paletteItems.length
    ? paletteItems.map((x, i) => `<button type="button" class="palette-item ${i === 0 ? 'is-active' : ''}" data-pi="${i}"><span class="palette-kind">${x.kind === 'lesson' ? 'LESSON' : 'Q&A'}</span><span class="palette-title">${esc(x.title)}</span><span class="palette-meta">${esc(x.meta)}</span></button>`).join('')
    : `<div class="palette-empty">No matches. Try “qualifying”, “type 4”, or “workflow”.</div>`;
  paletteResults.querySelectorAll('[data-pi]').forEach((b) => b.addEventListener('click', () => choosePalette(Number(b.dataset.pi))));
}
function choosePalette(i) {
  const item = paletteItems[i];
  if (!item) return;
  closePalette();
  if (item.kind === 'lesson') openLesson(item.id);
  else openInterview(item.id);
}
function movePalette(delta) {
  if (!paletteItems.length) return;
  paletteIndex = (paletteIndex + delta + paletteItems.length) % paletteItems.length;
  paletteResults.querySelectorAll('[data-pi]').forEach((b, i) => b.classList.toggle('is-active', i === paletteIndex));
  paletteResults.querySelector(`[data-pi="${paletteIndex}"]`)?.scrollIntoView({ block: 'nearest' });
}
function openPalette() {
  palette.hidden = false;
  paletteInput.value = '';
  renderPalette('');
  paletteInput.focus();
}
function closePalette() { palette.hidden = true; }

/* ── Render + events ─────────────────────────────────────────── */
function goHome() { view = 'overview'; selectedTrack = 'all'; query = ''; searchInput.value = ''; render(); }
function render() {
  renderNavigation();
  updateProgress();
  updateBottomNav();
  if (view === 'interview') { renderInterview(); return; }
  if (view === 'lesson') {
    const item = findLesson(lessons, state.activeLesson);
    if (item) { renderLesson(item); return; }
  }
  renderOverview();
}

searchInput.addEventListener('input', () => { query = searchInput.value; selectedTrack = 'all'; view = 'overview'; render(); searchInput.focus(); });
document.querySelector('.brand').addEventListener('click', (e) => { e.preventDefault(); closeDrawer(); goHome(); });
const mobileBrand = document.querySelector('.mobile-brand');
if (mobileBrand) mobileBrand.addEventListener('click', (e) => { e.preventDefault(); closeDrawer(); goHome(); });
document.querySelector('#open-interview').addEventListener('click', () => openInterview());
document.querySelector('#theme-toggle').addEventListener('click', toggleTheme);
const mobileTheme = document.querySelector('#mobile-theme');
if (mobileTheme) mobileTheme.addEventListener('click', toggleTheme);

/* Mobile drawer + bottom navigation */
const sidebar = document.querySelector('.sidebar');
const scrim = document.querySelector('#drawer-scrim');
const menuButton = document.querySelector('#mobile-menu');
function openDrawer() {
  sidebar.classList.add('is-open');
  scrim.hidden = false;
  menuButton.setAttribute('aria-expanded', 'true');
  document.body.classList.add('drawer-open');
}
function closeDrawer() {
  if (!sidebar.classList.contains('is-open')) return;
  sidebar.classList.remove('is-open');
  scrim.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('drawer-open');
}
if (menuButton) menuButton.addEventListener('click', () => sidebar.classList.contains('is-open') ? closeDrawer() : openDrawer());
if (scrim) scrim.addEventListener('click', closeDrawer);
const mobileSearch = document.querySelector('#mobile-search');
if (mobileSearch) mobileSearch.addEventListener('click', () => openPalette());

function updateBottomNav() {
  document.querySelectorAll('[data-nav]').forEach((b) => {
    const n = b.dataset.nav;
    const active = (n === 'home' && view === 'overview') || (n === 'learn' && view === 'lesson') || (n === 'interview' && view === 'interview');
    b.classList.toggle('is-active', active);
  });
}
document.querySelectorAll('[data-nav]').forEach((b) => b.addEventListener('click', () => {
  const nav = b.dataset.nav;
  closeDrawer();
  if (nav === 'home') goHome();
  else if (nav === 'learn') { if (view === 'lesson') render(); else openLesson(state.activeLesson || lessons[0].id); }
  else if (nav === 'interview') openInterview();
  else if (nav === 'search') openPalette();
}));
document.querySelector('#palette-open').addEventListener('click', openPalette);
paletteInput.addEventListener('input', () => renderPalette(paletteInput.value));
palette.addEventListener('click', (e) => { if (e.target === palette) closePalette(); });

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sidebar.classList.contains('is-open')) { e.preventDefault(); closeDrawer(); return; }
  const typing = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); palette.hidden ? openPalette() : closePalette(); return; }
  if (!palette.hidden) {
    if (e.key === 'Escape') { e.preventDefault(); closePalette(); }
    if (e.key === 'ArrowDown') { e.preventDefault(); movePalette(1); }
    if (e.key === 'ArrowUp') { e.preventDefault(); movePalette(-1); }
    if (e.key === 'Enter') { e.preventDefault(); choosePalette(paletteIndex); }
    return;
  }
  if (e.key === '/' && !typing) { e.preventDefault(); searchInput.focus(); }
  if (e.key === 'Escape' && document.activeElement === searchInput) { searchInput.value = ''; query = ''; view = 'overview'; searchInput.blur(); render(); }
});

applyTheme();
render();
