"use client";

import { useEffect, useState } from "react";
import { WorkflowStepProps } from "@/types/workflow";
import JsonMode from "./mode/json-mode";
import CodeMode from "./mode/code-mode";
import StepMode from "./mode/step-mode";
import ModeDropdown from "./mode-dropdown";
import CopySaveButton from "./copy-save-button";
import { WorkflowVariableProps } from "./workflow-variable";

interface WorkflowProps {
  initialWorkflow: {
    title: string;
    steps: WorkflowStepProps[];
    variables: WorkflowVariableProps[];
    codeSnippet: string;
  };
  onSave?: (workflow: any) => void;
  className?: string;
  workflowRef?: React.RefObject<HTMLDivElement>;
}

type ViewMode = "steps" | "json" | "fullCode";

export function Workflow({
  initialWorkflow,
  onSave,
  className = "",
  workflowRef,
}: WorkflowProps) {
  const workflow = {
    title: initialWorkflow?.title || "Untitled Workflow",
    steps: initialWorkflow?.steps || [],
    variables: initialWorkflow?.variables || [],
    codeSnippet: initialWorkflow?.codeSnippet,
  };

  const [showVariables, setShowVariables] = useState(false);
  const [showDiff, setShowDiff] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("steps");
  const [copied, setCopied] = useState(false);
  const [workflowCode, setWorkflowCode] = useState(
    JSON.stringify(workflow, null, 2)
  );
  const [error, setError] = useState<string | null>(null);

  const fullCodeSnippet = workflow.steps
    .map((step) => `// ${step.title}\n${step.codeSnippet}`)
    .join("\n\n");

  useEffect(() => {
    if (initialWorkflow) {
      setShowDiff(true);
      const timer = setTimeout(() => setShowDiff(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [initialWorkflow]);

  return (
    <div
      ref={workflowRef}
      className={`max-w-2xl space-y-8 bg-white text-gray-800 ${className}`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-md font-semibold text-gray-800 px-2">
          {workflow.title}
        </h1>
        <ModeDropdown viewMode={viewMode} setViewMode={setViewMode} />
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

      {viewMode === "steps" && (
        <StepMode
          setShowVariables={setShowVariables}
          showVariables={showVariables}
          workflow={workflow}
        />
      )}

      <CopySaveButton
        viewMode={viewMode}
        workflowCode={workflowCode}
        fullCodeSnippet={fullCodeSnippet}
        onSave={onSave || (() => {})}
        error={error || ""}
      />
    </div>
  );
}
