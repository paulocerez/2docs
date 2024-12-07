import { InsertApiEndpoint } from "@/db/postgres/schema/apis";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";
import { client } from "@/lib/language-model/client";


export async function parseMarkdownForEndpointsUsingLLM(markdown: string): Promise<Omit<InsertApiEndpoint, 'id' | 'apiDocumentationId'>[]> {
	const messages: ChatCompletionMessageParam[] = [
		{
			role: "system",
			content: `You are an AI assistant specialized in extracting comprehensive API endpoint information from markdown documentation. Your task is to thoroughly analyze the given markdown and return a complete JSON array of objects, where each object represents an API endpoint.
	
			Instructions:
			1. Carefully examine the entire markdown document for any mention of API endpoints.
			2. Look for patterns that typically indicate endpoints, such as HTTP methods followed by URLs, code blocks with curl examples, or tables describing API operations.
			3. Be thorough and don't miss any endpoints, even if they're mentioned in passing or in examples.
			4. If an endpoint is mentioned multiple times, consolidate the information into a single, comprehensive entry.
			5. For each endpoint, extract as much information as possible, including:
			   - path: The full endpoint path, including any base URL if provided
			   - method: The HTTP method (GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD, etc.)
			   - summary: A concise summary of the endpoint's purpose
			   - description: A detailed description of the endpoint's functionality
			   - parameters: All parameters, including query parameters, path parameters, and headers
			   - requestBody: Details about the request body, including required fields and data types
			   - responses: All possible response codes and their meanings, along with response body structures if available
			   - authentication: Any authentication requirements specific to this endpoint
			   - rateLimit: Any rate limiting information for this endpoint
			   - examples: Any usage examples provided
	
			6. If any property is not explicitly mentioned for an endpoint, use your judgment to infer it from context if possible. If you can't infer it, omit that property.
			7. Ensure that all extracted information is accurately represented in the JSON structure.
			8. If you encounter any ambiguities or uncertainties, include a "notes" field in the JSON object to explain your interpretation or highlight the ambiguity.
	
			Your output should be a valid JSON array containing all identified endpoints, with each endpoint represented as a detailed object following the structure described above.`
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