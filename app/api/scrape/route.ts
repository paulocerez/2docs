// route to scrape a url and process the documentation
import { processDocumentation } from "@/lib/docs/processDocumentation";
import { scrapeURL } from "@/lib/scraping/scrapeURL";
import { saveMarkdownToFile } from "@/utils/saveMarkdownToFile";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const { userId, chatId, url } = await request.json();
	
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { markdown, statusCode } = await scrapeURL(url);


		if (statusCode === 200 && markdown) {
			const filePath = await saveMarkdownToFile(markdown, url); // save markdown to file for debugging
			const apiDocId = await processDocumentation(markdown, userId, url);
			return NextResponse.json({ message: 'Scraping and processing completed', apiDocId }, { status: 201 });
		} else {
			return NextResponse.json({ error: "Failed to scrape url" }, { status: statusCode });
		}
	} catch (error) {
		console.error("Error in POST /api/scrape:", error);
		return NextResponse.json({ error: "Failed to scrape url" }, { status: 500 });
	}	
}