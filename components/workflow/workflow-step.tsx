"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { StepNumber } from "./workflow-step-number";
import CodeBlock from "./mode/steps/code-block";
import type { WorkflowStepProps } from "@/types/workflow";

export function WorkflowStep({
  title,
  order,
  description,
  apiEndpoints,
  input,
  output,
  codeSnippet,
  additionalDetails,
}: WorkflowStepProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedInput =
    typeof input === "string" ? input : JSON.stringify(input, null, 2);

  const formattedOutput =
    typeof output === "string" ? output : JSON.stringify(output, null, 2);

  console.log(apiEndpoints);

  return (
    <div className="border border-gray-100 rounded-lg transition-all duration-200">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex flex-row items-center justify-between p-4 cursor-pointer transition-colors duration-200"
      >
        <div className="flex items-center space-x-4">
          <StepNumber number={order} />
          <h3 className="text-sm font-normal text-gray-500">{title}</h3>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 hover:text-gray-500 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="px-4 pb-4 space-y-4"
        >
          {description && (
            <div className="ml-10 space-y-2">
              <h4 className="text-xs font-medium text-gray-500">Description</h4>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          )}

          <div className="ml-10 space-y-2">
            {apiEndpoints?.map((endpoint: any) => (
              <div
                key={`${endpoint.method}-${endpoint.path}`}
                className="flex items-center space-x-2 text-xs text-gray-600 bg-gray-50 p-2 rounded-md"
              >
                <span className="font-mono uppercase text-blue-600">
                  {endpoint.method}
                </span>
                <ArrowRight className="h-3 w-3 text-gray-400" />
                <span className="font-mono">{endpoint.path}</span>
              </div>
            ))}
          </div>

          <div className="ml-10 space-y-4">
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-gray-500">
                Code Implementation
              </h4>
              <CodeBlock content={codeSnippet} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-gray-500">Inputs</h4>
                <div className="bg-gray-50 p-3 rounded-md">
                  <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                    {formattedInput || "No input mapping specified"}
                  </pre>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-medium text-gray-500">Outputs</h4>
                <div className="bg-gray-50 p-3 rounded-md">
                  <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                    {formattedOutput || "No output mapping specified"}
                  </pre>
                </div>
              </div>
            </div>

            {additionalDetails && (
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-gray-500">
                  Additional Details
                </h4>
                <p className="text-sm text-gray-600">{additionalDetails}</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
