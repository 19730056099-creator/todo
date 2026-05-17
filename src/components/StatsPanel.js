import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useTodoStore } from '../store/useTodoStore';
import { useMediaQuery } from '../hooks/useMediaQuery';
function computeStats(todos) {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 1000) / 10 : 0;
    return { total, completed, active, completionRate };
}
function StatItem({ label, value, color, }) {
    return (_jsxs("div", { style: {
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
        }, children: [_jsx("span", { style: { fontSize: 22, fontWeight: 700, color, lineHeight: 1 }, children: value }), _jsx("span", { style: { fontSize: 12, color: '#777' }, children: label })] }));
}
function Card({ children }) {
    return (_jsx("div", { style: {
            background: '#fff',
            borderRadius: 10,
            border: '1px solid #2d2d2d',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            overflow: 'hidden',
        }, children: children }));
}
export default function StatsPanel() {
    const todos = useTodoStore((s) => s.todos);
    const { mobile } = useMediaQuery();
    const stats = useMemo(() => computeStats(todos), [todos]);
    if (todos.length === 0) {
        return (_jsx(Card, { children: _jsx("div", { style: {
                    padding: 16,
                    textAlign: 'center',
                    color: '#999',
                    fontSize: 13,
                }, children: "\u6682\u65E0\u6570\u636E" }) }));
    }
    if (mobile) {
        return (_jsx(Card, { children: _jsxs("div", { style: {
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 0,
                }, children: [_jsx(StatItem, { label: "\u603B\u4EFB\u52A1", value: stats.total, color: "#1a1a1a" }), _jsx(StatItem, { label: "\u5F85\u5B8C\u6210", value: stats.active, color: "#d97706" }), _jsx(StatItem, { label: "\u5DF2\u5B8C\u6210", value: stats.completed, color: "#0d9488" }), _jsx(StatItem, { label: "\u5B8C\u6210\u7387", value: `${stats.completionRate}%`, color: "#1a1a1a" })] }) }));
    }
    return (_jsxs(Card, { children: [_jsx(StatItem, { label: "\u603B\u4EFB\u52A1", value: stats.total, color: "#1a1a1a" }), _jsx(Divider, {}), _jsx(StatItem, { label: "\u5F85\u5B8C\u6210", value: stats.active, color: "#d97706" }), _jsx(Divider, {}), _jsx(StatItem, { label: "\u5DF2\u5B8C\u6210", value: stats.completed, color: "#0d9488" }), _jsx(Divider, {}), _jsx(StatItem, { label: "\u5B8C\u6210\u7387", value: `${stats.completionRate}%`, color: "#1a1a1a" })] }));
}
const Divider = () => (_jsx("hr", { style: { margin: 0, border: 'none', borderTop: '1px solid #ece8e3' } }));
