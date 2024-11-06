import { db } from "../db";
import { chatApiLinks, InsertChatApiLink } from "../schema/chats";
import { eq } from "drizzle-orm";

export async function createChatApiLinks(data: InsertChatApiLink) {
	const { chatId, apiLink } = data;
	return await db.insert(chatApiLinks).values({ chatId, apiLink }).returning();
}

export async function getChatApiLinks(chatId: string) {
	return await db.select().from(chatApiLinks).where(eq(chatApiLinks.chatId, chatId));
}