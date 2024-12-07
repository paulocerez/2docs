"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface WorkflowVariableProps {
  id: string;
  name: string;
  defaultValue?: string;
  description?: string;
  onChange?: (updatedVariable: WorkflowVariableProps) => void;
}

export function WorkflowVariable({
  id,
  name,
  defaultValue,
  description,
}: WorkflowVariableProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div layout transition={{ duration: 0.5, type: "spring" }}>
      <div className="flex flex-row items-center justify-between p-2">
        <h3 className="text-md font-medium">{name}</h3>
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
      <div className="px-4 pb-2">
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {defaultValue && (
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-semibold text-purple-600">
                  Default Value:
                </span>{" "}
                {defaultValue}
              </p>
            )}
            {description && (
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-semibold text-purple-600">
                  Description:
                </span>{" "}
                {description}
              </p>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
