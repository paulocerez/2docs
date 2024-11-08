import FirecrawlApp from "@mendable/firecrawl-js";

const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

export async function scrapeURL(url: string) {
  try {
    const scrapeResponse = await app.crawlUrl(url, {
      limit: 100,
      scrapeOptions: {
        formats: ["markdown", "html"],
      },
    });
    return scrapeResponse;
  } catch (error) {
    console.error("Scraping ran into an error: ", error);
  }
}
