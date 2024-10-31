import { createChatApiLinks } from "@/db/queries/apiLinks"
import { NextRequest, NextResponse } from "next/server"

export async function POST (request: NextRequest, { params}: { params: { chatId: string}}): Promise<NextResponse> {
	const chatId = params.chatId;
	
	try {
		const data = await request.json()
		const result = await createChatApiLinks({
			chatId: chatId,
			apiLink: data.apiLink
		})
		return NextResponse.json(result, { status: 201 })
	} catch(error) {
		console.error("Error creating API links:", error);
    	return NextResponse.json({ error: "Failed to create API links" }, { status: 500 });
	}

}
