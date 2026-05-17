import { useState, useEffect, type FormEvent } from 'react';
import type { Priority, TodoFormData } from '../types/todo';
import { useTodoStore } from '../store/useTodoStore';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface Props {
  editingId: string | null;
  onClose: () => void;
}

const defaultForm: TodoFormData = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium',
  category: '',
};

const priorityOptions: { label: string; value: Priority }[] = [
  { label: '高', value: 'high' },
  { label: '中', value: 'medium' },
  { label: '低', value: 'low' },
];

export default function TodoForm({ editingId, onClose }: Props) {
  const addTodo = useTodoStore((s) => s.addTodo);
  const updateTodo = useTodoStore((s) => s.updateTodo);
  const editingTodo = editingId
    ? useTodoStore((s) => s.todos.find((t) => t.id === editingId))
    : null;
  const { mobile } = useMediaQuery();

  const [form, setForm] = useState<TodoFormData>(defaultForm);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingTodo) {
      setForm({
        title: editingTodo.title,
        description: editingTodo.description,
        dueDate: editingTodo.dueDate ?? '',
        priority: editingTodo.priority,
        category: editingTodo.category,
      });
      setError(null);
    } else {
      setForm(defaultForm);
      setError(null);
    }
  }, [editingTodo]);

  const handleChange = (
    field: keyof TodoFormData,
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error && field === 'title') setError(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('请输入待办标题');
      return;
    }
    if (editingId) {
      updateTodo(editingId, form);
    } else {
      addTodo(form);
    }
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          borderRadius: 12,
          padding: mobile ? 20 : 28,
          width: 480,
          maxWidth: '90vw',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        }}
      >
        <h2 style={{ margin: '0 0 20px', fontSize: 18 }}>
          {editingId ? '编辑待办' : '新建待办'}
        </h2>

        <div style={{ marginBottom: 16 }}>
          <label
            style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 600 }}
          >
            标题 <span style={{ color: '#e53e3e' }}>*</span>
          </label>
          <input
            type="text"
            name="form-title"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="需要做什么？"
            autoFocus
            style={{
              width: '100%',
              padding: '8px 12px',
              border: `1px solid ${error ? '#e53e3e' : '#d0d0d0'}`,
              borderRadius: 6,
              fontSize: 14,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {error && (
            <p style={{ margin: '4px 0 0', fontSize: 12, color: '#e53e3e' }}>
              {error}
            </p>
          )}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label
            style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 600 }}
          >
            描述
          </label>
          <textarea
            name="form-description"
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="补充说明（可选）"
            rows={3}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d0d0d0',
              borderRadius: 6,
              fontSize: 14,
              resize: 'vertical',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{
          display: 'flex',
          flexDirection: mobile ? 'column' : 'row',
          gap: 12,
          marginBottom: 16,
        }}>
          <div style={{ flex: 1 }}>
            <label
              style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 600 }}
            >
              优先级
            </label>
            <select
              name="form-priority"
              value={form.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d0d0d0',
                borderRadius: 6,
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            >
              {priorityOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label
              style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 600 }}
            >
              分类
            </label>
            <input
              type="text"
              name="form-category"
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
              placeholder="例如：工作"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d0d0d0',
                borderRadius: 6,
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label
            style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 600 }}
          >
            截止日期
          </label>
          <input
            type="date"
            name="form-duedate"
            value={form.dueDate}
            onChange={(e) => handleChange('dueDate', e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d0d0d0',
              borderRadius: 6,
              fontSize: 14,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 20px',
              border: '1px solid #d0d0d0',
              borderRadius: 6,
              background: '#fff',
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            取消
          </button>
          <button
            type="submit"
            style={{
              padding: '8px 20px',
              border: 'none',
              borderRadius: 6,
              background: '#4f6ef7',
              color: '#fff',
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            {editingId ? '保存' : '添加'}
          </button>
        </div>
      </form>
    </div>
  );
}
