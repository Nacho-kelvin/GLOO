// Saves a copy of every verified (non-spam) Netlify Forms submission, so it can be read in /admin under Messages.
import type { FormSubmittedEvent } from '@netlify/functions'
import { db } from '../../db/index.js'
import { messages } from '../../db/schema.js'

const KNOWN = ['contact', 'volunteer', 'partner', 'membership', 'newsletter', 'event_registration']
const s = (v: unknown, max = 5000) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export default {
  async formSubmitted(event: FormSubmittedEvent) {
    // Field values may sit on the event itself or under `data`, depending on the payload version: read both.
    const e = event as any
    const d: Record<string, unknown> = { ...(e?.data?.data ?? {}), ...(e?.data ?? {}) }
    // Every website form sends a hidden `form_kind` field (see src/components/Form.jsx); the Netlify form name is the fallback.
    const formName = [d.form_kind, e?.form_name, e?.data?.form_name, d['form-name'], d.form_name].map((v) => s(v, 80)).find((v) => KNOWN.includes(v)) || 'other'
    await db.insert(messages).values({
      formName,
      name: s(d.name, 200),
      email: s(d.email, 320),
      category: s(d.category, 200),
      event: s(d.event, 300),
      message: s(d.message),
      raw: JSON.parse(JSON.stringify(e ?? {})),
    })
  },
}
