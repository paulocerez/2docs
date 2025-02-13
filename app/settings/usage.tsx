import { ChatQuota } from "@/components/chat/new-chat/quota/chat-quota";
import { MessageQuota } from "@/components/chat/new-chat/quota/message-quota";

export default function Usage({ userId }: { userId: string }) {
  return (
    <div className="bg-white space-y-4">
      <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
        Usage & Limits
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        <ChatQuota userId={userId} />
        <MessageQuota userId={userId} transparent={false} />
      </div>
    </div>
  );
}
