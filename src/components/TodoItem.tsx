import { memo } from 'react';
import type { Todo, Priority } from '../types/todo';
import { useTodoStore } from '../store/useTodoStore';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface Props {
  todo: Todo;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityLabel: Record<Priority, string> = {
  high: '高',
  medium: '中',
  low: '低',
};
const priorityBg: Record<Priority, string> = {
  high: '#fef3c7',
  medium: '#ffedd5',
  low: '#f0fdfa',
};
const priorityColor: Record<Priority, string> = {
  high: '#b45309',
  medium: '#c2410c',
  low: '#0f766e',
};

const today = new Date();
const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

function TodoItem({ todo, onEdit, onDelete }: Props) {
  const toggleTodo = useTodoStore((s) => s.toggleTodo);
  const { mobile } = useMediaQuery();
  const isOverdue = !!todo.dueDate && todo.dueDate < todayStr && !todo.completed;

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 10,
        padding: mobile ? '10px 12px' : '12px 16px',
        border: '1px solid #2d2d2d',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        opacity: todo.completed ? 0.5 : 1,
        display: 'flex',
        gap: mobile ? 8 : 12,
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        transition: 'opacity 0.2s',
      }}
    >
      <input
        type="checkbox"
        name="todo-status"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        style={{
          width: 18,
          height: 18,
          cursor: 'pointer',
          flexShrink: 0,
          accentColor: '#0d9488',
          marginTop: mobile ? 2 : 0,
        }}
      />

      <div style={{
        flex: mobile ? '1 1 calc(100% - 30px)' : 1,
        minWidth: 0,
        order: mobile ? 2 : undefined,
      }}>
        <div
          style={{
            fontSize: mobile ? 14 : 15,
            fontWeight: 600,
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? '#999' : '#1a1a1a',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {todo.title.length > 200
            ? todo.title.slice(0, 200) + '…'
            : todo.title}
        </div>
        {todo.description && (
          <div
            style={{
              fontSize: 13,
              color: '#999',
              marginTop: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {todo.description}
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          gap: 6,
          alignItems: 'center',
          flexShrink: 0,
          flexWrap: 'wrap',
          width: mobile ? '100%' : undefined,
          marginLeft: mobile ? 26 : undefined,
        }}
      >
        {todo.category && (
          <span
            style={{
              fontSize: 11,
              padding: '2px 8px',
              borderRadius: 4,
              border: '1px solid #d0d0d0',
              color: '#666',
            }}
          >
            {todo.category}
          </span>
        )}
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: 4,
            background: priorityBg[todo.priority],
            color: priorityColor[todo.priority],
          }}
        >
          {priorityLabel[todo.priority]}
        </span>
        {todo.dueDate && (
          <span
            style={{
              fontSize: 11,
              color: isOverdue ? '#dc2626' : '#999',
              whiteSpace: 'nowrap',
            }}
          >
            {isOverdue ? '已过期 ' : ''}
            {todo.dueDate}
          </span>
        )}
        <div style={{ display: 'flex', gap: 4, marginLeft: mobile ? 0 : 4 }}>
          <button
            onClick={() => onEdit(todo.id)}
            style={{
              padding: mobile ? '6px 14px' : '4px 10px',
              border: '1px solid #2d2d2d',
              borderRadius: 5,
              background: '#fff',
              fontSize: 12,
              cursor: 'pointer',
              color: '#2d2d2d',
            }}
          >
            编辑
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            style={{
              padding: mobile ? '6px 14px' : '4px 10px',
              border: '1px solid #dc2626',
              borderRadius: 5,
              background: '#fff',
              fontSize: 12,
              cursor: 'pointer',
              color: '#dc2626',
            }}
          >
            删除
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(TodoItem);
