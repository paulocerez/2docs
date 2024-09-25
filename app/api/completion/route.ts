import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest): Promise<NextResponse> {
	
	
	try {
		const result = await request.json();
		return NextResponse.json(result, { status: 200})
	} catch (error) {
		console.error("Error fetching ...", error)
		return NextResponse.json("error: Error fetching data", { status: 400})
	}
	
	
}