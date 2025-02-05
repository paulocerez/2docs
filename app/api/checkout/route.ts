import { NextRequest, NextResponse } from "next/server";
import stripe from "stripe";

export async function POST(req: NextRequest, res: NextResponse) {
	try {
		console.log("checkout");
		return NextResponse.json({ message: "checkout" }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Internal Error" }, { status: 500 });
	}
}