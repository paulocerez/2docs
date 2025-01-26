import { createMessage, getAllMessagesForChat } from "@/db/postgres/queries/message/message";
import { NextRequest, NextResponse } from "next/server";
import { messageRateLimit } from "@/lib/rate-limiters/message-limiter";
import { auth } from "@/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { chatId: string } }
): Promise<NextResponse> {
	const { chatId } = await params

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
	{ params }: { params: { chatId: string } }
  ): Promise<NextResponse> {
	const { chatId } = await params;
	try {
		const session = await auth();
		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const identifier = `message:${session.user.id}`;
		const { success, remaining, reset, limit } = await messageRateLimit.limit(identifier);
		
		if (!success) {
			return NextResponse.json({
				error: "Message quota exceeded",
				quota: { limit, remaining: 0, reset: new Date(reset).toISOString() }
			}, { status: 429 });
		}

		const { prompt } = await request.json();
		if (!prompt) {
		return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
	  }
	  const result = await createMessage({chatId, content: prompt, role: "user" });
	  return NextResponse.json(result, { status: 201 });
	} catch (error) {
	  console.error("Error creating message:", error);
	  return NextResponse.json({ error: "Failed to create message" }, { status: 500 });
	}
  }