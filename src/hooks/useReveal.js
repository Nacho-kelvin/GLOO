import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Fades `.sec` sections in as they scroll into view. Pages are lazy-loaded, so their sections appear after this effect runs:
// a MutationObserver picks them up the moment they mount (otherwise they would stay invisible until the timed fallback).
// Content is never left hidden: the fallback reveals anything still pending, and reduced-motion / missing observers skip the effect.
export function useReveal() {
  const { pathname } = useLocation()
  useEffect(() => {
    const root = document.documentElement
    if (!('IntersectionObserver' in window) || !('MutationObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.remove('js')
      return
    }
    // Sections already on screen (e.g. from the pre-rendered HTML) stay visible instead of vanishing and fading back in.
    document.querySelectorAll('.sec').forEach((el) => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in') })
    root.classList.add('js')
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    }), { threshold: 0.08 })
    const watch = () => document.querySelectorAll('.sec:not(.in)').forEach((el) => io.observe(el))
    watch()
    const main = document.getElementById('main')
    const mo = new MutationObserver(watch)
    if (main) mo.observe(main, { childList: true, subtree: true })
    const safety = setTimeout(() => document.querySelectorAll('.sec:not(.in)').forEach((el) => el.classList.add('in')), 2500)
    return () => { clearTimeout(safety); mo.disconnect(); io.disconnect() }
  }, [pathname])
}
