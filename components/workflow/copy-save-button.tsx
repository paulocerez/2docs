"use client";

import { Check, Copy, Share } from "lucide-react";
import Button from "../ui/button";
import { useState } from "react";

export default function CopySaveButton({
  viewMode,
  workflowCode,
  fullCodeSnippet,
  onSave,
  error,
}: {
  viewMode: string;
  workflowCode: string;
  fullCodeSnippet: string;
  onSave: (workflow: any) => void;
  error: string;
}) {
  const [copied, setCopied] = useState(false);

  const copyTextToClipboard = () => {
    const textToCopy = viewMode === "json" ? workflowCode : fullCodeSnippet;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-row justify-between transition-all duration-200">
      <Button
        title={copied ? "Copied!" : "Copy Workflow"}
        icon={
          copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />
        }
        onClick={copyTextToClipboard}
      />
      <Button
        border
        icon={<Share className="h-4 w-4" />}
        onClick={() => onSave && onSave(JSON.parse(workflowCode))}
        disabled={!!error}
      />
    </div>
  );
}
