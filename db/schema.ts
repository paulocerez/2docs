import { boolean, integer, pgTable, primaryKey, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters"


// User Table
export const users = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
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
	  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
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

// Chat Table
export const chats = pgTable("chat_session", {
	id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  endedAt: timestamp("ended_at"),
  prompt: text("prompt").notNull(),
});

// Message Table
export const messages = pgTable("message", {
	id: uuid("id").defaultRandom().primaryKey(),
  sessionId: integer("session_id")
    .notNull()
    .references(() => chats.id, { onDelete: "cascade" }),
  sender: text("sender").notNull(),
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

// Scrape Session Table
export const scrapes = pgTable("scrape_session", {
	id: uuid("id").defaultRandom().primaryKey(),
  sessionId: integer("session_id")
    .notNull()
    .references(() => chats.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  scrapedContent: text("scraped_content").notNull(),
  scrapedAt: timestamp("scraped_at").notNull().defaultNow(),
});

// API Documentation Table
export const apiDocumentations = pgTable("api_documentation", {
	id: uuid("id").defaultRandom().primaryKey(),
  scrapeId: integer("scrape_id")
    .notNull()
    .references(() => scrapes.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  overview: text("overview").notNull(),
  baseUrl: text("base_url").notNull(),
  version: text("version").notNull(),
});

// Endpoint Table
export const endpoints = pgTable("endpoint", {
	id: uuid("id").defaultRandom().primaryKey(),
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
	id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

// Types
export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertAccount = typeof accounts.$inferInsert;
export type SelectAccount = typeof accounts.$inferSelect;

export type InsertSession = typeof sessions.$inferInsert;
export type SelectSession = typeof sessions.$inferSelect;

export type InsertVerificationToken = typeof verificationTokens.$inferInsert;
export type SelectVerificationToken = typeof verificationTokens.$inferSelect;

export type InsertAuthenticator = typeof authenticators.$inferInsert;
export type SelectAuthenticator = typeof authenticators.$inferSelect;

export type InsertChat = typeof chats.$inferInsert;
export type SelectChat = typeof chats.$inferSelect;

export type InsertMessage = typeof messages.$inferInsert;
export type SelectMessage = typeof messages.$inferSelect;

export type InsertScrape = typeof scrapes.$inferInsert;
export type SelectScrape = typeof scrapes.$inferSelect;

export type InsertApiDocumentation = typeof apiDocumentations.$inferInsert;
export type SelectApiDocumentation = typeof apiDocumentations.$inferSelect;

export type InsertEndpoint = typeof endpoints.$inferInsert;
export type SelectEndpoint = typeof endpoints.$inferSelect;

export type InsertHttpMethod = typeof httpMethods.$inferInsert;
export type SelectHttpMethod = typeof httpMethods.$inferSelect;
