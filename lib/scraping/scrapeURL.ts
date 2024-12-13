// function to scrape a url and return the markdown
import FirecrawlApp, { ScrapeResponse } from "@mendable/firecrawl-js";

const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

export async function scrapeURL(url: string): Promise<{ markdown: string; statusCode: number }> {

	console.log("Scrape URL function: ", url);

	if (!process.env.FIRECRAWL_API_KEY) {
		throw new Error("FIRECRAWL_API_KEY is not set");
	}

  try {
    const scrapeResponse = await app.scrapeUrl(url, {
      formats: ["markdown", "html"],
    }) as ScrapeResponse;

	console.log("Scrape response in scrapeURL function: ", scrapeResponse);

    if (!scrapeResponse.success) {
      throw new Error(`Failed to crawl: ${scrapeResponse.error || 'Unknown error'}`);
    }

    const markdown = scrapeResponse.markdown;

    if (!markdown) {
      throw new Error('No markdown content found in the crawl response');
    }

	console.log("Markdown in scrapeURL function: ", markdown);


    return {
      markdown,
      statusCode: 200
    };

  } catch (error) {
    console.error("Scraping ran into an error: ", error);
    throw error;
  }
}