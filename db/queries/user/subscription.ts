import { db } from "../../db";
import { eq, and } from "drizzle-orm";
import { subscriptions, subscriptionHistory, subscriptionUsage, SubscriptionTier, SubscriptionStatus, SelectSubscription } from "../../schema/subscriptions";

export async function getUserSubscriptionTier(userId: string): Promise<SubscriptionTier> {
    const [subscription] = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, userId));
    
    return subscription?.tier as SubscriptionTier || SubscriptionTier.FREE;
}

export async function getUserSubscription(userId: string): Promise<SelectSubscription | null> {
    const [subscription] = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, userId));

    return subscription;
}

export async function createSubscription(
    userId: string,
    tier: SubscriptionTier = SubscriptionTier.FREE,
    stripeCustomerId?: string,
    stripeSubscriptionId?: string
) {
    const [subscription] = await db
        .insert(subscriptions)
        .values({
            userId,
            tier,
            status: SubscriptionStatus.ACTIVE,
            startDate: new Date(),
            currentPeriodStart: new Date(),
            currentPeriodEnd: tier === SubscriptionTier.FREE ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            stripeCustomerId,
            stripeSubscriptionId,
        })
        .returning();

    // Record in history
    await db.insert(subscriptionHistory).values({
        subscriptionId: subscription.id,
        userId,
        tier,
        status: SubscriptionStatus.ACTIVE,
        startDate: subscription.startDate,
        reason: 'Initial subscription',
    });

    return subscription;
}

export async function updateSubscription(
    userId: string,
    tier: SubscriptionTier,
    stripeCustomerId: string,
    stripeSubscriptionId: string
) {
    const [subscription] = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, userId));

    if (subscription) {
        return await db
            .update(subscriptions)
            .set({
                tier,
                stripeCustomerId,
                stripeSubscriptionId,
                status: SubscriptionStatus.ACTIVE,
                currentPeriodStart: new Date(),
            })
            .where(eq(subscriptions.userId, userId))
            .returning();
    }

    return await db
        .insert(subscriptions)
        .values({
            userId,
            tier,
            stripeCustomerId,
            stripeSubscriptionId,
            status: SubscriptionStatus.ACTIVE,
        })
        .returning();
}

export async function cancelSubscription(userId: string) {
    return await db
        .update(subscriptions)
        .set({
            status: SubscriptionStatus.CANCELED,
            canceledAt: new Date(),
        })
        .where(eq(subscriptions.userId, userId))
        .returning();
}

export async function getSubscriptionUsage(
    userId: string,
    resourceType: string,
    period: string
): Promise<number> {
    const [usage] = await db
        .select({ count: subscriptionUsage.count })
        .from(subscriptionUsage)
        .where(and(
            eq(subscriptionUsage.userId, userId),
            eq(subscriptionUsage.resourceType, resourceType),
            eq(subscriptionUsage.period, period)
        ));

    return usage?.count || 0;
}

export async function incrementUsage(
    userId: string,
    subscriptionId: string,
    resourceType: string,
    period: string
) {
    const [existing] = await db
        .select()
        .from(subscriptionUsage)
        .where(and(
            eq(subscriptionUsage.userId, userId),
            eq(subscriptionUsage.resourceType, resourceType),
            eq(subscriptionUsage.period, period)
        ));

    if (existing) {
        return db
            .update(subscriptionUsage)
            .set({ count: existing.count + 1 })
            .where(eq(subscriptionUsage.id, existing.id))
            .returning();
    }

    return db
        .insert(subscriptionUsage)
        .values({
            userId,
            subscriptionId,
            resourceType,
            period,
            count: 1,
            periodStart: new Date(),
            periodEnd: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
        })
        .returning();
} 