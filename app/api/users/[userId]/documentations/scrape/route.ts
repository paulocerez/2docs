import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { processDocumentation } from "@/lib/docs/processDocumentation";
import { scrapeURL } from "@/lib/scraping/scrapeURL";
import { saveMarkdownToFile } from "@/utils/saveMarkdownToFile";
import { authorizeUser } from "@/lib/auth/authorize-user";
import { chatRateLimit } from "@/lib/rate-limiters/chat-limiter";

export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const session = await auth();
  
  const authError = await authorizeUser(session, params.userId, "scrape documentation");
  if (authError) return authError;

  // Add rate limiting for scraping
  const { success: scrapeRateLimitRemaining, limit, remaining, reset } = await chatRateLimit.limit(params.userId);
  if (!scrapeRateLimitRemaining) {
    return NextResponse.json(
      {
        error: "Rate limit exceeded",
        quota: { limit, remaining: 0, reset: new Date(reset).toISOString() }
      },
      { status: 429 }
    );
  }

  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Scrape the URL
    const { markdown, statusCode } = await scrapeURL(url);
    console.log("Scraping url route: markdown", markdown);

    if (statusCode === 200 && markdown) {
      // Save markdown to file
      await saveMarkdownToFile(markdown, url);
      console.log("Markdown saved to file");

      try {
        console.log("Trying to process documentation in scrape url route...");
        const apiDocId = await processDocumentation(markdown, params.userId, url);
        console.log("Successfully processed documentation in scrape url route:", apiDocId);
        
        return NextResponse.json(
          { message: 'Scraping and processing completed', apiDocId }, 
          { status: 201 }
        );
      } catch (processError) {
        console.error("Error processing documentation:", processError);
        return NextResponse.json(
          { error: "Failed to process documentation" }, 
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Failed to scrape url" }, 
        { status: statusCode }
      );
    }
  } catch (error) {
    console.error("Error in POST /api/users/[userId]/documentations/scrape:", error);
    return NextResponse.json(
      { error: "Failed to scrape url" }, 
      { status: 500 }
    );
  }
} 