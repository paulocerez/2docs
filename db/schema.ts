import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// User Table
export const usersTable = pgTable("users_table", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Chat Session Table
export const chatSessionsTable = pgTable("chat_sessions_table", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  endedAt: timestamp("ended_at"),
  prompt: text("prompt").notNull(),
});

// Message Table
export const messagesTable = pgTable("messages_table", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id")
    .notNull()
    .references(() => chatSessionsTable.id, { onDelete: "cascade" }),
  sender: text("sender").notNull(),
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

// Scrape Session Table
export const scrapeSessionsTable = pgTable("scrape_sessions_table", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id")
    .notNull()
    .references(() => chatSessionsTable.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  scrapedContent: text("scraped_content").notNull(),
  scrapedAt: timestamp("scraped_at").notNull().defaultNow(),
});

// API Documentation Table
export const apiDocumentationsTable = pgTable("api_documentations_table", {
  id: serial("id").primaryKey(),
  scrapeId: integer("scrape_id")
    .notNull()
    .references(() => scrapeSessionsTable.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  overview: text("overview").notNull(),
  baseUrl: text("base_url").notNull(),
  version: text("version").notNull(),
});

// Endpoint Table
export const endpointsTable = pgTable("endpoints_table", {
  id: serial("id").primaryKey(),
  docId: integer("doc_id")
    .notNull()
    .references(() => apiDocumentationsTable.id, { onDelete: "cascade" }),
  path: text("path").notNull(),
  operationId: integer("operation_id")
    .notNull()
    .references(() => operationsTable.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
});

// Operation Table
export const operationsTable = pgTable("operations_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

// Types
export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertChatSession = typeof chatSessionsTable.$inferInsert;
export type SelectChatSession = typeof chatSessionsTable.$inferSelect;

export type InsertMessage = typeof messagesTable.$inferInsert;
export type SelectMessage = typeof messagesTable.$inferSelect;

export type InsertScrapeSession = typeof scrapeSessionsTable.$inferInsert;
export type SelectScrapeSession = typeof scrapeSessionsTable.$inferSelect;

export type InsertApiDocumentation = typeof apiDocumentationsTable.$inferInsert;
export type SelectApiDocumentation = typeof apiDocumentationsTable.$inferSelect;

export type InsertEndpoint = typeof endpointsTable.$inferInsert;
export type SelectEndpoint = typeof endpointsTable.$inferSelect;

export type InsertOperation = typeof operationsTable.$inferInsert;
export type SelectOperation = typeof operationsTable.$inferSelect;
