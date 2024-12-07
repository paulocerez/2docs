"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Code, Eye, FileText } from "lucide-react";
import { FullCodeSnippet } from "./full-code-snippet";
import { cn } from "@/lib/utils";

interface DataFlow {
  input?: string;
  output?: string;
}

export interface WorkflowStepProps {
  id: string;
  title: string;
  endpoint: string;
  order: number;
  codeSnippet: string;
  dataFlow: DataFlow;
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
  id,
  title,
  endpoint,
  order,
  dataFlow,
  codeSnippet,
}: WorkflowStepProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const toggleCodeView = () => {
    setShowCode(!showCode);
  };

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
            <FullCodeSnippet codeSnippet={codeSnippet} />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mt-4 space-y-2">
                <div className="bg-gray-100 p-2 rounded-md">
                  <h4 className="font-semibold text-sm text-purple-600">
                    Input:
                  </h4>
                  <pre className="text-xs overflow-x-auto text-gray-700">
                    {dataFlow.input || "No input mapping specified"}
                  </pre>
                </div>
                <div className="bg-gray-100 p-2 rounded-md">
                  <h4 className="font-semibold text-sm text-purple-600">
                    Output:
                  </h4>
                  <pre className="text-xs overflow-x-auto text-gray-700">
                    {dataFlow.output || "No output mapping specified"}
                  </pre>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}
