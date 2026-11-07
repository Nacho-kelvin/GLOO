import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Inbox, CalendarDays, Briefcase, LogOut, Plus, Pencil, Trash2, Mail, MailOpen, Download, ExternalLink, AlertCircle, CheckCircle2, ShieldAlert, ArrowLeft } from 'lucide-react'
import Wordmark from '../components/Wordmark.jsx'
import { usePage } from '../hooks/usePage.js'
import '../styles/admin.css'

// HomeAFar admin: sign in with Netlify Identity (invite only, "admin" role), then manage messages, events and opportunities.
// Data lives in Netlify Database and is read/written through netlify/functions/admin.mts.

const FORM_LABELS = { contact: 'Contact', membership: 'Membership', volunteer: 'Volunteer', partner: 'Partner', newsletter: 'Newsletter', event_registration: 'Event registration', other: 'Other' }
const CATEGORIES = ['Scholarships', 'Jobs', 'Internships', 'Volunteering', 'Training', 'Business', 'Creative collaborations']
const today = () => new Date().toISOString().slice(0, 10)
const fmtDate = (d) => (d ? new Date(d.length === 10 ? d + 'T00:00:00' : d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '')
const fmtTime = (d) => new Date(d).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
const snake = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k.replace(/[A-Z]/g, (c) => '_' + c.toLowerCase()), v]))

class ApiError extends Error { constructor(msg, status) { super(msg); this.status = status } }
async function api(path, { method = 'GET', body } = {}) {
  let r
  try {
    r = await fetch(`/api/admin/${path}`, { method, credentials: 'same-origin', headers: body ? { 'Content-Type': 'application/json' } : undefined, body: body ? JSON.stringify(body) : undefined })
  } catch { throw new ApiError('Could not reach the server. Check your connection and try again.', 0) }
  if (r.status === 204) return null
  const d = await r.json().catch(() => ({}))
  if (!r.ok) throw new ApiError(d.error || 'Something went wrong. Please try again.', r.status)
  return d
}

function Alert({ kind = 'error', children }) {
  if (!children) return null
  const I = kind === 'error' ? AlertCircle : CheckCircle2
  return <p className={`adm-alert ${kind}`} role={kind === 'error' ? 'alert' : 'status'}><I size={18} aria-hidden="true" />{children}</p>
}

// ---------- Sign-in screens ----------

function AuthCard({ title, children }) {
  return (
    <div className="adm-auth">
      <div className="adm-auth-card">
        <Link to="/" className="adm-auth-brand" aria-label="HomeAFar home"><Wordmark /></Link>
        <h1>{title}</h1>
        {children}
        <Link className="adm-back" to="/"><ArrowLeft size={16} aria-hidden="true" />Back to the website</Link>
      </div>
    </div>
  )
}

function SignIn({ id, onUser, note }) {
  const [mode, setMode] = useState('login')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState({ kind: note ? 'error' : 'ok', text: note || '' })
  async function submit(e) {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget))
    setBusy(true); setMsg({})
    try {
      if (mode === 'login') onUser(await id.login(f.email.trim(), f.password))
      else { await id.requestPasswordRecovery(f.email.trim()); setMsg({ kind: 'ok', text: 'If that address has an account, a reset link is on its way. Check your inbox.' }) }
    } catch (err) {
      setMsg({ kind: 'error', text: err?.status === 401 || err?.status === 400 ? 'Wrong email or password.' : err?.message || 'Could not sign in. Please try again.' })
    } finally { setBusy(false) }
  }
  return (
    <AuthCard title={mode === 'login' ? 'Admin sign in' : 'Reset your password'}>
      <form className="adm-form" onSubmit={submit}>
        <label><span>Email</span><input name="email" type="email" autoComplete="username" required /></label>
        {mode === 'login' && <label><span>Password</span><input name="password" type="password" autoComplete="current-password" required /></label>}
        <Alert kind={msg.kind}>{msg.text}</Alert>
        <button className="adm-btn primary" disabled={busy}>{busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Send reset link'}</button>
      </form>
      <button type="button" className="adm-link" onClick={() => { setMode(mode === 'login' ? 'reset' : 'login'); setMsg({}) }}>
        {mode === 'login' ? 'Forgot your password?' : 'Back to sign in'}</button>
      <p className="adm-small">Admin accounts are by invitation only.</p>
    </AuthCard>
  )
}

function SetPassword({ title, intro, onSave }) {
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  async function submit(e) {
    e.preventDefault()
    const { password, confirm } = Object.fromEntries(new FormData(e.currentTarget))
    if (password.length < 8) return setErr('Use at least 8 characters.')
    if (password !== confirm) return setErr('The two passwords do not match.')
    setBusy(true); setErr('')
    try { await onSave(password) } catch (x) { setErr(x?.message || 'Could not save the password. The link may have expired.'); setBusy(false) }
  }
  return (
    <AuthCard title={title}>
      <p className="adm-small">{intro}</p>
      <form className="adm-form" onSubmit={submit}>
        <label><span>New password</span><input name="password" type="password" autoComplete="new-password" minLength={8} required /></label>
        <label><span>Repeat password</span><input name="confirm" type="password" autoComplete="new-password" minLength={8} required /></label>
        <Alert>{err}</Alert>
        <button className="adm-btn primary" disabled={busy}>{busy ? 'Saving…' : 'Save password'}</button>
      </form>
    </AuthCard>
  )
}

// ---------- Messages ----------

function toCsv(rows) {
  const cols = ['createdAt', 'formName', 'name', 'email', 'category', 'event', 'message']
  const q = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  return [cols.join(','), ...rows.map((r) => cols.map((c) => q(c === 'formName' ? FORM_LABELS[r[c]] || r[c] : r[c])).join(','))].join('\n')
}

function Messages({ rows, setRows, onError }) {
  const [form, setForm] = useState('all')
  const [unread, setUnread] = useState(false)
  const shown = rows.filter((m) => (form === 'all' || m.formName === form) && (!unread || !m.read))
  const counts = rows.reduce((a, m) => ({ ...a, [m.formName]: (a[m.formName] || 0) + 1 }), {})

  async function setRead(m, read) {
    setRows((rs) => rs.map((r) => (r.id === m.id ? { ...r, read } : r)))
    try { await api(`messages/${m.id}`, { method: 'PATCH', body: { read } }) } catch (e) { onError(e); setRows((rs) => rs.map((r) => (r.id === m.id ? { ...r, read: !read } : r))) }
  }
  async function remove(m) {
    if (!window.confirm(`Delete the message from ${m.name || m.email || 'this sender'}? This cannot be undone.`)) return
    try { await api(`messages/${m.id}`, { method: 'DELETE' }); setRows((rs) => rs.filter((r) => r.id !== m.id)) } catch (e) { onError(e) }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([toCsv(shown)], { type: 'text/csv;charset=utf-8' }))
    Object.assign(document.createElement('a'), { href: url, download: `homeafar-messages-${today()}.csv` }).click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return (<>
    <div className="adm-toolbar">
      <label className="adm-inline"><span>Form</span>
        <select value={form} onChange={(e) => setForm(e.target.value)}>
          <option value="all">All forms ({rows.length})</option>
          {Object.entries(FORM_LABELS).filter(([k]) => counts[k]).map(([k, l]) => <option key={k} value={k}>{l} ({counts[k]})</option>)}
        </select></label>
      <label className="adm-check"><input type="checkbox" checked={unread} onChange={(e) => setUnread(e.target.checked)} />Unread only</label>
      <button type="button" className="adm-btn ghost" onClick={download} disabled={!shown.length}><Download size={16} aria-hidden="true" />Download CSV</button>
    </div>
    {shown.length === 0 && <div className="adm-empty"><Inbox size={28} aria-hidden="true" /><p>{rows.length ? 'No messages match this filter.' : 'No messages yet. New submissions from the website’s forms appear here once they pass the spam check.'}</p></div>}
    <ul className="adm-list">
      {shown.map((m) => (
        <li key={m.id} className={`adm-msg ${m.read ? '' : 'unread'}`}>
          <div className="adm-msg-head">
            <span className="adm-badge">{FORM_LABELS[m.formName] || m.formName}</span>
            {!m.read && <span className="adm-badge gold">New</span>}
            <time dateTime={m.createdAt}>{fmtTime(m.createdAt)}</time>
          </div>
          <h3>{m.name || m.email || 'No name given'}</h3>
          {m.email && <a className="adm-mail" href={`mailto:${m.email}?subject=${encodeURIComponent('Re: your message to HomeAFar')}`}>{m.email}</a>}
          {(m.category || m.event) && <p className="adm-meta">{m.category && <>Topic: {m.category}</>}{m.category && m.event && ' · '}{m.event && <>Event: {m.event}</>}</p>}
          {m.message && <p className="adm-body">{m.message}</p>}
          <div className="adm-actions">
            {m.email && <a className="adm-btn ghost sm" href={`mailto:${m.email}?subject=${encodeURIComponent('Re: your message to HomeAFar')}`} onClick={() => !m.read && setRead(m, true)}><Mail size={15} aria-hidden="true" />Reply</a>}
            <button type="button" className="adm-btn ghost sm" onClick={() => setRead(m, !m.read)}>{m.read ? <><Mail size={15} aria-hidden="true" />Mark unread</> : <><MailOpen size={15} aria-hidden="true" />Mark read</>}</button>
            <button type="button" className="adm-btn danger sm" onClick={() => remove(m)}><Trash2 size={15} aria-hidden="true" />Delete</button>
          </div>
        </li>
      ))}
    </ul>
  </>)
}

// ---------- Events and opportunities (shared editor) ----------

const EVENT_FIELDS = [
  { k: 'title', label: 'Event name', req: true },
  { k: 'starts_on', label: 'Date', type: 'date', req: true },
  { k: 'location', label: 'Place', hint: 'For example: Tineretului Park, Bucharest' },
  { k: 'description', label: 'Short description', type: 'textarea' },
  { k: 'ticket_url', label: 'Ticket link', type: 'url', hint: 'Optional. Shows a Tickets button.' },
  { k: 'image_url', label: 'Image link', hint: 'Optional. A web address (https://…) or a site image (/images/…). Without one, the card shows the date.' },
  { k: 'registration_open', label: 'Registration open (shows a Register form on the event)', type: 'checkbox' },
  { k: 'published', label: 'Show on the website', type: 'checkbox' },
]
const OPP_FIELDS = [
  { k: 'title', label: 'Title', req: true },
  { k: 'category', label: 'Category', type: 'select', options: CATEGORIES },
  { k: 'description', label: 'Short description', type: 'textarea' },
  { k: 'source_url', label: 'Source link', type: 'url', req: true, hint: 'The official page where people can check and apply.' },
  { k: 'expires_on', label: 'Closing date', type: 'date', hint: 'Optional. The listing is hidden automatically after this date.' },
  { k: 'published', label: 'Checked and ready: show on the website', type: 'checkbox' },
]
const BLANK = {
  events: { title: '', starts_on: '', location: '', description: '', ticket_url: '', image_url: '', registration_open: false, published: true },
  opportunities: { title: '', category: CATEGORIES[0], description: '', source_url: '', expires_on: '', published: false },
}

function Editor({ fields, initial, onSave, onCancel, isNew }) {
  const [v, setV] = useState(initial)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const first = useRef(null)
  useEffect(() => { first.current?.focus() }, [])
  const set = (k, val) => setV((o) => ({ ...o, [k]: val }))
  async function submit(e) {
    e.preventDefault(); setBusy(true); setErr('')
    try { await onSave(v) } catch (x) { setErr(x.message); setBusy(false) }
  }
  return (
    <form className="adm-form adm-editor" onSubmit={submit}>
      <h3>{isNew ? 'Add new' : 'Edit'}</h3>
      {fields.map((f, i) => {
        const common = { id: `f-${f.k}`, name: f.k, ref: i === 0 ? first : undefined }
        if (f.type === 'checkbox') return <label key={f.k} className="adm-check"><input {...common} type="checkbox" checked={!!v[f.k]} onChange={(e) => set(f.k, e.target.checked)} />{f.label}</label>
        return (
          <label key={f.k}><span>{f.label}{f.req && <b aria-hidden="true"> *</b>}</span>
            {f.type === 'textarea' ? <textarea {...common} rows={3} maxLength={2000} value={v[f.k] ?? ''} onChange={(e) => set(f.k, e.target.value)} />
              : f.type === 'select' ? <select {...common} value={v[f.k] ?? ''} onChange={(e) => set(f.k, e.target.value)}>{f.options.map((o) => <option key={o}>{o}</option>)}</select>
              : <input {...common} type={f.type || 'text'} required={f.req} value={v[f.k] ?? ''} onChange={(e) => set(f.k, e.target.value)} />}
            {f.hint && <small>{f.hint}</small>}
          </label>
        )
      })}
      <Alert>{err}</Alert>
      <div className="adm-actions">
        <button className="adm-btn primary" disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        <button type="button" className="adm-btn ghost" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}

function Listings({ kind, onError, onAuthLost }) {
  const isEv = kind === 'events'
  const [rows, setRows] = useState(null)
  const [edit, setEdit] = useState(null) // null | 'new' | row id
  const [ok, setOk] = useState('')
  useEffect(() => {
    api(kind).then((d) => setRows(d.map(snake))).catch((e) => { setRows([]); onError(e) })
  }, [kind]) // eslint-disable-line react-hooks/exhaustive-deps

  async function save(v) {
    const body = { ...v, expires_on: v.expires_on || '' }
    const row = snake(edit === 'new' ? await api(kind, { method: 'POST', body }) : await api(`${kind}/${edit}`, { method: 'PUT', body }))
    setRows((rs) => (edit === 'new' ? [row, ...rs] : rs.map((r) => (r.id === row.id ? row : r))))
    setEdit(null); setOk(row.published ? 'Saved. It is now on the website.' : 'Saved. It is hidden from the website until you tick “show on the website”.')
  }
  async function remove(r) {
    if (!window.confirm(`Delete “${r.title}”? This cannot be undone.`)) return
    try { await api(`${kind}/${r.id}`, { method: 'DELETE' }); setRows((rs) => rs.filter((x) => x.id !== r.id)); setOk('Deleted.') } catch (e) { onError(e) }
  }
  if (!rows) return <p className="adm-loading" role="status"><span className="spinner" aria-hidden="true" />Loading…</p>

  const t = today()
  const sorted = isEv ? [...rows].sort((a, b) => a.starts_on.localeCompare(b.starts_on)) : rows
  const groups = isEv
    ? [['Upcoming', sorted.filter((r) => r.starts_on >= t)], ['Past (shown under “Earlier gatherings”)', sorted.filter((r) => r.starts_on < t).reverse()]]
    : [['Listings', sorted]]
  const fields = isEv ? EVENT_FIELDS : OPP_FIELDS
  const blankRow = BLANK[kind]
  const toForm = (r) => Object.fromEntries(Object.keys(blankRow).map((k) => [k, r[k] ?? blankRow[k]]))

  return (<>
    <div className="adm-toolbar">
      <p className="adm-small">{isEv ? 'Events appear on the Events page under “Upcoming events”. After their date passes they move to “Earlier gatherings”.' : 'Listings appear on the Opportunities page once ticked as checked. Listings past their closing date are hidden automatically.'}</p>
      {edit !== 'new' && <button type="button" className="adm-btn primary" onClick={() => { setEdit('new'); setOk('') }}><Plus size={16} aria-hidden="true" />{isEv ? 'Add event' : 'Add opportunity'}</button>}
    </div>
    <Alert kind="ok">{ok}</Alert>
    {edit === 'new' && <Editor isNew fields={fields} initial={blankRow} onSave={save} onCancel={() => setEdit(null)} />}
    {rows.length === 0 && edit !== 'new' && <div className="adm-empty">{isEv ? <CalendarDays size={28} aria-hidden="true" /> : <Briefcase size={28} aria-hidden="true" />}
      <p>{isEv ? 'No events yet. The Events page shows “No new date announced yet” with a newsletter sign-up until you add one.' : 'No listings yet. The Opportunities page shows its list of trusted official websites until you publish one.'}</p></div>}
    {groups.map(([label, list]) => list.length > 0 && (
      <section key={label} className="adm-group"><h3>{label}</h3>
        <ul className="adm-list">
          {list.map((r) => edit === r.id
            ? <li key={r.id}><Editor fields={fields} initial={toForm(r)} onSave={save} onCancel={() => setEdit(null)} /></li>
            : (
              <li key={r.id} className="adm-row">
                <div className="adm-row-main">
                  <h4>{r.title}</h4>
                  <p className="adm-meta">
                    {isEv ? <>{fmtDate(r.starts_on)}{r.location && ` · ${r.location}`}</> : <>{r.category}{r.expires_on && ` · Closes ${fmtDate(r.expires_on)}`}</>}
                  </p>
                  <div className="adm-badges">
                    {r.published ? <span className="adm-badge ok">On website</span> : <span className="adm-badge">{isEv ? 'Hidden' : 'Draft'}</span>}
                    {isEv && r.registration_open && <span className="adm-badge gold">Registration open</span>}
                    {!isEv && r.expires_on && r.expires_on < t && <span className="adm-badge warn">Closed</span>}
                    {!isEv && r.source_url && <a href={r.source_url} target="_blank" rel="noreferrer" className="adm-ext">Source<ExternalLink size={13} aria-hidden="true" /></a>}
                  </div>
                </div>
                <div className="adm-actions">
                  <button type="button" className="adm-btn ghost sm" onClick={() => { setEdit(r.id); setOk('') }}><Pencil size={15} aria-hidden="true" />Edit</button>
                  <button type="button" className="adm-btn danger sm" onClick={() => remove(r)}><Trash2 size={15} aria-hidden="true" />Delete</button>
                </div>
              </li>
            ))}
        </ul>
      </section>
    ))}
  </>)
}

// ---------- Dashboard ----------

function Dashboard({ user, onSignOut, onAuthLost }) {
  const [tab, setTab] = useState('messages')
  const [messages, setMessages] = useState(null)
  const [err, setErr] = useState('')
  const onError = (e) => { if (e.status === 401) onAuthLost(); else setErr(e.message) }
  useEffect(() => { api('messages').then(setMessages).catch((e) => { setMessages([]); onError(e) }) }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const unread = useMemo(() => (messages || []).filter((m) => !m.read).length, [messages])
  const TABS = [['messages', 'Messages', Inbox], ['events', 'Events', CalendarDays], ['opportunities', 'Opportunities', Briefcase]]

  return (
    <div className="adm">
      <header className="adm-top">
        <Link to="/" className="adm-brand" aria-label="HomeAFar website"><Wordmark /><span>Admin</span></Link>
        <div className="adm-user"><span title={user.email}>{user.email}</span>
          <button type="button" className="adm-btn ghost sm" onClick={onSignOut}><LogOut size={15} aria-hidden="true" />Sign out</button></div>
      </header>
      <nav className="adm-tabs" aria-label="Admin sections">
        {TABS.map(([k, l, I]) => (
          <button key={k} type="button" aria-current={tab === k ? 'page' : undefined} onClick={() => { setTab(k); setErr('') }}>
            <I size={18} aria-hidden="true" />{l}{k === 'messages' && unread > 0 && <span className="adm-count" aria-label={`${unread} unread`}>{unread}</span>}
          </button>
        ))}
      </nav>
      <main className="adm-main" id="admin-main">
        <h2>{TABS.find(([k]) => k === tab)[1]}</h2>
        <Alert>{err}</Alert>
        {tab === 'messages' && (messages ? <Messages rows={messages} setRows={setMessages} onError={onError} /> : <p className="adm-loading" role="status"><span className="spinner" aria-hidden="true" />Loading…</p>)}
        {tab !== 'messages' && <Listings key={tab} kind={tab} onError={onError} />}
      </main>
    </div>
  )
}

export default function Admin() {
  usePage('/admin', { title: 'Admin', noindex: true })
  const idRef = useRef(null)
  const [auth, setAuth] = useState({ status: 'loading' })

  useEffect(() => {
    let live = true
    ;(async () => {
      let id
      try { id = await import('@netlify/identity'); idRef.current = id } catch { return live && setAuth({ status: 'unavailable' }) }
      try {
        const r = await id.handleAuthCallback()
        if (r?.type === 'invite') return live && setAuth({ status: 'invite', token: r.token })
        if (r?.type === 'recovery') return live && setAuth({ status: 'recovery' })
      } catch (e) {
        if (e instanceof id.MissingIdentityError) return live && setAuth({ status: 'unavailable' })
        const user = await id.getUser()
        return live && setAuth(user ? { status: 'in', user } : { status: 'out', note: 'That link has expired or was already used. Sign in, or ask for a new one.' })
      }
      const user = await id.getUser()
      if (live) setAuth(user ? { status: 'in', user } : { status: 'out' })
    })()
    return () => { live = false }
  }, [])

  const id = idRef.current
  const signOut = async () => { try { await id.logout() } catch { /* cookies are cleared anyway */ } setAuth({ status: 'out' }) }

  if (auth.status === 'loading') return <div className="adm-auth"><p className="adm-loading" role="status"><span className="spinner" aria-hidden="true" />Loading admin…</p></div>
  if (auth.status === 'unavailable') return <AuthCard title="Admin unavailable"><p className="adm-small">Sign-in is not switched on for this site yet. It starts working after the next deploy.</p></AuthCard>
  if (auth.status === 'invite') return <SetPassword title="Welcome to HomeAFar admin" intro="Choose a password to finish setting up your account."
    onSave={async (pw) => setAuth({ status: 'in', user: await id.acceptInvite(auth.token, pw) })} />
  if (auth.status === 'recovery') return <SetPassword title="Choose a new password" intro="Enter a new password for your admin account."
    onSave={async (pw) => setAuth({ status: 'in', user: await id.updateUser({ password: pw }) })} />
  if (auth.status === 'out') return <SignIn id={id} note={auth.note} onUser={(user) => setAuth({ status: 'in', user })} />

  if (!auth.user.roles?.includes('admin')) return (
    <AuthCard title="No admin access yet">
      <div className="adm-noaccess"><ShieldAlert size={28} aria-hidden="true" />
        <p>You are signed in as <b>{auth.user.email}</b>, but this account has not been given the <b>admin</b> role. The site owner can add it in the Netlify dashboard under Identity. Then sign out and sign in again.</p></div>
      <button type="button" className="adm-btn ghost" onClick={signOut}><LogOut size={15} aria-hidden="true" />Sign out</button>
    </AuthCard>
  )
  return <Dashboard user={auth.user} onSignOut={signOut} onAuthLost={() => setAuth({ status: 'out', note: 'Your session has ended. Please sign in again.' })} />
}
