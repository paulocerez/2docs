import { describe, it, expect } from 'vitest'
import { checkWorkflowGenerationLimit } from '@/lib/rate-limiters/workflow-limiter'

describe('Rate Limiter', () => {
  const testUserId = 'test-user-123'

  it('should allow requests within limit', async () => {
    const result = await checkWorkflowGenerationLimit(testUserId)
    expect(result.success).toBe(true)
    expect(result.remaining).toBeLessThan(result.limit)
  })

  it('should block requests when limit exceeded', async () => {
    for (let i = 0; i < 10; i++) {
      await checkWorkflowGenerationLimit(testUserId)
    }

    const result = await checkWorkflowGenerationLimit(testUserId)
    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
    expect(result.error?.code).toBe(429)
  })
}) 