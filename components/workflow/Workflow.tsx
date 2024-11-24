"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Play,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { WorkflowStep } from "./workflow-step";
import { WorkflowVariable } from "./workflow-variable";
import Button from "../ui/button";
import Toggle from "../ui/toggle";

interface WorkflowVariableProps {
  id: string;
  name: string;
  defaultValue?: string;
  description?: string;
}

interface WorkflowProps {
  steps: Array<{
    id: string;
    endpointId: string;
    order: number;
    inputMapping: string;
    outputMapping: string;
  }>;
  variables: WorkflowVariableProps[];
}

export function Workflow({ steps, variables }: WorkflowProps) {
  const [showVariables, setShowVariables] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleCode = () => setShowCode(!showCode);
  const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  const workflowCode = `
const workflow = {
  variables: ${JSON.stringify(variables, null, 2)},
  steps: ${JSON.stringify(steps, null, 2)}
}
  `.trim();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 bg-white text-gray-800">
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
            {variables.map((variable, index) => (
              <motion.div
                key={variable.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <WorkflowVariable {...variable} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {showCode ? (
        <motion.pre
          className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <code>{workflowCode}</code>
        </motion.pre>
      ) : (
        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <WorkflowStep {...step} />
            </motion.div>
          ))}
        </div>
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
          onClick={() => copyTextToClipboard(workflowCode)}
        />
        <Button
          title={showCode ? "Show steps" : "Show code"}
          onClick={toggleCode}
        >
          <Toggle condition={showCode} />
        </Button>
      </div>
    </div>
  );
}
