import { checkWorkflowGenerationLimit } from '@/lib/rate-limiters/workflow-limiter'
import { auth } from '@/auth'

export async function GET() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const quota = await checkWorkflowGenerationLimit(userId)
  
  return Response.json({
    limit: quota.limit,
    remaining: quota.remaining,
    reset: quota.reset
  })
} 