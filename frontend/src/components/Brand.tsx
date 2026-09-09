import type { MouseEvent } from "react";
import { useLocation,Link } from "react-router-dom";
export function Brand({ large=false }: { large?: boolean; }={}) {
  const { pathname }=useLocation();
  return <Link className={`brand ${large? 'brand-large':''}`} to={"/"} aria-label={"Buffalo Barbershop, till startsidan"} onClick={(event: MouseEvent<HTMLAnchorElement>) => {
    if(pathname==='/') {
      event.preventDefault();
      window.scrollTo({ top: 0,behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches? 'instant':'smooth' });
    }
  }}><img src={"/images/buffalo-emblem.webp"} width={"50"} height={"52"} alt={""} /><span>{"BUFFALO"}<small>{"BARBERSHOP"}</small></span></Link>;
}
