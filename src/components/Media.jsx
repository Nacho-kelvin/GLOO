import { ChevronDown, House, ChevronRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { routeIcon } from '../data/icons.js'
import { PH, imgSrc, imgSrcSet, coverSizes } from '../data/images.js'

export const TILE_SIZES = '(min-width:1000px) 270px, (min-width:700px) 45vw, 92vw'

const objectPos = (p) => (p.pos ? { objectPosition: p.pos } : undefined)

export function Photo({ name, sizes = '(min-width:1000px) 360px, 90vw', className, ...rest }) {
  const p = PH[name]
  return <img className={className} src={imgSrc(p, p.w[1] || p.w[0])} srcSet={imgSrcSet(p)} sizes={sizes} alt={p.alt} style={objectPos(p)} loading="lazy" decoding="async" {...rest} />
}

// ratio: 'r169' (16:9) or 'r45' (4:5) override the default 4:3 frame.
export function Figure({ name, caption, sizes, className = '', ratio = '' }) {
  return <figure className={`fig ${ratio} ${className}`.trim()}><Photo name={name} sizes={sizes} />{caption && <figcaption>{caption}</figcaption>}</figure>
}

// Full-width hero. `mobile` swaps the picture below 700px; `pos` / `mobilePos` set the focal point per breakpoint.
// `full` makes the hero fill the whole first screen edge to edge (homepage), with a scroll cue to the content below.
// Inner pages get a Home breadcrumb above the title (`crumb` overrides the page name shown there).
export function Hero({ title, lead, img, mobile, pos, mobilePos, full = false, eyebrow, crumb, className = '', children }) {
  const d = PH[img], m = PH[mobile || img]
  const focal = pos || d.pos || 'center'
  const focalM = mobilePos || (mobile ? m.pos : '') || focal
  // The photo covers a box that is often taller than it is wide (portrait tablets, phones), so ask for a file wide enough for the height too,
  // based on each photo's own shape. The full homepage hero is one screen tall; inner heroes are about 62-80% of the screen.
  const hv = full ? 100 : 80
  const PageIcon = routeIcon(useLocation().pathname.replace(/\/$/, '') || '/')
  return (
    <section className={`hero${full ? ' hero-full' : ''}${className ? ` ${className}` : ''}`}>
      <picture>
        <source media="(max-width:699px)" srcSet={imgSrcSet(m)} sizes={coverSizes(m, hv)} />
        <img className="hero-img" src={imgSrc(d, d.w[d.w.length - 1])} srcSet={imgSrcSet(d)} sizes={coverSizes(d, hv)} alt="" style={{ '--pos': focal, '--pos-m': focalM }} fetchpriority="high" decoding="async" />
      </picture>
      <div className="wrap hero-text">
        {!full && <nav className="crumbs" aria-label="Breadcrumb"><Link to="/"><House size={15} strokeWidth={2.2} aria-hidden="true" focusable="false" />Home</Link><ChevronRight size={14} aria-hidden="true" focusable="false" /><span aria-current="page">{crumb || title}</span></nav>}
        {!full && <span className="hero-badge" aria-hidden="true"><PageIcon size={24} strokeWidth={1.9} focusable="false" /></span>}
        {eyebrow && <span className="eyebrow hero-eyebrow">{eyebrow}</span>}<h1>{title}</h1>{lead && <p className="lead">{lead}</p>}{children}</div>
      {full && <a className="hero-cue" href="#content" aria-label="Scroll to content"><ChevronDown size={28} strokeWidth={2} aria-hidden="true" focusable="false" /></a>}
    </section>
  )
}

// Two photographs layered like a magazine spread: a large one with a smaller one overlapping its corner.
export function Overlap({ main, accent, flip = false, sizes = '(min-width:1100px) 540px, (min-width:800px) 50vw, 92vw' }) {
  return (
    <div className={`overlap${flip ? ' flip' : ''}`}>
      <figure className="ov-main"><Photo name={main} sizes={sizes} /></figure>
      {accent && <figure className="ov-accent"><Photo name={accent} sizes="(min-width:1100px) 260px, (min-width:800px) 24vw, 46vw" /></figure>}
    </div>
  )
}

// Full-width photograph with a readable text panel over it.
export function PhotoBand({ name, pos, align = 'left', children }) {
  const p = PH[name]
  return (
    <section className={`photoband ${align}`}>
      <img src={imgSrc(p, p.w[p.w.length - 1])} srcSet={imgSrcSet(p)} sizes="(max-width:699px) max(100vw, 560px), 100vw" alt="" loading="lazy" decoding="async" style={{ objectPosition: pos || p.pos || 'center' }} />
      <div className="wrap pb-text">{children}</div>
    </section>
  )
}

// Asymmetric photo collage (real photographs only). First name is the large tile.
export function Collage({ names, label }) {
  return (
    <div className="collage" role="group" aria-label={label}>
      {names.map((n, i) => <figure key={n} className={`cl cl${i + 1}`}><Photo name={n} sizes={i === 0 ? '(min-width:900px) 40vw, 92vw' : '(min-width:900px) 20vw, 46vw'} /></figure>)}
    </div>
  )
}

// Edge-to-edge row of real photographs (homepage). Four across on wide screens, two by two on phones.
export function Filmstrip({ names, label }) {
  return (
    <div className="filmstrip bleed" role="group" aria-label={label}>
      {names.map((n) => <figure key={n} className="fs"><Photo name={n} sizes={PH[n].portrait ? '(min-width:800px) 25vw, 50vw' : '(min-width:800px) 45vw, 90vw'} /></figure>)}
    </div>
  )
}
