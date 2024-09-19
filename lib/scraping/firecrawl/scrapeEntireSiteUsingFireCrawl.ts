import FirecrawlApp from "@mendable/firecrawl-js";

const app = new FirecrawlApp({ apiKey: "fc-9158b0b589dc4c2bb44587a1cb988641" });

export async function tryCrawler(url: string) {
  try {
    const crawlResponse = await app.crawlUrl(url, {
      limit: 100,
      scrapeOptions: {
        formats: ["markdown", "html"],
      },
    });
    console.log("Scraped stuff: ", crawlResponse);
    return crawlResponse;
  } catch (error) {
    console.error("Scraping ran into an error: ", error);
  }
}
tryCrawler("https://mochi.cards/docs/api/");
