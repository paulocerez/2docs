export interface WorkflowStepProps {
	id: string;
	title: string;
	endpoints: {
		method: string;
		path: string;
	}[];
	method: string;
	order: number;
	inputMapping?: string | Record<string, any>;
	outputMapping?: string | Record<string, any>;
	description?: string;
	loop?: {
	  over: string;
	  action: string;
	};
	codeSnippet: string;
  }

  export interface WorkflowVariableProps {
	id: string;
	name: string;
	defaultValue?: string;
	description?: string;
	onChange?: (updatedVariable: WorkflowVariableProps) => void;
  }

  export interface DbHandlersProps {
	name: string;
	operation: string;
	table: string;
	purpose: string;
	input: string;
	output: string;
	codeSnippet: string;
	errorHandling: string;
  }

  export interface ConfigProps {
	tsconfig: string;
	env: string[];
  }

  export interface SetupProps {
	configuration: ConfigProps;
	dependencies: string[];
  }

  export interface OrchestratorProps {
	name: string;
	description: string;
	input: string;
	output: string;
	errorHandling: string;
	codeSnippet: string;
  }

export interface WorkflowProps {
  title: string;
  description: string;
  steps: WorkflowStepProps[];
  variables: WorkflowVariableProps[];
  orchestrator?: OrchestratorProps;
  utils?: {
    name: string;
    purpose: string;
    input: string;
    output: string;
    codeSnippet: string;
    usage: string;
  }[];
  dbHandlers?: {
    name: string;
    operation: string;
    table: string;
    purpose: string;
    input: string;
    output: string;
    codeSnippet: string;
    errorHandling: string;
  }[];
  setup?: SetupProps;
}

export interface UtilsProps {
	name: string;
	purpose: string;
	input: string;
	output: string;
	codeSnippet: string;
	usage: string;
  }