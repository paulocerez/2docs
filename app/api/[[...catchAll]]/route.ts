import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  return handleApiRequest(request);
}

export function POST(request: NextRequest) {
  return handleApiRequest(request);
}

async function handleApiRequest(request: NextRequest) {
  try {
    throw new Error("Route not found");
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}