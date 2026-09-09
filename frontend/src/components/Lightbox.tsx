import type { Dispatch,SetStateAction } from "react";
import type { GalleryItem } from "../content/types";
import { useRef,useEffect,Fragment } from "react";
import { useBodyLock } from "../hooks/useBodyLock";
import { Icon } from "./Icon";
export function Lightbox({ items,index,setIndex }: { items: GalleryItem[]; index: number|null; setIndex: Dispatch<SetStateAction<number|null>>; }) {
  const dialog=useRef<HTMLDialogElement>(null);
  useBodyLock(index!==null);
  const step=(direction: number) => {
    if(index!==null)
      setIndex((index+direction+items.length)%items.length);
  };
  useEffect(() => {
    const el=dialog.current;
    if(!el)
      return;
    if(index!==null&&!el.open)
      el.showModal();
    if(index===null&&el.open)
      el.close();
  },[index]);
  const item=index!==null? items[index]:null;
  return <dialog className={"lightbox"} ref={dialog} onCancel={() => setIndex(null)} onClose={() => setIndex(null)} onClick={event => {
    if(event.target===event.currentTarget)
      setIndex(null);
  }} onKeyDown={event => {
    if(event.key==='ArrowRight') {
      event.preventDefault();
      step(1);
    }
    if(event.key==='ArrowLeft') {
      event.preventDefault();
      step(-1);
    }
  }} aria-label={"Bildvisning"}>
    <button className={"lightbox-close icon-button"} onClick={() => setIndex(null)} aria-label={"St\u00E4ng bildvisningen"}>
      <Icon name={"close"} />
    </button>
    {item&&<Fragment>
      <div className={"lightbox-top"}>
        <span className={"eyebrow"}>
          {item.category}
        </span>
        <span>
          {(index??0)+1}
          {" / "}
          {items.length}
        </span>
      </div>
      <img className={"lightbox-image"} src={item.src} alt={item.alt} />
      <div className={"lightbox-bottom"}>
        <button className={"icon-button"} onClick={() => step(-1)} aria-label={"F\u00F6reg\u00E5ende bild"}>
          <Icon name={"arrowLeft"} />
        </button>
        <div>
          <h2>
            {item.title}
          </h2>
          <p>
            {item.kind==='reference'? 'Stämningsbild från projektunderlaget':'Bild från projektunderlaget'}
          </p>
        </div>
        <button className={"icon-button"} onClick={() => step(1)} aria-label={"N\u00E4sta bild"}>
          <Icon name={"arrowRight"} />
        </button>
      </div>
    </Fragment>}
  </dialog>;
}
