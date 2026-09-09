import { ContactForm } from "../components/ContactForm";
import { Fragment } from "react";
import { PageHero } from "../components/PageHero";
import { site } from "../content/siteContent";
import { Icon } from "../components/Icon";
import { BookingButton } from "../components/BookingButton";
import { LocationSection } from "../components/LocationSection";
export function ContactPage() {
  return <Fragment>
    <PageHero eyebrow={"Kontakt & hitta hit"} title={<Fragment>
      {"VI SES"}
      <br />
      <span className={"accent"}>
        {"P\u00C5 AVENYN."}
      </span>
    </Fragment>} description={"Kungsportsavenyen 26, G\u00F6teborg. Boka en stol eller h\u00F6r av dig till salongen."} />
    <section className={"section-space container contact-grid"}>
      <div>
        <p className={"eyebrow"}>
          {"S\u00E4g hej"}
        </p>
        <h2>
          {"DIN N\u00C4STA"}
          <br />
          <span className={"accent"}>
            {"BRA H\u00C5RDAG."}
          </span>
        </h2>
        {site.phone&&<a href={site.phoneHref} className={"contact-big"}>
          {site.phone}
          <Icon name={"arrow"} />
        </a>}
        {site.email&&<a href={`mailto:${site.email}`} className={"contact-email"}>
          {site.email}
        </a>}
        <BookingButton />
        <p className={"content-note"}>
          {"Du bokar externt hos Bokadirekt. F\u00F6r fr\u00E5gor om Kenai\u2019s, kontakta @atkenais via profilsidan."}
        </p>
      </div>
      <div className={"hours-card"}>
        <p className={"eyebrow"}>
          {"N\u00E4r vi finns h\u00E4r"}
        </p>
        <h3>
          {"\u00D6ppettider"}
        </h3>
        {site.hours.map(h => <div className={"hours-row"} key={h.label}>
          <span>
            {h.label}
          </span>
          <strong>
            {h.value}
          </strong>
        </div>)}
        <p>
          {"Ordinarie salongstider. Personlig tillg\u00E4nglighet visas i bokningen. Ring salongen vid fr\u00E5gor."}
        </p>
        <a className={"text-link"} href={site.instagram} target={"_blank"} rel={"noreferrer"}>
          <Icon name={"instagram"} />
          {" F\u00F6lj Buffalo"}
        </a>
      </div>
    </section>
    <ContactForm />
    <LocationSection />
  </Fragment>;
}
