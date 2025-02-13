"use client";
import { AlertCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
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
      <div
        className={`${
          transparent
            ? "bg-transparent"
            : "bg-white border border-red-200 shadow-sm rounded-lg p-2"
        }`}
      >
        <Link
          href="/settings"
          className="flex justify-between items-center text-xs mb-2"
        >
          <span className="font-normal text-red-600">
            {resource} Quota exceeded
          </span>
          <span className="text-red-600">
            {used}/{limit}
          </span>
        </Link>
        <div className="h-1 bg-red-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500"
            style={{
              width: `${(used / limit) * 100}%`,
            }}
          />
        </div>
      </div>
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
