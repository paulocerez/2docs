import { createSubscription } from '@/db/queries/user/subscription';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Verify subscription server-side

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest, { params }: { params: { userId: string }}) {
  const { sessionId } = await request.json();

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    console.log(session)
    if (session.payment_status === 'paid') {
      // Update your database to mark the user as subscribed
      // await updateUserSubscriptionStatus(session.client_reference_id, 'active');
    }

    return NextResponse.json({ session }, { status: 201});

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}