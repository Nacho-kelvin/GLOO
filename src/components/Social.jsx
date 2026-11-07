import { Instagram, Facebook, Mail } from 'lucide-react'
import { SOCIALS, EMAIL } from '../data/content.js'

const ICON = { instagram: Instagram, facebook: Facebook }

// Only platforms HomeAFar actually uses, from SOCIALS in data/content.js. A platform with no verified URL is shown as plain text, never as an invented link.
export default function Social({ showLabels = true, email = true, className = '' }) {
  return (
    <ul className={`socials ${className}`.trim()}>
      {SOCIALS.map(({ id, label, handle, href }) => {
        const Icon = ICON[id]
        const body = (<><Icon size={20} strokeWidth={1.9} aria-hidden="true" focusable="false" /><span className={showLabels ? '' : 'sr-only'}>{id === 'instagram' ? `${label} ${handle}` : `${label}: ${handle}`}</span></>)
        return <li key={id}>{href
          ? <a className="social" href={href} target="_blank" rel="noreferrer" aria-label={`${label} ${handle} (opens in a new tab)`}>{body}</a>
          : <span className="social static">{body}</span>}</li>
      })}
      {email && <li><a className="social" href={`mailto:${EMAIL}`}><Mail size={20} strokeWidth={1.9} aria-hidden="true" focusable="false" /><span className={showLabels ? '' : 'sr-only'}>{EMAIL}</span></a></li>}
    </ul>
  )
}
