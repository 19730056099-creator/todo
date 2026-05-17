import { useState } from 'react';
import Header from './components/Header';
import StatsPanel from './components/StatsPanel';
import FilterBar from './components/FilterBar';
import AddTodoBar from './components/AddTodoBar';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import ConfirmDialog from './components/ConfirmDialog';
import { useTodoStore } from './store/useTodoStore';

export default function App() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const deleteTodo = useTodoStore((s) => s.deleteTodo);

  const closeForm = () => setEditingId(null);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f5f0eb',
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.015) 1px, rgba(0,0,0,0.015) 3px)',
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          padding: '40px 24px 60px',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <Header />

        <div
          style={{
            display: 'flex',
            gap: 20,
            marginTop: 28,
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              flex: '0 0 220px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              position: 'sticky',
              top: 32,
            }}
          >
            <StatsPanel />
            <FilterBar />
          </div>

          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              minWidth: 0,
            }}
          >
            <AddTodoBar />
            <TodoList
              onEdit={(id) => setEditingId(id)}
              onDelete={(id) => setDeletingId(id)}
            />
          </div>
        </div>

        {editingId && <TodoForm editingId={editingId} onClose={closeForm} />}

        <ConfirmDialog
          open={deletingId !== null}
          title="删除待办"
          message="确定要删除这条待办吗？此操作不可撤销。"
          onConfirm={() => {
            if (deletingId) deleteTodo(deletingId);
            setDeletingId(null);
          }}
          onCancel={() => setDeletingId(null)}
        />
      </div>
    </div>
  );
}
