import { NextRequest, NextResponse } from "next/server";
import { generateWorkflow } from "@/lib/workflow/generateWorkflow";

export async function POST(
  request: NextRequest,
  { params }: { params: { chatId: string } }
) {
  try {
    const { prompt, workflow } = await request.json();
    const chatId = params.chatId;

    // Generate new workflow based on edit request
    const newWorkflow = await generateWorkflow(
      prompt,
      workflow.apiDocIds,
      workflow.userId,
      workflow.title
    );

    return NextResponse.json({
      message: {
        role: 'assistant',
        content: 'I have updated the workflow based on your suggestions. The changes have been applied.',
        chatId,
        timestamp: new Date()
      },
      workflow: newWorkflow
    });
  } catch (error) {
    console.error('Error updating workflow:', error);
    return NextResponse.json({ error: 'Failed to update workflow' }, { status: 500 });
  }
}