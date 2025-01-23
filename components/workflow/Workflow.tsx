"use client";

import { useEffect, useState } from "react";
import JsonMode from "./mode/json-mode";
import CodeMode from "./mode/code-mode";
import StepMode from "./mode/steps/step-mode";
import ModeDropdown from "./mode-dropdown";
import CopySaveButton from "./copy-save-button";
import type { WorkflowProps } from "@/types/workflow";

type ViewMode = "steps" | "json" | "fullCode";

interface WorkflowComponentProps {
  workflow: WorkflowProps;
  onSave?: (workflow: WorkflowProps) => void;
  className?: string;
  workflowRef?: React.RefObject<HTMLDivElement>;
}

export function Workflow({
  workflow,
  onSave,
  className = "",
  workflowRef,
}: WorkflowComponentProps) {
  const [showDiff, setShowDiff] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("steps");
  const [copied, setCopied] = useState(false);
  const [workflowCode, setWorkflowCode] = useState(
    JSON.stringify(workflow, null, 2)
  );
  const [error, setError] = useState<string | null>(null);

  const fullCodeSnippet = workflow?.steps
    ? workflow.steps
        .map((step: any) => `// ${step.title}\n${step.codeSnippet}`)
        .join("\n\n")
    : "";

  useEffect(() => {
    if (workflow) {
      setShowDiff(true);
      const timer = setTimeout(() => setShowDiff(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [workflow]);

  console.log("workflow", workflow);

  return (
    <div
      ref={workflowRef}
      className={`max-w-2xl space-y-8 bg-white text-gray-800 ${className}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col space-y-4 w-full">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-md font-semibold text-gray-800">
              {workflow?.title || "Untitled Workflow"}
            </h1>
            <div className="flex flex-row items-center space-x-2">
              <CopySaveButton
                viewMode={viewMode}
                workflowCode={workflowCode}
                fullCodeSnippet={fullCodeSnippet}
                onSave={onSave || (() => {})}
              />
              <ModeDropdown viewMode={viewMode} setViewMode={setViewMode} />
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {workflow.description || "No description"}
          </p>
        </div>
      </div>

      {viewMode === "json" && (
        <JsonMode
          workflowCode={workflowCode}
          setWorkflowCode={setWorkflowCode}
          error={error || ""}
        />
      )}

      {viewMode === "fullCode" && (
        <CodeMode
          fullCodeSnippet={fullCodeSnippet}
          setWorkflowCode={setWorkflowCode}
        />
      )}
      {viewMode === "steps" && <StepMode workflow={workflow} />}
    </div>
  );
}
