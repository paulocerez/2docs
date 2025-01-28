import { z } from 'zod';

const ALLOWED_PROTOCOL = 'https:';

const API_DOC_PATTERNS = [
    /\bapi\b/i,                    
    /\bdocs?\b/i,                  
    /\bswagger\b/i,                
    /\bopenapi\b/i,                
    /\breference\b/i,              
    /\bdeveloper\b/i,              
    /\bspecification\b/i,          
];

const ALLOWED_EXTENSIONS = [
    '.json',
    '.yaml',
    '.yml',
    '.md',
    '.html',
];

const BLOCKED_PATTERNS = [
    /\bphp\b/i,                    
    /\bexe\b/i,                    
    /\bshell\b/i,                  
    /\bcgi\b/i,                    
    /\badmin\b/i,                  
    /\blogin\b/i,                  
    /\bauth\b/i,                  
    /\bpassword\b/i,               
    /\btoken\b/i,                 
    /\bprivate\b/i,                
];

const urlSchema = z.string().url().refine((url) => {
    try {
        const parsedUrl = new URL(url);

        if (parsedUrl.protocol !== ALLOWED_PROTOCOL) {
            return false;
        }

        // Check for localhost and similar
        if (parsedUrl.hostname === 'localhost' || 
            parsedUrl.hostname === '127.0.0.1' || 
            parsedUrl.hostname.endsWith('.local') ||
            parsedUrl.hostname.endsWith('.internal')) {
            return false;
        }

        // Only default HTTPS port
        if (parsedUrl.port && parsedUrl.port !== '443') {
            return false;
        }

        // blocked patterns
        const fullUrl = parsedUrl.toString().toLowerCase();
        if (BLOCKED_PATTERNS.some(pattern => pattern.test(fullUrl))) {
            return false;
        }

        // file extension
        const hasValidExtension = ALLOWED_EXTENSIONS.some(ext => 
            parsedUrl.pathname.toLowerCase().endsWith(ext));

        // allowed URL patterns
        const hasApiDocPattern = API_DOC_PATTERNS.some(pattern => 
            pattern.test(parsedUrl.pathname) || pattern.test(parsedUrl.hostname));

        // either valid extension or API doc pattern
        return hasValidExtension || hasApiDocPattern;

    } catch {
        return false;
    }
}, 'Invalid or potentially unsafe API documentation URL. Only HTTPS URLs are allowed.');

export interface URLValidationResult {
    isValid: boolean;
    error?: string;
}

export function validateApiDocumentationUrl(url: string): URLValidationResult {
    try {
        urlSchema.parse(url);
        return { isValid: true };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                isValid: false,
                error: error.errors[0].message
            };
        }
        return {
            isValid: false,
            error: 'Invalid URL format. Only HTTPS URLs are allowed.'
        };
    }
}

export function sanitizeUrl(url: string): string {
    try {
        const parsed = new URL(url);
        if (parsed.protocol !== ALLOWED_PROTOCOL) {
            throw new Error('Only HTTPS URLs are allowed');
        }
        // Ensure the URL is properly encoded
        return parsed.toString();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Invalid URL format');
    }
} 