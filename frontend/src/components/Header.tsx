import { useState,useRef,useEffect,Fragment } from "react";
import { useLocation,NavLink } from "react-router-dom";
import { useBodyLock } from "../hooks/useBodyLock";
import { Brand } from "./Brand";
import { navigation,site } from "../content/siteContent";
import { BookingButton } from "./BookingButton";
import { Icon } from "./Icon";
export function Header() {
  const [open,setOpen]=useState(false),[scrolled,setScrolled]=useState(false);
  const dialog=useRef<HTMLDialogElement>(null),trigger=useRef<HTMLButtonElement>(null);
  const location=useLocation();
  useBodyLock(open);
  useEffect(() => { setOpen(false); },[location.pathname]);
  useEffect(() => { const onScroll=() => setScrolled(window.scrollY>30); onScroll(); window.addEventListener('scroll',onScroll,{ passive: true }); return () => window.removeEventListener('scroll',onScroll); },[]);
  useEffect(() => {
    const el=dialog.current;
    if(!el)
      return;
    if(open&&!el.open)
      el.showModal();
    else if(!open&&el.open) {
      el.close();
      trigger.current?.focus();
    }
  },[open]);
  return <Fragment>
    <a className={"skip-link"} href={"#main"}>
      {"Hoppa till inneh\u00E5llet"}
    </a>
    <header className={`site-header ${scrolled? 'is-scrolled':''}`}>
      <div className={"header-inner"}>
        <Brand />
        <nav aria-label={"Huvudnavigation"} className={"desktop-nav"}>
          {navigation.map(n => <NavLink to={n.to} key={n.to}>
            {n.label}
          </NavLink>)}
        </nav>
        <div className={"header-actions"}>
          <BookingButton label={"Boka tid"} className={"header-booking"} />
          <button className={"menu-toggle icon-button"} ref={trigger} onClick={() => setOpen(true)} aria-label={"\u00D6ppna menyn"} aria-expanded={open} aria-controls={"mobile-menu"}>
            <Icon name={"menu"} />
          </button>
        </div>
      </div>
    </header>
    <dialog className={"mobile-menu"} id={"mobile-menu"} ref={dialog} onCancel={() => setOpen(false)} onClose={() => setOpen(false)} aria-labelledby={"menu-title"}>
      <div className={"mobile-menu-top"}>
        <Brand />
        <button className={"icon-button"} onClick={() => setOpen(false)} aria-label={"St\u00E4ng menyn"}>
          <Icon name={"close"} />
        </button>
      </div>
      <p className={"eyebrow"} id={"menu-title"}>
        {"V\u00E4lkommen till Buffalo"}
      </p>
      <nav aria-label={"Mobilnavigation"}>
        {navigation.map((n,i) => <NavLink to={n.to} onClick={() => setOpen(false)} key={n.to}>
          <span>
            {"0"}
            {i+1}
          </span>
          {n.label}
          <Icon name={"arrow"} />
        </NavLink>)}
      </nav>
      <BookingButton />
      <div className={"mobile-menu-info"}>
        {site.address}
        <br />
        {site.postcode}
        {" "}
        {site.city}
        {site.phone&&<a href={site.phoneHref}>
          {site.phone}
        </a>}
      </div>
    </dialog>
  </Fragment>;
}
