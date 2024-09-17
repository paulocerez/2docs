import { db } from "../db";
import { InsertUser, users } from "../schema/users";
import { eq, and } from "drizzle-orm"

export async function createUser(data: InsertUser) {
	await db.insert(users).values(data);
  }

export async function getUserById(id: number) {
	await db.select().from(users).where(eq(users.id, id))
}

// export async function deleteUser(id: number) {
// 	await db.
// }