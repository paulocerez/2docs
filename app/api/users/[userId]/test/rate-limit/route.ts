import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { messageRateLimit } from "@/lib/rate-limiters/message-limiter";
import { authorizeUser } from "@/lib/auth/authorize-user";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const session = await auth();
  
  const authError = await authorizeUser(session, params.userId, "test rate limit");
  if (authError) return authError;

  const identifier = `message:${params.userId}`;
  const { success, remaining, reset, limit } = await messageRateLimit.limit(identifier);

  if (!success) {
    return NextResponse.json({
      error: "Rate limit exceeded",
      quota: { limit, remaining: 0, reset: new Date(reset).toISOString() }
    }, { status: 429 });
  }

  return NextResponse.json({
    message: "Request successful",
    quota: { limit, remaining, reset: new Date(reset).toISOString() }
  });
} 