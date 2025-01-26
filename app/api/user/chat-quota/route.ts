import { NextResponse } from "next/server";
import { getChatQuota } from "@/lib/rate-limiters/chat-limiter";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const quota = await getChatQuota(session.user.id);
  return NextResponse.json(quota);
} 