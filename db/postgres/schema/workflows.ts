import { boolean, integer, pgTable, text, timestamp, varchar, jsonb } from "drizzle-orm/pg-core";
import { users } from "./users";

export const workflows = pgTable("workflow", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    createdById: text("created_by")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    problemDescription: text("problem_description"),
    technicalOverview: text("technical_overview"),
    orchestrator: jsonb("orchestrator"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    isPublished: boolean("is_published").notNull().default(false),
    publishedAt: timestamp("published_at"),
    version: integer("version").notNull().default(1),
    tags: text("tags").array(),
});

export const userWorkflows = pgTable("user_workflow", {
	id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    workflowId: text("workflow_id")
        .notNull()
        .references(() => workflows.id, { onDelete: "cascade" }),
	role: text("role").notNull(),
	addedAt: timestamp("added_at").notNull().defaultNow(),
});

export const workflowSteps = pgTable("workflow_step", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    workflowId: text("workflow_id")
        .notNull()
        .references(() => workflows.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    order: integer("order").notNull(),
    description: text("description"),
    apiEndpoints: jsonb("api_endpoints"),
    input: text("input"),
    output: text("output"),
    codeSnippet: text("code_snippet"),
    additionalDetails: text("additional_details"),
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

export type InsertWorkflow = typeof workflows.$inferInsert;
export type SelectWorkflow = typeof workflows.$inferSelect;

export type InsertUserWorkflow = typeof userWorkflows.$inferInsert;
export type SelectUserWorkflow = typeof userWorkflows.$inferSelect;

export type InsertWorkflowStep = typeof workflowSteps.$inferInsert;
export type SelectWorkflowStep = typeof workflowSteps.$inferSelect;

export type InsertWorkflowRun = typeof workflowRuns.$inferInsert;
export type SelectWorkflowRun = typeof workflowRuns.$inferSelect;