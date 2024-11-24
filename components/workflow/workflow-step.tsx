"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

type WorkflowStepProps = {
  id: string;
  endpointId: string;
  order: number;
  inputMapping: string;
  outputMapping: string;
};

export function WorkflowStep({
  id,
  endpointId,
  order,
  inputMapping,
  outputMapping,
}: WorkflowStepProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      transition={{ duration: 0.5, type: "spring" }}
      className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex flex-row items-center justify-between p-4 pb-2">
        <h3 className="text-xl font-bold text-blue-600">Step {order}</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      </div>
      <div className="px-4 pb-4">
        <p className="text-sm text-gray-600">Endpoint ID: {endpointId}</p>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-4 space-y-2">
              <div className="bg-gray-100 p-2 rounded-md">
                <h4 className="font-semibold text-sm text-purple-600">
                  Input Mapping:
                </h4>
                <pre className="text-xs overflow-x-auto text-gray-700">
                  {inputMapping}
                </pre>
              </div>
              <div className="bg-gray-100 p-2 rounded-md">
                <h4 className="font-semibold text-sm text-purple-600">
                  Output Mapping:
                </h4>
                <pre className="text-xs overflow-x-auto text-gray-700">
                  {outputMapping}
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
