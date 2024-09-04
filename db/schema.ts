import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const apiDocumentation = pgTable("api_documentation", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});
