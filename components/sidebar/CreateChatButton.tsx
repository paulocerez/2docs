import { useHotkeys } from "react-hotkeys-hook";
import { MdChatBubbleOutline } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import Hotkey from "../ui/hotkey";

export default function CreateChatButton() {
  const router = useRouter();
  const pathname = usePathname();

  const handleCreateNewChat = () => {
    router.push("/chat");
  };

  useHotkeys("c", () => handleCreateNewChat());

  const isChatPage = pathname === "/chat";

  return (
    <div
      className={`flex flex-row items-center justify-between p-2 text-xs font-normal hover:bg-gray-100 rounded-sm ${
        isChatPage ? "bg-gray-100" : ""
      }`}
    >
      <button
        onClick={handleCreateNewChat}
        className="flex flex-row space-x-2 items-center text-[13px] font-normal hover:bg-gray-100 w-full rounded-sm"
      >
        <MdChatBubbleOutline />
        <p>Create Chat</p>
      </button>
      <Hotkey letter="c" />
    </div>
  );
}
