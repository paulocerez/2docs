import FirecrawlApp from "@mendable/firecrawl-js";

const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

export async function scrapeURL(url: string): Promise<{ markdown: string; statusCode: number }> {

	if (!process.env.FIRECRAWL_API_KEY) {
		throw new Error("FIRECRAWL_API_KEY is not set");
	}

  try {
    const crawlResponse = await app.crawlUrl(url, {
      limit: 100,
      scrapeOptions: {
        formats: ["markdown", "html"],
      },
    });

    if (!crawlResponse.success) {
      throw new Error(`Failed to crawl: ${crawlResponse.error || 'Unknown error'}`);
    }

    const markdown = crawlResponse.data?.[0]?.markdown;

    if (!markdown) {
      throw new Error('No markdown content found in the crawl response');
    }

    console.log("Scraped data: ", markdown);

    return {
      markdown: markdown,
      statusCode: 200
    };

  } catch (error) {
    console.error("Scraping ran into an error: ", error);
    throw error;
  }
}

scrapeURL("https://mochi.cards/docs/api/");