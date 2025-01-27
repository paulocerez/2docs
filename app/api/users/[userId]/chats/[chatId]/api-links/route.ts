import { auth } from "@/auth";
import { authorizeUser } from "@/lib/auth/authorize-user";
import { createChatApiLinks, getChatApiLinks } from "@/db/queries/chat/chat";
import { NextRequest, NextResponse } from "next/server"

export async function GET (request: NextRequest, { params }: { params: { userId: string, chatId: string}}): Promise<NextResponse> {
	const session = await auth();
	
	const authError = await authorizeUser(session, params.userId, "access API links");
	if (authError) return authError;

	try {
		const result = await getChatApiLinks(params.chatId)
		return NextResponse.json(result, { status: 200 })
	} catch(error) {
		console.error("Error getting API links:", error);
    	return NextResponse.json({ error: "Failed to get API links" }, { status: 500 });
	}
}

export async function POST (request: NextRequest, { params}: { params: { userId: string, chatId: string}}): Promise<NextResponse> {
	const session = await auth();
	
	const authError = await authorizeUser(session, params.userId, "create API links");
	if (authError) return authError;

	try {
		const { apiDocumentationIds } = await request.json();

		const result = await createChatApiLinks(params.chatId, apiDocumentationIds);
		return NextResponse.json(result, { status: 201 })
	} catch(error) {
		console.error("Error creating API links:", error);
    	return NextResponse.json({ error: "Failed to create API links" }, { status: 500 });
	}

}