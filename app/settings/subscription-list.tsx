"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSubscription } from "@/hooks/subscription/useSubscription";
import { useRouter } from "next/navigation";

type Subscription = {
  tier: string;
};

interface Plan {
  name: string;
  description: string;
  price: string;
  features: string[];
  isPopular: boolean;
  buttonText: string;
  priceId: string | null;
  link: string | null;
  duration: string | null;
}

export const plans: Plan[] = [
  {
    name: "Monthly Pro",
    description: "Best for individual developers",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1Pq553FZvZyKYlo2C0655555"
        : "",
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_14k5lDaNX906dj2bII"
        : "",
    duration: "/month",
    price: "$9.99",
    isPopular: false,
    buttonText: "Current Plan",
    features: [
      `${
        process.env.NEXT_PUBLIC_CHAT_QUOTA_ENTERPRISE_ABSOLUTE_LIMIT || 500
      } chats per month`,
      `${
        process.env.NEXT_PUBLIC_MESSAGE_QUOTA_ENTERPRISE_ABSOLUTE_LIMIT || 5000
      } messages per month`,
      "Unlimited API integrations",
      "24/7 Priority support",
      "Custom workflows",
      "Team collaboration",
      "Advanced analytics",
    ],
  },
  {
    name: "Weekly Pro",
    description: "Best for individual developers",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1QpYUuGPW6Xm8pUMXVGn1vvg"
        : "",
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_6oEdS98FP0tAen6fYZ"
        : "",
    duration: "/week",
    price: "$2.99",
    isPopular: true,
    buttonText: "Upgrade to Weekly Pro",
    features: [
      `${
        process.env.NEXT_PUBLIC_CHAT_QUOTA_ENTERPRISE_ABSOLUTE_LIMIT || 500
      } chats per month`,
      `${
        process.env.NEXT_PUBLIC_MESSAGE_QUOTA_ENTERPRISE_ABSOLUTE_LIMIT || 5000
      } messages per month`,
      "Unlimited API integrations",
      "24/7 Priority support",
      "Custom workflows",
      "Team collaboration",
      "Advanced analytics",
    ],
  },
  {
    name: "Enterprise",
    description: "Custom solutions for teams",
    priceId: null,
    link: "mailto:sales@2docs.ai",
    duration: null,
    price: "Talk to us",
    isPopular: false,
    buttonText: "Contact Sales",
    features: [
      "Unlimited chats",
      "Unlimited messages",
      "Unlimited API integrations",
      "24/7 Priority support",
      "Custom workflows",
      "Team collaboration",
      "Advanced analytics",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantees",
    ],
  },
];

export default function SubscriptionList({ userId }: { userId: string }) {
  const [loading, setLoading] = useState<string | null>(null);
  const { data: subscriptionTier } = useSubscription(userId);
  const router = useRouter();
  //   const session = await auth();
  const email = "paulo.ramirez@web.de";

  const handleSubscribe = async (priceId: string, productName: string) => {
    try {
      setLoading(productName);
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Failed to start subscription process");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-medium text-gray-900">
          Subscription Plans
        </h2>
      </div>
      <div className="text-sm text-gray-500">
        You are currently using the {subscriptionTier || "Free"} tier.
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col rounded-2xl border ${
              plan.isPopular ? "border-blue-200 bg-blue-50" : "border-gray-200"
            } p-6 shadow-sm hover:shadow-md transition-all duration-200`}
          >
            {plan.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">
                Popular
              </div>
            )}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {plan.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
              <p className="mt-4">
                <span className="text-3xl font-bold text-gray-900">
                  {plan.price}
                </span>
                {plan.duration && (
                  <span className="text-sm text-gray-500">{plan.duration}</span>
                )}
              </p>
            </div>
            <ul className="mb-6 flex-1 space-y-4">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm text-gray-500"
                >
                  <Check className="mr-3 h-4 w-4 text-blue-500 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() =>
                plan.link &&
                router.push(plan.link + "?prefilled_email=" + email)
              }
              disabled={loading === plan.name || !plan.priceId}
              className={`w-full rounded-lg px-4 py-2 text-sm font-medium ${
                plan.isPopular
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              } transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading === plan.name ? (
                <Loader2 className="h-4 w-4 animate-spin mx-auto" />
              ) : plan.priceId ? (
                plan.buttonText
              ) : (
                "Current Plan"
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
