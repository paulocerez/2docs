import { boolean, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { apiEndpoints } from "./api";

export const workflows = pgTable("workflow", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    isPublished: boolean("is_published").notNull().default(false),
    publishedAt: timestamp("published_at"),
    version: integer("version").notNull().default(1),
    tags: text("tags").array(),
});

export const workflowSteps = pgTable("workflow_step", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    workflowId: text("workflow_id")
        .notNull()
        .references(() => workflows.id, { onDelete: "cascade" }),
    endpointId: text("endpoint_id")
        .notNull()
        .references(() => apiEndpoints.id, { onDelete: "cascade" }),
    order: integer("order").notNull(),
    inputMapping: text("input_mapping").notNull(),
    outputMapping: text("output_mapping").notNull(),
});

export const workflowVariables = pgTable("workflow_variable", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    workflowId: text("workflow_id")
        .notNull()
        .references(() => workflows.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    defaultValue: text("default_value"),
    description: text("description"),
});

export const workflowRuns = pgTable("workflow_run", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    workflowId: text("workflow_id")
        .notNull()
        .references(() => workflows.id, { onDelete: "cascade" }),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    startedAt: timestamp("started_at").notNull().defaultNow(),
    completedAt: timestamp("completed_at"),
    status: varchar("status", { length: 50 }).notNull(),
    result: text("result"),
});

export const workflowLikes = pgTable("workflow_like", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    workflowId: text("workflow_id")
        .notNull()
        .references(() => workflows.id, { onDelete: "cascade" }),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const workflowComments = pgTable("workflow_comment", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    workflowId: text("workflow_id")
        .notNull()
        .references(() => workflows.id, { onDelete: "cascade" }),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type InsertWorkflow = typeof workflows.$inferInsert;
export type SelectWorkflow = typeof workflows.$inferSelect;

export type InsertWorkflowStep = typeof workflowSteps.$inferInsert;
export type SelectWorkflowStep = typeof workflowSteps.$inferSelect;

export type InsertWorkflowVariable = typeof workflowVariables.$inferInsert;
export type SelectWorkflowVariable = typeof workflowVariables.$inferSelect;

export type InsertWorkflowRun = typeof workflowRuns.$inferInsert;
export type SelectWorkflowRun = typeof workflowRuns.$inferSelect;

export type InsertWorkflowLike = typeof workflowLikes.$inferInsert;
export type SelectWorkflowLike = typeof workflowLikes.$inferSelect;

export type InsertWorkflowComment = typeof workflowComments.$inferInsert;
export type SelectWorkflowComment = typeof workflowComments.$inferSelect;