import { Reveal } from "./Reveal";
import { Icon } from "./Icon";
import { site } from "../content/siteContent";
export function LocationSection() {
  return <section className={"location-section section-space"} id={"hitta-hit"}>
    <div className={"container location-heading"}>
      <Reveal>
        <p className={"eyebrow"}>
          {"G\u00D6TEBORG / AVENYN / BUFFALO"}
        </p>
        <h2>
          {"N\u00C4STA STOPP."}
          <br />
          <span className={"accent"}>
            {"BUFFALO."}
          </span>
        </h2>
      </Reveal>
      <div className={"location-address"}>
        <Icon name={"pin"} />
        <div>
          <h3>
            {site.address}
          </h3>
          <p>
            {site.postcode}
            {" "}
            {site.city}
            <br />
            {"Du hittar oss p\u00E5 Avenyn."}
          </p>
          <a className={"text-link"} href={site.directionsUrl} target={"_blank"} rel={"noreferrer"}>
            {"Visa v\u00E4gen "}
            <Icon name={"arrow"} />
          </a>
        </div>
      </div>
    </div>
    <div className={"map-frame container"}>
      <iframe title={"Buffalo Barbershop p\u00E5 Kungsportsavenyen 26, Google Maps i satellitl\u00E4ge"} src={site.mapsEmbed} loading={"lazy"} referrerPolicy={"no-referrer-when-downgrade"} allowFullScreen />
      <div className={"map-footer"}>
        <span>
          <i />
          {" SATELLITL\u00C4GE \u00B7 G\u00D6TEBORG"}
        </span>
        <a href={site.mapsUrl} target={"_blank"} rel={"noreferrer"}>
          {"\u00D6ppna i Google Maps "}
          <Icon name={"arrow"} />
        </a>
      </div>
      <p className={"map-caption"}>
        {"Mitt p\u00E5 Avenyn, i hj\u00E4rtat av G\u00F6teborg. Du hittar oss p\u00E5 Kungsportsavenyen 26."}
      </p>
    </div>
  </section>;
}
