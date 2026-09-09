import { Fragment } from "react";
import { PageHero } from "../components/PageHero";
import { barbers } from "../content/barbers";
import { BarberCard } from "../components/BarberCard";
export function BarbersPage() {
  return <Fragment>
    <PageHero eyebrow={"The crew"} title={<Fragment>
      {"H\u00C4NDERNA BAKOM"}
      <br />
      <span className={"accent"}>
        {"DIN N\u00C4STA LOOK."}
      </span>
    </Fragment>} description={"L\u00E4r k\u00E4nna barberarna. Se deras bilder, l\u00E4s deras historia och hitta r\u00E4tt kontakt."} image={"/images/barber-craft.webp"} />
    <section className={"section-space container"}>
      <div className={"crew-grid"}>
        {barbers.map((barber,i) => <BarberCard barber={barber} index={i} key={barber.slug} />)}
      </div>
      <p className={"content-note"}>
        {"Anas och Waseem finns p\u00E5 salongens bokningsprofil. Kenai\u2019s visas enligt projektunderlaget. Portr\u00E4tt, personliga sociala l\u00E4nkar och fler arbetsbilder kompletteras efter godk\u00E4nnande."}
      </p>
    </section>
  </Fragment>;
}
