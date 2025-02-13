import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/auth";
import { authorizeUser } from "@/lib/auth/authorize-user";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET({ params }: { params: { userId: string } }) {
  try {
    const session = await auth();
	const authError = await authorizeUser(session, params.userId, "access products");
	if (authError) return authError;
    

    // Fetch all active products with their prices
    const products = await stripe.products.list({
      active: true,
      expand: ["data.default_price"],
    });

    console.log(products);

    // Format the products data
    const formattedProducts = products.data.map((product) => {
      const price = product.default_price as Stripe.Price;
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        features: product.metadata.features || [],
        priceId: price.id,
        unitAmount: price.unit_amount,
        currency: price.currency,
        interval: price.type === "recurring" ? price.recurring?.interval : null,
        metadata: product.metadata,
      };
    });

    return NextResponse.json(formattedProducts, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
} 