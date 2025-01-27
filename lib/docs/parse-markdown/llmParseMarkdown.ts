import { InsertApiEndpoint } from "@/db/schema/apis";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";
import { client } from "@/lib/language-model/client";
import { getParsingPrompt } from "@/lib/workflow/getParsingPrompt";


export async function parseMarkdownForEndpointsUsingLLM(markdown: string): Promise<Omit<InsertApiEndpoint, 'id' | 'apiDocumentationId'>[]> {
	const messages: ChatCompletionMessageParam[] = [
		{
			role: "system",
			content: getParsingPrompt()
		},
		{
			role: "user",
			content: markdown
		}
	];

	const completion = await client.chat.completions.create({
			model: process.env.LLM_MODEL!,
			messages: messages,
			temperature: 0.3, // less creative, more standardized output
			stream: false,
		});

	const content = completion.choices[0].message.content;
	if (!content) {
		throw new Error("Failed to parse markdown");
	  }

	// remove markdown code block syntax
	const cleanedContent = content.replace(/```json\n|\n```/g, '').trim();
	
	try {
		const endpoints: Omit<InsertApiEndpoint, 'id' | 'apiDocumentationId'>[] = JSON.parse(cleanedContent);
		return endpoints;
	  } catch (error) {
		console.error("Error parsing OpenAI response:", error);
		throw new Error("Failed to parse markdown");
	  }
}