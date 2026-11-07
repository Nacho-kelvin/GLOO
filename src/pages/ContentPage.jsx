import { Link } from 'react-router-dom'
import { Briefcase, Compass, Plane, Home, ShieldCheck, Handshake, BookOpen, Map, UtensilsCrossed, Globe, MapPin, HeartPulse, Users, Sprout, ExternalLink } from 'lucide-react'
import { Hero, Notice, Faq, Figure, Btn, PhotoBand, TILE_SIZES } from '../components'
import { PAGES, NAV } from '../data/content.js'
import { usePage } from '../hooks/usePage.js'

// Icon names used in PAGES (data/content.js) -> lucide icons. Add a name here before using it in the data.
const ICONS = { briefcase: Briefcase, compass: Compass, plane: Plane, home: Home, shield: ShieldCheck, handshake: Handshake, book: BookOpen, map: Map, food: UtensilsCrossed, globe: Globe, pin: MapPin, heart: HeartPulse, users: Users, sprout: Sprout }

const Icon = ({ name }) => { const I = ICONS[name]; return I ? <span className="ico"><I size={22} strokeWidth={1.8} aria-hidden="true" focusable="false" /></span> : null }

// Shared template for Safe Landing, Tourism to Africa, Protection & Justice and Women's Health & Impact.
// Each page switches on the blocks it has (see data/content.js), so the four pages are composed differently.
export default function ContentPage({ slug }) {
  const p = PAGES[slug]
  usePage('/' + slug)
  const related = (p.related || []).map((to) => NAV.find(([t]) => t === to)).filter(Boolean)
  let band = 0 // alternates plain / tinted sections below the introduction
  const tone = () => (band++ % 2 === 0 ? 'alt' : '')
  return (<>
    <Hero title={p.title} lead={p.lead} img={p.img} mobile={p.mobile} pos={p.pos}>{p.status && <span className="hero-status">{p.status}</span>}</Hero>
    <section className="wrap sec"><div className="page-grid">
      <div className="measure"><Notice>{p.notice}</Notice>
        {p.sections.map(([h, body, list]) => <div key={h}><h2>{h}</h2>
          {list ? <ul>{body.map((b) => <li key={b}>{b}</li>)}</ul> : body.map((b) => <p key={b}>{b}</p>)}</div>)}
      </div>
      <aside className="side">
        {p.side && <Figure name={p.side} sizes="(min-width:1000px) 360px, 92vw" />}
        <div className="tile"><h3>Have a question?</h3><p>Tell us what you most need to know and we will point you in the right direction.</p><Btn to="/contact">Ask us a question</Btn></div>
        {related.length > 0 && <div className="tile"><h3>Also explore</h3><ul className="links">{related.map(([to, l]) => <li key={to}><Link to={to}>{l}</Link></li>)}</ul></div>}
      </aside></div></section>

    {(p.cardSets || []).map((c) => <section key={c.title} className={`wrap sec ${tone()}`.trim()}><span className="eyebrow">{c.eyebrow}</span><h2>{c.title}</h2>
      {c.intro && <p className="measure">{c.intro}</p>}
      <div className={c.cols === 4 ? 'grid4' : 'grid3'}>{c.items.map(([icon, t, d, tag]) => <div className="tile" key={t}><Icon name={icon} /><h3>{t}</h3><p>{d}</p>{tag && <span className="badge">{tag}</span>}</div>)}</div></section>)}

    {p.band && <PhotoBand name={p.band[0]} pos={p.band[2]} align="left"><p className="pb-quote">{p.band[1]}</p></PhotoBand>}

    {p.compare && <section className={`wrap sec ${tone()}`.trim()}><span className="eyebrow">{p.compare.eyebrow}</span><h2>{p.compare.title}</h2>
      <div className="grid2">{[['left', 'yes'], ['right', 'no']].map(([k, kind]) => <div className="tile" key={k}><h3>{p.compare[k].title}</h3>
        <ul className={`ticks ${kind}`}>{p.compare[k].items.map((i) => <li key={i}>{i}</li>)}</ul></div>)}</div></section>}

    {p.resources && <section className={`wrap sec ${tone()}`.trim()}><span className="eyebrow">{p.resources.eyebrow}</span><h2>{p.resources.title}</h2><p className="measure">{p.resources.intro}</p>
      <div className="grid2">{p.resources.links.map(([label, url, d]) => <a className="tile" key={url} href={url} target="_blank" rel="noreferrer" aria-label={`${label} (opens in a new tab)`}><h3>{label}</h3><p>{d}</p>
        <span className="ext">Visit website<ExternalLink size={16} aria-hidden="true" focusable="false" /></span></a>)}</div></section>}

    {p.faq && <Faq items={p.faq} title="Common questions" band={tone()} />}

    {p.cta && <section className="wrap sec cta green"><h2>{p.cta.title}</h2><p>{p.cta.text}</p>
      <div className="btn-row center">{p.cta.actions.map(([to, label, ghost]) => <Btn key={to} to={to} ghost={!!ghost} light={!!ghost}>{label}</Btn>)}</div></section>}

    {p.banner && <section className="wrap sec alt"><Figure name={p.banner[0]} sizes="(min-width:1180px) 1180px, 92vw" caption={p.banner[1]} ratio="r169" className="banner-fig" /></section>}
    {p.gallery && <section className="wrap sec alt"><span className="eyebrow">Coming to this page</span><h2>What we will explore</h2>
      <div className="grid4 figs">{p.gallery.map(([n, c]) => <Figure key={n} name={n} caption={c} sizes={TILE_SIZES} className="card" />)}</div></section>}
  </>)
}
