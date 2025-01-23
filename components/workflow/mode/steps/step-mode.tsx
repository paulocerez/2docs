import type { WorkflowProps, WorkflowStepProps } from "@/types/workflow";
import { WorkflowStep } from "../../workflow-step";
import MainFunctionBlock from "./main-function";
import DeploymentCarousel from "./deployment-carousel";
import SectionBlock from "./section-block";

export default function StepMode({ workflow }: { workflow: WorkflowProps }) {
  return (
    <div className="space-y-12">
      {workflow.technicalOverview && (
        <SectionBlock
          title="Technical Overview"
          description={workflow.technicalOverview}
        ></SectionBlock>
      )}

      {workflow.mainFunction && (
        <SectionBlock>
          <MainFunctionBlock mainFunction={workflow.mainFunction} />
        </SectionBlock>
      )}

      <SectionBlock
        title="Implementation Steps"
        description="Here are the steps to implement this workflow."
      >
        {workflow.steps
          .sort(
            (a: WorkflowStepProps, b: WorkflowStepProps) => a.order - b.order
          )
          .map((step: WorkflowStepProps) => (
            <div key={step.id}>
              <WorkflowStep {...step} />
            </div>
          ))}
      </SectionBlock>

      {workflow.deploymentSuggestions &&
        workflow.deploymentSuggestions.length > 0 && (
          <SectionBlock
            title="Deployment Suggestions"
            description="Here are some suggestions on how to serve this workflow."
          >
            <DeploymentCarousel suggestions={workflow.deploymentSuggestions} />
          </SectionBlock>
        )}
    </div>
  );
}
