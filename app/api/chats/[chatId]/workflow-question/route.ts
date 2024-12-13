import { generateChatCompletion } from "@/lib/language-model/chat-completion";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { chatId: string } }) {
  try {
	const { messages, codeSnippet } = await request.json();
	const chatId = params.chatId;

	const systemPrompt = `You are an AI assistant helping users understand a workflow. 
    The workflow code is: ${codeSnippet}
    Provide clear, detailed explanations about the workflow's functionality, implementation, and any specific questions the user has.`;

	const response = await generateChatCompletion([
		{ role: "system", content: systemPrompt },
		...messages,
	]);

	return NextResponse.json({
		message: {
		  role: 'assistant',
		  content: response,
		  chatId,
		  timestamp: new Date()
		}
	  }, { status: 201 });
  } catch (error) {
	console.error("Error generating workflow explanation", error);
	return NextResponse.json({ error: "Failed to generate workflow explanation" }, { status: 500 });
  }
}