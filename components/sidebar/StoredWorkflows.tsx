import Link from "next/link";

export default function StoredWorkflows() {
  return (
    <div className="border rounded-md p-2 text-xs hover:bg-gray-100">
      <Link href="/workflows">My stored workflows</Link>
    </div>
  );
}
