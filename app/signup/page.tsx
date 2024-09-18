import EmailLogin from "@/components/auth/EmailLogin";
import EmailSignup from "@/components/auth/EmailSignup";
import { useState } from "react";

export default function Signup() {
  const [hasAccount, setHasAccount] = useState<boolean>(false);

  if (hasAccount) {
    return <EmailSignup />;
  }

  return <EmailLogin />;
}
