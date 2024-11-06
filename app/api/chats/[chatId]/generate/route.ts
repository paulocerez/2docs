import { createMessage } from "@/db/postgres/queries/message";
import { generateChatCompletion } from "@/lib/language-model/chat-completion";
import { NextRequest, NextResponse } from "next/server";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";

export async function POST (request: NextRequest, { params}: { params: { chatId: string}}): Promise<NextResponse> {
	const { chatId } = await params;
	
	try {
		const { messages } = await request.json() as { messages: ChatCompletionMessageParam[] };
		// const aiResponse = await generateChatCompletion(messages)

		// if (!aiResponse) {
		// 	throw new Error("No response from the LLM")
		// }

		// const result = await createMessage({
		// 	chatId: chatId,
		// 	role: "assistant",
		// 	content: aiResponse
		// });

		generateChatCompletion(messages).then(async (aiResponse) => {
			if (aiResponse) {
			  await createMessage({
				chatId: chatId,
				role: "assistant",
				message: aiResponse
			  });
			}
		  }).catch((error) => {
			console.error("Error generating AI response:", error);
		  });
		return NextResponse.json({status: "processing"}, { status: 202})
	} catch(error) {
		console.error("Error generating AI response:", error);
    	return NextResponse.json({ error: "Failed to generate AI response" }, { status: 500 });
	}

}

