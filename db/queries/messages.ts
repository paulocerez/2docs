import { db } from "../db";
import { eq } from "drizzle-orm";
import { InsertMessage, messages, SelectMessage } from "../schema/chats";

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