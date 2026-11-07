import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import Btn from './Btn.jsx'

const FIELDS = { name: 'Your name', email: 'Email address' }
// Submissions go to Netlify Forms (no database or server code). Each `kind` is one form in the Netlify dashboard;
// public/__forms.html holds a hidden copy of every form so Netlify registers them at deploy time.
const encode = (data) => new URLSearchParams(data).toString()
const Req = () => <span className="req" aria-hidden="true"> *</span>

export default function Form({ kind, categories, messageLabel = 'Message', askName = true, askMessage = true, event, button = 'Send', done = 'Thank you. We have received your message.' }) {
  const [state, setState] = useState({ status: 'idle', errors: {} })
  async function submit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    if (f.get('website')) return setState({ status: 'sent', errors: {} }) // honeypot: bots fill this hidden field
    const v = Object.fromEntries(f)
    const errors = {}
    if (askName && !v.name?.trim()) errors.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(v.email || '')) errors.email = 'Please enter a valid email address.'
    if (askMessage && !v.message?.trim()) errors.message = 'Please write a short message.'
    if (!v.consent) errors.consent = 'Please agree so we can contact you.'
    if (Object.keys(errors).length) {
      setState({ status: 'invalid', errors })
      requestAnimationFrame(() => form.querySelector('[aria-invalid="true"]')?.focus())
      return
    }
    setState({ status: 'sending', errors: {} })
    let error = null
    try {
      const res = await fetch('/__forms.html', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: encode(f) })
      if (!res.ok) error = true
    } catch { error = true }
    setState({ status: error ? 'error' : 'sent', errors: {} })
    if (!error) form.reset()
  }
  const { status, errors } = state
  const err = (k) => errors[k] && <span className="err" id={`${kind}-${k}-e`}><AlertCircle size={16} aria-hidden="true" focusable="false" />{errors[k]}</span>
  const a = (k, required) => ({ id: `${kind}-${k}`, name: k, 'aria-invalid': !!errors[k], 'aria-required': required || undefined, 'aria-describedby': errors[k] ? `${kind}-${k}-e` : undefined })
  return (
    <form className="form" name={kind} method="POST" onSubmit={submit} noValidate aria-busy={status === 'sending'}>
      <input type="hidden" name="form-name" value={kind} />
      <input type="hidden" name="form_kind" value={kind} />
      {event && <input type="hidden" name="event" value={event} />}
      <p className="form-note">Fields marked <span aria-hidden="true">*</span><span className="sr-only">with an asterisk</span> are required.</p>
      {askName && <label><span>{FIELDS.name}<Req /></span><input {...a('name', true)} autoComplete="name" />{err('name')}</label>}
      <label><span>{FIELDS.email}<Req /></span><input {...a('email', true)} type="email" inputMode="email" autoComplete="email" />{err('email')}</label>
      {categories && <label><span>Topic</span><select {...a('category')}>{categories.map((c) => <option key={c}>{c}</option>)}</select></label>}
      {askMessage && <label><span>{messageLabel}<Req /></span><textarea {...a('message', true)} rows="5" maxLength="3000" />{err('message')}</label>}
      <input className="hp" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" />
      <label className="check"><input {...a('consent', true)} type="checkbox" value="yes" />
        <span>I agree HomeAFar may use these details to reply to me. See the <Link to="/privacy">privacy notice</Link>.<Req /></span></label>{err('consent')}
      <Btn type="submit" disabled={status === 'sending'} arrow={status !== 'sending'} aria-busy={status === 'sending'}>
        {status === 'sending' ? <><span className="spinner" aria-hidden="true" />Sending…</> : button}</Btn>
      <p className={`status ${status}`} role="status" aria-live="polite">
        {status === 'sent' && <><CheckCircle2 size={18} aria-hidden="true" focusable="false" />{done}</>}
        {status === 'invalid' && <><AlertCircle size={18} aria-hidden="true" focusable="false" />Please fix the highlighted fields.</>}
        {status === 'error' && <><AlertCircle size={18} aria-hidden="true" focusable="false" />Sorry, we could not send this right now, so nothing was sent. Please email homeafar26@gmail.com.</>}
      </p>
    </form>
  )
}
