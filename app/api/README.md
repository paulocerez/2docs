### Stripe Integration for Recurring Payments

This is a step-by-step tutorial on what is technically needed to integrate a payment api for recurring subscription services. This includes the initial setup, automated payment flows, tracking on the go, management, and cancellation.

#### Initial Subscription Purchase

User typically clicks a "Upgrade to Pro" button or performs a similar action. But this step is definitely always initiated by the user.

/api/users/[userId]/subscription/create/route.ts

1. Validation of the user session
2. Gets plan details
3. Stripe checkout session created
4. Returns checkout URL

-> User is redirected to the Stripe Checkout Page -> Completes the Payment there -> Stripe sends a webhook to our endpoint

/api/webhooks/stripe/route.ts

1. Handling of the completion event ("checkout.session.completed")
2. Customer record is created (or updated if customer is already created)
3. Subscription created in db
4. User redirected to a success page

#### Recurring Payment Flow

This

#### Subscription Management

#### Subscription Cancellation

#### Usage Tracking
