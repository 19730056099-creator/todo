import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo, useRef } from 'react';
import { useTodoStore } from '../store/useTodoStore';
import { filterTodos } from '../utils/filter';
import TodoItem from './TodoItem';
import { useMediaQuery } from '../hooks/useMediaQuery';
export default function TodoList({ onEdit, onDelete }) {
    const todos = useTodoStore((s) => s.todos);
    const filter = useTodoStore((s) => s.filter);
    const setFilter = useTodoStore((s) => s.setFilter);
    const resetFilter = useTodoStore((s) => s.resetFilter);
    const { mobile } = useMediaQuery();
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
    return (_jsxs("div", { children: [_jsxs("div", { style: {
                    display: 'flex',
                    flexDirection: mobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: mobile ? 'stretch' : 'center',
                    gap: mobile ? 8 : 0,
                    marginBottom: 12,
                    padding: '0 4px',
                }, children: [_jsx("h2", { style: {
                            margin: 0,
                            fontSize: 17,
                            fontWeight: 700,
                            color: '#1a1a1a',
                            letterSpacing: 1,
                        }, children: "\u4ECA\u65E5\u4EFB\u52A1" }), _jsx("input", { type: "text", name: "todo-search", value: searchInput, onChange: (e) => setSearchInput(e.target.value), placeholder: "\u641C\u7D22\u2026", style: {
                            padding: '6px 12px',
                            border: '1px solid #2d2d2d',
                            borderRadius: 6,
                            fontSize: 13,
                            outline: 'none',
                            width: mobile ? '100%' : 170,
                            color: '#333',
                            boxSizing: 'border-box',
                        } })] }), todos.length === 0 ? (_jsx("div", { style: {
                    background: '#fff',
                    borderRadius: 10,
                    padding: '60px 20px',
                    border: '1px solid #2d2d2d',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    textAlign: 'center',
                }, children: _jsx("p", { style: { margin: 0, fontSize: 14, color: '#999' }, children: "\u8FD8\u6CA1\u6709\u5F85\u529E\uFF0C\u5728\u4E0A\u65B9\u6DFB\u52A0\u7B2C\u4E00\u6761" }) })) : filteredTodos.length === 0 ? (_jsxs("div", { style: {
                    background: '#fff',
                    borderRadius: 10,
                    padding: '60px 20px',
                    border: '1px solid #2d2d2d',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    textAlign: 'center',
                }, children: [_jsx("p", { style: { margin: '0 0 12px', fontSize: 14, color: '#999' }, children: "\u6CA1\u6709\u5339\u914D\u7684\u5F85\u529E" }), _jsx("button", { onClick: resetFilter, style: {
                            padding: '7px 16px',
                            border: '1px solid #2d2d2d',
                            borderRadius: 6,
                            background: '#fff',
                            fontSize: 13,
                            cursor: 'pointer',
                            color: '#2d2d2d',
                        }, children: "\u91CD\u7F6E\u7B5B\u9009" })] })) : (_jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: filteredTodos.map((todo) => (_jsx(TodoItem, { todo: todo, onEdit: onEdit, onDelete: onDelete }, todo.id))) }))] }));
}
