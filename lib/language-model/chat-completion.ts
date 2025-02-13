import { config } from "dotenv";
config({ path: "./.env.local" });
import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";
import { client } from "@/lib/language-model/client";

export async function generateChatCompletion(messages: ChatCompletionMessageParam[]) {
	const validMessages = messages.filter(msg => msg.content != null);
	const completion = await client.chat.completions.create({
		model: process.env.LLM_MODEL! || "gpt-4o-mini",
		messages: validMessages,
		stream: false,
	});
  
	return completion.choices[0]?.message?.content || '';
}
