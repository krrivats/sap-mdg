import test from 'node:test';
import assert from 'node:assert/strict';
import { tcodes, imgPaths, keywords, prefixes } from '../src/codes.js';

test('every T-code has a unique id, a code, a purpose, a reason, and a trick', () => {
  const ids = tcodes.map((c) => c.id);
  assert.equal(new Set(ids).size, ids.length, 'ids must be unique');
  for (const c of tcodes) {
    assert.ok(c.code && c.use && c.why && c.trick, `incomplete T-code: ${c.id}`);
  }
});

test('every IMG path starts in SPRO or MDGIMG and has at least four steps', () => {
  for (const p of imgPaths) {
    assert.ok(['SPRO', 'MDGIMG'].includes(p.steps[0]), `path must start in SPRO or MDGIMG: ${p.id}`);
    assert.ok(p.steps.length >= 4, `path too short: ${p.id}`);
    assert.ok(p.use && p.why && p.trick, `incomplete path: ${p.id}`);
  }
});

test('the keyword glossary explains meaning, name reason, and a trick for every word', () => {
  for (const k of keywords) {
    assert.ok(k.word && k.meaning && k.name && k.trick, `incomplete keyword: ${k.word}`);
  }
  assert.ok(keywords.length >= 30, 'glossary should be substantial');
  assert.ok(prefixes.length >= 10, 'prefix table should cover the common families');
});
