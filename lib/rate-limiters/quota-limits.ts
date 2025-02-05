import { SubscriptionTier } from "@/db/schema/subscriptions";


interface QuotaLimits {
    absolute: number;
    rate: number;
}

export function getChatQuotaLimits(tier: SubscriptionTier): QuotaLimits {
    const isDev = process.env.NODE_ENV === 'development';

    switch (tier) {
        case SubscriptionTier.ENTERPRISE:
            return {
                absolute: Number(process.env.CHAT_QUOTA_ENTERPRISE_ABSOLUTE_LIMIT) || 500,
                rate: Number(process.env.CHAT_QUOTA_ENTERPRISE_RATE_LIMIT) || 50
            };
        case SubscriptionTier.PRO:
            return {
                absolute: Number(process.env.CHAT_QUOTA_PRO_ABSOLUTE_LIMIT) || 100,
                rate: Number(process.env.CHAT_QUOTA_PRO_RATE_LIMIT) || 20
            };
        case SubscriptionTier.FREE:
        default:
            return {
                absolute: Number(process.env.CHAT_QUOTA_FREE_ABSOLUTE_LIMIT) || (isDev ? 10 : 10),
                rate: Number(process.env.CHAT_QUOTA_FREE_RATE_LIMIT) || (isDev ? 5 : 5)
            };
    }
}

export function getMessageQuotaLimits(tier: SubscriptionTier): QuotaLimits {
    const isDev = process.env.NODE_ENV === 'development';

    switch (tier) {
        case SubscriptionTier.ENTERPRISE:
            return {
                absolute: Number(process.env.MESSAGE_QUOTA_ENTERPRISE_ABSOLUTE_LIMIT) || 5000,
                rate: Number(process.env.MESSAGE_QUOTA_ENTERPRISE_RATE_LIMIT) || 500
            };
        case SubscriptionTier.PRO:
            return {
                absolute: Number(process.env.MESSAGE_QUOTA_PRO_ABSOLUTE_LIMIT) || 1000,
                rate: Number(process.env.MESSAGE_QUOTA_PRO_RATE_LIMIT) || 100
            };
        case SubscriptionTier.FREE:
        default:
            return {
                absolute: Number(process.env.MESSAGE_QUOTA_FREE_ABSOLUTE_LIMIT) || (isDev ? 100 : 100),
                rate: Number(process.env.MESSAGE_QUOTA_FREE_RATE_LIMIT) || (isDev ? 20 : 20)
            };
    }
} 