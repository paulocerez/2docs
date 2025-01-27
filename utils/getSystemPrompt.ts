export const getSystemPrompt = (codeSnippet: string) => {
	return `You are an AI assistant helping users understand a workflow. 
	The workflow code is: ${codeSnippet}
	Provide clear, detailed explanations about the workflow's functionality, implementation, and any specific questions the user has.`;
}