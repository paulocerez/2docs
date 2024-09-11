export default function Chat() {
  return (
    <div className="flex flex-col p-4 h-full justify-between">
      <div>
        <input
          type="text"
          placeholder="Insert API Doc link here"
          className="p-2 rounded-md"
        />
      </div>
      <div className="mt-4 bg-white rounded-lg shadow-md p-4">
        <p className="text-gray-500 text-xxs">Insert a prompt to get started</p>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-4 border rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
