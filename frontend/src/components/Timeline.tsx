import { Children } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Timeline({ children }: { children: ReactNode }) {
  return <Reveal className={"animated-timeline"}>
    <ol className={"timeline-track"}>
      {Children.map(children, (child, index) => <li className={"timeline-step"} style={{ '--step-delay': `${index * 180}ms` } as CSSProperties}>
        <span className={"timeline-marker"} aria-hidden={"true"} />
        {child}
      </li>)}
    </ol>
  </Reveal>;
}
