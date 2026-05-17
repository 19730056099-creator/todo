import { useState, useEffect } from 'react';
const queries = {
    mobile: '(max-width: 639px)',
    tablet: '(min-width: 640px) and (max-width: 1023px)',
    desktop: '(min-width: 1024px)',
};
export function useMediaQuery() {
    const [matches, setMatches] = useState(() => ({
        mobile: window.matchMedia(queries.mobile).matches,
        tablet: window.matchMedia(queries.tablet).matches,
        desktop: window.matchMedia(queries.desktop).matches,
    }));
    useEffect(() => {
        const mqlList = Object.entries(queries).map(([key, query]) => {
            const mql = window.matchMedia(query);
            const handler = (e) => {
                setMatches((prev) => ({ ...prev, [key]: e.matches }));
            };
            mql.addEventListener('change', handler);
            return { mql, handler };
        });
        return () => {
            mqlList.forEach(({ mql, handler }) => mql.removeEventListener('change', handler));
        };
    }, []);
    return matches;
}
