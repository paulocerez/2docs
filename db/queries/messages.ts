import { db } from "../db";
import { eq } from "drizzle-orm";
import { InsertMessage, messages, SelectMessage } from "../schema/chats";

export async function createMessage(messageData: InsertMessage): Promise<InsertMessage> {
	// destructuring the variable as returning () returns an array -> returns the first element/object of the array (that only has one element in total)
	const [result] = await db.insert(messages).values(messageData).returning();
	return result
  }

  export async function getAllMessagesForChat(chatId: string): Promise<SelectMessage[]> {
	return await db.select().from(messages).where(eq(messages.chatId, chatId)).orderBy(messages.timestamp);
  }

