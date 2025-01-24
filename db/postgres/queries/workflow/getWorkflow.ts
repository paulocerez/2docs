import { eq } from "drizzle-orm";

import { workflows, workflowStepEndpoints, workflowSteps } from "../../schema/workflows";
import { db } from "../../db";
import { apiEndpoints } from "../../schema/apis";
import { chats } from "../../schema/chats";

export async function getWorkflowById(workflowId: string) {
	// Get the workflow
	const [workflow] = await db.select().from(workflows)
	  .where(eq(workflows.id, workflowId));
  
	if (!workflow) {
	  throw new Error("Workflow not found");
	}
  
	// Get steps with their endpoints
	const steps = await db.select({
	  step: workflowSteps,
	  endpoint: apiEndpoints,
	})
	.from(workflowSteps)
	.leftJoin(
	  workflowStepEndpoints,
	  eq(workflowSteps.id, workflowStepEndpoints.workflowStepId)
	)
	.leftJoin(
	  apiEndpoints,
	  eq(workflowStepEndpoints.endpointId, apiEndpoints.id)
	)
	.where(eq(workflowSteps.workflowId, workflowId))
	.orderBy(workflowSteps.order);
  
	// Parse JSON fields and format the response
	const formattedSteps = steps.map(({ step, endpoint }) => ({
	  ...step,
	  input: step.input,
	  output: step.output,
	  additionalDetails: step.additionalDetails ? JSON.parse(step.additionalDetails) : null,
	  endpoint: endpoint ? {
		id: endpoint.id,
      path: endpoint.path,
      method: endpoint.method,
      operation: endpoint.operation,
      summary: endpoint.summary,
      description: endpoint.description,
      parameters: endpoint.parameters,
      requestBody: endpoint.requestBody,
      responses: endpoint.responses,
	  } : null,
	}));
  
	return {
	  ...workflow,
	  mainFunction: workflow.mainFunction,
	  deploymentSuggestions: workflow.deploymentSuggestions,
	  steps: formattedSteps,
	};
  }
  
  export async function getWorkflowByChatId(chatId: string) {
	const [chat] = await db.select().from(chats)
	  .where(eq(chats.id, chatId));
  
	if (!chat?.workflowId) {
	  throw new Error("No workflow associated with this chat");
	}
  
	return getWorkflowById(chat.workflowId);
  }
  
  // Get all workflows with their steps
  export async function getWorkflowsWithSteps() {
	const workflowsData = await db.select().from(workflows);
	
	const result = await Promise.all(workflowsData.map(async (workflow) => {
	  const workflowWithSteps = await getWorkflowById(workflow.id);
	  return workflowWithSteps;
	}));
  
	return result;
  }

  export async function getWorkflowSteps(workflowId: string) {
	return await db.select().from(workflowSteps)
	  .where(eq(workflowSteps.workflowId, workflowId))
	  .orderBy(workflowSteps.order);
  }