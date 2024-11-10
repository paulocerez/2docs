import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function ContentWrapper({
  children,
  pathname,
}: {
  children: React.ReactNode;
  pathname: string;
}) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect(`/api/auth/signin?callbackUrl=/${pathname}`);
  }

  return <>{children}</>;
}
