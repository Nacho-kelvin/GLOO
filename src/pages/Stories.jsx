import { House, Languages, CloudRain, Fingerprint, Sprout, Send, PhoneCall, BadgeCheck, PenLine, ShieldCheck, Captions, Heart } from 'lucide-react'
import { Hero, Notice, Form, Faq, PhotoBand, IconCards, Ico } from '../components'
import { FAQ } from '../data/content.js'
import { usePage } from '../hooks/usePage.js'

// The five themes this page already names; the short lines only explain each word, they do not describe any published story.
const THEMES = [
  [House, 'Belonging', 'Finding people and places that start to feel like home.'],
  [Languages, 'Cultural adjustment', 'Learning new systems, languages and ways of doing things.'],
  [CloudRain, 'Loneliness', 'The quieter side of moving far from family and friends.'],
  [Fingerprint, 'Identity', 'What it means to be African, and yourself, somewhere new.'],
  [Sprout, 'Personal growth', 'What changed, what you learned and who you are becoming.'],
]
// The order matters here, so it is shown as a sequence. Each step restates what this page already promises.
const STEPS = [
  [Send, 'Step 1', 'Send a short summary', 'Tell us a little about your story. Please keep private details out for now.'],
  [PhoneCall, 'Step 2', 'We contact you', 'We will get in touch to talk about it with you.'],
  [BadgeCheck, 'Step 3', 'You decide', 'Stories are published only with the storyteller’s consent.'],
]
const PROMISES = [
  [ShieldCheck, 'Consent first', 'Nothing is published without the storyteller’s approval.'],
  [Captions, 'Accessible formats', 'English and French versions, captions and transcripts will be offered where available.'],
  [PenLine, 'A short summary is enough', 'A few sentences are all we need to begin. Keep private details out until we talk.'],
  [Heart, 'Every experience counts', 'Newly arrived or settled for years, your story belongs here.'],
]

export default function Stories() {
  usePage('/stories-from-afar')
  return (<><Hero title="Stories From Afar" lead="Belonging, cultural adjustment, loneliness, identity and personal growth." img="passports" pos="center 40%" />
    <section className="wrap sec"><div className="split top"><div><Notice>Stories are published only with the storyteller's consent. English and French versions, captions and transcripts will be offered where available.</Notice>
      <span className="eyebrow">Share yours</span><h2>Your experience matters here</h2><p>The first chapters of Stories From Afar are being written with the people who lived them. Yours could be one of them: tell us a little about it and we will contact you.</p>
      <p>Stories From Afar gives Africans living abroad a place to share belonging, adjustment and growth, in their own words.</p></div>
      <div className="tile"><Form kind="contact" categories={['Share my story']} messageLabel="A short summary (no private details yet)" button="Share interest" /></div></div></section>

    <section className="wrap sec alt"><span className="eyebrow">What we are looking for</span><h2>Five themes</h2>
      <IconCards items={THEMES} /></section>

    <PhotoBand name="story" pos="center 45%" align="left"><p className="pb-quote">Everyone has a story.</p></PhotoBand>

    <section className="wrap sec"><span className="eyebrow">How it works</span><h2>You stay in control of your story</h2>
      <ol className="journey">{STEPS.map(([I, when, t, d]) => <li key={when}><span className="when"><I size={16} strokeWidth={2} aria-hidden="true" focusable="false" />{when}</span><h3>{t}</h3><p>{d}</p></li>)}</ol></section>

    <section className="wrap sec alt"><span className="eyebrow">Our promise</span><h2>Told with care</h2>
      <ul className="icon-list two">{PROMISES.map(([I, t, d]) => <li key={t}><Ico icon={I} /><div><h3>{t}</h3><p>{d}</p></div></li>)}</ul></section>

    <Faq items={[FAQ[3], FAQ[5]]} title="Before you share" />
  </>)
}
