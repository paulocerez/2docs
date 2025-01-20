"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { WorkflowStepProps } from "@/types/workflow";
import { StepNumber } from "./workflow-step-number";

export function WorkflowStep({
  title,
  endpoints,
  method,
  order,
  inputMapping,
  outputMapping,
  codeSnippet,
  description,
}: WorkflowStepProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedInput =
    typeof inputMapping === "string"
      ? inputMapping
      : JSON.stringify(inputMapping, null, 2);

  const formattedOutput =
    typeof outputMapping === "string"
      ? outputMapping
      : JSON.stringify(outputMapping, null, 2);

  return (
    <motion.div layout transition={{ duration: 0.5, type: "spring" }}>
      <div className="flex flex-row items-center justify-between p-4 pb-2">
        <div className="flex flex-col">
          <div className="flex items-center space-x-4">
            <StepNumber number={order} />
            <div className="flex flex-col">
              <p className="text-sm font-normal text-slate-700">{title}</p>
            </div>
          </div>
          {endpoints.map((endpoint) => (
            <p
              className="text-xs text-gray-500 mt-1 ml-10"
              key={`${endpoint.method}-${endpoint.path}`}
            >
              {endpoint.method} {endpoint.path}
            </p>
          ))}
          {description && (
            <p className="text-xs text-gray-500 mt-1 ml-8">
              {description || "No description"}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      <div className="p-1">
        {isExpanded && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mt-4 space-y-4 px-4">
                <div className="bg-gray-800 rounded-md p-4">
                  <pre className="text-xs text-gray-200 overflow-x-auto">
                    {codeSnippet}
                  </pre>
                </div>
                <div className="space-y-2">
                  <div className="bg-gray-100 p-2 rounded-md">
                    <h4 className="font-semibold text-sm text-purple-600">
                      Input:
                    </h4>
                    <pre className="text-xs overflow-x-auto text-gray-700">
                      {formattedInput || "No input mapping specified"}
                    </pre>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-md">
                    <h4 className="font-semibold text-sm text-purple-600">
                      Output:
                    </h4>
                    <pre className="text-xs overflow-x-auto text-gray-700">
                      {formattedOutput || "No output mapping specified"}
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}
