import { CreateChatProps } from "@/types/types";
import { useHotkeys } from "react-hotkeys-hook";
import { MdChatBubbleOutline } from "react-icons/md";

export default function CreateChatButton({
  setCurrentChatId,
  createTemporaryChat,
}: CreateChatProps) {
  const handleCreateNewChat = () => {
    const newChatId = createTemporaryChat();
    setCurrentChatId(newChatId);
  };

  useHotkeys("c", () => handleCreateNewChat());
  return (
    <button
      onClick={handleCreateNewChat}
      className="flex flex-row space-x-2 items-center p-2 text-xs font-medium hover:bg-gray-100 w-full rounded-sm"
    >
      <MdChatBubbleOutline />
      <p>Create new chat</p>
    </button>
  );
}
