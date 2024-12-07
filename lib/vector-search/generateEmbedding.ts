import { OpenAI } from "openai";
import { client } from "@/lib/language-model/client";

export async function generateEmbedding(text: string): Promise<number[]> {
	const response = await client.embeddings.create({
		model: "text-embedding-ada-002",
		input: text,
	});
	return response.data[0].embedding;
}