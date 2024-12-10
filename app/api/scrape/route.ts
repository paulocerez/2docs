// route to scrape a url and process the documentation
import { processDocumentation } from "@/lib/docs/processDocumentation";
import { scrapeURL } from "@/lib/scraping/scrapeURL";
import { saveMarkdownToFile } from "@/utils/saveMarkdownToFile";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const { userId, url } = await request.json();
  
	  if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	  }
  
	  const { markdown, statusCode } = await scrapeURL(url);
  
	  if (statusCode === 200 && markdown) {
		await saveMarkdownToFile(markdown, url);
		console.log("Markdown saved to file" );
  
		try {
		  const apiDocId = await processDocumentation(markdown, userId, url);
		  return NextResponse.json({ message: 'Scraping and processing completed', apiDocId }, { status: 201 });
		} catch (processError) {
		  console.error("Error processing documentation:", processError);
		  return NextResponse.json({ error: "Failed to process documentation" }, { status: 500 });
		}
	  } else {
		return NextResponse.json({ error: "Failed to scrape url" }, { status: statusCode });
	  }
	} catch (error) {
	  console.error("Error in POST /api/scrape:", error);
	  return NextResponse.json({ error: "Failed to scrape url" }, { status: 500 });
	}
  }