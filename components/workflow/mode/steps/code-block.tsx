import { useState } from "react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { lightfair } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  content: any;
}

export default function CodeBlock({ content }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format the code if it's a string
  const formattedContent =
    typeof content === "string" ? content : JSON.stringify(content, null, 2);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg overflow-hidden relative group"
    >
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 p-2 rounded-md bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white/20"
      >
        {copied ? (
          <Check className="h-4 w-4 text-gray-500" />
        ) : (
          <Copy className="h-4 w-4 text-gray-500" />
        )}
      </button>
      <SyntaxHighlighter
        language="typescript"
        style={lightfair}
        customStyle={{
          margin: 0,
          borderRadius: "0.5rem",
          fontSize: "0.875rem",
          padding: "1rem",
          backgroundColor: "#f0f0f0",
        }}
        wrapLines={true}
        wrapLongLines={true}
      >
        {formattedContent}
      </SyntaxHighlighter>
    </motion.div>
  );
}
