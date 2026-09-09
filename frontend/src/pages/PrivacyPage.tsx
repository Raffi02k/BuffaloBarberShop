import { PageHero } from '../components/PageHero';
export function PrivacyPage() {
 return <><PageHero eyebrow="Integritet" title={<>DIN INTEGRITET.<br/><span className="accent">TYDLIGA VAL.</span></>} description="Teknisk information om projektversionen."/>
 <article className="section-space container prose privacy-prose">
 <p className="content-note">UTKAST: ansvarig juridisk person, organisationsnummer, dataskyddskontakt, rättslig grund och lagringstider ska fastställas innan skarp publicering.</p>
 <h2>Bokning</h2><p>Bokningsknapparna öppnar den externa bokningssidan. Webbplatsen genomför eller sparar inte bokningar.</p>
 <h2>Kontaktformulär</h2><p>Formuläret skickar namn, kontaktuppgifter och meddelande till den konfigurerade backend-servern. I testläget skickas eller sparas inget mejl. När SMTP aktiveras skickas uppgifterna till salongens konfigurerade e-postadress. Inget CRM eller permanent kundregister finns i den här versionen.</p>
 <p>Formulärets innehåll loggas inte av applikationen. Tillfällig anropsbegränsning använder anslutningens IP-adress i serverns arbetsminne. Hosting- och e-postleverantörernas hantering behöver beskrivas innan publicering.</p>
 <h2>Google Maps</h2><p>Den inbäddade kartan laddas först när du trycker på Visa satellitkarta. Då ansluter webbläsaren till Google. Du kan i stället använda den externa kartlänken.</p>
 <h2>Sociala medier och typsnitt</h2><p>Sociala länkar öppnas externt. Inga sociala inlägg bäddas in automatiskt. Google Fonts hämtas från Google; systemtypsnitt används när tjänsten inte kan nås.</p>
 <h2>Teknisk drift</h2><p>Ingen egen analyskod, reklampixel eller besöksprofilering har lagts in. Hosting kan behandla tekniska uppgifter för att leverera webbplatsen.</p>
 <h2>Frågor</h2><p>Ansvarig juridisk person och kontaktväg för integritetsfrågor kompletteras av salongen före lansering.</p>
 </article></>;
}
