import { Mail, Instagram, Facebook } from 'lucide-react'
import { Hero, Notice, Form, Faq, Overlap, PhotoBand } from '../components'
import { FAQ, IG, EMAIL } from '../data/content.js'
import { usePage } from '../hooks/usePage.js'

export default function Contact() {
  usePage('/contact')
  return (<><Hero title="Contact" lead="We would love to hear from you." img="team" pos="center 45%" />
    <section className="wrap sec"><div className="measure"><Notice>We read every message and reply as soon as we can. HomeAFar cannot offer emergency help: in an emergency in Romania, call 112.</Notice></div>
      <div className="split top"><div>
      <div className="contact-fig"><Overlap main="chat" accent="phone" /></div>
      <div className="contact-list">
        <a className="tile ccard" href={`mailto:${EMAIL}`}><span className="eyebrow"><Mail size={16} aria-hidden="true" focusable="false" />Email</span><strong>{EMAIL}</strong></a>
        <a className="tile ccard" href={IG} target="_blank" rel="noreferrer" aria-label="Instagram @home.a.far (opens in a new tab)"><span className="eyebrow"><Instagram size={16} aria-hidden="true" focusable="false" />Instagram</span><strong>@home.a.far</strong></a>
        <div className="tile ccard"><span className="eyebrow"><Facebook size={16} aria-hidden="true" focusable="false" />Facebook</span><strong>Home AFar</strong></div></div>
      <Notice>Please do not include medical details or detailed accounts of incidents in this form.</Notice></div>
      <div className="tile"><Form kind="contact" categories={['General question', 'Events', 'Safe Landing', 'Protection & Justice', 'Partnerships', 'Media']} /></div></div></section>
    <PhotoBand name="cafe" pos="center 50%" align="left"><p className="pb-quote">Come and say hello.</p><p>Write to us, follow along, or join the next gathering.</p></PhotoBand>

    <Faq items={[FAQ[1], FAQ[3], FAQ[5]]} title="Before you write" />
  </>)
}
