import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { generateWorkflow } from "@/lib/workflow/generateWorkflow";
import { authorizeUser } from "@/lib/auth/authorize-user";
import { saveWorkflow } from "@/db/queries/workflow/postWorkflow";

export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse> {
  const session = await auth();
  
  const authError = await authorizeUser(session, params.userId, "generate workflows");
  if (authError) return authError;

  try {
    const { prompt, apiDocIds, title } = await request.json();
    const workflow = await generateWorkflow(prompt, apiDocIds, params.userId, title);
	const savedWorkflow = await saveWorkflow(workflow, params.userId);
    return NextResponse.json({ workflow: savedWorkflow }, { status: 201 });
  } catch (error) {
    console.error("Error generating workflow:", error);
    return NextResponse.json(
      { error: "Failed to generate workflow" },
      { status: 500 }
    );
  }
} 