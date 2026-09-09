import type { GalleryItem } from "../content/types";
import { gallery } from "../content/gallery";
import { useRef,useState } from "react";
import { Reveal } from "./Reveal";
import { Icon } from "./Icon";
import { Link } from "react-router-dom";
import { Lightbox } from "./Lightbox";
export function GalleryRail({ items=gallery }: { items?: GalleryItem[]; }={}) {
  const rail=useRef<HTMLDivElement>(null),[index,setIndex]=useState<number|null>(null);
  const scroll=(direction: number) => rail.current?.scrollBy({ left: direction*(rail.current.clientWidth*.72),behavior: 'smooth' });
  return <section className={"chair-section section-space"}>
    <div className={"section-heading container"}>
      <Reveal>
        <p className={"eyebrow"}>
          {"The chair \u00B7 A place for stories"}
        </p>
        <h2>
          {"THE "}
          <span className={"outline"}>
            {"FAMOUS"}
          </span>
          <br />
          {"CHAIR."}
        </h2>
      </Reveal>
      <div>
        <p>
          {"M\u00E4nniskorna. \u00D6gonblicken. Hantverket."}
        </p>
        <div className={"rail-controls"}>
          <span>
            {"Svep f\u00F6r fler bilder"}
          </span>
          <button className={"icon-button"} onClick={() => scroll(-1)} aria-label={"Scrolla bilder \u00E5t v\u00E4nster"}>
            <Icon name={"arrowLeft"} />
          </button>
          <button className={"icon-button"} onClick={() => scroll(1)} aria-label={"Scrolla bilder \u00E5t h\u00F6ger"}>
            <Icon name={"arrowRight"} />
          </button>
        </div>
      </div>
    </div>
    <div className={"chair-rail"} ref={rail} tabIndex={0} aria-label={"Bildrad, scrolla eller anv\u00E4nd pilarna"}>
      {items.map((item,i) => <button className={`chair-card chair-card-${i%3}`} onClick={() => setIndex(i)} aria-label={`Öppna bilden ${item.title}`} key={item.id}>
        <img src={item.src} style={{ objectPosition: item.position }} alt={item.alt} loading={"lazy"} decoding={"async"} width={"520"} height={"680"} />
        <span className={"chair-card-number"}>
          {"0"}
          {i+1}
        </span>
        <span className={"chair-card-caption"}>
          <small>
            {item.category}
          </small>
          <strong>
            {item.title}
          </strong>
          <Icon name={"expand"} />
        </span>
      </button>)}
    </div>
    <div className={"container rail-foot"}>
      <span>
        {"En bildber\u00E4ttelse \u00B7 Inga k\u00E4ndisbes\u00F6k p\u00E5st\u00E5s."}
      </span>
      <Link className={"text-link"} to={"/galleri"}>
        {"Hela galleriet "}
        <Icon name={"arrow"} />
      </Link>
    </div>
    <Lightbox items={items} index={index} setIndex={setIndex} />
  </section>;
}
