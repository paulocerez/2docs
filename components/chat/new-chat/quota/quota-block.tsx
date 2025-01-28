"use client";
import { motion } from "framer-motion";
import { AlertCircle, ExternalLink } from "lucide-react";

interface QuotaBlockProps {
  used: number;
  limit: number;
  resource: string;
  transparent?: boolean;
}

export function QuotaBlock({
  used,
  limit,
  resource,
  transparent,
}: QuotaBlockProps) {
  if (used === limit) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg z-50"
      >
        <div className="max-w-2xl mx-auto flex items-start gap-4 text-white">
          <div className="bg-white/20 rounded-full p-3">
            <AlertCircle className="h-6 w-6 flex-shrink-0" />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-base mb-1">
                Chat Quota Exceeded
              </h3>
              <p className="text-sm text-white/90 leading-relaxed">
                You&apos;ve used all {limit} available {resource.toLowerCase()}.
                Upgrade your plan to continue creating new{" "}
                {resource.toLowerCase()}.
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 transition-colors rounded-lg text-sm">
              <span>Upgrade Plan</span>
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      className={`${
        transparent
          ? "bg-transparent"
          : "bg-white border border-gray-200 shadow-sm rounded-lg p-2"
      }`}
    >
      <div className="flex justify-between items-center text-xs mb-2">
        <span className="font-normal text-gray-900">{resource} Quota</span>
        <span className="text-gray-600">
          {used}/{limit}
        </span>
      </div>
      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
          style={{
            width: `${(used / limit) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
