import { AlertCircle } from "lucide-react";

interface QuotaAlertChatProps {
  quota: {
    total: number;
    limit: number;
  };
}

export default function QuotaAlertChat({ quota }: QuotaAlertChatProps) {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center space-y-6">
          <div className="bg-white/50 backdrop-blur-sm rounded-full p-3 w-fit mx-auto">
            <AlertCircle className="h-8 w-8 text-blue-600" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">
              You&apos;ve reached your chat limit
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              You currently have {quota.total} active chats. The maximum number
              of chats allowed is {quota.limit}.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-full max-w-xs mx-auto bg-gray-100 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "100%" }}
              />
            </div>
            <p className="text-sm text-gray-500">
              {quota.total} / {quota.limit} chats created
            </p>
          </div>
          <div className="pt-4">
            <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors gap-2">
              Upgrade to Create More Chats
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
