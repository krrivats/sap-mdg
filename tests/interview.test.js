import test from 'node:test';
import assert from 'node:assert/strict';
import { interviewQuestions, interviewTracks } from '../src/interview.js';

test('interview bank has unique ids and complete plain-English fields', () => {
  const ids = interviewQuestions.map((q) => q.id);
  assert.equal(new Set(ids).size, ids.length, 'ids must be unique');
  for (const q of interviewQuestions) {
    assert.ok(q.id && q.q && q.a && q.example && q.trick, `incomplete question: ${q.id}`);
    assert.ok(interviewTracks.includes(q.track), `unknown track: ${q.track}`);
  }
});

test('interview bank covers every major topic', () => {
  const covered = new Set(interviewQuestions.map((q) => q.track));
  for (const track of ['Foundations', 'Data modeling', 'UI modeling', 'Process modeling', 'MDG-M', 'MDG-F', 'Scenario']) {
    assert.ok(covered.has(track), `missing track: ${track}`);
  }
  assert.ok(interviewQuestions.length >= 60, 'bank should be substantial');
});
