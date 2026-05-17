import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMediaQuery } from '../hooks/useMediaQuery';
export default function ConfirmDialog({ open, title, message, confirmText = '确定', cancelText = '取消', onConfirm, onCancel, }) {
    const { mobile } = useMediaQuery();
    if (!open)
        return null;
    return (_jsx("div", { style: {
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: 16,
        }, onClick: (e) => {
            if (e.target === e.currentTarget)
                onCancel();
        }, children: _jsxs("div", { style: {
                background: '#fff',
                borderRadius: 12,
                padding: mobile ? 20 : 28,
                width: 380,
                maxWidth: '100%',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            }, children: [_jsx("h2", { style: { margin: '0 0 8px', fontSize: 18 }, children: title }), _jsx("p", { style: { margin: '0 0 24px', fontSize: 14, color: '#555', lineHeight: 1.6 }, children: message }), _jsxs("div", { style: {
                        display: 'flex',
                        gap: 10,
                        justifyContent: 'flex-end',
                        flexDirection: mobile ? 'column-reverse' : 'row',
                    }, children: [_jsx("button", { type: "button", onClick: onCancel, style: {
                                padding: '10px 20px',
                                border: '1px solid #d0d0d0',
                                borderRadius: 6,
                                background: '#fff',
                                fontSize: 14,
                                cursor: 'pointer',
                            }, children: cancelText }), _jsx("button", { type: "button", onClick: onConfirm, style: {
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: 6,
                                background: '#e53e3e',
                                color: '#fff',
                                fontSize: 14,
                                cursor: 'pointer',
                            }, children: confirmText })] })] }) }));
}
