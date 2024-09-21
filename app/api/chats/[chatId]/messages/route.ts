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

  try {
	  const result = await getAllMessagesForChat(chatId);
	  console.log("Messages fetched from database:", result);
	  return NextResponse.json(result, { status: 200 }); // returns Array containing multiple SelectMessage objects
  } catch (error) {
	console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { chatId: string } }
): Promise<NextResponse> {
  const chatId = params.chatId;
  try {
	  const data = await request.json();
	  console.log(data)

	  if (!chatId || !data.content) {
		return NextResponse.json({ error: "chatId, content, and role are required" }, { status: 400 });
	  }
		const result = await createMessage({ ...data, chatId });
		return NextResponse.json(result, { status: 201 });

  } catch (error) {
	console.error("Error creating message:", error);
    return NextResponse.json({ error: "Failed to create message" }, { status: 500 });
}
}