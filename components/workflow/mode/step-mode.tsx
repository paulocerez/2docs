import { WorkflowStepProps } from "@/types/workflow";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { WorkflowVariable } from "../workflow-variable";
import { ChevronUp } from "lucide-react";
import { WorkflowVariableProps } from "../workflow-variable";
import { WorkflowStep } from "../workflow-step";

interface WorkflowProps {
  title: string;
  steps: WorkflowStepProps[];
  variables: WorkflowVariableProps[];
  codeSnippet: string;
}

export default function StepMode({
  setShowVariables,
  showVariables,
  workflow,
}: {
  setShowVariables: (show: boolean) => void;
  showVariables: boolean;
  workflow: WorkflowProps;
}) {
  return (
    <>
      <motion.div
        className="border border-gray-200 rounded-lg p-2"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => setShowVariables(!showVariables)}
          className="w-full flex justify-between items-center p-1 text-gray-800 rounded-md transition-colors duration-200 text-sm"
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
            {workflow.variables.map((variable) => (
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
        {workflow.steps.map((step) => (
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
  );
}
