import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Header, Footer, BackToTop } from './components'
import { useReveal } from './hooks/useReveal.js'
import Home from './pages/Home.jsx'
const About = lazy(() => import('./pages/About.jsx'))
const ContentPage = lazy(() => import('./pages/ContentPage.jsx'))
const Events = lazy(() => import('./pages/Events.jsx'))
const Stories = lazy(() => import('./pages/Stories.jsx'))
const Beyond = lazy(() => import('./pages/Beyond.jsx'))
const Kenya = lazy(() => import('./pages/Kenya.jsx'))
const Opportunities = lazy(() => import('./pages/Opportunities.jsx'))
const GetInvolved = lazy(() => import('./pages/GetInvolved.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Privacy = lazy(() => import('./pages/Privacy.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))
// Page chunks are tiny; fetching them while the browser is idle makes the first click to any page instant.
const PREFETCH = [() => import('./pages/About.jsx'), () => import('./pages/ContentPage.jsx'), () => import('./pages/Events.jsx'), () => import('./pages/Stories.jsx'), () => import('./pages/Beyond.jsx'), () => import('./pages/Kenya.jsx'), () => import('./pages/Opportunities.jsx'), () => import('./pages/GetInvolved.jsx'), () => import('./pages/Contact.jsx'), () => import('./pages/Privacy.jsx')]

const CONTENT_SLUGS = ['safe-landing', 'tourism-to-africa', 'protection-and-justice', 'womens-health']

export default function App() {
  useReveal()
  const { pathname } = useLocation()
  useEffect(() => {
    const run = () => PREFETCH.forEach((load) => load().catch(() => {}))
    const id = 'requestIdleCallback' in window ? requestIdleCallback(run, { timeout: 4000 }) : setTimeout(run, 2500)
    return () => ('cancelIdleCallback' in window ? cancelIdleCallback(id) : clearTimeout(id))
  }, [])
  return (<>
    <Header />
    <main id="main">
      <Suspense fallback={<div className="route-loading" aria-busy="true" />}>
      <div className="page" key={pathname}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {CONTENT_SLUGS.map((s) => <Route key={s} path={`/${s}`} element={<ContentPage slug={s} />} />)}
        <Route path="/events" element={<Events />} />
        <Route path="/stories-from-afar" element={<Stories />} />
        <Route path="/beyond-the-borders" element={<Beyond />} />
        <Route path="/beyond-the-borders/kenya" element={<Kenya />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/get-involved" element={<GetInvolved />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
      </Suspense>
    </main>
    <Footer />
    <BackToTop />
  </>)
}
