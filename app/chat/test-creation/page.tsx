"use client";

import { useState } from "react";
import ScrapingApiLoading from "@/components/state/scraping-api-loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function TestCreationPage() {
  const [url, setUrl] = useState("");
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [chatTitle, setChatTitle] = useState(
    "Notion and Pandadoc Document Generator"
  );
  const [apiLinks, setApiLinks] = useState<string[]>([
    "https://www.postman.com/pandadoc-api/pandadoc-s-public-workspace/documentation/3vs89v3/pandadoc-api-reference",
    "https://www.postman.com/notionhq/notion-s-api-workspace/documentation/y28pjg6/notion-api",
  ]);
  const [prompt, setPrompt] = useState(
    "I want to automatically generate and send documents via Pandadoc to users of my Notion database. All of the rows that have a status called customer should receive that document containing their information. These are stored in the other cells of the row called customer name, customer email, and customer phone number, deal summary, and deal status."
  );

  const handleAddApiLink = () => {
    setApiLinks([...apiLinks, ""]);
  };

  const handleApiLinkChange = (index: number, value: string) => {
    const newLinks = [...apiLinks];
    newLinks[index] = value;
    setApiLinks(newLinks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "2e5ed1d7-6ad3-410e-b892-a9b2669ac032",
          url: url,
          chatId: "00bcc36e-4fab-4776-9659-cd534f7ee3b7",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMarkdown(data.markdown);
        setStatus({
          type: "success",
          message: `Successfully scraped API: ${
            data.apiDocId || "Unknown API"
          }`,
        });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Failed to scrape API documentation",
        });
      }
    } catch (error) {
      console.error("Error scraping URL:", error);
      setStatus({
        type: "error",
        message: "Failed to scrape API documentation",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });
    setIsLoading(true);

    try {
      const apiDocIds = [];
      // Scrape and process each api reference
      for (const link of apiLinks) {
        if (!link.trim()) continue;

        const response = await fetch("/api/scrape", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: "2e5ed1d7-6ad3-410e-b892-a9b2669ac032",
            url: link,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to scrape API documentation for ${link}`);
        }

        const data = await response.json();
        apiDocIds.push(data.apiDocId);
      }

      // Generate workflow
      const workflowResponse = await fetch("/api/workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          apiDocIds,
        }),
      });

      if (!workflowResponse.ok) {
        throw new Error("Failed to generate workflow");
      }

      const workflowData = await workflowResponse.json();

      // Create chat
      const chatResponse = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: chatTitle,
          apiLinks: apiLinks.filter((link) => link.trim() !== ""),
          prompt,
          userId: "2e5ed1d7-6ad3-410e-b892-a9b2669ac032",
        }),
      });

      const chatData = await chatResponse.json();

      if (chatResponse.ok) {
        setStatus({
          type: "success",
          message: `Successfully created chat: ${chatData.chatId} and generated workflow`,
        });
      } else {
        throw new Error(chatData.error || "Failed to create chat");
      }
    } catch (error) {
      console.error("Error in workflow generation process:", error);
      setStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to process request",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <ScrapingApiLoading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto w-full space-y-12">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900">
              API Reference Test
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="url"
                  className="text-sm font-medium text-gray-700"
                >
                  API Reference URL
                </label>
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter API documentation URL"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Test Scrape
              </button>
            </form>
          </div>
          <div className="space-y-8 border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Chat Creation Test
            </h2>

            <form onSubmit={handleChatSubmit} className="space-y-6">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="chatTitle"
                  className="text-sm font-medium text-gray-700"
                >
                  Chat Title
                </label>
                <input
                  type="text"
                  id="chatTitle"
                  value={chatTitle}
                  onChange={(e) => setChatTitle(e.target.value)}
                  placeholder="Enter chat title"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">
                  API Links
                </label>
                {apiLinks.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      value={link}
                      onChange={(e) =>
                        handleApiLinkChange(index, e.target.value)
                      }
                      placeholder="Enter API link"
                      className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddApiLink}
                  className="text-blue-500 hover:text-blue-600 text-sm"
                >
                  + Add another API link
                </button>
              </div>

              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="prompt"
                  className="text-sm font-medium text-gray-700"
                >
                  Prompt
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your prompt"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Create Chat
              </button>
            </form>
          </div>
          {status.type && (
            <div
              className={`p-4 rounded-lg ${
                status.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              {status.message}
            </div>
          )}
          {markdown && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Scraped Markdown
              </h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border markdown">
                <pre className="whitespace-pre-wrap text-sm text-gray-700">
                  {markdown}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </QueryClientProvider>
  );
}
