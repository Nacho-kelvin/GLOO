// Admin API for /admin. Every request must come from a signed-in Netlify Identity user with the "admin" role.
//   /api/admin/events, /api/admin/opportunities   GET list, POST create
//   /api/admin/events/:id, /api/admin/opportunities/:id   PUT update, DELETE remove
//   /api/admin/messages   GET list;  /api/admin/messages/:id   PATCH { read }, DELETE remove
import type { Config, Context } from '@netlify/functions'
import { getUser } from '@netlify/identity'
import { desc, eq } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { events, opportunities, messages } from '../../db/schema.js'

const bad = (error: string, status = 400) => Response.json({ error }, { status })
const str = (v: unknown, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const isDate = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v))
// Only web links (or a path on this site, for images) can be saved, so nothing unsafe ends up in a link on the public pages.
const webUrl = (v: string, allowPath = false) => !v || /^https?:\/\/[^\s]+$/i.test(v) || (allowPath && /^\/[^\s/][^\s]*$/.test(v))

function eventValues(b: any) {
  const v = {
    title: str(b.title, 200), startsOn: str(b.starts_on, 10), location: str(b.location, 200), description: str(b.description),
    ticketUrl: str(b.ticket_url, 500), imageUrl: str(b.image_url, 500), registrationOpen: !!b.registration_open, published: b.published !== false,
  }
  if (!v.title) return 'Please enter a title.'
  if (!isDate(v.startsOn)) return 'Please choose a date.'
  if (!webUrl(v.ticketUrl)) return 'The ticket link must start with https://'
  if (!webUrl(v.imageUrl, true)) return 'The image link must start with https:// or /images/'
  return v
}

function opportunityValues(b: any) {
  const v = {
    title: str(b.title, 200), category: str(b.category, 80), description: str(b.description), sourceUrl: str(b.source_url, 500),
    expiresOn: str(b.expires_on, 10) || null, published: !!b.published,
  }
  if (!v.title) return 'Please enter a title.'
  if (!v.sourceUrl || !webUrl(v.sourceUrl)) return 'Please add a source link starting with https://'
  if (v.expiresOn && !isDate(v.expiresOn)) return 'The closing date is not valid.'
  return v
}

const TABLES = { events: [events, eventValues], opportunities: [opportunities, opportunityValues] } as const

export default async (req: Request, context: Context) => {
  const user = await getUser()
  if (!user) return bad('Please sign in.', 401)
  if (!user.roles?.includes('admin')) return bad('This account does not have admin access.', 403)

  const { resource, id: rawId } = context.params
  const id = rawId === undefined ? null : Number(rawId)
  if (rawId !== undefined && !Number.isInteger(id)) return bad('Not found.', 404)
  const body = ['POST', 'PUT', 'PATCH'].includes(req.method) ? await req.json().catch(() => ({})) : {}

  if (resource === 'messages') {
    if (id === null && req.method === 'GET') return Response.json(await db.select().from(messages).orderBy(desc(messages.createdAt)).limit(1000))
    if (id !== null && req.method === 'PATCH') {
      const [row] = await db.update(messages).set({ read: !!body.read }).where(eq(messages.id, id)).returning()
      return row ? Response.json(row) : bad('Not found.', 404)
    }
    if (id !== null && req.method === 'DELETE') { await db.delete(messages).where(eq(messages.id, id)); return new Response(null, { status: 204 }) }
    return bad('Method not allowed.', 405)
  }

  const entry = TABLES[resource as keyof typeof TABLES]
  if (!entry) return bad('Not found.', 404)
  const [table, values] = entry as [any, (b: any) => any]
  const order = resource === 'events' ? desc(events.startsOn) : desc(opportunities.createdAt)

  if (id === null && req.method === 'GET') return Response.json(await db.select().from(table).orderBy(order))
  if (id === null && req.method === 'POST') {
    const v = values(body)
    if (typeof v === 'string') return bad(v)
    const [row] = await db.insert(table).values(v).returning()
    return Response.json(row, { status: 201 })
  }
  if (id !== null && req.method === 'PUT') {
    const v = values(body)
    if (typeof v === 'string') return bad(v)
    const [row] = await db.update(table).set({ ...v, updatedAt: new Date() }).where(eq(table.id, id)).returning()
    return row ? Response.json(row) : bad('Not found.', 404)
  }
  if (id !== null && req.method === 'DELETE') { await db.delete(table).where(eq(table.id, id)); return new Response(null, { status: 204 }) }
  return bad('Method not allowed.', 405)
}

export const config: Config = { path: ['/api/admin/:resource', '/api/admin/:resource/:id'] }
