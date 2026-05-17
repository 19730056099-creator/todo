import { useMemo } from 'react';
import { useTodoStore } from '../store/useTodoStore';
import { UNCATEGORIZED } from '../utils/filter';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function FilterBar() {
  const todos = useTodoStore((s) => s.todos);
  const filter = useTodoStore((s) => s.filter);
  const setFilter = useTodoStore((s) => s.setFilter);
  const { mobile } = useMediaQuery();

  const categories = useMemo(() => {
    const set = new Set(todos.map((t) => t.category || '未分类'));
    return Array.from(set).sort();
  }, [todos]);

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 10,
        padding: mobile ? 12 : 16,
        border: '1px solid #2d2d2d',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: '#555',
          marginBottom: 10,
          letterSpacing: 1,
        }}
      >
        分类筛选
      </div>
      <div style={{
        display: 'flex',
        flexDirection: mobile ? 'row' : 'column',
        gap: 6,
        overflowX: mobile ? 'auto' : undefined,
        whiteSpace: mobile ? 'nowrap' : undefined,
        paddingBottom: mobile ? 4 : 0,
      }}>
        <CategoryButton
          label="全部任务"
          active={filter.category === ''}
          onClick={() => setFilter({ category: '' })}
          compact={mobile}
        />
        {categories.map((cat) => (
          <CategoryButton
            key={cat}
            label={cat}
            active={
              filter.category === cat ||
              (cat === '未分类' && filter.category === UNCATEGORIZED)
            }
            onClick={() =>
              setFilter({ category: cat === '未分类' ? UNCATEGORIZED : cat })
            }
            compact={mobile}
          />
        ))}
      </div>
    </div>
  );
}

function CategoryButton({
  label,
  active,
  onClick,
  compact,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: compact ? '6px 10px' : '8px 12px',
        border: active ? 'none' : '1px solid #2d2d2d',
        borderRadius: 6,
        background: active ? '#2d2d2d' : '#fff',
        color: active ? '#fff' : '#2d2d2d',
        fontSize: compact ? 12 : 13,
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.15s',
        fontWeight: active ? 600 : 400,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}
