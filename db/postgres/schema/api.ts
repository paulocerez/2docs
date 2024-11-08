import { pgTable, text, timestamp, integer, uniqueIndex } from 'drizzle-orm/pg-core';
import { users } from './users';

export const apiDocumentations = pgTable("api_documentation", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  baseUrl: text("base_url").notNull(),
  version: text("version").notNull(),
  lastScrapedAt: timestamp("last_scraped_at").notNull().defaultNow(),
  createdBy: text("created_by").notNull().references(() => users.id),
}, (table) => {
  return {
    nameVersionIdx: uniqueIndex('name_version_idx').on(table.name, table.version),
  }
});

export const apiEndpoints = pgTable("api_endpoint", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  apiDocumentationId: text("api_documentation_id").notNull().references(() => apiDocumentations.id, { onDelete: "cascade" }),
  path: text("path").notNull(),
  method: text("method").notNull(),
  summary: text("summary"),
  description: text("description"),
  parameters: text("parameters"),
  requestBody: text("request_body"),
  responses: text("responses"),
});

export const vectorEmbeddings = pgTable("vector_embedding", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  apiEndpointId: text("api_endpoint_id").notNull().references(() => apiEndpoints.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  metadata: text("metadata"),
  vectorId: text("vector_id").notNull(), // reference to vector in Qdrant
});

export type InsertApiDocumentation = typeof apiDocumentations.$inferInsert;
export type SelectApiDocumentation = typeof apiDocumentations.$inferSelect;

export type InsertApiEndpoint = typeof apiEndpoints.$inferInsert;
export type SelectApiEndpoint = typeof apiEndpoints.$inferSelect;

export type InsertVectorEmbedding = typeof vectorEmbeddings.$inferInsert;
export type SelectVectorEmbedding = typeof vectorEmbeddings.$inferSelect;