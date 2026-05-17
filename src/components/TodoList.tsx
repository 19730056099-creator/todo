import { useState, useEffect, useMemo, useRef } from 'react';
import { useTodoStore } from '../store/useTodoStore';
import { filterTodos } from '../utils/filter';
import TodoItem from './TodoItem';

interface Props {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ onEdit, onDelete }: Props) {
  const todos = useTodoStore((s) => s.todos);
  const filter = useTodoStore((s) => s.filter);
  const setFilter = useTodoStore((s) => s.setFilter);
  const resetFilter = useTodoStore((s) => s.resetFilter);

  const [searchInput, setSearchInput] = useState(filter.searchQuery);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) {
      setSearchInput(filter.searchQuery);
    }
    initialized.current = true;
  }, [filter.searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== filter.searchQuery) {
        setFilter({ searchQuery: searchInput });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput, filter.searchQuery, setFilter]);

  const filteredTodos = useMemo(() => filterTodos(todos, filter), [todos, filter]);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
          padding: '0 4px',
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 17,
            fontWeight: 700,
            color: '#1a1a1a',
            letterSpacing: 1,
          }}
        >
          今日任务
        </h2>
        <input
          type="text"
          name="todo-search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="搜索…"
          style={{
            padding: '6px 12px',
            border: '1px solid #2d2d2d',
            borderRadius: 6,
            fontSize: 13,
            outline: 'none',
            width: 170,
            color: '#333',
          }}
        />
      </div>

      {todos.length === 0 ? (
        <div
          style={{
            background: '#fff',
            borderRadius: 10,
            padding: '60px 20px',
            border: '1px solid #2d2d2d',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            textAlign: 'center',
          }}
        >
          <p style={{ margin: 0, fontSize: 14, color: '#999' }}>
            还没有待办，在上方添加第一条
          </p>
        </div>
      ) : filteredTodos.length === 0 ? (
        <div
          style={{
            background: '#fff',
            borderRadius: 10,
            padding: '60px 20px',
            border: '1px solid #2d2d2d',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            textAlign: 'center',
          }}
        >
          <p style={{ margin: '0 0 12px', fontSize: 14, color: '#999' }}>
            没有匹配的待办
          </p>
          <button
            onClick={resetFilter}
            style={{
              padding: '7px 16px',
              border: '1px solid #2d2d2d',
              borderRadius: 6,
              background: '#fff',
              fontSize: 13,
              cursor: 'pointer',
              color: '#2d2d2d',
            }}
          >
            重置筛选
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
