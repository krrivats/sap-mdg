export function findLesson(allLessons, id) {
  return allLessons.find((lesson) => lesson.id === id);
}

export function searchLessons(allLessons, query) {
  const term = query.trim().toLocaleLowerCase();
  if (!term) return allLessons;
  return allLessons.filter((lesson) => {
    const searchable = [lesson.title, lesson.track, lesson.module, lesson.intro,
      ...(lesson.terms ?? []), ...(lesson.tags ?? [])].join(' ').toLocaleLowerCase();
    return searchable.includes(term);
  });
}

export function summarizeProgress(allLessons, completedIds) {
  const completed = allLessons.filter((lesson) => completedIds.includes(lesson.id)).length;
  const total = allLessons.length;
  return { completed, total, percent: total ? Math.round((completed / total) * 100) : 0 };
}
