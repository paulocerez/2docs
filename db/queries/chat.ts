import { db } from "../db";
import { eq } from "drizzle-orm";
import { chats, InsertChat, SelectChat } from "../schema/chats";

export async function createChat(chatData: InsertChat) {
	// destructuring the variable as returning () returns an array -> returns the first element/object of the array (that only has one element in total)
	const [newChat] = await db.insert(chats).values(chatData).returning();
	return newChat
  }

  export async function getAllChatsByUserId(userId: string): Promise<SelectChat[]> {
	return await db.select().from(chats).where(eq(chats.userId, userId))
  }

