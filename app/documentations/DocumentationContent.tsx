"use client";

import React from "react";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDocumentation } from "@/hooks/documentations/useDocumentation";
import NoDataAvailable from "@/components/state/no-data-screen";
interface Documentation {
  name: string;
  version: string;
  description: string;
  lastScrapedAt: string;
}

const queryClient = new QueryClient();

function DocumentationContentInner({ userId }: { userId: string }) {
  const {
    data: documentation,
    isLoading: isDocumentationLoading,
    error: documentationError,
  } = useDocumentation();

  console.log("Documentation", documentation);

  if (isDocumentationLoading) return <div>Loading...</div>;
  if (documentationError) return <div>Error loading documentation</div>;

  return (
    <AuthenticatedLayout userId={userId} currentPageTitle="Documentation Hub">
      <div className="container mx-auto px-4 py-8 pt-16 flex flex-col space-y-8">
        {documentation.length === 0 ? (
          <NoDataAvailable title="Documentation" />
        ) : (
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentation.map((doc: Documentation, index: number) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 flex flex-col space-y-2 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center space-x-2">
                      <div className="rounded-full h-4 w-4 bg-green-500"></div>
                      <h1 className="text-md font-semibold">{doc.name}</h1>
                    </div>
                    <p className="text-gray-500 text-sm">v{doc.version}</p>
                  </div>
                  <p className="text-gray-500 text-sm">{doc.description}</p>
                  <div className="flex flex-col items-start justify-center mt-auto space-y-2">
                    <p className="text-gray-500 text-sm">
                      Last updated at {doc.lastScrapedAt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
