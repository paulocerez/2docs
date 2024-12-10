import { createApiDocumentation } from "@/db/postgres/queries/scrape/scrape";
import extractNameFromUrl from "@/utils/extractNameFromUrl";
import { createApiEndpoint } from "@/db/postgres/queries/api/api";
import { parseMarkdownForEndpointsUsingLLM } from "./parse-markdown/llmParseMarkdown";

export async function processDocumentation(markdown: string, userId: string, url: string) {
	// create api documentation in postgres
	const apiDoc = await createApiDocumentation({
	  name: extractNameFromUrl(url),
	  baseUrl: url,
	  version: "1.0.0",
	  createdBy: userId,
	  content: markdown,
	});
  
	// parse markdown for endpoints
	const endpoints = await parseMarkdownForEndpointsUsingLLM(markdown);
	console.log(endpoints);
  
	// create api endpoints in postgres
	for (const endpoint of endpoints) {
	  await createApiEndpoint({
		apiDocumentationId: apiDoc.id,
		...endpoint,
	  });

	}
	
	return apiDoc.id;
  }