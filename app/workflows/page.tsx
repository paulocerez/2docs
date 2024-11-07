import { redirect } from "next/navigation";
import { auth } from "@/auth";
import WorkflowContent from "./WorkflowContent";

export default async function WorkflowPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/api/auth/signin?callbackUrl=/workflows");
  }

  return <WorkflowContent userId={userId} />;
}
