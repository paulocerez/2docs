import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SettingsContent from "./settings-content";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  return <SettingsContent userId={session.user.id} />;
}
