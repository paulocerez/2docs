import React from "react";

const workflows = [
  {
    title: "Google Calendar to Notion",
    description:
      "Automatically syncs events from Google Calendar to a Notion database.",
  },
  {
    title: "Linear Issues to Notion",
    description: "Maps Linear issues to a Notion database for better tracking.",
  },
  {
    title: "Flashcards in Notion",
    description: "Creates flashcards in Notion from your study notes.",
  },
];

export default function WorkflowsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <h1 className="text-2xl font-bold mb-12">Your Workflows</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
        {workflows.map((workflow, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h2 className="text-lg font-semibold text-center">
              {workflow.title}
            </h2>
            <p className="text-gray-600 mt-2">{workflow.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
