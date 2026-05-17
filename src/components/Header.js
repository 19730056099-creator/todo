import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMediaQuery } from '../hooks/useMediaQuery';
export default function Header() {
    const { mobile } = useMediaQuery();
    return (_jsxs("div", { children: [_jsxs("div", { style: { marginBottom: mobile ? 12 : 14 }, children: [_jsx("h1", { style: {
                            margin: 0,
                            fontSize: mobile ? 22 : 30,
                            fontWeight: 800,
                            color: '#1a1a1a',
                            letterSpacing: 1,
                        }, children: "MengZhouyi\u7684\u5F85\u529E\u6E05\u5355" }), _jsx("p", { style: {
                            margin: '4px 0 0',
                            fontSize: mobile ? 12 : 13,
                            color: '#999',
                            letterSpacing: 2,
                            fontWeight: 400,
                        }, children: "TODO LIST \u00B7 \u9AD8\u6548\u7BA1\u7406\u6BCF\u4E00\u5929" })] }), _jsx("hr", { style: {
                    border: 'none',
                    borderTop: '2px solid #2d2d2d',
                    margin: 0,
                    opacity: 0.85,
                } })] }));
}
