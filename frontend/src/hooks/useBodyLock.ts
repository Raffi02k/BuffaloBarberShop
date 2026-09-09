import { useEffect } from "react";
export function useBodyLock(locked: boolean) {
    useEffect(() => {
        if (!locked)
            return;
        const body = document.body, y = window.scrollY;
        const original = { overflow: body.style.overflow, position: body.style.position, top: body.style.top, width: body.style.width };
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.top = `-${y}px`;
        body.style.width = '100%';
        return () => { Object.assign(body.style, original); window.scrollTo({ top: y, behavior: 'instant' }); };
    }, [locked]);
}
