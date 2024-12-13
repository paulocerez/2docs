import { createMessage } from "@/db/postgres/queries/message/message";
import { generateChatCompletion } from "@/lib/language-model/chat-completion";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { chatId: string } }) {
  try {
	const { messages, codeSnippet } = await request.json();
	console.log("Workflow Question Request", messages, codeSnippet);
	const chatId = params.chatId;
	console.log("Chat ID", chatId);

	const systemPrompt = `You are an AI assistant helping users understand a workflow. 
    The workflow code is: ${codeSnippet}
    Provide clear, detailed explanations about the workflow's functionality, implementation, and any specific questions the user has.`;

	const response = await generateChatCompletion([
		{ role: "system", content: systemPrompt },
		...messages,
	]);

	const newMessage = await createMessage({
		chatId,
		content: response,
		role: 'assistant',
		timestamp: new Date(),
	});

	console.log("Workflow Question Response", response);

	return NextResponse.json({
		message: newMessage
	  }, { status: 201 });
  } catch (error) {
	console.error("Error generating workflow explanation", error);
	return NextResponse.json({ error: "Failed to generate workflow explanation" }, { status: 500 });
  }
}