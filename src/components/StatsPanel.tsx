import { useMemo } from 'react';
import { useTodoStore } from '../store/useTodoStore';

function computeStats(todos: { completed: boolean }[]) {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 1000) / 10 : 0;
  return { total, completed, active, completionRate };
}

function StatItem({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div
      style={{
        padding: '14px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <span style={{ fontSize: 13, color: '#777' }}>{label}</span>
      <span style={{ fontSize: 22, fontWeight: 700, color, lineHeight: 1 }}>
        {value}
      </span>
    </div>
  );
}

function Divider() {
  return <hr style={{ margin: 0, border: 'none', borderTop: '1px solid #ece8e3' }} />;
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 10,
        border: '1px solid #2d2d2d',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}

export default function StatsPanel() {
  const todos = useTodoStore((s) => s.todos);

  const stats = useMemo(() => computeStats(todos), [todos]);

  if (todos.length === 0) {
    return (
      <Card>
        <div
          style={{
            padding: 16,
            textAlign: 'center',
            color: '#999',
            fontSize: 13,
          }}
        >
          暂无数据
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <StatItem label="总任务" value={stats.total} color="#1a1a1a" />
      <Divider />
      <StatItem label="待完成" value={stats.active} color="#d97706" />
      <Divider />
      <StatItem label="已完成" value={stats.completed} color="#0d9488" />
      <Divider />
      <StatItem
        label="完成率"
        value={`${stats.completionRate}%`}
        color="#1a1a1a"
      />
    </Card>
  );
}
