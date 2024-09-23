import { createChat, getAllChatsByUserId } from "@/db/queries/chat";
import { NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest): Promise<NextResponse> {
	// API route expects userId query parameter -> passes that parameter to the query function as an argument
	const { searchParams } = new URL(request.url);
	const userId = searchParams.get("userId")

	if (!userId) {
		return NextResponse.json({error: "User Id is not provided"}, { status: 400 })
	}

	const result = await getAllChatsByUserId(userId);
	return NextResponse.json(result, { status: 200 })
} 

export async function POST (request: NextRequest): Promise<NextResponse> {
	const data = await request.json()

	if (!data.userId || !data.prompt) {
		return NextResponse.json({ error: "userId and prompt are required" }, { status: 400 });
	  }

	const result = await createChat(data)
	return NextResponse.json(result, {status: 201 })
}

