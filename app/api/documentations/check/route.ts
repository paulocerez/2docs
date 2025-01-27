import { NextResponse } from "next/server";
import { getApiDocumentationByUrl } from "@/db/queries/api/api";

export async function POST (request: Request): Promise<NextResponse> {
	try {
		const { url } = await request.json();
		const existingApiDoc = await getApiDocumentationByUrl(url);
		
		if (existingApiDoc && existingApiDoc.length > 0) {
			return NextResponse.json({ apiDocId: existingApiDoc[0].id }, { status: 200 });
		} else {
			return NextResponse.json({ apiDocId: null }, { status: 404 });
		}
	} catch (error) {
		console.error("Error checking for existing documentation:", error);
		return NextResponse.json({ error: "Failed to check for existingdocumentation" }, { status: 500 });
	}
}
