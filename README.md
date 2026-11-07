# Static client website (Vite + React)

This is a static Vite + React site. It has no database connection, dynamic API, admin dashboard, or deployed serverless functions. Events and opportunities are supplied from `src/data/listings.js` and are bundled with the site at build time.

## Run locally
```sh
npm install
npm run dev
```

## Build and preview
```sh
npm run build
npm run preview -- --port 4173
```

The build prerenders each public route to HTML and creates a sitemap, robots.txt, and 404 page in `dist/`. Deploy the `dist/` directory to a static host. Netlify-specific caching headers are in `netlify.toml`; adapt or remove that file for another host. Direct navigation to nested routes should be configured to serve the generated route HTML or the site’s 404 page.

## Client customization checklist
- Replace the HomeAFar name, logo, copy, colors, images, social links, and contact details with client-approved materials.
- Review page titles, descriptions, canonical URL, and social preview in `src/data/seo.js` and `vite.config.js`.
- Replace the privacy notice and any legal or service claims with client-approved language.
- Add client-approved events and opportunities in `src/data/listings.js`; use the documented fields in the page components.
- Configure a form destination before launch. The included forms use Netlify Forms when deployed to Netlify; they will not automatically work on arbitrary static hosts. No submissions are stored in a project database.
- Update the existing npm lockfile after changing dependencies by running `npm install`.

## Forms
Forms are handled by Netlify Forms only when Netlify Forms is enabled for the deployment. Set up the provider and test a real submission before launch. The hidden form declarations are in `public/__forms.html`. If you change form fields in `src/components/Form.jsx`, update those declarations too.

## Tests
```sh
npm run build && npm run preview -- --port 4173
BASE=http://127.0.0.1:4173 npm run test:e2e
BASE=http://127.0.0.1:4173 npm run test:navigation
```
The browser tests require Playwright (`pip install playwright && playwright install chromium`).

## Legacy database files
The old schema, migrations, and function sources are retained as inert history only. Netlify is configured to deploy the empty `netlify/disabled-functions` directory, and the application does not import or call those files. Remove the legacy files from the repository after confirming they are no longer needed.
