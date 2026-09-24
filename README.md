# Buffalo Barbershop - MediaMagnet

## Delivery status - please read

The earlier preview's components were reconstructed as individual ESM TypeScript/TSX modules with JSX. The design, custom CSS and supplied media were retained. Actual React Router/Vite configuration, a contact form, API integration, build scripts and a FastAPI backend have been added.

**This is source for local testing and further development, not a verified production release.** The backend passed 15 automated tests. TypeScript 5.8.3 parsed/transpiled 45 TS/TSX modules without syntax errors. However, npm installation failed in the delivery environment with `EAI_AGAIN` resolving registry.npmjs.org. Full typechecking against installed React/Router/Vite packages, the complete Vite build and deployment have NOT been verified. Browser navigation to localhost was blocked by the environment's administrator; final browser/mobile QA remains outstanding. See `tests/QA.md`.

No package-lock.json was fabricated. Run `npm install` on a networked computer to create the real lockfile, check the build and commit the resulting lockfile. node_modules, Python virtual environments, secrets and font binaries are not included.

## Stack

Frontend: React 18.3.1, TypeScript, Vite, react-router-dom and hand-built CSS. No UI or animation framework. Backend: Python, FastAPI, Pydantic, python-dotenv and SMTP with TLS. CSS sticky, requestAnimationFrame, IntersectionObserver, native dialogs and reduced-motion controls implement the visual effects.

## Structure

```text
BuffaloBarbershop/
  README.md
  package.json
  vercel.json
  .gitignore
  docs/
  tests/
  frontend/
    package.json
    tsconfig.json
    vite.config.ts
    .env.example
    index.html
    scripts/{prerender,check-build}.mjs
    public/
      images/
      media/
      favicon.png
      apple-touch-icon.png
      og.jpg
      robots.txt
      sitemap.xml
      llms.txt
      404.html
    src/
      main.tsx
      App.tsx
      entry-server.tsx
      components/
      content/
      hooks/
      pages/
      styles/global.css
  backend/
    requirements.txt
    requirements-dev.txt
    .env.example
    app/{__init__,main,config,models,mailer,middleware}.py
    data/reviews.json
    tests/test_api.py
```

## Start on your computer

Install Node.js 22.12+ and start the frontend using standard npm commands:

### Frontend - terminal 1

```bash
cd frontend
npm install
# Copy .env.example to .env.local if it does not already exist.
npm run dev
```

Open **http://127.0.0.1:5173**. Do not double-click frontend/index.html: the real React/Vite project requires a server.

### Backend - terminal 2

Windows:

```powershell
cd backend
py -3 -m venv .venv
.venv\Scripts\python.exe -m pip install -r requirements.txt
# Copy .env.example to .env if it does not already exist.
.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

macOS/Linux:

```bash
cd backend
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
# Copy .env.example to .env if it does not already exist.
.venv/bin/python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

API documentation: http://127.0.0.1:8000/api/docs. Vite proxies `/api` to port 8000 during development. The main website can be viewed without the API; form submissions need the API running.

## Pages and features

The homepage retains the three-chapter cinematic scroll hero, salon story, prices, horizontally scrollable chair/gallery rail, barbers, gallery hero, two opposing review rows, click-to-load satellite map and footer. Individual routes exist for `/om-oss`, `/tjanster`, `/tjanster/:slug`, `/barberare`, `/barberare/:slug`, `/galleri`, `/recensioner`, `/kontakt`, `/integritet` and 404. There are 24 content routes, including 13 services and three barber profiles, plus 404.

Mobile menu, body-scroll locking, image lightbox, gallery filters and motion controls are implemented. The combined source version still needs real browser/mobile validation.

Booking is external. No custom calendar, payment system, admin panel, CRM database or live Google Reviews sync is included.

## API and form behavior

- `GET /api/health`: API status and contact mode.
- `GET /api/reviews`: manually approved reviews from backend/data/reviews.json, initially empty.
- `POST /api/contact`: Pydantic-validated contact form.

**CONTACT_MODE=demo is the default: no email is sent and no form data is persisted to a database.** The frontend explicitly displays a test-mode message instead of claiming delivery.

For real email, configure backend/.env with SMTP_HOST/PORT/USERNAME/PASSWORD/FROM and CONTACT_TO, set CONTACT_MODE=smtp and restart. SMTP always uses STARTTLS or SSL. Verify actual inbox delivery: no real SMTP account was provided or tested here. The automated SMTP tests use a mock sender.

Honeypot, field limits, a request-body limit, explicit CORS/host allowlists and simple rate limiting are included. The limiter is per process, not distributed. Multiple instances require a shared limiter or proxy protection. Configure trusted reverse proxies carefully; do not blindly trust caller-supplied forwarding headers. Review logging, retention and privacy obligations before public deployment.

## Editing content

All source lives under frontend/src. content/siteContent.ts contains business information, opening hours, links, maps and navigation. services.ts contains the supplied prices and service slugs; precise durations have not been invented. barbers.ts holds biographies/portfolio/social links; gallery.ts holds image metadata. reviews.ts contains clearly labeled DEMO cards, not real reviews. seo.ts contains per-route metadata and publishing guards. styles/global.css contains the design and responsive effects.

Images are in frontend/public/images, video in frontend/public/media. Use root-relative paths such as /images/kenais-portrait.webp. All VITE_ variables are public: never put SMTP credentials or other secrets there.

## Important content limitations

The homepage uses `/media/hero-buffalo-scrub.mp4`, a scroll-optimized copy of `hero-buffalo.mp4`. GSAP + ScrollTrigger drive the video and the three existing text chapters together. Set `VITE_HERO_VIDEO` to override the source. Poster images and timing settings live in `frontend/src/content/heroStory.ts`. See [the scroll-video guide](docs/SCROLL-VIDEO.md) for encoding and adjustments. Reference photographs are marked; they are not automatically photographs of Buffalo.

Prices, hours, staff relationships and biographies come from the project brief/earlier preview and require owner approval. They were not independently reverified for this delivery. Missing phone/email remain empty; configure VITE_PHONE and VITE_EMAIL with confirmed details.

Salon's Bokadirekt ID 52383 is NOT a verified Kenai personal calendar. Kenai uses Instagram until VITE_KENAIS_BOOKING_URL is supplied. Confirm the general booking/social links too. Anas/Waseem do not have fabricated portraits or social accounts; add their approved material.

The famous-chair heading is a design reference, not proof of celebrity customers. Unverified real-review claims from the old preview were removed. DEMO cards are visibly labeled and API reviews start empty. Check permission for all photos, likenesses and trademarks before publication.

Google Fonts is requested externally, with system fallback; no font files are distributed. The MediaMagnet footer credit is typographic because no actual credit-logo asset was supplied. Maps load after a click and request satellite mode. The privacy page is an implementation draft, not a legal review; fill in the responsible business details.

## Build and tests

After a successful npm installation:

```bash
cd frontend
npm run typecheck
npm run build
npm run preview
```

Build performs client build, SSR build and per-route prerendering, then checks titles, H1s, metadata and assets. Backend tests (use your virtual environment's Python):

```bash
cd backend
python -m pip install -r requirements-dev.txt
python -m pytest -q
```

On Windows use .venv\Scripts\python.exe; on macOS/Linux use .venv/bin/python. The root tests/QA.md distinguishes completed checks from outstanding work.

## Deployment

Import the project root into Vercel. vercel.json installs/builds in frontend/ and publishes frontend/dist. Prerendered HTML plus cleanUrls is intended to serve separate routes and a real 404 rather than a universal 200 rewrite. This must be checked on an actual Vercel preview deployment.

**The Vercel configuration deploys the frontend only.** Deploy FastAPI separately to a Python-compatible host. Set VITE_API_BASE_URL to the API's HTTPS origin without a trailing /api, for example https://api.your-actual-domain.se. Paths add /api themselves. Configure backend ALLOWED_ORIGINS for the frontend origin and ALLOWED_HOSTS for the API hostname. Production infrastructure and credentials are not included.

Keep VITE_INDEXABLE=false and VITE_CONTENT_APPROVED=false while testing. After fact/media approval and successful tests, set a real VITE_SITE_URL, enable both flags and rebuild. A placeholder .invalid URL cannot enable indexing. Kenai's profile also has an explicit noindex guard in seo.ts; remove it only after approval. Privacy and 404 remain noindex.

Use docs/LAUNCH-CHECKLIST.md before publishing. Generated robots/sitemap/llms and structured data must be checked against the actual production domain.
