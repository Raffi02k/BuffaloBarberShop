import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { routePaths, getMetadata, site } from '../.ssr/entry-server.js';
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const titles = new Set();
const descriptions = new Set();
for (const route of [...routePaths, '/404']) {
 const meta = getMetadata(route);
 const html = await readFile(`dist/${route === '/' ? 'index' : route.slice(1)}.html`, 'utf8');
 assert(html.includes('<h1'), `Missing H1: ${route}`);
 assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `Multiple H1s: ${route}`);
 assert(html.includes('<title>') && html.includes('name="description"'), `Missing metadata: ${route}`);
 assert(html.includes('rel="canonical"'), `Missing canonical: ${route}`);
 if (getMetadata(route).noindex) assert(html.includes('noindex'), `Missing noindex: ${route}`);
 assert(!titles.has(meta.title), `Duplicate title: ${route}`);
 assert(!descriptions.has(meta.description), `Duplicate description: ${route}`);
 titles.add(meta.title);
 descriptions.add(meta.description);
 assert.equal(sitemap.includes(`<loc>${site.url + route}</loc>`), !meta.noindex, `Incorrect sitemap inclusion: ${route}`);
 const schema = html.match(/<script id="salon-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/);
 assert.equal(Boolean(schema), !meta.noindex, `Incorrect structured data inclusion: ${route}`);
 if (schema) {
   const data = JSON.parse(schema[1]);
   assert(data['@graph'].some(node => node['@type'] === 'HairSalon'), `Missing salon schema: ${route}`);
   if (route.startsWith('/tjanster/')) assert(data['@graph'].some(node => node['@type'] === 'Service'), `Missing service schema: ${route}`);
 }
}
const robots = await readFile('dist/robots.txt', 'utf8');
assert(robots.includes(site.indexable ? `Sitemap: ${site.url}/sitemap.xml` : 'Disallow: /'), 'Incorrect robots configuration');
const llms = await readFile('dist/llms.txt', 'utf8');
assert(llms.includes('## Behandlingar') && llms.includes(site.bookingUrl), 'Missing detailed llms content');
for (const [, href] of llms.matchAll(/\]\(([^)]+)\)/g)) {
 const url = new URL(href);
 if (url.origin === new URL(site.url).origin) assert(routePaths.includes(url.pathname), `Broken llms link: ${href}`);
}
for (const file of ['robots.txt', 'sitemap.xml', 'llms.txt', 'favicon.png', 'images/barber-craft.webp', 'media/barber-story-demo.mp4']) await stat(`dist/${file}`);
console.log('Static build checks passed.');
