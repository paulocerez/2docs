import { Button } from "../ui/button";
import SignIn from "./sign-in";
import { Mail } from "lucide-react";

export default function AuthForm() {
  return (
    <div className="flex flex-col md:flex-row space-x-4 w-full justify-center items-center">
      <div>
        <SignIn />
      </div>
      <div>
        <Button variant="outline">Sign in using Mail</Button>
      </div>
    </div>
  );
}
