// import { NextRequest, NextResponse } from "next/server";
// import stripe from "stripe";

// export async function POST(req: NextRequest, res: NextResponse) {
// 	try {
// 		const session = await stripe.checkout.sessions.create({
// 			success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
// 			cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
// 			line_items: [
// 				{
// 					price: "price_1P2345678901234567890123",
// 					quantity: 1,
// 				},
// 			],
// 		});
// 	} catch (error) {
// 		return NextResponse.json({ error: "Internal Error" }, { status: 500 });
// 	}
// }