// Interactive learning simulators. Each one is a small game-like model you can click.
const escSim = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const CR_STEPS = [
  { k: 'Request', e: '📝', t: 'Someone asks for a change and says why.' },
  { k: 'Edit', e: '✏️', t: 'New values go into the draft area. Live data is untouched.' },
  { k: 'Validate', e: '🔍', t: 'The system runs its checks. A red message stops the request.' },
  { k: 'Review', e: '👀', t: 'The right team reads the request and the reason.' },
  { k: 'Decide', e: '⚖️', t: 'The gate. Approve, reject, or send it back.' },
  { k: 'Go live', e: '🚀', t: 'Approved data becomes live. Other systems can then receive it.' }
];

const OBJECTS = [
  { n: 'Material general data', e: '📦', t: 1 },
  { n: 'Material–Plant data', e: '🔗', t: 4 },
  { n: 'Plant list (kept outside MDG)', e: '🏭', t: 3 },
  { n: 'Small priority list (kept inside MDG)', e: '📋', t: 2 },
  { n: 'Customer general data', e: '🧑‍💼', t: 1 },
  { n: 'Customer contact rows (only under a customer)', e: '📇', t: 4 }
];
const TYPE_WHY = {
  1: 'Type 1 is the main object. It has its own key and its own tables.',
  2: 'Type 2 is a pick list kept inside MDG.',
  3: 'Type 3 is a pick list kept outside MDG.',
  4: 'Type 4 is child data. It has no key of its own, so it lives under a type 1.'
};

export const sims = {
  modeSim: {
    init: () => ({ mode: 'reuse' }),
    body(s) {
      const reuse = s.mode === 'reuse';
      const info = reuse
        ? { store: '🗄️ Existing tables', detail: 'MARA · MARC · KNA1', msg: 'Live data goes into tables SAP already has.', best: 'Standard S/4HANA areas, and custom objects that must use the existing tables.', watch: 'You may need a reuse class to read those tables.' }
        : { store: '🛠️ MDG-built tables', detail: 'generated from your model', msg: 'MDG builds its own live tables from your data model.', best: 'MDG Financials (model 0G), and new custom objects with no old table.', watch: 'Your model sets the table shape, so review the model carefully.' };
      return `<div class="sim-boxes">
          <div class="sim-box"><small>YOUR MODEL</small><b>🧱 Entity types</b><span>things + fields</span></div>
          <div class="sim-link">━━▶ ${reuse ? 'reuse' : 'build'}</div>
          <div class="sim-box sim-box-wide ${reuse ? '' : 'sim-pop'}"><small>LIVE DATA IS KEPT IN</small><b>${info.store}</b><span>${escSim(info.detail)}</span></div>
        </div>
        <div class="sim-msg">${escSim(info.msg)}</div>
        <div class="sim-two">
          <div class="sim-card"><small>BEST FOR</small><p>${escSim(info.best)}</p></div>
          <div class="sim-card"><small>WATCH OUT</small><p>${escSim(info.watch)}</p></div>
        </div>
        <div class="sim-btns">
          <button class="sim-btn ${reuse ? 'is-on' : ''}" data-act="mode" data-m="reuse">🗄️ Reuse mode</button>
          <button class="sim-btn ${reuse ? '' : 'is-on'}" data-act="mode" data-m="flex">🛠️ Flex mode</button>
        </div>`;
    },
    act(s, a, d) {
      if (a === 'mode') s.mode = d.m;
    }
  },

  deploySim: {
    init: () => ({ mode: 'hub', sent: 0 }),
    body(s) {
      const hub = s.mode === 'hub';
      const visual = hub
        ? `<div class="sim-hub">
             <div class="sim-box"><small>CENTRAL</small><b>🧠 MDG hub</b><span>approves data</span></div>
             <div class="sim-spokes">
               <span class="sim-spoke sim-packet" style="animation-delay:0s">📤</span>
               <span class="sim-spoke sim-packet" style="animation-delay:.4s">📤</span>
               <span class="sim-spoke sim-packet" style="animation-delay:.8s">📤</span>
             </div>
             <div class="sim-targets">
               <div class="sim-box"><b>🏭 ECC</b></div>
               <div class="sim-box"><b>🏢 S/4HANA</b></div>
               <div class="sim-box"><b>☁️ Cloud app</b></div>
             </div>
           </div>`
        : `<div class="sim-box sim-box-wide"><small>ONE SYSTEM</small><b>🧩 MDG + daily business work</b>
             <div class="sim-two sim-two-tight"><span>✅ approve</span><span>🛒 buy and sell</span></div></div>`;
      return `${visual}
        <div class="sim-msg ${hub ? '' : 'is-good'}">${hub ? 'One central system approves data. Other systems receive the approved copy.' : 'Governance and daily work share one system. Simpler, but one system carries more load.'}</div>
        <div class="sim-btns">
          <button class="sim-btn ${hub ? 'is-on' : ''}" data-act="mode" data-m="hub">🧠 Hub</button>
          <button class="sim-btn ${hub ? '' : 'is-on'}" data-act="mode" data-m="co">🧩 Co-deployment</button>
          <button class="sim-btn" data-act="send" ${hub ? '' : 'disabled'}>📤 Send approved data</button>
        </div>
        <p class="sim-count">${hub ? `Updates sent from the hub: ${s.sent}` : 'Switch to hub to see data sent to other systems.'}</p>`;
    },
    act(s, a, d) {
      if (a === 'mode') s.mode = d.m;
      if (a === 'send' && s.mode === 'hub') s.sent += 1;
    }
  },

  crSim: {
    init: () => ({ i: 0, rejected: false, note: '' }),
    body(s) {
      const live = s.i >= 5;
      const rail = CR_STEPS.map((st, n) => {
        const cls = n < s.i ? 'is-done' : n === s.i ? 'is-current' : '';
        return `<div class="sim-step ${cls}"><span class="se">${st.e}</span>${escSim(st.k)}</div>`;
      }).join('');
      const msg = s.rejected
        ? '↩️ Sent back to the requester. Fix the draft, then send it again.'
        : live ? '🎉 Live. The business can now use this data.' : CR_STEPS[s.i].t;
      const cls = s.rejected ? 'is-bad' : live ? 'is-good' : '';
      return `<div class="sim-rail">${rail}</div>
        <div class="sim-msg ${cls}">${escSim(msg)}</div>
        <div class="sim-live">
          <div class="sim-card"><small>DRAFT AREA</small><b>${live ? 'Empty' : '📝 Bolt A (draft)'}</b></div>
          <div class="sim-card ${live ? 'sim-pop' : ''}"><small>LIVE AREA</small><b>${live ? '✅ Bolt A' : '—'}</b></div>
        </div>
        <div class="sim-btns">
          <button class="sim-btn ${s.i === 4 && !s.rejected ? 'is-on' : ''}" data-act="next" ${live || s.rejected ? 'disabled' : ''}>${s.i === 4 ? '✅ Approve' : 'Next step ▶'}</button>
          <button class="sim-btn" data-act="reject" ${s.i === 4 && !s.rejected ? '' : 'disabled'}>✋ Reject</button>
          <button class="sim-btn" data-act="resubmit" ${s.rejected ? '' : 'disabled'}>🔁 Fix and send again</button>
          <button class="sim-btn" data-act="reset">↺ Start over</button>
        </div>`;
    },
    act(s, a) {
      if (a === 'next' && s.i < 5 && !s.rejected) s.i += 1;
      if (a === 'reject' && s.i === 4) { s.rejected = true; s.i = 1; }
      if (a === 'resubmit' && s.rejected) { s.rejected = false; s.i = 2; }
      if (a === 'reset') { s.i = 0; s.rejected = false; }
    }
  },

  linkSim: {
    init: () => ({ lead: false, qual: false, extra: false }),
    body(s) {
      const ok = s.lead && s.qual && !s.extra;
      let msg = 'Turn the links on. A type 4 needs one leading link and one qualifying link.';
      let cls = '';
      if (s.extra) { msg = '✋ Only one leading link is allowed. Remove the second one.'; cls = 'is-bad'; }
      else if (!s.lead) { msg = '✋ A type 4 has no context yet. Add a leading link from Material.'; cls = 'is-bad'; }
      else if (!s.qual) { msg = '✋ The key has no plant yet. Add a qualifying link from Plant.'; cls = 'is-bad'; }
      else { msg = '✅ Valid. The Material–Plant key is Material number + Plant.'; cls = 'is-good'; }
      return `<div class="sim-boxes">
          <div class="sim-box"><small>TYPE 1</small><b>📦 Material</b><span>key: material no.</span></div>
          <div class="sim-link">${s.lead ? '━━ leading ━━▶' : '┄┄ no link ┄┄'}</div>
          <div class="sim-box"><small>TYPE 4</small><b>🔗 Material–Plant</b><span class="sim-key">${ok ? 'MATNR + WERKS' : s.lead ? 'MATNR + ?' : '?'}</span></div>
          <div class="sim-link">${s.qual ? '◀━━ qualifying ━━' : '◀┄┄ no link ┄┄'}</div>
          <div class="sim-box"><small>TYPE 3</small><b>🏭 Plant</b><span>key: plant (WERKS)</span></div>
        </div>
        <div class="sim-msg ${cls}">${escSim(msg)}</div>
        <div class="sim-btns">
          <button class="sim-btn ${s.lead ? 'is-on' : ''}" data-act="lead">📦→🔗 Leading link ${s.lead ? 'on' : 'off'}</button>
          <button class="sim-btn ${s.qual ? 'is-on' : ''}" data-act="qual">🏭→🔗 Qualifying link ${s.qual ? 'on' : 'off'}</button>
          <button class="sim-btn ${s.extra ? 'is-on' : ''}" data-act="extra" ${s.lead ? '' : 'disabled'}>➕ Second leading link ${s.extra ? 'on' : 'off'}</button>
          <button class="sim-btn" data-act="reset">↺ Reset</button>
        </div>`;
    },
    act(s, a) {
      if (a === 'lead') { s.lead = !s.lead; if (!s.lead) { s.extra = false; } }
      if (a === 'qual') s.qual = !s.qual;
      if (a === 'extra' && s.lead) s.extra = !s.extra;
      if (a === 'reset') { s.lead = false; s.qual = false; s.extra = false; }
    }
  },

  typeSim: {
    init: () => ({ i: 0, score: 0, picked: null }),
    body(s) {
      if (s.i >= OBJECTS.length) {
        const pct = Math.round((s.score / OBJECTS.length) * 100);
        const note = pct === 100 ? '🏆 Perfect. You can classify entity types.' : pct >= 67 ? '👍 Good. Re-read the cards you missed.' : '📚 Try again. Use the memory hook: 1 Root, 2 In, 3 Out, 4 Under.';
        return `<div class="sim-final"><div class="sim-score">${s.score} / ${OBJECTS.length}</div><p>${escSim(note)}</p><button class="sim-btn" data-act="restart">↺ Play again</button></div>`;
      }
      const o = OBJECTS[s.i];
      const answered = s.picked !== null;
      const right = answered && s.picked === o.t;
      const feedback = answered ? `${right ? '✅ Correct.' : `❌ It is type ${o.t}.`} ${TYPE_WHY[o.t]}` : 'Pick the type. Think: does it have its own key, or does it live under something?';
      const btns = [1, 2, 3, 4].map((t) => {
        let cls = '';
        if (answered && t === o.t) cls = 'is-on';
        return `<button class="sim-btn ${cls}" data-act="pick" data-t="${t}" ${answered ? 'disabled' : ''}>Type ${t}</button>`;
      }).join('');
      return `<div class="sim-progress"><span style="width:${(s.i / OBJECTS.length) * 100}%"></span></div>
        <div class="sim-object"><span class="sim-emoji">${o.e}</span><b>${escSim(o.n)}</b><small>${s.i + 1} of ${OBJECTS.length} · score ${s.score}</small></div>
        <div class="sim-btns sim-types">${btns}</div>
        <div class="sim-msg ${answered ? (right ? 'is-good' : 'is-bad') : ''}">${escSim(feedback)}</div>
        <div class="sim-btns"><button class="sim-btn" data-act="next" ${answered ? '' : 'disabled'}>Next ▶</button></div>`;
    },
    act(s, a, d) {
      if (a === 'pick' && s.picked === null && s.i < OBJECTS.length) {
        s.picked = Number(d.t);
        if (s.picked === OBJECTS[s.i].t) s.score += 1;
      }
      if (a === 'next' && s.picked !== null) { s.i += 1; s.picked = null; }
      if (a === 'restart') { s.i = 0; s.score = 0; s.picked = null; }
    }
  },

  cardSim: {
    init: () => ({ n: 3, mode: '1:N' }),
    body(s) {
      const dots = Array.from({ length: s.n }, (_, k) => `<span class="sim-dot" style="animation-delay:${k * 60}ms">🏭</span>`).join('');
      const bad = s.mode === '1:1' && s.n > 1;
      const msg = bad ? '✋ 1:1 allows only one plant record for this material. Choose 1:N or lower the number.' : s.mode === '1:1' ? '✅ One material, one record. That is 1:1.' : `✅ One material, ${s.n} plant records. That is 1:N.`;
      return `<div class="sim-boxes"><div class="sim-box"><small>FROM</small><b>📦 Material</b></div><div class="sim-link">${s.mode}</div></div>
        <div class="sim-dots">${dots}</div>
        <div class="sim-msg ${bad ? 'is-bad' : 'is-good'}">${escSim(msg)}</div>
        <label class="sim-label">How many plant records: <b>${s.n}</b>
          <input class="sim-range" type="range" min="1" max="6" value="${s.n}" data-input="n" aria-label="Number of plant records"></label>
        <div class="sim-btns">
          <button class="sim-btn ${s.mode === '1:1' ? 'is-on' : ''}" data-act="mode" data-m="1:1">1:1 one to one</button>
          <button class="sim-btn ${s.mode === '1:N' ? 'is-on' : ''}" data-act="mode" data-m="1:N">1:N one to many</button>
        </div>`;
    },
    act(s, a, d) {
      if (a === 'mode') s.mode = d.m;
    },
    input(s, k, v, el) {
      if (k !== 'n') return;
      s.n = Number(v);
      const dots = Array.from({ length: s.n }, (_, i) => `<span class="sim-dot">🏭</span>`).join('');
      el.querySelector('.sim-dots').innerHTML = dots;
      el.querySelector('.sim-label b').textContent = String(s.n);
      const bad = s.mode === '1:1' && s.n > 1;
      const msg = bad ? '✋ 1:1 allows only one plant record for this material. Choose 1:N or lower the number.' : s.mode === '1:1' ? '✅ One material, one record. That is 1:1.' : `✅ One material, ${s.n} plant records. That is 1:N.`;
      const m = el.querySelector('.sim-msg');
      m.className = `sim-msg ${bad ? 'is-bad' : 'is-good'}`;
      m.textContent = msg;
      return false;
    }
  }
};

export function initSims(root) {
  root.querySelectorAll('[data-sim]').forEach((el) => {
    const sim = sims[el.dataset.sim];
    if (!sim) return;
    const state = sim.init();
    const paint = () => { el.querySelector('.sim-body').innerHTML = sim.body(state); };
    el.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-act]');
      if (!btn || btn.disabled) return;
      sim.act(state, btn.dataset.act, btn.dataset);
      paint();
    });
    el.addEventListener('input', (e) => {
      if (e.target.dataset.input && sim.input) {
        const repaint = sim.input(state, e.target.dataset.input, e.target.value, el);
        if (repaint !== false) paint();
      }
    });
    paint();
  });
}
