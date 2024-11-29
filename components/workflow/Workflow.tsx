"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Check,
  ChevronDown,
  ChevronUp,
  Code,
  Copy,
  Eye,
  Save,
} from "lucide-react";
import { WorkflowStep, WorkflowStepProps } from "./workflow-step";
import { WorkflowVariable, WorkflowVariableProps } from "./workflow-variable";
import Button from "../ui/button";

interface WorkflowProps {
  initialWorkflow: {
    steps: WorkflowStepProps[];
    variables: WorkflowVariableProps[];
  };
  onSave: (updatedWorkflow: any) => void;
}

const defaultWorkflow = {
  variables: [],
  steps: [],
};

export function Workflow({
  initialWorkflow = defaultWorkflow,
  onSave,
}: WorkflowProps) {
  const [showVariables, setShowVariables] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [workflowCode, setWorkflowCode] = useState(
    JSON.stringify(initialWorkflow, null, 2)
  );
  const [parsedWorkflow, setParsedWorkflow] = useState(initialWorkflow);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const parsed = JSON.parse(workflowCode);
      if (typeof parsed === "object" && parsed !== null) {
        setParsedWorkflow({
          steps: Array.isArray(parsed.steps) ? parsed.steps : [],
          variables: Array.isArray(parsed.variables) ? parsed.variables : [],
        });
        setError(null);
      } else {
        throw new Error("Invalid workflow structure");
      }
    } catch (e) {
      setError("Invalid JSON or workflow structure");
      setParsedWorkflow(defaultWorkflow);
    }
  }, [workflowCode]);

  const toggleCode = () => setShowCode(!showCode);

  const copyTextToClipboard = () => {
    navigator.clipboard.writeText(workflowCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!error) {
      onSave(parsedWorkflow);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 bg-white text-gray-800">
      <div className="flex justify-end">
        <button
          onClick={toggleCode}
          className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 transition-all duration-200"
        >
          {showCode ? (
            <>
              <Eye className="h-4 w-4" />
              View Steps
            </>
          ) : (
            <>
              <Code className="h-4 w-4" />
              View Code
            </>
          )}
        </button>
      </div>

      {showCode ? (
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
            <div className="mt-2 text-red-500 flex items-center text-xs">
              <AlertCircle className="h-4 w-4 mr-2" />
              {error}
            </div>
          )}
        </motion.div>
      ) : (
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
                className="mt-4 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {parsedWorkflow.variables.map((variable) => (
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
            {parsedWorkflow.steps.map((step) => (
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
          onClick={() => copyTextToClipboard()}
        />
        <Button
          border
          icon={<Save className="h-5 w-5" />}
          onClick={handleSave}
          disabled={!!error}
        />
      </div>
    </div>
  );
}
