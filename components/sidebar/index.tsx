import { auth } from "@/auth";

export async function getUserData() {
  const session = await auth();
  return {
    userImage: session?.user?.image,
    userName: session?.user?.name,
  };
}
