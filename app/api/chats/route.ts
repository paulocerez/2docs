import { createChat, getAllChatsByUserId } from "@/db/queries/chat";
import withErrorHandling from "@/utils/withErrorHandling";
import { NextRequest, NextResponse } from "next/server";

async function getAllChatsHandler (request: NextRequest): Promise<NextResponse> {
	// API route expects userId query parameter -> passes that parameter to the query function as an argument
	const { searchParams } = new URL(request.url);
	const userId = searchParams.get("userId")

	if (!userId) {
		return NextResponse.json({error: "User Id is not provided"}, { status: 400 })
	}

	const result = await getAllChatsByUserId(userId);
	return NextResponse.json(result)
} 

// async function postChatHandler (request: NextRequest): Promise<NextResponse> {
// 	const data = request.json()
// 		const result = await createChat(data)
// 		return NextResponse.json({ }, {status: 200})
// }

export const GET = withErrorHandling(getAllChatsHandler)
// export const POST = withErrorHandling(postChatHandler)