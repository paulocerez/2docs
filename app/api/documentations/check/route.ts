import { NextResponse } from "next/server";
import { getApiDocumentationByUrl } from "@/db/queries/api/api";
import { validateApiDocumentationUrl, sanitizeUrl } from "@/lib/security/validate-url";
import { auth } from "@/auth";

export async function POST(request: Request): Promise<NextResponse> {
	const session = await auth();
	if (!session?.user?.id) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const { url } = await request.json();
		
		if (!url) {
			return NextResponse.json({ error: "URL is required" }, { status: 400 });
		}

		// Validate URL
		const validation = validateApiDocumentationUrl(url);
		if (!validation.isValid) {
			return NextResponse.json(
				{ error: validation.error || "Invalid API documentation URL" },
				{ status: 400 }
			);
		}

		const sanitizedUrl = sanitizeUrl(url);

		// Check if documentation already exists
		const existingApiDoc = await getApiDocumentationByUrl(sanitizedUrl);
		
		if (existingApiDoc && existingApiDoc.length > 0) {
			return NextResponse.json({ apiDocId: existingApiDoc[0].id }, { status: 200 });
		} else {
			return NextResponse.json({ apiDocId: null }, { status: 404 });
		}
	} catch (error) {
		console.error("Error checking for existing documentation:", error);
		return NextResponse.json(
			{ error: "Failed to check for existing documentation" },
			{ status: 500 }
		);
	}
}
