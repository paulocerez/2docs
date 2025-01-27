import { getPublicApiDocumentations } from "@/db/queries/api/api";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
	const session = await auth();
	if (!session?.user?.id) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const documentations = await getPublicApiDocumentations();
		return NextResponse.json(documentations, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
