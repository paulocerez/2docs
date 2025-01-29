import { getResetToken, updateResetToken, updateEmailPassword, getUserByEmail } from "@/db/queries/user/user";
import { EmailAuthError } from "./email-auth";
import { randomBytes } from "crypto";
import { hashPassword } from "./password";

export async function initiatePasswordReset(email: string) {
    const user = await getUserByEmail(email);

    if (!user || !user.hasPassword) {
        throw new EmailAuthError('No account found with this email');
    }

    // Generate reset token
    const resetToken = randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour

    await updateResetToken(user.id, resetToken, resetExpires);

    return resetToken;
}

export async function resetPassword(token: string, newPassword: string) {
    const credentials = await getResetToken(token);

    if (!credentials) {
        throw new EmailAuthError('Invalid or expired reset token');
    }

    const hashedPassword = await hashPassword(newPassword);

    await updateEmailPassword(credentials.userId, hashedPassword);
} 