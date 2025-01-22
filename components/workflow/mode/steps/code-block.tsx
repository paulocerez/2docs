import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { lightfair } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeBlockProps {
  content: any;
}

export default function CodeBlock({ content }: CodeBlockProps) {
  const formattedContent = JSON.stringify(content, null, 2);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg overflow-hidden"
    >
      <SyntaxHighlighter
        language="json"
        style={lightfair}
        customStyle={{
          margin: 0,
          borderRadius: "0.5rem",
          fontSize: "0.875rem",
          padding: "1rem",
          backgroundColor: "#f0f0f0",
        }}
      >
        {formattedContent}
      </SyntaxHighlighter>
    </motion.div>
  );
}
