import { Link } from 'react-router-dom'
import { Info, CalendarDays, Globe, Target, BookOpen, Plane, PartyPopper, Sprout, HelpCircle } from 'lucide-react'
import { Quote } from 'lucide-react'
import Flag from './Flag.jsx'
import { FAQ, STATS, JOURNEY, VOICES } from '../data/content.js'

// One icon style for the whole site: a 44px rounded square holding a lucide icon. Pass a lucide component.
export const Ico = ({ icon: I, size = 22 }) => <span className="ico"><I size={size} strokeWidth={1.8} aria-hidden="true" focusable="false" /></span>

export const Notice = ({ children }) => <p className="notice" role="note"><Info size={20} strokeWidth={2} aria-hidden="true" focusable="false" /><span>{children}</span></p>

// Grid of icon cards. items: [[LucideIcon, title, text, badge?]]
export function IconCards({ items, cols = 3 }) {
  return (
    <div className={cols === 4 ? 'grid4' : cols === 2 ? 'grid2' : 'grid3'}>
      {items.map(([I, t, d, tag]) => <div className="tile" key={t}><Ico icon={I} /><h3>{t}</h3><p>{d}</p>{tag && <span className="badge">{tag}</span>}</div>)}
    </div>
  )
}

export function Faq({ items = FAQ, title = 'Questions people ask', eyebrow = 'FAQ', band = '' }) {
  return (
    <section className={`wrap sec${band ? ' ' + band : ''}`}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>
      <div className="faq">{items.map(([q, a]) => (
        <details key={q}><summary><HelpCircle size={20} strokeWidth={1.9} aria-hidden="true" focusable="false" />{q}</summary>
          <p>{a.includes('privacy notice') ? <>{a.replace(' Read the privacy notice for details.', '')} <Link to="/privacy">Read the privacy notice.</Link></> : a}</p>
        </details>
      ))}</div>
    </section>
  )
}

const STAT_ICONS = [CalendarDays, Globe, Target, BookOpen]
export function Stats() {
  return (
    <section className="statband" aria-label="HomeAFar at a glance">
      <ul className="wrap stats">{STATS.map(([n, l, d], i) => { const I = STAT_ICONS[i % STAT_ICONS.length]; return <li key={l}><I className="stat-ico" size={24} strokeWidth={1.7} aria-hidden="true" focusable="false" /><b>{n}</b><span>{l}</span><small>{d}</small></li> })}</ul>
    </section>
  )
}

const JOURNEY_ICONS = [Plane, PartyPopper, Sprout]
export function Journey() {
  return (
    <ol className="journey">{JOURNEY.map(([when, t, d], i) => { const I = JOURNEY_ICONS[i % JOURNEY_ICONS.length]; return (
      <li key={when}><span className="when"><I size={16} strokeWidth={2} aria-hidden="true" focusable="false" />{when}</span><h3>{t}</h3><p>{d}</p></li>
    ) })}</ol>
  )
}

// Guest quotes (see VOICES in data/content.js: currently sample text to be replaced with real, permitted quotes).
export function Voices({ eyebrow = 'Voices from the picnic', title = 'What the day felt like', band = 'alt' }) {
  return (
    <section className={`wrap sec ${band}`.trim()}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>
      <div className="grid3 voices">{VOICES.map(([q, n, c]) => (
        <figure className="tile voice" key={n}><Quote className="voice-mark" size={34} aria-hidden="true" focusable="false" />
          <blockquote>{q}</blockquote><figcaption><Flag country={c} /><span><b>{n}</b>{c}</span></figcaption></figure>
      ))}</div>
    </section>
  )
}

