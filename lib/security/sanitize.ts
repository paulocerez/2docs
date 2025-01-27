import DOMPurify from 'isomorphic-dompurify';
import { z } from 'zod';

// Validation schemas
export const linkSchema = z.string().url().max(500);
export const titleSchema = z.string().min(1).max(255).trim();
export const promptSchema = z.string().min(1).max(2000).trim();
export const messageSchema = z.string().min(1).max(4000).trim();
export const emailSchema = z.string().email().max(255);
export const searchQuerySchema = z.string().max(500).trim();
export const userNameSchema = z.string().min(1).max(100).trim();
export const commentSchema = z.string().max(1000).trim();
export const workflowTitleSchema = z.string().min(1).max(255).trim();
export const workflowDescriptionSchema = z.string().max(2000).trim();
export const tagSchema = z.string().max(50).trim();

export function sanitizeInput(input: string): string {
  // sanitize HTML
  const sanitizedHtml = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // strip HTML tags
    ALLOWED_ATTR: [], // strip attributes
  });
  
  // escape special characters
  return sanitizedHtml
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// schema validation and sanitization
export function validateAndSanitizeLink(input: string) {
  const parsed = linkSchema.parse(input);
  return sanitizeInput(parsed);
}

export function validateAndSanitizePrompt(input: string) {
  const parsed = promptSchema.parse(input);
  return sanitizeInput(parsed);
}

export function validateAndSanitizeMessage(input: string) {
  const parsed = messageSchema.parse(input);
  return sanitizeInput(parsed);
}

export function validateAndSanitizeTitle(input: string) {
  const parsed = titleSchema.parse(input);
  return sanitizeInput(parsed);
}

export function validateAndSanitizeEmail(input: string) {
  const parsed = emailSchema.parse(input);
  return sanitizeInput(parsed);
}

export function validateAndSanitizeSearchQuery(input: string) {
  const parsed = searchQuerySchema.parse(input);
  return sanitizeInput(parsed);
}

export function validateAndSanitizeUserName(input: string) {
  const parsed = userNameSchema.parse(input);
  return sanitizeInput(parsed);
}

export function validateAndSanitizeWorkflowTitle(input: string) {
  const parsed = workflowTitleSchema.parse(input);
  return sanitizeInput(parsed);
}

export function validateAndSanitizeWorkflowDescription(input: string) {
  const parsed = workflowDescriptionSchema.parse(input);
  return sanitizeInput(parsed);
}