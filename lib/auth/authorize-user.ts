import { Session } from "next-auth";
import { NextResponse } from "next/server";

export async function authorizeUser(session: Session | null, userId: string, action: string): Promise<NextResponse | null> {

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized: Please log in to continue" },
      { status: 401 }
    );
  }

  if (String(session.user.id) !== String(userId)) {
    return NextResponse.json(
      { error: `Unauthorized: You can only ${action} for your own account` },
      { status: 403 }
    );
  }

  return null; // Authorization successful
} 