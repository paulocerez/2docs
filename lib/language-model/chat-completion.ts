import { config } from "dotenv";
config({ path: "./.env.local" });
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";
const apiKey = "sk-quqi68yuMO7hTugSdbymcy5bXtCXoObAoi3AEhMg-9T3BlbkFJ2oBryA186fEjaazV1IvbvxzYSKpzgU0Mt8qbZlW6MA";

if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set in the environment variables");
}
const openai = new OpenAI({
  apiKey: apiKey,
});


export async function generateChatCompletion(messages: ChatCompletionMessageParam[]) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
	stream: false,
  });
  console.log(completion)
  return completion.choices[0]?.message?.content || '';
}
