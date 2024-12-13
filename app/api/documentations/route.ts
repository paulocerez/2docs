import { getPublicApiDocumentations } from "@/db/postgres/queries/api/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
	try {
		const documentations = await getPublicApiDocumentations();
		return NextResponse.json(documentations, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
