export interface WorkflowProps {
    id: string;
    title: string;
    description: string;
    technicalOverview: string;
    mainFunction: WorkflowMainFunctionProps;
	steps: WorkflowStepProps[];
	deploymentSuggestions: DeploymentSuggestion[];
}

export interface DeploymentSuggestion {
    option: string;
    benefits: string[];
    downsides: string[];
}

export interface WorkflowEndpoint {
	id: string;
	method: string;
	path: string;
	operation?: string;
	summary?: string;
	description?: string;
	parameters?: string;
	requestBody?: string;
	responses?: string;
  }

export interface WorkflowStepProps {
    id: string;
    workflowId: string;
    title: string;
    order: number;
    description: string;
    input?: string;
    output?: string;
    codeSnippet?: string;
    additionalDetails?: string;
    endpoint?: WorkflowEndpoint;
}

export interface WorkflowMainFunctionProps {
	description: string;
    codeSnippet: string;
}
