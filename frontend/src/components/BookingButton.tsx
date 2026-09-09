import { site } from "../content/siteContent";
import { Icon } from "./Icon";
export function BookingButton({ label='Boka din stol',className='',href=site.bookingUrl }: { label?: string; className?: string; href?: string; }={}) {
  return <a className={`button button-primary ${className}`} href={href} target={"_blank"} rel={"noreferrer"}><span>{label}</span><Icon name={"arrow"} /></a>;
}
