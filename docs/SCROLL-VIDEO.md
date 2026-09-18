# Scrollstyrd hero

Startsidan använder React + TypeScript/TSX, vanlig CSS och GSAP/ScrollTrigger.
`CinematicHero.tsx` animerar ett gemensamt progressvärde för video, tre
textkapitel, reservbilder och kapitelindikator. Videon autoplayar eller loopar
inte. Scroll nedåt/uppåt söker framåt/bakåt med `scrub: 0.5`.

## Video

- Original: `frontend/public/media/hero-buffalo.mp4` (bevarat).
- Webbfil: `frontend/public/media/hero-buffalo-scrub.mp4`.
- H.264, yuv420p, 1280 × 720, 24 fps, 10 sekunder.
- 240 bildrutor, samtliga keyframes, inget ljudspår.
- 10 372 119 byte (cirka 10,4 MB), faststart (`moov` före `mdat`).

Återskapa från projektroten med FFmpeg:

```sh
ffmpeg -i frontend/public/media/hero-buffalo.mp4 \
  -c:v libx264 -crf 18 -g 1 -pix_fmt yuv420p -an -movflags +faststart \
  frontend/public/media/hero-buffalo-scrub.mp4
```

Videokällan anges i `frontend/src/content/siteContent.ts` och kan ersättas
med `VITE_HERO_VIDEO`. En ersättningsvideo bör också vara intra-frame-optimerad;
justera `fps` i `heroStory.ts` om bildfrekvensen ändras.

## Inställningar

| Inställning | Plats | Standard |
| --- | --- | --- |
| Scrollsträcka | `frontend/src/styles/global.css`, `.cinema` | 400svh desktop, 300svh mobil |
| Utjämning | `frontend/src/content/heroStory.ts`, `scrub` | 0.5 sekunder |
| Beskärning | `global.css`, `.cinema-media video` | `object-fit: cover`, 50% 50%; 57% center på mobil |
| Textövergångar | `heroStory.ts`, `chapterOpacity` | Tre överlappande in-/uttoningar |
| Kapitelindikator/hopp | `heroStory.ts`, `chapterStarts` / `chapterJumps` | Gränser 0.32/0.7; hopp 0/0.49/0.9 |
| Reservbilder | `heroStory.ts`, `posters` | Befintliga tre WebP-bilder |
| Rubriker och länkar | `frontend/src/components/CinematicHero.tsx` | Befintliga tre kapitel |

400svh motsvarar fyra skärmhöjders sektionshöjd, varav cirka tre används för
scroll när den sticky vyn upptar en skärmhöjd. Webbläsarens normala scroll används.

## Laddning, paus och livscykel

Sökning startar först när metadata och bilddata finns och duration är giltig.
En pågående sökning får avslutas innan den senaste önskade tidspositionen
skickas vidare. Skillnader mindre än en halv bildruta ignoreras; sista sökbara
tiden är en bildruta före duration. Stillbilder visas under initial laddning
och vid videofel. Textkapitlen fortsätter fungera även om videon inte laddas.

Pausknappen och `prefers-reduced-motion` använder projektets befintliga statiska
läge: videon tas bort och alla tre kapitel visas som läsbara bildsektioner.
Länkar i osynliga animerade kapitel är `inert` och blir tillgängliga i statiskt läge.

GSAP laddas endast i webbläsarens effect. Async-initiering skyddas mot unmount;
lyssnare, tween och ScrollTrigger rensas vid navigation och rörelseändringar.
Sidans entréanimation utlöser en ny mätning när dess förflyttning är klar.
Videons tidsposition uppdateras inte genom React-state för varje bildruta.

## Verifierat lokalt

- `npm --prefix frontend run build`: TypeScript, klientbygge, SSR, prerendering
  av 25 sidor och projektets statiska byggkontroller godkända.
- FFprobe: 240/240 keyframes, dimensioner/fps/duration, endast ett videospår.
  MP4-atomernas ordning verifierad för faststart.
- Lokal Vite-preview: `video/mp4`, HTTP 206 för byte-range-förfrågan.
- Automatiserade Playwright-tester i installerad Chrome (headless): framåt-
  och bakåtscroll, snabba positionsbyten, stillastående efter utjämning,
  fönsterändring till 390 × 844, paus/återaktivering, ändrad reduced-motion
  och avbruten videoladdning. Inga JavaScript-sidfel.
- Tre SPA-navigeringar bort och tillbaka: exakt en ScrollTrigger efter varje
  återkomst, samt fungerande videostyrning.
- Mobil skärmbild granskad för text, video, bokningsknapp och kapitelkontroller.

Testerna verifierar beteende i Chrome och mobil viewport, inte faktisk
avkodningsprestanda på fysiska telefoner eller Safari/iOS. Den upplevda
mjukheten behöver även bedömas vid manuell scroll på måltelefonerna.
