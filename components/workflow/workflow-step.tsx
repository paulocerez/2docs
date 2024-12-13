"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WorkflowStepProps {
  id: string;
  title: string;
  endpoint: string;
  method: string;
  order: number;
  inputMapping?: string | Record<string, any>;
  outputMapping?: string | Record<string, any>;
  loop?: {
    over: string;
    action: string;
  };
  codeSnippet: string;
}

function StepNumber({ number }: { number: number }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "w-6 h-6 rounded-full",
        "flex items-center justify-center",
        "bg-blue-100"
      )}
    >
      <span className="text-sm font-semibold text-blue-600">{number}</span>
    </motion.div>
  );
}

export function WorkflowStep({
  title,
  endpoint,
  method,
  order,
  inputMapping,
  outputMapping,
  codeSnippet,
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

  const generateCodeSnippet = () => {
    return `// ${title}
fetch("${endpoint}", {
  method: "${method}",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer ${"{YOUR_API_KEY}"}"
  }${
    inputMapping
      ? `,
  body: JSON.stringify(${formattedInput})`
      : ""
  }
})
.then(response => response.json())
.then(data => {
  ${
    formattedOutput
      ? `// Map the response data
  const mappedData = ${formattedOutput};`
      : "// Process the response data"
  }
})
.catch(error => console.error('Error:', error));`;
  };

  const displayedCodeSnippet = codeSnippet || generateCodeSnippet();

  return (
    <motion.div
      layout
      transition={{ duration: 0.5, type: "spring" }}
      className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex flex-row items-center justify-between p-4 pb-2">
        <div className="flex items-center space-x-2">
          <StepNumber number={order} />
          <h3 className="text-lg font-medium text-slate-700">{title}</h3>
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
      <div className="px-4 pb-4">
        <p className="text-sm text-gray-600">/{endpoint}</p>
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
                    {displayedCodeSnippet}
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
