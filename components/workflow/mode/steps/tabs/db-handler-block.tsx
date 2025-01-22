import { DbHandlersProps } from "@/types/workflow";
import CodeBlock from "../code-block";
import {
  Database,
  ArrowRight,
  Table2,
  Info,
  Terminal,
  AlertTriangle,
} from "lucide-react";

export default function DbHandlerBlock({
  dbHandlers,
}: {
  dbHandlers: DbHandlersProps[];
}) {
  return (
    <div className="flex flex-col space-y-6">
      <p className="text-sm text-gray-500 p-2">
        These are all the functions that are available to you in this workflow
        regarding database operations.
      </p>

      <div className="grid gap-6">
        {dbHandlers.map((handler) => (
          <div
            key={handler.name}
            className="border border-gray-200 rounded-lg p-4 space-y-4 hover:shadow-md transition-all duration-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center space-x-2">
                <Database className="h-4 w-4 text-blue-500" />
                <h3 className="font-medium text-gray-900">{handler.name}</h3>
              </div>
              <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">
                {handler.operation}
              </span>
            </div>

            {/* Purpose & Table */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-gray-400 mt-1" />
                <div>
                  <p className="text-xs font-medium text-gray-500">Purpose</p>
                  <p className="text-sm text-gray-700">{handler.purpose}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Table2 className="h-4 w-4 text-gray-400 mt-1" />
                <div>
                  <p className="text-xs font-medium text-gray-500">Table</p>
                  <p className="text-sm text-gray-700">{handler.table}</p>
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
              <CodeBlock content={handler.codeSnippet} />
            </div>

            {/* Input/Output */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-lg">
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500">Input</p>
                <p className="text-sm text-gray-600">{handler.input}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500">Output</p>
                <p className="text-sm text-gray-600">{handler.output}</p>
              </div>
            </div>

            {/* Error Handling */}
            <div className="flex items-start space-x-2 bg-red-50 p-3 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-red-400 mt-1" />
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500">
                  Error Handling
                </p>
                <p className="text-sm text-gray-600">{handler.errorHandling}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
