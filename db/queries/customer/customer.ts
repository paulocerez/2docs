import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { subscriptions } from "@/db/schema/subscriptions";
import { users } from "@/db/schema/users";
import { stripe } from "@/lib/stripe/server";

export async function createOrRetrieveStripeCustomer(email: string, name: string) {
	const existingSubscription = await db
		.select()
		.from(subscriptions)
		.innerJoin(users, eq(subscriptions.userId, users.id))
		.where(eq(users.email, email))
		.limit(1);

	if (existingSubscription[0]?.subscription.stripeCustomerId) {
		const stripeCustomer = await stripe?.customers.retrieve(existingSubscription[0].subscription.stripeCustomerId);
		
		return stripeCustomer;
	}

	const customer = await stripe?.customers.create({
		email,
		name,
	});

	return customer;
}