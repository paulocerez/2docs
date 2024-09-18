import { auth } from "@/auth";
import React from "react";

export default async function CreateChat() {
  const session = await auth();
  const userId = session?.user.id;

  const createChat = () => {};

  return (
    <div>
      <button
        className="w-full p-2 text-left border rounded-md hover:bg-gray-100"
        onClick={() => createChat()}
      >
        Create new chat
      </button>
    </div>
  );
}
