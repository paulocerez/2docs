import { eq } from "drizzle-orm";
import { db } from "../db";
import { InsertWorkflow, InsertWorkflowStep, InsertWorkflowVariable, workflows, workflowSteps, workflowVariables } from "../schema/workflows";
import { apiEndpoints } from "../schema/apis";
import { chats } from "../schema/chats";

export async function getWorkflowSteps(workflowId: string) {
	return await db.select().from(workflowSteps).where(eq(workflowSteps.workflowId, workflowId));
}

export async function createWorkflowStep(workflowStep: InsertWorkflowStep) {
	return await db.insert(workflowSteps).values(workflowStep).returning();
}

export async function getWorkflowsWithDetails() {
	return await db.select({
		workflow: workflows,
		steps: workflowSteps,
		variables: workflowVariables,
		endpoints: apiEndpoints
	}).from(workflows).leftJoin(workflowSteps, eq(workflows.id, workflowSteps.workflowId))
	.leftJoin(workflowVariables, eq(workflows.id, workflowVariables.workflowId))
	.leftJoin(apiEndpoints, eq(workflowSteps.endpointId, apiEndpoints.id));
}	

export async function saveWorkflow(workflowData: { title: string; description: string; steps: any[]; variables: any[]; }, userId: string) {
	const workflow: InsertWorkflow = {
		createdById: userId,
		title: workflowData.title,
		description: workflowData.description
	}

	const [savedWorkflow] = await db.insert(workflows).values(workflow).returning();

	// Save workflow steps
	if (Array.isArray(workflowData.steps)) {
		const steps: InsertWorkflowStep[] = workflowData.steps.map((step: any, index: number) => ({
		  workflowId: savedWorkflow.id,
		  endpointId: step.endpointId,
		  order: index + 1,
		  inputMapping: step.inputMapping || "",
		  outputMapping: step.outputMapping || "",
		}));
		await db.insert(workflowSteps).values(steps);
	  }
	
	  // Save workflow variables
	  if (Array.isArray(workflowData.variables)) {
		const variables: InsertWorkflowVariable[] = workflowData.variables.map((variable: any) => ({
		  workflowId: savedWorkflow.id,
		  name: variable.name,
		  defaultValue: variable.defaultValue || null,
		  description: variable.description || "",
		}));
		await db.insert(workflowVariables).values(variables);
	  }
	
	  return savedWorkflow;
	}

	export async function getWorkflowByChatId(chatId: string) {
		const [chat] = await db.select().from(chats).where(eq(chats.id, chatId));
	  
		if (!chat || !chat.workflowId) {
		  throw new Error("No workflow associated with this chat");
		}
	  
		const [workflow] = await db.select().from(workflows).where(eq(workflows.id, chat.workflowId));
	  
		if (!workflow) {
		  throw new Error("Workflow not found");
		}
	  
		// Fetch steps and variables if needed
		const steps = await db.select().from(workflowSteps).where(eq(workflowSteps.workflowId, workflow.id));
		const variables = await db.select().from(workflowVariables).where(eq(workflowVariables.workflowId, workflow.id));
	  
		return {
		  ...workflow,
		  steps,
		  variables,
		};
	  }