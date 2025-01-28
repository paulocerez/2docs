import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/rate-limiters/redis";
import { getTotalChatsPerUser } from "@/db/queries/chat/chat";

const isDev = process.env.NODE_ENV === 'development';

const DEFAULT_ABSOLUTE_LIMIT = isDev ? 10 : 10;
const DEFAULT_RATE_LIMIT = isDev ? 5 : 5;

const absoluteLimit = Number(process.env.CHAT_QUOTA_FREE_ABSOLUTE_LIMIT) || DEFAULT_ABSOLUTE_LIMIT;
const rateLimit = Number(process.env.CHAT_QUOTA_FREE_RATE_LIMIT) || DEFAULT_RATE_LIMIT;

// Time-based rate limit: 5 chats per hour for free tier
export const chatRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(rateLimit, "1 h"),
  prefix: "chat-rate",
  analytics: true,
  enableProtection: true,
});

export async function getChatQuota(userId: string) {
  // Check absolute limit
  const totalChats = await getTotalChatsPerUser(userId);
  const remainingAbsolute = absoluteLimit - totalChats;

  // Check rate limit without consuming a token
  const { remaining: remainingRate, reset } = await chatRateLimit.limit(userId);

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