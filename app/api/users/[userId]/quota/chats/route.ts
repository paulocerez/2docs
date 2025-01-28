import { NextRequest, NextResponse } from "next/server";
import { getChatQuota } from "@/lib/rate-limiters/chat-limiter";
import { auth } from "@/auth";
import { authorizeUser } from "@/lib/auth/authorize-user";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse> {
  const session = await auth();
  
  const authError = await authorizeUser(session, params.userId, "access chat quota");
  if (authError) return authError;

  const quota = await getChatQuota(params.userId);
  return NextResponse.json(quota);
} 