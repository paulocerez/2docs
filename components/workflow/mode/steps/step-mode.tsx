import type { WorkflowProps, WorkflowStepProps } from "@/types/workflow";
import { WorkflowStep } from "../../workflow-step";
import MainFunctionBlock from "./main-function-block";
import DeploymentCarousel from "./deployment-carousel";

export default function StepMode({ workflow }: { workflow: WorkflowProps }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">
          Technical Overview
        </h3>
        <p className="text-sm text-gray-600 leading-6">
          {workflow.technicalOverview}
        </p>
      </div>

      {workflow.mainFunction && (
        <MainFunctionBlock mainFunction={workflow.mainFunction} />
      )}

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">
          Implementation Steps
        </h3>
        {workflow.steps
          .sort(
            (a: WorkflowStepProps, b: WorkflowStepProps) => a.order - b.order
          )
          .map((step: WorkflowStepProps) => (
            <div key={step.id}>
              <WorkflowStep {...step} />
            </div>
          ))}
      </div>

      {workflow.deploymentSuggestions &&
        workflow.deploymentSuggestions.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">
              Deployment Suggestions
            </h3>
            <DeploymentCarousel suggestions={workflow.deploymentSuggestions} />
          </div>
        )}
    </div>
  );
}
