// Public: the published events and current opportunity listings shown on /events and /opportunities.
import type { Config } from '@netlify/functions'
import { and, asc, eq, gte, isNull, or } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { events, opportunities } from '../../db/schema.js'

export default async () => {
  const today = new Date().toISOString().slice(0, 10)
  const [ev, opp] = await Promise.all([
    db.select().from(events).where(eq(events.published, true)).orderBy(asc(events.startsOn)),
    db.select().from(opportunities)
      .where(and(eq(opportunities.published, true), or(isNull(opportunities.expiresOn), gte(opportunities.expiresOn, today))))
      .orderBy(asc(opportunities.expiresOn)),
  ])
  return Response.json({
    events: ev.map((e) => ({
      id: e.id, title: e.title, starts_on: e.startsOn, location: e.location, description: e.description,
      ticket_url: e.ticketUrl, image_url: e.imageUrl, registration_open: e.registrationOpen,
    })),
    opportunities: opp.map((o) => ({
      id: o.id, title: o.title, category: o.category, description: o.description, source_url: o.sourceUrl, expires_on: o.expiresOn,
    })),
  }, { headers: { 'Cache-Control': 'no-store' } })
}

export const config: Config = { path: '/api/listings' }
