import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { users } from './users';
import { apiDocumentations } from './api';

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
  content: text("message").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const chatApiLinks = pgTable("chat_api_links", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    chatId: text("chat_id")
        .notNull()
        .references(() => chats.id, { onDelete: "cascade" }),
    apiDocumentationId: text("api_documentation_id")
        .notNull()
        .references(() => apiDocumentations.id, { onDelete: "cascade" }),
});

export type InsertChat = typeof chats.$inferInsert;
export type SelectChat = typeof chats.$inferSelect;

export type InsertMessage = typeof messages.$inferInsert;
export type SelectMessage = typeof messages.$inferSelect;

export type InsertChatApiLink = typeof chatApiLinks.$inferInsert;
export type SelectChatApiLink = typeof chatApiLinks.$inferSelect;