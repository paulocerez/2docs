import { createMessage } from "@/db/queries/messages";
import { generateChatCompletion } from "@/lib/language-model/chat-completion";
import { NextRequest, NextResponse } from "next/server";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";

export async function POST (request: NextRequest, { params}: { params: { chatId: string}}): Promise<NextResponse> {
	const chatId = params.chatId;
	
	try {
		const { messages } = await request.json() as { messages: ChatCompletionMessageParam[] };
		const aiResponse = await generateChatCompletion(messages)

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

