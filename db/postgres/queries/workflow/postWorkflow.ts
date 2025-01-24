import { db } from "../../db";
import { InsertWorkflow, InsertWorkflowStep, workflows, workflowStepEndpoints, workflowSteps } from "../../schema/workflows";
import { WorkflowStepProps } from "@/types/workflow";

export async function createWorkflowStep(workflowStep: InsertWorkflowStep) {
	return await db.insert(workflowSteps).values(workflowStep).returning();
}

export async function createWorkflow(workflow: InsertWorkflow) {
	return await db.insert(workflows).values(workflow).returning();
}


export async function insertWorkflowStepWithEndpoint(
	step: WorkflowStepProps, 
	workflowId: string
  ): Promise<InsertWorkflowStep> {
	  // Create the workflow step
	  const [savedStep] = await db.insert(workflowSteps).values({
		workflowId,
		title: step.title,
		order: step.order,
		description: step.description,
		input: step.input ? JSON.stringify(step.input) : null,
		output: step.output ? JSON.stringify(step.output) : null,
		codeSnippet: step.codeSnippet || null,
		additionalDetails: step.additionalDetails ? JSON.stringify(step.additionalDetails) : null,
	  }).returning();
  
	  // If there's an endpoint ID, create the relationship
	  if (step.endpoint?.id) {
		await db.insert(workflowStepEndpoints).values({
		  workflowStepId: savedStep.id,
		  endpointId: step.endpoint.id,
		});
	  }
  
	  return savedStep;
}

export async function saveWorkflow(workflowData: any, userId: string) {
	  // Create the workflow
	  const [savedWorkflow] = await db.insert(workflows).values({
		createdById: userId,
		title: workflowData.title,
		description: workflowData.description,
		technicalOverview: workflowData.technicalOverview,
		mainFunction: workflowData.mainFunction ? JSON.stringify(workflowData.mainFunction) : null,
		deploymentSuggestions: workflowData.deploymentSuggestions ? 
		  JSON.stringify(workflowData.deploymentSuggestions) : null,
	  }).returning();
  
	  // Create steps with endpoint relationships
	  const steps = workflowData.steps;
	  if (Array.isArray(steps)) {
		for (const [index, step] of steps.entries()) {
		  step.order = step.order || index + 1;
		  await insertWorkflowStepWithEndpoint(step, savedWorkflow.id);
		}
	  }
  
	  return savedWorkflow;
}