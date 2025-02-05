import { InsertEmailPassword } from '@/db/schema/users';
import { createEmailPassword, createUserByEmail, deleteEmailPasswordUser, getCredentials, getUserByEmail, resetFailedLoginAttempts, updateFailedLoginAttempts } from '@/db/queries/user/user';
import { hashPassword, verifyPassword } from './password';

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds

export class EmailAuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EmailAuthError';
    }
}

export async function createEmailUser(email: string, password: string, name?: string) {
    // Check if email already exists
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        throw new EmailAuthError('Email already exists');
    }

    // Create user first
    const user = await createUserByEmail(email, name);

    try {
        // Hash password and create email credentials
        const hashedPassword = await hashPassword(password);
        await createEmailPassword(user.id, hashedPassword);

        return user;
    } catch (error) {
        // If creating email password fails, delete the user
        await deleteEmailPasswordUser(user.id);
        throw error;
    }
}

export async function verifyEmailLogin(email: string, password: string) {
    // Get user and password info
    const user = await getUserByEmail(email);

    if (!user || !user.hasPassword) {
        throw new EmailAuthError('Invalid email or password');
    }

    const credentials = await getCredentials(user.id);

    if (!credentials) {
        throw new EmailAuthError('Invalid email or password');
    }

    // Check if account is locked
    if (credentials.lockedUntil && credentials.lockedUntil > new Date()) {
        throw new EmailAuthError('Account is locked. Please try again later');
    }

    // Verify password
    const isValid = await verifyPassword(password, credentials.hashedPassword);

    // Handle failed login attempts
    if (!isValid) {
        const failedAttempts = credentials.failedLoginAttempts + 1;
        const updates: Partial<InsertEmailPassword> = {
            failedLoginAttempts: failedAttempts,
            lastFailedLogin: new Date(),
        };

        // Lock account if too many failed attempts
        if (failedAttempts >= MAX_LOGIN_ATTEMPTS) {
            updates.lockedUntil = new Date(Date.now() + LOCK_TIME);
        }

        await updateFailedLoginAttempts(user.id, failedAttempts);

        throw new EmailAuthError('Invalid email or password');
    }

    // Reset failed attempts on successful login
    if (credentials.failedLoginAttempts > 0) {
        await resetFailedLoginAttempts(user.id);
    }

    return user;
}