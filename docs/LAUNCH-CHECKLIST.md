# Launch checklist

## Business content and rights
- [ ] Owner approves address, hours, prices and treatment descriptions.
- [ ] Confirm business legal name, phone, email and privacy notice.
- [ ] Confirm booking/social links: salon ID 52383 is not a personal Kenai calendar.
- [ ] Confirm Kenai biography and relationship with Buffalo.
- [ ] Add approved Anas/Waseem portraits, portfolios and social profiles.
- [ ] Replace/reference-approve mood photographs and animated still-photo video.
- [ ] Replace DEMO reviews with genuinely sourced, approved reviews before launch.
- [ ] Do not imply celebrity endorsements from the famous-chair heading.
- [ ] Review media rights, external fonts/maps and MediaMagnet credit.

## Source, build and browser testing
- [ ] Install Node/Python dependencies on a networked computer.
- [ ] Generate and retain the genuine package-lock.json with npm install.
- [ ] Run npm run typecheck and npm run build in frontend/.
- [ ] Run backend tests and test actual frontend/API integration.
- [ ] Test all routes, direct refresh, back/forward and unknown slugs.
- [ ] Verify Vercel preview, real HTTP 404, metadata/canonical and static pages.
- [ ] Test 320/375/390/430/768/980px and desktop layouts.
- [ ] Test iPhone Safari video fallback, scrolling, touch and reduced motion.
- [ ] Test menu focus/Escape/scroll unlock, lightbox and gallery filters.
- [ ] Check missing assets, overflow and contact form error states.

## Deployment and email
- [ ] Deploy FastAPI separately; the Vercel config publishes frontend only.
- [ ] Configure VITE_API_BASE_URL and backend CORS/host allowlists.
- [ ] Configure server-only SMTP secrets, switch to smtp mode and test delivery.
- [ ] Configure trusted proxies and shared rate limiting if scaling.
- [ ] Review privacy duties, logs/retention and hosting security.
- [ ] Keep secrets and installed dependencies out of version control.
- [ ] Do not assume a CRM, admin dashboard or booking engine exists.

## Indexing
- [ ] Set the actual production VITE_SITE_URL, not example.invalid.
- [ ] Only after approval enable VITE_INDEXABLE and VITE_CONTENT_APPROVED.
- [ ] Review Kenai's explicit profile noindex guard.
- [ ] Keep 404/privacy noindex and rebuild all SEO files.
- [ ] Inspect robots.txt, sitemap.xml, llms.txt and JSON-LD after deployment.
