import { db } from "../db";
import { chatApiLinks } from "../schema/chats";
import { eq } from "drizzle-orm";

export async function createChatApiLinks(chatId: string, apiDocumentationIds: string[]) {
	const values = apiDocumentationIds.map(apiDocumentationId => ({ chatId, apiDocumentationId }))
	return await db.insert(chatApiLinks).values(values).returning();
}

export async function getChatApiLinks(chatId: string) {
	return await db.select().from(chatApiLinks).where(eq(chatApiLinks.chatId, chatId));
}