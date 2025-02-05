"use client";

import { StepNumber } from "../workflow/workflow-step-number";

const steps = [
  {
    id: "1",
    title: "Connect your API's",
    order: 1,
  },
  {
    id: "2",
    title: "Create your workflow",
    order: 2,
  },
  {
    id: "3",
    title: "Deploy your workflow",
    order: 3,
  },
];

export function AnimatedSteps() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative flex flex-col space-y-4">
        {/* Dotted line connector */}
        <div className="absolute left-6 top-12 bottom-12 border-l-2 border-dotted border-gray-300" />

        {steps.map((step, index) => (
          <div
            key={index}
            className="relative w-full flex items-center space-x-4 border border-gray-300 rounded-lg p-4 bg-white hover:border-gray-400 transition-colors"
          >
            <StepNumber number={step.order} />
            <h3 className="text-base font-normal text-gray-700">
              {step.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
