import { createMessage, getAllMessagesForChat } from "@/db/postgres/queries/message";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
	const { id: chatId } = await params

  if (!chatId) {
    return NextResponse.json({ error: "Chat Id is not provided" }, { status: 400 });
  }

  try {
	  const result = await getAllMessagesForChat(chatId);
	  const validMessages = result.filter(message => message != null);
    return NextResponse.json(validMessages, { status: 200 });
  } catch (error) {
	console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
	const { id: chatId } = await params
  try {
	  const data = await request.json();

	  if (!chatId || !data.content ||!data.role) {
		return NextResponse.json({ error: "chatId, content, and role are required" }, { status: 400 });
	  }
		const result = await createMessage({ ...data, chatId });
		return NextResponse.json(result, { status: 201 });

  } catch (error) {
	console.error("Error creating message:", error);
    return NextResponse.json({ error: "Failed to create message" }, { status: 500 });
}
}