import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Header from './components/Header';
import StatsPanel from './components/StatsPanel';
import FilterBar from './components/FilterBar';
import AddTodoBar from './components/AddTodoBar';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import ConfirmDialog from './components/ConfirmDialog';
import { useTodoStore } from './store/useTodoStore';
import { useMediaQuery } from './hooks/useMediaQuery';
export default function App() {
    const [editingId, setEditingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const deleteTodo = useTodoStore((s) => s.deleteTodo);
    const { mobile } = useMediaQuery();
    const closeForm = () => setEditingId(null);
    return (_jsx("div", { style: {
            minHeight: '100vh',
            backgroundColor: '#f5f0eb',
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.015) 1px, rgba(0,0,0,0.015) 3px)',
        }, children: _jsxs("div", { style: {
                maxWidth: 1000,
                margin: '0 auto',
                padding: mobile ? '24px 16px 40px' : '40px 24px 60px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            }, children: [_jsx(Header, {}), _jsxs("div", { style: {
                        display: 'flex',
                        flexDirection: mobile ? 'column' : 'row',
                        gap: mobile ? 16 : 20,
                        marginTop: mobile ? 20 : 28,
                        alignItems: 'flex-start',
                    }, children: [_jsxs("div", { style: {
                                flex: mobile ? 'none' : '0 0 220px',
                                width: mobile ? '100%' : undefined,
                                display: 'flex',
                                flexDirection: mobile ? 'row' : 'column',
                                gap: 16,
                                position: mobile ? 'static' : 'sticky',
                                top: 32,
                            }, children: [_jsx(StatsPanel, {}), _jsx(FilterBar, {})] }), _jsxs("div", { style: {
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 16,
                                minWidth: 0,
                                width: mobile ? '100%' : undefined,
                            }, children: [_jsx(AddTodoBar, {}), _jsx(TodoList, { onEdit: (id) => setEditingId(id), onDelete: (id) => setDeletingId(id) })] })] }), editingId && _jsx(TodoForm, { editingId: editingId, onClose: closeForm }), _jsx(ConfirmDialog, { open: deletingId !== null, title: "\u5220\u9664\u5F85\u529E", message: "\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u5F85\u529E\u5417\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002", onConfirm: () => {
                        if (deletingId)
                            deleteTodo(deletingId);
                        setDeletingId(null);
                    }, onCancel: () => setDeletingId(null) })] }) }));
}
