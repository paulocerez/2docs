import { createChatApiLinks, getChatApiLinks } from "@/db/postgres/queries/chat/chat";
import { NextRequest, NextResponse } from "next/server"

export async function GET (request: NextRequest, { params }: { params: { chatId: string}}): Promise<NextResponse> {
	const { chatId } = await params;
	try {
		const result = await getChatApiLinks(chatId)
		return NextResponse.json(result, { status: 200 })
	} catch(error) {
		console.error("Error getting API links:", error);
    	return NextResponse.json({ error: "Failed to get API links" }, { status: 500 });
	}
}

export async function POST (request: NextRequest, { params}: { params: { chatId: string}}): Promise<NextResponse> {
	const { chatId } = await params;
	
	try {
		const { apiDocumentationIds } = await request.json();

		const result = await createChatApiLinks(chatId, apiDocumentationIds);
		return NextResponse.json(result, { status: 201 })
	} catch(error) {
		console.error("Error creating API links:", error);
    	return NextResponse.json({ error: "Failed to create API links" }, { status: 500 });
	}

}