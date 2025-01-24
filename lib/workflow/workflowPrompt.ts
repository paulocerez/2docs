export default function getWorkflowPrompt(prompt: string, context: string) {  
	return `
	You are an expert API workflow architect. Your task is to create a detailed workflow that accomplishes the following request:
  
	${prompt}
  
	Guidelines for creating the workflow:
  
	1. Analyze the available API endpoints and identify which ones are needed to accomplish the task.
	2. Create a step-by-step workflow where each step either:
	   - Makes an API call
	   - Processes data
	   - Handles setup/configuration
	   - Manages error handling
  
	For steps that make API calls, include ONLY:
	{
	  "title": "Clear and concise title",
	  "description": "Detailed description of what this step accomplishes",
	  "endpoint": {
		"method": "EXACT HTTP method from available endpoints",
		"path": "EXACT path from available endpoints"
	  },
	  "input": "Description of required input data",
	  "output": "Description of expected output data",
	  "codeSnippet": "TypeScript code implementing this step"
	}
  
	For non-API steps, omit the endpoint field and include:
	{
	  "title": "Clear and concise title",
	  "description": "Detailed description of what this step accomplishes",
	  "input": "Description of required input data (if any)",
	  "output": "Description of expected output data (if any)",
	  "codeSnippet": "TypeScript code implementing this step (if needed)"
	}
  
	Available API Endpoints:
	${context}
  
	Return the workflow as a JSON object with this structure:
	{
	  "description": "Clear description of what the workflow accomplishes",
	  "technicalOverview": "Technical overview of how the workflow works",
	  "steps": [
		// Array of step objects as described above
	  ],
	  "mainFunction": {
		"description": "Description of how the steps work together",
		"codeSnippet": "TypeScript code that orchestrates all steps"
	  },
	  "deploymentSuggestions": [
		{
		  "option": "Name of deployment option",
		  "benefits": ["List of benefits"],
		  "downsides": ["List of downsides"]
		}
	  ]
	}
  
	IMPORTANT REQUIREMENTS:
	1. Use EXACT method and path matches from the available endpoints
	2. Include proper error handling in all code snippets
	3. Use TypeScript with proper typing
	4. Use async/await for asynchronous operations
	5. Include comments explaining complex logic
	6. Ensure the mainFunction properly coordinates all steps
	7. Make steps modular and reusable where possible
	8. Include only realistic deployment suggestions
	9. Ensure all code snippets are complete and executable
	10. Use clear, descriptive names for variables and functions
  
	The workflow should be practical, maintainable, and follow best practices for enterprise-grade applications.
	`;
  }
  