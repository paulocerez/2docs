import { db } from "../db";
import { desc, eq } from "drizzle-orm";
import { chats, InsertChat, SelectChat } from "../schema/chats";

export async function getAllChatsByUserId(userId: string): Promise<SelectChat[]> {
  return await db.select().from(chats).where(eq(chats.userId, userId)).orderBy(desc(chats.lastActivityAt));
}
export async function createChat(chatData: InsertChat) {
	// destructuring the variable as returning () returns an array -> returns the first element/object of the array (that only has one element in total)
	const [result] = await db.insert(chats).values(chatData).returning();
	return result
  }

export async function getChatById(chatId: string): Promise<SelectChat | null> {
	const [result] = await db.select().from(chats).where(eq(chats.id, chatId));
  	return result || null;
}

export async function deleteChatById(chatId: string): Promise<SelectChat | undefined> {
	const [deletedChat] = await db.delete(chats).where(eq(chats.id, chatId)).returning();
	return deletedChat;
}