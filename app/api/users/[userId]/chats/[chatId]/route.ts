import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { updateChatTitle, deleteChatById } from "@/db/queries/chat/chat";
import { authorizeUser } from "@/lib/auth/authorize-user";
export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string; chatId: string } }
): Promise<NextResponse> {
  const session = await auth();
  
	const authError = await authorizeUser(session, params.userId, "update chat title");
	if (authError) return authError;

  const body = await request.json();
  
  try {
    const result = await updateChatTitle(params.chatId, body.title);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error updating chat", error);
    return NextResponse.json({ error: "Could not update chat" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string; chatId: string } }
): Promise<NextResponse> {
  const session = await auth();
  
	const authError = await authorizeUser(session, params.userId, "delete chat");
	if (authError) return authError;

  try {
    const result = await deleteChatById(params.chatId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error deleting chat", error);
    return NextResponse.json({ error: "Could not delete chat" }, { status: 500 });
  }
} 