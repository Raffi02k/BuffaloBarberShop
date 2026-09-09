import type { ReactNode } from 'react';
export function PageTransition({ children,route }: { children: ReactNode; route: string; }) {
  return <div key={route} className="page-transition">{children}</div>;
}
