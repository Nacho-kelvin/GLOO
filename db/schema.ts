import { pgTable, serial, text, date, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core'

// Upcoming events shown on /events. `published` controls whether visitors can see it.
export const events = pgTable('events', {
  id: serial().primaryKey(),
  title: text().notNull(),
  startsOn: date('starts_on', { mode: 'string' }).notNull(),
  location: text().notNull().default(''),
  description: text().notNull().default(''),
  ticketUrl: text('ticket_url').notNull().default(''),
  imageUrl: text('image_url').notNull().default(''),
  registrationOpen: boolean('registration_open').notNull().default(false),
  published: boolean().notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// Checked opportunity listings shown on /opportunities. They stay drafts (published = false) until checked.
export const opportunities = pgTable('opportunities', {
  id: serial().primaryKey(),
  title: text().notNull(),
  category: text().notNull().default(''),
  description: text().notNull().default(''),
  sourceUrl: text('source_url').notNull(),
  expiresOn: date('expires_on', { mode: 'string' }),
  published: boolean().notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// A copy of every verified website form submission (Netlify Forms keeps the original too).
export const messages = pgTable('messages', {
  id: serial().primaryKey(),
  formName: text('form_name').notNull().default(''),
  name: text().notNull().default(''),
  email: text().notNull().default(''),
  category: text().notNull().default(''),
  event: text().notNull().default(''),
  message: text().notNull().default(''),
  raw: jsonb().notNull().default({}),
  read: boolean().notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})
