import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

const isDev = process.env.NODE_ENV === 'development';

export const messageRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(
    isDev ? 1000 : 100, // 100 messages per hour in production
    '1h'
  ),
  prefix: isDev ? 'dev_ratelimit:message' : 'ratelimit:message',
});

export async function getMessageQuota(userId: string) {
  const identifier = `message:${userId}`;
  const { remaining, reset, limit } = await messageRateLimit.limit(identifier);
  
  return {
    limit,
    remaining: Math.max(0, remaining),
    reset: new Date(reset).toISOString(),
  };
} 