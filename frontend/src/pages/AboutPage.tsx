import { Fragment } from "react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { BookingButton } from "../components/BookingButton";
import { PhotoPanel } from "../components/PhotoPanel";
import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";
export function AboutPage() {
  return <Fragment>
    <PageHero eyebrow={"Salongen"} title={<Fragment>
      {"ETT HANTVERK."}
      <br />
      <span className={"accent"}>
        {"EN K\u00C4NSLA."}
      </span>
    </Fragment>} description={"Buffalo Barbershop. Klippning och sk\u00E4gg p\u00E5 Kungsportsavenyen 26 i G\u00F6teborg."} />
    <section className={"section-space container editorial-grid"}>
      <Reveal>
        <p className={"eyebrow"}>
          {"Classic craft. Fresh energy."}
        </p>
        <h2>
          {"DET SITTER"}
          <br />
          {"I "}
          <span className={"accent"}>
            {"DETALJERNA."}
          </span>
        </h2>
      </Reveal>
      <div className={"prose"}>
        <p className={"lead"}>
          {"En frisyr ska inte bara se bra ut. Den ska k\u00E4nnas som du."}
        </p>
        <p>
          {"Hos Buffalo Barbershop st\u00E5r klippning, rakning och sk\u00E4ggv\u00E5rd i centrum. Fr\u00E5n en klassisk form till en modern fade \u2013 med fokus p\u00E5 din stil och dina \u00F6nskem\u00E5l."}
        </p>
        <p>
          {"Du hittar salongen p\u00E5 Avenyn i G\u00F6teborg. V\u00E4lj en behandling, l\u00E4r k\u00E4nna barberarna och hitta din n\u00E4sta tid."}
        </p>
        <BookingButton />
      </div>
    </section>
    <PhotoPanel image={"/images/barber-craft.webp"}>
      <p className={"eyebrow"}>
        {"The ritual"}
      </p>
      <h2>
        {"TA EN PAUS."}
        <br />
        <span className={"outline"}>
          {"TA PLATS."}
        </span>
      </h2>
    </PhotoPanel>
    <section className={"section-space story-feature container"}>
      <div className={"portrait-frame"}>
        <img src={"/images/kenais-story.webp"} alt={"Bild ur Kenai\u2019s projektmaterial"} width={"700"} height={"880"} loading={"lazy"} decoding={"async"} />
      </div>
      <Reveal>
        <p className={"eyebrow"}>
          {"Ett personligt kapitel / Kenai\u2019s"}
        </p>
        <h2>
          {"WE CAME"}
          <br />
          <span className={"accent"}>
            {"A LONG WAY."}
          </span>
        </h2>
        <p className={"lead"}>
          {"Fr\u00E5n Barber M till Kenai\u2019s."}
        </p>
        <p>
          {"En resa fr\u00E5n de f\u00F6rsta klippningarna i G\u00F6teborg, via en studio i Uddevalla, till ett nytt kapitel. Historien och bildmaterialet finns samlat p\u00E5 Kenai\u2019s profilsida."}
        </p>
        <Link className={"text-link"} to={"/barberare/kenais"}>
          {"M\u00F6t Kenai\u2019s "}
          <Icon name={"arrow"} />
        </Link>
        <p className={"content-note"}>
          {"Profilhistoriken kommer fr\u00E5n projektunderlaget och inv\u00E4ntar barberarens godk\u00E4nnande."}
        </p>
      </Reveal>
    </section>
  </Fragment>;
}
