import type { WorkflowStepProps } from "@/types/workflow";

export default function WorkflowStepBlock({
  step,
}: {
  step: WorkflowStepProps;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium text-gray-700">{step.title}</h3>
      <p className="text-sm text-gray-600 leading-6">{step.description}</p>
    </div>
  );
}
