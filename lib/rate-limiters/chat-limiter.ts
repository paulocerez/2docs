import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

// Create a new rate limiter instance for chats
export const chatRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "24h"),
  prefix: "ratelimit:chat",
});

// Helper function to get remaining chat quota
export async function getChatQuota(userId: string) {
  const identifier = `chat:${userId}`;
  const currentCount = await redis.get<number>(`ratelimit:chat:${identifier}`) || 0;
  const remaining = Math.max(0, 10 - currentCount);
  
  return {
    limit: 10,
    remaining,
    reset: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };
} 