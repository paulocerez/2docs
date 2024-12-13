"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Check,
  ChevronDown,
  ChevronUp,
  Code,
  Copy,
  Eye,
  FileText,
  Save,
} from "lucide-react";
import { WorkflowStep } from "./workflow-step";
import { WorkflowVariable, WorkflowVariableProps } from "./workflow-variable";
import Button from "../ui/button";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { WorkflowStepProps } from "@/types/workflow";
import JsonMode from "./mode/json-mode";
import CodeMode from "./mode/code-mode";
import StepMode from "./mode/step-mode";
import ModeDropdown from "./mode-dropdown";
import CopySaveButton from "./copy-save-button";

interface WorkflowProps {
  initialWorkflow: {
    title: string;
    steps: WorkflowStepProps[];
    variables: WorkflowVariableProps[];
    codeSnippet: string;
  };
  onSave?: (workflow: any) => void;
}

type ViewMode = "steps" | "json" | "fullCode";

export function Workflow({ initialWorkflow, onSave }: WorkflowProps) {
  const workflow = {
    title: initialWorkflow?.title || "Untitled Workflow",
    steps: initialWorkflow?.steps || [],
    variables: initialWorkflow?.variables || [],
    codeSnippet: initialWorkflow?.codeSnippet,
  };

  const [showVariables, setShowVariables] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("steps");
  const [copied, setCopied] = useState(false);
  const [workflowCode, setWorkflowCode] = useState(
    JSON.stringify(workflow, null, 2)
  );
  const [error, setError] = useState<string | null>(null);

  const fullCodeSnippet = workflow.steps
    .map((step) => `// ${step.title}\n${step.codeSnippet}`)
    .join("\n\n");

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 bg-white text-gray-800">
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
