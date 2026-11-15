import test from 'node:test';
import assert from 'node:assert/strict';
import { sims } from '../src/simulators.js';
import { lessons } from '../src/content.js';

test('every simulator used in a lesson is defined', () => {
  const used = lessons.flatMap((l) => l.sections.filter((s) => s.k === 'sim').map((s) => s.name));
  assert.ok(used.length >= 4, 'expected several simulators in lessons');
  for (const name of used) {
    assert.ok(sims[name], `missing simulator: ${name}`);
  }
});

test('change request simulator cannot go live without an explicit approval', () => {
  const s = sims.crSim.init();
  for (let k = 0; k < 4; k++) sims.crSim.act(s, 'next');
  assert.equal(s.i, 4, 'four steps should reach the Decide step');
  assert.match(sims.crSim.body(s), /Approve/);
  sims.crSim.act(s, 'reject');
  assert.equal(s.rejected, true);
  sims.crSim.act(s, 'resubmit');
  assert.equal(s.rejected, false);
});

test('each simulator starts in a valid state and can be painted', () => {
  for (const [name, sim] of Object.entries(sims)) {
    const state = sim.init();
    assert.equal(typeof sim.body(state), 'string', `${name} body must return HTML text`);
  }
});
