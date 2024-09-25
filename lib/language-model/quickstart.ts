import { config } from "dotenv";
config({ path: "./.env.local" });
import OpenAI from "openai";
const apiKey = "sk-quqi68yuMO7hTugSdbymcy5bXtCXoObAoi3AEhMg-9T3BlbkFJ2oBryA186fEjaazV1IvbvxzYSKpzgU0Mt8qbZlW6MA";

if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set in the environment variables");
}
const openai = new OpenAI({
  apiKey: apiKey,
});

export async function callLlm() {
  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Write a definition of API's" },
    ],
	stream: true,
  });
  for await (const chunk of stream) {
	process.stdout.write(chunk.choices[0]?.delta?.content || '')
  }
}

callLlm();
