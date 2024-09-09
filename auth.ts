import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import Credentials from "next-auth/providers/credentials";
import { db } from "./db/client";
import credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(db),
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "text"},
        password: { label: "Password", type: "password"},
      },
	  authorize: async (credentials)  => {
		let user = null;
		// const hashedPassword = saltAndHashPassword(credentials.password);
		// user = await getUserFromDb(credentials.email, hashedPassword)
		if (!user) {
			throw new Error("User not found")
		}
		return user
	  }
    }),
  ],
});
