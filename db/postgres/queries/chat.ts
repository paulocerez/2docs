import { db } from "../db";
import { desc, eq } from "drizzle-orm";
import { chatApiLinks, chats, InsertChat, messages, SelectChat } from "../schema/chats";
import { apiDocumentations } from "../schema/apis";

export async function getAllChatsByUserId(userId: string): Promise<SelectChat[]> {
  return await db.select().from(chats).where(eq(chats.userId, userId)).orderBy(desc(chats.lastActivityAt));
}
export async function createChat(chatData: InsertChat, initialPrompt: string) {
	// destructuring the variable as returning () returns an array -> returns the first element/object of the array (that only has one element in total)
	const [chat] = await db.insert(chats).values(chatData).returning();
	const [message] = await db.insert(messages).values({
		chatId: chat.id,
		content: initialPrompt,
		role: 'user'
	}).returning();
	const result = { chat, message };
	return result;
  }

export async function getChatById(chatId: string): Promise<SelectChat | null> {
	const [result] = await db.select().from(chats).where(eq(chats.id, chatId));
  	return result || null;
}

export async function deleteChatById(chatId: string): Promise<SelectChat | undefined> {
	const [deletedChat] = await db.delete(chats).where(eq(chats.id, chatId)).returning();
	return deletedChat;
}

export async function createChatApiLinks(chatId: string, apiDocumentationIds: string[]) {
	const values = apiDocumentationIds.map(apiDocumentationId => ({ chatId, apiDocumentationId }))
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

