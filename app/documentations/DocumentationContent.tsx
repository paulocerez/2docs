"use client";

import React from "react";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDocumentation } from "@/hooks/documentations/useDocumentation";
import NoDataAvailable from "@/components/state/no-data-screen";

export interface Documentation {
  name: string;
  version: string;
  description: string;
  lastScrapedAt: string;
  imageUrl?: string;
  baseUrl: string;
}

const queryClient = new QueryClient();

function DocumentationContentInner({ userId }: { userId: string }) {
  const {
    data: documentation,
    isLoading: isDocumentationLoading,
    error: documentationError,
  } = useDocumentation();

  if (isDocumentationLoading) return <div>Loading...</div>;
  if (documentationError) return <div>Error loading documentation</div>;

  return (
    <AuthenticatedLayout userId={userId} currentPageTitle="Documentations">
      <div className="container mx-auto px-4 py-8 pt-16 flex flex-col space-y-8">
        {documentation.length === 0 ? (
          <NoDataAvailable title="Documentation" />
        ) : (
          <div className="flex flex-col space-y-4 items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentation.map((doc: Documentation, index: number) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-3 flex flex-col space-y-2 hover:shadow-md transition-shadow duration-200 w-80"
                >
                  <div className="flex flex-row items-center justify-between">
                    <p className="text-sm font-normal">{doc.name}</p>
                    <p className="text-gray-500 text-sm">{doc.version}</p>
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
