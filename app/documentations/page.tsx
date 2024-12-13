import { redirect } from "next/navigation";
import { auth } from "@/auth";
import DocumentationContent from "./DocumentationContent";

export default async function DocumentationPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/api/auth/signin?callbackUrl=/documentations");
  }

  return <DocumentationContent userId={userId} />;
}
