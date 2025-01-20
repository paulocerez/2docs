import { eq } from "drizzle-orm";
import { db } from "../../db";
import { InsertWorkflow, InsertWorkflowStep, InsertWorkflowVariable, workflows, workflowStepEndpoints, workflowSteps, workflowVariables } from "../../schema/workflows";
import { apiEndpoints } from "../../schema/apis";
import { chats } from "../../schema/chats";
import { normalizePath, normalizeStepPaths } from "@/utils/normalizeEndpointPath";
import { getApiEndpoints } from "../api/api";

export async function getWorkflowSteps(workflowId: string) {
	return await db.select().from(workflowSteps).where(eq(workflowSteps.workflowId, workflowId));
}

export async function createWorkflowStep(workflowStep: InsertWorkflowStep) {
	return await db.insert(workflowSteps).values(workflowStep).returning();
}

export async function createWorkflow(workflow: InsertWorkflow) {
	return await db.insert(workflows).values(workflow).returning();
}

export async function createWorkflowVariable(workflowVariable: InsertWorkflowVariable) {
	return await db.insert(workflowVariables).values(workflowVariable).returning();
}

export async function insertWorkflowStep(step: any, workflowId: string): Promise<InsertWorkflowStep> {
    const [savedStep] = await db.insert(workflowSteps).values({
        workflowId: workflowId,
        title: step.title,
        order: step.order,
        inputMapping: typeof step.inputMapping === 'object' ? JSON.stringify(step.inputMapping) : step.inputMapping || "",
        outputMapping: typeof step.outputMapping === 'object' ? JSON.stringify(step.outputMapping) : step.outputMapping || "",
        codeSnippet: step.codeSnippet,
    }).returning();

    return savedStep;
}

export async function insertWorkflowStepEndpoints(stepId: string, endpointIds: string[]): Promise<void> {
    await db.insert(workflowStepEndpoints).values(
        endpointIds.map(endpointId => ({
            workflowStepId: stepId,
            endpointId: endpointId,
        }))
    );
}

export async function getWorkflowsWithDetails() {
    const workflowsWithSteps = await db.select({
        workflow: workflows,
        steps: workflowSteps,
        variables: workflowVariables,
    }).from(workflows)
    .leftJoin(workflowSteps, eq(workflows.id, workflowSteps.workflowId))
    .leftJoin(workflowVariables, eq(workflows.id, workflowVariables.workflowId));

    const workflowsWithEndpoints = await Promise.all(workflowsWithSteps.map(async (workflow) => {
        if (workflow.steps) {
            const stepEndpoints = await db.select()
                .from(workflowStepEndpoints)
                .innerJoin(apiEndpoints, eq(workflowStepEndpoints.endpointId, apiEndpoints.id))
                .where(eq(workflowStepEndpoints.workflowStepId, workflow.steps.id));

            return {
                ...workflow,
                steps: {
                    ...workflow.steps,
                    endpoints: stepEndpoints.map(relation => ({
                        method: relation.api_endpoint.method,
                        path: relation.api_endpoint.path
                    }))
                }
            };
        }
        return workflow;
    }));

    return workflowsWithEndpoints;
}

export async function saveWorkflow(workflowData: any, userId: string) {
	console.log("Saving workflow in saveWorkflow function...");
	const workflow: InsertWorkflow = {
		createdById: userId,
		title: workflowData.title,
		description: workflowData.description,
		orchestrator: workflowData.orchestrator || null,
		utils: workflowData.utils || null,
		dbHandlers: workflowData.dbHandlers || null,
		setup: workflowData.setup || null
	}

	const [savedWorkflow] = await createWorkflow(workflow);

	// First, fetch all endpoints to map paths to IDs
	const endpoints = await getApiEndpoints();

	console.log("Available endpoints:", endpoints.map(e => ({
		method: e.method,
		path: e.path
	})));
	
	// Save workflow steps
	if (Array.isArray(workflowData.steps)) {
		for (const step of workflowData.steps) {
			// Log the current step being processed
			console.log("Processing step:", {
				method: step.method,
				endpoint: step.endpoint
			});

			// Try to find a matching endpoint with more flexible matching
			const matchingEndpoint = endpoints.find(e => {
				const endpointPathParts = e.path.split('/').filter(Boolean);
				const stepPathParts = step.endpoint.split('/').filter(Boolean);

				// Check if the paths have the same structure (same number of segments)
				if (endpointPathParts.length !== stepPathParts.length) {
					return false;
				}

				// Check if method matches (case-insensitive)
				if (e.method.toLowerCase() !== step.method.toLowerCase()) {
					return false;
				}

				// Compare path segments, allowing for parameter placeholders
				return endpointPathParts.every((segment, index) => {
					const stepSegment = stepPathParts[index];
					// If the endpoint segment starts with {, it's a parameter
					// If the step segment is in the format YOUR_SOMETHING_ID, it's a placeholder
					return segment === stepSegment || 
						   segment.startsWith('{') || 
						   stepSegment.includes('YOUR_') ||
						   stepSegment.includes('_ID');
				});
			});

			if (!matchingEndpoint) {
				console.error("No matching endpoint found. Available endpoints:", endpoints);
				console.error("Step being matched:", step);
				throw new Error(
					`No matching endpoint found for ${step.method} ${step.endpoint}. ` +
					`Available endpoints: ${endpoints.map(e => `${e.method} ${e.path}`).join(', ')}`
				);
			}

			try {
				const savedStep = await insertWorkflowStep(step, savedWorkflow.id);
				if (savedStep.id) {
					await insertWorkflowStepEndpoints(savedStep.id, [matchingEndpoint.id]);
				} else {
					throw new Error("Saved step is missing an ID");
				}
			} catch (error) {
				console.error("Error inserting workflow step:", error);
				throw error;
			}
		}
	}
	
	// Save workflow variables
	if (Array.isArray(workflowData.variables) && workflowData.variables.length > 0) {
		const variables: InsertWorkflowVariable[] = workflowData.variables.map((variable: any) => ({
			workflowId: savedWorkflow.id,
			name: variable.name,
			defaultValue: variable.defaultValue || null,
			description: variable.description || null,
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
  
	// Fetch steps and variables
	const steps = await db.select().from(workflowSteps).where(eq(workflowSteps.workflowId, workflow.id));
	const stepEndpoints = await Promise.all(steps.map(async (step) => {
        const endpointRelations = await db.select()
            .from(workflowStepEndpoints)
            .innerJoin(apiEndpoints, eq(workflowStepEndpoints.endpointId, apiEndpoints.id))
            .where(eq(workflowStepEndpoints.workflowStepId, step.id));

        return {
            ...step,
            endpoints: endpointRelations.map(relation => ({
                method: relation.api_endpoint.method,
                path: relation.api_endpoint.path
            })),
            inputMapping: step.inputMapping ? JSON.parse(step.inputMapping) : {},
            outputMapping: step.outputMapping ? JSON.parse(step.outputMapping) : {}
        };
    }));
	const variables = await db.select().from(workflowVariables).where(eq(workflowVariables.workflowId, workflow.id));
  
	return {
		title: workflow.title,
		description: workflow.description,
		steps: stepEndpoints,
		variables: variables,
		orchestrator: workflow.orchestrator,
		utils: workflow.utils,
		dbHandlers: workflow.dbHandlers,
		setup: workflow.setup
	};
}