"use client";

import { useChatQuota } from "@/hooks/quota/useChatQuota";
import { motion } from "framer-motion";
import { AlertCircle, ExternalLink } from "lucide-react";
import { QuotaBlock } from "./quota-block";

export function ChatQuota({ userId }: { userId: string }) {
  const { data: quota } = useChatQuota(userId);
  const remaining = quota?.absolute.remaining ?? 0;
  const limit = quota?.absolute.limit ?? 0;
  const used = limit - remaining;

  if (!quota) return null;

  return <QuotaBlock used={used} limit={limit} resource="Chats" />;
}
