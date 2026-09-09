import type { GalleryItem } from "../content/types";
import { gallery } from "../content/gallery";
import { useState,Fragment } from "react";
import { Icon } from "./Icon";
import { Lightbox } from "./Lightbox";
export function GalleryGrid({ items=gallery,filters=true }: { items?: GalleryItem[]; filters?: boolean; }={}) {
  const [filter,setFilter]=useState('Alla'),[index,setIndex]=useState<number|null>(null);
  const categories=['Alla',...new Set(items.map(i => i.category))];
  const selected=filter==='Alla'? items:items.filter(i => i.category===filter);
  return <Fragment>
    {filters&&<div className={"filter-list"} role={"group"} aria-label={"Filtrera bilder"}>
      {categories.map(c => <button aria-pressed={c===filter} className={c===filter? 'active':''} onClick={() => { setFilter(c); setIndex(null); }} key={c}>
        {c}
      </button>)}
    </div>}
    <div className={"gallery-grid"}>
      {selected.map((item,i) => <button className={"gallery-tile"} onClick={() => setIndex(i)} aria-label={`Öppna ${item.title}`} key={item.id}>
        <img src={item.src} alt={item.alt} style={{ objectPosition: item.position }} width={"600"} height={"700"} loading={"lazy"} decoding={"async"} />
        <span className={"gallery-tile-content"}>
          <small>
            {item.category}
            {item.kind==='reference'? ' / Bildreferens':''}
          </small>
          <strong>
            {item.title}
          </strong>
          <Icon name={"expand"} />
        </span>
      </button>)}
    </div>
    <Lightbox items={selected} index={index} setIndex={setIndex} />
  </Fragment>;
}
