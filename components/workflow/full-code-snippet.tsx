"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";

interface FullCodeSnippetProps {
  codeSnippet: string;
}

export function FullCodeSnippet({ codeSnippet }: FullCodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative mt-2 bg-gray-100 rounded-md"
    >
      <pre className="p-4 text-sm overflow-x-auto text-gray-700">
        {codeSnippet}
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        aria-label={copied ? "Copied" : "Copy to clipboard"}
      >
        {copied ? (
          <Check className="h-5 w-5 text-green-500" />
        ) : (
          <Copy className="h-5 w-5" />
        )}
      </button>
    </motion.div>
  );
}
