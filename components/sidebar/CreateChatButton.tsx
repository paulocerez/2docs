import { CreateChatProps } from "@/types/types";
import { useHotkeys } from "react-hotkeys-hook";
import { MdChatBubbleOutline } from "react-icons/md";
import Hotkey from "../ui/hotkey";

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
    <div className="flex flex-row items-center justify-between p-2 text-xs font-normal hover:bg-gray-100 rounded-sm">
      <button
        onClick={handleCreateNewChat}
        className="flex flex-row space-x-2 items-center text-xs font-normal hover:bg-gray-100 w-full rounded-sm"
      >
        <MdChatBubbleOutline />
        <p>Create new chat</p>
      </button>
      <Hotkey letter="c" />
    </div>
  );
}
