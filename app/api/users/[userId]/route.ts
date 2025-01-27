import { auth } from "@/auth";
import { getUserNameAndImageByUserId } from "@/db/queries/user/user";
import { authorizeUser } from "@/lib/auth/authorize-user";
import { NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest, { params }: { params: { userId: string}}): Promise<NextResponse> {
	const session = await auth();
  
	const authError = await authorizeUser(session, params.userId, "access user information");
	if (authError) return authError;

	try {
		const result = await getUserNameAndImageByUserId(params.userId)
		if (!result) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		  }
		return NextResponse.json(result, { status: 200})
	} catch (error) {
		console.error("Error fetching user name and image", error)
		return NextResponse.json({ error: "Could not get user information"}, { status: 500 })
	}
}