import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotion } from "./MotionProvider";
import { BookingButton } from "./BookingButton";
import { Icon } from "./Icon";
import { site } from "../content/siteContent";
import { heroStory } from "../content/heroStory";

const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function CinematicHero() {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [movieReady, setMovieReady] = useState(false);
  const { reduced, paused, toggle } = useMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = section.current;
    if (!el) return;
    const stage = el.querySelector<HTMLElement>(".cinema-sticky");
    if (!stage) return;
    const movie = video.current;
    const panels = Array.from(el.querySelectorAll<HTMLElement>("[data-scene]"));
    const posters = Array.from(el.querySelectorAll<HTMLElement>("[data-poster]"));
    const playhead = { progress: 0 };
    let tween: gsap.core.Tween | undefined;
    let failed = false;

    // Only issue the latest seek after the previous one completes. This avoids
    // piling up decoder work when the user scrolls faster than the video seeks.
    const seek = () => {
      if (!movie || failed || movie.seeking || movie.readyState < 2 || !Number.isFinite(movie.duration)) return;
      const time = playhead.progress * Math.max(0, movie.duration - 1 / 24);
      if (Math.abs(movie.currentTime - time) >= 1 / 48) movie.currentTime = time;
    };

    const render = () => {
      const p = playhead.progress;
      setActive(p < 0.32 ? 0 : p < 0.7 ? 1 : 2);
      const opacity = [
        1 - clamp((p - 0.2) / 0.12),
        Math.min(clamp((p - 0.24) / 0.12), clamp((0.76 - p) / 0.13)),
        clamp((p - 0.67) / 0.13)
      ];
      panels.forEach((panel, i) => {
        panel.style.opacity = String(opacity[i]);
        panel.style.visibility = opacity[i] < 0.02 ? "hidden" : "visible";
        panel.style.transform = `translate3d(${reduced ? 0 : (1 - opacity[i]) * (i === 1 ? 55 : -55)}px,0,0)`;
        panel.style.pointerEvents = opacity[i] > 0.45 ? "auto" : "none";
        (panel as any).inert = opacity[i] < 0.45;
        panel.setAttribute("aria-hidden", String(opacity[i] < 0.45));
      });
      posters.forEach((poster, i) => {
        poster.style.opacity = String(opacity[i]);
        poster.style.transform = `scale(${reduced ? 1 : 1.035 + p * 0.065})`;
      });
      el.style.setProperty("--story-progress", String(p));
      seek();
    };

    render();
    if (reduced) {
      setMovieReady(false);
      return;
    }

    // The same smoothed playhead drives the captions and video together.
    tween = gsap.to(playhead, {
      progress: 1,
      ease: "none",
      onUpdate: render,
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: () => `+=${Math.max(1, el.offsetHeight - stage.offsetHeight)}`,
        scrub: 0.5,
        invalidateOnRefresh: true
      }
    });

    let refreshFrame = 0;
    const layoutObserver = new ResizeObserver(() => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => tween?.scrollTrigger?.refresh());
    });
    layoutObserver.observe(el);
    layoutObserver.observe(stage);

    let disposed = false;
    let priming = false;
    const ready = () => {
      if (disposed || failed || !movie || movie.readyState < 2) return;
      movie.pause();
      setMovieReady(true);
      seek();
    };

    const prime = () => {
      if (disposed || failed || priming || !movie) return;
      if (movie.readyState >= 2) {
        ready();
        return;
      }
      movie.muted = true;
      movie.defaultMuted = true;
      priming = true;
      movie
        .play()
        .then(() => {
          if (!disposed) ready();
        })
        .catch(() => {})
        .finally(() => {
          priming = false;
        });
    };

    const error = () => {
      failed = true;
      setMovieReady(false);
    };

    if (movie) {
      movie.addEventListener("loadedmetadata", seek);
      movie.addEventListener("loadeddata", ready);
      movie.addEventListener("canplay", ready);
      movie.addEventListener("seeked", seek);
      movie.addEventListener("error", error);
    }

    document.addEventListener("touchstart", prime, { passive: true });
    document.addEventListener("pointerdown", prime, { passive: true });
    if (movie && movie.readyState < 2) movie.load();
    prime();

    return () => {
      disposed = true;
      layoutObserver.disconnect();
      cancelAnimationFrame(refreshFrame);
      tween?.scrollTrigger?.kill();
      tween?.kill();
      if (movie) {
        movie.removeEventListener("loadedmetadata", seek);
        movie.removeEventListener("loadeddata", ready);
        movie.removeEventListener("canplay", ready);
        movie.removeEventListener("seeked", seek);
        movie.removeEventListener("error", error);
        movie.pause();
      }
      document.removeEventListener("touchstart", prime);
      document.removeEventListener("pointerdown", prime);
    };
  }, [reduced]);

  function jump(i: number) {
    const el = section.current;
    if (!el) return;
    const stage = el.querySelector<HTMLElement>(".cinema-sticky");
    if (!stage) return;
    const distance = el.offsetHeight - stage.offsetHeight;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY + distance * [0, 0.49, 0.9][i],
      behavior: reduced ? "auto" : "smooth"
    });
  }

  return (
    <section
      className={`cinema ${reduced ? "is-static" : ""}`}
      ref={section}
      data-reduced={reduced}
      aria-label="Buffalo Barbershop, en introduktion i tre kapitel"
    >
      <div className="cinema-sticky">
        <div className="cinema-media" aria-hidden="true">
          {heroStory.posters.map((src, i) => (
            <img
              key={src}
              data-poster
              className={`cinema-poster poster-${i}`}
              src={src}
              alt=""
              width="1440"
              height="900"
              loading={i === 0 ? "eager" : "lazy"}
              {...({ fetchpriority: i === 0 ? "high" : "low" } as any)}
              style={{ opacity: i === 0 ? 1 : 0 }}
            />
          ))}
          {!reduced && (
            <video
              ref={video}
              className={movieReady ? "movie-ready" : ""}
              src={site.heroVideo}
              preload="auto"
              playsInline
              muted
              disablePictureInPicture
              tabIndex={-1}
            />
          )}
        </div>
        <div className="cinema-shade" />
        <div className="cinema-topline">
          <span>
            <i /> GÖTEBORG · KUNGSPORTSAVENYEN 26
          </span>
          <span>EST. 2020</span>
        </div>
        <div className="cinema-scenes container">
          <div className="cinema-scene scene-one" data-scene style={{ opacity: 1 }}>
            <p className="eyebrow">Buffalo Barbershop</p>
            <h1>
              MER ÄN
              <br />
              EN <span className="accent">KLIPPNING.</span>
            </h1>
            <div className="hero-bottom-copy">
              <p>
                Hantverket. Människorna. Känslan.
                <br />
                Din barbershop på Avenyn.
              </p>
              <BookingButton />
            </div>
          </div>
          <div
            className="cinema-scene scene-two"
            data-scene
            style={{ opacity: 0, visibility: "hidden" }}
            aria-hidden="true"
          >
            <p className="eyebrow">02 / The location</p>
            <h2>
              MITT PÅ
              <br />
              <span className="accent">AVENYN.</span>
            </h2>
            <p className="scene-description">
              Kungsportsavenyen 26.
              <br />
              Göteborg, på vårt sätt.
            </p>
            <Link className="text-link" to="/kontakt">
              Hitta din väg hit <Icon name="arrow" />
            </Link>
          </div>
          <div
            className="cinema-scene scene-three"
            data-scene
            style={{ opacity: 0, visibility: "hidden" }}
            aria-hidden="true"
          >
            <p className="eyebrow">03 / Take a seat</p>
            <h2>
              DIN STOL.
              <br />
              <span className="accent">DIN STIL.</span>
            </h2>
            <p className="scene-description">
              Från första klippet
              <br />
              till sista detaljen.
            </p>
            <BookingButton />
          </div>
        </div>
        {site.heroVideo.includes("demo") && (
          <span className="cinema-media-note">
            {movieReady
              ? "Buffalo Barbershop"
              : active === 0
              ? "Tillfällig inspirationsbild"
              : "Buffalo Barbershop / salongen"}
          </span>
        )}
        <div className="cinema-bottom">
          <div className="chapter-nav" aria-label="Hoppa mellan filmkapitel">
            {["Hantverket", "Avenyn", "Din stol"].map((label, i) => (
              <button
                key={label}
                disabled={reduced}
                onClick={() => jump(i)}
                className={active === i ? "active" : ""}
                aria-current={active === i ? "step" : undefined}
              >
                <span>0{i + 1}</span>
                {label}
                <i />
              </button>
            ))}
          </div>
          <span className="scroll-cue">
            SCROLLA FÖR ATT UPPTÄCKA <Icon name="down" />
          </span>
          <button
            className="motion-control"
            onClick={toggle}
            aria-pressed={paused}
            aria-label={paused ? "Aktivera rörelse" : "Pausa rörelse"}
          >
            <Icon name={paused ? "play" : "pause"} />
            <span>{paused ? "Rörelse av" : "Pausa"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default CinematicHero;
