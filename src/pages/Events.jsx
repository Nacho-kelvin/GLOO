import { useState } from 'react'
import { CalendarDays, Clock, MapPin, UtensilsCrossed, Quote, Ticket } from 'lucide-react'
import { Hero, Notice, Form, Photo, Btn, Flag } from '../components'
import Lightbox from '../components/Lightbox.jsx'
import { PH, imgSrc, imgSrcSet } from '../data/images.js'
import { EMAIL, PICNIC_COUNTRIES } from '../data/content.js'
import { usePage } from '../hooks/usePage.js'
import { useListings } from '../hooks/useListings.js'

const fmt = (d) => new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
const parts = (d) => { const x = new Date(d + 'T00:00:00'); return [x.getDate(), x.toLocaleDateString('en-GB', { month: 'short' }), x.getFullYear()] }
const today = () => new Date().toISOString().slice(0, 10)

// Passport Picnic album: HomeAFar's own photographs only (no stock, no generated images). Captions describe only what each photo shows.
// Order = lightbox order. The first three form the editorial spread; the rest sit in the horizontal strip.
const ALBUM = [
  { name: 'group', caption: 'Smiles all round in Tineretului Park', pos: 'center 58%' },
  { name: 'passports', caption: 'Karibu nyumbani, bienvenue: welcome in more than one language', pos: 'center 42%' },
  { name: 'portrait', caption: 'Kenya’s colours, worn on the cheek', pos: '58% 66%' },
  { name: 'passport', caption: 'A Passport to Home: one world, many stories', pos: 'center 30%' },
  { name: 'chat', caption: 'Leaning in, laughing together on the grass', pos: 'center 56%' },
  { name: 'activity', caption: 'Hands in, gathered around an activity on the grass', pos: 'center 45%' },
]
const at = (name) => ALBUM.findIndex((a) => a.name === name)

// The afternoon in four chapters. Each photo genuinely shows its chapter; the shared table has no photograph yet, so none is shown.
const CHAPTERS = [
  { t: 'The Welcome', d: 'Chalkboard signs read Karibu Nyumbani and Bienvenue while guests held up their Passports to Home: a welcome in more than one language.', img: 'passports' },
  { t: 'The Shared Table', d: 'Potluck style: guests were invited to bring snacks, food or drinks to share, so one table could hold flavours from many countries.' },
  { t: 'The Games', d: 'Games and team challenges gave everyone an easy way into conversation.', img: 'activity' },
  { t: 'The Memories', d: 'Painted flags, group photographs and new friendships to carry home.', img: 'portrait' },
]

function AlbumItem({ item, i, open, sizes, className = '' }) {
  return (
    <figure className={`album-item ${className}`.trim()}>
      <button type="button" className="album-btn" onClick={() => open(i)} aria-label={`View larger: ${item.caption}`}>
        <Photo name={item.name} sizes={sizes} style={{ objectPosition: item.pos }} />
      </button>
      <figcaption>{item.caption}</figcaption>
    </figure>
  )
}

function EventCard({ e, reg, setReg }) {
  const [d, m, y] = parts(e.starts_on)
  return (
    <article className="ev-card">
      <div className="ev-card-cover">
        {e.image_url
          ? <img src={e.image_url} alt="" loading="lazy" decoding="async" />
          : <div className="ev-date" aria-hidden="true"><b>{d}</b><span>{m}</span><small>{y}</small></div>}
      </div>
      <div className="ev-card-body">
        <h3>{e.title}</h3>
        <p className="meta"><CalendarDays size={16} aria-hidden="true" focusable="false" />{fmt(e.starts_on)}{e.location && <><MapPin size={16} aria-hidden="true" focusable="false" />{e.location}</>}</p>
        {e.description && <p>{e.description}</p>}
        <div className="btn-row">
          {e.ticket_url && <Btn href={e.ticket_url}>Tickets</Btn>}
          {e.registration_open
            ? <Btn ghost type="button" aria-expanded={reg === e.id} onClick={() => setReg(reg === e.id ? null : e.id)}>Register</Btn>
            : !e.ticket_url && <Btn ghost href={`mailto:${EMAIL}?subject=${encodeURIComponent(e.title)}`} arrow={false}>Ask about this event</Btn>}
        </div>
        {reg === e.id && <Form kind="event_registration" event={`${e.title} (${e.starts_on})`} askMessage={false} button="Register" done="You are registered. Thank you." />}
      </div>
    </article>
  )
}

export default function Events() {
  usePage('/events')
  const listings = useListings()
  const rows = [...listings.events].sort((a, b) => a.starts_on.localeCompare(b.starts_on))
  const [reg, setReg] = useState(null)
  const [lb, setLb] = useState(null)
  const upcoming = rows.filter((e) => e.starts_on >= today())
  const past = rows.filter((e) => e.starts_on < today()).reverse()
  const empty = listings.status !== 'loading' && upcoming.length === 0
  const poster = PH.poster

  return (<>
    <Hero className="hero-ev" crumb="Events" eyebrow="HomeAFar events" title="Where Cultures Meet, Friendships Begin." img="group" mobile="passport" pos="center 58%" mobilePos="center 24%"
      lead="Every gathering tells a story. Discover the people, cultures, flavours and moments that make HomeAFar feel like home.">
      <div className="btn-row"><Btn href="#passport-picnic">Passport Picnic</Btn><Btn href="#upcoming" ghost light>Upcoming events</Btn></div>
    </Hero>

    {/* Featured event */}
    <section className="wrap sec ev-feature" id="passport-picnic" aria-labelledby="ev-feature-title">
      <div className="measure ev-notice"><Notice>Dates, places and what to bring are announced with each event. Every photograph on this page is from our own Passport Picnic, shared to show the spirit of our gatherings.</Notice></div>
      <div className="ev-feature-grid">
        <div>
          <span className="eyebrow">Featured gathering &middot; Passport Picnic</span>
          <h2 id="ev-feature-title">Five Countries. One Table. A Thousand Reasons to Connect.</h2>
          <p className="ev-lead">Our first community gathering: a cultural potluck with games in the park, bringing together participants connected to five African countries.</p>
          <dl className="ev-facts">
            <div><dt><CalendarDays size={18} aria-hidden="true" focusable="false" />Date</dt><dd>30 August 2026</dd></div>
            <div><dt><Clock size={18} aria-hidden="true" focusable="false" />Time</dt><dd>2 to 6 pm</dd></div>
            <div><dt><MapPin size={18} aria-hidden="true" focusable="false" />Place</dt><dd>Tineretului Park, Bucharest</dd></div>
          </dl>
          <h3 className="ev-kicker">At the table</h3>
          <ul className="ev-countries" aria-label="Countries connected to our participants">
            {PICNIC_COUNTRIES.map((c) => <li key={c}><Flag country={c} /><span>{c}</span></li>)}
          </ul>
        </div>
        <figure className="ev-poster">
          <img src={imgSrc(poster, 800)} srcSet={imgSrcSet(poster)} sizes="(min-width:900px) 400px, 80vw" alt={poster.alt} width="800" height="1131" loading="lazy" decoding="async" />
          <figcaption>The invitation that started it all</figcaption>
        </figure>
      </div>
    </section>

    {/* Album */}
    <section className="wrap sec alt ev-album" aria-labelledby="ev-album-title">
      <div className="ev-head"><span className="eyebrow">The album</span><h2 id="ev-album-title">Moments from Tineretului Park</h2>
        <p>Real photographs from Passport Picnic. Select any photo to see it larger.</p></div>
      <div className="album-spread">
        <AlbumItem item={ALBUM[0]} i={0} open={setLb} className="album-main" sizes="(min-width:900px) 720px, 92vw" />
        <AlbumItem item={ALBUM[1]} i={1} open={setLb} sizes="(min-width:900px) 420px, 46vw" />
        <AlbumItem item={ALBUM[2]} i={2} open={setLb} sizes="(min-width:900px) 420px, 46vw" />
      </div>
      <div className="album-strip" role="group" aria-label="More photographs (scroll sideways)">
        {ALBUM.slice(3).map((a, k) => <AlbumItem key={a.name} item={a} i={k + 3} open={setLb} sizes="(min-width:900px) 380px, 72vw" />)}
      </div>
    </section>

    {/* Timeline */}
    <section className="wrap sec ev-story" aria-labelledby="ev-story-title">
      <div className="ev-head"><span className="eyebrow">How the afternoon unfolded</span><h2 id="ev-story-title">One picnic, four chapters</h2></div>
      <ol className="chapters">
        {CHAPTERS.map((c, k) => (
          <li className="chapter" key={c.t}>
            <span className="ch-num" aria-hidden="true">{String(k + 1).padStart(2, '0')}</span>
            <div className="ch-text"><h3>{c.t}</h3><p>{c.d}</p></div>
            {c.img
              ? <button type="button" className="ch-media album-btn" onClick={() => setLb(at(c.img))} aria-label={`View larger: ${ALBUM[at(c.img)].caption}`}>
                  <Photo name={c.img} sizes="(min-width:900px) 460px, 86vw" style={{ objectPosition: ALBUM[at(c.img)].pos }} />
                </button>
              : <div className="ch-media ch-empty"><UtensilsCrossed size={30} strokeWidth={1.6} aria-hidden="true" focusable="false" />
                  <p>We don&rsquo;t have a photograph of the table yet.<br />Took one? <a href={`mailto:${EMAIL}?subject=${encodeURIComponent('Passport Picnic photo')}`}>Send it to us</a>.</p></div>}
          </li>
        ))}
      </ol>
    </section>

    {/* Testimonials: only genuine, permitted words appear here. None have been collected yet, so the section invites them. */}
    <section className="wrap sec dark ev-voices" aria-labelledby="ev-voices-title">
      <Quote className="ev-voices-mark" size={56} strokeWidth={1.4} aria-hidden="true" focusable="false" />
      <span className="eyebrow">Voices from the picnic</span>
      <h2 id="ev-voices-title">Were you there? Tell us how it felt.</h2>
      <p>We are gathering reflections from Passport Picnic guests. Only real words, shared with the guest&rsquo;s permission, will ever appear on this page.</p>
      <div className="btn-row center"><Btn to="/contact">Share your experience</Btn></div>
    </section>

    {/* Upcoming events, managed in /admin */}
    <section className="wrap sec ev-upcoming" id="upcoming" aria-labelledby="ev-up-title">
      <div className="ev-head"><span className="eyebrow">What&rsquo;s next</span><h2 id="ev-up-title">Upcoming events</h2></div>
      {listings.status === 'loading' && <p className="ev-state ev-loading" role="status"><span className="spinner" aria-hidden="true" />Checking for upcoming events…</p>}
      {empty && <div className="ev-state ev-empty">
        <div><Ticket size={30} strokeWidth={1.6} aria-hidden="true" focusable="false" /><h3>No new date announced yet</h3>
          <p>The next gathering is being planned. Subscribe and you will hear the date, the place and what to bring as soon as they are confirmed.</p></div>
        <div className="tile"><Form kind="newsletter" askName={false} askMessage={false} button="Subscribe" done="You are subscribed. Thank you." /></div>
      </div>}
      {upcoming.length > 0 && <div className="ev-cards">{upcoming.map((e) => <EventCard key={e.id} e={e} reg={reg} setReg={setReg} />)}</div>}
      {past.length > 0 && <div className="ev-past"><h3>Earlier gatherings</h3><ul>{past.map((e) => <li key={e.id}><b>{e.title}</b><span>{fmt(e.starts_on)}{e.location && ` · ${e.location}`}</span></li>)}</ul></div>}
    </section>

    {/* Closing */}
    <section className="ev-close" aria-labelledby="ev-close-title">
      <img src={imgSrc(PH.passports, 1600)} srcSet={imgSrcSet(PH.passports)} sizes="100vw" alt="" loading="lazy" decoding="async" />
      <div className="wrap ev-close-inner">
        <h2 id="ev-close-title">The Next Memory Could Include You.</h2>
        <p>Whether you are new to a country or have lived abroad for years, there is always room at our table.</p>
        <div className="btn-row center"><Btn to="/get-involved#member">Join the community</Btn><Btn to="/get-involved#subscribe" ghost light>Get event updates</Btn></div>
      </div>
    </section>

    <Lightbox items={ALBUM} index={lb} onChange={setLb} onClose={() => setLb(null)} />
  </>)
}
