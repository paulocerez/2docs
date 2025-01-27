import { createChat, deleteChatById, getAllChatsByUserId, getChatOwnership, updateChatTitle } from "@/db/queries/chat/chat";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getChatQuota } from "@/lib/rate-limiters/chat-limiter";
import { validateAndSanitizeTitle, validateAndSanitizePrompt, validateAndSanitizeLink } from '@/lib/security/sanitize';
import { z } from 'zod';
import { authorizeUser } from "@/lib/auth/authorize-user";

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

  const quota = await getChatQuota(session!.user.id);
  if (quota.remaining === 0) {
    return NextResponse.json({
      error: "Chat quota exceeded",
      quota: {
        limit: quota.limit,
        remaining: 0,
        total: quota.total
      }
    }, { status: 429 });
  }

  const body = await request.json();
  try {
    // Validate and sanitize inputs
    const sanitizedTitle = validateAndSanitizeTitle(body.title);
    const sanitizedPrompt = validateAndSanitizePrompt(body.prompt);
    const sanitizedLinks = body.apiDocIds.map((link: string) => 
      validateAndSanitizeLink(link)
    );
    
    const result = await createChat({
      ...body,
      title: sanitizedTitle,
      prompt: sanitizedPrompt,
      apiDocIds: sanitizedLinks
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: "Invalid input format",
        details: error.errors 
      }, { status: 400 });
    }
    console.error("Error creating chat", error);
    return NextResponse.json({ error: "Could not create chat"}, { status: 500 });
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