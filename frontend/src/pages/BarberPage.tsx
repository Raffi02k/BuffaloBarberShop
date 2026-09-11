import { useParams,Link } from "react-router-dom";
import { barbers } from "../content/barbers";
import { NotFoundPage } from "./NotFoundPage";
import { gallery } from "../content/gallery";
import { Fragment } from "react";
import { Icon } from "../components/Icon";
import { BookingButton } from "../components/BookingButton";
import { site } from "../content/siteContent";
import { GalleryGrid } from "../components/GalleryGrid";
import { Timeline } from "../components/Timeline";
export function BarberPage() {
  const { slug }=useParams();
  const barber=barbers.find(b => b.slug===slug);
  if(!barber)
    return <NotFoundPage />;
  const images=gallery.filter(g => barber.galleryIds.includes(g.id));
  const isKenai=barber.slug==='kenais';
  return <Fragment>
    <section className={"barber-profile-hero"}>
      <div className={"container barber-profile-grid"}>
        <div className={"profile-copy"}>
          <Link to={"/barberare"} className={"breadcrumb"}>
            <Icon name={"arrowLeft"} />
            {" Alla barberare"}
          </Link>
          <p className={"eyebrow"}>
            {barber.role}
          </p>
          <h1>
            {barber.name.toUpperCase()}
          </h1>
          <p className={"profile-quote"}>
            {barber.intro}
          </p>
          <div className={"tag-list"}>
            {barber.tags.map(t => <span key={t}>
              {t}
            </span>)}
          </div>
          <div className={"profile-actions"}>
            {isKenai? <BookingButton label={site.kenaisBookingUrl? "Boka Kenai's":"Kontakta Kenai's"} href={site.kenaisBookingUrl||site.kenaisInstagram} />:<BookingButton label={"Se tider hos salongen"} />}
            {barber.instagram&&<a className={"icon-button"} href={barber.instagram} target={"_blank"} rel={"noreferrer"} aria-label={`Följ ${barber.name} på Instagram`}>
              <Icon name={"instagram"} />
            </a>}
          </div>
        </div>
        <div className={"profile-portrait"}>
          {barber.image? <img src={barber.image} alt={`Porträtt av ${barber.name}`} width={"720"} height={"840"} style={{ objectPosition: barber.position }} />:<div className={"barber-placeholder"}>
            <span>
              {barber.initials}
            </span>
            <small>
              {"PORTR\u00C4TT KOMMER"}
            </small>
          </div>}
        </div>
      </div>
    </section>
    <section className={"section-space container editorial-grid"}>
      <div className={"profile-story-heading"}>
        <p className={"eyebrow"}>
          {"Behind the chair"}
        </p>
        <h2>
          {"HISTORIEN."}
          <br />
          <span className={"accent"}>
            {"HANTVERKET."}
          </span>
        </h2>
      </div>
      <div className={"prose"}>
        <p className={"lead"}>
          {barber.about}
        </p>
        {barber.slug==='anas'&&<Fragment>
          <p className={"eyebrow"}>{"Salongens milstolpar"}</p>
          <Timeline>
            <div>
              <span>{"2020"}</span>
              <p>{"Buffalo Barbershop grundas mitt under pandemin. Est. 2020 blir en del av salongens logotyp och identitet – början på resan."}</p>
            </div>
            <div>
              <span>{"2024–2026"}</span>
              <p>{"Från en mindre verksamhet till ett växande salongskoncept på Kungsportsavenyen 26 i Göteborg. Som ägare och barberare driver Anas salongen vidare med hantverket och kundmötet i centrum."}</p>
            </div>
            <div>
              <span>{"Nästa kapitel"}</span>
              <p>{"Salongen öppnar för samarbeten med fristående profiler. Barber M, under namnet Kenai’s (@atkenais), tar plats behind the chair hos Buffalo på Avenyn."}</p>
            </div>
          </Timeline>
        </Fragment>}
        {barber.slug==='waseem'&&<Fragment>
          <p className={"eyebrow"}>{"Din stund i stolen"}</p>
          <Timeline>
            <div>
              <span>{"Din stil"}</span>
              <p>{"En ny look eller en uppfräschning av din vanliga frisyr? Dina önskemål sätter riktningen."}</p>
            </div>
            <div>
              <span>{"Hantverket"}</span>
              <p>{"Klippning och skägg med fokus på rena linjer, mjuka övergångar och en form som passar dig."}</p>
            </div>
            <div>
              <span>{"Sista finishen"}</span>
              <p>{"De små detaljerna och stylingen knyter ihop helheten. Redo för vardagen – med din egen stil i fokus."}</p>
            </div>
          </Timeline>
        </Fragment>}
        {isKenai? <Fragment>
          <p>
            {"Vi ses vid stolen."}
          </p>
          <Timeline>
            <div>
              <span>
                {"2018"}
              </span>
              <p>
                {"De f\u00F6rsta professionella klippningarna i G\u00F6teborg."}
              </p>
            </div>
            <div>
              <span>
                {"2020\u20132022"}
              </span>
              <p>
                {"Drev en egen privat studio i Uddevalla och utvecklade sitt personliga uttryck inom barberarhantverket."}
              </p>
            </div>
            <div>
              <span>
                {"N\u00E4sta kapitel"}
              </span>
              <p>
                {"Ett nytt kapitel under namnet Kenai’s, i samarbete med Buffalo Barbershop på Kungsportsavenyen i Göteborg. Behind the chair på Avenyn."}
              </p>
            </div>
          </Timeline>
          {!site.kenaisBookingUrl&&<p className={"booking-explanation"}>
            {"Personlig bokningsl\u00E4nk inv\u00E4ntas. Kontakta @atkenais f\u00F6r tider och pris \u2013 salongens gemensamma bokning v\u00E4ljer inte automatiskt Kenai\u2019s."}
          </p>}
        </Fragment>:<Fragment>
          <p>
            {"V\u00E4lj "}
            {barber.name}
            {" som utf\u00F6rare i Bokadirekt n\u00E4r du bokar."}
          </p>
          <a className={"text-link"} href={site.bookingUrl} target={"_blank"} rel={"noreferrer"}>
            {"Till salongens bokning "}
            <Icon name={"arrow"} />
          </a>
          <p className={"content-note"}>
            {"Personlig Instagram-l\u00E4nk har inte l\u00E4mnats. Salongens sociala konto finns i sidfoten."}
          </p>
        </Fragment>}
      </div>
    </section>
    <section className={"section-space container profile-work"}>
      <div className={"section-heading"}>
        <div>
          <p className={"eyebrow"}>
            {"The portfolio"}
          </p>
          <h2>
            {isKenai? 'BILDBERÄTTELSEN.':'ARBETEN & BILDER.'}
          </h2>
        </div>
        {barber.instagram&&<a className={"text-link"} href={barber.instagram} target={"_blank"} rel={"noreferrer"}>
          {"Mer p\u00E5 Instagram "}
          <Icon name={"arrow"} />
        </a>}
      </div>
      {images.length? <GalleryGrid items={images} filters={false} />:<div className={"portfolio-empty"}>
        <Icon name={"plus"} />
        <h3>
          {"Portfolion fylls p\u00E5."}
        </h3>
        <p>
          {barber.name}
          {"s egna arbetsbilder kommer h\u00E4r n\u00E4r de har l\u00E4mnats och godk\u00E4nts. Andra barberares bilder visas inte som hans arbeten."}
        </p>
      </div>}
    </section>
  </Fragment>;
}
