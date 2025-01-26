import { createChat, getAllChatsByUserId } from "@/db/postgres/queries/chat/chat";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { chatRateLimit } from "@/lib/rate-limiters/chat-limiter";

export async function GET (request: NextRequest): Promise<NextResponse> {
	const userId = request.nextUrl.searchParams.get("userId")
	
	if (!userId) {

		return NextResponse.json({error: "User Id is not provided"}, { status: 400 })
	}
	try {
		const result = await getAllChatsByUserId(userId);
		return NextResponse.json(result, { status: 200 })
	} catch (error) {
		console.error("Error fetching chats", error)
		return NextResponse.json({ error: "Could not get chats"}, { status: 500 })
	}
} 

export async function POST (request: NextRequest): Promise<NextResponse> {
	const session = await auth();
	
	if (!session?.user?.id) {
		return new NextResponse("Unauthorized", { status: 401 });
	}

	// Check rate limit before creating chat
	const identifier = `chat:${session.user.id}`;
	const { success, remaining, reset, limit } = await chatRateLimit.limit(identifier);
	
	if (!success) {
		return NextResponse.json(
			{
				error: "Chat quota exceeded",
				quota: { limit, remaining: 0, reset: new Date(reset).toISOString() },
			},
			{ status: 429 }
		);
	}

	const body = await request.json();
	try {
		const result = await createChat(body);
		return NextResponse.json(result, { status: 201 })
	} catch (error) {
		console.error("Error creating chat", error)
		return NextResponse.json({ error: "Could not create chat"}, { status: 500 })
	}
}