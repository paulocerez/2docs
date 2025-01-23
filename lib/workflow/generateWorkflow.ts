import { getApiInfoWithEndpoints } from "@/db/postgres/queries/api/api";
import { generateChatCompletion } from "@/lib/language-model/chat-completion";
import getWorkflowPrompt from "./workflowPrompt";

export async function generateWorkflow(prompt: string, apiDocIds: string[], userId: string, chatTitle: string) {
  let allApiInfo = await Promise.all(apiDocIds.map(getApiInfoWithEndpoints));

  const context = allApiInfo.map(api => `
API Name: ${api.name}
Base URL: ${api.baseUrl}
Version: ${api.version}

Endpoints:
${api.endpoints.map(endpoint => `
	ID: ${endpoint.id}
  Path: ${endpoint.path}
  Method: ${endpoint.method}
  Operation: ${endpoint.operation}
  Summary: ${endpoint.summary}
  Description: ${endpoint.description}
  Parameters: ${endpoint.parameters}
  Request Body: ${endpoint.requestBody}
  Responses: ${endpoint.responses}
`).join('\n')}
  `).join('\n\n---\n\n');

  const workflowResponse = await generateChatCompletion([
    { role: 'system', content: 'You are an advanced API workflow generator. Create accurate, detailed, and seamlessly integrated step-by-step workflows based on the given API documentation and user request. Return the workflow as a valid JSON object. Make sure to include the endpoint ID in the apiEndpoint field of each step.' },
    { role: 'user', content: getWorkflowPrompt(prompt, context) }
  ]);

  try {
    const jsonMatch = workflowResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON object found in response");
    }
    
    const jsonContent = jsonMatch[0]
      .replace(/\\"/g, '"')        // Fix escaped quotes
      .replace(/\n/g, '')         // Remove newlines
      .replace(/\r/g, '')         // Remove carriage returns
      .replace(/\t/g, '')         // Remove tabs
      .replace(/\\/g, '\\\\')     // Escape backslashes properly
      .replace(/"\s+"/g, '" "');  // Fix spaces between strings
      
    let workflow = JSON.parse(jsonContent);
    
    return {
		...workflow,
		title: chatTitle
	};
  } catch (error) {
    console.error("Failed to parse workflow JSON:", error);
    console.error("Raw response:", workflowResponse);
    throw new Error("Failed to generate valid workflow");
  }
}
