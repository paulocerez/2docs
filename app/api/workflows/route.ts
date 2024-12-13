import { saveWorkflow } from "@/db/postgres/queries/workflow/workflow";
import { generateWorkflow } from "@/lib/workflow/generateWorkflow";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const { prompt, apiDocIds, userId, title } = await request.json();
	console.log(prompt, apiDocIds, userId, title)
	console.log("Generating workflow in workflows route...");
	try {
		const workflowData = await generateWorkflow(prompt, apiDocIds, userId, title)
		console.log("Successfully generated workflow data in workflows route:", workflowData);
		const savedWorkflow = await saveWorkflow(workflowData, userId)
		console.log("Successfully saved workflow in workflows route:", savedWorkflow);
		return NextResponse.json({workflow: savedWorkflow }, { status: 201 });
	} catch (error) {
		console.error("Failed to generate and save workflow:", error);
		return NextResponse.json(
		  { error: "Failed to generate and save workflow" },
		  { status: 500 }
		);
	  }
	}