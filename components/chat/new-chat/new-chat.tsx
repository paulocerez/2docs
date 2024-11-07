"use client";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { FormEvent, use, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserMessageMutation } from "@/hooks/messages/useUserMessageMutation";
import { useAIResponseMutation } from "@/hooks/messages/useAIResponseMutation";
import LinkInputs from "@/components/chat/new-chat/link-inputs";
import ChecklistItem from "@/components/chat/new-chat/ChecklistItem";
import DefaultPrompt from "@/components/chat/new-chat/default-prompt";
import WorkflowRecommendations from "@/components/chat/workflow-recommendations";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useChatApiLinksMutation } from "@/hooks/chats/useChatApiLinksMutation";
import SubmitButton from "./submit";

const queryClient = new QueryClient();

function NewChatPageContent({ userId }: { userId: string }) {
  const router = useRouter();
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [chatTitle, setChatTitle] = useState("");
  const [checklist, setChecklist] = useState<boolean[]>([false, false, false]);
  const [prompt, setPrompt] = useState("");
  const [links, setLinks] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const isFormValid = checklist.every(Boolean);

  // mutation hooks
  const userMessageMutation = useUserMessageMutation(userId);
  const aiResponseMutation = useAIResponseMutation();
  const chatApiLinksMutation = useChatApiLinksMutation();

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isFormValid) return;

      setIsAiResponding(true);
      setError(null);

      try {
        // create the chat and add user message
        const chatResult = await userMessageMutation.mutateAsync({
          prompt: prompt,
          title: chatTitle,
        });

        // create the api links
        await chatApiLinksMutation.mutateAsync({
          chatId: chatResult.chat.id,
          links,
        });

        router.push(`/chat/${chatResult.chat.id}`);

        // generate ai response in the background
        aiResponseMutation.mutate(
          {
            chatId: chatResult.chat.id,
            messages: [{ role: "user", content: prompt }],
          },
          {
            onError: (error) => {
              console.error("Failed to generate AI response:", error);
              setError("Failed to generate AI response");
            },
          }
        );
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
      aiResponseMutation,
      router,
      links,
      chatTitle,
      prompt,
      isFormValid,
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
      setChatTitle(newTitle);
      setChecklist((prev) => [newTitle.trim() !== "", prev[1], prev[2]]);
    },
    []
  );

  const handleLinksChange = useCallback((newLinks: string[]) => {
    setLinks(newLinks);
    const hasValidLinks =
      newLinks.filter((link) => link.trim() !== "").length >= 2;
    setChecklist((prev) => [prev[0], prev[1], hasValidLinks]);
  }, []);

  if (!userId) return null;

  return (
    <AuthenticatedLayout
      userId={userId}
      currentPageTitle={chatTitle || "Build a workflow"}
    >
      <div className="flex flex-col h-full bg-gray-50 pt-16">
        <div className="flex-grow overflow-y-auto pt-4 pb-16">
          <div className="mx-auto px-4 w-full max-w-4xl">
            <form
              onSubmit={handleSubmit}
              className="min-h-screen flex items-center justify-center"
            >
              <div className="w-full max-w-2xl px-4 py-8 space-y-16">
                <div className="flex flex-col items-center space-y-8 text-center">
                  <h1 className="text-3xl sm:text-5xl font-bold text-gray-900">
                    What can I help you build?
                  </h1>
                  <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
                    Insert two or more links of the API Docs you want to include
                    in your workflow. Specify the workflow with as much context
                    and precision as possible in the prompt field.
                  </p>
                  <div className="max-w-sm w-full space-y-1">
                    <input
                      type="text"
                      value={chatTitle}
                      onChange={handleChatTitleChange}
                      placeholder="Name your workflow"
                      className="w-full px-3 py-2 border rounded-full text-xs focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200"
                    />
                    <p className="text-[10px] text-gray-400">
                      &quot;Insert Google Calendar events based on a Notion
                      database&quot;
                    </p>
                  </div>
                </div>
                <div className="flex flex-col space-y-8">
                  <div className="flex flex-col space-y-4 w-full">
                    <WorkflowRecommendations />
                    <div className="flex flex-col space-y-4">
                      <DefaultPrompt
                        onSubmit={(value: string) => handlePromptChange(value)}
                        isAiResponding={isAiResponding}
                        onInputChange={handlePromptChange}
                      />
                      <LinkInputs
                        onSubmit={(value: string[]) => handleLinksChange(value)}
                        onInputChange={(links: string[]) => setLinks(links)}
                      />
                    </div>
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
                    onClick={() => handleSubmit}
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
