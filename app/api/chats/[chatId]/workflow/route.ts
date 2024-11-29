import { generateWorkflow } from "@/lib/workflow/generateWorkflow";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt, apiDocIds } = await req.json();
  try {
    const workflow = await generateWorkflow(prompt, apiDocIds);
    return NextResponse.json(workflow, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate workflow" },
      { status: 500 }
    );
  }
}
