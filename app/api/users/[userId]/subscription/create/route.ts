"use server";

import { plans } from "@/app/settings/subscription-list";
import { auth } from "@/auth";
import { createOrRetrieveStripeCustomer } from "@/db/queries/customer/customer";
import { authorizeUser } from "@/lib/auth/authorize-user";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const session = await auth();
    const authError = await authorizeUser(session, params.userId, "create subscription");
	if (authError) return authError;

    const { priceId } = await request.json();

	const plan = plans.find(plan => plan.priceId === priceId);
	if (!plan) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

	const customer = await createOrRetrieveStripeCustomer(session?.user?.email!, session?.user?.name!);

    // Create a Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
		customer: customer.id,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/settings?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/settings?canceled=true`,
      customer_email: session?.user?.email!,
	  subscription_data: {
		metadata: {
			userId: params.userId,
		},
	  },
    });

    return NextResponse.json({ url: checkoutSession.url }, { status: 201 });
  } catch (error) {
    console.error("Error creating subscription:", error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
} 