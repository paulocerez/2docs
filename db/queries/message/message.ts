import { db } from "../../db";
import { count, eq } from "drizzle-orm";
import { chats, InsertMessage, messages, SelectMessage } from "../../schema/chats";

export async function getAllMessagesForChat(chatId: string): Promise<SelectMessage[]> {
  try {
    const result = await db
      .select()
      .from(messages)
      .where(eq(messages.chatId, chatId))
      .orderBy(messages.timestamp);
	  
    return result;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw new Error("Failed to fetch messages");
  }
}

export async function createMessage(messageData: InsertMessage): Promise<SelectMessage> {
	try {
	  const [result] = await db.insert(messages).values(messageData).returning();
	  return result;
	} catch (error) {
	  console.error("Error creating message:", error);
	  throw new Error("Failed to create message");
	}
  }

export async function getTotalMessagesPerUser(userId: string) {
	const [result] = await db
		.select({ count: count() })
		.from(messages)
		.leftJoin(chats, eq(messages.chatId, chats.id))
		.where(eq(chats.userId, userId));

	return result?.count || 0;
}
