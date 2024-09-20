import { auth } from "@/auth";
import SidebarHeader from "./SidebarHeader";

export default async function SessionProvider({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const session = await auth();

  return (
    <SidebarHeader
      toggleSidebar={toggleSidebar}
      userName={session?.user?.name || "User"}
      userImage={session?.user?.image || undefined}
    />
  );
}
