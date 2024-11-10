import { createApiDocumentation } from "@/db/postgres/queries/scrape";
import { scrapeURL } from "@/lib/scraping/scrape";
import extractNameFromUrl from "@/utils/extractNameFromUrl";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const { chatId, url } = await request.json();
	const urlName = extractNameFromUrl(url);

	console.log("Chat ID: ", chatId);
	console.log("URL: ", url);
	console.log("URL Name: ", urlName);

	try {
		// get markdown data from url	
		const { markdown, statusCode } = await scrapeURL(url);
		// create api doc in db
		const scrape = await createApiDocumentation({ name: urlName, baseUrl: url, version: "1.0", createdBy: 'user', content: markdown || "" });
		return NextResponse.json({ message: 'Scraping completed', scrapeId: scrape.id }, { status: 200 });
	} catch (error) {
		console.error("Error in POST /api/scrape:", error);
		return NextResponse.json({ error: "Failed to scrape url" }, { status: 500 });
	}	
}

