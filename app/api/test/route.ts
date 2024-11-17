import { processDocumentation } from "@/lib/docs/processDocumentation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
	  const { markdown, userId, url } = await request.json();
  
	  if (!markdown || !userId || !url) {
		return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
	  }
  
	  const apiDocId = await processDocumentation(markdown, userId, url);
  
	  return NextResponse.json({ 
		message: "Documentation processed successfully", 
		apiDocId 
	  }, { status: 201 });
  
	} catch (error) {
	  console.error("Error processing documentation:", error);
	  return NextResponse.json({ error: "Failed to process documentation" }, { status: 500 });
	}
  }