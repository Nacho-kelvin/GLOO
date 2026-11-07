import { usePage } from '../hooks/usePage.js'

export default function Privacy() {
  usePage('/privacy')
  return (<section className="wrap sec measure"><h1>Privacy notice</h1>
    <p>This notice is a starter template. Before launch, replace it with a policy that accurately describes the client’s website, hosting provider, form processor, analytics and applicable legal requirements.</p>
    <p>This static website has no database or admin dashboard. If forms are enabled through the hosting provider, submissions are processed by that provider according to its terms and the client’s configuration.</p>
    <p>Please do not submit sensitive personal information through website forms unless the client has confirmed an appropriate secure process.</p></section>)
}
