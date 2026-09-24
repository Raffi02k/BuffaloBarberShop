# Projektguide

## Struktur
- `frontend/`: React, TypeScript, Vite och React Router; GSAP för scrollanimationer.
- `frontend/src/pages/` och `components/`: sidor och återanvändbara komponenter.
- `frontend/src/content/`: texter, priser, personal, länkar och SEO-data.
- `frontend/src/styles/global.css`: gemensam styling och responsiv design.
- `frontend/public/`: bilder och video; använd rot-relativa URL:er (`/images/...`).
- `backend/app/`: FastAPI och kontaktformulärets SMTP-integration; tester i `backend/tests/`.

## Kommandon
Från projektroten, med Node.js 22.12+:
- Installera frontend: `npm --prefix frontend ci`.
- Utveckling: `npm run dev`.
- Typkontroll: `npm --prefix frontend run typecheck`.
- Full byggkontroll: `npm run build` (typkontroll, klient/SSR, prerendering och statiska kontroller).
- Förhandsvisning: `npm run preview`.

Från `backend/`, med aktiverad Python-miljö och installerade beroenden:
- API: `python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000`.
- Tester: `python -m pytest -q` (kräver `requirements-dev.txt`).

## Kodregler
- Följ befintliga komponenter, TypeScript-typer och CSS-mönster.
- Ändra gemensamt innehåll i `content/` i stället för att duplicera det i komponenter.
- Bevara stöd för prerendering: använd webbläsar-API:er först i webbläsarkontext.
- Bevara tangentbordsstöd, mobilanpassning och inställningar för minskad rörelse.
- `VITE_`-variabler är publika; lägg aldrig hemligheter där.
- Kör relevanta kontroller för ändringen och ange vad som faktiskt verifierats.
- Håll denna guide under 50 rader; lägg detaljer i fokuserade dokument under `docs/`.
- Behåll `dist/`, `node_modules/`, `.venv/` och `.ssr/` i `.gitignore`; undvik att söka i genererade filer.

## Läs vid behov
Läs bara dokument som berör uppgiften:
- Installation, miljövariabler och API: `README.md`.
- Hero, scrollvideo och video-specifikationer: `docs/SCROLL-VIDEO.md`.
- Personal: `docs/BARBER-CONTENT.md`; media: `docs/MEDIA-AND-PROVENANCE.md`.
- SEO, metadata och domän: `docs/SEO.md`; publicering: `docs/LAUNCH-CHECKLIST.md`.
- Manuell QA och tidigare teststatus: `tests/QA.md`.
- Avgränsade uppgifter och överlämning mellan chattar: `docs/AI-WORKFLOW.md`.
