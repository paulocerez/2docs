import { boolean, integer, pgTable, primaryKey, serial, text, timestamp } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters"


// User Table
export const users = pgTable("user", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Accounts Table
export const accounts = pgTable("account", {
	userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade"}),
	type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
},
	(account) => ({
		compoundKey: primaryKey({
		  columns: [account.provider, account.providerAccountId],
		}),
})
)

// Sessions table > manage user session through session token storage and expiration date
export const sessions = pgTable("session", {
	sessionToken: text("sessionToken").primaryKey(),
	userId: text("userId")
	  .notNull()
	  .references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
  })
   
  export const verificationTokens = pgTable(
	"verificationToken",
	{
	  identifier: text("identifier").notNull(),
	  token: text("token").notNull(),
	  expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(verificationToken) => ({
	  compositePk: primaryKey({
		columns: [verificationToken.identifier, verificationToken.token],
	  }),
	})
  )
   
  export const authenticators = pgTable(
	"authenticator",
	{
	  credentialID: text("credentialID").notNull().unique(),
	  userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	  providerAccountId: text("providerAccountId").notNull(),
	  credentialPublicKey: text("credentialPublicKey").notNull(),
	  counter: integer("counter").notNull(),
	  credentialDeviceType: text("credentialDeviceType").notNull(),
	  credentialBackedUp: boolean("credentialBackedUp").notNull(),
	  transports: text("transports"),
	},
	(authenticator) => ({
	  compositePK: primaryKey({
		columns: [authenticator.userId, authenticator.credentialID],
	  }),
	})
  )


// Chat Session Table
export const chatSessions = pgTable("chat_session", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  endedAt: timestamp("ended_at"),
  prompt: text("prompt").notNull(),
});

// Message Table
export const messages = pgTable("message", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id")
    .notNull()
    .references(() => chatSessions.id, { onDelete: "cascade" }),
  sender: text("sender").notNull(),
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

// Scrape Session Table
export const scrapeSessions = pgTable("scrape_session", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id")
    .notNull()
    .references(() => chatSessions.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  scrapedContent: text("scraped_content").notNull(),
  scrapedAt: timestamp("scraped_at").notNull().defaultNow(),
});

// API Documentation Table
export const apiDocumentations = pgTable("api_documentation", {
  id: serial("id").primaryKey(),
  scrapeId: integer("scrape_id")
    .notNull()
    .references(() => scrapeSessions.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  overview: text("overview").notNull(),
  baseUrl: text("base_url").notNull(),
  version: text("version").notNull(),
});

// Endpoint Table
export const endpoints = pgTable("endpoint", {
  id: serial("id").primaryKey(),
  docId: integer("doc_id")
    .notNull()
    .references(() => apiDocumentations.id, { onDelete: "cascade" }),
  path: text("path").notNull(),
  operationId: integer("operation_id")
    .notNull()
    .references(() => httpMethods.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
});

// Operation Table
export const httpMethods = pgTable("http_method", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

// Types
export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertChatSession = typeof chatSessions.$inferInsert;
export type SelectChatSession = typeof chatSessions.$inferSelect;

export type InsertMessage = typeof messages.$inferInsert;
export type SelectMessage = typeof messages.$inferSelect;

export type InsertScrapeSession = typeof scrapeSessions.$inferInsert;
export type SelectScrapeSession = typeof scrapeSessions.$inferSelect;

export type InsertApiDocumentation = typeof apiDocumentations.$inferInsert;
export type SelectApiDocumentation = typeof apiDocumentations.$inferSelect;

export type InsertEndpoint = typeof endpoints.$inferInsert;
export type SelectEndpoint = typeof endpoints.$inferSelect;

export type InsertOperation = typeof httpMethods.$inferInsert;
export type SelectOperation = typeof httpMethods.$inferSelect;
