import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { House } from 'lucide-react'
import { NAV } from '../data/content.js'
import { routeIcon } from '../data/icons.js'
import { BRAND } from '../data/images.js'
import Wordmark from './Wordmark.jsx'

const DESKTOP_NAV_QUERY = '(min-width: 1400px)'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const burgerRef = useRef(null)
  const menuRef = useRef(null)
  const [desktopNav, setDesktopNav] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(DESKTOP_NAV_QUERY).matches,
  )

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Keep the JavaScript interaction breakpoint in sync with the CSS navigation layout.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_NAV_QUERY)
    const onChange = (event) => {
      setDesktopNav(event.matches)
      if (event.matches) setOpen(false)
    }
    setDesktopNav(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        burgerRef.current?.focus()
        return
      }
      if (event.key !== 'Tab' || !menuRef.current) return

      const items = [burgerRef.current, ...menuRef.current.querySelectorAll('a')].filter(Boolean)
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      } else if (!items.includes(document.activeElement)) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <header className={scrolled ? 'header scrolled' : 'header'}>
      <a className="skip" href="#main">Skip to content</a>
      <Link to="/" className="brand" onClick={() => setOpen(false)}>
        <img src={BRAND.logo} alt="" width="44" height="44" /><Wordmark />
      </Link>
      <button
        ref={burgerRef}
        className="burger"
        aria-expanded={open}
        aria-controls="menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((value) => !value)}
      >
        <span /><span /><span />
      </button>
      <nav ref={menuRef} id="menu" className={open ? 'menu open' : 'menu'} aria-label="Main">
        <NavLink to="/" end className="nav-home" aria-label="Home" title="Home" onClick={() => setOpen(false)}>
          <House size={18} strokeWidth={2} aria-hidden="true" focusable="false" />
          <span className="f">Home</span>
        </NavLink>
        {NAV.map(([to, label, short]) => {
          const Icon = routeIcon(to)
          return (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}>
              <Icon className="nav-ico" size={18} strokeWidth={2} aria-hidden="true" focusable="false" />
              <span className="f">{label}</span>
              <span className="s">{short || label}</span>
            </NavLink>
          )
        })}
      </nav>
    </header>
  )
}
