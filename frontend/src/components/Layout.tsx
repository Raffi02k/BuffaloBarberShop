import { Outlet,useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { PageMeta } from './PageMeta';
import { ScrollToTop } from './ScrollToTop';
import { PageTransition } from './PageTransition';
export function Layout() {
  const { pathname }=useLocation();
  return <><ScrollToTop /><PageMeta /><Header /><main id="main"><PageTransition route={pathname}><Outlet /></PageTransition></main><Footer /></>;
}
