import { OrchestratorProps } from "@/types/workflow";

export default function Orchestrator({
  orchestrator,
}: {
  orchestrator: OrchestratorProps;
}) {
  return (
    <div className="flex flex-col space-y-6 p-4 rounded-md border border-gray-200">
      <div className="flex flex-col space-y-2">
        <h1 className="font-semibold text-sm text-purple-600">Main function</h1>
        <p className="text-xs overflow-x-auto text-gray-700">
          {orchestrator.description}
        </p>
      </div>
      <div className="bg-gray-100 p-2 rounded-md">
        <pre className="text-xs overflow-x-auto text-gray-700">
          {orchestrator.codeSnippet}
        </pre>
      </div>
    </div>
  );
}
