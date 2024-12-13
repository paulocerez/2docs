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
import CopySaveButton from "./copy-save-button";
import ModeToggle from "./mode-toggle";
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fullCodeSnippet = workflow.steps
    .map((step) => `// ${step.title}\n${step.codeSnippet}`)
    .join("\n\n");

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 bg-white text-gray-800">
      <div className="flex justify-between items-center">
        <h1 className="text-md font-semibold text-gray-800 px-2">
          {workflow.title}
        </h1>
        <div className="relative" ref={dropdownRef}>
          <ModeToggle
            viewMode={viewMode}
            setViewMode={setViewMode}
            isDropdownOpen={isDropdownOpen}
          />
          {isDropdownOpen && (
            <div
              className="absolute text-xs right-0 top-full mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5
              transform transition-all duration-200 ease-out origin-top
              animate-in fade-in slide-in-from-top-2"
            >
              <div className="py-1" role="menu" aria-orientation="vertical">
                <button
                  onClick={() => {
                    setViewMode("steps");
                    setIsDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                  role="menuitem"
                >
                  <Eye className="h-4 w-4 inline mr-2" />
                  View Steps
                </button>
                <button
                  onClick={() => {
                    setViewMode("json");
                    setIsDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                  role="menuitem"
                >
                  <Code className="h-4 w-4 inline mr-2" />
                  View JSON
                </button>
                <button
                  onClick={() => {
                    setViewMode("fullCode");
                    setIsDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                  role="menuitem"
                >
                  <FileText className="h-4 w-4 inline mr-2" />
                  View Full Code
                </button>
              </div>
            </div>
          )}
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
