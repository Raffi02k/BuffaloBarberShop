import { useParams,Link } from "react-router-dom";
import { services,priceLabel } from "../content/services";
import { NotFoundPage } from "./NotFoundPage";
import { Fragment } from "react";
import { PageHero } from "../components/PageHero";
import { Icon } from "../components/Icon";
import { BookingButton } from "../components/BookingButton";
export function ServicePage() {
  const { slug }=useParams();
  const service=services.find(s => s.slug===slug);
  if(!service)
    return <NotFoundPage />;
  return <Fragment>
    <PageHero eyebrow={service.category} title={service.title.toUpperCase()} description={service.intro} image={service.image} />
    <section className={"section-space container service-detail-grid"}>
      <div>
        <p className={"eyebrow"}>
          {"Om behandlingen"}
        </p>
        <h2>
          {"FOKUS P\u00C5"}
          <br />
          <span className={"accent"}>
            {"DETALJERNA."}
          </span>
        </h2>
        <ul className={"detail-list"}>
          {service.details.map(d => <li key={d}>
            <Icon name={"check"} />
            {d}
          </li>)}
        </ul>
        {service.note&&<p className={"content-note"}>
          {service.note}
        </p>}
        <Link to={"/tjanster"} className={"text-link"}>
          <Icon name={"arrowLeft"} />
          {" Till alla behandlingar"}
        </Link>
      </div>
      <aside className={"booking-card"}>
        <p className={"eyebrow"}>
          {service.title}
        </p>
        <strong>
          {priceLabel(service)}
        </strong>
        <p>
          {service.minutes? `${service.minutes} minuter`:"Tid visas i bokningen"}
          {" - salongens prisunderlag"}
        </p>
        <BookingButton label={"Se lediga tider"} />
        <p className={"content-note"}>
          {"Bokningen g\u00F6rs hos Bokadirekt. V\u00E4lj den h\u00E4r behandlingen och \u00F6nskad barberare d\u00E4r. Kenai\u2019s bokning och priser bekr\u00E4ftas separat."}
        </p>
      </aside>
    </section>
  </Fragment>;
}
