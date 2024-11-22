import { redirect } from "next/navigation";
import { auth } from "@/auth";
import DocumentationContent from "./DocumentationContent";

export default async function WorkflowPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/api/auth/signin?callbackUrl=/workflows");
  }

  return <DocumentationContent userId={userId} />;
}
