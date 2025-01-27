import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  return NextResponse.json(
    { error: `API endpoint not found: ${request.url}` }, 
    { status: 404 }
  );
}

export function POST(request: NextRequest) {
  return NextResponse.json(
    { error: `API endpoint not found: ${request.url}` }, 
    { status: 404 }
  );
}