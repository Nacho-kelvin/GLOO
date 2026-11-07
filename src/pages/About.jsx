import { Users, Globe, MessagesSquare, CalendarDays, Sprout, Plane, UserRound, Target, Eye } from 'lucide-react'
import { Hero, Notice, Overlap, PhotoBand, Photo, Journey, Btn, Stats, Faq, IconCards, Ico } from '../components'
import { LEADERS, VALUES, FAQ } from '../data/content.js'
import { VALUE_ICONS } from '../data/icons.js'
import { usePage } from '../hooks/usePage.js'

// "What sets us apart" restates what this site already says about HomeAFar's work; nothing new is claimed.
const DIFFERENT = [
  [Users, 'Community first', 'We start with people and belonging, so a newcomer has somewhere to turn that feels like home.'],
  [Globe, 'Across borders and cultures', 'Africa\u2019s many cultures, histories and languages are celebrated side by side, wherever members live.'],
  [CalendarDays, 'Shared experiences', 'Gatherings like Passport Picnic turn strangers into acquaintances and acquaintances into friends.'],
  [MessagesSquare, 'Stories told with consent', 'Lived experience of Africans abroad is shared only with the storyteller\u2019s approval.'],
  [Plane, 'Travel and curiosity', 'Looking toward Africa as a place to visit and learn about, through culture, food, music and landscapes.'],
  [Sprout, 'Opportunity with integrity', 'Practical pathways are added step by step, and only after they have been checked.'],
]

export default function About() {
  usePage('/about')
  return (<>
    <Hero title="About HomeAFar" lead="Home is not only a place on a map. It can be the people who welcome us." img="joy" pos="center 55%" />

    <section className="wrap sec"><div className="measure"><Notice>HomeAFar is a young, African-founded community initiative. We describe only what exists today, and say clearly when something is still a plan.</Notice></div>
      <div className="split top"><div><span className="eyebrow">Our story</span><h2>Where HomeAFar began</h2>
      <p>HomeAFar was inspired by the journey of its founder, Murugi Njiru, a Kenyan woman who moved to Romania in November 2024. Starting over in another country can bring possibility, and it can also bring unfamiliar systems, cultural adjustment and loneliness. She came to believe that home is also the belonging we create with others.</p>
      <p>That belief is the heart of HomeAFar: travel, cultural exchange and human connection are not extras, they are how people find their footing in a new place and recognise themselves in one another.</p>
      <p>HomeAFar is a growing journey: from one picnic table to country profiles, a newcomer guide and a community that keeps widening.</p></div>
      <Overlap main="group" accent="portrait" flip /></div></section>

    <Stats />

    <PhotoBand name="sunsetTree" pos="center 60%" align="left">
      <div className="mv"><div><span className="eyebrow"><Target size={16} aria-hidden="true" focusable="false" />Mission</span><p>To strengthen African presence and connection in Eastern Europe through community, economic opportunities, events and cultural exchange, while building a platform for advocacy, practical support and meaningful social impact.</p></div><div><span className="eyebrow"><Eye size={16} aria-hidden="true" focusable="false" />Vision</span><p>To grow into a trusted, internationally connected African community organisation that helps people move from merely surviving abroad to thriving with dignity, connection, opportunity and access to support.</p></div></div>
    </PhotoBand>

    <section className="wrap sec"><span className="eyebrow">What sets us apart</span><h2>Connection that crosses borders</h2>
      <p className="measure">We are building a community where meaningful experiences, belonging and mutual understanding matter as much as any programme.</p>
      <IconCards items={DIFFERENT} /></section>

    <section className="wrap sec alt" id="values"><span className="eyebrow">What guides us</span><h2>Values</h2><div className="grid4">{VALUES.map(([t, d]) => <div className="tile" key={t}><Ico icon={VALUE_ICONS[t]} /><h3>{t}</h3><p>{d}</p></div>)}</div></section>

    <section className="wrap sec dark"><div className="split top"><div><span className="eyebrow">The people</span><h2>Leadership</h2>
      <div className="stack">{LEADERS.map(([n, r, d]) => <div className="tile leader" key={n}><Ico icon={UserRound} /><div><h3>{n}</h3><p className="role">{r}</p><p>{d}</p></div></div>)}</div></div>
      <figure className="fig team-fig"><Photo name="team" sizes="(min-width:800px) 50vw, 92vw" /><figcaption>The HomeAFar team and community, at home together.</figcaption></figure></div></section>

    <section className="wrap sec"><span className="eyebrow">Our journey</span><h2>How we got here</h2><Journey /></section>

    <Faq items={[FAQ[0], FAQ[1], FAQ[2], FAQ[3]]} title="About HomeAFar, briefly" band="alt" />

    <section className="wrap sec cta green"><h2>Help us build it</h2><p>Members, volunteers and partners shape what HomeAFar becomes. Come to a gathering, share a skill, or simply follow along: there is a place for you in this community.</p><div className="btn-row center"><Btn to="/get-involved">Get involved</Btn><Btn to="/contact" ghost light>Contact us</Btn></div></section>
  </>)
}
