import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { PH, imgSrc, imgSrcSet } from '../data/images.js'

// Full-screen photo viewer. items: [{ name, caption }]; index: open photo (null = closed).
// Rendered into <body> (a portal) so it sits above the sticky header and the page's animated stacking context.
// Keyboard: Esc closes, Left/Right change photo, Tab stays inside. Touch: swipe left/right. Focus returns to the opener on close.
export default function Lightbox({ items, index, onChange, onClose }) {
  const box = useRef(null), closeBtn = useRef(null), opener = useRef(null), drag = useRef(null)
  const open = index !== null && index !== undefined
  const n = items.length
  const go = (k) => onChange(((k % n) + n) % n)

  useEffect(() => {
    if (!open) return
    opener.current = document.activeElement
    const html = document.documentElement, prev = html.style.overflow
    html.style.overflow = 'hidden'
    closeBtn.current?.focus()
    return () => { html.style.overflow = prev; opener.current?.focus?.() }
  }, [open])

  if (!open) return null
  const { name, caption } = items[index]
  const p = PH[name]

  const onKey = (e) => {
    if (e.key === 'Escape') { e.preventDefault(); onClose() }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1) }
    else if (e.key === 'Tab') {
      const f = [...box.current.querySelectorAll('button')]
      const first = f[0], last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }
  const down = (e) => { drag.current = { x: e.clientX, y: e.clientY } }
  const up = (e) => {
    const d = drag.current; drag.current = null
    if (!d) return
    const dx = e.clientX - d.x, dy = e.clientY - d.y
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1))
  }

  return createPortal(
    <div className="lb" role="dialog" aria-modal="true" aria-label={`Photo ${index + 1} of ${n}`} ref={box} onKeyDown={onKey}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <button type="button" className="lb-btn lb-close" ref={closeBtn} onClick={onClose} aria-label="Close photo viewer"><X size={24} aria-hidden="true" focusable="false" /></button>
      <figure className="lb-fig" onPointerDown={down} onPointerUp={up} onPointerCancel={() => { drag.current = null }}>
        <img key={name} src={imgSrc(p, p.w[p.w.length - 1])} srcSet={imgSrcSet(p)} sizes="(min-width:1000px) 80vw, 100vw" alt={p.alt} draggable="false" />
        <figcaption><span className="lb-count">{String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>{caption}</figcaption>
      </figure>
      {n > 1 && <>
        <button type="button" className="lb-btn lb-prev" onClick={() => go(index - 1)} aria-label="Previous photo"><ChevronLeft size={26} aria-hidden="true" focusable="false" /></button>
        <button type="button" className="lb-btn lb-next" onClick={() => go(index + 1)} aria-label="Next photo"><ChevronRight size={26} aria-hidden="true" focusable="false" /></button>
      </>}
    </div>,
    document.body
  )
}
