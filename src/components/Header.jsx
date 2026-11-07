import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { House } from 'lucide-react'
import { NAV } from '../data/content.js'
import { routeIcon } from '../data/icons.js'
import { BRAND } from '../data/images.js'
import Wordmark from './Wordmark.jsx'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const burgerRef = useRef(null)
  const menuRef = useRef(null)
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => {
      if (!open) return
      // Escape closes the menu and puts focus back on the menu button, so keyboard users are not left on the page behind.
      if (e.key === 'Escape') { setOpen(false); burgerRef.current?.focus(); return }
      // While the menu is open, Tab cycles between the menu button and the menu links only.
      if (e.key !== 'Tab' || !menuRef.current) return
      const items = [burgerRef.current, ...menuRef.current.querySelectorAll('a')].filter(Boolean)
      const first = items[0], last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      else if (!items.includes(document.activeElement)) { e.preventDefault(); first.focus() }
    }
    const onResize = () => window.innerWidth >= 1200 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      document.body.style.overflow = ''
    }
  }, [open])
  return (
    <header className={scrolled ? 'header scrolled' : 'header'}>
      <a className="skip" href="#main">Skip to content</a>
      <Link to="/" className="brand" onClick={() => setOpen(false)}>
        <img src={BRAND.logo} alt="" width="44" height="44" /><Wordmark />
      </Link>
      <button ref={burgerRef} className="burger" aria-expanded={open} aria-controls="menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
        <span /><span /><span />
      </button>
      <nav ref={menuRef} id="menu" className={open ? 'menu open' : 'menu'} aria-label="Main">
        <NavLink to="/" end className="nav-home" aria-label="Home" title="Home" onClick={() => setOpen(false)}><House size={18} strokeWidth={2} aria-hidden="true" focusable="false" /><span className="f">Home</span></NavLink>
        {NAV.map(([to, label, short]) => { const I = routeIcon(to); return (
          <NavLink key={to} to={to} onClick={() => setOpen(false)}><I className="nav-ico" size={18} strokeWidth={2} aria-hidden="true" focusable="false" /><span className="f">{label}</span><span className="s">{short || label}</span></NavLink>
        ) })}
      </nav>
    </header>
  )
}
