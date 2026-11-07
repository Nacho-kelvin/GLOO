# HomeAFar website (Vite + React, static)

Static pages plus a small admin area. Forms go to Netlify Forms (and a copy is saved for /admin); events, opportunities and messages are stored in Netlify Database and managed at /admin (Netlify Identity sign-in, "admin" role).

## Project layout
```
src/
  main.jsx, App.jsx        entry point and routes (pages are code-split with React.lazy)
  pages/                   one file per page (Home, About, ContentPage, Events, Stories, Beyond, Opportunities, GetInvolved, Contact, Privacy, NotFound)
  components/              Header, Footer, BackToTop, Form, Media (Photo, Figure, Hero, Banner, Gallery), MediaTile, Sections (Faq, Stats, Journey, Notice)
  data/content.js          all page copy, navigation, founders, FAQ
  data/seo.js              page titles, descriptions and site URL (used by the pages and by the build)
  data/images.js           image registry: file, widths, alt text and focal point for every picture
  hooks/                   usePage (title/meta), useReveal (scroll fade-in)
  styles/                  index.css imports tokens, layout, header, hero, buttons, cards, media, sections, forms, pages, footer, motion
public/images/
  brand/                   logo, favicons, social preview image
  photos/                  real HomeAFar photographs (Passport Picnic, community)
  selected/real, selected/stock   the curated photographs the site uses (see docs/IMAGE_AUDIT.md)
  illustrative/            legacy stock and generated images, no longer referenced (remove with scripts/audit-images.mjs --delete)
```
Every image exists as WebP in several widths, named `<name>-<width>.webp`. To add one: put the files in `public/images/<folder>/`, then add one line to `src/data/images.js`; components pick up responsive `srcset`, alt text and focal point from there.

src/entry-server.jsx       build-time server entry: renders a route to HTML with React
scripts/prerender.mjs      runs after the client + SSR builds: writes one pre-rendered HTML file per route (real page content, own title, description, canonical, social tags), 404.html and sitemap.xml. main.jsx hydrates that HTML in the browser.

## Design system notes
- `components/Btn.jsx` is the one button (rectangular, arrow nudges right on hover/focus; `ghost`, `light`, `arrow={false}`). `components/Wordmark.jsx` is the gold HOMEAFAR title (Cormorant Garamond 700, italic gold A). `Flag.jsx` uses flag SVGs in `public/images/flags` (MIT, flag-icons). `Social.jsx` reads `SOCIALS` in `data/content.js`: add Facebook's URL there as `href` to make it a link. Icons come from lucide-react.
- `components/Lightbox.jsx` is the full-screen photo viewer used by the Events album (keyboard, swipe, focus kept inside, focus returned on close). The Events page lists its photos and captions in `ALBUM` at the top of `pages/Events.jsx`.
- `styles/borders.css` is the animated gold border on tiles/notices/FAQ; `styles/motion.css` holds reveal, stagger and page-fade animations. All respect `prefers-reduced-motion`.
- Leadership is `LEADERS` in `data/content.js`. No leadership photos exist yet.

## Tests
`npm run build && npx vite preview --port 4173`, then `BASE=http://127.0.0.1:4173 npm run test:e2e` (needs `pip install playwright && playwright install chromium`). Add `MOCK=1` to also submit the forms against an intercepted Netlify Forms request. Note: `vite preview` answers unknown URLs with 200; the 404 check expects Netlify behaviour (a real 404).

## Run locally
```
npm install
npm run dev
```

## Forms
Every form (contact, volunteer, partner, membership, newsletter, event registration) is sent to Netlify Forms. Read submissions and set up email notifications in the Netlify dashboard under **Forms**. `public/__forms.html` holds a hidden copy of each form so Netlify registers it at deploy time: if you add a field to `components/Form.jsx`, add it there too.

## Events and opportunities

## Deploy
Hosted on Netlify (build `npm run build`, output `dist`). `netlify.toml` sets cache and security headers. `dist/` is build output and is not committed. To add a page: add its route in `src/App.jsx` and one line in `src/data/seo.js`; the build then renders its HTML and sitemap entry. Code that reads `window`/`document` must stay inside `useEffect` (it also runs on the build server).

## Images
Selected photographs live in `public/images/selected/real` (HomeAFar's own) and `public/images/selected/stock` (curated Unsplash). Stock photos must never be presented as HomeAFar events or people; side panels keep the "Illustrative image" caption. See `docs/IMAGE_AUDIT.md` for what was kept, rejected and why. `node scripts/audit-images.mjs` lists files in `public/images` that nothing references (add `--delete` to remove them).

## Editing copy
Stats, journey timeline, FAQ, footer links and page content are in `src/content.js`. Only add figures that can be verified.

## Not built yet (future work)
Stories and country-profile publishing from the dashboard, team profiles, partner listings, email notifications/confirmations, CAPTCHA, scheduling, French content, event photo galleries (waiting on approved photos), analytics, donations/ticketing (deliberately not started), Charles Marcell's approved bio and photo, Murugi Njiru's approved bio and photo.

## Design and content update notes
- Home hero: logo + HomeAFar lockup, left-hand scrim for readability, and a stacked photo-above-text layout on phones (`.hero-stacked`).
- Content pages (Safe Landing, Tourism, Protection & Justice, Women's Health) now compose optional blocks from `src/data/content.js`; see `docs/CONTENT_NEEDED.md`.
- CSS: duplicate rules for `.wrap`, `.meta`, `.chips`, `.ccard .eyebrow`, `.brand` merged; removed a rule that shrank the wordmark's italic "A" below 360px.
- Not verified in the authoring environment: `npm run build` and `npm run test:e2e` (no registry access). Run both before deploying.
