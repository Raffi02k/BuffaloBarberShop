import { useEffect,useRef,useState } from 'react';
import { Link } from 'react-router-dom';
import { reviews,reviewSummary } from '../content/reviews';
import type { Review } from '../content/types';
import { site } from '../content/siteContent';
import { useMotion } from './MotionProvider';
import { Icon } from './Icon';
function validReview(value: unknown): value is Review {
  if(!value||typeof value!=='object') return false;
  const r=value as Record<string,unknown>;
  return typeof r.id==='string'&&typeof r.name==='string'&&r.name.length<100
    &&typeof r.text==='string'&&r.text.length<1500&&typeof r.source==='string'
    &&typeof r.url==='string'&&r.url.startsWith('https://')
    &&(r.demo===undefined||typeof r.demo==='boolean')
    &&(r.rating===undefined||(typeof r.rating==='number'&&Number.isFinite(r.rating)&&r.rating>=0&&r.rating<=5));
}
function ReviewStars({ rating,label }: { rating: number; label?: string }) {
  return <span className="review-stars" role="img" aria-label={label||`${rating.toLocaleString('sv-SE')} av 5 stjärnor`}><span aria-hidden="true">★★★★★</span><span className="review-stars-fill" style={{ width: `${rating/5*100}%` }} aria-hidden="true">★★★★★</span></span>;
}
function ReviewRow({ items,reverse,row }: { items: Review[]; reverse: boolean; row: number }) {
  const rail=useRef<HTMLDivElement>(null),group=useRef<HTMLDivElement>(null);
  const resumeAt=useRef(0),drag=useRef<{ x: number; left: number }|null>(null);
  const manual=useRef(false),pointerDown=useRef(false);
  const buttonScroll=useRef<{ from: number; to: number; started: number }|null>(null);
  const { reduced }=useMotion();
  const interact=() => { buttonScroll.current=null; manual.current=true; resumeAt.current=performance.now()+100; };
  const wrap=() => {
    const el=rail.current,distance=group.current?.offsetWidth||0;
    if(!el||reduced||!distance||distance<el.clientWidth) return;
    const previous=el.scrollLeft;
    // Keep a full copy on either side for dragging and momentum scrolling.
    const next=distance+((previous-distance)%distance+distance)%distance;
    if(Math.abs(next-previous)>.5) {
      el.scrollLeft=next;
      if(drag.current) drag.current.left+=next-previous;
    }
  };
  useEffect(() => {
    const el=rail.current;
    if(!el) return;
    if(reduced) { el.scrollLeft=0; return; }
    const initial=group.current?.offsetWidth||0;
    el.scrollLeft=initial+(reverse? 150:0);
    let frame=0,last=0,position=el.scrollLeft,visible=true;
    const observer=new IntersectionObserver(([entry]) => { visible=entry.isIntersecting; });
    observer.observe(el);
    const onScrollEnd=() => {
      if(manual.current&&!pointerDown.current&&!buttonScroll.current) resumeAt.current=0;
    };
    el.addEventListener('scrollend',onScrollEnd);
    const tick=(now: number) => {
      const distance=group.current?.offsetWidth||0;
      const delta=last? Math.min(now-last,40):0;
      last=now;
      const movement=buttonScroll.current;
      if(movement) {
        const progress=Math.min(1,Math.max(0,(now-movement.started)/420));
        const eased=1-Math.pow(1-progress,3);
        position=movement.from+(movement.to-movement.from)*eased;
        if(distance>=el.clientWidth&&distance>0) position=distance+((position-distance)%distance+distance)%distance;
        el.scrollLeft=position;
        if(progress===1) {
          buttonScroll.current=null;
          manual.current=false;
          resumeAt.current=0;
          position=el.scrollLeft;
        }
      } else if(distance>=el.clientWidth&&distance>0&&visible&&!document.hidden&&now>resumeAt.current&&!pointerDown.current&&!drag.current) {
        if(manual.current) {
          position=el.scrollLeft;
          manual.current=false;
        }
        position+=(reverse? -1:1)*delta*(reverse? .027:.03);
        position=distance+((position-distance)%distance+distance)%distance;
        el.scrollLeft=position;
      } else position=el.scrollLeft;
      frame=requestAnimationFrame(tick);
    };
    frame=requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); buttonScroll.current=null; observer.disconnect(); el.removeEventListener('scrollend',onScrollEnd); };
  },[reverse,reduced,items]);
  const scroll=(direction: number) => {
    interact();
    const el=rail.current;
    if(!el) return;
    wrap();
    const offset=direction*el.clientWidth*.72;
    if(reduced) {
      el.scrollBy({ left: offset,behavior: 'instant' });
    } else {
      // Use the same animation loop as autoplay so the two never compete.
      buttonScroll.current={ from: el.scrollLeft,to: el.scrollLeft+offset,started: performance.now() };
    }
  };
  return <div className="review-row">
    <div className="review-scroll-rail" id={`review-row-${row}`} ref={rail} tabIndex={0} role="region" aria-label={`Kortrad ${row+1}, svep eller använd pilarna`}
      onScroll={() => { if(manual.current&&!buttonScroll.current) { interact(); wrap(); } }} onWheel={interact} onKeyDown={interact} onPointerDown={event => {
        if(event.button!==0) return;
        pointerDown.current=true;
        interact();
        if(event.pointerType==='mouse'&&event.button===0) {
          drag.current={ x: event.clientX,left: event.currentTarget.scrollLeft };
          event.currentTarget.setPointerCapture(event.pointerId);
        }
      }} onPointerMove={event => {
        if(!drag.current) return;
        event.currentTarget.scrollLeft=drag.current.left-(event.clientX-drag.current.x);
        interact();
      }} onPointerUp={event => {
        pointerDown.current=false;
        drag.current=null;
        interact();
        if(event.pointerType==='mouse') resumeAt.current=0;
      }} onPointerCancel={() => { pointerDown.current=false; drag.current=null; interact(); }} onLostPointerCapture={event => {
        if(event.pointerType==='mouse') { pointerDown.current=false; drag.current=null; resumeAt.current=0; }
      }}>
      <div className="review-scroll-track">{(reduced? [0]:[0,1,2]).map(copy => <div className="marquee-group" ref={copy===0? group:undefined} key={copy} aria-hidden={copy===(reduced? 0:1)? undefined:true}>
        {(reverse? [...items].reverse():items).map(item => <article className="review-card" key={item.id}>
          <div className="review-card-top">{item.summary? <ReviewStars rating={4.8} label="Salongens samlade betyg: 4,8 av 5" />:item.rating!==undefined? <ReviewStars rating={item.rating} />:<span className="quote-mark" aria-hidden="true">“</span>}<span className="review-source"><i aria-hidden="true">{item.source.slice(0,1)}</i>{item.source}</span></div>
          {item.summary&&<span className="review-card-rating-caption">Salongens betyg · 4,8/5</span>}
          {item.summary? <p className="review-card-copy">{item.text}</p>:<blockquote>{item.text}{item.excerpt? '…':''}</blockquote>}
          <div className="review-person"><strong>{item.name}</strong><span>{item.summary? 'Om behandlingen':'Kundomdöme'}</span></div>
        </article>)}
      </div>)}</div>
    </div>
    <div className="container rail-controls review-row-controls"><span>Rad {row+1} · Svep för fler</span>
      <button className="icon-button" onClick={() => scroll(-1)} aria-label={`Scrolla kortrad ${row+1} åt vänster`} aria-controls={`review-row-${row}`}><Icon name="arrowLeft" /></button>
      <button className="icon-button" onClick={() => scroll(1)} aria-label={`Scrolla kortrad ${row+1} åt höger`} aria-controls={`review-row-${row}`}><Icon name="arrowRight" /></button>
    </div>
  </div>;
}
export function ReviewsRail() {
  const [items,setItems]=useState<Review[]>(reviews);
  useEffect(() => {
    const base=(import.meta.env.VITE_API_BASE_URL||'').replace(/\/$/,'');
    const url=import.meta.env.VITE_REVIEWS_API_URL||`${base}/api/reviews`;
    const controller=new AbortController();
    fetch(url,{ signal: controller.signal }).then(async response => {
      if(!response.ok) return;
      const data: unknown=await response.json();
      if(Array.isArray(data)&&data.length>0&&data.every(validReview)) {
        const published=data.filter(item => !item.demo).slice(0,40);
        if(published.length) setItems(published);
      }
    }).catch(() => { /* Keep sourced treatment descriptions when API is absent. */ });
    return () => controller.abort();
  },[]);
  return <section className="reviews-section section-space" aria-labelledby="reviews-heading">
    <div className="container reviews-heading"><ReviewStars rating={4.8} /><p className="eyebrow">Orden efter stolen</p>
      <h2 id="reviews-heading">DET ÄR KÄNSLAN<br /><span className="accent">SOM STANNAR.</span></h2>
      <p className="review-intro">Hantverket i stolen. Betygen från kunderna.</p>
    </div>
    <div className="container review-stats">
      <div><strong>{reviewSummary.rating}<span aria-hidden="true">★</span></strong><span>Av 5 på Bokadirekt</span></div>
      <div><strong>{reviewSummary.count}</strong><span>Kundbetyg</span></div>
      <div><strong>{reviewSummary.fiveStarCount}</strong><span>Femstjärniga betyg</span></div>
      <div><strong>AVENYN</strong><span>Göteborg · Nr 26</span></div>
    </div>
    {items.length>0&&<><div className="review-marquees">
      {[false,true].map((reverse,row) => <ReviewRow key={row} items={items} reverse={reverse} row={row} />)}
    </div>
    <div className="container reviews-foot"><span>Bokadirekt · {reviewSummary.checked}</span>
      <Link className="text-link" to="/recensioner">Alla omdömen <Icon name="arrow" /></Link></div></>}
    <div className="container reviews-cta"><a className="button button-outline" href={site.bookingUrl} target="_blank" rel="noreferrer">Läs reviews på Bokadirekt <Icon name="arrow" /></a></div>
  </section>;
}
