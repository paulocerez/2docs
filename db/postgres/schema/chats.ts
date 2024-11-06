import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { users } from './users';

export const chats = pgTable("chat", {
	id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
	userId: text("userId")
	.notNull()
	.references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("started_at").notNull().defaultNow(),
  prompt: text("prompt").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  lastActivityAt: timestamp("last_activity_at").notNull().defaultNow(),
});

export const messages = pgTable("message", {
	id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  chatId: text("chat_id")
    .notNull()
    .references(() => chats.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const chatApiLinks = pgTable("chat_api_links", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    chatId: text("chat_id")
        .notNull()
        .references(() => chats.id, { onDelete: "cascade" }),
    apiLink: varchar("api_link", { length: 2048 }).notNull(),
});

export const scrapes = pgTable("scrape", {
	id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
	chatId: text("chat_id")
    .notNull()
    .references(() => chats.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  scrapedContent: text("scraped_content").notNull(),
  scrapedAt: timestamp("scraped_at").notNull().defaultNow(),
});

export const apiDocumentations = pgTable("api_documentation", {
	id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  scrapeId: text("scrape_id")
    .notNull()
    .references(() => scrapes.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  overview: text("overview").notNull(),
  baseUrl: text("base_url").notNull(),
  version: text("version").notNull(),
});

export const endpoints = pgTable("endpoint", {
	id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  docId: text("doc_id")
    .notNull()
    .references(() => apiDocumentations.id, { onDelete: "cascade" }),
  path: text("path").notNull(),
  httpMethod: text("http_method_id")
    .notNull()
    .references(() => httpMethods.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
});

export const httpMethods = pgTable("http_method", {
	id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
});


export type InsertChat = typeof chats.$inferInsert;
export type SelectChat = typeof chats.$inferSelect;

export type InsertMessage = typeof messages.$inferInsert;
export type SelectMessage = typeof messages.$inferSelect;

export type InsertChatApiLink = typeof chatApiLinks.$inferInsert;
export type SelectChatApiLink = typeof chatApiLinks.$inferSelect;

export type InsertScrape = typeof scrapes.$inferInsert;
export type SelectScrape = typeof scrapes.$inferSelect;

export type InsertApiDocumentation = typeof apiDocumentations.$inferInsert;
export type SelectApiDocumentation = typeof apiDocumentations.$inferSelect;

export type InsertEndpoint = typeof endpoints.$inferInsert;
export type SelectEndpoint = typeof endpoints.$inferSelect;

export type InsertHttpMethod = typeof httpMethods.$inferInsert;
export type SelectHttpMethod = typeof httpMethods.$inferSelect;