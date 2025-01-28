import { AlertCircle } from "lucide-react";

import { RotateCcw } from "lucide-react";

interface NewChatErrorProps {
  error: string | null;
  setError: (error: string | null) => void;
  setIsProcessing: (isProcessing: boolean) => void;
}

export default function NewChatError({
  error,
  setError,
  setIsProcessing,
}: NewChatErrorProps) {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 items-center">
          <div className="flex items-center gap-3 justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <div className="flex flex-col text-left">
                <h3 className="text-sm font-medium text-red-800">
                  Error Creating Chat
                </h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setError(null);
                setIsProcessing(false);
              }}
              className="text-sm text-red-600 hover:text-red-500"
            >
              <RotateCcw className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
