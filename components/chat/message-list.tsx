import React from "react";
import { Message, MessageListProps } from "@/types/types";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import "./MessageList.module.css";

const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter
      style={vscDarkPlus}
      language={match[1]}
      PreTag="div"
      className="rounded-md"
      {...props}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex flex-col space-y-6 p-4 max-w-3xl mx-auto">
      {Array.isArray(messages) && messages.length > 0 ? (
        messages.map(
          (message: Partial<Message> | null, index) =>
            message && (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg shadow-md ${
                    message.role === "user"
                      ? "bg-gray-100 border border-gray-200"
                      : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    components={{
                      code: CodeBlock,
                    }}
                    className={`text-sm markdown-content ${
                      message.role === "user" ? "text-black" : "text-gray-600"
                    }`}
                  >
                    {message.content || "No content"}
                  </Markdown>
                </div>
              </div>
            )
        )
      ) : (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500 text-sm">No messages yet.</p>
        </div>
      )}
    </div>
  );
}
