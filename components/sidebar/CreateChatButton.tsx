import { CreateChatProps } from "@/types/types";
import { MdChatBubbleOutline } from "react-icons/md";

export default function CreateChatButton({
  setCurrentChatId,
  createTemporaryChat,
}: CreateChatProps) {
  const handleCreateNewChat = () => {
    const newChatId = createTemporaryChat();
    setCurrentChatId(newChatId);
  };
  return (
    <button
      onClick={handleCreateNewChat}
      className="flex flex-row space-x-2 items-center p-2 text-xs font-medium hover:bg-gray-100 w-full"
    >
      <MdChatBubbleOutline />
      <p>Create new chat</p>
    </button>
  );
}
