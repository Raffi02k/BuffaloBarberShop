import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { BookingButton } from "./BookingButton";
import { Brand } from "./Brand";
import { site,navigation } from "../content/siteContent";
export function Footer() {
  return <footer className={"site-footer"}>
    <div className={"footer-top container"}>
      <div>
        <p className={"eyebrow"}>
          {"Din n\u00E4sta look b\u00F6rjar h\u00E4r."}
        </p>
        <Link to={"/barberare"} className={"footer-call"}>
          {"VI SES VID"}
          <br />
          <span>
            {"STOLEN."}
          </span>
          <Icon name={"arrow"} />
        </Link>
      </div>
      <BookingButton />
    </div>
    <div className={"footer-grid container"}>
      <div>
        <Brand large />
        <p>
          {"Klippning. Sk\u00E4gg. Karakt\u00E4r."}
          <br />
          {"Barberarhantverk p\u00E5 Avenyn."}
        </p>
        <a className={"social-link"} href={site.instagram} target={"_blank"} rel={"noreferrer"}>
          <Icon name={"instagram"} />
          {" F\u00F6lj Buffalo"}
        </a>
      </div>
      <div>
        <h2>
          {"Utforska"}
        </h2>
        {navigation.map(n => <Link to={n.to} key={n.to}>
          {n.label}
        </Link>)}
        <Link to={"/recensioner"}>
          {"Omd\u00F6men"}
        </Link>
      </div>
      <div>
        <h2>
          {"Hitta oss"}
        </h2>
        <a href={site.mapsUrl} target={"_blank"} rel={"noreferrer"}>
          {site.address}
          <br />
          {site.postcode}
          {" "}
          {site.city}
        </a>
        {site.phone&&<a href={site.phoneHref}>
          {site.phone}
        </a>}
        {site.email&&<a href={`mailto:${site.email}`}>
          {site.email}
        </a>}
      </div>
      <div>
        <h2>
          {"\u00D6ppettider"}
        </h2>
        {site.hours.map(h => <div className={"footer-hours"} key={h.label}>
          <span>
            {h.label}
          </span>
          <span>
            {h.value}
          </span>
        </div>)}
        <small>
          {"Se lediga tider i bokningen."}
        </small>
      </div>
    </div>
    <div className={"footer-bottom container"}>
      <span>
        {"\u00A9 2026 Buffalo Barbershop"}
      </span>
      <Link to={"/integritet"}>
        {"Integritet"}
      </Link>
      <a href={site.creditUrl} target={"_blank"} rel={"noreferrer"} className={"agency-credit"}>
        <span>
          {"Byggd av"}
        </span>
        <strong>
          {"Media"}
          <span>
            {"Magnet"}
          </span>
        </strong>
        <Icon name={"arrow"} />
      </a>
    </div>
  </footer>;
}
