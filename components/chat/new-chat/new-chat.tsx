"use client";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { FormEvent, useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserMessageMutation } from "@/hooks/messages/useUserMessageMutation";
import ChecklistItem from "@/components/chat/new-chat/ChecklistItem";
import DefaultPrompt from "@/components/chat/new-chat/default-prompt";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useChatApiLinksMutation } from "@/hooks/chats/useChatApiLinksMutation";
import SubmitButton from "./submit";
import ScrapingApiLoading from "../../state/scraping-api-loading";
import { useScrapeUrlMutation } from "@/hooks/messages/useScrapeUrlMutation";
import { useWorkflowMutation } from "@/hooks/workflows/useWorkflowMutation";
import NewChatParagraph from "./new-chat-paragraph";
import { useChatQuota } from "@/hooks/quota/useChatQuota";
import NewChatError from "@/components/state/new-chat-error";
import QuotaAlertChat from "@/components/state/quota-alert-chat";

const queryClient = new QueryClient();

function NewChatPageContent({ userId }: { userId: string }) {
  const router = useRouter();
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [title, setTitle] = useState("");
  const [checklist, setChecklist] = useState<boolean[]>([false, false, false]);
  const [prompt, setPrompt] = useState("");
  const [links, setLinks] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const isFormValid = checklist.every(Boolean);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>(
    "Scraping API documentation..."
  );

  // mutation hooks
  const userMessageMutation = useUserMessageMutation(userId);
  const scrapeUrlMutation = useScrapeUrlMutation();
  const chatApiLinksMutation = useChatApiLinksMutation();
  const workflowMutation = useWorkflowMutation(userId);

  // Add quota check query
  const { data: quota } = useChatQuota(userId);

  useEffect(() => {
    const allLinksValid =
      links.length >= 2 && links.every((link) => isValidUrl(link));
    setChecklist((prev) => [prev[0], prev[1], allLinksValid]);
  }, [links]);

  const scrapeDocsAndGenerateWorkflow = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isFormValid) return;

      setError(null);
      setIsProcessing(true);
      setCurrentStep("Scraping API documentation...");

      try {
        setCurrentStep("Scraping API documentation...");
        const apiDocIds = await Promise.all(
          links.map(async (link) => {
            try {
              const result = await scrapeUrlMutation.mutateAsync({
                userId,
                url: link,
              });
              return result.apiDocId;
            } catch (error) {
              console.error("Failed to scrape API doc:", error);
              setError(`Failed to scrape API documentation from ${link}`);
              throw error;
            }
          })
        );

        // Generate and save the workflow
        setCurrentStep("Generating workflow...");
        const { workflow } = await workflowMutation
          .mutateAsync({
            prompt,
            apiDocIds,
            title,
          })
          .catch((error) => {
            console.error("Workflow generation failed:", error);
            setError("Failed to generate workflow. Please try again.");
            throw error;
          });

        setCurrentStep("Creating new chat...");
        const { chat } = await userMessageMutation
          .mutateAsync({
            prompt,
            title,
            workflowId: workflow.id,
          })
          .catch((error) => {
            console.error("Chat creation failed:", error);
            setError("Failed to create chat. Please try again.");
            throw error;
          });

        await chatApiLinksMutation
          .mutateAsync({
            chatId: chat.id,
            apiDocumentationIds: apiDocIds,
            userId,
          })
          .catch((error) => {
            console.error("API linking failed:", error);
            setError("Failed to link APIs to chat. Please try again.");
            throw error;
          });

        console.log("Successfully linked APIs to chat");
        router.push(`/chat/${chat.id}`);
      } catch (error) {
        console.error("Error in workflow creation:", error);
        setIsProcessing(false);
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
      return false;
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
      <AuthenticatedLayout userId={userId} currentPageTitle="Quota Alert">
        <QuotaAlertChat quota={quota} />
      </AuthenticatedLayout>
    );
  }

  if (isProcessing) {
    return <ScrapingApiLoading currentStep={currentStep} />;
  }

  if (error) {
    return (
      <AuthenticatedLayout userId={userId} currentPageTitle="Failed creation">
        <NewChatError
          error={error}
          setError={setError}
          setIsProcessing={setIsProcessing}
        />
      </AuthenticatedLayout>
    );
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
                    {/* <WorkflowRecommendations /> */}
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
