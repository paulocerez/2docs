"use client";

import { useMessageQuota } from "@/hooks/quota/useMessageQuota";
import { QuotaBlock } from "./quota-block";

export function MessageQuota({
  userId,
  transparent,
}: {
  userId: string;
  transparent: boolean;
}) {
  const { data: quota } = useMessageQuota(userId);
  const remaining = quota?.absolute.remaining;
  const limit = quota?.absolute.limit;
  const used = limit - remaining;

  if (!quota) return null;

  return (
    <QuotaBlock
      used={used}
      limit={limit}
      resource="Messages"
      transparent={transparent}
    />
  );
}
