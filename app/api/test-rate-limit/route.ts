import { withRateLimit } from '@/middleware/rate-limit'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const rateLimitResponse = await withRateLimit(request)
  if (rateLimitResponse) return rateLimitResponse

  return NextResponse.json({ 
    message: 'Request successful',
    timestamp: new Date().toISOString()
  }, { status: 200 })
} 