import { createMessage } from "@/db/postgres/queries/message";
import { generateChatCompletion } from "@/lib/language-model/chat-completion";
import { NextRequest, NextResponse } from "next/server";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";

export async function POST (request: NextRequest, { params}: { params: { chatId: string}}): Promise<NextResponse> {
	const { chatId } = await params;

	try {
		const { messages } = await request.json() as { messages: ChatCompletionMessageParam[] };
		if (!Array.isArray(messages) || messages.length === 0) {
			return NextResponse.json({ error: "Invalid or empty messages array" }, { status: 400 });
		}

		const validMessages = messages.filter(msg => 
			msg && typeof msg.role === 'string' && typeof msg.content === 'string'
		  );

		  if (validMessages.length === 0) {
			return NextResponse.json({ error: "No valid messages found" }, { status: 400 });
		  }

		const aiResponse = await generateChatCompletion(validMessages)

		if (!aiResponse) {
			throw new Error("No response from the LLM")
		}

		const result = await createMessage({
			chatId: chatId,
			role: "assistant",
			content: aiResponse
		});
		return NextResponse.json(result, { status: 200})
	} catch(error) {
		console.error("Error generating AI response:", error);
    	return NextResponse.json({ error: "Failed to generate AI response" }, { status: 500 });
	}

}


