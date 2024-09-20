import { createMessage, getAllMessagesForChat } from "@/db/queries/messages";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { chatId: string } }
): Promise<NextResponse> {
  const chatId = params.chatId;

  if (!chatId) {
    return NextResponse.json({ error: "Chat Id is not provided" }, { status: 400 });
  }
  const result = await getAllMessagesForChat(chatId);
  return NextResponse.json(result, { status: 200 });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { chatId: string } }
): Promise<NextResponse> {
  const chatId = params.chatId;
  const data = await request.json();

  if (!chatId || !data.content || !data.role) {
    return NextResponse.json({ error: "chatId, content, and role are required" }, { status: 400 });
  }
  const result = await createMessage({ ...data, chatId });
  return NextResponse.json(result, { status: 201 });
}