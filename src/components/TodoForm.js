import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useTodoStore } from '../store/useTodoStore';
import { useMediaQuery } from '../hooks/useMediaQuery';
const defaultForm = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    category: '',
};
const priorityOptions = [
    { label: '高', value: 'high' },
    { label: '中', value: 'medium' },
    { label: '低', value: 'low' },
];
export default function TodoForm({ editingId, onClose }) {
    const addTodo = useTodoStore((s) => s.addTodo);
    const updateTodo = useTodoStore((s) => s.updateTodo);
    const editingTodo = editingId
        ? useTodoStore((s) => s.todos.find((t) => t.id === editingId))
        : null;
    const { mobile } = useMediaQuery();
    const [form, setForm] = useState(defaultForm);
    const [error, setError] = useState(null);
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
        }
        else {
            setForm(defaultForm);
            setError(null);
        }
    }, [editingTodo]);
    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (error && field === 'title')
            setError(null);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title.trim()) {
            setError('请输入待办标题');
            return;
        }
        if (editingId) {
            updateTodo(editingId, form);
        }
        else {
            addTodo(form);
        }
        onClose();
    };
    return (_jsx("div", { style: {
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
        }, onClick: (e) => {
            if (e.target === e.currentTarget)
                onClose();
        }, children: _jsxs("form", { onSubmit: handleSubmit, style: {
                background: '#fff',
                borderRadius: 12,
                padding: mobile ? 20 : 28,
                width: 480,
                maxWidth: '90vw',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            }, children: [_jsx("h2", { style: { margin: '0 0 20px', fontSize: 18 }, children: editingId ? '编辑待办' : '新建待办' }), _jsxs("div", { style: { marginBottom: 16 }, children: [_jsxs("label", { style: { display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 600 }, children: ["\u6807\u9898 ", _jsx("span", { style: { color: '#e53e3e' }, children: "*" })] }), _jsx("input", { type: "text", name: "form-title", value: form.title, onChange: (e) => handleChange('title', e.target.value), placeholder: "\u9700\u8981\u505A\u4EC0\u4E48\uFF1F", autoFocus: true, style: {
                                width: '100%',
                                padding: '8px 12px',
                                border: `1px solid ${error ? '#e53e3e' : '#d0d0d0'}`,
                                borderRadius: 6,
                                fontSize: 14,
                                outline: 'none',
                                boxSizing: 'border-box',
                            } }), error && (_jsx("p", { style: { margin: '4px 0 0', fontSize: 12, color: '#e53e3e' }, children: error }))] }), _jsxs("div", { style: { marginBottom: 16 }, children: [_jsx("label", { style: { display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 600 }, children: "\u63CF\u8FF0" }), _jsx("textarea", { name: "form-description", value: form.description, onChange: (e) => handleChange('description', e.target.value), placeholder: "\u8865\u5145\u8BF4\u660E\uFF08\u53EF\u9009\uFF09", rows: 3, style: {
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #d0d0d0',
                                borderRadius: 6,
                                fontSize: 14,
                                resize: 'vertical',
                                outline: 'none',
                                boxSizing: 'border-box',
                            } })] }), _jsxs("div", { style: {
                        display: 'flex',
                        flexDirection: mobile ? 'column' : 'row',
                        gap: 12,
                        marginBottom: 16,
                    }, children: [_jsxs("div", { style: { flex: 1 }, children: [_jsx("label", { style: { display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 600 }, children: "\u4F18\u5148\u7EA7" }), _jsx("select", { name: "form-priority", value: form.priority, onChange: (e) => handleChange('priority', e.target.value), style: {
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: '1px solid #d0d0d0',
                                        borderRadius: 6,
                                        fontSize: 14,
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }, children: priorityOptions.map((o) => (_jsx("option", { value: o.value, children: o.label }, o.value))) })] }), _jsxs("div", { style: { flex: 1 }, children: [_jsx("label", { style: { display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 600 }, children: "\u5206\u7C7B" }), _jsx("input", { type: "text", name: "form-category", value: form.category, onChange: (e) => handleChange('category', e.target.value), placeholder: "\u4F8B\u5982\uFF1A\u5DE5\u4F5C", style: {
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: '1px solid #d0d0d0',
                                        borderRadius: 6,
                                        fontSize: 14,
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    } })] })] }), _jsxs("div", { style: { marginBottom: 24 }, children: [_jsx("label", { style: { display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 600 }, children: "\u622A\u6B62\u65E5\u671F" }), _jsx("input", { type: "date", name: "form-duedate", value: form.dueDate, onChange: (e) => handleChange('dueDate', e.target.value), style: {
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #d0d0d0',
                                borderRadius: 6,
                                fontSize: 14,
                                outline: 'none',
                                boxSizing: 'border-box',
                            } })] }), _jsxs("div", { style: { display: 'flex', gap: 10, justifyContent: 'flex-end' }, children: [_jsx("button", { type: "button", onClick: onClose, style: {
                                padding: '8px 20px',
                                border: '1px solid #d0d0d0',
                                borderRadius: 6,
                                background: '#fff',
                                fontSize: 14,
                                cursor: 'pointer',
                            }, children: "\u53D6\u6D88" }), _jsx("button", { type: "submit", style: {
                                padding: '8px 20px',
                                border: 'none',
                                borderRadius: 6,
                                background: '#4f6ef7',
                                color: '#fff',
                                fontSize: 14,
                                cursor: 'pointer',
                            }, children: editingId ? '保存' : '添加' })] })] }) }));
}
