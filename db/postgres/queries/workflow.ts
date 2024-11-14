import { eq } from "drizzle-orm";
import { db } from "../db";
import { InsertWorkflowStep, workflows, workflowSteps, workflowVariables } from "../schema/workflows";
import { apiEndpoints } from "../schema/apis";

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
