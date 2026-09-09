import type { Review } from './types';
import { site } from './siteContent';
export const reviews: Review[] = [
  { id: 'haircut', name: 'Klippning & styling', text: 'En klippning anpassad efter din hårtyp, din stil och dina önskemål. Avslutas med styling för en genomarbetad helhet.', summary: true, source: 'Bokadirekt', url: site.bookingUrl },
  { id: 'beard', name: 'Skägg & konturer', text: 'Skägget trimmas, formas och stylas med fokus på rena konturer och en form som passar ditt ansikte.', summary: true, source: 'Bokadirekt', url: site.bookingUrl },
  { id: 'consultation', name: 'Detaljerna först', text: 'Den lyxiga hårklippningen börjar med en konsultation. Form, hårtyp och personlig stil får styra klippningen, från första saxklippet till sista stylingen.', summary: true, source: 'Bokadirekt', url: site.bookingUrl },
  { id: 'warm-towel', name: 'Varm handduk & skäggvård', text: 'Varm handduk och vårdande oljor mjukar upp skägget före formning och trimning. Den lyxiga skäggbehandlingen avslutas med återfuktning och massage.', summary: true, source: 'Bokadirekt', url: site.bookingUrl },
  { id: 'craft', name: 'Klassiskt & modernt', text: 'Från en klassisk klippning till en modern fade. Precision, teknik och styling möts i ett resultat anpassat efter dig.', summary: true, source: 'Bokadirekt', url: site.bookingUrl },
  { id: 'full-service', name: 'Hår & skägg', text: 'Klippning och skäggvård i samma besök. Håret stylas och skägget formas för en sammanhållen, välvårdad look.', summary: true, source: 'Bokadirekt', url: site.bookingUrl },
  { id: 'finish', name: 'Den sista finishen', text: 'Stylingen är en del av klippningen. Håret formas med produkter som lyfter fram snittet och ger frisyren sin sista finish.', summary: true, source: 'Bokadirekt', url: site.bookingUrl },
  { id: 'luxury', name: 'Tid för detaljer', text: 'I lyxpaketet kombineras hårklippning med skäggbehandling, varm handduk och ansiktsmassage. Ett helt besök för både hår och skägg.', summary: true, source: 'Bokadirekt', url: site.bookingUrl },
  { id: 'children', name: 'De första klippningarna', text: 'Barnklippningen sker i en lugn miljö, med tålamod och fokus på att barnet ska känna sig bekvämt i stolen.', summary: true, source: 'Bokadirekt', url: site.bookingUrl },
  { id: 'wash', name: 'Tvätt & styling', text: 'En hårtvätt och styling för dig som vill fräscha upp frisyren mellan klippningarna. En egen behandling på salongen.', summary: true, source: 'Bokadirekt', url: site.bookingUrl },
  { id: 'skin', name: 'Mer än en klippning', text: 'Ansiktsbehandling med rengöring och återfuktning, anpassad efter huden. En stund för hudvård i samband med ditt salongsbesök.', summary: true, source: 'Bokadirekt', url: site.bookingUrl },
  { id: 'beard-care', name: 'Form & omvårdnad', text: 'Skäggvård handlar om både formen och känslan. I lyxbehandlingen kombineras noggrann trimning med vårdande och återfuktande produkter.', summary: true, source: 'Bokadirekt', url: site.bookingUrl }
];
// Bokadirekt snapshot, checked 2026-09-09.
export const reviewSummary = { rating: '4,8', count: 918, fiveStarCount: 823, checked: '9 september 2026' };
