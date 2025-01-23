import { getWorkflowByChatId } from "@/db/postgres/queries/workflow/getWorkflow";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: { chatId: string } }
) {
	try {
		const workflow = await getWorkflowByChatId(params.chatId);
		console.log("Workflow data:", workflow);
		return NextResponse.json({ workflow });
	} catch (error) {
		console.error("Error fetching workflow:", error);
		return NextResponse.json(
			{ error: "Failed to fetch workflow" },
			{ status: 404 }
		);
	}
}