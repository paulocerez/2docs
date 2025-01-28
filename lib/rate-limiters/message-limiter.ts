import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";
import { getTotalMessagesPerUser } from "@/db/queries/message/message";

// Time-based rate limit: 20 messages per hour
export const messageRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(50, "1 h"),
  prefix: "message-rate",
  analytics: true,
  enableProtection: true,
});

const isDev = process.env.NODE_ENV === 'development'
export async function getMessageQuota(userId: string) {
  // Check absolute limit
  const totalMessages = await getTotalMessagesPerUser(userId)
  const absoluteLimit = isDev ? 500 : 50; 
  const remainingAbsolute = absoluteLimit - totalMessages;

  // Check rate limit
  const { remaining: remainingRate, reset } = await messageRateLimit.limit(userId);

  return {
    absolute: {
      limit: absoluteLimit,
      remaining: remainingAbsolute,
    },
    rate: {
      limit: 50, // per hour
      remaining: remainingRate,
      reset: new Date(reset).toISOString(),
    }
  };
} 