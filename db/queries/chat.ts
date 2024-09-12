import { db } from "../client";
import { chatSessions, InsertChatSession } from "../schema";
import { eq } from "drizzle-orm"

export async function createChatSession(sessionData: InsertChatSession) {
	// destructuring the variable as returning () returns an array -> returns the first element/object of the array (that only has one element in total)
	const [newSession] = await db.insert(chatSessions).values(sessionData).returning();
	return newSession
  }

  export async function getChatSessionsByUserId(userId: number) {
	await db.select().from(chatSessions).where(eq(chatSessions.userId, userId))
  }

