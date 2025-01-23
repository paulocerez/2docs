import { eq } from "drizzle-orm";
import { db } from "../../db";
import { InsertWorkflow, InsertWorkflowStep, workflows, workflowSteps } from "../../schema/workflows";
import { chats } from "../../schema/chats";
import { WorkflowProps } from "@/types/workflow";

export async function getWorkflowSteps(workflowId: string) {
	return await db.select().from(workflowSteps).where(eq(workflowSteps.workflowId, workflowId));
}

export async function createWorkflowStep(workflowStep: InsertWorkflowStep) {
	return await db.insert(workflowSteps).values(workflowStep).returning();
}

export async function createWorkflow(workflow: InsertWorkflow) {
	return await db.insert(workflows).values(workflow).returning();
}

export async function insertWorkflowStep(step: any, workflowId: string): Promise<InsertWorkflowStep> {
    const [savedStep] = await db.insert(workflowSteps).values({
        workflowId: workflowId,
        title: step.title,
        order: step.order,
        input: step.input ? JSON.stringify(step.input) : null,
        output: step.output ? JSON.stringify(step.output) : null,
        apiEndpoints: step.apiEndpoints ||  null,
        codeSnippet: step.codeSnippet || null,
        description: step.description || null,
        additionalDetails: step.additionalDetails || null,
    }).returning();

    return savedStep;
}

export async function getWorkflowsWithSteps() {
    const workflowsWithSteps = await db.select({
        workflow: workflows,
        steps: workflowSteps,
    })
    .from(workflows)
    .leftJoin(workflowSteps, eq(workflows.id, workflowSteps.workflowId));

    // Parse JSON fields in steps
    return workflowsWithSteps.map(({ workflow, steps }) => {
        const parsedSteps = Array.isArray(steps) ? steps.map((step) => ({
            ...step,
            input: step.input ? JSON.parse(step.input) : null,
            output: step.output ? JSON.parse(step.output) : null,
            apiEndpoints: step.apiEndpoints || null,
        })) : [];

        return {
            workflow,
            steps: parsedSteps,
        };
    });
}


export async function saveWorkflow(workflowData: any, userId: string) {
	console.log("Saving workflow in saveWorkflow function...");
	const workflow: InsertWorkflow = {
		createdById: userId,
		title: workflowData.title,
		description: workflowData.description,
		mainFunction: workflowData.mainFunction,
		deploymentSuggestions: workflowData.deploymentSuggestions,
		technicalOverview: workflowData.technicalOverview,
	}

	const [savedWorkflow] = await createWorkflow(workflow);

	const steps = workflowData.workflowSteps || workflowData.steps;
	
	if (Array.isArray(steps)) {
        for (const [index, step] of steps.entries()) {
            step.order = step.order || index + 1;

            try {
                await insertWorkflowStep(step, savedWorkflow.id);
            } catch (error) {
                console.error("Error inserting workflow step:", error);
                throw error;
            }
        }
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
  
	// Fetch steps
	const steps = await db.select().from(workflowSteps)
        .where(eq(workflowSteps.workflowId, workflow.id))
        .orderBy(workflowSteps.order);

		const parsedSteps = steps.map(step => ({
			...step,
			input: step.input ? JSON.parse(step.input) : null,
			output: step.output ? JSON.parse(step.output) : null,
			apiEndpoints: step.apiEndpoints || null,
		}));
		

	return {
		title: workflow.title,
		description: workflow.description,
		steps: parsedSteps,
		mainFunction: workflow.mainFunction,
		technicalOverview: workflow.technicalOverview,
		deploymentSuggestions: workflow.deploymentSuggestions,
	};
}