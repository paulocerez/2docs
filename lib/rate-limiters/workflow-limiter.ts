import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import { redis } from './redis';

const isDev = process.env.NODE_ENV === 'development'

// Create a rate limiter instance with specific limits
export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(
    isDev ? 100 : 10, // Higher limit in development
    isDev ? '1h' : '24h'
  ),
  analytics: true,
  prefix: isDev ? 'dev_ratelimit' : 'prod_ratelimit',
})

// Rate limiting function for workflow generation
export async function checkWorkflowGenerationLimit(userId: string, isTest = false) {
  // Use a specific test user ID for testing
  const effectiveUserId = isTest ? 'test-user-123' : userId;
  
  const result = await rateLimiter.limit(`workflow_gen_${effectiveUserId}`)
  
  console.log('Rate limit check:', {
    userId: effectiveUserId,
    success: result.success,
    remaining: result.remaining,
    reset: new Date(result.reset).toISOString(),
    currentTime: new Date().toISOString()
  })

  return {
    success: result.success,
    limit: result.limit,
    reset: result.reset,
    remaining: result.remaining,
    error: result.success ? null : {
      code: 429,
      message: `Rate limit exceeded. Try again in ${Math.ceil(
        (result.reset - Date.now()) / 1000 / 60
      )} minutes. Daily limit: ${result.limit} workflows.`
    }
  }
}

export async function getWorkflowQuota(userId: string) {
  const identifier = `workflow:${userId}`;
  const currentCount = await redis.get<number>(`ratelimit:workflow:${identifier}`) || 0;
  const remaining = Math.max(0, 10 - currentCount);
  
  return {
    limit: 10,
    remaining,
    reset: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };
} 