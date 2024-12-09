import { getApiInfoWithEndpoints } from "@/db/postgres/queries/api";
import { generateChatCompletion } from "@/lib/language-model/chat-completion";

export async function generateWorkflow(prompt: string, apiDocIds: string[], userId: string, chatTitle: string) {
  console.log(prompt, apiDocIds, userId, chatTitle);
  
  let allApiInfo = await Promise.all(apiDocIds.map(getApiInfoWithEndpoints));

  const context = allApiInfo.map(api => `
API Name: ${api.name}
Base URL: ${api.baseUrl}
Version: ${api.version}

Endpoints:
${api.endpoints.map(endpoint => `
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

  const workflowPrompt = `
You are an expert API integrator. Your task is to create a comprehensive workflow that combines multiple APIs to fulfill a user's request. You will be provided with API documentation for multiple services and a user's request. Your job is to:

1. Analyze the API documentation and the user's request.
2. Identify the relevant endpoints from each API that are necessary to fulfill the request.
3. Create a step-by-step workflow that combines these endpoints in a logical sequence.
4. Ensure that the output of one step can be used as input for subsequent steps where applicable.
5. Include any necessary variables that might be required across multiple steps.
6. Provide clear and specific input and output mappings for each step.

Here's the API documentation:

${context}

User Request:
${prompt}

Based on this information, generate a workflow as a JSON object with the following structure:

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
      "apiName": "name_of_the_api",
      "endpoint": "full_endpoint_path",
      "method": "HTTP_METHOD",
      "order": step_number,
      "description": "what this step does",
      "inputMapping": "input mapping logic",
      "outputMapping": "output mapping logic"
    }
  ]
}

Ensure that your workflow is detailed, accurate, and effectively combines the provided APIs to fulfill the user's request. If the available APIs are not sufficient to complete the task, suggest additional steps or APIs that might be needed.

Generate the workflow JSON:
`;

  const workflowResponse = await generateChatCompletion([
    { role: 'system', content: 'You are an advanced API workflow generator. Create accurate, detailed, and seamlessly integrated step-by-step workflows based on the given API documentation and user request. Return the workflow as a valid JSON object.' },
    { role: 'user', content: workflowPrompt }
  ]);

  try {
    const cleanedContent = workflowResponse
      .split('```json')[1]
      .split('```')[0]
      .trim();
    console.log(cleanedContent);
    const workflow = JSON.parse(cleanedContent);

    workflow.title = chatTitle;
    console.log(workflow);
    return workflow;
  } catch (error) {
    console.error("Failed to parse workflow JSON:", error);
    throw new Error("Failed to generate valid workflow");
  }
}
