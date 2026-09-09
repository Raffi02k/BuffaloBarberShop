import { PageHero } from '../components/PageHero';
import { ReviewsRail } from '../components/ReviewsRail';
export function ReviewsPage() {
  return <><PageHero eyebrow="Omdömen" title={<>ORD SOM<br /><span className="accent">BETYDER NÅGOT.</span></>} description="En bra klippning känns. Här är kundernas betyg på Buffalo Barbershop." />
    <ReviewsRail /></>;
}
