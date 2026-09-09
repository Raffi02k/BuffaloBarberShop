import { useState,Fragment } from "react";
import { services,categories,priceLabel } from "../content/services";
import { PageHero } from "../components/PageHero";
import { Icon } from "../components/Icon";
import { Link } from "react-router-dom";
import { site } from "../content/siteContent";
import { BookingButton } from "../components/BookingButton";
export function ServicesPage() {
  const [filter,setFilter]=useState('Alla');
  const selected=filter==='Alla'? services:services.filter(s => s.category===filter);
  return <Fragment>
    <PageHero eyebrow={"The menu"} title={<Fragment>
      {"DIN LOOK."}
      <br />
      <span className={"accent"}>
        {"DITT VAL."}
      </span>
    </Fragment>} description={"Fr\u00E5n en skarp klippning till hela ritualen. Hitta behandlingen f\u00F6r dig."} image={"/images/tools.webp"} />
    <section className={"section-space container"}>
      <div className={"price-notice"}>
        <Icon name={"check"} />
        <p>
          {"Priser enligt projektunderlaget, inte nyverifierade. Bokadirekt visar aktuellt slutpris och lediga tider. Kenai\u2019s egna priser bekr\u00E4ftas separat."}
        </p>
      </div>
      <div className={"filter-list"} role={"group"} aria-label={"Filtrera tj\u00E4nster"}>
        {categories.map(c => <button aria-pressed={filter===c} className={filter===c? 'active':''} onClick={() => setFilter(c)} key={c}>
          {c}
        </button>)}
      </div>
      <div className={"service-menu"} aria-live={"polite"}>
        {selected.map((s,i) => <article className={"service-menu-row"} key={s.slug}>
          <span className={"service-number"}>
            {String(i+1).padStart(2,'0')}
          </span>
          <div className={"service-menu-info"}>
            <span className={"eyebrow"}>
              {s.category}
              {" / "}
              {s.minutes? `${s.minutes} min`:"Tid visas vid bokning"}
            </span>
            <h2>
              <Link to={`/tjanster/${s.slug}`}>
                {s.title}
              </Link>
            </h2>
            <p>
              {s.intro}
            </p>
          </div>
          <div className={"service-menu-actions"}>
            <strong>
              {priceLabel(s)}
            </strong>
            <a href={site.bookingUrl} target={"_blank"} rel={"noreferrer"} className={"text-link"}>
              {"V\u00E4lj tid "}
              <Icon name={"arrow"} />
            </a>
            <Link to={`/tjanster/${s.slug}`} className={"service-more"}>
              {"Om behandlingen"}
            </Link>
          </div>
        </article>)}
      </div>
      <div className={"booking-notice"}>
        <p>
          {"Du slutf\u00F6r bokningen hos Bokadirekt. V\u00E4lj tj\u00E4nst och barberare d\u00E4r. Giltigt studentkort kr\u00E4vs f\u00F6r studentpriser. Kam- och saxklippning kan medf\u00F6ra pristill\u00E4gg."}
        </p>
        <BookingButton />
      </div>
      <div className={"faq-block"}>
        <p className={"eyebrow"}>
          {"Bra att veta"}
        </p>
        <details>
          <summary>
            {"Hur bokar jag? "}
            <Icon name={"plus"} />
          </summary>
          <p>
            {"Bokningsknapparna \u00F6ppnar salongens sida hos Bokadirekt. D\u00E4r v\u00E4ljer du behandling, utf\u00F6rare och tid."}
          </p>
        </details>
        <details>
          <summary>
            {"Kan jag boka Kenai\u2019s h\u00E4r? "}
            <Icon name={"plus"} />
          </summary>
          <p>
            {"En personlig bokningsl\u00E4nk \u00E4r inte verifierad. Kontakta @atkenais via l\u00E4nken p\u00E5 profilsidan f\u00F6r tillg\u00E4nglighet och pris."}
          </p>
        </details>
        <details>
          <summary>
            {"\u00C4r alla priser fasta? "}
            <Icon name={"plus"} />
          </summary>
          <p>
            {"Priser m\u00E4rkta med Fr\u00E5n \u00E4r fr\u00E5npriser. Kontrollera tj\u00E4nstens slutpris i bokningssystemet innan du bekr\u00E4ftar."}
          </p>
        </details>
      </div>
    </section>
  </Fragment>;
}
