import { useState } from 'react';
import type { Priority } from '../types/todo';
import { useTodoStore } from '../store/useTodoStore';

const priorityOptions: { label: string; value: Priority }[] = [
  { label: '高', value: 'high' },
  { label: '中', value: 'medium' },
  { label: '低', value: 'low' },
];

export default function AddTodoBar() {
  const addTodo = useTodoStore((s) => s.addTodo);
  const todos = useTodoStore((s) => s.todos);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [error, setError] = useState<string | null>(null);

  const categories = Array.from(
    new Set(todos.map((t) => t.category).filter(Boolean)),
  ).sort();

  const handleAdd = () => {
    const trimmed = title.trim();
    if (!trimmed) {
      setError('请输入任务标题');
      return;
    }
    addTodo({
      title: trimmed,
      description: '',
      dueDate: '',
      priority,
      category,
    });
    setTitle('');
    setPriority('medium');
    setError(null);
  };

  return (
    <div style={{
      background: '#fff',
      borderRadius: 10,
      padding: '14px 16px',
      border: '1px solid #2d2d2d',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <input
          type="text"
          name="todo-title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError(null);
          }}
          placeholder="添加新的任务…"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          style={{
            flex: 1,
            padding: '8px 12px',
            border: `1px solid ${error ? '#dc2626' : '#d0d0d0'}`,
            borderRadius: 6,
            fontSize: 14,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        <select
          name="todo-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #d0d0d0',
            borderRadius: 6,
            fontSize: 13,
            outline: 'none',
            background: '#fff',
            minWidth: 100,
            color: '#333',
          }}
        >
          <option value="">未分类</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          name="todo-priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          style={{
            padding: '8px 12px',
            border: '1px solid #d0d0d0',
            borderRadius: 6,
            fontSize: 13,
            outline: 'none',
            background: '#fff',
            minWidth: 80,
            color: '#333',
          }}
        >
          {priorityOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleAdd}
          style={{
            padding: '8px 22px',
            border: '1px solid #2d2d2d',
            borderRadius: 6,
            background: '#2d2d2d',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            letterSpacing: 1,
          }}
        >
          添加
        </button>
      </div>
      {error && (
        <p style={{ margin: '6px 0 0', fontSize: 12, color: '#dc2626' }}>{error}</p>
      )}
    </div>
  );
}
