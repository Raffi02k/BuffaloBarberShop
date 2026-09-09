import { Fragment } from "react";
import { CinematicHero } from "../components/CinematicHero";
import { Reveal } from "../components/Reveal";
import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";
import { ServicesPreview } from "../components/ServicesPreview";
import { GalleryRail } from "../components/GalleryRail";
import { barbers } from "../content/barbers";
import { BarberCard } from "../components/BarberCard";
import { PhotoPanel } from "../components/PhotoPanel";
import { ReviewsRail } from "../components/ReviewsRail";
import { LocationSection } from "../components/LocationSection";
export function HomePage() {
  return <Fragment>
    <CinematicHero />
    <div className={"craft-strip"}>
      <span>
        {"PRECISION IN EVERY CUT"}
      </span>
      <i />
      <span>
        {"KUNGSPORTSAVENYEN 26"}
      </span>
      <i />
      <span>
        {"CLASSIC CRAFT. FRESH ENERGY."}
      </span>
      <i />
      <span>
        {"G\u00D6TEBORG"}
      </span>
    </div>
    <section className={"story-intro section-space"}>
      <div className={"container story-grid"}>
        <Reveal className={"story-title"}>
          <p className={"eyebrow"}>
            {"The Buffalo feeling"}
          </p>
          <h2>
            {"EN BRA"}
            <br />
            {"KLIPPNING."}
            <br />
            <span>
              {"EN \u00C4NNU"}
              <br />
              {"B\u00C4TTRE K\u00C4NSLA."}
            </span>
          </h2>
        </Reveal>
        <div className={"story-right"}>
          <div className={"story-image"}>
            <img src={"/images/tools.webp"} width={"600"} height={"476"} alt={"Saxar, rakknivar och borstar fr\u00E5n bildmaterialet"} loading={"lazy"} decoding={"async"} />
            <span className={"image-index"}>
              {"01 / THE ESSENTIALS"}
            </span>
          </div>
          <Reveal>
            <p>
              {"Det handlar om mer \u00E4n h\u00E5r. Om att sl\u00E5 sig ner, bli lyssnad p\u00E5 och l\u00E4mna stolen med en stil som k\u00E4nns r\u00E4tt."}
            </p>
            <p>
              {"Klippning, sk\u00E4gg och klassiskt barberarhantverk \u2013 mitt p\u00E5 Avenyn."}
            </p>
            <Link className={"text-link"} to={"/om-oss"}>
              {"Det h\u00E4r \u00E4r Buffalo "}
              <Icon name={"arrow"} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
    <ServicesPreview />
    <GalleryRail />
    <section className={"crew-section section-space"}>
      <div className={"container"}>
        <div className={"section-heading"}>
          <Reveal>
            <p className={"eyebrow"}>
              {"The people behind the craft"}
            </p>
            <h2>
              {"DIN STIL."}
              <br />
              <span className={"accent"}>
                {"V\u00C5RA H\u00C4NDER."}
              </span>
            </h2>
          </Reveal>
          <Link className={"text-link"} to={"/barberare"}>
            {"M\u00F6t barberarna "}
            <Icon name={"arrow"} />
          </Link>
        </div>
        <div className={"crew-grid"}>
          {barbers.map((b,i) => <Reveal delay={i*80} key={b.slug}>
            <BarberCard barber={b} index={i} />
          </Reveal>)}
        </div>
      </div>
    </section>
    <PhotoPanel image={"/images/kenais-cut.webp"} className={"gallery-film"}>
      <p className={"eyebrow"}>
        {"The gallery / Behind the chair"}
      </p>
      <h2>
        {"LESS TALK."}
        <br />
        <span className={"outline"}>
          {"MORE DETAIL."}
        </span>
      </h2>
      <Link className={"button button-primary"} to={"/galleri"}>
        {"Se bildber\u00E4ttelsen "}
        <Icon name={"arrow"} />
      </Link>
      <span className={"panel-caption"}>
        {"Ur Kenai\u2019s projektmaterial"}
      </span>
    </PhotoPanel>
    <ReviewsRail />
    <LocationSection />
  </Fragment>;
}
