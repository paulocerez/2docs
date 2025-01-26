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
  const { remaining, reset } = await chatRateLimit.limit(identifier);
  
  return {
    limit: 10,
    remaining: Math.max(0, remaining),
    reset: new Date(reset).toISOString(),
  };
} 