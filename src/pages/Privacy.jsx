import { usePage } from '../hooks/usePage.js'

export default function Privacy() {
  usePage('/privacy')
  return (<section className="wrap sec measure"><h1>Privacy notice</h1>
    <p>We collect only what you type into our forms: your name, email address, message and your choice of topic. We use it only to reply to you, handle your application or registration, or send updates you asked for.</p>
    <p>Submissions are received through our website host, Netlify, and are visible only to the HomeAFar team. You can ask us to export or delete your details at any time by emailing <a href="mailto:homeafar26@gmail.com">homeafar26@gmail.com</a>.</p>
    <p>Please do not send sensitive medical information through our forms.</p></section>)
}
