import {
    pgTable,
    text,
    timestamp,
    varchar,
    primaryKey,
    integer,
    boolean,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const SubscriptionTier = {
    FREE: 'free',
    PRO: 'pro',
    ENTERPRISE: 'enterprise',
} as const;

export type SubscriptionTier = typeof SubscriptionTier[keyof typeof SubscriptionTier];

export const SubscriptionStatus = {
    ACTIVE: 'active',
    CANCELED: 'canceled',
    PAST_DUE: 'past_due',
    UNPAID: 'unpaid',
    TRIALING: 'trialing',
} as const;

export type SubscriptionStatus = typeof SubscriptionStatus[keyof typeof SubscriptionStatus];

// Current active subscriptions
export const subscriptions = pgTable("subscription", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    tier: varchar("tier", { length: 20 }).notNull().default(SubscriptionTier.FREE),
    status: varchar("status", { length: 20 }).notNull().default(SubscriptionStatus.ACTIVE),
    startDate: timestamp("start_date", { mode: "date" }).notNull().defaultNow(),
    endDate: timestamp("end_date", { mode: "date" }),
    trialEndsAt: timestamp("trial_ends_at", { mode: "date" }),
    canceledAt: timestamp("canceled_at", { mode: "date" }),
    currentPeriodStart: timestamp("current_period_start", { mode: "date" }).notNull().defaultNow(),
    currentPeriodEnd: timestamp("current_period_end", { mode: "date" }),
    stripeCustomerId: text("stripe_customer_id").unique(),
    stripeSubscriptionId: text("stripe_subscription_id").unique(),
});

// for auditing and tracking changes
export const subscriptionHistory = pgTable("subscription_history", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    subscriptionId: text("subscription_id")
        .notNull()
        .references(() => subscriptions.id, { onDelete: "cascade" }),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    tier: varchar("tier", { length: 20 }).notNull(),
    status: varchar("status", { length: 20 }).notNull(),
    startDate: timestamp("start_date", { mode: "date" }).notNull(),
    endDate: timestamp("end_date", { mode: "date" }),
    changeDate: timestamp("change_date", { mode: "date" }).notNull().defaultNow(),
    reason: text("reason"),
});

// Usage tracking for quota management
export const subscriptionUsage = pgTable("subscription_usage", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    subscriptionId: text("subscription_id")
        .notNull()
        .references(() => subscriptions.id, { onDelete: "cascade" }),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    resourceType: varchar("resource_type", { length: 50 }).notNull(), // 'chat', 'message', etc.
    count: integer("count").notNull().default(0),
    period: varchar("period", { length: 20 }).notNull(), // 'hourly', 'daily', 'monthly'
    periodStart: timestamp("period_start", { mode: "date" }).notNull(),
    periodEnd: timestamp("period_end", { mode: "date" }).notNull(),
});

// Types
export type InsertSubscription = typeof subscriptions.$inferInsert;
export type SelectSubscription = typeof subscriptions.$inferSelect;

export type InsertSubscriptionHistory = typeof subscriptionHistory.$inferInsert;
export type SelectSubscriptionHistory = typeof subscriptionHistory.$inferSelect;

export type InsertSubscriptionUsage = typeof subscriptionUsage.$inferInsert;
export type SelectSubscriptionUsage = typeof subscriptionUsage.$inferSelect; 