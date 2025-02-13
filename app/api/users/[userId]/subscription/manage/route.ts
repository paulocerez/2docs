"use server";

import { auth } from "@/auth";
import { getUserSubscription } from "@/db/queries/user/subscription";
import { authorizeUser } from "@/lib/auth/authorize-user";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const session = await auth();
    const authError = await authorizeUser(session, params.userId, "manage subscription");
	if (authError) return authError;

	const subscription = await getUserSubscription(params.userId);

	if (!subscription) return NextResponse.json({ error: "Subscription not found" }, { status: 404 });

	const portalSession = await stripe.billingPortal.sessions.create({
		customer: subscription.stripeCustomerId!,
		return_url: `${process.env.NEXTAUTH_URL}/settings`,
	});

    return NextResponse.json({ url: portalSession.url }, { status: 201 });
  } catch (error) {
    console.error("Error managing subscription:", error);
    return NextResponse.json(
      { error: "Failed to manage subscription" },
      { status: 500 }
    );
  }
} 