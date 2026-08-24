import { pgTable, serial, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";

export const guestbookEntries = pgTable("guestbook_entries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  message: text("message").notNull(),
  lang: text("lang").notNull().default("en"),
  frostLevel: integer("frost_level").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull().default("General"),
  message: text("message").notNull(),
  handled: boolean("handled").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const pageViews = pgTable("page_views", {
  id: serial("id").primaryKey(),
  path: text("path").notNull().unique(),
  views: integer("views").notNull().default(0),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
