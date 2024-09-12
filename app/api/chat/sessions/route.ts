import { createChatSession } from "@/db/queries/chat";
import { InsertChatSession } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

// Insert session into database
export async function POST (request: NextRequest) {
	const sessionData: InsertChatSession = await request.json();
	if(!sessionData.userId || !sessionData.prompt) {
		return NextResponse.json({ error: "Mssing required fields"}, { status: 400})
	}
	try {
		const newChatSession = await createChatSession(sessionData)
		return NextResponse.json({newChatSession}, { status: 200})
	} catch (error) {
		console.error("Failed to create chat session:", error)
		return NextResponse.json({ error: "Failed to create chat session"}, { status: 500})
	}
}