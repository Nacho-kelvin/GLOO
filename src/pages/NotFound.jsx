import { Link } from 'react-router-dom'
import { usePage } from '../hooks/usePage.js'

const LINKS = [['/', 'Home'], ['/about', 'About'], ['/events', 'Events'], ['/get-involved', 'Get involved'], ['/contact', 'Contact']]

export default function NotFound() {
  usePage('/404', { title: 'Page not found', noindex: true })
  return (<section className="wrap sec notfound"><span className="eyebrow">Error 404</span><h1>Page not found</h1><p>That page does not exist or has moved. Try one of these instead:</p>
    <div className="chips">{LINKS.map(([to, l]) => <Link key={to} to={to}>{l}</Link>)}</div></section>)
}
