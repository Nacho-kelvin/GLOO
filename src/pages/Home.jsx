import { Link } from 'react-router-dom'
import { MessagesSquare, Compass, ArrowRight } from 'lucide-react'
import { Hero, Photo, Stats, Journey, Btn, Overlap, PhotoBand, Filmstrip, Flag, Form, Ico, Voices } from '../components'
import { SECTORS, SECTOR_IMG, IG, PICNIC_COUNTRIES, VALUES } from '../data/content.js'
import { VALUE_ICONS, SECTOR_ICONS, WAYS_IN } from '../data/icons.js'
import { usePage } from '../hooks/usePage.js'

const FEATURE = [
  ['Stories From Afar', '/stories-from-afar', 'story', MessagesSquare, 'The experiences of Africans living abroad, shared with consent.'],
  ['Beyond the Borders: Kenya', '/beyond-the-borders/kenya', 'kigali', Compass, 'Our first country profile: Mount Kenya, the Maasai Mara, ugali, benga and Harambee.'],
]
const SectorIcon = ({ to }) => { const I = SECTOR_ICONS[to]; return I ? <span className="mt-ico"><I size={22} strokeWidth={1.8} aria-hidden="true" focusable="false" /></span> : null }

export default function Home() {
  usePage('/')
  const [lead, ...rest] = SECTORS
  return (<>
    <Hero full eyebrow="A community for Africans across borders" title="Home is wherever we find Each Other." lead="HomeAFar is an African-founded community and impact initiative connecting Africans across borders, starting from African experiences in Romania and Eastern Europe." img="sunrise" pos="center 62%" mobilePos="52% 60%">
      <div className="btn-row"><Btn to="/get-involved">Get involved</Btn><Btn to="/about" ghost light>Our story</Btn></div>
    </Hero>
    <div id="content" />
    <Stats />

    <section className="wrap sec"><div className="split">
      <Overlap main="signpost" accent="team" />
      <div><span className="eyebrow">Who we are</span><h2>Home is not only a place on a map</h2>
        <p>HomeAFar was founded by Murugi Njiru, a Kenyan woman who moved to Romania in November 2024. She came to believe that home is also the belonging we create with others, and that belief is where this community began.</p>
        <p>We bring people together through gatherings, cultural exchange and storytelling, and we are building practical pathways to belonging and opportunity.</p>
        <div className="btn-row"><Btn to="/about">Read our story</Btn></div></div>
    </div></section>

    <section className="wrap sec full"><span className="eyebrow">What we do</span><h2>Four ways we are building belonging</h2>
      <div className="mosaic bleed">
        <Link to={lead[0]} className="mt mt-lead"><Photo name={SECTOR_IMG[lead[0]]} sizes="(min-width:800px) max(60vw, 1060px), 140vw" /><div className="mt-text"><SectorIcon to={lead[0]} /><h3>{lead[1]}</h3><p>{lead[2]}</p><span className="more">Learn more</span></div></Link>
        {rest.map(([to, t, d]) => <Link key={to} to={to} className="mt"><Photo name={SECTOR_IMG[to]} sizes="(min-width:900px) 40vw, 100vw" /><div className="mt-text"><SectorIcon to={to} /><h3>{t}</h3><p>{d}</p><span className="more">Learn more</span></div></Link>)}
      </div></section>

    <section className="wrap sec"><span className="eyebrow">What guides us</span><h2>Values we hold to</h2>
      <ul className="values">{VALUES.slice(0, 4).map(([t, d]) => <li key={t}><Ico icon={VALUE_ICONS[t]} /><h3>{t}</h3><p>{d}</p></li>)}</ul>
      <div className="btn-row"><Btn to="/about#values" ghost>All our values</Btn></div></section>

    <section className="wrap sec dark full"><div className="split">
      <div><span className="eyebrow">Our first event</span><h2>Passport Picnic</h2><p className="meta">30 August 2026 · Tineretului Park, Bucharest</p>
        <p>Our first community event: a cultural potluck with games, bringing together participants connected to five African countries. These are real moments from the day.</p></div>
      <div><ul className="flag-row" aria-label="Countries connected to Passport Picnic participants">{PICNIC_COUNTRIES.map((c) => <li key={c}><Flag country={c} />{c}</li>)}</ul>
        <div className="btn-row"><Btn to="/events">See the event</Btn></div></div></div>
      <Filmstrip names={['passports', 'chat', 'activity', 'portrait']} label="Photographs from Passport Picnic" />
    </section>

    <Voices band="" />

    <section className="wrap sec alt"><span className="eyebrow">Take part</span><h2>Find your way in</h2>
      <p className="measure">Whether you have an hour, a skill, an organisation or simply curiosity, there is a place for you in this community.</p>
      <div className="grid4">{WAYS_IN.map(([to, I, t, d]) => <Link className="tile way" key={to} to={to}><Ico icon={I} /><h3>{t}</h3><p>{d}</p><span className="ext">Start here<ArrowRight size={16} aria-hidden="true" focusable="false" /></span></Link>)}</div></section>

    <section className="wrap sec full"><span className="eyebrow">Keep exploring</span><h2>Stories and a continent</h2>
      <div className="duo bleed">{FEATURE.map(([t, to, img, I, d]) => <Link key={to} to={to} className="mt mt-wide"><Photo name={img} sizes="(min-width:900px) 50vw, 100vw" /><div className="mt-text"><span className="mt-ico"><I size={22} strokeWidth={1.8} aria-hidden="true" focusable="false" /></span><h3>{t}</h3><p>{d}</p><span className="more">Explore</span></div></Link>)}</div></section>

    <section className="wrap sec"><span className="eyebrow">Our journey</span><h2>From one move to a growing community</h2><Journey /></section>

    <PhotoBand name="strength" pos="center 40%" align="left">
      <h2>Be part of it</h2><p>Join as a member, volunteer, or partner with us, and follow along for what comes next.</p>
      <div className="btn-row"><Btn to="/get-involved">Get involved</Btn><Btn href={IG} ghost light>Follow on Instagram</Btn></div>
    </PhotoBand>

    <section className="wrap sec"><div className="split"><div><span className="eyebrow">Stay in the loop</span><h2>Hear about events and stories first</h2><p>No spam, and you can ask us to remove your details at any time.</p></div>
      <div className="tile"><Form kind="newsletter" askName={false} askMessage={false} button="Subscribe" done="You are subscribed. Thank you." /></div></div></section>
  </>)
}
