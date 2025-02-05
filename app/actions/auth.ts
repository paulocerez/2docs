'use server'

import { signIn } from "@/auth";

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/chat" });
} 

export async function signInWithEmail(email: string, password: string) {
  return signIn("credentials", { 
    email, 
    password, 
    redirect: false 
  });
}