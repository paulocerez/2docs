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
import { WorkflowStep, WorkflowStepProps } from "./workflow-step";
import { WorkflowVariable, WorkflowVariableProps } from "./workflow-variable";
import Button from "../ui/button";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

interface WorkflowProps {
  initialWorkflow: {
    title: string;
    steps: WorkflowStepProps[];
    variables: WorkflowVariableProps[];
  };
  onSave?: (workflow: any) => void;
}

type ViewMode = "steps" | "json" | "fullCode";

export function Workflow({ initialWorkflow, onSave }: WorkflowProps) {
  const [showVariables, setShowVariables] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("steps");
  const [copied, setCopied] = useState(false);
  const [workflowCode, setWorkflowCode] = useState(
    JSON.stringify(initialWorkflow, null, 2)
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

  const fullCodeSnippet = initialWorkflow.steps
    .map((step) => `// ${step.title}\n${step.codeSnippet}`)
    .join("\n\n");

  const copyTextToClipboard = () => {
    const textToCopy = viewMode === "json" ? workflowCode : fullCodeSnippet;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 bg-white text-gray-800">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800 px-2">
          {initialWorkflow.title || "Untitled Workflow"}
        </h1>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 transition-all duration-200"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            {viewMode === "steps" ? (
              <>
                <Eye className="h-4 w-4" aria-hidden="true" />
                <span>View Steps</span>
              </>
            ) : viewMode === "json" ? (
              <>
                <Code className="h-4 w-4" aria-hidden="true" />
                <span>View JSON</span>
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span>View Full Code</span>
              </>
            )}
            {isDropdownOpen ? (
              <IoIosArrowUp className="h-4 w-4" />
            ) : (
              <IoIosArrowDown className="h-4 w-4" />
            )}
          </button>

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
        <motion.div
          className="border border-gray-200 rounded-lg p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <textarea
            className="w-full h-96 p-2 text-sm font-mono bg-gray-50 border border-gray-300 rounded-md"
            value={workflowCode}
            onChange={(e) => setWorkflowCode(e.target.value)}
          />
          {error && (
            <div className="mt-2 text-red-500 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              {error}
            </div>
          )}
        </motion.div>
      )}

      {viewMode === "fullCode" && (
        <motion.div
          className="border border-gray-200 rounded-lg p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <textarea
            className="w-full h-96 p-2 text-sm font-mono bg-gray-50 border border-gray-300 rounded-md overflow-auto"
            value={fullCodeSnippet}
            onChange={(e) => setWorkflowCode(e.target.value)}
          />
        </motion.div>
      )}

      {viewMode === "steps" && (
        <>
          <motion.div
            className="border border-gray-200 rounded-lg p-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => setShowVariables(!showVariables)}
              className="w-full flex justify-between items-center p-2 text-gray-800 rounded-md transition-colors duration-200"
            >
              <span>Workflow Variables</span>
              {showVariables ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {showVariables && (
              <motion.div
                className="mt-4 space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {initialWorkflow.variables.map((variable) => (
                  <motion.div
                    key={variable.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <WorkflowVariable {...variable} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          <div className="space-y-6">
            {initialWorkflow.steps.map((step) => (
              <motion.div
                key={step.id}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <WorkflowStep {...step} />
              </motion.div>
            ))}
          </div>
        </>
      )}

      <div className="flex flex-row justify-between transition-all duration-200">
        <Button
          title={copied ? "Copied!" : "Copy Workflow"}
          icon={
            copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )
          }
          onClick={copyTextToClipboard}
        />
        <Button
          border
          icon={<Save className="h-5 w-5" />}
          onClick={() => onSave && onSave(JSON.parse(workflowCode))}
          disabled={!!error}
        />
      </div>
    </div>
  );
}
