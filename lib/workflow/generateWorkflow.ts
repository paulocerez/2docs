import { getApiInfoWithEndpoints } from "@/db/postgres/queries/api/api";
import { generateChatCompletion } from "@/lib/language-model/chat-completion";
import { escapeCodeSnippet } from "@/utils/escapeCodeSnippet";

export async function generateWorkflow(prompt: string, apiDocIds: string[], userId: string, chatTitle: string) {
	console.log("Generating workflow for API Docs:", apiDocIds);
  let allApiInfo = await Promise.all(apiDocIds.map(getApiInfoWithEndpoints));
  console.log("Retrieved API info:", JSON.stringify(allApiInfo, null, 2));


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

  const workflowPrompt = `
  You are an expert API integrator. Your task is to create a comprehensive workflow that combines multiple APIs to fulfill a user's request. You will be provided with API documentation for multiple services and a user's request. Your job is to:
  
  1. Analyze the API documentation and the user's request.
  2. Identify the relevant endpoints from each API that are necessary to fulfill the request.
  3. Create a step-by-step workflow that combines these endpoints in a logical sequence.
  4. Ensure that the output of one step can be used as input for subsequent steps where applicable.
  5. Include any necessary variables that might be required across multiple steps.
  6. Provide clear and specific input and output mappings for each step.
  7. Generate accurate and executable TypeScript code snippets for each step.
  8. Create a concise but descriptive title for each step that clearly explains its purpose in the workflow.
  9. Include environment setup instructions and deployment suggestions.
  
  Here's the API documentation:
  
  ${context}
  
  User Request:
  ${prompt}
  
  Based on this information, generate a workflow as a JSON object with the following structure:
  
  {
    "setup": {
      "environment": {
        "prerequisites": ["List of required software/tools"],
        "dependencies": {
          "name": "version",
          "description": "why this package is needed"
        },
        "configuration": {
          "tsconfig": "TypeScript configuration suggestions",
          "env": "Required environment variables"
        }
      },
      "deployment": {
        "options": [
          {
            "platform": "deployment platform name",
            "description": "why this platform is suitable",
            "steps": ["step-by-step deployment instructions"]
          }
        ],
        "considerations": ["security considerations", "scaling considerations"]
      }
    },
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
        "title": "title of the step",
        "apiName": "name_of_the_api",
        "endpoint": "full_endpoint_path",
        "method": "HTTP_METHOD",
        "order": step_number,
        "description": "what this step does",
        "inputMapping": {
          "parameterName": "value or {{variable}}",
          "comment": "explanation of the mapping"
        },
        "outputMapping": {
          "variableName": "$.path.to.value",
          "comment": "explanation of what is being extracted"
        },
        "codeSnippet": "Executable TypeScript code snippet for this step",
        "loop": {
          "over": "variable or data to iterate over",
          "action": "description of the action to perform in each iteration"
        }
      }
    ]
  }
  
  For the environment setup:
  1. Include Node.js and TypeScript setup instructions
  2. List all required npm packages with versions
  3. Provide a sample tsconfig.json
  4. List required environment variables
  5. Include any necessary security considerations
  
  For deployment suggestions:
  1. Include at least 2-3 deployment options (e.g., serverless, containers, VPS)
  2. Provide basic scaling considerations
  3. Include security best practices
  4. Suggest monitoring and logging solutions
  
  For the code snippets:
  1. Use TypeScript with Node.js and the built-in 'fetch' API for HTTP requests.
  2. Include error handling with try/catch blocks.
  3. Use async/await syntax for asynchronous operations.
  4. Include comments explaining key parts of the code.
  5. Use template literals for string interpolation when including variables.
  6. Ensure the code snippet is complete and can be executed as a standalone async function.
  7. Use appropriate TypeScript types for inputs, outputs, and any intermediate variables.
  
  Example code snippet structure:
  
  \`\`\`typescript
  import { RequestInit } from 'node-fetch';
  
  interface StepInput {
	param1: string;
	param2: number;
	apiKey: string;
  }
  
  interface StepOutput {
	result: string;
	status: number;
  }
  
  async function stepName(input: StepInput): Promise<StepOutput> {
	try {
	  // Prepare request data
	  const requestData: RequestInit = {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': \`Bearer \${input.apiKey}\`
		},
		body: JSON.stringify({
		  param1: input.param1,
		  param2: input.param2
		})
	  };
  
	  // Make API call
	  const response = await fetch('https://api.example.com/endpoint', requestData);
	  
	  if (!response.ok) {
		throw new Error(\`HTTP error! status: \${response.status}\`);
	  }
	  
	  const data = await response.json();
  
	  // Process and return the response
	  return {
		result: data.result,
		status: response.status
	  };
	} catch (error) {
	  console.error('Error in stepName:', error);
	  throw error;
	}
  }
  \`\`\`
  
IMPORTANT: 
- Ensure each step has a clear, concise title that accurately describes its function in the workflow.
- The title should be action-oriented and specific, e.g., "Fetch User Data from CRM", "Update Inventory in ERP", "Send Confirmation Email".
- All comments and explanations should be included as string values in the JSON, not as actual JSON comments. The response must be valid JSON that can be parsed directly.

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
