import { createChat, deleteChatById, getAllChatsByUserId, getChatOwnership, updateChatTitle, createChatApiLinks } from "@/db/queries/chat/chat";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getChatQuota } from "@/lib/rate-limiters/chat-limiter";
import { validateAndSanitizeTitle, validateAndSanitizePrompt } from '@/lib/security/sanitize';
import { z } from 'zod';
import { authorizeUser } from "@/lib/auth/authorize-user";
import { chatRateLimit } from "@/lib/rate-limiters/chat-limiter";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse> {
  const session = await auth();
  
	const authError = await authorizeUser(session, params.userId, "access chats");
		if (authError) return authError;

  try {
    const result = await getAllChatsByUserId(params.userId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching chats", error);
    return NextResponse.json({ error: "Could not get chats" }, { status: 500 });
  }
} 

export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse> {
  const session = await auth();
  
  const authError = await authorizeUser(session, params.userId, "create chat");
  if (authError) return authError;

  // Check quotas with detailed logging
  const chatQuota = await getChatQuota(params.userId);

  if (chatQuota.absolute.remaining <= 0) {
    return NextResponse.json(
      { 
        error: "Total chat limit exceeded",
        details: {
          type: "absolute_limit",
          limit: chatQuota.absolute.limit,
          used: chatQuota.absolute.limit - chatQuota.absolute.remaining
        }
      },
      { status: 429 }
    );
  }
  
  const { success: chatRateLimitRemaining } = await chatRateLimit.limit(params.userId);
  if (!chatRateLimitRemaining) {
    return NextResponse.json(
      { 
        error: "Hourly chat limit exceeded",
        details: {
          type: "rate_limit",
          limit: chatQuota.rate.limit,
          reset: chatQuota.rate.reset,
        }
      },
      { status: 429 }
    );
  }

  try {
    const { prompt, title, workflowId, apiDocIds } = await request.json();
    const sanitizedTitle = validateAndSanitizeTitle(title);
    const sanitizedPrompt = validateAndSanitizePrompt(prompt);

    if (!workflowId) {
      console.error("No workflowId provided for chat creation");
      return NextResponse.json(
        { error: "workflowId is required" },
        { status: 400 }
      );
    }

    // Create the chat first
    const result = await createChat({
      userId: params.userId,
      title: sanitizedTitle,
      prompt: sanitizedPrompt,
      workflowId
    });

    if (apiDocIds?.length > 0) {
      try {
        await createChatApiLinks(result.chat.id, apiDocIds);
      } catch (linkError) {
        console.error("Error creating API links:", linkError);
        // Delete the chat if linking fails
        await deleteChatById(result.chat.id);
        throw linkError;
      }
    }
    return NextResponse.json({ chat: result.chat }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: "Invalid input format",
        details: error.errors 
      }, { status: 400 });
    }
    console.error("Error creating chat:", error);
    return NextResponse.json(
      { error: "Failed to create chat" },
      { status: 500 }
    );
  }
}

export async function PUT (
	request: NextRequest,
	{ params }: { params: { userId: string } }
): Promise<NextResponse> {
	const session = await auth();
	
	const authError = await authorizeUser(session, params.userId, "update chat");
	if (authError) return authError;

	const chatId = request.nextUrl.searchParams.get("chatId")
	if (!chatId) {
		return NextResponse.json({error: "Chat Id is not provided"}, { status: 400 })
	}	

	const body = await request.json();

	// verify if user owns this chat
	const chat = await getChatOwnership(params.userId, chatId);

	if (!chat || chat[0].userId !== params.userId) {
		return NextResponse.json(
			{ error: "Unauthorized: You don't have permission to modify this chat" }, 
			{ status: 403 }
		);
	}

	try {
		const result = await updateChatTitle(chatId, body.title);
		return NextResponse.json(result, { status: 200 })
	} catch (error) {
		console.error("Error updating chat", error)
		return NextResponse.json({ error: "Could not update chat"}, { status: 500 })
	}
}

export async function DELETE (request: NextRequest,
	{ params }: { params: { userId: string } }
): Promise<NextResponse> {
	const session = await auth();
	
	const authError = await authorizeUser(session, params.userId, "delete chat");
	if (authError) return authError;

	const chatId = request.nextUrl.searchParams.get("chatId")
	if (!chatId) {
		return NextResponse.json({error: "Chat Id is not provided"}, { status: 400 })
	}

	const chat = await getChatOwnership(params.userId, chatId);

	if (!chat || chat[0].userId !== params.userId) {
		return NextResponse.json(
			{ error: "Unauthorized: You don't have permission to delete this chat" }, 
			{ status: 403 }
		);
	}

	try {
		const result = await deleteChatById(chatId);
		return NextResponse.json(result, { status: 200 })
	} catch (error) {
		console.error("Error deleting chat", error)
		return NextResponse.json({ error: "Could not delete chat"}, { status: 500 })
	}
}