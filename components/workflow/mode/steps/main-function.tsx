import type { WorkflowMainFunctionProps } from "@/types/workflow";
import CodeBlock from "./code-block";

export default function MainFunction({
  mainFunction,
}: {
  mainFunction: WorkflowMainFunctionProps;
}) {
  return (
    <div className="flex flex-col space-y-6 p-4 rounded-md border border-gray-200">
      <div className="flex flex-col space-y-2">
        <h1 className="font-semibold text-sm text-blue-600">Main function</h1>
        <p className="text-xs overflow-x-auto text-gray-700 leading-5">
          {mainFunction.description}
        </p>
      </div>
      <CodeBlock content={mainFunction.codeSnippet} />
    </div>
  );
}
