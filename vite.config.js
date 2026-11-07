import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Same rule as src/data/seo.js: Netlify's URL (production address) during builds, the netlify.app address otherwise.
const SITE = (process.env.URL || 'https://majestic-tulumba-87e16b.netlify.app').replace(/\/+$/, '')

export default defineConfig({
  plugins: [
    react(),
    // index.html is written with https://homeafar.com as a placeholder; swap in the real address for canonical, social and structured-data URLs.
    { name: 'site-url', transformIndexHtml: (html) => html.replaceAll('https://homeafar.com', SITE) },
  ],
  define: { __SITE_URL__: JSON.stringify(SITE) },
  server: {
    host: true,
    allowedHosts: true,
  },
})
