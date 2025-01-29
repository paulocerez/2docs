import { pgTable, text, timestamp, boolean, index } from 'drizzle-orm/pg-core';
import { users } from './users';

export const apiDocumentations = pgTable("api_documentation", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  baseUrl: text("base_url").notNull(),
  version: text("version").notNull(),
  content: text("content").notNull(),
  lastScrapedAt: timestamp("last_scraped_at").notNull().defaultNow(),
  createdBy: text("created_by").notNull().references(() => users.id),
  isPublic: boolean("is_public").notNull().default(true),
}, (table) => {
    return {
        baseUrlIdx: index("idx_api_docs_base_url").on(table.baseUrl),
        publicDocsIdx: index("idx_api_docs_public").on(table.isPublic),
    }
});

export const apiEndpoints = pgTable("api_endpoint", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  apiDocumentationId: text("api_documentation_id").notNull().references(() => apiDocumentations.id, { onDelete: "cascade" }),
  path: text("path").notNull(),
  method: text("method").notNull(),
  operation: text("operation"),
  summary: text("summary"),
  description: text("description"),
  parameters: text("parameters"),
  requestBody: text("request_body"),
  responses: text("responses"),
}, (table) => {
    return {
        apiDocIdIdx: index("idx_api_endpoints_doc_id").on(table.apiDocumentationId),
    }
});

export type InsertApiDocumentation = typeof apiDocumentations.$inferInsert;
export type SelectApiDocumentation = typeof apiDocumentations.$inferSelect;

export type InsertApiEndpoint = typeof apiEndpoints.$inferInsert;
export type SelectApiEndpoint = typeof apiEndpoints.$inferSelect;