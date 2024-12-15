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
You are an expert API workflow architect specializing in creating enterprise-grade integrations. Your task is to create a comprehensive workflow that combines multiple APIs, includes necessary utility functions, database operations, and a main orchestrator function.

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

Generate a detailed workflow as a JSON object that includes:

{
  "setup": {
    "environment": {
      "runtime": {
        "node": "version",
        "typescript": "version"
      },
      "dependencies": {
        "name": "version",
        "purpose": "why needed"
      },
      "configuration": {
        "tsconfig": "essential settings",
        "env": {
          "VARIABLE_NAME": "description and purpose"
        }
      }
    }
  },
  "utils": [
    {
      "name": "utility_function_name",
      "purpose": "what this utility does",
      "input": "expected input types",
      "output": "return type",
      "codeSnippet": "implementation",
      "usage": "where and how to use this utility"
    }
  ],
  "dbHandlers": [
    {
      "name": "database_handler_name",
      "operation": "operation type (query/insert/update)",
      "table": "target table",
      "purpose": "what this handler does",
      "input": "expected input",
      "output": "return type",
      "codeSnippet": "implementation",
      "errorHandling": "database-specific error handling"
    }
  ],
  "steps": [
    {
      "id": "unique_step_id",
      "title": "clear_descriptive_title",
      "apiName": "service_name",
      "endpoint": "full_endpoint_path",
      "method": "HTTP_METHOD",
	  "order": step_number,
      "description": "what this step does",
      "inputMapping": {
        "parameter": "value or {{variable}}"
      },
      "outputMapping": {
        "variable": "$.path.to.value"
      },
      "codeSnippet": "implementation",
      "errorHandling": {
        "retryStrategy": "retry approach",
        "errorTypes": ["specific errors handled"]
      }
    }
  ],
  "orchestrator": {
    "name": "main_function_name",
    "description": "main workflow orchestrator",
    "input": "workflow input type",
    "output": "workflow output type",
    "steps": ["execution order"],
    "errorHandling": "global error handling",
    "codeSnippet": "implementation"
  }
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
  

Example implementation structure:

\`\`\`typescript
// Types
interface WorkflowInput {
  // Input parameters for the entire workflow
}

interface WorkflowOutput {
  // Output structure of the workflow
}

interface DBConfig {
  // Database configuration
}

// Utility Functions
class Utils {
  static async validateInput(input: any): Promise<boolean> {
    // Input validation logic
  }

  static async transformData(data: any): Promise<any> {
    // Data transformation logic
  }

  static async retryOperation<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3
  ): Promise<T> {
    // Retry logic with exponential backoff
  }
}

// Database Handlers
class DBHandlers {
  private readonly config: DBConfig;

  constructor(config: DBConfig) {
    this.config = config;
  }

  async queryData(params: QueryParams): Promise<QueryResult> {
    try {
      // Database query implementation
    } catch (error) {
      // Database error handling
    }
  }

  async insertData(data: InsertData): Promise<InsertResult> {
    try {
      // Database insert implementation
    } catch (error) {
      // Database error handling
    }
  }
}

// API Step Implementation
class APIStep {
  private readonly config: StepConfig;

  constructor(config: StepConfig) {
    this.config = config;
  }

  async execute(input: StepInput): Promise<StepOutput> {
    try {
      // Step implementation
    } catch (error) {
      // Error handling
    }
  }
}

// Main Orchestrator
class WorkflowOrchestrator {
  private readonly dbHandlers: DBHandlers;
  private readonly utils: Utils;

  constructor(dbConfig: DBConfig) {
    this.dbHandlers = new DBHandlers(dbConfig);
  }

  async execute(input: WorkflowInput): Promise<WorkflowOutput> {
    try {
      // 1. Validate input
      await Utils.validateInput(input);

      // 2. Initialize steps
      const step1 = new APIStep(step1Config);
      const step2 = new APIStep(step2Config);

      // 3. Execute workflow steps
      const result1 = await Utils.retryOperation(() => 
        step1.execute(input)
      );

      // 4. Transform data if needed
      const transformedData = await Utils.transformData(result1);

      // 5. Store intermediate results if necessary
      await this.dbHandlers.insertData(transformedData);

      // 6. Execute next step
      const result2 = await Utils.retryOperation(() => 
        step2.execute(transformedData)
      );

      // 7. Prepare final output
      return {
        status: 'success',
        data: result2
      };
    } catch (error) {
      // Global error handling
      console.error('Workflow execution failed:', error);
      throw error;
    }
  }
}

// Usage
async function runWorkflow(input: WorkflowInput): Promise<WorkflowOutput> {
  const orchestrator = new WorkflowOrchestrator({
    // DB config
  });
  return await orchestrator.execute(input);
}
\`\`\`

IMPORTANT:
Generate a production-ready workflow JSON implementing these components, ensuring:
1. Proper separation of concerns
2. Reusable utility functions
3. Centralized database operations
4. Comprehensive error handling
5. Type safety throughout the codebase
6. Clear execution flow in the orchestrator
7. Proper dependency injection
8. Efficient error recovery strategies
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
