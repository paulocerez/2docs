import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { updateSubscription } from "@/db/queries/user/subscription";
import { SubscriptionTier } from "@/db/schema/subscriptions";
import { plans } from "@/app/settings/subscription-list";
import { createUserByEmail, getUserByEmail } from "@/db/queries/user/user";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;
	console.log("signature", signature);

    let event: Stripe.Event;
	let data: Stripe.Event.Data;
	let eventType: Stripe.Event.Type;

	// verify that event is coming from stripe
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

	data = event.data;
	eventType = event.type;

	// handle different types of webhooks events

    switch (eventType) {
      case "checkout.session.completed": {
		// first payment is successful and subscription is created, grant access to the product
        const checkoutSession = data.object as Stripe.Checkout.Session;
        const session = await stripe.checkout.sessions.retrieve(checkoutSession.id, {
          expand: ["line_items"]
        }); 
        const customerId = session?.customer as string;
        const customer = await stripe.customers.retrieve(customerId);

		const priceId = session.line_items?.data[0]?.price?.id;
		const plan = plans.find(plan => plan.priceId === priceId);

		if (!plan) break;

        let user;

		// check if customer exists in the database

        if (!('deleted' in customer)) {
          if (customer.email) {
            user = await getUserByEmail(customer.email)

            if (!user) {
              user = await createUserByEmail(customer.email, customer.name as string)
            }

            if (user) {
              const priceId = session.line_items?.data[0]?.price?.id;
              const plan = plans.find(plan => plan.priceId === priceId);

              if (plan) {
                await updateSubscription(
                  user.id,
                  SubscriptionTier.PRO,
                  customerId,
                  session.subscription as string
                );
			}
		}
	} else {
		console.error("No email found for customer", customer)
		throw new Error("No email found for customer")
	}
}

break;
}

	case "customer.subscription.updated":
      case "customer.subscription.deleted": {
		  
		  // revoke access to the user, fired once subscription is cancelled and the payment subscription lifecycle is over
		  const subscription = await stripe.subscriptions.retrieve(data.object.id);
		  const userId = subscription.metadata.userId;
		  
		  if (userId) {
			  const tier = subscription.status === "active" 
			  ? (subscription.items.data[0].price.id === process.env.STRIPE_PRICE_PRO 
				? SubscriptionTier.PRO 
				: SubscriptionTier.ENTERPRISE)
				: SubscriptionTier.FREE;
				
				await updateSubscription(
					userId,
					tier,
					subscription.customer as string,
					subscription.id
				);
			}
			break;
		}
    }
	
    return NextResponse.json({ received: true });
} catch (error) {
	console.error("Webhook error:", error);
    return NextResponse.json(
		{ error: "Webhook handler failed" },
		{ status: 500 }
    );
}
} 