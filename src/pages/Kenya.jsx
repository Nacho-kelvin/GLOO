import { Mountain, Waves, Landmark, Languages, UtensilsCrossed, Music, Trophy, Coffee, Users, MapPin, CalendarDays, Sparkles } from 'lucide-react'
import { Hero, Notice, Photo, Flag, Btn, PhotoBand, IconCards, Faq, Overlap } from '../components'
import { usePage } from '../hooks/usePage.js'

// First full Beyond the Borders profile. Facts are well-established public knowledge; keep additions to checkable facts.
const FACTS = [
  ['Capital', 'Nairobi'], ['Independence', '12 December 1963'], ['Official languages', 'Kiswahili and English'],
  ['Population', 'About 55 million'], ['Currency', 'Kenyan shilling (KES)'], ['Motto', 'Harambee: let us all pull together'],
]
const PLACES = [
  [Mountain, 'Mount Kenya', 'Africa’s second-highest mountain, 5,199 m, which gave the country its name. A UNESCO World Heritage Site.'],
  [Sparkles, 'Maasai Mara', 'Rolling savannah in the south-west, famous for the great wildebeest migration from July to October.'],
  [Waves, 'The Swahili coast', 'White sand at Diani and Watamu, and Lamu Old Town, the oldest living Swahili settlement in East Africa.'],
  [Landmark, 'Nairobi', 'A capital with a national park on its edge, where giraffes graze in sight of the city skyline.'],
]
const CULTURE = [
  [UtensilsCrossed, 'Food', 'Ugali with sukuma wiki, nyama choma shared with friends, pilau and chapati on the coast, and a cup of chai at any hour.'],
  [Music, 'Music', 'From benga’s bright guitars to today’s gengetone, Kenya’s music moves the whole region.'],
  [Trophy, 'Running', 'Kenyan athletes have shaped distance running, from Olympic tracks to the world’s great marathons.'],
  [Coffee, 'Tea and coffee', 'Highland tea and coffee grown on the slopes of Mount Kenya are known around the world.'],
  [Users, 'Over 40 communities', 'Kikuyu, Luhya, Kalenjin, Luo, Kamba, Maasai, Swahili and many more, each with its own language and traditions.'],
  [Languages, 'Sheng', 'A lively Nairobi street mix of Kiswahili, English and local languages that keeps inventing new words.'],
]
const WORDS = [['Jambo / Habari', 'Hello / How are you?'], ['Asante sana', 'Thank you very much'], ['Karibu', 'Welcome'], ['Hakuna matata', 'No worries'], ['Pole pole', 'Slowly, take it easy'], ['Rafiki', 'Friend']]
const FAQ_K = [
  ['Why did the series start with Kenya?', 'HomeAFar’s founder, Murugi Njiru, is Kenyan, and Kenya was one of the five countries at Passport Picnic. It felt right to begin at home.'],
  ['When is the best time to visit?', 'The dry seasons, roughly January to February and June to October, are popular for safaris. The migration in the Maasai Mara peaks from July to October.'],
  ['Do I need a visa?', 'Most visitors apply online for an Electronic Travel Authorisation before travelling. Rules change, so always check the official government sources first.'],
]

export default function Kenya() {
  usePage('/beyond-the-borders/kenya')
  return (<>
    <Hero title="Kenya" lead="From the snows of Mount Kenya to the Indian Ocean: the first country in our Beyond the Borders series." img="sunsetTree" pos="center 60%"><span className="hero-status"><Flag country="Kenya" /> Country profile</span></Hero>

    <section className="wrap sec"><div className="measure"><Notice>A cultural introduction checked against credible sources, not a travel guide. Always confirm visa and entry rules with the official authorities before you travel.</Notice></div>
      <div className="split top"><div><span className="eyebrow">Karibu Kenya</span><h2>A country that pulls together</h2>
      <p>Kenya sits on the equator in East Africa, between Lake Victoria and the Indian Ocean. In a single country you can climb glaciers, cross the Great Rift Valley, watch the great migration and swim off a coral coast.</p>
      <p>Its national motto, <em>Harambee</em>, means "let us all pull together". It is also the spirit HomeAFar was founded on, by a Kenyan woman who carried it to Bucharest.</p></div>
      <dl className="facts">{FACTS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl></div></section>

    <section className="wrap sec alt"><span className="eyebrow">Places</span><h2>Four Kenyas in one country</h2><IconCards items={PLACES} cols={4} /></section>

    <PhotoBand name="joy" pos="center 55%" align="left"><p className="pb-quote">Harambee. Let us all pull together.</p><p>Kenya&rsquo;s national motto, and the heart of every HomeAFar gathering.</p></PhotoBand>

    <section className="wrap sec"><span className="eyebrow">Culture</span><h2>Food, music and everyday life</h2><IconCards items={CULTURE} /></section>

    <section className="wrap sec dark"><div className="split"><div><span className="eyebrow">Speak a little Kiswahili</span><h2>Six words to start with</h2>
      <ul className="words">{WORDS.map(([w, m]) => <li key={w}><b>{w}</b><span>{m}</span></li>)}</ul></div>
      <Overlap main="portrait" accent="passports" /></div></section>

    <section className="wrap sec"><span className="eyebrow">Kenya and HomeAFar</span><h2>Where our story begins</h2>
      <ol className="journey">
        <li><span className="when"><MapPin size={16} aria-hidden="true" />Kenya</span><h3>Home</h3><p>Murugi Njiru grows up in Kenya, where neighbours share the load and every table has room for one more.</p></li>
        <li><span className="when"><CalendarDays size={16} aria-hidden="true" />November 2024</span><h3>A new city</h3><p>She moves to Romania and begins to imagine a community for Africans abroad.</p></li>
        <li><span className="when"><Users size={16} aria-hidden="true" />30 August 2026</span><h3>Passport Picnic</h3><p>Kenya joins four other countries around one potluck table in Bucharest.</p></li>
      </ol></section>

    <Faq items={FAQ_K} title="Kenya, briefly" band="alt" />

    <section className="wrap sec cta green"><h2>Know Kenya from the inside?</h2><p>Tell us your Kenya: a place, a dish, a memory. The best profiles are written with the people who call a country home.</p>
      <div className="btn-row center"><Btn to="/stories-from-afar">Share your story</Btn><Btn to="/beyond-the-borders" ghost light>All countries</Btn></div></section>
  </>)
}
