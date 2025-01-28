import { auth } from "@/auth";
import { createMessage, getAllMessagesForChat } from "@/db/queries/message/message";
import { authorizeUser } from "@/lib/auth/authorize-user";
import { messageRateLimit } from "@/lib/rate-limiters/message-limiter";
import { validateAndSanitizeMessage } from "@/lib/security/sanitize";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getMessageQuota } from "@/lib/rate-limiters/message-limiter";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string; chatId: string } }
): Promise<NextResponse> {
  const session = await auth();
  
  const authError = await authorizeUser(session, params.userId, "access messages");
	if (authError) return authError;

  if (!params.chatId) {
    return NextResponse.json({ error: "Chat Id is not provided" }, { status: 400 });
  }

  try {
    const result = await getAllMessagesForChat(params.chatId);
	const validMessages = result.filter(message => message != null);

    return NextResponse.json(validMessages, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
} 

export async function POST(
	request: NextRequest,
	{ params }: { params: { userId: string, chatId: string } }
  ): Promise<NextResponse> {
	const session = await auth();
	
	const authError = await authorizeUser(session, params.userId, "create messages");
	if (authError) return authError;

	try {
		const identifier = `message:${params.userId}`;
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
	  
	  const sanitizedMessage = validateAndSanitizeMessage(prompt);
	  
	  const messageQuota = await getMessageQuota(params.userId);
	  if (messageQuota.absolute.remaining <= 0) {
		return NextResponse.json(
		  { error: "You have reached your total message limit" },
		  { status: 429 }
		);
	  }
	  if (messageQuota.rate.remaining <= 0) {
		return NextResponse.json(
		  { error: "You have reached your hourly message limit. Please try again later." },
		  { status: 429 }
		);
	  }
	  
	  const result = await createMessage({
		chatId: params.chatId, 
		content: sanitizedMessage, 
		role: "user" 
	  });
	  
	  return NextResponse.json(result, { status: 201 });
	} catch (error) {
	  if (error instanceof z.ZodError) {
		return NextResponse.json({ 
		  error: "Invalid message format",
		  details: error.errors 
		}, { status: 400 });
	  }
	  console.error("Error creating message:", error);
	  return NextResponse.json({ error: "Failed to create message" }, { status: 500 });
	}
  }