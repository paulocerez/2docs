import { boolean, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { apiEndpoints } from "./apis";

export const workflows = pgTable("workflow", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    createdById: text("created_by")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
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

// sequence of steps that make up a workflow
export const workflowSteps = pgTable("workflow_step", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    workflowId: text("workflow_id")
        .notNull()
        .references(() => workflows.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    order: integer("order").notNull(),
    inputMapping: text("input_mapping"),
    outputMapping: text("output_mapping"),
    codeSnippet: text("code_snippet"),
});

// reusable variables across a workflow sequence
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

export const workflowStepEndpoints = pgTable("workflow_step_endpoints", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    workflowStepId: text("workflow_step_id")
        .notNull()
        .references(() => workflowSteps.id, { onDelete: "cascade" }),
    endpointId: text("endpoint_id")
        .notNull()
        .references(() => apiEndpoints.id, { onDelete: "cascade" }),
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

export type InsertWorkflowVariable = typeof workflowVariables.$inferInsert;
export type SelectWorkflowVariable = typeof workflowVariables.$inferSelect;

export type InsertWorkflowRun = typeof workflowRuns.$inferInsert;
export type SelectWorkflowRun = typeof workflowRuns.$inferSelect;

export type InsertWorkflowStepEndpoint = typeof workflowStepEndpoints.$inferInsert;
export type SelectWorkflowStepEndpoint = typeof workflowStepEndpoints.$inferSelect;