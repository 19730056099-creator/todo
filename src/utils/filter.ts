import type { Todo, FilterState } from '../types/todo';

export const UNCATEGORIZED = '__uncategorized__';

export function filterTodos(todos: Todo[], filter: FilterState): Todo[] {
  return todos.filter((t) => {
    if (filter.status === 'completed' && !t.completed) return false;
    if (filter.status === 'active' && t.completed) return false;
    if (filter.priority && t.priority !== filter.priority) return false;
    if (filter.category) {
      if (filter.category === UNCATEGORIZED) {
        if (t.category !== '') return false;
      } else if (t.category !== filter.category) return false;
    }
    if (filter.searchQuery) {
      const q = filter.searchQuery.toLowerCase();
      if (
        !t.title.toLowerCase().includes(q) &&
        !t.description.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });
}

export function getCategories(todos: Todo[]): string[] {
  const set = new Set(todos.map((t) => t.category || '未分类'));
  return Array.from(set).sort();
}
