import { db } from "../db";
import { chatApiLinks, InsertChatApiLink } from "../schema/chats";
import { eq } from "drizzle-orm";

export async function createChatApiLinks(chatId: string, links: string[]) {
	const values = links.map(link => ({ chatId, apiLink: link }))
	return await db.insert(chatApiLinks).values(values).returning();
}

export async function getChatApiLinks(chatId: string) {
	return await db.select().from(chatApiLinks).where(eq(chatApiLinks.chatId, chatId));
}