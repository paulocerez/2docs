import { useQuery, QueryClient } from "@tanstack/react-query";
import { SelectChat } from "@/db/schema/chats";

export function useCurrentChat(queryClient: QueryClient) {
  const { data: currentChat } = useQuery<SelectChat | undefined>({
    queryKey: ["currentChat"],
    queryFn: () => queryClient.getQueryData(["currentChat"]),
    enabled: !!queryClient.getQueryData(["currentChat"]),
  });

  return currentChat;
}