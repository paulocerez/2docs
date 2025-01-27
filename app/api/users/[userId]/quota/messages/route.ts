import { NextRequest, NextResponse } from "next/server";
import { getMessageQuota } from "@/lib/rate-limiters/message-limiter";
import { auth } from "@/auth";
import { authorizeUser } from "@/lib/auth/authorize-user";

export async function GET(
	request: NextRequest,
	{ params }: { params: { userId: string } }
  ): Promise<NextResponse> {
  const session = await auth();
  
  const authError = await authorizeUser(session, params.userId, "access message quota");
  if (authError) return authError;

  const quota = await getMessageQuota(session!.user.id);
  return NextResponse.json(quota);
} 