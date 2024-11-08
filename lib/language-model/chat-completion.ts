import { config } from "dotenv";
config({ path: "./.env.local" });
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set in the environment variables");
}
const openai = new OpenAI({
  apiKey: apiKey,
});


export async function generateChatCompletion(messages: ChatCompletionMessageParam[]) {
	const validMessages = messages.filter(msg => msg.content != null);
	const completion = await openai.chat.completions.create({
		model: "gpt-4o-mini",
		messages: validMessages,
		stream: false,
	});
  
  	return completion.choices[0]?.message?.content || '';
}
