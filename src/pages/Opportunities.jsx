import { useState } from 'react'
import { GraduationCap, Briefcase, Building2, HandHeart, Wrench, Store, Palette, Link2, CalendarClock, ShieldCheck, ExternalLink, Bell, FileText, Languages, Users } from 'lucide-react'
import { Hero, Notice, Btn, PhotoBand, Overlap, IconCards, Faq } from '../components'
import { FAQ } from '../data/content.js'
import { usePage } from '../hooks/usePage.js'
import { useListings } from '../hooks/useListings.js'

const fmt = (d) => new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

// The seven kinds of listing this page already names. The descriptions explain the category only; no listing is implied.
const TYPES = [
  [GraduationCap, 'Scholarships', 'Funding for study and education.'],
  [Briefcase, 'Jobs', 'Paid roles, with the employer named in the source.'],
  [Building2, 'Internships', 'Work experience to start or change a career.'],
  [HandHeart, 'Volunteering', 'Ways to give time and gain experience.'],
  [Wrench, 'Training', 'Courses and programmes that build skills.'],
  [Store, 'Business', 'Openings for founders and small businesses.'],
  [Palette, 'Creative collaborations', 'Projects for artists, writers and makers.'],
  [Bell, 'Hear first', 'Subscribe and we will tell you when new listings are added.'],
]
// Trusted official portals (all checked to load). Not HomeAFar listings: each is a public or EU body.
const PORTALS = [
  ['Jobs', 'EURES: the European Job Mobility Portal', 'https://eures.europa.eu/index_en', 'Thousands of vacancies across the EU, plus advice on living and working in another member state.'],
  ['Jobs', 'ANOFM: Romania\u2019s National Employment Agency', 'https://www.anofm.ro/', 'Job vacancies, job fairs and free training through Romania\u2019s public employment service.'],
  ['Scholarships', 'Study in Romania', 'https://studyinromania.gov.ro/', 'The official portal for international students: universities, programmes and admission.'],
  ['Scholarships', 'Erasmus+', 'https://erasmus-plus.ec.europa.eu/', 'The EU programme for study, training, youth exchanges and staff mobility.'],
  ['Volunteering', 'European Solidarity Corps', 'https://youth.europa.eu/solidarity_en', 'Volunteering and solidarity projects for young people aged 18 to 30.'],
  ['Training', 'Europass', 'https://europass.europa.eu/en', 'Build a free European CV, store your certificates and browse learning opportunities.'],
]
const TOOLKIT = [
  [FileText, 'A Europass CV', 'Recruiters across Europe recognise the format, and it is free to create.'],
  [Languages, 'A little Romanian', 'Even basic Romanian stands out on an application and opens doors at interviews.'],
  [Users, 'People you have met', 'Many openings are shared by word of mouth. Come to a gathering and ask around.'],
  [ShieldCheck, 'A healthy suspicion', 'Never pay to apply for a job or a scholarship. Genuine ones do not ask for fees.'],
]
const CHECKS = [
  [Link2, 'A source you can open', 'Each listing needs a source link you can open yourself.'],
  [CalendarClock, 'A closing date', 'A closing date is shown wherever there is one.'],
  [ShieldCheck, 'Checked before publishing', 'It stays a draft until we have checked it.'],
]

export default function Opportunities() {
  usePage('/opportunities')
  const today = new Date().toISOString().slice(0, 10)
  const { opportunities } = useListings()
  const rows = opportunities.filter((o) => !o.expires_on || o.expires_on >= today)
  const [cat, setCat] = useState('All')
  const cats = ['All', ...new Set(rows.map((r) => r.category).filter(Boolean))]
  const shown = cat === 'All' ? rows : rows.filter((r) => r.category === cat)
  return (<><Hero title="Opportunities" lead="Scholarships, jobs, internships, volunteering, training, business and creative collaborations." img="dream" pos="center 22%" />
    <section className="wrap sec"><Notice>These are official public sources, not HomeAFar services. Every HomeAFar listing shows its source and a closing date where relevant.</Notice>
      {rows.length === 0 && <><span className="eyebrow">Start here</span><h2>Trusted places to look</h2>
        <p className="measure">Official portals we trust, sorted by what you are looking for. HomeAFar\u2019s own checked listings will appear alongside them.</p>
        <div className="grid3">{PORTALS.map(([c, t, url, d]) => <a className="tile portal" key={url} href={url} target="_blank" rel="noreferrer" aria-label={`${t} (opens in a new tab)`}><span className="badge">{c}</span><h3>{t}</h3><p>{d}</p><span className="ext">Visit website<ExternalLink size={16} aria-hidden="true" focusable="false" /></span></a>)}</div></>}
      {rows.length > 0 && <div className="tabs" role="group" aria-label="Filter by category">{cats.map((c) => <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}</div>}
      <div className="grid2 flush">{shown.map((o) => <article className="tile" key={o.id}><h3>{o.title}</h3><p className="muted">{o.category}{o.expires_on && ` · Closes ${fmt(o.expires_on)}`}</p><p>{o.description}</p>
        <a className="ext" href={o.source_url} target="_blank" rel="noreferrer">View source<ExternalLink size={16} aria-hidden="true" focusable="false" /></a></article>)}</div></section>

    <section className="wrap sec alt"><span className="eyebrow">What you will find here</span><h2>Kinds of opportunity</h2>
      <IconCards items={TYPES} cols={4} /></section>

    <section className="wrap sec"><div className="split"><div><span className="eyebrow">Your toolkit</span><h2>Four things that open doors</h2>
      <ul className="icon-list">{TOOLKIT.map(([I, t, d]) => <li key={t}><span className="ico"><I size={22} strokeWidth={1.8} aria-hidden="true" focusable="false" /></span><div><h3>{t}</h3><p>{d}</p></div></li>)}</ul></div>
      <Overlap main="table" accent="cafe" /></div></section>

    <section className="wrap sec alt"><span className="eyebrow">Our standard</span><h2>How we check listings</h2>
      <p className="measure">Opportunities shared online are not always what they seem. Every listing on this page meets three rules.</p>
      <IconCards items={CHECKS} /></section>

    <PhotoBand name="arrow" pos="70% 55%" align="left"><p className="pb-quote">Find your next step.</p><p>Scholarships, work, training and collaborations, each with a source you can check.</p><div className="btn-row"><Btn to="/get-involved#subscribe">Subscribe for updates</Btn></div></PhotoBand>

    <section className="wrap sec"><div className="split"><Overlap main="team" accent="chat" flip /><div><span className="eyebrow">Beyond listings</span><h2>Opportunity often starts with a conversation</h2><p>Many doors open through people you meet. HomeAFar gatherings are a place to start those conversations before any application is written.</p><div className="btn-row"><Btn to="/events">See our events</Btn></div></div></div></section>

    <Faq items={[FAQ[4], FAQ[2]]} title="About opportunities" /></>)
}
