import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";
import { getTotalMessagesPerUser } from "@/db/queries/message/message";

const isDev = process.env.NODE_ENV === 'development';

const DEFAULT_ABSOLUTE_LIMIT = isDev ? 100 : 100;
const DEFAULT_RATE_LIMIT = isDev ? 20 : 20;

const absoluteLimit = Number(process.env.MESSAGE_QUOTA_FREE_ABSOLUTE_LIMIT) || DEFAULT_ABSOLUTE_LIMIT;
const rateLimit = Number(process.env.MESSAGE_QUOTA_FREE_RATE_LIMIT) || DEFAULT_RATE_LIMIT;

export const messageRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(rateLimit, "1 h"),
  prefix: "message-rate",
  analytics: true,
  enableProtection: true,
});

export async function getMessageQuota(userId: string) {
  // Check absolute limit
  const totalMessages = await getTotalMessagesPerUser(userId);
  const remainingAbsolute = absoluteLimit - totalMessages;

  // Check rate limit without consuming a token
  const { remaining: remainingRate, reset } = await messageRateLimit.limit(userId);

  return {
    absolute: {
      limit: absoluteLimit,
      remaining: remainingAbsolute,
    },
    rate: {
      limit: rateLimit,
      remaining: remainingRate,
      reset: new Date(reset).toISOString(),
    }
  };
} 