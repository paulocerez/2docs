import { GrStorage } from "react-icons/gr";
import Hotkey from "../ui/hotkey";
import { useRouter } from "next/navigation";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useHotkeys } from "react-hotkeys-hook";

export default function Documentations() {
  const router = useRouter();

  const redirectToDocumentations = () => {
    router.push("/documentations");
  };

  useHotkeys("a", () => redirectToDocumentations());

  return (
    <div className="flex flex-row items-center justify-between p-2 text-xs font-normal hover:bg-gray-100 rounded-sm">
      <div className="flex flex-row items-center space-x-2 text-[13px]">
        <IoDocumentTextOutline className="text-md" />
        <button onClick={redirectToDocumentations}>API Documentations</button>
      </div>
      <Hotkey letter="a" />
    </div>
  );
}
