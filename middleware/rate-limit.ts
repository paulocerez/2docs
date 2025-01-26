import { NextResponse } from 'next/server'
import { checkWorkflowGenerationLimit } from '@/lib/rate-limiters/workflow-limiter'
import { auth } from '@/auth'

export async function withRateLimit(request: Request) {
  // check for test mode
  const isTest = request.headers.get('x-test-mode') === 'true'
  
  if (!isTest) {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      )
    }

    const rateLimit = await checkWorkflowGenerationLimit(userId)
    if (!rateLimit.success) {
      return new NextResponse(
        JSON.stringify({ 
          error: rateLimit.error?.message,
          reset: rateLimit.reset,
          limit: rateLimit.limit,
          remaining: rateLimit.remaining
        }),
        { status: 429 }
      )
    }
  } else {
    // test mode rate limiting
    const rateLimit = await checkWorkflowGenerationLimit('test-user-123', true)
    if (!rateLimit.success) {
      return new NextResponse(
        JSON.stringify({ 
          error: rateLimit.error?.message,
          reset: rateLimit.reset,
          limit: rateLimit.limit,
          remaining: rateLimit.remaining
        }),
        { status: 429 }
      )
    }
  }

  return null
} 