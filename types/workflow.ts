// TODO: Add types for workflow, steps, and variables

export interface WorkflowProps {
    id: string;
    title: string;
    description: string;
    technicalOverview: string;
    mainFunction: WorkflowMainFunctionProps;
	steps: WorkflowStepProps[];
	deploymentSuggestions: DeploymentSuggestion[] | null;
}

export interface DeploymentSuggestion {
    option: string;
    benefits: string[];
    downsides: string[];
}

export interface WorkflowStepProps {
    id: string;
    workflowId: string;
    title: string;
    order: number;
    description: string | null;
    apiEndpoints: string[] | null;
    input: string | null;
    output: string | null;
    codeSnippet: string | null;
    additionalDetails: string | null;
}

export interface WorkflowMainFunctionProps {
	description: string;
    codeSnippet: string;
}
