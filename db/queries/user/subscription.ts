import { db } from "../../db";
import { eq, and, desc } from "drizzle-orm";
import { subscriptions, subscriptionHistory, subscriptionUsage, SubscriptionTier, SubscriptionStatus } from "../../schema/subscriptions";

export async function getUserSubscriptionTier(userId: string): Promise<SubscriptionTier> {
    const [subscription] = await db
        .select({ tier: subscriptions.tier })
        .from(subscriptions)
        .where(and(
            eq(subscriptions.userId, userId),
            eq(subscriptions.status, SubscriptionStatus.ACTIVE)
        ));
    
    return (subscription?.tier || SubscriptionTier.FREE) as SubscriptionTier;
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
    stripeCustomerId?: string,
    stripeSubscriptionId?: string
) {
    // Get current subscription
    const [currentSubscription] = await db
        .select()
        .from(subscriptions)
        .where(and(
            eq(subscriptions.userId, userId),
            eq(subscriptions.status, SubscriptionStatus.ACTIVE)
        ));

    if (!currentSubscription) {
        return createSubscription(userId, tier, stripeCustomerId, stripeSubscriptionId);
    }

    // Update subscription
    const [updatedSubscription] = await db
        .update(subscriptions)
        .set({
            tier,
            currentPeriodStart: new Date(),
            currentPeriodEnd: tier === SubscriptionTier.FREE ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            stripeCustomerId,
            stripeSubscriptionId,
        })
        .where(eq(subscriptions.id, currentSubscription.id))
        .returning();

    // Record in history
    await db.insert(subscriptionHistory).values({
        subscriptionId: currentSubscription.id,
        userId,
        tier,
        status: SubscriptionStatus.ACTIVE,
        startDate: new Date(),
        reason: `Upgraded to ${tier}`,
    });

    return updatedSubscription;
}

export async function cancelSubscription(userId: string, reason: string = 'User canceled') {
    const [subscription] = await db
        .update(subscriptions)
        .set({
            status: SubscriptionStatus.CANCELED,
            tier: SubscriptionTier.FREE,
            canceledAt: new Date(),
            endDate: new Date(),
            stripeSubscriptionId: null,
        })
        .where(and(
            eq(subscriptions.userId, userId),
            eq(subscriptions.status, SubscriptionStatus.ACTIVE)
        ))
        .returning();

    if (subscription) {
        await db.insert(subscriptionHistory).values({
            subscriptionId: subscription.id,
            userId,
            tier: SubscriptionTier.FREE,
            status: SubscriptionStatus.CANCELED,
            startDate: subscription.startDate,
            endDate: subscription.endDate,
            reason,
        });
    }

    return subscription;
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