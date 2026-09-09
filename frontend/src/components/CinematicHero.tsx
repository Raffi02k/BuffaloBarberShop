import { useRef,useState,useEffect } from "react";
import { useMotion } from "./MotionProvider";
import { site } from "../content/siteContent";
import { BookingButton } from "./BookingButton";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";
const clamp=(n: number) => Math.max(0,Math.min(1,n));
export function CinematicHero() {
  const section=useRef<HTMLElement>(null),video=useRef<HTMLVideoElement>(null);
  const [ready,setReady]=useState(false),[active,setActive]=useState(0);
  const { reduced,paused,toggle }=useMotion();
  useEffect(() => {
    const el=section.current;
    if(!el)
      return;
    const movie=video.current;
    if(reduced) {
      movie?.pause();
      el.querySelectorAll<HTMLElement>('[data-scene]').forEach(panel => { panel.inert=false; });
      return;
    }
    movie?.pause();
    let frame=0,lastStage=-1,requestedTime=-1;
    const panels=Array.from(el.querySelectorAll<HTMLElement>('[data-scene]'));
    const posters=Array.from(el.querySelectorAll<HTMLImageElement>('[data-poster]'));
    const update=() => {
      frame=0;
      const box=el.getBoundingClientRect();
      const p=clamp(-box.top/Math.max(1,box.height-window.innerHeight));
      const current=p<.32? 0:p<.7? 1:2;
      if(current!==lastStage) {
        lastStage=current;
        setActive(current);
      }
      const opacity=[1-clamp((p-.20)/.12),Math.min(clamp((p-.24)/.12),clamp((.76-p)/.13)),clamp((p-.67)/.13)];
      panels.forEach((panel,i) => {
        panel.style.opacity=String(opacity[i]);
        panel.style.visibility=opacity[i]<.02? 'hidden':'visible';
        panel.style.transform=`translate3d(${(1-opacity[i])*(i===1? 55:-55)}px,0,0)`;
        panel.style.pointerEvents=opacity[i]>.45? 'auto':'none';
        panel.inert=opacity[i]<.45;
      });
      posters.forEach((poster,i) => { poster.style.opacity=String(opacity[i]); poster.style.transform=`scale(${1.035+p*.065})`; });
      el.style.setProperty('--story-progress',String(p));
      if(movie&&Number.isFinite(movie.duration)&&movie.duration>0) {
        movie.pause();
        const target=Math.max(0,Math.min(movie.duration-.06,p*movie.duration));
        if(!movie.seeking&&Math.abs(target-requestedTime)>.03&&Math.abs(movie.currentTime-target)>.055) {
          requestedTime=target;
          movie.currentTime=target;
        }
      }
    };
    const schedule=() => {
      if(!frame)
        frame=requestAnimationFrame(update);
    };
    const observer=new IntersectionObserver(([entry]) => {
      if(!entry.isIntersecting)
        movie?.pause();
      else
        schedule();
    },{ threshold: 0 });
    observer.observe(el);
    window.addEventListener('scroll',schedule,{ passive: true });
    window.addEventListener('resize',schedule);
    movie?.addEventListener('loadedmetadata',schedule);
    movie?.addEventListener('seeked',schedule);
    schedule();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll',schedule); window.removeEventListener('resize',schedule); movie?.removeEventListener('loadedmetadata',schedule); movie?.removeEventListener('seeked',schedule); };
  },[reduced]);
  function jump(index: number) {
    const el=section.current;
    if(!el)
      return;
    const steps=[0,.49,.9];
    window.scrollTo({ top: el.getBoundingClientRect().top+window.scrollY+(el.offsetHeight-window.innerHeight)*steps[index],behavior: reduced? 'instant':'smooth' });
  }
  return <section className={"cinema"} ref={section} data-reduced={reduced} aria-label={"Buffalo Barbershop, en introduktion i tre kapitel"}>
    <div className={"cinema-sticky"}>
      <div className={"cinema-media"} aria-hidden={"true"}>
        {['/images/barber-craft.webp','/images/salon-atmosphere.webp','/images/kenais-cut.webp'].map((src,i) => <img data-poster src={src} alt={""} className={`cinema-poster poster-${i}`} width={"1440"} height={"900"} style={{ opacity: i===0? 1:0 }} key={src} />)}
        {!reduced&&<video ref={video} className={ready? 'movie-ready':''} muted playsInline preload={"auto"} poster={"/images/barber-craft.webp"} onCanPlay={() => setReady(true)} onError={() => setReady(false)}>
          <source src={site.heroVideo} type={"video/mp4"} />
        </video>}
      </div>
      <div className={"cinema-shade"} />
      <div className={"cinema-topline"}>
        <span>
          <i />
          {" G\u00D6TEBORG \u00B7 KUNGSPORTSAVENYEN 26"}
        </span>
        <span>
          {"EST. 2020"}
        </span>
      </div>
      <div className={"cinema-scenes container"}>
        <div className={"cinema-scene scene-one"} data-scene style={{ opacity: 1 }}>
          <p className={"eyebrow"}>
            {"Buffalo Barbershop"}
          </p>
          <h1>
            {"MER \u00C4N"}
            <br />
            {"EN "}
            <span className={"accent"}>
              {"KLIPPNING."}
            </span>
          </h1>
          <div className={"hero-bottom-copy"}>
            <p>
              {"Hantverket. M\u00E4nniskorna. K\u00E4nslan."}
              <br />
              {"Din barbershop p\u00E5 Avenyn."}
            </p>
            <BookingButton />
          </div>
        </div>
        <div className={"cinema-scene scene-two"} data-scene style={{ opacity: 0 }}>
          <p className={"eyebrow"}>
            {"02 / The location"}
          </p>
          <h2>
            {"MITT P\u00C5"}
            <br />
            <span className={"accent"}>
              {"AVENYN."}
            </span>
          </h2>
          <p className={"scene-description"}>
            {"Kungsportsavenyen 26."}
            <br />
            {"G\u00F6teborg, p\u00E5 v\u00E5rt s\u00E4tt."}
          </p>
          <Link className={"text-link"} to={"/kontakt"}>
            {"Hitta din v\u00E4g hit "}
            <Icon name={"arrow"} />
          </Link>
        </div>
        <div className={"cinema-scene scene-three"} data-scene style={{ opacity: 0 }}>
          <p className={"eyebrow"}>
            {"03 / Take a seat"}
          </p>
          <h2>
            {"DIN STOL."}
            <br />
            <span className={"accent"}>
              {"DIN STIL."}
            </span>
          </h2>
          <p className={"scene-description"}>
            {"Fr\u00E5n f\u00F6rsta klippet"}
            <br />
            {"till sista detaljen."}
          </p>
          <BookingButton />
        </div>
      </div>
      {site.heroVideo.includes("demo")&&<span className={"cinema-media-note"}>
        {"Bildfilm \u00B7 referensmaterial"}
      </span>}
      <div className={"cinema-bottom"}>
        <div className={"chapter-nav"} aria-label={"Hoppa mellan filmkapitel"}>
          {['Hantverket','Avenyn','Din stol'].map((label,i) => <button onClick={() => jump(i)} className={active===i? 'active':''} aria-current={active===i? 'step':undefined} key={label}>
            <span>
              {"0"}
              {i+1}
            </span>
            {label}
            <i />
          </button>)}
        </div>
        <span className={"scroll-cue"}>
          {"SCROLLA F\u00D6R ATT UPPT\u00C4CKA "}
          <Icon name={"down"} />
        </span>
        <button className={"motion-control"} onClick={toggle} aria-label={paused? 'Aktivera rörelse':'Pausa rörelse'} aria-pressed={paused}>
          <Icon name={paused? 'play':'pause'} />
          <span>
            {paused? 'Rörelse av':'Pausa'}
          </span>
        </button>
      </div>
    </div>
  </section>;
}
