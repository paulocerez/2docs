"use client";

import React from "react";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const documentation = [
  {
    name: "Pipedrive",
    logo: "/pipedrive.png",
    description: "The easy and effective CRM for closing deals.",
    baseUrl: "https://pipedrive.com/en/documentation",
    version: "1.0",
    lastScrapedAt: "2024-11-22",
  },
];

function DocumentationContentInner({ userId }: { userId: string }) {
  return (
    <AuthenticatedLayout userId={userId} currentPageTitle="Documentation Hub">
      <div className="container mx-auto px-4 py-8 pt-16 flex flex-col space-y-8">
        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentation.map((documentation, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 flex flex-col space-y-2 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center space-x-2">
                    <div className="rounded-full h-4 w-4 bg-green-500"></div>
                    <h1 className="text-md font-semibold">
                      {documentation.name}
                    </h1>
                  </div>
                  <p className="text-gray-500 text-sm">
                    v{documentation.version}
                  </p>
                </div>
                <p className="text-gray-500 text-sm">
                  {documentation.description}
                </p>
                <div className="flex flex-col items-start justify-center mt-auto space-y-2">
                  <p className="text-gray-500 text-sm">
                    Last updated at {documentation.lastScrapedAt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default function DocumentationContent({ userId }: { userId: string }) {
  return (
    <QueryClientProvider client={queryClient}>
      <DocumentationContentInner userId={userId} />
    </QueryClientProvider>
  );
}
