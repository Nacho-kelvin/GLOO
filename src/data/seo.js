// Single source of truth for page titles and descriptions. Used by usePage (client) and scripts/prerender.mjs (build),
// so search engines and social-media crawlers see the right tags in the raw HTML of every page, before any JavaScript runs.
// The live address of the site. Netlify sets URL during every build to the main production address (the custom domain once
// one is connected, otherwise the netlify.app address), so canonical links, the sitemap and social previews always point at
// a domain that really serves this site. vite.config.js bakes the same value into the browser bundle as __SITE_URL__.
const FALLBACK_SITE = 'https://majestic-tulumba-87e16b.netlify.app'
// eslint-disable-next-line no-undef
const fromBuild = typeof __SITE_URL__ !== 'undefined' ? __SITE_URL__ : globalThis.process?.env?.URL
export const SITE = (fromBuild || FALLBACK_SITE).replace(/\/+$/, '')
export const SITE_NAME = 'HomeAFar'
export const HOME_TITLE = 'HomeAFar \u2014 Home is wherever we find Each Other'
export const OG_IMAGE = `${SITE}/images/brand/og-image.jpg`

// path -> [short title, meta description (aim for 70-160 characters)]
export const ROUTES = {
  '/': ['Home', 'HomeAFar connects Africans across borders through community, cultural exchange, storytelling, events and practical opportunities.'],
  '/about': ['About', 'The story, mission, vision and values of HomeAFar, a community for Africans across borders founded by Murugi Njiru.'],
  '/safe-landing': ['Safe Landing', "Safe Landing: a first-weeks guide for Africans arriving in, living in or visiting Romania, with official sources for permits, health and getting around."],
  '/tourism-to-africa': ['Tourism to Africa', "Discover African countries through culture, food, music, landscapes and local experiences. Starting with Kenya, our first country guide."],
  '/protection-and-justice': ['Protection & Justice', 'Responsible information and checked referrals for Africans facing discrimination, exploitation or injustice. HomeAFar does not provide legal representation.'],
  '/womens-health': ["Women's Health & Impact", "HomeAFar's long-term vision for affordable, accessible and respectful care for women and girls. HomeAFar is not a medical provider."],
  '/events': ['Events', 'Upcoming and past HomeAFar community events, including Passport Picnic in Bucharest on 30 August 2026.'],
  '/stories-from-afar': ['Stories From Afar', "Stories of Africans living abroad: belonging, cultural adjustment, loneliness, identity and growth, shared with the storyteller's consent."],
  '/beyond-the-borders': ['Beyond the Borders', "A country-by-country series celebrating Africa's diversity: culture, history, languages, food, music, fashion, tourism and economy."],
  '/beyond-the-borders/kenya': ['Kenya', 'Kenya, our first Beyond the Borders profile: Nairobi, Kiswahili, Mount Kenya, the Maasai Mara, ugali, benga, Harambee and much more.'],
  '/opportunities': ['Opportunities', 'Where Africans in Romania can find scholarships, jobs, internships, volunteering and training: trusted official portals, a starter toolkit and checked listings.'],
  '/get-involved': ['Get Involved', 'Become a member, volunteer, partner with HomeAFar or subscribe to updates on events, stories and opportunities.'],
  '/contact': ['Contact', 'Contact HomeAFar by form, email, Instagram or Facebook. Questions about events, Safe Landing, partnerships and media are welcome.'],
  '/privacy': ['Privacy', 'How HomeAFar collects, uses and protects the details you send through its forms, and how to ask for them to be deleted.'],
}

export const fullTitle = (short) => (short === 'Home' ? HOME_TITLE : `${short} \u2014 ${SITE_NAME}`)
export const canonical = (path) => `${SITE}${path === '/' ? '/' : path.replace(/\/+$/, '')}`
