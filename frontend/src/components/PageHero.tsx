import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";
export function PageHero({ eyebrow,title,description,image='/images/salon-atmosphere.webp',children }: { eyebrow: string; title: ReactNode; description?: string; image?: string; children?: ReactNode; }) {
  return <section className={"page-hero"}><img src={image} alt={""} width={"1440"} height={"900"} /><div className={"page-hero-shade"} /><div className={"container"}><Link to={"/"} className={"breadcrumb"}>{"Buffalo Barbershop "}<Icon name={"arrowRight"} />{" "}{eyebrow}</Link><p className={"eyebrow"}>{eyebrow}</p><h1>{title}</h1>{description&&<p className={"page-hero-description"}>{description}</p>}{children}</div></section>;
}
