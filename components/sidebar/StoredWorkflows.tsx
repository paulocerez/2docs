import Link from "next/link";
import { GrStorage } from "react-icons/gr";
import Hotkey from "../ui/hotkey";
import { useRouter } from "next/navigation";

export default function StoredWorkflows() {
  const router = useRouter();

  const redirectToWorkflows = () => {
    router.push("/workflows");
  };

  return (
    <div className="flex flex-row items-center justify-between p-2 text-xs font-normal hover:bg-gray-100 rounded-sm">
      <div className="flex flex-row items-center space-x-2 text-[13px]">
        <GrStorage />
        <button onClick={redirectToWorkflows}>My stored workflows</button>
      </div>
      <Hotkey letter="w" />
    </div>
  );
}
