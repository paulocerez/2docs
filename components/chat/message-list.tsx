import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import "./MessageList.module.css";
import { lightfair } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { Message } from "@/types/message";
import { Workflow } from "@/components/workflow/Workflow";
import { WorkflowStepProps } from "@/types/workflow";
import { WorkflowVariableProps } from "../workflow/workflow-variable";

interface MessageListProps {
  messages: Message[] | undefined;
  workflow?: {
    title: string;
    steps: WorkflowStepProps[];
    variables: WorkflowVariableProps[];
    codeSnippet: string;
  };
  workflowRef?: React.RefObject<HTMLDivElement>;
}

const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter
      style={lightfair}
      language={match[1]}
      PreTag="div"
      className="rounded-md my-4 border border-gray-200"
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

export default function MessageList({
  messages,
  workflow,
  workflowRef,
}: MessageListProps) {
  return (
    <div className="flex flex-col space-y-10 w-full h-full">
      {Array.isArray(messages) && messages.length > 0 ? (
        messages.map((message: Partial<Message> | null, index) => {
          if (!message) return null;

          // Insert workflow after the first user message
          const showWorkflow =
            workflow && message.role === "user" && index === 0;

          return (
            <React.Fragment key={index}>
              <div
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg overflow-hidden ${
                    message.role === "user"
                      ? "bg-gray-100 border border-gray-200 shadow-sm p-3"
                      : "bg-transparent"
                  }`}
                >
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    components={{
                      code: CodeBlock,
                    }}
                    className={`text-sm markdown-content leading-relaxed break-words overflow-wrap-anywhere ${
                      message.role === "user" ? "text-black" : "text-gray-600"
                    } ${
                      message.role === "assistant" ? "assistant-message" : ""
                    }`}
                  >
                    {message.content || "No content"}
                  </Markdown>
                </div>
              </div>
              {showWorkflow && (
                <Workflow
                  initialWorkflow={workflow}
                  className="w-full mt-8"
                  workflowRef={workflowRef}
                />
              )}
            </React.Fragment>
          );
        })
      ) : (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500 text-sm">Looking for messages...</p>
        </div>
      )}
    </div>
  );
}
