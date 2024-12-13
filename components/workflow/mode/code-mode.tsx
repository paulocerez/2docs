import { motion } from "framer-motion";

export default function CodeMode({
  fullCodeSnippet,
  setWorkflowCode,
}: {
  fullCodeSnippet: string;
  setWorkflowCode: (code: string) => void;
}) {
  return (
    <motion.div
      className="border border-gray-200 rounded-lg p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <textarea
        className="w-full h-96 p-2 text-sm font-mono bg-gray-50 border border-gray-300 rounded-md overflow-auto"
        value={fullCodeSnippet}
        onChange={(e) => setWorkflowCode(e.target.value)}
      />
      <p className="text-xs text-gray-500 mt-2 leading-relaxed">
        This is the full code for the workflow. You can copy and paste this code
        into your own project. It uses TypeScript and Node.js with fetch to make
        API calls.
      </p>
    </motion.div>
  );
}
