import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function JsonMode({
  workflowCode,
  setWorkflowCode,
  error,
}: {
  workflowCode: string;
  setWorkflowCode: (code: string) => void;
  error: string;
}) {
  return (
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
  );
}
