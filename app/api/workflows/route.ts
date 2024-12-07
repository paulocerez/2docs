import { saveWorkflow } from "@/db/postgres/queries/workflow";
import { generateWorkflow } from "@/lib/workflow/generateWorkflow";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const { prompt, apiDocIds, userId, title } = await request.json();
	console.log(prompt, apiDocIds, userId, title)

	try {
		const workflowData = await generateWorkflow(prompt, apiDocIds, userId, title)
		const savedWorkflow = await saveWorkflow(workflowData, userId)
		return NextResponse.json({workflow: savedWorkflow }, { status: 201 });
	} catch (error) {
		console.error("Failed to generate and save workflow:", error);
		return NextResponse.json(
		  { error: "Failed to generate and save workflow" },
		  { status: 500 }
		);
	  }
	}