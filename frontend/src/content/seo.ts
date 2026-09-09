import { services } from "./services";
import { barbers } from "./barbers";
import { site } from "./siteContent";
const simple: Record<string, [string, string]> = {
    '/': ['Barberare på Avenyn i Göteborg | Buffalo Barbershop', 'Hårklippning, skägg och klassiskt barberarhantverk på Kungsportsavenyen 26. Upptäck Buffalo Barbershop och boka din stol.'],
    '/om-oss': ['Salongen på Avenyn | Buffalo Barbershop Göteborg', 'Möt Buffalo Barbershop. Hantverket, människorna och känslan bakom din klippning på Kungsportsavenyen 26 i Göteborg.'],
    '/tjanster': ['Tjänster & priser | Buffalo Barbershop Göteborg', 'Se salongens behandlingar för hår, skägg och grooming. Jämför priser och boka via Buffalo Barbershops Bokadirekt-sida.'],
    '/barberare': ['Möt barberarna | Buffalo Barbershop Göteborg', 'Upptäck barberarprofilerna hos Buffalo. Läs om hantverket och hitta kontakt, bildmaterial och bokningsvägar.'],
    '/galleri': ['The gallery | Buffalo Barbershop Göteborg', 'Hantverk, detaljer och bildberättelser. Utforska bildmaterialet för Buffalo Barbershop och Kenai’s.'],
    '/recensioner': ['Omdömen | Buffalo Barbershop', 'Se kundernas betyg på Buffalo Barbershop i Göteborg och läs omdömen på Bokadirekt.'],
    '/kontakt': ['Hitta hit & boka | Buffalo Barbershop på Avenyn', 'Besök Buffalo Barbershop på Kungsportsavenyen 26 i Göteborg. Hitta telefon, öppettider, vägbeskrivning och bokning.'],
    '/integritet': ['Integritet | Buffalo Barbershop', 'Information om externa bokningslänkar, kartor, typsnitt och behandling av personuppgifter. Utkast för granskning före lansering.']
};
export const routePaths = [...Object.keys(simple), ...services.map(s => `/tjanster/${s.slug}`), ...barbers.map(b => `/barberare/${b.slug}`)];
export function getMetadata(input: string) {
    const path = input === '/' ? '/' : input.replace(/\/$/, '');
    let value = simple[path];
    if (path.startsWith('/tjanster/')) {
        const service = services.find(s => path === `/tjanster/${s.slug}`);
        if (service)
            value = [`${service.title} i Göteborg | Buffalo Barbershop`, `${service.title} på Avenyn i Göteborg. ${service.details[0]} Se pris och boka tid hos Buffalo Barbershop på Kungsportsavenyen 26.`];
    }
    if (path.startsWith('/barberare/')) {
        const barber = barbers.find(b => path === `/barberare/${b.slug}`);
        if (barber)
            value = [`${barber.name} | Barberarprofil på Buffalo Barbershop`, `${barber.name}: ${barber.role}. Läs profilen, upptäck bildmaterial och hitta kontaktväg.`];
    }
    const missing = !value;
    return { title: value?.[0] || 'Sidan finns inte | Buffalo Barbershop', description: value?.[1] || 'Den här sidan finns inte. Hitta tillbaka till Buffalo Barbershop, våra tjänster eller kontakt.', path, image: '/og.jpg', noindex: missing || !site.indexable || path === '/integritet' || path === '/barberare/kenais' };
}
export function getStructuredData(path: string) {
    if (getMetadata(path).noindex || !routePaths.includes(path))
        return null;
    // No self-serving aggregateRating; no unverified employment or personal timeline.
    const salon = { '@context': 'https://schema.org', '@type': 'HairSalon', '@id': `${site.url}/#salon`, name: site.name, url: site.url, image: `${site.url}/og.jpg`, telephone: site.phone || undefined, email: site.email,
        address: { '@type': 'PostalAddress', streetAddress: site.address, postalCode: site.postcode, addressLocality: site.city, addressCountry: 'SE' },
        sameAs: [site.instagram, site.bookingUrl], openingHoursSpecification: [
            { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '19:00' },
            { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '17:00' },
            { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '11:00', closes: '16:30' }
        ] };
    const url = `${site.url}${path}`;
    const service = services.find(s => path === `/tjanster/${s.slug}`);
    const graph: object[] = [salon, {
        '@type': 'WebSite', '@id': `${site.url}/#website`, url: `${site.url}/`,
        name: site.name, inLanguage: 'sv-SE', publisher: { '@id': salon['@id'] }
    }, {
        '@type': 'WebPage', '@id': `${url}#webpage`, url,
        name: getMetadata(path).title, description: getMetadata(path).description,
        inLanguage: 'sv-SE', isPartOf: { '@id': `${site.url}/#website` },
        about: { '@id': salon['@id'] }
    }];
    if (service) graph.push({
        '@type': 'Service', '@id': `${url}#service`, url, name: service.title,
        description: `${service.intro} ${service.details.join(' ')}`,
        serviceType: service.title, provider: { '@id': salon['@id'] },
        areaServed: { '@type': 'City', name: site.city }
    });
    return { '@context': 'https://schema.org', '@graph': graph };
}
export function escapeHtml(text: string): string {
    const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return text.replace(/[&<>"']/g, c => entities[c]);
}
export function renderHead(path: string) {
    const meta = getMetadata(path), canonical = `${site.url}${meta.path === '/' ? '/' : meta.path}`, data = getStructuredData(path);
    return `<title>${escapeHtml(meta.title)}</title>
<meta name="description" content="${escapeHtml(meta.description)}" />
<meta name="robots" content="${meta.noindex ? 'noindex,follow' : 'index,follow'}" />
<link rel="canonical" href="${escapeHtml(canonical)}" />
<meta property="og:site_name" content="${escapeHtml(site.name)}" />
<meta property="og:type" content="website" /><meta property="og:locale" content="sv_SE" />
<meta property="og:title" content="${escapeHtml(meta.title)}" />
<meta property="og:description" content="${escapeHtml(meta.description)}" />
<meta property="og:url" content="${escapeHtml(canonical)}" />
<meta property="og:image" content="${site.url}${meta.image}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(meta.title)}" />
<meta name="twitter:description" content="${escapeHtml(meta.description)}" />
<meta name="twitter:image" content="${site.url}${meta.image}" />
${data ? `<script id="salon-schema" type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}<\/script>` : ''}`;
}
