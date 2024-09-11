import { DesktopHeaderProps } from "@/types/Header";
import DesktopHeader from "../header/Desktop-Header";

export default function Chat() {
  return (
    <div className="p-4">
      <div className="mt-4 bg-white rounded-lg shadow-md p-4">
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
