import Link from "next/link";
import { GrStorage } from "react-icons/gr";
import Hotkey from "../ui/hotkey";
import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";
import { IconType } from "react-icons/lib";

interface SidebarItemProps {
  name: string;
  Icon: IconType;
  hotkey: string;
}

export default function SidebarItem({ name, Icon, hotkey }: SidebarItemProps) {
  const router = useRouter();

  const redirectToItem = () => {
    router.push(`/${name.toLowerCase()}`);
  };

  useHotkeys(hotkey, () => redirectToItem());

  return (
    <div className="flex flex-row items-center justify-between p-2 text-xs font-normal hover:bg-gray-100 rounded-sm">
      <div className="flex flex-row items-center space-x-2 text-[13px]">
        {Icon && <Icon />}
        <button onClick={redirectToItem}>{name}</button>
      </div>
      <Hotkey letter={hotkey} />
    </div>
  );
}
