import { createChat, getAllChatsByUserId } from "@/db/postgres/queries/chat";
import { NextRequest, NextResponse } from "next/server";

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
