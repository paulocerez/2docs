import Link from "next/link";
import { GrStorage } from "react-icons/gr";

export default function StoredWorkflows() {
  return (
    <div className="flex flex-row items-center justify-between p-2 text-xs font-normal hover:bg-gray-100 rounded-sm">
      <div className="flex flex-row items-center space-x-2">
        <GrStorage />
        <Link href="/workflows">My stored workflows</Link>
      </div>
      <div className="text-gray-600 shadow-md border rounded-sm px-1">w</div>
    </div>
  );
}
