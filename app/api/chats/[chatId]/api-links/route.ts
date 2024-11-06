import { createChatApiLinks, getChatApiLinks } from "@/db/postgres/queries/apiLinks"
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
		const data = await request.json()

		if (!Array.isArray(data.links) || data.links.length === 0) {
			return NextResponse.json({ error: "Links must be a non-empty array" }, { status: 400 });
		}

		const result = data.links.map((link: string) => ({ chatId, apiLink: link }))
		for (const link of result) {
			await createChatApiLinks(link)
		}
		return NextResponse.json({ message: "API links created successfully" }, { status: 201 })
	} catch(error) {
		console.error("Error creating API links:", error);
    	return NextResponse.json({ error: "Failed to create API links" }, { status: 500 });
	}

}