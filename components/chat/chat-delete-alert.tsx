"use client";

interface ChatDeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  chatTitle: string;
}

export default function ChatDeleteAlert({
  isOpen,
  onClose,
  onConfirm,
  chatTitle,
}: ChatDeleteAlertProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Delete Chat</h3>
        <p className="text-sm text-gray-500">
          Are you sure you want to delete{" "}
          <span className="font-bold">{chatTitle}</span>? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
