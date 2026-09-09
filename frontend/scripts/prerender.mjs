import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { render, renderHead, routePaths, getMetadata, site } from '../.ssr/entry-server.js';
const output = resolve('dist');
const template = await readFile(resolve(output, 'index.html'), 'utf8');
const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const paths = [...new Set([...routePaths, '/404'])];
for (const route of paths) {
 const file = resolve(output, route === '/' ? 'index.html' : `${route.slice(1)}.html`);
 await mkdir(dirname(file), { recursive: true });
 const html = template.replace(/<!--app-head-->[\s\S]*?<!--\/app-head-->/, renderHead(route))
   .replace('<!--app-html-->', render(route));
 await writeFile(file, html);
}
const publicPaths = routePaths.filter(p => !getMetadata(p).noindex);
await writeFile(resolve(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicPaths.map(p => `\n<url><loc>${escape(site.url + p)}</loc></url>`).join('')}\n</urlset>\n`);
await writeFile(resolve(output, 'robots.txt'), site.indexable ? `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n');
const llms = (await readFile(resolve('public/llms.txt'), 'utf8'))
  .replace(/\]\((\/[^)]*)\)/g, (_, path) => `](${site.url}${path})`);
const businessDetails = [
  `## Kontakt och praktisk information`,
  `- Adress: ${site.address}, ${site.postcode} ${site.city}, Sverige.`,
  `- Webbplats: ${site.url}/`,
  `- [Boka tid hos ${site.name}](${site.bookingUrl})`,
  `- [Instagram](${site.instagram})`,
  `- [Vägbeskrivning i Google Maps](${site.directionsUrl})`,
  ...(site.phone ? [`- Telefon: ${site.phone}`] : []),
  ...(site.email ? [`- E-post: ${site.email}`] : []),
  '', '### Ordinarie öppettider',
  ...site.hours.map(h => `- ${h.label}: ${h.value}`),
  'Personlig tillgänglighet visas i bokningen. Kontakta salongen för avvikande öppettider.',
];
await writeFile(resolve(output, 'llms.txt'), `${llms}\n${businessDetails.join('\n')}\n${site.indexable ? '' : '\nPubliceringsstatus: Förhandsversion. Domän och verksamhetsuppgifter ska färdigställas inför indexering.\n'}`);
console.log(`Prerendered ${paths.length} pages. Indexable: ${site.indexable}`);
