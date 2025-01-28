import { db } from "../../db";
import { desc, eq, and, count } from "drizzle-orm";
import { chatApiLinks, chats, InsertChat, messages, SelectChat } from "../../schema/chats";
import { apiDocumentations } from "../../schema/apis";
import { PgDatabase } from "drizzle-orm/pg-core";

export async function getAllChatsByUserId(userId: string): Promise<SelectChat[]> {
  return await db.select().from(chats).where(eq(chats.userId, userId)).orderBy(desc(chats.lastActivityAt));
}

export async function createChat(chatData: InsertChat) {
	const [chat] = await db.insert(chats).values({
		...chatData,
		lastActivityAt: new Date(),
	}).returning();

	// Create the initial message
	const [message] = await db.insert(messages).values({
		chatId: chat.id,
		content: chatData.prompt,
		role: 'user',
		timestamp: new Date(),
	}).returning();

	return { chat, message };
}

export async function getChatById(chatId: string): Promise<SelectChat | null> {
	const [result] = await db.select().from(chats).where(eq(chats.id, chatId));
  	return result || null;
}

export async function deleteChatById(chatId: string): Promise<SelectChat | undefined> {
	const [deletedChat] = await db.delete(chats).where(eq(chats.id, chatId)).returning();
	return deletedChat;
}	

export async function updateChatTitle(chatId: string, title: string) {
	const [updatedChat] = await db.update(chats).set({ title }).where(eq(chats.id, chatId)).returning();
	return updatedChat;
}

export async function createChatApiLinks(chatId: string, apiDocumentationIds: string[]) {
	const values = apiDocumentationIds.map(apiDocumentationId => ({ chatId, apiDocumentationId }));
	return await db.insert(chatApiLinks).values(values).returning();
}

export async function getChatApiLinks(chatId: string) {
	return await db.select().from(chatApiLinks).where(eq(chatApiLinks.chatId, chatId));
}

export async function getUserChatsWithMessagesAndApis(userId: string) {
	return await db
  .select({
    chat: chats,
    messages: messages,
    apiDocs: apiDocumentations,
  })
  .from(chats)
  .where(eq(chats.userId, userId))
  .leftJoin(messages, eq(chats.id, messages.chatId))
  .leftJoin(chatApiLinks, eq(chats.id, chatApiLinks.chatId))
  .leftJoin(apiDocumentations, eq(chatApiLinks.apiDocumentationId, apiDocumentations.id))
  .orderBy(desc(chats.lastActivityAt));
}

export async function getChatsByUserId(userId: string) {
	return await db.select().from(chats).where(eq(chats.userId, userId));
}

export async function getChatsByUserIdWithMessages(userId: string) {
	return await db.select().from(chats).where(eq(chats.userId, userId)).leftJoin(messages, eq(chats.id, messages.chatId));
}

export async function getChatsByUserIdWithMessagesAndApis(userId: string) {
	return await db.select().from(chats).where(eq(chats.userId, userId)).leftJoin(messages, eq(chats.id, messages.chatId)).leftJoin(chatApiLinks, eq(chats.id, chatApiLinks.chatId)).leftJoin(apiDocumentations, eq(chatApiLinks.apiDocumentationId, apiDocumentations.id));
}

export async function getChatOwnership(userId: string, chatId: string) {
	return await db.select().from(chats).where(and(eq(chats.id, chatId), eq(chats.userId, userId))).limit(1);
}

export async function getTotalChatsPerUser(userId: string) {
	const [result] = await db.select({ count: count() }).from(chats).where(eq(chats.userId, userId));
	return result?.count || 0;
}
