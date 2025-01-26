import { NextResponse } from "next/server";
import { getMessageQuota } from "@/lib/rate-limiters/message-limiter";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const quota = await getMessageQuota(session.user.id);
  return NextResponse.json(quota);
} 