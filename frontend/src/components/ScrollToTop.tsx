import { useLocation } from "react-router-dom";
import { useEffect } from "react";
export function ScrollToTop() {
  const { pathname,hash }=useLocation();
  useEffect(() => {
    const timer=requestAnimationFrame(() => {
      if(hash) {
        try {
          document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'smooth' });
        }
        catch { /* Ignore malformed fragments. */ }
      }
      else
        window.scrollTo({ top: 0,behavior: 'instant' });
    });
    return () => cancelAnimationFrame(timer);
  },[pathname,hash]);
  return null;
}
