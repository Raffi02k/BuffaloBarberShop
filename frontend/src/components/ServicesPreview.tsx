import { useState } from "react";
import { services,priceLabel } from "../content/services";
import { Reveal } from "./Reveal";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";
export function ServicesPreview() {
  const [active,setActive]=useState(0);
  const featured=services.slice(0,4);
  return <section className={"services-preview section-space"} id={"priser"}>
    <div className={"container services-split"}>
      <div className={"services-photo"}>
        <img src={featured[active].image} alt={"St\u00E4mningsbild fr\u00E5n projektmaterialet"} loading={"lazy"} decoding={"async"} width={"650"} height={"850"} />
        <div className={"services-photo-shade"} />
        <span className={"eyebrow"}>
          {"THE CRAFT / THE DETAILS"}
        </span>
        <h2>
          {"LOOK GOOD."}
          <br />
          <span>
            {"FEEL BETTER."}
          </span>
        </h2>
        <div className={"services-stamp"}>
          {"B"}
          <span>
            {"EST. 2020"}
          </span>
        </div>
      </div>
      <div className={"services-copy"}>
        <Reveal>
          <p className={"eyebrow"}>
            {"The menu"}
          </p>
          <h2>
            {"HANTVERK."}
            <br />
            <span className={"accent"}>
              {"INGA GENV\u00C4GAR."}
            </span>
          </h2>
          <p>
            {"V\u00E4lj din behandling. Vi tar hand om detaljerna."}
          </p>
        </Reveal>
        <div className={"service-preview-list"}>
          {featured.map((service,i) => <Link to={`/tjanster/${service.slug}`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} key={service.slug}>
            <span className={"service-number"}>
              {"0"}
              {i+1}
            </span>
            <div>
              <h3>
                {service.title}
              </h3>
              <p>
                {service.category}
              </p>
            </div>
            <span className={"service-price"}>
              {priceLabel(service)}
            </span>
            <Icon name={"arrow"} />
          </Link>)}
        </div>
        <div className={"service-list-footer"}>
          <Link className={"button button-outline"} to={"/tjanster"}>
            {"Alla tj\u00E4nster & priser "}
            <Icon name={"arrow"} />
          </Link>
          <p>
            {"Salongens fr\u00E5npriser. Slutpris visas i bokningen."}
            <br />
            {"Kenai\u2019s egna priser bekr\u00E4ftas separat."}
          </p>
        </div>
      </div>
    </div>
  </section>;
}
