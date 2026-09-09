import type { ReactNode } from "react";
import { useRef,useEffect } from "react";
export function Reveal({ children,className='',delay=0 }: { children: ReactNode; className?: string; delay?: number; }) {
  const ref=useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el=ref.current;
    if(!el||!('IntersectionObserver' in window))
      return;
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return;
    // Content is visible without JavaScript; reveal is progressive enhancement.
    el.classList.add('reveal-ready');
    const io=new IntersectionObserver(entries => {
      if(entries.some(e => e.isIntersecting)) {
        el.classList.add('is-revealed');
        io.disconnect();
      }
    },{ threshold: .06,rootMargin: '0px 0px 45px 0px' });
    io.observe(el);
    return () => io.disconnect();
  },[]);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}
