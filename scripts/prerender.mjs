// Runs after the client build and the SSR build. Renders every route with React to real HTML and writes one file per route
// (about.html, events.html, ...) containing the page's content plus its own title, description, canonical URL and social
// tags, then 404.html, sitemap.xml and robots.txt (all using the live site address from src/data/seo.js). The browser hydrates this HTML, so crawlers and slow phones see content immediately.
// Netlify's pretty URLs serve about.html at /about, and any unknown URL gets 404.html with a real 404 status.
import { readFileSync, writeFileSync, rmSync, readdirSync, mkdirSync } from 'node:fs'
import { ROUTES, SITE, OG_IMAGE, fullTitle, canonical } from '../src/data/seo.js'

const dist = new URL('../dist/', import.meta.url)
const ssrDir = new URL('../dist-ssr/', import.meta.url)
const { render: renderApp } = await import(new URL('entry-server.js', ssrDir))
let shell = readFileSync(new URL('index.html', dist), 'utf8')
// Preload the Latin regular and bold fonts (and the HOMEAFAR title font, which paints in the header) so text paints in the right font on first render instead of waiting for the CSS to be parsed.
const fonts = readdirSync(new URL('assets/', dist)).filter((f) => /^(quicksand-latin-(400|700)-normal|cormorant-garamond-latin-700-(normal|italic))-.*\.woff2$/.test(f))
shell = shell.replace('</head>', fonts.map((f) => `<link rel="preload" as="font" type="font/woff2" href="/assets/${f}" crossorigin />\n`).join('') + '</head>')
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function render(title, description, url, { noindex = false, body = '' } = {}) {
  let h = shell
  // Start downloading the page's main (hero) photo straight away, with the same srcset/sizes the page uses, so it paints sooner.
  const hero = body.match(/<source media="\(max-width:699px\)" srcSet="([^"]+)" sizes="([^"]+)"\/?>\s*<img class="hero-img" src="[^"]+" srcSet="([^"]+)" sizes="([^"]+)"/)
  if (hero) h = h.replace('</head>', `<link rel="preload" as="image" media="(max-width:699px)" imagesrcset="${hero[1]}" imagesizes="${hero[2]}" fetchpriority="high" />\n<link rel="preload" as="image" media="(min-width:700px)" imagesrcset="${hero[3]}" imagesizes="${hero[4]}" fetchpriority="high" />\n</head>`)
  if (body) { if (!h.includes('<div id="root"></div>')) throw new Error('prerender: root element not found'); h = h.replace('<div id="root"></div>', () => `<div id="root">${body}</div>`) }
  const swap = (re, to) => { if (!re.test(h)) throw new Error(`prerender: tag not found ${re}`); h = h.replace(re, to) }
  swap(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
  if (description) {
    swap(/(<meta name="description" content=")[^"]*"/, `$1${esc(description)}"`)
    swap(/(<meta property="og:description" content=")[^"]*"/, `$1${esc(description)}"`)
    swap(/(<meta name="twitter:description" content=")[^"]*"/, `$1${esc(description)}"`)
  }
  swap(/(<meta property="og:title" content=")[^"]*"/, `$1${esc(title)}"`)
  swap(/(<meta name="twitter:title" content=")[^"]*"/, `$1${esc(title)}"`)
  if (url) {
    swap(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`)
    swap(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
  } else h = h.replace(/<link rel="canonical"[^>]*>\n?/, '').replace(/<meta property="og:url"[^>]*>\n?/, '')
  if (noindex) h = h.replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex, nofollow" />')
  return h
}

for (const [path, [short, description]] of Object.entries(ROUTES)) {
  const file = path === '/' ? 'index.html' : `${path.slice(1)}.html`
  mkdirSync(new URL('.', new URL(file, dist)), { recursive: true }) // nested routes such as beyond-the-borders/kenya
  writeFileSync(new URL(file, dist), render(fullTitle(short), description, canonical(path), { body: await renderApp(path) }))
}
writeFileSync(new URL('404.html', dist), render(fullTitle('Page not found'), '', null, { noindex: true, body: await renderApp('/404') }))
rmSync(ssrDir, { recursive: true, force: true })

const day = new Date().toISOString().slice(0, 10)
const urls = Object.keys(ROUTES).map((p) => `<url><loc>${canonical(p)}</loc><lastmod>${day}</lastmod></url>`).join('\n')
writeFileSync(new URL('robots.txt', dist), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)
writeFileSync(new URL('sitemap.xml', dist), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
console.log(`prerender: ${Object.keys(ROUTES).length} routes rendered + 404 + sitemap + robots (${SITE}, og image ${OG_IMAGE})`)
