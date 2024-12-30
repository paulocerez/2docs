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