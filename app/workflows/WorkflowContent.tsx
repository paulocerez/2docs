"use client";

import React, { useState } from "react";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Plus, ArrowRight } from "lucide-react";

const queryClient = new QueryClient();

interface WorkflowContentProps {
  userId: string;
}

function WorkflowContentInner({ userId }: WorkflowContentProps) {
  const userWorkflows = [
    {
      title: "Google Calendar to Notion",
      description:
        "Automatically syncs events from Google Calendar to a Notion database.",
      icon: "📅",
      status: "Active",
      used: 100,
    },
    {
      title: "Linear Issues to Notion",
      description:
        "Maps Linear issues to a Notion database for better tracking.",
      icon: "🔄",
      status: "Inactive",
      used: 100,
    },
  ];

  const communityWorkflows = [
    {
      title: "Flashcards in Notion",
      description: "Creates flashcards in Notion from your study notes.",
      icon: "📚",
      used: 1000,
    },
    {
      title: "Twitter to Notion",
      description: "Save your favorite tweets to a Notion database.",
      icon: "🐦",
      used: 5000,
    },
  ];

  const [activeWorkflows, setActiveWorkflows] = useState(
    userWorkflows.reduce((acc, workflow) => {
      acc[workflow.title] = workflow.status === "Active";
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleWorkflow = (title: string) => {
    setActiveWorkflows((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const addWorkflow = () => {
    console.log("Add workflow clicked");
  };

  const exploreWorkflows = () => {
    console.log("Explore workflows clicked");
  };

  const renderWorkflowCard = (workflow: any, isUserWorkflow: boolean) => (
    <div className="bg-white rounded-lg border hover:shadow-lg transition-shadow duration-300">
      <div className="p-4 flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold flex items-center space-x-2">
            <span className="text-2xl">{workflow.icon}</span>
            <span>{workflow.title}</span>
          </h2>
          {isUserWorkflow && (
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                activeWorkflows[workflow.title]
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {activeWorkflows[workflow.title] ? "Active" : "Inactive"}
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm">{workflow.description}</p>
        <p className="text-xs text-gray-500">
          Workflow used: {workflow.used} times
        </p>
        <div className="flex justify-between items-center">
          <button className="text-blue-500 hover:text-blue-600 text-sm font-semibold flex items-center space-x-1">
            {isUserWorkflow ? "Configure" : "Use workflow"}
          </button>
          {isUserWorkflow && (
            <label className="flex items-center cursor-pointer space-x-2">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={activeWorkflows[workflow.title]}
                  onChange={() => toggleWorkflow(workflow.title)}
                />
                <div
                  className={`w-10 h-6 bg-gray-300 rounded-full shadow-inner ${
                    activeWorkflows[workflow.title] ? "bg-green-400" : ""
                  }`}
                ></div>
                <div
                  className={`absolute w-4 h-4 bg-white rounded-full shadow inset-y-1 left-1 transition-transform ${
                    activeWorkflows[workflow.title]
                      ? "transform translate-x-full"
                      : ""
                  }`}
                ></div>
              </div>
              <span className="text-sm text-gray-700">
                {activeWorkflows[workflow.title] ? "Published" : "Draft"}
              </span>
            </label>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <AuthenticatedLayout userId={userId} currentPageTitle="Your Workflows">
      <div className="container mx-auto px-4 py-8 pt-16 flex flex-col space-y-8">
        <div className="flex justify-end items-center">
          <button
            type="button"
            className="flex flex-row items-center space-x-2 p-2 border rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={addWorkflow}
          >
            <Plus className="w-4 h-4 text-gray-500" aria-hidden="true" />
            <span className="text-sm text-gray-500">Add Workflow</span>
          </button>
        </div>

        <div className="space-y-6">
          <h2 className="text-md font-medium">Your Workflows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userWorkflows.map((workflow, index) => (
              <React.Fragment key={index}>
                {renderWorkflowCard(workflow, true)}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-md font-medium">Community Workflows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityWorkflows.map((workflow, index) => (
              <React.Fragment key={index}>
                {renderWorkflowCard(workflow, false)}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            className="flex flex-row items-center space-x-2 p-2 border rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={exploreWorkflows}
          >
            <span className="text-sm text-gray-500">
              Explore Community Workflows
            </span>
            <ArrowRight className="w-4 h-4 text-gray-500" aria-hidden="true" />
          </button>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default function WorkflowContent({ userId }: WorkflowContentProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WorkflowContentInner userId={userId} />
    </QueryClientProvider>
  );
}
