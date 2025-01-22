import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  const userId = session?.user?.id;

  if (userId) {
    redirect("/chat");
  } else {
    redirect("/signup");
  }
}
