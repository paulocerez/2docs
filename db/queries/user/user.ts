import { db } from "../../db";
import { accounts, emailPasswords, InsertAccount, InsertUser, users } from "../../schema/users";
import { and, eq, gt } from "drizzle-orm";


export async function createUser(data: InsertUser) {
	await db.insert(users).values(data);
  }

export async function getUserById(userId: string) {
	await db.select().from(users).where(eq(users.id, userId))
}

export async function getUserNameAndImageByUserId(userId: string) {
	return await db.select({ id: users.id, name: users.name, image: users.image}).from(users).where(eq(users.id, userId)).then(res => res[0])
}

export async function getUserByEmail(email: string) {
	const [result] = await db.select().from(users).where(eq(users.email, email)).limit(1)
	return result
}

export async function createUserByEmail(email: string, name?: string, id?: string) {
	const [result] = await db.insert(users).values({ email, name: name || email.split('@')[0], hasPassword: true }).returning()
	return result
}

export async function createEmailPassword(userId: string, hashedPassword: string) {
	const [result] = await db.insert(emailPasswords).values({ userId, hashedPassword }).returning()
	return result
}

export async function deleteEmailPasswordUser(userId: string) {
	await db.delete(emailPasswords).where(eq(emailPasswords.userId, userId))
	await db.delete(users).where(eq(users.id, userId))
}


export async function getCredentials(userId: string) {
	const [result] = await db.select().from(emailPasswords).where(eq(emailPasswords.userId, userId)).limit(1)
	return result
}

export async function updateEmailPassword(userId: string, hashedPassword: string) {
	await db.update(emailPasswords).set({ hashedPassword,
		passwordResetToken: null,
		passwordResetExpires: null,
		passwordUpdatedAt: new Date(),
		failedLoginAttempts: 0,
		lastFailedLogin: null,
		lockedUntil: null, }).where(eq(emailPasswords.userId, userId))
}

export async function updateFailedLoginAttempts(userId: string, attempts: number) {
	await db.update(emailPasswords).set({ failedLoginAttempts: attempts, lastFailedLogin: new Date() }).where(eq(emailPasswords.userId, userId))
}

export async function resetFailedLoginAttempts(userId: string) {
	await db.update(emailPasswords).set({ failedLoginAttempts: 0, lastFailedLogin: null, lockedUntil: null }).where(eq(emailPasswords.userId, userId))
}

export async function updateResetToken(userId: string, resetToken: string, resetExpires: Date) {
	await db.update(emailPasswords).set({ passwordResetToken: resetToken, passwordResetExpires: resetExpires }).where(eq(emailPasswords.userId, userId))
}

export async function getResetToken(token: string) {
	const [result] = await db
        .select()
        .from(emailPasswords)
        .where(
            and(
                eq(emailPasswords.passwordResetToken, token),
                gt(emailPasswords.passwordResetExpires, new Date())
            )
        )
        .limit(1);
	return result
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