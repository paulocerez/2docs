import { db } from "../../db";
import { accounts, InsertAccount, InsertUser, users } from "../../schema/users";
import { and, eq } from "drizzle-orm";


export async function createUser(data: InsertUser) {
	await db.insert(users).values(data);
  }

export async function getUserById(userId: string) {
	await db.select().from(users).where(eq(users.id, userId))
}

export async function getUserNameAndImageByUserId(userId: string) {
	return await db.select({ id: users.id, name: users.name, image: users.image}).from(users).where(eq(users.id, userId)).then(res => res[0])
}

export async function getGoogleAccountByUserId(userId: string) {
	const [result] = await db
        .select()
        .from(accounts)
        .where(
          and(
            eq(accounts.userId, userId),
            eq(accounts.provider, "google")
          )
        )
        .limit(1)
    return result
}

export async function updateGoogleAccessToken(userId: string, data: Partial<InsertAccount>) {
	await db.update(accounts).set(data).where(and(eq(accounts.userId, userId), eq(accounts.provider, "google")))
}