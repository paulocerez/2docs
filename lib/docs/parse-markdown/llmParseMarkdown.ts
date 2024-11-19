import { InsertApiEndpoint } from "@/db/postgres/schema/apis";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});


export async function parseMarkdownForEndpointsUsingLLM(markdown: string): Promise<Omit<InsertApiEndpoint, 'id' | 'apiDocumentationId'>[]> {
	const messages: ChatCompletionMessageParam[] = [
		{
		  role: "system",
		  content: `You are an AI assistant that extracts API endpoint information from markdown documentation. 
		  Parse the given markdown and return a JSON array of objects, where each object represents an API endpoint with the following properties:
		  - path: The endpoint path
		  - method: The HTTP method (GET, POST, PUT, DELETE, etc.)
		  - summary: A brief summary of the endpoint (if available)
		  - description: A more detailed description of the endpoint (if available)
		  - parameters: Any parameters for the endpoint (if available)
		  - requestBody: Information about the request body (if available)
		  - responses: Information about the possible responses (if available)
	
		  If any property is not found in the markdown, omit it from the JSON object.`
		},
		{
		  role: "user",
		  content: markdown
		}
	];

	console.log("messages", messages);

	const completion = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: messages,
			temperature: 0.3, // less creative, more standardized output
			stream: false,
		});

	console.log("completion", completion);
	const content = completion.choices[0].message.content;
	if (!content) {
		throw new Error("Failed to parse markdown");
	  }

	console.log("content", content);

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