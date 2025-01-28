import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getWorkflowByChatId } from "@/db/queries/workflow/getWorkflow";
import { authorizeUser } from "@/lib/auth/authorize-user";
import { chatRateLimit } from "@/lib/rate-limiters/chat-limiter";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string; chatId: string } }
) {
  const session = await auth();
	
	const authError = await authorizeUser(session, params.userId, "access workflow");
	if (authError) return authError;

  try {
    const workflow = await getWorkflowByChatId(params.chatId);

    return NextResponse.json(workflow, { status: 200 });
  } catch (error) {
    console.error("Error fetching workflow:", error);
    return NextResponse.json(
      { error: "Failed to fetch workflow" },
      { status: 500 }
    );
  }
} 