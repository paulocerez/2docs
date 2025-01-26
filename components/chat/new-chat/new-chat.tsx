"use client";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { FormEvent, useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserMessageMutation } from "@/hooks/messages/useUserMessageMutation";
import LinkInputs from "@/components/chat/new-chat/link-inputs";
import ChecklistItem from "@/components/chat/new-chat/ChecklistItem";
import DefaultPrompt from "@/components/chat/new-chat/default-prompt";
import WorkflowRecommendations from "@/components/chat/workflow-recommendations";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useChatApiLinksMutation } from "@/hooks/chats/useChatApiLinksMutation";
import SubmitButton from "./submit";
import ScrapingApiLoading from "../../state/scraping-api-loading";
import { useScrapeUrlMutation } from "@/hooks/messages/useScrapeUrlMutation";
import { useWorkflowMutation } from "@/hooks/workflows/useWorkflowMutation";
import NewChatParagraph from "./new-chat-paragraph";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";

const queryClient = new QueryClient();

function NewChatPageContent({ userId }: { userId: string }) {
  const router = useRouter();
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [title, setTitle] = useState("Mochi and Coda Flashcard Generator");
  const [checklist, setChecklist] = useState<boolean[]>([false, false, false]);
  const [prompt, setPrompt] = useState("");
  const [links, setLinks] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const isFormValid = checklist.every(Boolean);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>(
    "Scraping API documentation..."
  );
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  // mutation hooks
  const userMessageMutation = useUserMessageMutation(userId);
  const scrapeUrlMutation = useScrapeUrlMutation();
  const chatApiLinksMutation = useChatApiLinksMutation();
  const workflowMutation = useWorkflowMutation();

  // Add quota check query
  const { data: quota } = useQuery({
    queryKey: ["chat-quota"],
    queryFn: async () => {
      const response = await fetch("/api/user/chat-quota");
      return response.json();
    },
  });

  useEffect(() => {
    const allLinksValid =
      links.length >= 2 && links.every((link) => isValidUrl(link));
    setChecklist((prev) => [prev[0], prev[1], allLinksValid]);
  }, [links]);

  useEffect(() => {
    console.log("UserId:", userId, "Links:", links);
  }, [userId, links]);

  const scrapeDocsAndGenerateWorkflow = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isFormValid) return;

      setIsProcessing(true);
      setError(null);

      try {
        setCurrentStep("Scraping API documentation...");
        // TODOstill need to check if links are pointing to valid api references
        // const validatedLinks = await validateLinks(links);
        const apiDocIds = [];
        // Scrape and process each api reference
        for (const link of links) {
          const { apiDocId } = await scrapeUrlMutation.mutateAsync({
            userId,
            url: link,
          });
          apiDocIds.push(apiDocId);
        }

        // Generate and save the workflow, receiving the saved workflow with its ID
        setCurrentStep("Generating workflow...");
        const { workflow } = await workflowMutation.mutateAsync({
          prompt,
          apiDocIds,
          userId,
          title,
        });

        console.log("Workflow in NewChatPageContent", workflow);

        setCurrentStep("Saving workflow, creating a new chat...");
        // create chat and add user message
        const { chat } = await userMessageMutation.mutateAsync({
          prompt,
          title,
          workflowId: workflow.id,
        });

        // create chat api links
        await chatApiLinksMutation.mutateAsync({
          chatId: chat.id,
          apiDocumentationIds: apiDocIds,
        });

        router.push(`/chat/${chat.id}`);
      } catch (error) {
        console.error("Failed to send message or generate workflow:", error);
        setError("Failed to create chat. Please try again.");
      } finally {
        setIsAiResponding(false);
      }
    },
    [
      userMessageMutation,
      chatApiLinksMutation,
      router,
      links,
      prompt,
      title,
      isFormValid,
      scrapeUrlMutation,
      userId,
      workflowMutation,
    ]
  );

  const handlePromptChange = useCallback((newPrompt: string) => {
    setPrompt(newPrompt);
    const hasInput = newPrompt.trim() !== "";
    setChecklist((prev) => [prev[0], hasInput, prev[2]]);
  }, []);

  const handleChatTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTitle = e.target.value;
      setTitle(newTitle);
      setChecklist((prev) => [newTitle.trim() !== "", prev[1], prev[2]]);
    },
    []
  );

  function isValidUrl(input: string): boolean {
    try {
      new URL(input);
      return true;
    } catch {
      // If it's not a URL, it might be a documentation name which is valid
      return true;
    }
  }

  const handleLinksChange = useCallback((newLinks: string[]) => {
    setLinks(newLinks);
    const allLinksValid =
      newLinks.length >= 2 && newLinks.every((link) => isValidUrl(link)); // Require at least 2 links total
    setChecklist((prev) => [prev[0], prev[1], allLinksValid]);
  }, []);

  // Show quota alert if no remaining chats
  if (quota && quota.remaining === 0) {
    return (
      <AuthenticatedLayout userId={userId} currentPageTitle="New Chat">
        <div className="min-h-screen bg-gray-50 pt-16">
          <div className="max-w-2xl mx-auto px-4 py-12">
            <div className="text-center space-y-6">
              <div className="bg-white/50 backdrop-blur-sm rounded-full p-3 w-fit mx-auto">
                <AlertCircle className="h-8 w-8 text-blue-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-gray-900">
                  You've reached your chat limit
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  You currently have {quota.total} active chats. The maximum
                  number of chats allowed is {quota.limit}.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-full max-w-xs mx-auto bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "100%" }}
                  />
                </div>
                <p className="text-sm text-gray-500">
                  {quota.total} / {quota.limit} chats created
                </p>
              </div>
              <div className="pt-4">
                <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors gap-2">
                  Upgrade to Create More Chats
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }

  if (!userId) return null;

  if (isProcessing) {
    return <ScrapingApiLoading currentStep={currentStep} />;
  }

  return (
    <AuthenticatedLayout
      userId={userId}
      currentPageTitle={title || "Build a workflow"}
    >
      <div className="flex flex-col h-full bg-gray-50 pt-16">
        <div className="flex-grow overflow-y-auto pt-4 pb-16">
          <div className="mx-auto px-4 w-full max-w-4xl">
            <form
              onSubmit={scrapeDocsAndGenerateWorkflow}
              className="min-h-screen flex items-center justify-center"
            >
              <div className="w-full max-w-2xl px-4 py-8 space-y-16">
                <NewChatParagraph
                  title={title}
                  handleChatTitleChange={handleChatTitleChange}
                />
                <div className="flex flex-col space-y-8">
                  <div className="flex flex-col space-y-4 w-full">
                    <WorkflowRecommendations />
                    <DefaultPrompt
                      onSubmit={(value: string) => handlePromptChange(value)}
                      isAiResponding={isAiResponding}
                      onInputChange={handlePromptChange}
                      setLinks={setLinks}
                      handleLinksChange={handleLinksChange}
                    />
                  </div>
                  <div className="flex flex-row bg-gray-50 w-full justify-center text-xs items-center gap-4 text-gray-400">
                    <ChecklistItem
                      checked={checklist[0]}
                      label="Workflow name"
                    />
                    <ChecklistItem checked={checklist[1]} label="Prompt" />
                    <ChecklistItem checked={checklist[2]} label="API links" />
                  </div>
                </div>
                <div className="flex justify-center">
                  <SubmitButton
                    isFormValid={isFormValid}
                    isAiResponding={isAiResponding}
                    onClick={() => scrapeDocsAndGenerateWorkflow}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default function NewChatPage({ userId }: { userId: string }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NewChatPageContent userId={userId} />
    </QueryClientProvider>
  );
}
