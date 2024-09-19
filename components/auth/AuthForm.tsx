import { Button } from "../ui/button";
import SignIn from "./sign-in";

export default function AuthForm() {
  return (
    <div className="flex flex-col space-y-6 px-8 sm:px-0 sm:space-y-0 sm:flex-row w-full sm:w-fit sm:space-x-8 items-center ">
      <SignIn />
      <Button
        variant="outline"
        className="w-full sm:w-40 flex items-center justify-center"
      >
        Sign in using Mail
      </Button>
    </div>
  );
}
