import { useRef,useState,useEffect } from "react";
import { useMotion } from "./MotionProvider";
import { site } from "../content/siteContent";
import { BookingButton } from "./BookingButton";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { heroStory,chapterOpacity } from "../content/heroStory";
const scrollDistance=(section: HTMLElement,stage: HTMLElement) => Math.max(1,section.offsetHeight-stage.offsetHeight);
export function CinematicHero() {
  const section=useRef<HTMLElement>(null),stage=useRef<HTMLDivElement>(null),video=useRef<HTMLVideoElement>(null);
  const [ready,setReady]=useState(false),[active,setActive]=useState(0);
  const { reduced,paused,toggle }=useMotion();
  useEffect(() => {
    const el=section.current,sticky=stage.current;
    if(!el||!sticky)
      return;
    const movie=video.current;
    setReady(false);
    if(reduced) {
      movie?.pause();
      el.querySelectorAll<HTMLElement>('[data-scene]').forEach(panel => { panel.inert=false; });
      return;
    }
    movie?.pause();
    let disposed=false,failed=false,lastStage=-1,desiredTime=0;
    let cleanupAnimation=() => {};
    const playhead={ progress: 0 };
    const panels=Array.from(el.querySelectorAll<HTMLElement>('[data-scene]'));
    const posters=Array.from(el.querySelectorAll<HTMLImageElement>('[data-poster]'));
    // Serialize seeks: always use the newest target once decoding has finished.
    const seek=() => {
      if(!movie||disposed||failed||movie.seeking||movie.readyState<2||!Number.isFinite(movie.duration)||movie.duration<=0)
        return;
      // Land precisely on the first/last frame instead of stopping just short.
      const tolerance=playhead.progress===0||playhead.progress===1? .001:.5/heroStory.fps;
      if(Math.abs(movie.currentTime-desiredTime)<tolerance) {
        setReady(true);
        return;
      }
      try {
        movie.currentTime=desiredTime;
      } catch {
        fail();
      }
    };
    const fail=() => { failed=true; setReady(false); };
    const update=() => {
      const p=playhead.progress;
      const current=p<heroStory.chapterStarts[0]? 0:p<heroStory.chapterStarts[1]? 1:2;
      if(current!==lastStage) {
        lastStage=current;
        setActive(current);
      }
      const opacity=chapterOpacity(p);
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
        desiredTime=p*Math.max(0,movie.duration-1/heroStory.fps);
        seek();
      }
    };
    movie?.addEventListener('loadedmetadata',update);
    movie?.addEventListener('loadeddata',update);
    movie?.addEventListener('canplay',seek);
    movie?.addEventListener('seeked',seek);
    movie?.addEventListener('error',fail);
    update();
    // Browser-only imports keep the prerender path independent of GSAP's DOM code.
    void Promise.all([import('gsap'),import('gsap/ScrollTrigger')]).then(([{ gsap },{ ScrollTrigger }]) => {
      if(disposed)
        return;
      gsap.registerPlugin(ScrollTrigger);
      const tween=gsap.to(playhead,{
        progress: 1,
        ease: 'none',
        onUpdate: update,
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => `+=${scrollDistance(el,sticky)}`,
          scrub: heroStory.scrub,
          invalidateOnRefresh: true,
        },
      });
      let refreshFrame=0;
      const scheduleRefresh=() => {
        if(disposed||refreshFrame)
          return;
        refreshFrame=requestAnimationFrame(() => {
          refreshFrame=0;
          if(!disposed)
            tween.scrollTrigger?.refresh();
        });
      };
      const resizeObserver=new ResizeObserver(scheduleRefresh);
      resizeObserver.observe(el);
      resizeObserver.observe(sticky);
      // The route entrance translates the ancestor briefly; remeasure afterwards.
      const transition=el.closest('.page-transition');
      const refresh=(event: Event) => {
        if(event.target===transition)
          scheduleRefresh();
      };
      transition?.addEventListener('animationend',refresh);
      cleanupAnimation=() => {
        resizeObserver.disconnect();
        cancelAnimationFrame(refreshFrame);
        transition?.removeEventListener('animationend',refresh);
        tween.scrollTrigger?.kill();
        tween.kill();
      };
      tween.scrollTrigger?.refresh();
    }).catch(() => {
      if(!disposed) {
        fail();
        // Keep all chapter links reachable even if the animation chunk fails.
        el.dataset.reduced='true';
        panels.forEach(panel => { panel.inert=false; });
      }
    });
    return () => {
      disposed=true;
      cleanupAnimation();
      movie?.pause();
      movie?.removeEventListener('loadedmetadata',update);
      movie?.removeEventListener('loadeddata',update);
      movie?.removeEventListener('canplay',seek);
      movie?.removeEventListener('seeked',seek);
      movie?.removeEventListener('error',fail);
    };
  },[reduced]);
  function jump(index: number) {
    const el=section.current,sticky=stage.current;
    if(!el||!sticky)
      return;
    window.scrollTo({ top: el.getBoundingClientRect().top+window.scrollY+scrollDistance(el,sticky)*heroStory.chapterJumps[index],behavior: reduced? 'instant':'smooth' });
  }
  return <section className={"cinema"} ref={section} data-reduced={reduced} aria-label={"Buffalo Barbershop, en introduktion i tre kapitel"}>
    <div className={"cinema-sticky"} ref={stage}>
      <div className={"cinema-media"} aria-hidden={"true"}>
        {heroStory.posters.map((src,i) => <img data-poster src={src} alt={""} className={`cinema-poster poster-${i}`} width={"1440"} height={"900"} style={{ opacity: i===0? 1:0 }} key={src} />)}
        {!reduced&&<video ref={video} src={site.heroVideo} className={ready? 'movie-ready':''} muted playsInline preload={"auto"} />}
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
