import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

// One button for the whole site: rectangular, with a directional arrow that nudges right on hover/focus.
// <Btn to="/about">        internal route (react-router Link)
// <Btn href="https://..."> external link (opens in a new tab) or mailto:
// <Btn onClick={...}>      real <button> (pass type="submit" inside forms)
// `ghost` = outlined style, `light` = for dark photo/colour bands. `arrow={false}` for actions where an arrow would mislead (delete, sign out).
export default function Btn({ to, href, ghost = false, light = false, arrow = true, className = '', children, ...rest }) {
  const cls = ['btn', ghost && 'ghost', light && 'light', className].filter(Boolean).join(' ')
  const inner = (<><span className="btn-label">{children}</span>{arrow && <ArrowRight className="btn-arrow" size={18} strokeWidth={2.25} aria-hidden="true" focusable="false" />}</>)
  if (to) return <Link className={cls} to={to} {...rest}>{inner}</Link>
  if (href) {
    const ext = /^https?:/.test(href)
    return <a className={cls} href={href} {...(ext ? { target: '_blank', rel: 'noreferrer' } : {})} {...rest}>{inner}</a>
  }
  return <button className={cls} {...rest}>{inner}</button>
}
