# SEO för Buffalo Barbershop

## Innehåll och teknisk grund

- Alla sidor förgenereras till HTML med en H1, unik titel och metabeskrivning.
- Canonical, Open Graph och Twitter-kort använder `VITE_SITE_URL`.
- `sitemap.xml` innehåller endast indexerbara sidor. `robots.txt` skapas vid bygge.
- Indexerbara sidor har JSON-LD för HairSalon, WebSite och WebPage. Behandlingssidor har även Service med salongen som utförare.
- `frontend/public/llms.txt` innehåller en svensk sammanfattning med länkar till behandlingarna. Bygget gör länkarna absoluta och lägger till kontaktuppgifter, öppettider och bokningslänkar från `siteContent.ts`.
- `llms.txt` är kompletterande information för AI-verktyg, inte en rankingfaktor eller garanti för synlighet hos Google.

## Inför lansering

Sätt följande publika miljövariabler i driftmiljön och bygg om:

```dotenv
VITE_SITE_URL=https://DIN-SLUTLIGA-DOMAN.se
VITE_INDEXABLE=true
VITE_CONTENT_APPROVED=true
VITE_PHONE=
VITE_EMAIL=
```

Byt exempeldomänen mot den faktiska HTTPS-domänen. Fyll i salongens kontaktuppgifter. Utan dessa inställningar har projektet som standard `noindex`, blockerande robots.txt och tom sitemap. Integritetssidan och Kenai’s profil har separat noindex i `seo.ts`.

Kontrollera adress, öppettider, behandlingsutbud och priser med salongen. Profiler har ännu `verified: false` i underlaget. Publicera aktuella egna bilder och riktiga kundomdömen; demo- och referensmaterial ska inte beskrivas som verifierade resultat.

## Verifiering

Kör `npm run build --prefix frontend`. Byggkontrollen granskar H1, unika metadata, canonical, sitemap, robots.txt, strukturerad data och interna länkar i llms.txt.

Efter driftsättning:

1. Kontrollera att canonical och sitemap använder rätt domän och att produktionen saknar oavsiktlig noindex.
2. Lägg till domänen i Google Search Console och skicka in `/sitemap.xml`.
3. Kontrollera startsidan och en behandlingssida med URL-inspektion samt Googles Rich Results Test. Service-markup ger inte automatiskt ett särskilt sökresultat.
4. Håll namn, adress, telefon och öppettider konsekventa på webbplatsen, Bokadirekt och Google Business Profile.
5. Mät mobilprestanda med PageSpeed Insights på den publicerade sidan, särskilt startsidans video, bilder och typsnitt.
6. Kontrollera att en okänd URL returnerar HTTP 404 och att alternativa domäner omdirigerar till den valda domänen. Vercel-konfigurationen använder förgenererade sidor och clean URLs.
