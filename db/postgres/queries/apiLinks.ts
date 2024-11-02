import { db } from "../db";
import { chatApiLinks, InsertChatApiLink } from "../schema/chats";
import { eq } from "drizzle-orm";

export async function createChatApiLinks(data: InsertChatApiLink) {
	return await db.insert(chatApiLinks).values(data).returning();
}

export async function getChatApiLinks(chatId: string) {
	return await db.select().from(chatApiLinks).where(eq(chatApiLinks.chatId, chatId));
}