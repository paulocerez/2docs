"use client";

export default function ChatTooltip({
  editingChatId,
  handleChatDelete,
  setEditingChatId,
}: {
  editingChatId: string | null;
  handleChatDelete: (chatId: string) => void;
  setEditingChatId: (chatId: string) => void;
}) {
  if (!editingChatId) return null;

  return (
    <div className="absolute top-full bg-white right-0 mt-2 w-32 dark:bg-gray-800 rounded-md shadow-lg p-1 z-30 text-xs">
      <button
        className="block rounded-md p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
        onClick={() => {
          setEditingChatId(editingChatId);
        }}
      >
        Rename
      </button>
      <button
        className="block rounded-md p-2 text-red-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left font-medium"
        onClick={() => handleChatDelete(editingChatId)}
      >
        Delete
      </button>
    </div>
  );
}
