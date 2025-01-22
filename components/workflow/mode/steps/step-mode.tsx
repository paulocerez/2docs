import { ChevronDown, ChevronUp } from "lucide-react";
import { WorkflowVariable } from "../../workflow-variable";
import { WorkflowStep } from "../../workflow-step";
import type { WorkflowProps } from "@/types/workflow";
import Orchestrator from "./orchestrator";
import SwipeTabs from "./swipe-tabs";

export default function StepMode({
  setShowVariables,
  showVariables,
  workflow,
}: {
  setShowVariables: (show: boolean) => void;
  showVariables: boolean;
  workflow: WorkflowProps;
}) {
  console.log(workflow.dbHandlers);

  return (
    <div className="space-y-6">
      <div className="border border-gray-200 rounded-lg p-2">
        <button
          onClick={() => setShowVariables(!showVariables)}
          className="w-full flex justify-between items-center p-1 text-gray-800 rounded-md transition-colors duration-200 text-sm"
        >
          <span>Workflow Variables</span>
          {showVariables ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {showVariables && (
          <div className="mt-4 space-y-2">
            {workflow.variables.length > 0 ? (
              workflow.variables.map((variable) => (
                <div key={variable.id}>
                  <WorkflowVariable {...variable} />
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 p-2">
                No variables needed for this workflow
              </p>
            )}
          </div>
        )}
      </div>
      {workflow.orchestrator && (
        <Orchestrator orchestrator={workflow.orchestrator} />
      )}

      <div className="space-y-6">
        {workflow.steps
          .sort((a, b) => a.order - b.order)
          .map((step) => (
            <div key={step.id}>
              <WorkflowStep {...step} />
            </div>
          ))}
      </div>
      <SwipeTabs
        setup={workflow.setup}
        utils={workflow.utils}
        dbHandlers={workflow.dbHandlers}
      />
    </div>
  );
}
