import { createApiDocumentation } from "@/db/postgres/queries/scrape";
import { scrapeURL } from "@/lib/scraping/scrape";
import extractNameFromUrl from "@/utils/extractNameFromUrl";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const { chatId, url } = await request.json();
	const userId = chatId.user.id;
	const urlName = extractNameFromUrl(url);

	try {
		// get markdown data from url	
		const scrapedData = await scrapeURL(url);
		// create api doc in db
		const scrape = await createApiDocumentation({ name: urlName, baseUrl: url, version: "1.0", createdBy: userId });
		console.log("Scrape created: ", scrape);
		console.log("Scraped data: ", scrapedData);
		return NextResponse.json({ message: 'Scraping completed', scrapeId: scrape.id }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to scrape url" }, { status: 500 });
	}	
}

