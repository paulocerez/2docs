import { createApiDocumentation } from "@/db/postgres/queries/scrape";
import { initializeCollection } from "@/db/qdrant/apiCollection";
import { upsertVectors } from "@/db/qdrant/vector";
import { generateEmbedding } from "@/lib/vector-search/generateEmbedding";
import extractNameFromUrl from "@/utils/extractNameFromUrl";
import { createApiEndpoint, createVectorEmbedding } from "@/db/postgres/queries/api";
import { parseMarkdownForEndpointsUsingLLM } from "./parse-markdown/llmParseMarkdown";

export async function processDocumentation(markdown: string, userId: string, url: string) {
	// create api documentation in postgres
	const apiDoc = await createApiDocumentation({
	  name: extractNameFromUrl(url),
	  baseUrl: url,
	  version: "1.0",
	  createdBy: userId,
	  content: markdown,
	});
  
	// initialize qdrant collection
	await initializeCollection(apiDoc.id);
	
	// parse markdown for endpoints
	const endpoints = await parseMarkdownForEndpointsUsingLLM(markdown);
	console.log(endpoints);
  
	// create api endpoints in postgres
	for (const endpoint of endpoints) {
	  const apiEndpoint = await createApiEndpoint({
		apiDocumentationId: apiDoc.id,
		...endpoint,
	  });
  
	  // generate embedding for endpoint
	  const content = `${endpoint.path} ${endpoint.method} ${endpoint.summary ?? ''} ${endpoint.description ?? ''}`;
	  const embedding = await generateEmbedding(content);
  
	  // create vector embedding in postgres
	  await createVectorEmbedding({
		apiEndpointId: apiEndpoint.id,
		content,
		metadata: JSON.stringify(apiEndpoint),
		vectorId: apiEndpoint.id,
	  });
  
	  // upsert vectors in qdrant
	  await upsertVectors(apiDoc.id, [{
		id: apiEndpoint.id,
		vector: embedding,
		payload: {
		  endpointId: apiEndpoint.id,
		  path: apiEndpoint.path,
		  method: apiEndpoint.method,
		  summary: apiEndpoint.summary,
		},
	  }]);
	}
  
	return apiDoc.id;
  }