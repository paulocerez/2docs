import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import "./MessageList.module.css";
import { lightfair } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { Message } from "@/types/message";

interface MessageListProps {
  messages: Message[] | undefined;
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

const insertLineBreaksBeforeBold = (content: string): string => {
  // This regex looks for bold markdown that's not at the start of a line
  const boldRegex = /([^\n])\*\*(.*?)\*\*/g;
  return content.replace(boldRegex, (match, p1, p2) => `${p1}\n\n**${p2}**`);
};

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex flex-col space-y-10 w-full h-full">
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
                    {insertLineBreaksBeforeBold(
                      message.content || "No content"
                    )}
                  </Markdown>
                </div>
              </div>
            )
        )
      ) : (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500 text-sm">Looking for messages...</p>
        </div>
      )}
    </div>
  );
}
