import { useEffect } from 'react'
import { ROUTES, fullTitle, canonical } from '../data/seo.js'

const setAttr = (selector, attr, value) => document.querySelector(selector)?.setAttribute(attr, value)

// Applies a page's title, description, canonical URL and social tags, then scrolls to the top.
// `path` is a key of ROUTES (src/data/seo.js). Pages without an entry (404) pass `title` and `noindex`.
export function usePage(path, { title, noindex = false } = {}) {
  useEffect(() => {
    const [short, description] = ROUTES[path] || [title, '']
    const t = fullTitle(short)
    document.title = t
    if (description) {
      setAttr('meta[name="description"]', 'content', description)
      setAttr('meta[property="og:description"]', 'content', description)
      setAttr('meta[name="twitter:description"]', 'content', description)
    }
    setAttr('meta[property="og:title"]', 'content', t)
    setAttr('meta[name="twitter:title"]', 'content', t)
    if (ROUTES[path]) {
      const url = canonical(path)
      setAttr('link[rel="canonical"]', 'href', url)
      setAttr('meta[property="og:url"]', 'content', url)
    }
    let robots = document.querySelector('meta[name="robots"]')
    if (noindex) {
      if (!robots) { robots = document.createElement('meta'); robots.name = 'robots'; document.head.appendChild(robots) }
      robots.content = 'noindex, nofollow'
    } else if (robots) robots.content = 'index, follow, max-image-preview:large'
    // `instant` overrides the site-wide smooth scrolling, so a new page opens at the top instead of sliding up from the old position.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    // Links such as /get-involved#subscribe: after the page has mounted, bring the target section into view.
    const id = decodeURIComponent(window.location.hash.slice(1))
    // Sections below the fold are sized lazily (content-visibility), so layout keeps shifting for a moment: re-aim a couple of times unless the visitor scrolls.
    let stop = () => {}
    if (id) {
      const aim = () => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
      const timers = [0, 350, 900].map((ms) => setTimeout(aim, ms))
      const cancel = () => timers.forEach(clearTimeout)
      window.addEventListener('wheel', cancel, { once: true, passive: true }); window.addEventListener('touchstart', cancel, { once: true, passive: true })
      stop = () => { cancel(); window.removeEventListener('wheel', cancel); window.removeEventListener('touchstart', cancel) }
    }
    return stop
  }, [path, title, noindex])
}
