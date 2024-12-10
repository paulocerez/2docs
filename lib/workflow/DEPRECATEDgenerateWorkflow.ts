import { searchVectors } from "@/db/qdrant/vector";
import { generateEmbedding } from "@/lib/vector-search/generateEmbedding";
import { generateChatCompletion } from "@/lib/language-model/chat-completion";
import { getApiDocumentation } from "@/db/postgres/queries/api/api";

export async function generateWorkflow(prompt: string, apiDocIds: string[], userId: string, chatTitle: string) {
	console.log(prompt, apiDocIds, userId, chatTitle)
	const promptEmbedding = await generateEmbedding(prompt);
	let allRelevantEndpoints = [];
	

	for (const apiDocId of apiDocIds) {
		const apiName = (await getApiDocumentation(apiDocId))[0].name;
		const relevantEndpoints = await searchVectors(apiName, apiDocId, promptEmbedding);
		allRelevantEndpoints.push(...relevantEndpoints);
	}

	allRelevantEndpoints.sort((a, b) => b.score - a.score);
	const topEndpoints = allRelevantEndpoints.slice(0, 5);

	const context = topEndpoints.map(endpoint => 
		`API: ${endpoint.payload?.apiId}\nEndpoint: ${endpoint.payload?.method} ${endpoint.payload?.path}\nSummary: ${endpoint.payload?.summary}`
	).join('\n\n');

	const workflowPrompt = `
    Given the following API endpoints and user request, generate a step-by-step workflow using the latest TypeScript syntax.
	The workflow should be returned as a JSON object with the following structure:
    {
      "variables": [
        {
          "id": "unique_id",
          "name": "variable_name",
          "defaultValue": "default_value",
          "description": "variable description"
        }
      ],
      "steps": [
        {
          "id": "unique_id",
          "endpointId": "endpoint_id",
          "order": step_number,
          "inputMapping": "input mapping logic",
          "outputMapping": "output mapping logic"
        }
      ]
    }

    API Endpoints:
    ${context}

    User Request:
    ${prompt}

    Generate the workflow JSON:
  `;
  
  const workflowResponse = await generateChatCompletion([
    { role: 'system', content: 'You are an API workflow generator. Create accurate step-by-step workflows based on the given API documentation and user request. Return the workflow as a valid JSON object.' },
    { role: 'user', content: workflowPrompt }
  ]);

  try {
    const cleanedContent = workflowResponse
      .split('```json')[1]
      .split('```')[0]
      .trim();
	console.log(cleanedContent)
    const workflow = JSON.parse(cleanedContent);

	workflow.title = chatTitle
    console.log(workflow);
    return workflow;
  } catch (error) {
    console.error("Failed to parse workflow JSON:", error);
    throw new Error("Failed to generate valid workflow");
  }
}