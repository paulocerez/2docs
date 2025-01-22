import { UtilsProps } from "@/types/workflow";
import CodeBlock from "../code-block";
import { Info, Terminal, ArrowRightLeft, Zap } from "lucide-react";

export default function UtilsBlock({ utils }: { utils: UtilsProps[] }) {
  return (
    <div className="flex flex-col space-y-6">
      <p className="text-sm text-gray-500 p-2">
        These utility functions provide common operations and transformations
        used throughout the workflow.
      </p>

      <div className="grid gap-6">
        {utils.map((util) => (
          <div
            key={util.name}
            className="border border-gray-200 rounded-lg p-4 space-y-4 hover:shadow-md transition-all duration-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-purple-500" />
                <h3 className="font-medium text-gray-900">{util.name}</h3>
              </div>
              <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded text-xs">
                Utility
              </span>
            </div>

            {/* Purpose & Usage */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-gray-400 mt-1" />
                <div>
                  <p className="text-xs font-medium text-gray-500">Purpose</p>
                  <p className="text-sm text-gray-700">{util.purpose}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Zap className="h-4 w-4 text-gray-400 mt-1" />
                <div>
                  <p className="text-xs font-medium text-gray-500">Usage</p>
                  <p className="text-sm text-gray-700">{util.usage}</p>
                </div>
              </div>
            </div>

            {/* Code Implementation */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Terminal className="h-4 w-4 text-gray-400" />
                <p className="text-xs font-medium text-gray-500">
                  Implementation
                </p>
              </div>
              <CodeBlock content={util.codeSnippet} />
            </div>

            {/* Input/Output */}
            <div className="flex items-start space-x-2 bg-gray-50 p-3 rounded-lg">
              <ArrowRightLeft className="h-4 w-4 text-gray-400 mt-1" />
              <div className="grid grid-cols-2 gap-4 flex-1">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-500">Input</p>
                  <p className="text-sm text-gray-600">{util.input}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-500">Output</p>
                  <p className="text-sm text-gray-600">{util.output}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
