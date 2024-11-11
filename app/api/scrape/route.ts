import { auth } from "@/auth";
import { createApiDocumentation } from "@/db/postgres/queries/scrape";
import { mochi } from "@/docs/mochi";
import { notion } from "@/docs/notion";
import { scrapeURL } from "@/lib/scraping/scrape";
import extractNameFromUrl from "@/utils/extractNameFromUrl";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	
	try {
		const { userId, chatId, url } = await request.json();
		const urlName = extractNameFromUrl(url);
	
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}
		// get markdown data from url	
		// const { markdown, statusCode } = await scrapeURL(url);

		// if (statusCode === 429) {
			const fallbackMarkdown = notion[0].markdown;
			const scrape = await createApiDocumentation({ name: urlName, baseUrl: url, version: "1.0", createdBy: userId, content: fallbackMarkdown });
			return NextResponse.json({ message: 'Test Scraping completed', scrapeId: scrape.id }, { status: 200 });
		}
		// create api doc in db
		// const scrape = await createApiDocumentation({ name: urlName, baseUrl: url, version: "1.0", createdBy: 'user', content: markdown || "" });
		// return NextResponse.json({ message: 'Scraping completed', scrapeId: scrape.id }, { status: 200 });
	catch (error) {
		console.error("Error in POST /api/scrape:", error);
		return NextResponse.json({ error: "Failed to scrape url" }, { status: 500 });
	}	
}