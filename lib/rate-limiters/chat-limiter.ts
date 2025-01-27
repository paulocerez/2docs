import { redis } from "./redis";
import { db } from "@/db/db";
import { chats } from "@/db/schema/chats";
import { eq } from "drizzle-orm";

const CHAT_LIMIT = process.env.NODE_ENV === 'development' ? 100 : 10;

export async function getChatQuota(userId: string) {
  // Get current number of chats for the user
  const userChats = await db.select().from(chats).where(eq(chats.userId, userId));
  const currentCount = userChats.length;
  
  return {
    limit: CHAT_LIMIT,
    remaining: Math.max(0, CHAT_LIMIT - currentCount),
    total: currentCount
  };
} 