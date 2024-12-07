import { getWorkflowByChatId } from "@/db/postgres/queries/workflow";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest) {
	const { chatId } = await req.json()
	try {
		const workflow = await getWorkflowByChatId(chatId)
		return NextResponse.json({workflow}, { status: 200})
	} catch (error) {
		console.error("Failed to fetch workflow:", error);
		return NextResponse.json({error: "Failed to fetch workflow"}, { status: 500})
	}
}