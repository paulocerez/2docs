import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { generateWorkflow } from "@/lib/workflow/generateWorkflow";
import { authorizeUser } from "@/lib/auth/authorize-user";

export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string, chatId: string } }
): Promise<NextResponse> {
  const session = await auth();
  
  const authError = await authorizeUser(session, params.userId, "update workflows");
  if (authError) return authError;

  try {
    const { prompt, workflow } = await request.json();

    // Additional workflow-specific ownership check
    if (workflow.userId !== params.userId) {
      return NextResponse.json(
        { error: "Unauthorized: You can only update your own workflows" },
        { status: 403 }
      );
    }

    // Generate new workflow based on edit request
    const newWorkflow = await generateWorkflow(
      prompt,
      workflow.apiDocIds,
      params.userId,
      workflow.title
    );

    return NextResponse.json({
      message: {
        role: 'assistant',
        content: 'I have updated the workflow based on your suggestions. The changes have been applied.',
        chatId: params.chatId,
        timestamp: new Date()
      },
      workflow: newWorkflow
    });
  } catch (error) {
    console.error('Error updating workflow:', error);
    return NextResponse.json({ error: 'Failed to update workflow' }, { status: 500 });
  }
}