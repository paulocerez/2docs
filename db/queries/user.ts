import { db } from "../db";
import { InsertUser, users } from "../schema/users";
import { eq } from "drizzle-orm";


export async function createUser(data: InsertUser) {
	await db.insert(users).values(data);
  }

export async function getUserById(userId: string) {
	await db.select().from(users).where(eq(users.id, userId))
}