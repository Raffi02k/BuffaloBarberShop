import type { Barber } from "../content/types";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";
export function BarberCard({ barber,index=0 }: { barber: Barber; index?: number; }) {
  return <Link to={`/barberare/${barber.slug}`} className={"barber-card"}>
    <div className={"barber-card-photo"}>
      {barber.image? <img src={barber.image} alt={`Porträtt av ${barber.name}`} style={{ objectPosition: barber.position }} width={"600"} height={"760"} loading={"lazy"} decoding={"async"} />:<div className={"barber-placeholder"} aria-label={"Portr\u00E4tt saknas"}>
        <span>
          {barber.initials}
        </span>
        <small>
          {"PORTR\u00C4TT KOMMER"}
        </small>
      </div>}
      <span className={"barber-card-index"}>
        {"THE CREW / 0"}
        {index+1}
      </span>
      <span className={"barber-view"}>
        {"M\u00F6t "}
        {barber.name}
        <Icon name={"arrow"} />
      </span>
    </div>
    <div className={"barber-card-info"}>
      <div>
        <h3>
          {barber.name}
        </h3>
        <p>
          {barber.role}
        </p>
      </div>
      <Icon name={"arrow"} />
    </div>
  </Link>;
}
