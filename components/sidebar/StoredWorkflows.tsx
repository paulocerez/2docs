import Link from "next/link";
import { GrStorage } from "react-icons/gr";

export default function StoredWorkflows() {
  return (
    <div className="flex flex-row space-x-2 items-center p-2 text-xs font-medium hover:bg-gray-100">
      <GrStorage />
      <Link href="/workflows">My stored workflows</Link>
    </div>
  );
}
