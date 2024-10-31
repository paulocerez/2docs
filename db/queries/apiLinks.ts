import { db } from "../db";
import { chatApiLinks, InsertChatApiLink } from "../schema/chats";

export async function createChatApiLinks(data: InsertChatApiLink) {
	await db.insert(chatApiLinks).values(data);
}