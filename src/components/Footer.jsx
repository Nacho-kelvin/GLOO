import { Link } from 'react-router-dom'
import { FOOTER_NAV } from '../data/content.js'
import { BRAND } from '../data/images.js'
import { Compass, Sprout, Link2, Heart } from 'lucide-react'
import { routeIcon } from '../data/icons.js'
import Wordmark from './Wordmark.jsx'
import Social from './Social.jsx'

const HEAD_ICONS = { Explore: Compass, 'Our work': Sprout, Connect: Link2 }

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <Link to="/" className="brand"><img src={BRAND.logo} alt="" width="40" height="40" /><Wordmark /></Link>
          <p>Home is wherever we find Each Other.</p>
          <Social />
        </div>
        {Object.entries(FOOTER_NAV).map(([h, links]) => (
          <nav key={h} aria-label={h}><h2 className="foot-h">{(() => { const H = HEAD_ICONS[h]; return H && <H size={15} strokeWidth={2.2} aria-hidden="true" focusable="false" /> })()}{h}</h2>
            <ul>{links.map(([to, l]) => { const I = routeIcon(to); return <li key={to}><Link to={to}><I size={16} strokeWidth={2} aria-hidden="true" focusable="false" />{l}</Link></li> })}</ul></nav>
        ))}
      </div>
      <div className="wrap foot-base"><span>© {new Date().getFullYear()} HomeAFar. All rights reserved.</span><span className="foot-made"><Heart size={14} strokeWidth={2.4} aria-hidden="true" focusable="false" />Founded by Murugi Njiru</span></div>
    </footer>
  )
}
