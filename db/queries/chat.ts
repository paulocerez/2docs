import { db } from "../client";
import { chatSessions, InsertChatSession } from "../schema";

export async function createChatSession(data: InsertChatSession) {
	await db.insert(chatSessions).values(data);
  }