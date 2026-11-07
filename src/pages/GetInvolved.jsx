import { Users, HeartHandshake, Handshake, Mail } from 'lucide-react'
import { Hero, Notice, Form, Faq, Overlap, Photo, PhotoBand } from '../components'
import { FAQ } from '../data/content.js'
import { usePage } from '../hooks/usePage.js'

const WaysTile = ({ id, icon: Icon, img, title, blurb, children }) => (
  <div className="tile formtile" id={id}>
    <Photo name={img} sizes="(min-width:1100px) 380px, 92vw" className="tile-img" />
    <h3><Icon size={22} strokeWidth={1.8} aria-hidden="true" focusable="false" />{title}</h3><p>{blurb}</p>{children}</div>)

export default function GetInvolved() {
  usePage('/get-involved')
  return (<><Hero title="Get Involved" lead="Choose the way that suits you." img="joy" pos="center 55%" />
    <section className="wrap sec">
      <div className="measure"><Notice>Every form on this page goes straight to the HomeAFar team. We use your details only to reply to you, as described in our privacy notice, and you can ask us to delete them at any time.</Notice></div>
      <div className="split intro-split"><div><span className="eyebrow">Join in</span><h2>There is a place for you here</h2>
        <p>Whether you have an hour, a skill, an organisation or simply curiosity, there is a way to take part. Pick one below, or jump straight to it.</p>
        <nav className="chips jump" aria-label="Ways to get involved"><a href="#member"><Users size={16} aria-hidden="true" focusable="false" />Become a member</a><a href="#volunteer"><HeartHandshake size={16} aria-hidden="true" focusable="false" />Volunteer</a><a href="#partner"><Handshake size={16} aria-hidden="true" focusable="false" />Partner with us</a><a href="#subscribe"><Mail size={16} aria-hidden="true" focusable="false" />Subscribe</a></nav></div>
        <Overlap main="team" accent="chat" /></div>
      <div className="grid-forms">
        <WaysTile id="member" icon={Users} img="portrait" title="Become a member" blurb="Join the community and be part of what we build together."><Form kind="membership" askMessage={false} button="Express interest" done="Thank you. We will be in touch about membership." /></WaysTile>
        <WaysTile id="volunteer" icon={HeartHandshake} img="pp4" title="Volunteer" blurb="Lend your time and skills to events, content and community care."><Form kind="volunteer" messageLabel="How would you like to help?" button="Apply" done="Thank you. We will review your application." /></WaysTile>
        <WaysTile id="partner" icon={Handshake} img="hands" title="Partner with us" blurb="Organisations, businesses and creators: let us explore working together."><Form kind="partner" messageLabel="About your organisation and idea" button="Send inquiry" /></WaysTile></div></section>
    <PhotoBand name="puzzle" pos="center 50%" align="left"><p className="pb-quote">Every piece matters.</p><p>Members, volunteers and partners each fit something in that nobody else can.</p></PhotoBand>

    <section className="wrap sec green" id="subscribe"><div className="split"><div><span className="eyebrow">Stay in the loop</span><h2>Subscribe to updates</h2><p>Be first to hear about events, stories and opportunities. No spam, and you can ask us to remove your details at any time.</p></div>
      <div className="tile"><Form kind="newsletter" askName={false} askMessage={false} button="Subscribe" done="You are subscribed. Thank you." /></div></div></section>
    <Faq items={FAQ} />
  </>)
}
