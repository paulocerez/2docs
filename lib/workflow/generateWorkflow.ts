import { getApiInfoWithEndpoints } from "@/db/queries/api/api";
import { generateChatCompletion } from "@/lib/language-model/chat-completion";
import { WorkflowEndpoint, WorkflowProps, WorkflowStepProps } from "@/types/workflow";
import getWorkflowPrompt from "./workflowPrompt";

export async function generateWorkflow(prompt: string, apiDocIds: string[], userId: string, title: string) {
  // Fetch all API information
  let allApiInfo = await Promise.all(apiDocIds.map(getApiInfoWithEndpoints));
  console.log("Fetched API info:", allApiInfo);

  // Create mappings for endpoints
  const endpointMap = new Map<string, string>();  // key -> id mapping
  const endpointDetails = new Map<string, WorkflowEndpoint>();  // id -> full details mapping
  
  allApiInfo.forEach(api => {
    api.endpoints.forEach(endpoint => {
      if (endpoint.method && endpoint.path) {
        const key = `${endpoint.method.toUpperCase()}-${endpoint.path}`;
        endpointMap.set(key, endpoint.id);
        
        // Store full endpoint details
        endpointDetails.set(endpoint.id, {
          id: endpoint.id,
          path: endpoint.path,
          method: endpoint.method,
          operation: endpoint.operation || undefined,
          summary: endpoint.summary || undefined,
          description: endpoint.description || undefined,
          parameters: endpoint.parameters || undefined,
          requestBody: endpoint.requestBody || undefined,
          responses: endpoint.responses || undefined,
        });
      }
    });
  });

  // Create simplified context for the LLM
  const context = allApiInfo.map(api => `
API Name: ${api.name}
Base URL: ${api.baseUrl}
Version: ${api.version}

Available Endpoints:
${api.endpoints.map(endpoint => `
  Method: ${endpoint.method}
  Path: ${endpoint.path}
  Summary: ${endpoint.summary || 'No summary available'}
`).join('\n')}
  `).join('\n\n---\n\n');

  // Generate the workflow using the LLM
  const workflowResponse = await generateChatCompletion([
    { 
      role: 'system', 
      content: 'You are an advanced API workflow generator. For each step that requires an API call, specify only the method and path that best matches the needed functionality. Be precise with the method and path to ensure exact matches.' 
    },
    { role: 'user', content: getWorkflowPrompt(prompt, context) }
  ]);

  // Clean the response before parsing
  const cleanResponse = (text: string) => {
    return text
      .replace(/```json\s*|\s*```/g, '') // Remove code blocks
      .replace(/`/g, "'") // Replace backticks with single quotes
      .replace(/\n/g, ' ') // Remove newlines
      .trim();
  };

  try {
    const workflowJson = cleanResponse(workflowResponse);
    let workflow = JSON.parse(workflowJson) as WorkflowProps;
    console.log("Parsed workflow:", workflow);

    // Enrich steps with full endpoint details
    if (workflow.steps) {
      workflow.steps = workflow.steps.map((step: WorkflowStepProps) => {
        if (step.endpoint && typeof step.endpoint === 'object' && 
            step.endpoint.method && step.endpoint.path) {
          const key = `${step.endpoint.method.toUpperCase()}-${step.endpoint.path}`;
          const endpointId = endpointMap.get(key);
          
          if (endpointId) {
            const fullEndpointDetails = endpointDetails.get(endpointId);
            if (fullEndpointDetails) {
              console.log(`Enriching step "${step.title}" with endpoint details:`, fullEndpointDetails);
              step.endpoint = {
                ...fullEndpointDetails,
                method: step.endpoint.method, // Keep original method
                path: step.endpoint.path,     // Keep original path
              };
            }
          } else {
            console.warn(`No matching endpoint found for ${key} in step "${step.title}"`);
          }
        }
        return step;
      });
    }
    
    const finalWorkflow = {
      ...workflow,
      title
    };

    console.log("Final workflow:", finalWorkflow);
    return finalWorkflow;

  } catch (error) {
    console.error("Failed to parse workflow JSON:", error);
    console.error("Raw response:", workflowResponse);
    throw new Error("Failed to generate valid workflow");
  }
}
