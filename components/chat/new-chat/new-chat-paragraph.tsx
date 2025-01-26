export default function NewChatParagraph({
  title,
  handleChatTitleChange,
}: {
  title: string;
  handleChatTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col items-center space-y-8 text-center">
      <h1 className="text-3xl sm:text-5xl font-bold text-gray-900">
        What can I help you build?
      </h1>
      <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
        Insert two or more links to the API References you want to include in
        your workflow. Provide as much context and precision as possible in the
        prompt field.
      </p>
      <div className="max-w-sm w-full space-y-1">
        <input
          type="text"
          value={title}
          onChange={handleChatTitleChange}
          placeholder="Name your workflow"
          className="w-full px-3 py-2 border rounded-full text-xs transition-all duration-200"
        />
        <p className="text-[10px] text-gray-400">
          &quot;Insert Google Calendar events based on a Notion database&quot;
        </p>
      </div>
    </div>
  );
}
