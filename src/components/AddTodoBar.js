import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useTodoStore } from '../store/useTodoStore';
import { useMediaQuery } from '../hooks/useMediaQuery';
const priorityOptions = [
    { label: '高', value: 'high' },
    { label: '中', value: 'medium' },
    { label: '低', value: 'low' },
];
export default function AddTodoBar() {
    const addTodo = useTodoStore((s) => s.addTodo);
    const todos = useTodoStore((s) => s.todos);
    const { mobile, tablet } = useMediaQuery();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('medium');
    const [error, setError] = useState(null);
    const categories = Array.from(new Set(todos.map((t) => t.category).filter(Boolean))).sort();
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
    const isCompact = mobile || tablet;
    return (_jsxs("div", { style: {
            background: '#fff',
            borderRadius: 10,
            padding: isCompact ? '12px' : '14px 16px',
            border: '1px solid #2d2d2d',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }, children: [_jsxs("div", { style: {
                    display: 'flex',
                    gap: 8,
                    alignItems: 'center',
                    flexWrap: isCompact ? 'wrap' : 'nowrap',
                }, children: [_jsx("input", { type: "text", name: "todo-title", value: title, onChange: (e) => {
                            setTitle(e.target.value);
                            if (error)
                                setError(null);
                        }, placeholder: "\u6DFB\u52A0\u65B0\u7684\u4EFB\u52A1\u2026", onKeyDown: (e) => e.key === 'Enter' && handleAdd(), style: {
                            flex: isCompact ? '1 1 100%' : 1,
                            padding: '8px 12px',
                            border: `1px solid ${error ? '#dc2626' : '#d0d0d0'}`,
                            borderRadius: 6,
                            fontSize: 14,
                            outline: 'none',
                            boxSizing: 'border-box',
                        } }), _jsxs("select", { name: "todo-category", value: category, onChange: (e) => setCategory(e.target.value), style: {
                            flex: isCompact ? 1 : undefined,
                            padding: '8px 12px',
                            border: '1px solid #d0d0d0',
                            borderRadius: 6,
                            fontSize: 13,
                            outline: 'none',
                            background: '#fff',
                            minWidth: isCompact ? 0 : 100,
                            color: '#333',
                        }, children: [_jsx("option", { value: "", children: "\u672A\u5206\u7C7B" }), categories.map((cat) => (_jsx("option", { value: cat, children: cat }, cat)))] }), _jsx("select", { name: "todo-priority", value: priority, onChange: (e) => setPriority(e.target.value), style: {
                            flex: isCompact ? 1 : undefined,
                            padding: '8px 12px',
                            border: '1px solid #d0d0d0',
                            borderRadius: 6,
                            fontSize: 13,
                            outline: 'none',
                            background: '#fff',
                            minWidth: isCompact ? 0 : 80,
                            color: '#333',
                        }, children: priorityOptions.map((o) => (_jsx("option", { value: o.value, children: o.label }, o.value))) }), _jsx("button", { type: "button", onClick: handleAdd, style: {
                            flex: isCompact ? 1 : undefined,
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
                        }, children: "\u6DFB\u52A0" })] }), error && (_jsx("p", { style: { margin: '6px 0 0', fontSize: 12, color: '#dc2626' }, children: error }))] }));
}
