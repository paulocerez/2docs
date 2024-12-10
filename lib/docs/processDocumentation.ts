import { createApiDocumentation, createApiEndpoint } from "@/db/postgres/queries/api/api";
import { parseMarkdownForEndpointsUsingLLM } from "./parse-markdown/llmParseMarkdown";
import extractNameFromUrl from "@/utils/extractNameFromUrl";

export async function processDocumentation(markdown: string, userId: string, url: string) {
	try {
	  // create api documentation in postgres
	  const apiDoc = await createApiDocumentation({
		name: extractNameFromUrl(url),
		baseUrl: url,
		version: "1.0.0",
		createdBy: userId,
		content: markdown,
	  });
  
	  console.log("API Documentation created:", apiDoc);
  
	  // parse markdown for endpoints
	  const endpoints = await parseMarkdownForEndpointsUsingLLM(markdown);
	  console.log("Parsed endpoints:", endpoints);
  
	  // create api endpoints in postgres
	  for (const endpoint of endpoints) {
		try {
		  const createdEndpoint = await createApiEndpoint({
			apiDocumentationId: apiDoc.id,
			...endpoint,
		  });
		  console.log("Created endpoint:", createdEndpoint);
		} catch (endpointError) {
		  console.error("Error creating endpoint:", endpointError);
		}
	  }
  
	  return apiDoc.id;
	} catch (error) {
	  console.error("Error in processDocumentation:", error);
	  throw error;
	}
  }
  