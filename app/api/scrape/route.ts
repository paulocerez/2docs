import { scrapeURL } from "@/lib/scraping/scrape";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(request: NextRequest) {
	const { chatId, url } = await request.json();	

	try {
		const scrapedData = await scrapeURL(url);
		const scrape = await createScrape({ chatId, url, scrapedContent: JSON.stringify(scrapedData) });
		return NextResponse.json({ message: 'Scraping completed', scrapeId: scrape.id }, { status: 200 });

	} catch (error) {
		return NextResponse.json({ error: "Failed to scrape url" }, { status: 500 });
	}	
}	
