import Hotkey from "../ui/hotkey";
import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";
import { IconType } from "react-icons/lib";

interface SidebarItemProps {
  name: string;
  Icon: IconType;
  hotkey: string;
  isActive?: boolean;
  path: string;
}

export default function SidebarItem({
  name,
  Icon,
  hotkey,
  isActive,
  path,
}: SidebarItemProps) {
  const router = useRouter();

  const redirectToItem = () => {
    router.push(path);
  };

  useHotkeys(hotkey, () => redirectToItem());

  return (
    <button
      onClick={redirectToItem}
      className={`flex flex-row items-center justify-between p-2 text-sm font-normal hover:bg-gray-100 rounded-sm ${
        isActive ? "bg-gray-100" : ""
      }`}
    >
      <div className="flex flex-row items-center space-x-2">
        {Icon && <Icon />}
        <p>{name}</p>
      </div>
      <Hotkey letter={hotkey} />
    </button>
  );
}
