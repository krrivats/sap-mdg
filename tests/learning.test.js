import test from 'node:test';
import assert from 'node:assert/strict';
import { findLesson, searchLessons, summarizeProgress } from '../src/learning.js';
import { lessons } from '../src/content.js';

test('findLesson returns a lesson by its stable id', () => {
  assert.equal(findLesson(lessons, 'mdg-basics')?.title, 'MDG in plain words');
  assert.equal(findLesson(lessons, 'missing'), undefined);
});

test('searchLessons matches title, topic, and explanation text without case sensitivity', () => {
  assert.ok(searchLessons(lessons, 'ASSOCIATION').some((lesson) => lesson.id === 'model-associations'));
  assert.ok(searchLessons(lessons, 'financial').some((lesson) => lesson.track === 'MDG-F'));
  assert.deepEqual(searchLessons(lessons, 'no such lesson term'), []);
});

test('summarizeProgress counts completed lessons and computes a bounded percentage', () => {
  assert.deepEqual(summarizeProgress(lessons, ['mdg-basics', 'dm-overview']), {
    completed: 2,
    total: lessons.length,
    percent: Math.round((2 / lessons.length) * 100)
  });
  assert.equal(summarizeProgress([], []).percent, 0);
});
