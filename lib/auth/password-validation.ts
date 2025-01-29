export interface PasswordRequirement {
    message: string;
    validator: (password: string) => boolean;
}

export const passwordRequirements: PasswordRequirement[] = [
    {
        message: "At least 8 characters long",
        validator: (password: string) => password.length >= 8
    },
    {
        message: "Contains at least one uppercase letter",
        validator: (password: string) => /[A-Z]/.test(password)
    },
    {
        message: "Contains at least one lowercase letter",
        validator: (password: string) => /[a-z]/.test(password)
    },
    {
        message: "Contains at least one number",
        validator: (password: string) => /\d/.test(password)
    },
    {
        message: "Contains at least one special character (!@#$%^&*)",
        validator: (password: string) => /[!@#$%^&*]/.test(password)
    }
];

export function validatePassword(password: string): boolean {
    return passwordRequirements.every(req => req.validator(password));
}

export function getPasswordStrength(password: string): number {
    if (!password) return 0;
    return passwordRequirements.filter(req => req.validator(password)).length / passwordRequirements.length;
} 