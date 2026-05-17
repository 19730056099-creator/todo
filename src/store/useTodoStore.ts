import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Todo, TodoFormData, FilterState } from '../types/todo';
import { DEFAULT_FILTER } from '../types/todo';

let nextId = Date.now();
function generateId(): string {
  nextId += 1;
  return nextId.toString(36);
}

interface TodoStore {
  todos: Todo[];
  filter: FilterState;

  addTodo: (data: TodoFormData) => void;
  updateTodo: (id: string, data: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  setFilter: (partial: Partial<FilterState>) => void;
  resetFilter: () => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      filter: { ...DEFAULT_FILTER },

      addTodo: (data) =>
        set((state) => {
          const now = new Date().toISOString();
          const todo: Todo = {
            id: generateId(),
            title: data.title.trim(),
            description: data.description.trim(),
            dueDate: data.dueDate || null,
            priority: data.priority,
            category: data.category.trim(),
            completed: false,
            createdAt: now,
            updatedAt: now,
          };
          return { todos: [...state.todos, todo] };
        }),

      updateTodo: (id, data) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id
              ? { ...t, ...data, updatedAt: new Date().toISOString() }
              : t,
          ),
        })),

      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id
              ? {
                  ...t,
                  completed: !t.completed,
                  updatedAt: new Date().toISOString(),
                }
              : t,
          ),
        })),

      setFilter: (partial) =>
        set((state) => ({
          filter: { ...state.filter, ...partial },
        })),

      resetFilter: () => set({ filter: { ...DEFAULT_FILTER } }),
    }),
    {
      name: 'todo-storage',
      partialize: (state) => ({
        todos: state.todos,
        filter: state.filter,
      }),
    },
  ),
);
