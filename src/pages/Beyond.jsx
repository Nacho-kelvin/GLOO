import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, MessagesSquare, Compass, Plane, Globe } from 'lucide-react'
import { Hero, Notice, Photo, Flag, Btn, PhotoBand, Collage } from '../components'
import { COUNTRIES, TOPICS, PICNIC_COUNTRIES } from '../data/content.js'
import { usePage } from '../hooks/usePage.js'

// Each card restates something HomeAFar already does or has announced; no itineraries, chapters or partnerships are implied.
const WAYS = [
  [MapPin, 'Meeting in person', 'At Passport Picnic, people connected to five African countries shared one park, one potluck table and a day of games.'],
  [MessagesSquare, 'Telling stories', 'Stories From Afar gives Africans living abroad a place to share belonging, adjustment and growth, with their consent.'],
  [Compass, 'Learning country by country', 'Each profile celebrates a country\u2019s culture, history, languages, food, music and fashion, starting with Kenya.'],
  [Plane, 'Looking toward Africa', 'Tourism to Africa will point visitors to reputable operators and local businesses, and to richer ways of seeing the continent.'],
]

export default function Beyond() {
  usePage('/beyond-the-borders')
  return (<><Hero title="Beyond the Borders" lead="Africa's diversity, country by country: culture, history, languages, food, music, fashion, tourism, economy and contemporary life." img="kigali" pos="35% 24%" />
    <section className="wrap sec"><div className="split top"><div><Notice>Our first full profile, Kenya, is live. Each new country is added once its facts are checked against credible sources.</Notice>
      <h2>What every profile will cover</h2><div className="chips">{TOPICS.map((c) => <span key={c}><Globe size={16} aria-hidden="true" focusable="false" />{c}</span>)}</div></div>
      <Photo name="passport" sizes="(min-width:800px) 50vw, 92vw" className="rounded" /></div></section>

    <section className="wrap sec alt"><span className="eyebrow">Why it matters</span><h2>Connecting people across borders</h2>
      <p className="measure">Africa is not one story. HomeAFar brings together people from many countries, languages and traditions, and the connection begins with curiosity: wanting to know where someone is from, and what home means to them.</p>
      <div className="grid4">{WAYS.map(([Icon, t, d]) => <div className="tile" key={t}><span className="ico"><Icon size={22} strokeWidth={1.8} aria-hidden="true" focusable="false" /></span><h3>{t}</h3><p>{d}</p></div>)}</div></section>

    <section className="wrap sec"><div className="split"><Collage names={['passports', 'chat', 'activity', 'portrait']} label="Photographs from Passport Picnic" />
      <div><span className="eyebrow">Already connected</span><h2>One picnic, five countries</h2>
        <p>Our first event brought together participants connected to these countries. Belonging, mutual understanding and meaningful shared experiences are what we hope every HomeAFar gathering leaves behind.</p>
        <ul className="flag-row" aria-label="Countries connected to Passport Picnic participants">{PICNIC_COUNTRIES.map((c) => <li key={c}><Flag country={c} />{c}</li>)}</ul>
        <div className="btn-row"><Btn to="/events">See the event</Btn></div></div></div></section>

    <PhotoBand name="signpost" pos="center 50%" align="left"><p className="pb-quote">Where are you from? Where is home?</p><p>Every profile starts with a question like these, asked with curiosity.</p></PhotoBand>

    <section className="wrap sec alt"><span className="eyebrow">The series</span><h2>Eight countries, one journey</h2>
      <div className="grid4">{COUNTRIES.map(([n, d, to]) => to
        ? <Link className="tile country-live" key={n} to={to}><span className="country"><Flag country={n} /><MapPin size={16} aria-hidden="true" focusable="false" /></span><h3>{n}</h3><p>{d}</p><span className="ext">Read the profile<ArrowRight size={16} aria-hidden="true" focusable="false" /></span></Link>
        : <div className="tile" key={n}><span className="country"><Flag country={n} /><MapPin size={16} aria-hidden="true" focusable="false" /></span><h3>{n}</h3><p>{d}</p><span className="badge">Next in the series</span></div>)}</div></section>

    <section className="wrap sec cta green"><h2>Know a place from the inside?</h2><p>If a country matters to you, tell us your story or ask us a question. Human experience is what these profiles are for.</p>
      <div className="btn-row center"><Btn to="/stories-from-afar">Share your story</Btn><Btn to="/contact" ghost light>Get in touch</Btn></div></section></>)
}
