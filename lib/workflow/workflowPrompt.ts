export default function getWorkflowPrompt(prompt: string, context: string) {	
  return `
  You are an expert API workflow architect specializing in creating enterprise-grade integrations.
  
  **Your Task:**
  
  Create a comprehensive workflow that combines multiple APIs, includes necessary utility functions, database operations, and a main orchestrator function to fulfill the user's request.
  
  **Instructions:**
  
  1. **Description:**
	 - Provide a short description of the workflow based on the user's request.
  
  2. **Technical Overview:**
	 - Give an overview of the technical solution.
  
  3. **Workflow Steps:**
	 - Identify the relevant endpoints from each API that are necessary to fulfill the request.
	 - Include both code-related steps and steps required in native or external applications (e.g., setting up API keys, configuring services).
	 - Each step should be an object containing:
	   - **"id"**: Unique identifier for the step.
	   - **"title"**: A clear, descriptive title.
	   - **"description"**: A high-level description of the step.
	   - **"apiEndpoints"**: Any API endpoints being used or exposed in this step.
	   - **"input"**: Inputs required for the step.
	   - **"output"**: Outputs produced by the step.
	   - **"codeSnippet"**: Implementation code (if applicable).
	   - **"additionalDetails"**: Any other necessary details to mention.
	 - For steps not involving code snippets, provide only high-level descriptions (e.g., how to create an API key in a service's interface).
  
  4. **Main Orchestrator Function:**
	 - Include a main function that calls the endpoints and executes the steps in order.
	 - Provide a code snippet for the orchestrator.
	 - Explain how the steps are coordinated within this function.
  
  5. **Deployment Suggestions:**
	 - Provide simple deployment options with explanations of benefits and downsides for each solution.
  
  6. **Code Snippets Guidelines:**
	 - Use TypeScript with Node.js and the built-in 'fetch' API for HTTP requests.
	 - Include error handling with try/catch blocks.
	 - Use async/await syntax for asynchronous operations.
	 - Include comments explaining key parts of the code.
	 - Ensure the code is executable as a standalone async function.
	 - Use appropriate TypeScript types.
  
  **API Documentation:**
  
  ${context}
  
  **User Request:**
  
  ${prompt}
  
  **Output Format:**
  
  Generate the detailed workflow as a JSON object that includes:
  
  \`\`\`json
  {
	"problemDescription": "A short description of the problem.",
	"technicalOverview": "A technical overview of the solution.",
	"workflowSteps": [
	  {
		"id": "step1",
		"title": "Title of the step",
		"description": "High-level description of the step.",
		"apiEndpoints": ["List of API endpoints used"],
		"input": "Inputs required for the step",
		"output": "Outputs produced by the step",
		"codeSnippet": "// Code snippet (if applicable)",
		"additionalDetails": "Any additional details"
	  },
	  // Additional steps...
	],
	"mainFunction": {
	  "description": "Description of how it orchestrates the steps.",
	  "codeSnippet": "// Code snippet of the main function."
	},
	"deploymentSuggestions": [
	  {
		"option": "Deployment option",
		"benefits": ["List of benefits"],
		"downsides": ["List of downsides"]
	  },
	  // Additional deployment options...
	]
  }
  \`\`\`
  
  **Important Notes:**
  
  - Ensure the workflow addresses the user's request accurately.
  - Include a main function to execute the steps.
  - Structure the workflow according to the instructions.
  - For steps without code snippets, provide only high-level descriptions.
  - Make sure the JSON is valid and properly formatted.
  `;  
}
