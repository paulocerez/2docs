import { searchVectors } from "@/db/qdrant/vector";
import { generateEmbedding } from "../vector-search/generateEmbedding";
import { generateChatCompletion } from "../language-model/chat-completion";

export async function generateWorkflow(prompt: string, apiDocIds: string[]) {
	const promptEmbedding = await generateEmbedding(prompt);
	let allRelevantEndpoints = [];

	for (const apiDocId of apiDocIds) {
		const relevantEndpoints = await searchVectors(apiDocId, promptEmbedding);
		allRelevantEndpoints.push(...relevantEndpoints);
	}

	allRelevantEndpoints.sort((a, b) => b.score - a.score);
	const topEndpoints = allRelevantEndpoints.slice(0, 5);

	const context = topEndpoints.map(endpoint => 
		`API: ${endpoint.payload?.apiId}\nEndpoint: ${endpoint.payload?.method} ${endpoint.payload?.path}\nSummary: ${endpoint.payload?.summary}`
	).join('\n\n');

	const workflowPrompt = `
    Given the following API endpoints and user request, generate a step-by-step workflow using the latest TypeScript syntax.

    API Endpoints:
    ${context}

    User Request:
    ${prompt}

    Step-by-step workflow:
  `;

	const workflow = await generateChatCompletion([
		{ role: 'system', content: 'You are an API workflow generator. Create accurate step-by-step workflows based on the given API documentation and user request.' },
		{ role: 'user', content: workflowPrompt }
	  ]);

	return workflow
}